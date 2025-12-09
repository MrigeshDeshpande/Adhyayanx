import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, hashPassword } from '@/lib/hash';

export async function POST(req: NextRequest) {
  try {
    const { email, token, newPassword } = await req.json();
    if (!email || !token || !newPassword) {
      return NextResponse.json({ error: 'email, token, newPassword required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordResetTokenHash || !user.passwordResetExpiresAt) {
      return NextResponse.json({ error: 'invalid_token' }, { status: 400 });
    }

    if (user.passwordResetExpiresAt.getTime() < Date.now()) {
      return NextResponse.json({ error: 'token_expired' }, { status: 400 });
    }

    const ok = await verifyToken(token, user.passwordResetTokenHash);
    if (!ok) {
      return NextResponse.json({ error: 'invalid_token' }, { status: 400 });
    }

    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash, passwordResetTokenHash: null, passwordResetExpiresAt: null },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
