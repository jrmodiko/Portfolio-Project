export default function Contact() {
  return (
    <main className="flex-1 pt-16">
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Contact
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/80">
          Interested in working together or have a question? Reach out — I’d
          love to hear from you.
        </p>
        <form
          className="mt-10 space-y-4"
          action="/api/contact"
          method="POST"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-white bg-white px-3 py-2 text-sm text-foreground shadow-sm dark:bg-gray-800 dark:border-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            />
          </div>
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
              htmlFor="message"
              className="block text-sm font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-1 block w-full rounded-md border border-white bg-white px-3 py-2 text-sm text-foreground shadow-sm dark:bg-gray-800 dark:border-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            ></textarea>
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Send Message
          </button>
        </form>
        <p className="mt-10 text-sm text-foreground/60">
          Or connect with me on GitHub and LinkedIn.
        </p>
      </section>
    </main>
  );
}

