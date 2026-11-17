"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Reveal from "@/app/components/reveal";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  tech: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

// Per-card glow colors for visual definition
const CARD_GLOWS = [
  "glow-cosmic",
  "glow-emerald",
  "glow-blue",
  "glow-rose",
  "glow-amber",
  "glow-violet",
];

function getCardGlow(index: number) {
  return CARD_GLOWS[index % CARD_GLOWS.length];
}

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load projects: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setError(err instanceof Error ? err.message : "Failed to load projects.");
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex-1 relative bg-grid overflow-hidden">
      <div className="stars" aria-hidden="true" />
      <div className="nebula" aria-hidden="true" />
      <div className="mesh-bg" aria-hidden="true" />
      <div className="blob blob-1 float" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <Reveal delay={80}>
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl text-cosmic section-underline active-underline">
            Projects
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            Web applications and tools I have built with Python, Flask, Next.js,
            React and Supabase. Each card links to the source code and, where
            available, a live demo.
          </p>
        </Reveal>
        <Reveal delay={240} className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => {
              const glow = getCardGlow(i);
              return (
                <Reveal key={i} variant="up" delay={i * 60} className="min-h-[320px]">
                  <div className={`h-full glass-card-strong rounded-2xl p-6 flex flex-col ${glow} border border-white/[0.12]`}>
                    <div className="animate-pulse rounded-lg bg-white/[0.08] h-20 mb-4" />
                    <h3 className="animate-pulse rounded bg-white/[0.08] h-6 w-3/4 mb-2" />
                    <p className="animate-pulse rounded bg-white/[0.08] h-4 w-full mb-6 flex-1" />
                    <div className="animate-pulse rounded bg-white/[0.08] h-8 w-1/3 mt-auto" />
                  </div>
                </Reveal>
              );
            })
          ) : error ? (
            <Reveal variant="up" delay={240} className="col-span-full min-h-[320px]">
              <div className="text-center py-20 animate-fade-in">
                <p className="text-destructive">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    setLoading(true);
                    window.location.reload();
                  }}
                  className="text-primary hover:underline font-medium mt-4 inline-block"
                >
                  Try again
                </button>
              </div>
            </Reveal>
          ) : projects.length === 0 ? (
            <Reveal variant="up" delay={240} className="col-span-full min-h-[320px]">
              <div className="text-center py-20 animate-fade-in">
                <p className="text-muted">No projects yet.</p>
                <Link
                  href="/admin"
                  className="text-primary hover:underline font-medium mt-4 inline-block"
                >
                  Add your first project →
                </Link>
              </div>
            </Reveal>
          ) : (
            projects.map((project, index) => {
              const glow = getCardGlow(index);
              return (
                <Reveal key={project.id} variant="up" delay={240 + index * 80} className="min-h-[460px] card-enter">
                  <div
                    onClick={() => router.push(`/projects/${project.id}`)}
                    className={`group relative block rounded-2xl glass-card-strong p-6 cursor-pointer h-full flex flex-col transition-all duration-300 border border-white/[0.12] ${glow} hover:border-white/30 hover:-translate-y-2 hover:scale-[1.01]`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        router.push(`/projects/${project.id}`);
                      }
                    }}
                    onFocus={(e) => {
                      e.currentTarget.classList.add("ring-2", "ring-primary", "ring-offset-2");
                    }}
                    onBlur={(e) => {
                      e.currentTarget.classList.remove("ring-2", "ring-primary", "ring-offset-2");
                    }}
                  >
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 card-title-glow">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/90 line-clamp-3 flex-1">
                    {project.description}
                  </p>
                  <div className="mt-auto mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-lg border border-white/[0.15] px-2.5 py-0.5 text-[10px] font-semibold text-foreground/90 uppercase tracking-tighter tech-pill"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.githubUrl || project.liveUrl ? (
                    <div className="mt-6 flex gap-3">
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="magnetic flex-1 rounded-xl border border-white/[0.2] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-white/[0.08] hover:border-primary/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          GitHub
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-xl bg-gradient-to-b from-primary to-secondary px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:shadow-primary/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          Live Demo
                        </Link>
                      )}
                    </div>
                  ) : null}
                </div>
              </Reveal>
              );
            })
          )
          }
        </div>
        </Reveal>
        <Reveal delay={400} className="mt-12">
          <p className="text-center text-sm text-foreground/60">
            More projects coming soon…
          </p>
        </Reveal>
      </section>
    </main>
  );
}

