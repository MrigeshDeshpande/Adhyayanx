"use client";

import { COLORS } from "@/lib/constants";
import { useAuth } from "@/contexts/AuthContext";
import { isAdminRole } from "@/lib/rbac";
import { motion } from "framer-motion";
import DashboardHeader from "@/components/admin/DashboardHeader";
import KPIGrid from "@/components/admin/KPIGrid";
import TodayStatusSection from "@/components/admin/TodayStatusSection";
import RiskSignalsSection from "@/components/admin/RiskSignalsSection";
import QuickActionsBar from "@/components/admin/QuickActionsBar";

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  // Show admin dashboard for SUPERADMIN and INSTITUTE_ADMIN
  if (isAuthenticated && user && isAdminRole(user.role)) {
    return (
      <div className="min-h-screen bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        >
          {/* Admin Dashboard */}
          <DashboardHeader />
          <KPIGrid />
          <RiskSignalsSection />
          <TodayStatusSection />
          <QuickActionsBar />
        </motion.div>
      </div>
    );
  }

  // Show regular home page for other users
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${COLORS.gradients.primary} bg-clip-text text-transparent`}
        >
          {isAuthenticated && user ? `Welcome back, ${user.fullName || user.email}!` : "Welcome to TeachHub"}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
          Your intelligent learning companion powered by AI
        </p>

        {isAuthenticated && user && (
          <div className="mt-8 p-6 bg-muted/50 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="text-left space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              {user.fullName && <p><strong>Name:</strong> {user.fullName}</p>}
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
