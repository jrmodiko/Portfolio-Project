import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/app/components/navbar";
import { AuthProvider } from "@/app/components/auth-provider";
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
  title: {
    template: "%s | Portfolio",
    default: "John-Ross Modiko | Full-Stack Developer Portfolio",
  },
  description:
    "Full-stack developer portfolio showcasing projects, skills, and experience. Built with Next.js, React, and TypeScript.",
  keywords: [
    "full-stack developer",
    "portfolio",
    "react",
    "next.js",
    "node.js",
    "javascript",
    "typescript",
  ],
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-primary selection:text-white">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
