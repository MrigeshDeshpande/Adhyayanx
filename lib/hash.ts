/**
 * Hashing Utilities Module
 *
 * Provides bcrypt-based hashing and verification functions for passwords and tokens.
 * Uses bcryptjs for cross-platform compatibility.
 *
 * @module hash
 */

import bcrypt from "bcryptjs";

/**
 * Number of salt rounds to use for bcrypt hashing.
 * Higher values increase security but also increase computation time.
 * Default is 12 if not specified in environment variables.
 *
 * @constant
 */
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 12);

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param password - The plain text password to hash
 * @returns A promise that resolves to the hashed password
 *
 * @example
 * ```typescript
 * const hash = await hashPassword('mySecurePassword123');
 * // hash: '$2a$12$...'
 * ```
 */
export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verifies a plain text password against a bcrypt hash.
 *
 * @param password - The plain text password to verify
 * @param hash - The bcrypt hash to compare against
 * @returns A promise that resolves to true if the password matches, false otherwise
 *
 * @example
 * ```typescript
 * const isValid = await verifyPassword('myPassword', storedHash);
 * if (isValid) {
 *   // Password is correct
 * }
 * ```
 */
export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

/**
 * Hashes a token (such as a refresh token or reset token) using bcrypt.
 *
 * @param token - The plain text token to hash
 * @returns A promise that resolves to the hashed token
 *
 * @example
 * ```typescript
 * const tokenHash = await hashToken(refreshToken);
 * // Store tokenHash in database
 * ```
 */
export async function hashToken(token: string) {
  return bcrypt.hash(token, SALT_ROUNDS);
}

/**
 * Verifies a plain text token against a bcrypt hash.
 *
 * @param token - The plain text token to verify
 * @param hash - The bcrypt hash to compare against
 * @returns A promise that resolves to true if the token matches, false otherwise
 *
 * @example
 * ```typescript
 * const isValid = await verifyToken(providedToken, storedHash);
 * if (isValid) {
 *   // Token is valid
 * }
 * ```
 */
export async function verifyToken(token: string, hash: string) {
  return bcrypt.compare(token, hash);
}
