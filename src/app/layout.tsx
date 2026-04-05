import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hyderabad City Traffic Command Center",
  description: "Unified Traffic Orchestration & Corporate Shift-Sync Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-background text-foreground overflow-hidden font-sans flex relative">
        {/* Under Construction Ribbon */}
        <div className="fixed top-8 -right-12 rotate-45 z-[100] bg-gradient-to-r from-accent-red to-accent-orange px-14 py-1.5 shadow-[0_0_20px_rgba(244,63,94,0.3)] border-y border-white/20 select-none pointer-events-none group">
           <span className="text-[9px] font-black text-white tracking-[0.2em] uppercase font-mono drop-shadow-md">
             SYSTEM_CONSTRUCTION // v0.4.2_ALPHA
           </span>
        </div>

        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {children}
        </div>
      </body>
    </html>
  );
}

