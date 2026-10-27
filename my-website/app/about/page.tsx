export default function About() {
  return (
    <main className="flex-1 pt-16">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About Me
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/80">
          I am a full-stack developer passionate about building responsive,
          production-ready web applications. I enjoy working across the entire
          stack — from crafting polished user interfaces to designing robust
          backend services and databases.
        </p>
        <h2 className="mt-10 mb-4 text-xl font-semibold text-foreground">
          Skills
        </h2>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>Frontend: HTML, CSS, JavaScript, React, Next.js</li>
          <li>Backend: Node.js, APIs, authentication, CRUD</li>
          <li>Database: SQL, data modeling, queries</li>
          <li>Tools: Git, GitHub, Vercel, Tailwind CSS, TypeScript</li>
        </ul>
        <p className="mt-8 text-lg leading-8 text-foreground/80">
          My goal is to grow as a full-stack engineer and contribute to real
          products that solve meaningful problems.
        </p>
      </section>
    </main>
  );
}

