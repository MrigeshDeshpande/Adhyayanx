"use client";

/**
 * Authentication Context Provider
 * 
 * Manages global authentication state including user data, access tokens,
 * and automatic token refresh.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import * as authApi from "@/lib/auth";

/**
 * User data interface
 */
interface User {
    id: string;
    email: string;
    fullName: string | null;
    role: string;
}

/**
 * Authentication context value
 */
interface AuthContextValue {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: authApi.SignupData) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Props for AuthProvider component
 */
interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Authentication Provider Component
 * 
 * Wraps the application to provide authentication state and methods.
 * Automatically refreshes access tokens before they expire.
 */
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    /**
     * Refresh the access token
     */
    const refreshToken = useCallback(async () => {
        try {
            const newAccessToken = await authApi.refreshAccessToken();
            setAccessToken(newAccessToken);

            // Decode token to get user info
            const payload = authApi.decodeToken(newAccessToken);
            if (payload && payload.sub) {
                // We don't have full user info from token, but we have the ID and role
                setUser({
                    id: payload.sub,
                    email: "", // Will be populated on login/signup
                    fullName: null,
                    role: payload.role || "STUDENT",
                });
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
            // Clear auth state on refresh failure
            setAccessToken(null);
            setUser(null);
        }
    }, []);

    /**
     * Set up automatic token refresh
     * Refresh token 1 minute before it expires (14 minutes for 15 min expiry)
     */
    useEffect(() => {
        if (!accessToken) return;

        // Refresh after 14 minutes (1 minute before 15 min expiry)
        const refreshInterval = 14 * 60 * 1000; // 14 minutes in milliseconds

        const intervalId = setInterval(() => {
            refreshToken();
        }, refreshInterval);

        return () => clearInterval(intervalId);
    }, [accessToken, refreshToken]);

    /**
     * Login user
     */
    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await authApi.login({ email, password });
            setAccessToken(response.accessToken);

            // Decode token to get user info
            const payload = authApi.decodeToken(response.accessToken);
            if (payload && payload.sub) {
                setUser({
                    id: payload.sub,
                    email: email,
                    fullName: null,
                    role: payload.role || "STUDENT",
                });
            }

            router.push("/");
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    /**
     * Signup new user
     */
    const signup = useCallback(async (data: authApi.SignupData) => {
        setIsLoading(true);
        try {
            const response = await authApi.signup(data);
            setAccessToken(response.accessToken);
            setUser(response.user);

            router.push("/");
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    /**
     * Logout user
     */
    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await authApi.logout();
        } catch (error) {
            console.error("Logout failed:", error);
            // Continue with local cleanup even if API call fails
        } finally {
            setAccessToken(null);
            setUser(null);
            setIsLoading(false);
            router.push("/auth");
        }
    }, [router]);

    const value: AuthContextValue = {
        user,
        accessToken,
        isAuthenticated: !!accessToken && !!user,
        isLoading,
        login,
        signup,
        logout,
        refreshToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use authentication context
 * 
 * @throws Error if used outside of AuthProvider
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
