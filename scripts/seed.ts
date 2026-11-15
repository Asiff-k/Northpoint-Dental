/**
 * Seeds Supabase from src/config/clinic.config.ts.
 *   npm run seed
 *
 * Idempotent: upserts by slug, so it is safe to run again after editing the
 * config. It overwrites catalogue values (including prices edited in
 * Supabase) with the config's. It never touches bookings or time off.
 */
import { existsSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { clinic, dentists, services } from "../src/config/clinic.config";

for (const file of [".env.local", ".env"]) {
  if (existsSync(file)) process.loadEnvFile(file);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them to .env.local.",
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function check<T>(step: string, res: { data: T; error: { message: string } | null }): T {
  if (res.error) {
    console.error(`Seed failed at "${step}": ${res.error.message}`);
    process.exit(1);
  }
  return res.data;
}

async function main() {
  check(
    "clinic_settings",
    await supabase.from("clinic_settings").upsert({
      id: 1,
      name: clinic.name,
      timezone: clinic.timezone,
      contact: clinic.contact,
      address: clinic.address,
      hours: clinic.hours,
      booking_rules: clinic.booking,
      updated_at: new Date().toISOString(),
    }),
  );

  const dentistRows = check(
    "dentists",
    await supabase
      .from("dentists")
      .upsert(
        dentists.map((d, i) => ({
          slug: d.slug,
          name: d.name,
          role: d.role,
          bio: d.bio,
          photo_url: d.photo,
          gdc_number: d.gdcNumber,
          years_experience: d.yearsExperience,
          languages: d.languages,
          specialties: d.specialties,
          sort_order: i,
          active: true,
        })),
        { onConflict: "slug" },
      )
      .select("id, slug"),
  ) as { id: number; slug: string }[];
  const dentistId = new Map(dentistRows.map((r) => [r.slug, r.id]));

  const serviceRows = check(
    "services",
    await supabase
      .from("services")
      .upsert(
        services.map((s, i) => ({
          slug: s.slug,
          name: s.name,
          category: s.category,
          summary: s.summary,
          icon: s.icon,
          default_duration_min: s.durationMin,
          member_price_pence: s.memberPricePence ?? null,
          finance_eligible: Boolean(s.financeEligible),
          popular: Boolean(s.popular),
          sort_order: i,
          active: true,
        })),
        { onConflict: "slug" },
      )
      .select("id, slug"),
  ) as { id: number; slug: string }[];
  const serviceId = new Map(serviceRows.map((r) => [r.slug, r.id]));

  // Prices: upsert every pair in the config, then drop pairs it no longer has.
  const pairs = services.flatMap((s) =>
    Object.entries(s.prices).map(([dentistSlug, pence]) => {
      const dId = dentistId.get(dentistSlug);
      if (dId === undefined) {
        console.error(`Service "${s.slug}" has a price for unknown dentist "${dentistSlug}".`);
        process.exit(1);
      }
      return { dentist_id: dId, service_id: serviceId.get(s.slug)!, price_pence: pence };
    }),
  );
  check(
    "dentist_services",
    await supabase.from("dentist_services").upsert(pairs, { onConflict: "dentist_id,service_id" }),
  );

  const wanted = new Set(pairs.map((p) => `${p.dentist_id}:${p.service_id}`));
  const existing = check(
    "dentist_services read",
    await supabase
      .from("dentist_services")
      .select("dentist_id, service_id")
      .in("dentist_id", [...dentistId.values()])
      .in("service_id", [...serviceId.values()]),
  ) as { dentist_id: number; service_id: number }[];
  let removed = 0;
  for (const row of existing) {
    if (wanted.has(`${row.dentist_id}:${row.service_id}`)) continue;
    check(
      "dentist_services cleanup",
      await supabase
        .from("dentist_services")
        .delete()
        .eq("dentist_id", row.dentist_id)
        .eq("service_id", row.service_id),
    );
    removed++;
  }

  // Availability: replace each seeded dentist's weekly pattern.
  check(
    "availability_rules clear",
    await supabase.from("availability_rules").delete().in("dentist_id", [...dentistId.values()]),
  );
  const rules = dentists.flatMap((d) =>
    d.availability.map((a) => ({
      dentist_id: dentistId.get(d.slug)!,
      weekday: a.day,
      start_time: a.start,
      end_time: a.end,
    })),
  );
  check("availability_rules", await supabase.from("availability_rules").insert(rules));

  console.log(
    `Seeded ${clinic.name}: ${dentistRows.length} dentists, ${serviceRows.length} services, ` +
      `${pairs.length} prices (${removed} removed), ${rules.length} availability rules.`,
  );
}

main();
