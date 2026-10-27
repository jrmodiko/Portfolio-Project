export default function ProjectDetail() {
  return (
    <main className="flex-1 pt-16">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Project Detail
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/80">
          This project page is under construction. Check back soon for the full
          case study.
        </p>
        <p className="mt-6">
          <a
            href="/projects"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            ← Back to Projects
          </a>
        </p>
      </section>
    </main>
  );
}

