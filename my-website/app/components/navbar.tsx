"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/components/auth-provider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { session, logout, loading } = useAuth();

  return (
    <nav
      className="fixed top-0 z-50 w-full border-b border-white/[0.06] glass-modern transition-colors"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-sans text-xl font-black tracking-tight text-foreground"
          >
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest shadow-glow twinkle">
                JRM
              </span>
              <span className="text-foreground font-bold">John-Ross Modiko</span>
            </div>
          </Link>
          <div className="flex items-center gap-6 hidden md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {loading ? (
              <span className="text-xs text-muted animate-pulse twinkle">…</span>
            ) : session ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted">
                  {session.user?.email ?? "Admin"}
                </span>
                <button
                  onClick={() => logout()}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all glass-modern"
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
