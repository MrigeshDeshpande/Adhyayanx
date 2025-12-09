import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyRefreshToken, signAccessToken, signRefreshToken, refreshExpiresSeconds } from '@/lib/jwt';
import { hashToken, verifyToken } from '@/lib/hash';

const REFRESH_COOKIE_NAME = 'adx_refresh';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get(REFRESH_COOKIE_NAME)?.value;
    if (!refreshToken) return NextResponse.json({ error: 'no_refresh_token' }, { status: 401 });

    // verify signature
    let payload: any;
    try {
      payload = verifyRefreshToken(refreshToken) as any;
    } catch (e) {
      return NextResponse.json({ error: 'invalid_refresh' }, { status: 401 });
    }

    // find stored hashed token for user and compare
    const tokens = await prisma.refreshToken.findMany({
      where: { userId: payload.sub, revoked: false },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // find a match
    let matched = null;
    for (const t of tokens) {
      // verify bcrypt compare
      // Note: verifyToken uses bcrypt.compare
      if (await verifyToken(refreshToken, t.tokenHash)) {
        matched = t;
        break;
      }
    }
    if (!matched) return NextResponse.json({ error: 'refresh_not_found' }, { status: 401 });

    // rotate refresh token: revoke old and create new
    await prisma.refreshToken.update({ where: { id: matched.id }, data: { revoked: true, replacedById: null } });

    const newRefresh = signRefreshToken({ sub: payload.sub, role: payload.role });
    const newHash = await hashToken(newRefresh);
    const expiresAt = new Date(Date.now() + refreshExpiresSeconds() * 1000);

    await prisma.refreshToken.create({
      data: {
        userId: payload.sub,
        tokenHash: newHash,
        expiresAt,
        // optionally record ip/user-agent if you capture it from req
      },
    });

    const newAccess = signAccessToken({ sub: payload.sub, role: payload.role });

    const res = NextResponse.json({ accessToken: newAccess });
    res.cookies.set(REFRESH_COOKIE_NAME, newRefresh, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: refreshExpiresSeconds(),
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
