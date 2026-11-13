import Reveal from "@/app/components/reveal";

const inputClass =
  "mt-1 block w-full rounded-xl border border-card-border bg-card px-4 py-3 text-sm text-foreground placeholder-text-muted/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-background";

export default function Contact() {
  return (
    <main className="flex-1 relative bg-grid overflow-hidden">
      <div className="stars" aria-hidden="true" />
      <div className="nebula" aria-hidden="true" />
      <div className="mesh-bg" aria-hidden="true" />
      <div className="blob blob-1 float" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />

      <section className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal delay={80}>
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-cosmic">
              Contact
            </h1>
            <p className="text-lg leading-8 text-foreground/80">
              I&apos;m looking for an entry-level software development role. If
              you have an opportunity or a question, I&apos;d love to hear from you.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <form
            className="space-y-6 rounded-[2rem] glass-strong border border-primary/20 p-8 shadow-glow md:p-12 cosmic-glow"
            action="/api/contact"
            method="POST"
          >
            <div className="space-y-4">
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Name
              </label>
              <input id="name" name="name" type="text" required className={inputClass} />
            </div>
            <div className="space-y-4">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email
              </label>
              <input id="email" name="email" type="email" required className={inputClass} />
            </div>
            <div className="space-y-4">
              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea id="message" name="message" rows={4} required className={inputClass} />
            </div>
            <button
              type="submit"
              className="btn-cosmic w-full rounded-xl px-8 py-3.5 text-sm font-semibold text-white shadow-glow"
            >
              Send Message
            </button>
          </form>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-10 text-center text-sm text-foreground/60">
            Or email{" "}
            <a href="mailto:johnrossmodiko0213@gmail.com" className="text-primary hover:underline">
              johnrossmodiko0213@gmail.com
            </a>{" "}
            or see my code on{" "}
            <a
              href="https://github.com/jrmodiko"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </Reveal>
      </section>
    </main>
  );
}
