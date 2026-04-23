"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Legacy Admin Dashboard Route
 * 
 * This route now redirects to the home page (/).
 * The admin dashboard is now conditionally rendered on the home page
 * based on the user's role (SUPERADMIN or INSTITUTE_ADMIN).
 */
export default function AdminDashboard() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to home page where admin dashboard is now displayed
        router.replace("/");
    }, [router]);

    // Show loading state during redirect
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Redirecting to dashboard...</p>
            </div>
        </div>
    );
}
