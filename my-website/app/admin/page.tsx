"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/auth-provider";
import type { Project } from "@/lib/data";

type Mode = "list" | "form";

export default function Admin() {
  const { session, loading: authLoading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [mode, setMode] = useState<Mode>("list");
  const [editing, setEditing] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = {
    title: "",
    summary: "",
    tech: "",
    order: "0",
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Redirect unauthenticated users to login. This must run in an effect
  // (not during render) because router.push() triggers a state update, and
  // React forbids updating another component while `Admin` is rendering.
  // We wait until authLoading is false so we don't bounce a logged-in user
  // back to /login before the session has been populated.
  useEffect(() => {
    if (!authLoading && !session) {
      router.replace("/login");
    }
  }, [session, authLoading, router]);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch {
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const tech = form.tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const links: any[] = [];
    if (form.githubUrl) links.push({ type: "github", url: form.githubUrl });
    if (form.liveUrl) links.push({ type: "live", url: form.liveUrl });
    if (form.imageUrl) links.push({ type: "image", url: form.imageUrl });

    const body = {
      title: form.title,
      summary: form.summary,
      tech_stack: tech.join(","),
      links: links.length > 0 ? links : [],
      "order": parseInt(form.order) || 0,
    };

    try {
      if (editing) {
        await fetch(`/api/projects/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      resetForm();
      setMode("list");
      await fetchProjects();
    } catch {
      setError("Failed to save project.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this project?")) return;
    setLoading(true);
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      await fetchProjects();
    } catch {
      setError("Failed to delete project.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setEditing(null);
    form.title = "";
    form.summary = "";
    form.tech = "";
    form.order = "0";
    form.imageUrl = "";
    form.githubUrl = "";
    form.liveUrl = "";
  }

  if (authLoading || loading) {
    return (
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="stars" aria-hidden="true" />
        <p className="relative text-muted animate-pulse twinkle">Loading…</p>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="flex-1 relative bg-grid overflow-hidden">
      <div className="stars" aria-hidden="true" />
      <div className="nebula" aria-hidden="true" />
      <div className="mesh-bg" aria-hidden="true" />
      <div className="blob blob-1 float" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />
      <section className="relative px-4 pt-20 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-muted">
                Manage your portfolio projects — full CRUD.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-xl glass px-4 py-2 text-sm font-medium text-foreground hover:bg-white/[0.05] transition-colors"
            >
              ← Back to site
            </Link>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 animate-fade-in">
              {error}
            </div>
          )}

          {mode === "list" ? (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setMode("form")}
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-blue-500 transition-all"
                >
                  + Add Project
                </button>
              </div>
              <div className="rounded-xl glass-strong overflow-hidden border border-white/[0.08]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                      <th className="px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                        Tech
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p) => (
                      <tr
                        key={p.id}
                        className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4 text-foreground font-medium">
                          {p.title}
                        </td>
                        <td className="px-6 py-4 text-muted text-sm">
                          {p.tech.slice(0, 3).join(", ")}
                          {p.tech.length > 3 && ` +${p.tech.length - 3}`}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              form.title = p.title;
                              form.summary = p.shortDescription;
                              form.tech = p.tech.join(", ");
                              form.order = String(p.order ?? 0);
                              form.imageUrl = p.image ?? "";
                              form.githubUrl = p.githubUrl ?? "";
                              form.liveUrl = p.liveUrl ?? "";
                              setEditing(p);
                              setMode("form");
                            }}
                            className="mr-3 text-xs font-medium text-primary hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="text-xs font-medium text-red-400 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {projects.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-muted">
                          No projects yet. Add one above.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="max-w-xl animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editing ? "Edit Project" : "Add Project"}
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label
                    className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5"
                  >
                    Title
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all glass-modern"
                    value={form.title}
                    onChange={(e) => (form.title = e.target.value)}
                    required
                    placeholder="e.g. Portfolio Site"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5"
                  >
                    Summary
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all glass-modern"
                    value={form.summary}
                    onChange={(e) => (form.summary = e.target.value)}
                    required
                    placeholder="e.g. Modern portfolio with admin CRUD"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5"
                  >
                    Order (display position)
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all glass-modern"
                    value={form.order}
                    onChange={(e) => (form.order = e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5"
                  >
                    Image URL
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all glass-modern"
                    value={form.imageUrl}
                    onChange={(e) => (form.imageUrl = e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5"
                  >
                    Tech (comma separated)
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all glass-modern"
                    value={form.tech}
                    onChange={(e) => (form.tech = e.target.value)}
                    placeholder="e.g. Next.js, Tailwind, TypeScript"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5"
                    >
                      GitHub URL
                    </label>
                    <input
                      className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all glass-modern"
                      value={form.githubUrl}
                      onChange={(e) => (form.githubUrl = e.target.value)}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5"
                    >
                      Live URL
                    </label>
                    <input
                      className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all glass-modern"
                      value={form.liveUrl}
                      onChange={(e) => (form.liveUrl = e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setMode("list");
                    }}
                    className="glass-modern rounded-xl px-4 py-2 text-sm font-medium text-muted transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-cosmic rounded-xl px-5 py-2 text-sm font-semibold text-white shadow-glow disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Saving…" : editing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

