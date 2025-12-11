/**
 * Current User Profile API Route
 *
 * Retrieves the authenticated user's profile information.
 *
 * **Authentication:**
 * - Requires valid JWT access token in Authorization header
 * - Token must be prefixed with "Bearer "
 *
 * **Response:**
 * - Returns sanitized user data (excludes sensitive fields like password hash)
 *
 * @module api/users/me
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/jwt";

/**
 * GET /api/users/me
 *
 * Retrieves the current authenticated user's profile.
 *
 * **Request Headers:**
 * ```
 * Authorization: Bearer <access_token>
 * ```
 *
 * **Success Response (200):**
 * ```json
 * {
 *   "user": {
 *     "id": "user-uuid",
 *     "email": "user@example.com",
 *     "fullName": "John Doe",
 *     "role": "STUDENT",
 *     "instituteId": "institute-uuid"
 *   }
 * }
 * ```
 *
 * **Error Responses:**
 * - 401: No authorization header or invalid token
 * - 404: User not found (token is valid but user was deleted)
 * - 500: Internal server error
 *
 * **Authentication Flow:**
 * 1. Extracts Bearer token from Authorization header
 * 2. Verifies JWT signature and expiry
 * 3. Retrieves user from database using token's subject (user ID)
 * 4. Returns user profile data
 *
 * @param req - The Next.js request object
 * @returns JSON response with user data or error
 */
export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token)
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

    let payload: any;
    try {
      payload = verifyAccessToken(token) as any;
    } catch (e) {
      return NextResponse.json({ error: "invalid_token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        instituteId: true,
      },
    });
    if (!user)
      return NextResponse.json({ error: "not_found" }, { status: 404 });

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
