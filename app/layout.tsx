"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/sidebar/SideBar";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import { LayoutContent } from "./layout-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {!isAuthPage && <Navbar />}
            {!isAuthPage && <Sidebar />}
            <LayoutContent isAuthPage={isAuthPage}>{children}</LayoutContent>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
