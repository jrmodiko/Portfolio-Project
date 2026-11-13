"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/auth-provider";

export default function Login() {
  const { login, loading: authLoading, session } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect to admin once the session is available (covers both
  // already-logged-in visitors and successful logins where Supabase
  // updates the session asynchronously via onAuthStateChange).
  useEffect(() => {
    if (session) {
      router.push("/admin");
    }
  }, [session, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    const { error: err } = await login(email, password);
    setSubmitting(false);
    if (err) {
      setError(err);
    } else {
      setSuccess("Sign in successful. Redirecting…");
    }
  }

  return (
    <main className="flex-1 relative bg-grid overflow-hidden">
      <div className="stars" aria-hidden="true" />
      <div className="nebula" aria-hidden="true" />
      <div className="mesh-bg" aria-hidden="true" />
      <div className="blob blob-1 float" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />

      <section className="relative px-4 pt-20 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="rounded-[2rem] glass-strong p-8 md:p-12 mx-auto max-w-md reveal-scale animate-fade-in cosmic-glow">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-2 text-cosmic">
                Admin Login
              </h1>
              <p className="text-muted">Sign in to access the admin dashboard.</p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl glass-modern border border-red-500/30 px-4 py-3 text-sm text-red-400 reveal-up">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 rounded-xl glass-modern border border-emerald-500/30 px-4 py-3 text-sm text-emerald-400 reveal-up">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder-text-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all glass-modern"
                  placeholder="you@example.com"
                  disabled={submitting || authLoading}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder-text-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all glass-modern"
                  placeholder="••••••••"
                  disabled={submitting || authLoading}
                />
              </div>
              <button
                type="submit"
                disabled={submitting || authLoading}
                className="btn-cosmic w-full rounded-xl px-5 py-3.5 text-sm font-semibold text-white shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Signing in…" : "Sign In"}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-muted">
              Demo credentials:<br />
              admin@example.com / password123
            </p>

            <p className="mt-4 text-center">
              <Link
                href="/"
                className="text-cosmic hover:underline text-sm font-medium transition-colors"
              >
                ← Back to home
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

