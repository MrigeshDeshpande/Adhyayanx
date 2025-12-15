"use client";

import { useState } from "react";
import { COLORS } from "@/lib/constants";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/forget-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                // Even if email is not found, the API returns ok=true (security).
                // If we get an error here, it's a real server error or bad request.
                const data = await res.json();
                throw new Error(data.error || "Something went wrong.");
            }

            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                        Reset Password
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Enter your email address and we'll send you a link to reset your
                        password.
                    </p>
                </div>

                {submitted ? (
                    <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                            Check your email
                        </h3>
                        <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                            If an account exists for <strong>{email}</strong>, we have sent a
                            password reset link. The link will expire in 1 hour.
                        </p>
                        <Link
                            href="/auth"
                            className="text-sm font-medium hover:underline"
                            style={{ color: COLORS.palette.brownTaupe }}
                        >
                            Back to Log In
                        </Link>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    {error}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 rounded-lg font-semibold text-white text-sm uppercase tracking-wide transition-all duration-300 hover:opacity-90 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    background: `linear-gradient(135deg, ${COLORS.palette.brownTaupe} 0%, ${COLORS.palette.darkerBrown} 100%)`,
                                }}
                            >
                                {isLoading ? "Sending Link..." : "Send Reset Link"}
                            </button>

                            <div className="text-center mt-4">
                                <Link
                                    href="/auth"
                                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                                >
                                    Back to Log In
                                </Link>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
