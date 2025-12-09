/**
 * JWT Token Management Module
 * 
 * Handles creation and verification of JSON Web Tokens for authentication.
 * Supports two token types:
 * - Access tokens: Short-lived tokens for API authentication (default: 15 minutes)
 * - Refresh tokens: Long-lived tokens for obtaining new access tokens (default: 30 days)
 * 
 * @module jwt
 */

import jwt from 'jsonwebtoken';

/**
 * Secret key for signing access tokens.
 * Must be set in JWT_ACCESS_SECRET environment variable.
 * @constant
 */
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;

/**
 * Secret key for signing refresh tokens.
 * Must be set in JWT_REFRESH_SECRET environment variable.
 * @constant
 */
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

/**
 * Expiration time for access tokens in seconds.
 * Default is 900 seconds (15 minutes).
 * @constant
 */
const ACCESS_EXPIRES = Number(process.env.JWT_ACCESS_EXPIRES || 900);

/**
 * Expiration time for refresh tokens in days.
 * Default is 30 days.
 * @constant
 */
const REFRESH_EXPIRES_DAYS = Number(process.env.JWT_REFRESH_EXPIRES_DAYS || 30);

/**
 * Creates and signs an access token with the provided payload.
 * 
 * @param payload - The data to encode in the token (typically user ID and role)
 * @returns A signed JWT access token string
 * 
 * @example
 * ```typescript
 * const token = signAccessToken({ sub: userId, role: 'STUDENT' });
 * ```
 */
export function signAccessToken(payload: object) {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: `${ACCESS_EXPIRES}s` });
}

/**
 * Verifies and decodes an access token.
 * 
 * @param token - The JWT access token to verify
 * @returns The decoded token payload
 * @throws {JsonWebTokenError} If the token is invalid or expired
 * 
 * @example
 * ```typescript
 * try {
 *   const payload = verifyAccessToken(token);
 *   console.log(payload.sub); // user ID
 * } catch (error) {
 *   // Token is invalid or expired
 * }
 * ```
 */
export function verifyAccessToken(token: string) {
    return jwt.verify(token, ACCESS_SECRET);
}

/**
 * Creates and signs a refresh token with the provided payload.
 * 
 * @param payload - The data to encode in the token (typically user ID and role)
 * @returns A signed JWT refresh token string
 * 
 * @example
 * ```typescript
 * const token = signRefreshToken({ sub: userId, role: 'STUDENT' });
 * ```
 */
export function signRefreshToken(payload: object) {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: `${REFRESH_EXPIRES_DAYS}d` });
}

/**
 * Verifies and decodes a refresh token.
 * 
 * @param token - The JWT refresh token to verify
 * @returns The decoded token payload
 * @throws {JsonWebTokenError} If the token is invalid or expired
 * 
 * @example
 * ```typescript
 * try {
 *   const payload = verifyRefreshToken(token);
 *   console.log(payload.sub); // user ID
 * } catch (error) {
 *   // Token is invalid or expired
 * }
 * ```
 */
export function verifyRefreshToken(token: string) {
    return jwt.verify(token, REFRESH_SECRET);
}

/**
 * Calculates the refresh token expiration time in seconds.
 * Used for setting cookie maxAge and database expiry timestamps.
 * 
 * @returns The number of seconds until a refresh token expires
 * 
 * @example
 * ```typescript
 * const expiresAt = new Date(Date.now() + refreshExpiresSeconds() * 1000);
 * ```
 */
export function refreshExpiresSeconds() {
    return REFRESH_EXPIRES_DAYS * 24 * 60 * 60;
}
