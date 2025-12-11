/**
 * Forgot Password API Route
 *
 * Initiates the password reset process by generating and sending a reset token.
 *
 * **Password Reset Flow:**
 * 1. Generates a random cryptographic token
 * 2. Hashes the token using bcrypt
 * 3. Stores the hashed token and expiry in the user record
 * 4. Sends reset link via email (with plain token in URL)
 * 5. Returns success regardless of whether email exists (security best practice)
 *
 * **Security Features:**
 * - Tokens are cryptographically random (32 bytes)
 * - Tokens are hashed before database storage
 * - Tokens expire after 1 hour
 * - No information leaked about email existence
 *
 * @module api/auth/forget-password
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { hashToken } from "@/lib/hash";
import { sendEmail } from "@/lib/email";

/**
 * POST /api/auth/forget-password
 *
 * Initiates password reset by sending a reset token to the user's email.
 *
 * **Request Body:**
 * ```json
 * {
 *   "email": "user@example.com"
 * }
 * ```
 *
 * **Success Response (200):**
 * ```json
 * {
 *   "ok": true
 * }
 * ```
 *
 * **Important:** Always returns 200 OK, even if the email doesn't exist.
 * This prevents attackers from determining which emails are registered.
 *
 * **Error Responses:**
 * - 400: Missing email
 * - 500: Internal server error
 *
 * **Side Effects:**
 * - Updates user record with hashed reset token and expiry
 * - Sends password reset email with reset link
 * - Token expires after 1 hour
 *
 * @param req - The Next.js request object
 * @returns JSON response indicating success or error
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email)
      return NextResponse.json({ error: "email required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // don't reveal user absence — respond ok
      return NextResponse.json({ ok: true });
    }

    // create a reset token, hash it, store hashed + expiry
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = await hashToken(token);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetTokenHash: tokenHash,
        passwordResetExpiresAt: expiresAt,
      },
    });

    // send email with reset link (APP_URL should be set)
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    await sendEmail(
      email,
      "Password reset for AdhyayanX",
      `Click here to reset: ${resetUrl}`,
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
