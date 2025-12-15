/**
 * Token Refresh API Route
 *
 * Handles access token refresh using refresh tokens with automatic rotation.
 *
 * **Token Refresh Flow:**
 * 1. Validates refresh token from cookie
 * 2. Verifies token signature (JWT)
 * 3. Finds matching hashed token in database
 * 4. Revokes old refresh token (rotation)
 * 5. Issues new access and refresh tokens
 * 6. Stores new refresh token hash
 * 7. Updates cookie with new refresh token
 *
 * **Security Features:**
 * - Automatic token rotation (old tokens are revoked)
 * - Refresh tokens hashed in database
 * - JWT signature verification
 * - Database validation (prevents token reuse if database compromised)
 *
 * **Token Rotation:**
 * This implementation uses refresh token rotation for enhanced security.
 * Each time a refresh token is used, it's revoked and a new one is issued.
 * This limits the window of vulnerability if a token is compromised.
 *
 * @module api/auth/refresh
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
  refreshExpiresSeconds,
} from "@/lib/jwt";
import { hashToken, verifyToken } from "@/lib/hash";
import {
  REFRESH_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  getCookieOptions,
  AUTH_ERRORS,
} from "@/lib/constants";

/**
 * POST /api/auth/refresh
 *
 * Refreshes an access token using a valid refresh token.
 *
 * **Request:**
 * - No body required
 * - Refresh token read from 'adx_refresh' cookie
 *
 * **Success Response (200):**
 * ```json
 * {
 *   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 * ```
 *
 * **Error Responses:**
 * - 401: No refresh token, invalid signature, or token not found in database
 * - 500: Internal server error
 *
 * **Token Rotation Process:**
 * 1. Old refresh token is marked as revoked
 * 2. New refresh token is generated and stored
 * 3. New access token is generated
 * 4. Cookie is updated with new refresh token
 *
 * **Side Effects:**
 * - Revokes the current refresh token in database
 * - Creates a new refresh token record
 * - Updates the 'adx_refresh' cookie with new token
 *
 * **Implementation Details:**
 * - Searches the 5 most recent non-revoked tokens for the user
 * - Uses bcrypt to compare token against stored hashes
 * - This approach balances security with performance
 *
 * @param req - The Next.js request object
 * @returns JSON response with new access token or error
 */
export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get(REFRESH_COOKIE_NAME)?.value;
    if (!refreshToken)
      return NextResponse.json(
        { error: AUTH_ERRORS.MISSING_TOKEN },
        { status: 401 }
      );

    // verify signature
    let payload: any;
    try {
      payload = verifyRefreshToken(refreshToken) as any;
    } catch (e) {
      return NextResponse.json(
        { error: AUTH_ERRORS.INVALID_TOKEN },
        { status: 401 }
      );
    }

    // find stored hashed token for user and compare
    const tokens = await prisma.refreshToken.findMany({
      where: { userId: payload.sub, revoked: false },
      orderBy: { createdAt: "desc" },
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
    if (!matched)
      return NextResponse.json(
        { error: AUTH_ERRORS.INVALID_TOKEN },
        { status: 401 }
      );

    // rotate refresh token: revoke old and create new
    await prisma.refreshToken.update({
      where: { id: matched.id },
      data: { revoked: true, replacedById: null },
    });

    const newRefresh = signRefreshToken({
      sub: payload.sub,
      role: payload.role,
    });
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

    // Fetch user data to include in response
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      }
    });

    const res = NextResponse.json({
      accessToken: newAccess,
      user: user || undefined,
    });
    res.cookies.set(
      REFRESH_COOKIE_NAME,
      newRefresh,
      getCookieOptions(refreshExpiresSeconds())
    );

    // Maintain session cookie
    res.cookies.set(SESSION_COOKIE_NAME, "true", {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: refreshExpiresSeconds(),
      httpOnly: false,
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: AUTH_ERRORS.INTERNAL_ERROR },
      { status: 500 }
    );
  }
}
