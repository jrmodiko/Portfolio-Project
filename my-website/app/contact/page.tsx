import Reveal from "@/app/components/reveal";
import ContactForm from "@/app/components/contact-form";

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
          <ContactForm />
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
