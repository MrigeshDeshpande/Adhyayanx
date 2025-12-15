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
import { AUTH_ERRORS } from "@/lib/constants";

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
  console.log("[FORGOT_PASSWORD] Request received");

  try {
    console.log("[FORGOT_PASSWORD] Parsing request body");
    const body = await req.json();
    console.log("[FORGOT_PASSWORD] Body parsed:", body);

    const { email } = body;

    if (!email) {
      console.warn("[FORGOT_PASSWORD] No email provided");
      return NextResponse.json({ ok: true });
    }

    console.log("[FORGOT_PASSWORD] Looking up user for email:", email);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.warn("[FORGOT_PASSWORD] No user found for email:", email);
      return NextResponse.json({ ok: true });
    }

    console.log("[FORGOT_PASSWORD] User found. Generating reset token");

    const token = crypto.randomBytes(32).toString("hex");
    console.log("[FORGOT_PASSWORD] Token generated");

    const tokenHash = await hashToken(token);
    console.log("[FORGOT_PASSWORD] Token hashed");

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    console.log("[FORGOT_PASSWORD] Token expiry set:", expiresAt.toISOString());

    console.log("[FORGOT_PASSWORD] Updating user record with reset token");
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetTokenHash: tokenHash,
        passwordResetExpiresAt: expiresAt,
      },
    });

    console.log("[FORGOT_PASSWORD] User record updated successfully");

    const appUrl = process.env.APP_URL || "http://localhost:3000";
    console.log("[FORGOT_PASSWORD] APP_URL:", appUrl);

    const resetUrl = `${appUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    console.log("[FORGOT_PASSWORD] Reset URL generated");

    console.log("[FORGOT_PASSWORD] Attempting to send reset email");
    sendEmail(
      email,
      "Password reset for AdhyayanX",
      `Click here to reset: ${resetUrl}`,
    ).then(() => {
      console.log("[FORGOT_PASSWORD] Reset email send initiated");
    }).catch((err) => {
      console.error("[FORGOT_PASSWORD] Email send failed:", err);
    });

    console.log("[FORGOT_PASSWORD] Flow completed, returning OK");
    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("[FORGOT_PASSWORD] Unhandled error:", err);
    console.log("[FORGOT_PASSWORD] Returning OK despite error (security)");

    return NextResponse.json({ ok: true });
  }
}
