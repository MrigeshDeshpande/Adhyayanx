/**
 * Authentication API Client
 * 
 * Provides client-side functions for interacting with the authentication API.
 * Handles user registration, login, token refresh, and logout.
 * 
 * @module lib/auth
 */

/**
 * User signup data interface
 */
export interface SignupData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: "STUDENT" | "TEACHER" | "INSTITUTE_ADMIN" | "SUPERADMIN" | "SUPPORT";
    instituteId?: string;
}

/**
 * Login credentials interface
 */
export interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * User data returned from API
 */
export interface User {
    id: string;
    email: string;
    fullName: string | null;
    role: string;
}

/**
 * Authentication response with access token
 */
export interface AuthResponse {
    accessToken: string;
    user?: User;
}

/**
 * API error response
 */
export interface AuthError {
    error: string;
}

/**
 * Register a new user account
 * 
 * @param data - User signup data
 * @returns User object and access token
 * @throws Error if signup fails
 */
export async function signup(data: SignupData): Promise<{ user: User; accessToken: string }> {
    const { firstName, lastName, ...rest } = data;
    const fullName = `${firstName} ${lastName}`.trim();

    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...rest,
            fullName,
        }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Signup failed");
    }

    // After signup, automatically login to get tokens
    const loginResponse = await login({ email: data.email, password: data.password });

    return {
        user: result.user,
        accessToken: loginResponse.accessToken,
    };
}

/**
 * Authenticate user with email and password
 * 
 * @param credentials - Login credentials
 * @returns Access token (refresh token is set as httpOnly cookie)
 * @throws Error if login fails
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Important: allows cookies to be set
        body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Login failed");
    }

    return result;
}

/**
 * Refresh the access token using the refresh token cookie
 * 
 * @returns New access token
 * @throws Error if refresh fails
 */
export async function refreshAccessToken(): Promise<string> {
    const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include", // Important: sends the refresh token cookie
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Token refresh failed");
    }

    return result.accessToken;
}

/**
 * Logout user and revoke refresh token
 * 
 * @throws Error if logout fails
 */
export async function logout(): Promise<void> {
    const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Logout failed");
    }
}

/**
 * Decode JWT token to extract payload
 * Note: This does NOT verify the token signature. 
 * Only use for client-side display purposes.
 * 
 * @param token - JWT token
 * @returns Decoded payload
 */
export function decodeToken(token: string): any {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}
