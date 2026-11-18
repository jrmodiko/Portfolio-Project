"use client";

import Link from "next/link";
import { useAuth } from "@/app/components/auth-provider";

export default function Footer() {
  const { session, loading } = useAuth();

  return (
    <footer className="mt-auto pt-14 pb-12 text-center sm:text-left" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 px-6 py-4">
          <div className="flex flex-col items-center gap-2 sm:text-left sm:items-start text-center">
            <span className="text-xs font-semibold text-muted tracking-wider uppercase">
              John-Ross Modiko
            </span>
            <p className="text-xs text-muted/60">
              Entry-level Software Developer &bull; IT Programming
            </p>
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <a
              href="https://github.com/jrmodiko"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-primary"
              aria-label="Open GitHub profile"
            >
              <img
  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  alt="GitHub"
  width="18"
  height="18"
  className="shrink-0 opacity-60 rounded-full"
/>
              <span>GitHub</span>
            </a>

            {loading ? (
              <span className="text-xs text-muted animate-pulse">…</span>
            ) : session ? (
              <Link
                href="/admin"
                className="text-xs font-medium text-muted transition-colors hover:text-primary"
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link
                href="/admin"
                className="text-xs font-medium text-primary hover:underline transition-colors"
              >
                Login as Admin
              </Link>
            )}
          </div>
        </div>

        <p className="mt-8 text-[10px] text-muted/50 text-center sm:text-left">
          &copy; {new Date().getFullYear()} John-Ross Modiko. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
