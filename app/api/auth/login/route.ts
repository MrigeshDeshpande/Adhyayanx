/**
 * User Login API Route
 *
 * Handles user authentication via email and password.
 *
 * **Authentication Flow:**
 * 1. Validates credentials against the database
 * 2. Issues both access and refresh tokens
 * 3. Stores hashed refresh token in database for token rotation
 * 4. Sets refresh token as httpOnly cookie
 * 5. Returns access token in response body
 *
 * **Security Features:**
 * - Passwords verified using bcrypt
 * - Refresh tokens hashed before storage
 * - httpOnly cookies prevent XSS attacks
 * - Secure flag enabled in production
 *
 * @module api/auth/login
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, hashToken } from "@/lib/hash";
import {
  signAccessToken,
  signRefreshToken,
  refreshExpiresSeconds,
} from "@/lib/jwt";

/**
 * Name of the refresh token cookie.
 * @constant
 */
const REFRESH_COOKIE_NAME = "adx_refresh";

/**
 * POST /api/auth/login
 *
 * Authenticates a user and issues JWT tokens.
 *
 * **Request Body:**
 * ```json
 * {
 *   "email": "user@example.com",
 *   "password": "securePassword123"
 * }
 * ```
 *
 * **Success Response (200):**
 * ```json
 * {
 *   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 * ```
 *
 * **Error Responses:**
 * - 400: Missing email or password
 * - 401: Invalid credentials (user not found or password incorrect)
 * - 500: Internal server error
 *
 * **Side Effects:**
 * - Creates a refresh token record in the database
 * - Sets an httpOnly cookie named 'adx_refresh'
 *
 * @param req - The Next.js request object
 * @returns JSON response with access token or error
 */
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "email and password required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: "invalid_credentials" },
        { status: 401 },
      );
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok)
      return NextResponse.json(
        { error: "invalid_credentials" },
        { status: 401 },
      );

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
    const res = NextResponse.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      }
    });
    const cookieOptions = {
      httpOnly: true,
      path: "/",
      // secure only in prod
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: refreshExpiresSeconds(),
    };
    res.cookies.set(REFRESH_COOKIE_NAME, refreshToken, cookieOptions);

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
