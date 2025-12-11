"use client";
import {
  LayoutDashboard,
  Users,
  Upload,
  FileText,
  BookOpen,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { SidebarItem } from "./SideBarItem";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/lib/constants";
import { useEffect, useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "My Batches", href: "/batches" },
  { icon: Upload, label: "Upload PDF", href: "/upload" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: BookOpen, label: "Syllabus", href: "/syllabus" },
  { icon: Sparkles, label: "TeachhubAI", href: "/teachhubai" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load collapsed state from localStorage
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      setIsCollapsed(savedState === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", String(newState));

    // Dispatch custom event for layout to listen to
    window.dispatchEvent(
      new CustomEvent("sidebar-toggle", { detail: { collapsed: newState } }),
    );
  };

  // 🔥 Prevent SSR mismatch
  if (!mounted) return null;

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden fixed top-20 left-3 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 shadow-lg"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-72 sm:w-80">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 bg-gradient-to-br ${COLORS.gradients.primary} rounded-lg flex items-center justify-center shadow-md`}
                >
                  <span className="text-white font-semibold">A</span>
                </div>
                <span className="font-medium">Navigation Menu</span>
              </SheetTitle>
            </SheetHeader>
            <MobileSidebar theme={theme} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] border-r transition-all duration-300 overflow-hidden bg-card border-border",
          isCollapsed ? "w-16" : "w-60",
        )}
      >
        {/* Toggle Button */}
        <div
          className={cn(
            "flex p-2 border-b border-border",
            isCollapsed ? "justify-center" : "justify-end",
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              "h-8 w-8 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent",
            )}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="p-6 space-y-3 overflow-y-auto h-[calc(100%-4rem)]">
          {navItems.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              theme={theme}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

function MobileSidebar({ theme }: any) {
  return (
    <nav className="p-4 space-y-3 overflow-y-auto h-[calc(100vh-5rem)]">
      {navItems.map((item) => (
        <SidebarItem
          key={item.label}
          item={item}
          theme={theme}
          isCollapsed={false}
        />
      ))}
    </nav>
  );
}
