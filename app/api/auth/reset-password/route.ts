/**
 * Reset Password API Route
 *
 * Completes the password reset process by verifying the reset token and updating the password.
 *
 * **Reset Completion Flow:**
 * 1. Validates the reset token against stored hash
 * 2. Checks token hasn't expired
 * 3. Hashes the new password
 * 4. Updates user password and clears reset token
 *
 * **Security Features:**
 * - Token verification via bcrypt
 * - Token expiry validation
 * - One-time use tokens (cleared after successful reset)
 * - New password hashed before storage
 *
 * @module api/auth/reset-password
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, hashPassword } from "@/lib/hash";

/**
 * POST /api/auth/reset-password
 *
 * Resets a user's password using a valid reset token.
 *
 * **Request Body:**
 * ```json
 * {
 *   "email": "user@example.com",
 *   "token": "abc123def456...",
 *   "newPassword": "newSecurePassword123"
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
 * **Error Responses:**
 * - 400: Missing required fields, invalid token, or token expired
 * - 500: Internal server error
 *
 * **Validation Steps:**
 * 1. Checks all required fields are present
 * 2. Verifies user exists and has a reset token
 * 3. Checks token hasn't expired
 * 4. Verifies token matches stored hash
 *
 * **Side Effects:**
 * - Updates user's password hash
 * - Clears reset token and expiry from database
 *
 * @param req - The Next.js request object
 * @returns JSON response indicating success or error
 */
export async function POST(req: NextRequest) {
  try {
    const { email, token, newPassword } = await req.json();
    if (!email || !token || !newPassword) {
      return NextResponse.json(
        { error: "email, token, newPassword required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordResetTokenHash || !user.passwordResetExpiresAt) {
      return NextResponse.json({ error: "invalid_token" }, { status: 400 });
    }

    if (user.passwordResetExpiresAt.getTime() < Date.now()) {
      return NextResponse.json({ error: "token_expired" }, { status: 400 });
    }

    const ok = await verifyToken(token, user.passwordResetTokenHash);
    if (!ok) {
      return NextResponse.json({ error: "invalid_token" }, { status: 400 });
    }

    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetTokenHash: null,
        passwordResetExpiresAt: null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
