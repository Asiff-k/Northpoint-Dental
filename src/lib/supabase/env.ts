/** Public Supabase settings. Empty strings count as missing. */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/** False when the demo runs offline, so the data layer falls back to the config. */
export const hasSupabaseEnv = () => Boolean(supabaseUrl && supabaseAnonKey);
