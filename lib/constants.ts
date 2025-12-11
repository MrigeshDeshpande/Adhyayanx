/**
 * Application Constants
 *
 * Centralized configuration constants for the entire application.
 * This file contains generic, authentication, API, and color constants.
 *
 * @module constants
 */

// ============================================================================
// AUTHENTICATION CONSTANTS
// ============================================================================

/**
 * Name of the refresh token HTTP-only cookie.
 * Used across login, logout, refresh, and middleware.
 * 
 * @constant
 */
export const REFRESH_COOKIE_NAME = "adx_refresh" as const;

/**
 * Cookie configuration options for refresh token.
 * These options apply security best practices for authentication cookies.
 * 
 * @constant
 */
export const COOKIE_OPTIONS = {
    /**
     * httpOnly: Cookie is inaccessible to JavaScript (prevents XSS attacks)
     */
    httpOnly: true,

    /**
     * path: Cookie is available across the entire application
     */
    path: "/",

    /**
     * sameSite: Prevents CSRF attacks by restricting cross-site requests
     * 'lax' allows GET requests from external sites but blocks POST
     */
    sameSite: "lax" as const,
} as const;

/**
 * Default token expiration times.
 * These can be overridden by environment variables.
 * 
 * @constant
 */
export const TOKEN_DEFAULTS = {
    /**
     * Access token expiration in seconds (default: 15 minutes)
     */
    ACCESS_EXPIRES_SECONDS: 900,

    /**
     * Refresh token expiration in days (default: 30 days)
     */
    REFRESH_EXPIRES_DAYS: 30,
} as const;

/**
 * Helper function to get cookie options based on environment.
 * In production, sets 'secure' flag to require HTTPS.
 * 
 * @param maxAge - Maximum age of the cookie in seconds
 * @returns Complete cookie options object
 */
export function getCookieOptions(maxAge?: number) {
    return {
        ...COOKIE_OPTIONS,
        secure: process.env.NODE_ENV === "production",
        ...(maxAge !== undefined && { maxAge }),
    };
}

/**
 * Authentication error messages.
 * Centralized error strings for consistent messaging.
 * 
 * @constant
 */
export const AUTH_ERRORS = {
    MISSING_CREDENTIALS: "email and password required",
    INVALID_CREDENTIALS: "invalid_credentials",
    MISSING_TOKEN: "missing refresh token",
    INVALID_TOKEN: "invalid or expired token",
    INTERNAL_ERROR: "internal_error",
    EMAIL_IN_USE: "email already in use",
} as const;


// ============================================================================
// API CONSTANTS
// ============================================================================

/**
 * API route paths.
 * Centralized definition of all API endpoints.
 * 
 * @constant
 */
export const API_ROUTES = {
    AUTH: {
        LOGIN: "/api/auth/login",
        SIGNUP: "/api/auth/signup",
        LOGOUT: "/api/auth/logout",
        REFRESH: "/api/auth/refresh",
        FORGOT_PASSWORD: "/api/auth/forget-password",
        RESET_PASSWORD: "/api/auth/reset-password",
    },
    USERS: {
        ME: "/api/users/me",
    },
} as const;

/**
 * HTTP status codes used in API responses.
 * 
 * @constant
 */
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Content-Type headers.
 * 
 * @constant
 */
export const CONTENT_TYPES = {
    JSON: "application/json",
    FORM: "application/x-www-form-urlencoded",
    MULTIPART: "multipart/form-data",
} as const;


// ============================================================================
// COLOR CONSTANTS
// ============================================================================

/**
 * Color Constants
 *
 * Centralized color palette for the entire application.
 * 
 * Color Palette:
 * - Light mode: Cream/beige backgrounds with brown accents
 * - Dark mode: Black backgrounds with beige/brown accents
 */

export const COLORS = {
    /**
     * Core palette colors
     */
    palette: {
        // Light mode backgrounds
        offWhite: "#f5f5f0", // Light off-white/gray background
        beigeCream: "#ebe8de", // Beige/cream for cards
        lightTaupe: "#d4cfc4", // Light taupe for borders/secondary

        // Accent colors
        brownTaupe: "#a89f91", // Primary brown/taupe accent
        darkerBrown: "#8b8375", // Darker brown for gradients

        // Text colors
        midGray: "#6b6b6b", // Mid gray for muted text

        // Dark mode backgrounds
        pureBlack: "#0a0a0a", // Pure black background
        darkGray: "#1a1a1a", // Dark gray/black for cards
        lightBlack: "#2a2a2a", // Slightly lighter black for borders
    },

    /**
     * Gradient combinations
     */
    gradients: {
        primary: "from-[#a89f91] to-[#8b8375]", // Brown/taupe gradient
    },

    /**
     * Shadow colors with opacity
     */
    shadows: {
        primary: "shadow-[#a89f91]/20", // Brown shadow with 20% opacity
    },
} as const;

/**
 * Type for accessing color palette
 */
export type ColorPalette = typeof COLORS.palette;
export type ColorGradients = typeof COLORS.gradients;
export type ColorShadows = typeof COLORS.shadows;
