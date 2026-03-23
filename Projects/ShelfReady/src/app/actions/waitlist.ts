"use server";

import { createSupabaseClient } from "@/lib/supabase";

export type WaitlistResult =
  | { status: "success" }
  | { status: "duplicate" }
  | { status: "error"; message: string };

export async function joinWaitlist(
  email: string,
  firstName: string
): Promise<WaitlistResult> {
  // Server-side validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { status: "error", message: "Supabase is not configured. Add credentials to .env.local." };
  }

  const supabase = createSupabaseClient();

  const { error } = await supabase.from("waitlist").insert({
    email: email.toLowerCase().trim(),
    first_name: firstName.trim() || null,
  });

  if (!error) return { status: "success" };

  // Postgres unique constraint violation
  if (error.code === "23505") return { status: "duplicate" };

  return { status: "error", message: "Something went wrong. Please try again." };
}
