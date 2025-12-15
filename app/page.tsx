"use client";

import { COLORS } from "@/lib/constants";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

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
