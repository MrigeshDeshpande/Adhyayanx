import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { hashToken } from '@/lib/hash';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // don't reveal user absence — respond ok
      return NextResponse.json({ ok: true });
    }

    // create a reset token, hash it, store hashed + expiry
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = await hashToken(token);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordResetTokenHash: tokenHash, passwordResetExpiresAt: expiresAt },
    });

    // send email with reset link (APP_URL should be set)
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    await sendEmail(email, 'Password reset for AdhyayanX', `Click here to reset: ${resetUrl}`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
