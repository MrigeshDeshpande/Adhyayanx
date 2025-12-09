"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarItem({ item, theme, isCollapsed }: any) {
    const Icon = item.icon;
    const pathname = usePathname();

    const isActive =
        item.href && pathname.startsWith(item.href);

    // Special handler for TeachhubAI - focus on search bar instead of navigating
    const handleTeachhubAIClick = (e: React.MouseEvent) => {
        if (item.label === "TeachhubAI") {
            e.preventDefault();
            // Find and focus the search input in the navbar
            const searchInput = document.querySelector('input[placeholder*="Ask AI"]') as HTMLInputElement;
            if (searchInput) {
                searchInput.focus();
                searchInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    };

    return (
        <Link href={item.href} onClick={handleTeachhubAIClick}>
            <Button
                variant="ghost"
                className={cn(
                    "w-full gap-4 px-4 py-4 rounded-xl transition-all group text-base font-semibold",
                    isCollapsed ? "justify-center px-2" : "justify-start",
                    isActive &&
                    "bg-gradient-to-r from-[#a89f91] to-[#8b8375] text-white shadow-md shadow-[#a89f91]/20",
                    !isActive &&
                    "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
                title={isCollapsed ? item.label : ""}
            >
                <Icon
                    className={cn(
                        "w-6 h-6 transition-transform group-hover:scale-110",
                        isActive && "text-white",
                        isCollapsed ? "flex-shrink-0" : ""
                    )}
                />
                {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                )}
            </Button>
        </Link>
    );
}
