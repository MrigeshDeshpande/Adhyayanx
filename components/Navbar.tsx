"use client";

import { useState, useEffect } from "react";
import { Bell, Sparkles, Send, Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

export function Navbar() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert(`AI received your question: "${query}"`);
      setQuery("");
    }, 1000);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="h-16 px-3 sm:px-4 md:px-6 flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-24 h-7  bg-gradient-to-br from-[#a89f91] to-[#8b8375] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-semibold text-sm sm:text-base">TeachHub</span>
          </div>
          
        </div>

        {/* Search Bar - Hidden on very small screens */}
        <form onSubmit={handleSubmit} className="hidden sm:flex flex-1 max-w-xl">
          <div className="w-full flex items-center gap-2 rounded-full px-3 py-1.5 border bg-muted/40 focus-within:border-primary focus-within:bg-background transition-all">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask AI anything..."
              className="flex-1 bg-transparent outline-none text-sm min-w-0"
              disabled={isLoading}
            />

            <Button
              type="submit"
              size="sm"
              disabled={!query.trim() || isLoading}
              className="rounded-full px-2 sm:px-3 h-7 bg-gradient-to-r from-[#a89f91] to-[#8b8375] hover:opacity-90 text-white"
            >
              {isLoading ? (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs hidden sm:inline">Thinking...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Send className="w-3 h-3" />
                  <span className="text-xs hidden sm:inline">Ask</span>
                </div>
              )}
            </Button>
          </div>
        </form>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
            {mounted ? (
              theme === "dark" ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <div className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </Button>

          {/* Notifications - Hidden on small screens */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9 hidden md:flex">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 sm:gap-3 rounded-lg px-2 sm:px-3 py-2 hover:bg-muted transition">
                <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" />
                  <AvatarFallback>PT</AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-left">
                  <div className="text-sm font-medium">Prof. Thompson</div>
                  <div className="text-xs text-muted-foreground">Senior Instructor</div>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
