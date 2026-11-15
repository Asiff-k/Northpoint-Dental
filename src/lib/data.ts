import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import {
  clinic,
  dentists as configDentists,
  services as configServices,
  type Dentist,
  type OpeningHours,
  type Service,
  type ServiceCategory,
  type Weekday,
} from "@/config/clinic.config";
import { createPublicClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/env";

/**
 * The site's only read path for catalogue data (dentists, services, prices,
 * availability). Reads from Supabase, cached and tagged, and falls back to
 * clinic.config.ts when Supabase is not configured so the demo runs offline.
 *
 * Revalidate after a change with POST /api/revalidate (see README).
 */

export const CATALOGUE_TAG = "catalogue";
export const SETTINGS_TAG = "clinic-settings";

export interface Catalogue {
  dentists: Dentist[];
  services: Service[];
  source: "supabase" | "config";
}

export interface ClinicSettings {
  name: string;
  timezone: string;
  contact: { phone: string; phoneHref: string; whatsapp: string; email: string };
  address: {
    line1: string;
    city: string;
    postcode: string;
    country: string;
    lat: number;
    lng: number;
    mapEmbedQuery: string;
    gettingHere: string[];
  };
  hours: OpeningHours[];
  booking: {
    slotStepMin: number;
    bufferMin: number;
    minNoticeHours: number;
    windowDays: number;
    cancelNoticeHours: number;
  };
}

// ---- row shapes -------------------------------------------------------------

interface DentistRow {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  gdc_number: string;
  years_experience: number;
  languages: string[];
  specialties: string[];
  availability_rules: { weekday: Weekday; start_time: string; end_time: string }[];
}

interface ServiceRow {
  slug: string;
  name: string;
  category: ServiceCategory;
  summary: string;
  icon: string;
  default_duration_min: number;
  member_price_pence: number | null;
  finance_eligible: boolean;
  popular: boolean;
  dentist_services: { price_pence: number; dentists: { slug: string } | null }[];
}

interface SettingsRow {
  name: string;
  timezone: string;
  contact: ClinicSettings["contact"];
  address: ClinicSettings["address"];
  hours: OpeningHours[];
  booking_rules: ClinicSettings["booking"];
}

const WEEKDAY_ORDER: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

/** Postgres `time` comes back as "09:00:00". */
const hhmm = (time: string) => time.slice(0, 5);

function toDentist(row: DentistRow): Dentist {
  return {
    slug: row.slug,
    name: row.name,
    role: row.role,
    gdcNumber: row.gdc_number,
    yearsExperience: row.years_experience,
    languages: row.languages,
    specialties: row.specialties,
    bio: row.bio,
    photo: row.photo_url,
    availability: row.availability_rules
      .map((a) => ({ day: a.weekday, start: hhmm(a.start_time), end: hhmm(a.end_time) }))
      .sort(
        (a, b) =>
          WEEKDAY_ORDER.indexOf(a.day) - WEEKDAY_ORDER.indexOf(b.day) ||
          a.start.localeCompare(b.start),
      ),
  };
}

function toService(row: ServiceRow): Service {
  const prices: Record<string, number> = {};
  for (const pair of row.dentist_services) {
    // A null dentist is one hidden by RLS (inactive): not bookable.
    if (pair.dentists) prices[pair.dentists.slug] = pair.price_pence;
  }
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    durationMin: row.default_duration_min,
    summary: row.summary,
    icon: row.icon,
    popular: row.popular,
    prices,
    memberPricePence: row.member_price_pence ?? undefined,
    financeEligible: row.finance_eligible,
  };
}

const configCatalogue = (): Catalogue => ({
  dentists: configDentists,
  services: configServices,
  source: "config",
});

const configSettings = (): ClinicSettings => ({
  name: clinic.name,
  timezone: clinic.timezone,
  contact: { ...clinic.contact },
  address: { ...clinic.address, gettingHere: [...clinic.address.gettingHere] },
  hours: clinic.hours.map((h) => ({ ...h })),
  booking: { ...clinic.booking },
});

// ---- cached reads -----------------------------------------------------------

export async function getCatalogue(): Promise<Catalogue> {
  "use cache";
  cacheTag(CATALOGUE_TAG);

  if (!hasSupabaseEnv()) {
    cacheLife("hours");
    return configCatalogue();
  }

  try {
    const supabase = createPublicClient();
    const [dentistsRes, servicesRes] = await Promise.all([
      supabase
        .from("dentists")
        .select(
          "slug, name, role, bio, photo_url, gdc_number, years_experience, languages, specialties, availability_rules(weekday, start_time, end_time)",
        )
        .eq("active", true)
        .order("sort_order"),
      supabase
        .from("services")
        .select(
          "slug, name, category, summary, icon, default_duration_min, member_price_pence, finance_eligible, popular, dentist_services(price_pence, dentists(slug))",
        )
        .eq("active", true)
        .order("sort_order"),
    ]);
    if (dentistsRes.error) throw new Error(dentistsRes.error.message);
    if (servicesRes.error) throw new Error(servicesRes.error.message);

    const dentists = (dentistsRes.data as unknown as DentistRow[]).map(toDentist);
    const services = (servicesRes.data as unknown as ServiceRow[])
      .map(toService)
      // A service nobody offers has no price to show.
      .filter((s) => Object.keys(s.prices).length > 0);

    if (dentists.length === 0 || services.length === 0) {
      throw new Error("catalogue tables are empty, run `npm run seed`");
    }

    cacheLife("hours");
    return { dentists, services, source: "supabase" };
  } catch (error) {
    console.warn(
      `[data] Supabase catalogue read failed, using clinic.config.ts: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    // Retry soon instead of pinning the fallback for an hour.
    cacheLife("minutes");
    return configCatalogue();
  }
}

export async function getClinicSettings(): Promise<ClinicSettings> {
  "use cache";
  cacheTag(SETTINGS_TAG);

  if (!hasSupabaseEnv()) {
    cacheLife("hours");
    return configSettings();
  }

  try {
    const { data, error } = await createPublicClient()
      .from("clinic_settings")
      .select("name, timezone, contact, address, hours, booking_rules")
      .single();
    if (error) throw new Error(error.message);
    const row = data as unknown as SettingsRow;
    cacheLife("hours");
    return {
      name: row.name,
      timezone: row.timezone,
      contact: row.contact,
      address: row.address,
      hours: row.hours,
      booking: row.booking_rules,
    };
  } catch (error) {
    console.warn(
      `[data] Supabase settings read failed, using clinic.config.ts: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    cacheLife("minutes");
    return configSettings();
  }
}

// ---- accessors --------------------------------------------------------------

export const getDentists = async () => (await getCatalogue()).dentists;

export const getServices = async () => (await getCatalogue()).services;

export const getDentist = async (slug: string) =>
  (await getDentists()).find((d) => d.slug === slug);

export const getService = async (slug: string) =>
  (await getServices()).find((s) => s.slug === slug);

/** Price in pence for a dentist + service pair, or undefined if not offered. */
export const getPrice = async (dentistSlug: string, serviceSlug: string) =>
  (await getService(serviceSlug))?.prices[dentistSlug];
