import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const REFRESH_COOKIE_NAME = 'adx_refresh';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get(REFRESH_COOKIE_NAME)?.value;
    if (refreshToken) {
      // try to find the stored token and revoke it
      const tokens = await prisma.refreshToken.findMany({
        where: { revoked: false },
        orderBy: { createdAt: 'desc' },
        take: 20,
      });

      // compare with bcrypt (a bit heavy but ok for logout)
      for (const t of tokens) {
        // compare via bcrypt
        // note: we import verifyToken lazily to avoid circular libs; using require
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { verifyToken } = require('@/lib/hash');
        // eslint-disable-next-line no-await-in-loop
        if (await verifyToken(refreshToken, t.tokenHash)) {
          await prisma.refreshToken.update({ where: { id: t.id }, data: { revoked: true } });
        }
      }
    }

    const res = NextResponse.json({ ok: true });
    // clear cookie
    res.cookies.set(REFRESH_COOKIE_NAME, '', { httpOnly: true, path: '/', maxAge: 0 });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
