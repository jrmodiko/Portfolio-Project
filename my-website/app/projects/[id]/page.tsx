import Link from "next/link";
import Reveal from "@/app/components/reveal";

export default function ProjectDetail() {
  return (
    <main className="flex-1 relative bg-grid overflow-hidden">
      <div className="stars" aria-hidden="true" />
      <div className="nebula" aria-hidden="true" />
      <div className="mesh-bg" aria-hidden="true" />
      <div className="blob blob-1 float" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />
      <section className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
        <Reveal delay={80}>
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6 text-cosmic">
            Project Detail
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-lg leading-8 text-foreground/80 mb-6">
            This project page is under construction. Check back soon for the full
            case study.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <p className="mb-6">
            <Link
              href="/projects"
              className="btn-cosmic inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium text-white shadow-glow"
            >
              ← Back to Projects
            </Link>
          </p>
        </Reveal>
      </section>
    </main>
  );
}

