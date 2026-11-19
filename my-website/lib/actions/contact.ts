"use server";

import { createServerClient } from "@/lib/supabase-server";

export interface ContactFormState {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
}

/**
 * Hidden honeypot field name. Real users leave it blank; bots often auto-fill
 * every input they find. If it is filled we treat the submission as a bot and
 * reject it with a generic message (we never reveal the honeypot).
 */
const HONEYPOT_FIELD = "website";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME_LEN = 100;
const MAX_EMAIL_LEN = 254;
const MIN_MESSAGE_LEN = 10;
const MAX_MESSAGE_LEN = 5000;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Server action for the contact form.
 * 1. Validates all input server-side (source of truth).
 * 2. Checks the hidden honeypot field to reject bot submissions.
 * 3. Inserts legitimate submissions into Supabase.
 */
export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get(HONEYPOT_FIELD) ?? "").trim();

  // Bot check: honeypot field filled => automated submission.
  // Do not reveal the honeypot; return a generic failure and do not insert.
  if (honeypot.length > 0) {
    console.warn("[submitContact] Suspected bot submission (honeypot filled)");
    return {
      success: false,
      message:
        "Unable to send your message right now. Please try again later.",
    };
  }

  // Validate required fields.
  const fieldErrors: Record<string, string> = {};

  if (!name) {
    fieldErrors.name = "Name is required.";
  } else if (name.length > MAX_NAME_LEN) {
    fieldErrors.name = `Name must be ${MAX_NAME_LEN} characters or less.`;
  }

  if (!email) {
    fieldErrors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  } else if (email.length > MAX_EMAIL_LEN) {
    fieldErrors.email = `Email must be ${MAX_EMAIL_LEN} characters or less.`;
  }

  if (!message) {
    fieldErrors.message = "Message is required.";
  } else if (message.length < MIN_MESSAGE_LEN) {
    fieldErrors.message = `Message must be at least ${MIN_MESSAGE_LEN} characters.`;
  } else if (message.length > MAX_MESSAGE_LEN) {
    fieldErrors.message = `Message must be ${MAX_MESSAGE_LEN} characters or less.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: "Please fix the errors below and try again.",
      fieldErrors,
    };
  }

  // Insert into Supabase using the service-role server client.
  // The service role bypasses RLS, so this works server-side regardless of RLS policies.
  const supabase = createServerClient();

  const { error } = await supabase.from("contact_submissions").insert({
    name,
    email,
    message,
  });

  if (error) {
    console.error("[submitContact] Supabase insert error:", error);
    return {
      success: false,
      message:
        "Something went wrong while saving your message. Please try again later.",
    };
  }

  return {
    success: true,
    message: "Thanks! Your message has been sent successfully.",
  };
}
