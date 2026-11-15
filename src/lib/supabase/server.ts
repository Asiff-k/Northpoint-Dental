import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseUrl } from "@/lib/supabase/env";

let client: SupabaseClient | undefined;

/**
 * Service role client. Bypasses row level security, so it must never reach
 * the browser. Used by the booking engine (Phase 3) and admin (Phase 6).
 */
export function createServiceClient(): SupabaseClient {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !key) {
    throw new Error(
      "Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  client ??= createClient(supabaseUrl, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
