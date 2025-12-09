/**
 * User Registration API Route
 * 
 * Handles new user account creation.
 * 
 * **Registration Flow:**
 * 1. Validates required fields (email, password)
 * 2. Checks if email is already in use
 * 3. Hashes the password using bcrypt
 * 4. Creates user record in database
 * 5. Returns sanitized user data (excludes password hash)
 * 
 * **Security Features:**
 * - Passwords are hashed before storage
 * - Email uniqueness enforced
 * - Password hash never returned in response
 * 
 * @module api/auth/signup
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/hash';

/**
 * POST /api/auth/signup
 * 
 * Creates a new user account.
 * 
 * **Request Body:**
 * ```json
 * {
 *   "email": "user@example.com",
 *   "password": "securePassword123",
 *   "fullName": "John Doe",
 *   "role": "STUDENT",  // Optional, defaults to STUDENT
 *   "instituteId": "123"  // Optional
 * }
 * ```
 * 
 * **Success Response (201):**
 * ```json
 * {
 *   "user": {
 *     "id": "user-uuid",
 *     "email": "user@example.com",
 *     "fullName": "John Doe",
 *     "role": "STUDENT"
 *   }
 * }
 * ```
 * 
 * **Error Responses:**
 * - 400: Missing email or password
 * - 409: Email already in use
 * - 500: Internal server error
 * 
 * @param req - The Next.js request object
 * @returns JSON response with user data or error
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password, fullName, role = 'STUDENT', instituteId } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'email and password required' }, { status: 400 });
        }

        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) {
            return NextResponse.json({ error: 'email already in use' }, { status: 409 });
        }

        const passwordHash = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                fullName,
                role,
                instituteId,
            },
            select: { id: true, email: true, fullName: true, role: true },
        });

        return NextResponse.json({ user }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'internal_error' }, { status: 500 });
    }
}
