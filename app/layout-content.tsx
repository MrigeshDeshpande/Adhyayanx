
"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function LayoutContent({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const savedState = localStorage.getItem("sidebarCollapsed");
        if (savedState !== null) {
            setIsCollapsed(savedState === "true");
        }


        const handleSidebarToggle = (event: Event) => {
            const customEvent = event as CustomEvent;
            setIsCollapsed(customEvent.detail.collapsed);
        };

        window.addEventListener("sidebar-toggle", handleSidebarToggle);

        return () => {
            window.removeEventListener("sidebar-toggle", handleSidebarToggle);
        };
    }, []);

    if (!mounted) {
        return (
            <main className="pt-16 px-3 sm:px-4 md:px-6 lg:pl-64 lg:pr-6 min-h-screen transition-all duration-300">
                {children}
            </main>
        );
    }

    return (
        <main
            className={cn(
                "pt-16 px-3 sm:px-4 md:px-6 min-h-screen transition-all duration-300",
                isCollapsed ? "lg:pl-16 lg:pr-6" : "lg:pl-64 lg:pr-6"
            )}
        >
            {children}
        </main>
    );
}
