export default function Admin() {
  return (
    <main className="flex-1 pt-16">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Admin Dashboard
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/80">
          Manage portfolio content, view submissions, and monitor site activity.
          Please log in to access this area.
        </p>
        <div className="mt-10 rounded-lg border border-white bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-600">
          <h2 className="text-lg font-semibold text-foreground">Coming Soon</h2>
          <p className="mt-2 text-sm text-foreground/60">
            The admin dashboard is under development as part of the portfolio
            plan. It will demonstrate authentication, role-based access, and
            CRUD operations.
          </p>
        </div>
      </section>
    </main>
  );
}

