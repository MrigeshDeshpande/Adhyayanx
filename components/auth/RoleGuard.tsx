"use client";

/**
 * Role Guard Component
 * 
 * Client-side guard that protects content based on user roles.
 * Provides loading states and unauthorized messages.
 */

import { useAuth } from "@/contexts/AuthContext";
import { Role, getUnauthorizedMessage } from "@/lib/rbac";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface RoleGuardProps {
    children: ReactNode;
    allowedRoles: Role[];
    fallbackPath?: string;
}

/**
 * RoleGuard Component
 * 
 * Wraps protected content and checks if the current user has the required role.
 * Shows loading state while checking auth, and unauthorized message if access is denied.
 * 
 * @param children - Content to protect
 * @param allowedRoles - Array of roles that can access the content
 * @param fallbackPath - Path to redirect to if unauthorized (optional)
 */
export default function RoleGuard({
    children,
    allowedRoles,
    fallbackPath = "/"
}: RoleGuardProps) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // Show loading state while auth is being checked
    if (isLoading || !user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 dark:to-muted/10 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                >
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Verifying access...</p>
                </motion.div>
            </div>
        );
    }

    // Check if user has required role
    const hasAccess = allowedRoles.includes(user.role as Role);

    // Show unauthorized message if access is denied
    if (!hasAccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 dark:to-muted/10 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full"
                >
                    <Card className="border-2 border-destructive/50 bg-card/80 backdrop-blur-sm shadow-xl">
                        <CardContent className="p-8 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center"
                            >
                                <ShieldAlert className="w-10 h-10 text-white" />
                            </motion.div>

                            <h2 className="text-2xl font-bold mb-3">Access Denied</h2>

                            <p className="text-muted-foreground mb-6">
                                {getUnauthorizedMessage(allowedRoles)}
                            </p>

                            <div className="space-y-3">
                                <Button
                                    onClick={() => router.push(fallbackPath)}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Go Back Home
                                </Button>

                                <p className="text-sm text-muted-foreground">
                                    Need access? Contact your administrator.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    // User has access, render protected content
    return <>{children}</>;
}
