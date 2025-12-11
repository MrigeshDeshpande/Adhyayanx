/**
 * User Logout API Route
 *
 * Handles user logout by revoking refresh tokens and clearing cookies.
 *
 * **Logout Flow:**
 * 1. Retrieves refresh token from httpOnly cookie
 * 2. Searches database for matching token (using bcrypt comparison)
 * 3. Marks token as revoked in database
 * 4. Clears the refresh token cookie
 *
 * **Security Features:**
 * - Tokens are revoked in database (prevents reuse)
 * - Cookie is cleared from client
 * - Handles missing tokens gracefully
 *
 * **Note:** This implementation searches recent tokens for a match,
 * which may be resource-intensive. Consider optimizing for production.
 *
 * @module api/auth/logout
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  REFRESH_COOKIE_NAME,
  getCookieOptions,
  AUTH_ERRORS,
} from "@/lib/constants";

/**
 * POST /api/auth/logout
 *
 * Logs out the current user by revoking their refresh token.
 *
 * **Request:**
 * - No body required
 * - Refresh token read from 'adx_refresh' cookie
 *
 * **Success Response (200):**
 * ```json
 * {
 *   "ok": true
 * }
 * ```
 *
 * **Error Responses:**
 * - 500: Internal server error
 *
 * **Side Effects:**
 * - Marks refresh token as revoked in database
 * - Clears the 'adx_refresh' cookie
 *
 * **Implementation Note:**
 * Currently searches the 20 most recent non-revoked tokens to find a match.
 * This approach works for small-scale applications but may need optimization
 * for high-traffic scenarios (e.g., maintain a token lookup table).
 *
 * @param req - The Next.js request object
 * @returns JSON response indicating success or error
 */
export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get(REFRESH_COOKIE_NAME)?.value;
    if (refreshToken) {
      // try to find the stored token and revoke it
      const tokens = await prisma.refreshToken.findMany({
        where: { revoked: false },
        orderBy: { createdAt: "desc" },
        take: 20,
      });

      // compare with bcrypt (a bit heavy but ok for logout)
      for (const t of tokens) {
        // compare via bcrypt
        // note: we import verifyToken lazily to avoid circular libs; using require
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { verifyToken } = require("@/lib/hash");
        // eslint-disable-next-line no-await-in-loop
        if (await verifyToken(refreshToken, t.tokenHash)) {
          await prisma.refreshToken.update({
            where: { id: t.id },
            data: { revoked: true },
          });
        }
      }
    }

    const res = NextResponse.json({ ok: true });
    // clear cookie
    res.cookies.set(REFRESH_COOKIE_NAME, "", getCookieOptions(0));
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: AUTH_ERRORS.INTERNAL_ERROR },
      { status: 500 }
    );
  }
}
