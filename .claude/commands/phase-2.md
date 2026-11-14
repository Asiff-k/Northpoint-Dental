---
description: Phase 2, Supabase schema, seed and data layer
---
Build **Phase 2: database**. Read `CLAUDE.md` and `docs/blueprint.md` section 8. Plan mode first.

1. Install `@supabase/supabase-js` and `@supabase/ssr`. Create `src/lib/supabase/server.ts` (service role, server only, `import "server-only"`) and `client.ts` (anon).
2. Write `supabase/migrations/0001_init.sql`: the 7 tables, enums for category and booking status, `btree_gist` extension, the exclusion constraint on bookings (same dentist, overlapping `tstzrange(starts_at, ends_at)`, status confirmed), useful indexes, RLS policies (public read on catalogue tables; no public access to bookings).
3. Write `scripts/seed.ts` that upserts everything from `src/config/clinic.config.ts` (idempotent, run with `npx tsx scripts/seed.ts`).
4. Create `src/lib/data.ts` with the same function names the pages already use, now reading from Supabase with `unstable_cache`/tags so pages stay fast. Fall back to the config file when Supabase env vars are missing, so the demo still runs offline.
5. Tell me exactly which commands to run to apply the migration (Supabase CLI or SQL editor) and seed.

Done when: build passes, and changing a price in Supabase then revalidating shows on `/pricing`. Commit `feat: phase 2 database`.
