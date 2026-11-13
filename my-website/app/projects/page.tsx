"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl text-cosmic">
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
            Array.from({ length: 6 }).map((_, i) => (
              <Reveal key={i} variant="up" delay={240 + i * 40}>
                <div className="rounded-2xl glass p-6 card-hover border border-white/[0.04] animate-fade-in">
                  <div className="skeleton h-6 mb-2 w-3/4" />
                  <div className="skeleton h-4 mb-4 w-full" />
                  <div className="flex gap-2">
                    <div className="skeleton h-6 w-16" />
                    <div className="skeleton h-6 w-16" />
                    <div className="skeleton h-6 w-16" />
                  </div>
                </div>
              </Reveal>
            ))
          ) : projects.length === 0 ? (
            <Reveal variant="up" delay={240}>
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
            projects.map((project, idx) => (
              <Reveal key={project.id} variant="up" delay={240 + idx * 60}>
                <a
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group relative block rounded-2xl glass p-6 card-hover hover:bg-white/[0.03] hover:border-primary/40 transition-all border border-white/[0.04] animate-fade-up"
                >
                  <div className="relative mb-4 overflow-hidden rounded-xl aspect-[4/5]">
                    <img
                      src={project.image ?? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
                    {project.featured && (
                      <span className="absolute left-2 top-2 rounded-lg bg-primary/90 px-3 py-1 text-xs font-semibold text-white">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted line-clamp-3">
                    {project.description}
                  </p>
                  {project.featured && (
                    <span className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
                      Featured
                    </span>
                  )}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-lg border border-white/[0.08] px-2.5 py-0.5 text-[10px] font-semibold text-muted uppercase tracking-tighter"
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
                          className="magnetic flex-1 rounded-xl border border-white/[0.1] px-4 py-2.5 text-sm font-medium text-muted hover:bg-white/[0.03] transition-all"
                        >
                          GitHub
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-secondary transition-all"
                        >
                          Live Demo
                        </Link>
                      )}
                    </div>
                  ) : null}
                </a>
              </Reveal>
            )))
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

