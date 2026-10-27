export default function Projects() {
  return (
    <main className="flex-1 pt-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Projects
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/80">
          A selection of full-stack projects demonstrating frontend, backend,
          and database skills. Each project includes architecture notes,
          technologies used, and links to live demos and source code.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Project One",
              description: "A full-stack application with authentication and CRUD.",
              tech: ["Next.js", "Node.js", "SQL"],
            },
            {
              title: "Project Two",
              description: "Responsive dashboard with data visualization.",
              tech: ["React", "Tailwind CSS", "APIs"],
            },
            {
              title: "Project Three",
              description: "RESTful API with role-based access control.",
              tech: ["Node.js", "Express", "PostgreSQL"],
            },
          ].map((project) => (
            <a
              key={project.title}
              href={`/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-lg border border-white bg-white p-6 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/60">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-md border border-white px-2.5 py-0.5 text-xs font-semibold text-foreground/70 dark:border-gray-600 dark:text-foreground/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
        <p className="mt-12 text-center text-sm text-foreground/60">
          More projects coming soon…
        </p>
      </section>
    </main>
  );
}

