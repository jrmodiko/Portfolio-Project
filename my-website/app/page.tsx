"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/app/components/reveal";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  tech: string[];
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

const STATS_WITHOUT_PROJECTS = [
  { value: "7", label: "IT Specialist certificates" },
  { value: "2026", label: "IT Programming qualification" },
  { value: "4", label: "Languages spoken" },
] as const;

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: Project[]) => {
        if (Array.isArray(data)) {
          setProjectCount(data.length);
          setProjects(data.slice(0, 3));
        }
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex-1 relative bg-grid overflow-hidden">
      <div className="stars" aria-hidden="true" />
      <div className="nebula" aria-hidden="true" />
      <div className="mesh-bg" aria-hidden="true" />
      <div className="blob blob-1 float" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />

      <section className="relative px-4 pt-24 pb-32 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal delay={80}>
            <span className="inline-flex items-center gap-2 rounded-full glass-modern px-4 py-1.5 text-sm font-semibold text-cosmic mb-8 cosmic-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-accent twinkle" />
              Entry-level Software Developer
            </span>
          </Reveal>
          <Reveal delay={160}>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl lg:text-8xl mb-6">
              I craft <span className="text-cosmic">practical software</span>
              <br />
              that <span className="text-cosmic">makes work easier</span>.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted">
              I recently qualified in IT Programming at UniCollege. I build
              practical web applications with Python, Flask, Next.js and
              Supabase, and I&apos;m looking for an entry-level role where I can
              contribute to a team and keep growing.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/projects"
                className="btn-cosmic rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-glow"
              >
                View Projects
              </Link>
              <a
                href="/John-Ross_Modiko_CV.docx"
                download
                className="btn-plasma rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-glow"
              >
                Download CV
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative border-t border-white/[0.05] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 text-center sm:grid-cols-4">
          <Reveal delay={100} className="h-full">
            <div className="h-full glass-card p-6">
              <div className="mb-1 text-3xl font-bold text-primary twinkle">{projectCount}</div>
              <div className="text-sm text-muted">Projects built</div>
            </div>
          </Reveal>
          {STATS_WITHOUT_PROJECTS.map((s, i) => (
            <Reveal key={s.label} delay={(i + 1) * 100} className="h-full">
              <div className="h-full glass-card p-6">
                <div className="mb-1 text-3xl font-bold text-primary twinkle">{s.value}</div>
                <div className="text-sm text-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative border-t border-white/[0.05] px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl section-underline active-underline">
                Featured Projects
              </h2>
              <p className="mt-2 text-lg text-muted">
                A selection of projects I&apos;ve built.
              </p>
            </div>
            <Link
              href="/projects"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Reveal key={i} variant="up" delay={i * 100} className="min-h-[260px]">
                  <div className={`h-full glass-card-strong rounded-2xl p-6 flex flex-col ${getCardGlow(i)} border border-white/[0.12]`}>
                    <div className="animate-pulse rounded bg-white/[0.08] h-6 w-3/4 mb-4" />
                    <div className="animate-pulse rounded bg-white/[0.08] h-4 w-full mb-6 flex-1" />
                    <div className="flex gap-2">
                      <div className="animate-pulse rounded bg-white/[0.08] h-6 w-12" />
                      <div className="animate-pulse rounded bg-white/[0.08] h-6 w-12" />
                      <div className="animate-pulse rounded bg-white/[0.08] h-6 w-12" />
                    </div>
                  </div>
                </Reveal>
              ))
            ) : projects.length > 0 ? (
              projects.map((project, index) => {
                const glow = getCardGlow(index);
                return (
                  <Reveal key={project.id} variant="up" className="min-h-[260px] card-enter">
                    <div className={`h-full glass-card-strong rounded-2xl p-6 flex flex-col border border-white/[0.12] ${glow} hover:border-white/30 hover:-translate-y-2`}>
                      <h3 className="text-lg font-semibold text-foreground mb-2 card-title-glow">
                        {project.title}
                      </h3>
                      <p className="text-sm text-foreground/90 line-clamp-3 flex-1 mb-4">
                        {project.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center rounded-lg border border-white/[0.15] px-2.5 py-0.5 text-[10px] font-semibold text-foreground/90 uppercase tracking-tighter tech-pill"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 animate-fade-in">
                <p className="text-muted">No projects yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}