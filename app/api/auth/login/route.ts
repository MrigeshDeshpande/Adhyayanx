// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, hashToken } from '@/lib/hash';
import { signAccessToken, signRefreshToken, refreshExpiresSeconds } from '@/lib/jwt';

const REFRESH_COOKIE_NAME = 'adx_refresh';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'email and password required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 });
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 });

    // issue tokens
    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id, role: user.role });

    // store hashed refresh token in DB (rotation support)
    const tokenHash = await hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + refreshExpiresSeconds() * 1000);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    // set httpOnly secure cookie for refresh token
    const res = NextResponse.json({ accessToken });
    const cookieOptions = {
      httpOnly: true,
      path: '/',
      // secure only in prod
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: refreshExpiresSeconds(),
    };
    res.cookies.set(REFRESH_COOKIE_NAME, refreshToken, cookieOptions);

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
