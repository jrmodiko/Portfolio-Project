export default function Home() {
  return (
    <main className="flex-1 pt-16">
      <section
        className="relative overflow-hidden bg-white dark:bg-black"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32">
          <div className="relative z-10 mx-auto max-w-xl text-center">
            <h1
              id="hero-heading"
              className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
            >
              Full-Stack Developer
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/80 sm:text-xl">
              I build responsive, production-ready web applications with modern
              frontend and backend technologies. Explore my work and get in
              touch.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 sm:justify-start">
              <a
                href="/projects"
                className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                View Projects
              </a>
              <a
                href="/about"
                className="rounded-md border border-white px-5 py-3 text-sm font-semibold text-foreground shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                About Me
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
