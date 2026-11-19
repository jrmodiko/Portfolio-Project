"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { usePathname } from "next/navigation";

import { submitContact } from "@/lib/actions/contact";
import type { ContactFormState } from "@/lib/actions/contact";

const inputClass =
  "mt-1 block w-full rounded-xl border border-card-border bg-card px-4 py-3 text-sm text-foreground placeholder-text-muted/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-background";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={
        "btn-cosmic w-full rounded-xl px-8 py-3.5 text-sm font-semibold text-white shadow-glow" +
        (pending ? " opacity-70" : "")
      }
    >
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

export default function ContactForm() {
  const pathname = usePathname();
  const [state, formAction] = useActionState(
    submitContact,
    { success: false, message: "" },
    pathname
  );

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-[2rem] glass-strong border border-primary/20 p-8 shadow-glow md:p-12 cosmic-glow"
    >
      {/* Honeypot field: invisible to humans, often auto-filled by bots. */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-4">
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Name
        </label>
        <input id="name" name="name" type="text" required className={inputClass} />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-sm text-accent">{state.fieldErrors.name}</p>
        )}
      </div>

      <div className="space-y-4">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-sm text-accent">{state.fieldErrors.email}</p>
        )}
      </div>

      <div className="space-y-4">
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea id="message" name="message" rows={4} required className={inputClass} />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-sm text-accent">{state.fieldErrors.message}</p>
        )}
      </div>

      <SubmitButton />

      {state.message && (
        <p
          className={
            "mt-4 text-sm text-center font-medium" +
            (state.success ? " text-primary" : " text-accent")
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
