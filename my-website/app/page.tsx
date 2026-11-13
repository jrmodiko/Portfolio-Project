"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/app/components/reveal";

interface FeaturedProject {
  id: string;
  title: string;
  shortDescription: string;
  tech: string[];
  image?: string;
  featured?: boolean;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80";

const stats = [
  { value: "7", label: "IT Specialist certificates" },
  { value: "3", label: "Projects built" },
  { value: "2026", label: "IT Programming qualification" },
  { value: "4", label: "Languages spoken" },
];

export default function Home() {
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: FeaturedProject[]) => {
        if (Array.isArray(data)) {
          setProjects(data.filter((p) => p.featured).slice(0, 3));
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
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="h-full">
              <div className="h-full glass-card p-6">
                <div className="mb-1 text-3xl font-bold text-primary twinkle">{s.value}</div>
                <div className="text-sm text-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}