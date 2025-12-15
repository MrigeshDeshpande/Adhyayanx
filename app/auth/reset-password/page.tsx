"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { COLORS } from "@/lib/constants";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!token || !email) {
            setError("Invalid or missing reset token.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token, newPassword: password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to reset password");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/auth");
            }, 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!token || !email) {
        return (
            <div className="text-center">
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">
                        Invalid reset link. Missing token or email.
                    </p>
                </div>
                <Link
                    href="/auth"
                    className="text-sm font-medium hover:underline"
                    style={{ color: COLORS.palette.brownTaupe }}
                >
                    Back to Log In
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                    Set New Password
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enter your new password below.
                </p>
            </div>

            {success ? (
                <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                        Password Reset Successful
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                        Your password has been updated. You will be redirected to the login
                        page shortly.
                    </p>
                    <Link
                        href="/auth"
                        className="text-sm font-medium hover:underline"
                        style={{ color: COLORS.palette.brownTaupe }}
                    >
                        Click here if not redirected
                    </Link>
                </div>
            ) : (
                <>
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 rounded-lg font-semibold text-white text-sm uppercase tracking-wide transition-all duration-300 hover:opacity-90 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                background: `linear-gradient(135deg, ${COLORS.palette.brownTaupe} 0%, ${COLORS.palette.darkerBrown} 100%)`,
                            }}
                        >
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordContent />
            </Suspense>
        </div>
    );
}
