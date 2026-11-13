import Reveal from "@/app/components/reveal";

const skills = ["Python", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"];
const education = [
  { year: "2026", school: "UniCollege", degree: "IT Programming" },
  { year: "2020", school: "Krugersdorp High School", degree: "Grade 12" },
];
const certifications = [
  { name: "Application Developer Pathway", date: "August 2026" },
  { name: "IT Specialist: HTML & CSS", date: "March 2026" },
  { name: "IT Specialist: Python", date: "May 2026" },
];

export default function About() {
  return (
    <main className="flex-1 relative bg-grid overflow-hidden">
      <div className="stars" aria-hidden="true" />
      <div className="nebula" aria-hidden="true" />
      <div className="mesh-bg" aria-hidden="true" />
      <div className="blob blob-1 float" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />
      <section className="relative px-4 pt-24 pb-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Reveal delay={80}>
            <div className="mb-20 text-center">
              <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl text-cosmic">
                About Me
              </h1>
              <p className="text-lg text-muted">
                Hi, I'm John-Ross Modiko. I recently qualified in IT Programming
                and I'm drawn to software development, especially building practical
                software that makes people's work easier.
              </p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="mb-20 grid gap-6 md:grid-cols-2">
              {skills.map((skill) => (
                <div key={skill} className="glass-card p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary twinkle">
                    {skill}
                  </span>
                </div>
              ))}
              <div className="glass-card p-6">
                <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-accent">
                  Education
                </h2>
                <ul className="space-y-2">
                  {education.map((e) => (
                    <li key={e.degree} className="text-sm text-muted">
                      {e.year}: {e.degree} from {e.school}
                    </li>
                  ))}
                </ul>
                <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-accent">
                  Certifications
                </h2>
                <ul className="space-y-2">
                  {certifications.map((c) => (
                    <li key={c.name} className="text-sm text-muted">
                      {c.name} - {c.date}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="rounded-[2rem] glass-strong border border-primary/20 p-8 text-center md:p-14 cosmic-glow">
              <h2 className="mb-3 text-2xl font-bold text-foreground text-cosmic">
                Download CV
              </h2>
              <p className="text-muted mb-4">
                Download my CV for full experience and project details.
              </p>
              <a
                href="/John-Ross_Modiko_CV.docx"
                download
                className="btn-cosmic inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-glow"
              >
                Download CV <span className="text-xs">&rarr;</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}