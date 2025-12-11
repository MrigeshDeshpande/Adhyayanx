import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
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

export const metadata: Metadata = {
  title: "Teach-Hub - Learning Platform",
  description: "Your intelligent learning companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <Navbar />
            <Sidebar />
            <LayoutContent>{children}</LayoutContent>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
