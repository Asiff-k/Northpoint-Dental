import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

let client: SupabaseClient | undefined;

/**
 * Anon client. Row level security limits it to reading the public catalogue
 * (dentists, services, prices, availability, clinic settings).
 * Call only when `hasSupabaseEnv()` is true.
 */
export function createPublicClient(): SupabaseClient {
  client ??= createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
