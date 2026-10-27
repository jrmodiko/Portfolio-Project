export default function Login() {
  return (
    <main className="flex-1 pt-16">
      <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center">
          Login
        </h1>
        <p className="mt-2 text-center text-foreground/60">
          Sign in to access the admin dashboard.
        </p>
        <form
          className="mt-10 space-y-4"
          action="/api/login"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-white bg-white px-3 py-2 text-sm text-foreground shadow-sm dark:bg-gray-800 dark:border-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-white bg-white px-3 py-2 text-sm text-foreground shadow-sm dark:bg-gray-800 dark:border-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-600 w-full px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

