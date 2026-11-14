/**
 * Northpoint Dental: single source of truth for the demo clinic.
 *
 * Every page, the chatbot and the booking engine read from this file
 * (Phase 1) and later from Supabase, seeded from this file (Phase 2).
 * To reuse the template for a new clinic, edit this file only.
 *
 * DEMO DATA: the clinic, people, prices, reviews and ratings are fictional
 * samples. Anything marked `isSample: true` must show a visible "Sample"
 * label in the UI. Never ship sample reviews or ratings to a real client.
 */

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type ServiceCategory =
  | "general"
  | "hygiene"
  | "cosmetic"
  | "restorative"
  | "orthodontics"
  | "emergency";

export interface OpeningHours {
  day: Weekday;
  open: string | null; // "08:30", null = closed
  close: string | null;
}

export interface Dentist {
  slug: string;
  name: string;
  role: string;
  gdcNumber: string; // UK General Dental Council registration (sample)
  yearsExperience: number;
  languages: string[];
  specialties: string[];
  bio: string;
  photo: string; // path under /public/images/team
  /** Weekly working pattern used by the booking engine. */
  availability: { day: Weekday; start: string; end: string }[];
}

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  durationMin: number;
  summary: string;
  icon: string; // lucide-react icon name
  popular?: boolean;
  /** Price per dentist in pence. Missing dentist = not offered by them. */
  prices: Record<string, number>;
  /** Member price in pence (membership plan). Omit if not eligible. */
  memberPricePence?: number;
  financeEligible?: boolean;
}

export interface Review {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  treatment: string;
  dentistSlug?: string;
  isSample: true;
}

export interface Faq {
  q: string;
  a: string;
}

export const clinic = {
  name: "Northpoint Dental",
  tagline: "Calm, modern dentistry in the heart of Leeds",
  isDemo: true,
  currency: "GBP",
  locale: "en-GB",
  timezone: "Europe/London",

  contact: {
    phone: "0113 496 0123", // Ofcom drama/fiction range, safe for demos
    phoneHref: "tel:+441134960123",
    whatsapp: "https://wa.me/441134960123",
    email: "hello@northpointdental.example",
  },

  address: {
    line1: "14 Park Square East",
    city: "Leeds",
    postcode: "LS1 2NE",
    country: "United Kingdom",
    lat: 53.7996,
    lng: -1.5528,
    mapEmbedQuery: "Park Square East, Leeds LS1 2NE",
    gettingHere: [
      "6 min walk from Leeds railway station",
      "Pay and display parking on Park Square",
      "Step-free access to all treatment rooms",
    ],
  },

  hours: [
    { day: "mon", open: "08:30", close: "18:00" },
    { day: "tue", open: "08:30", close: "20:00" },
    { day: "wed", open: "08:30", close: "18:00" },
    { day: "thu", open: "08:30", close: "20:00" },
    { day: "fri", open: "08:30", close: "17:00" },
    { day: "sat", open: "09:00", close: "14:00" },
    { day: "sun", open: null, close: null },
  ] satisfies OpeningHours[],

  booking: {
    slotStepMin: 15,
    bufferMin: 10,
    minNoticeHours: 2,
    windowDays: 60,
    cancelNoticeHours: 24,
  },

  trust: {
    googleRating: 4.9,
    googleReviewCount: 412,
    ratingIsSample: true,
    regulators: ["GDC", "CQC"],
    yearsOpen: 12,
    patientsTreated: "18,000+",
  },

  offers: {
    newPatient: {
      enabled: true,
      label: "New patient exam + X-rays",
      wasPence: 9500,
      nowPence: 6500,
      note: "For new patients booking online this month",
    },
    freeConsultation: {
      enabled: true,
      label: "Free 15-minute cosmetic consultation",
      durationMin: 15,
    },
  },

  membership: {
    name: "Northpoint Care Plan",
    monthlyPence: 1800,
    includes: [
      "2 check-ups a year",
      "2 hygiene visits a year",
      "Emergency call-out cover",
      "10% off treatment",
    ],
  },

  finance: {
    enabled: true,
    aprPercent: 0,
    minSpendPence: 50000,
    terms: [6, 12, 24],
    disclaimer: "Subject to status, affordability and age. Minimum spend applies.",
  },

  emergency: {
    sameDay: true,
    redFlags: [
      "facial swelling",
      "knocked-out tooth",
      "bleeding that won't stop",
      "severe pain",
    ],
    outOfHours: "Call NHS 111. If swelling affects breathing or swallowing, call 999.",
  },

  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
} as const;

export const dentists: Dentist[] = [
  {
    slug: "sarah-mitchell",
    name: "Dr Sarah Mitchell",
    role: "Principal Dentist",
    gdcNumber: "000001 (sample)",
    yearsExperience: 16,
    languages: ["English"],
    specialties: ["Cosmetic dentistry", "Nervous patients", "Crowns"],
    bio: "Sarah founded Northpoint to make dentistry feel calm and unhurried. She is known for gentle care and clear, no-pressure treatment plans.",
    photo: "/images/team/sarah-mitchell.jpg",
    availability: [
      { day: "mon", start: "09:00", end: "17:00" },
      { day: "tue", start: "09:00", end: "19:30" },
      { day: "thu", start: "09:00", end: "17:00" },
      { day: "fri", start: "09:00", end: "16:30" },
    ],
  },
  {
    slug: "james-patel",
    name: "Dr James Patel",
    role: "Associate Dentist",
    gdcNumber: "000002 (sample)",
    yearsExperience: 7,
    languages: ["English", "Gujarati", "Hindi"],
    specialties: ["Composite bonding", "Root canal", "Emergencies"],
    bio: "James focuses on conservative dentistry and same-day emergency care, and loves turning a worried first visit into a relaxed one.",
    photo: "/images/team/james-patel.jpg",
    availability: [
      { day: "mon", start: "08:30", end: "17:30" },
      { day: "wed", start: "08:30", end: "17:30" },
      { day: "thu", start: "12:00", end: "19:30" },
      { day: "sat", start: "09:00", end: "13:30" },
    ],
  },
  {
    slug: "elena-rossi",
    name: "Dr Elena Rossi",
    role: "Specialist in Orthodontics and Implants",
    gdcNumber: "000003 (sample)",
    yearsExperience: 12,
    languages: ["English", "Italian"],
    specialties: ["Clear aligners", "Dental implants", "Complex root canal"],
    bio: "Elena is a referral-level clinician for aligners and implants, using digital scans to show patients their result before treatment starts.",
    photo: "/images/team/elena-rossi.jpg",
    availability: [
      { day: "tue", start: "09:00", end: "17:00" },
      { day: "wed", start: "09:00", end: "17:00" },
      { day: "fri", start: "09:00", end: "16:00" },
    ],
  },
  {
    slug: "emma-clarke",
    name: "Emma Clarke",
    role: "Dental Hygienist",
    gdcNumber: "000004 (sample)",
    yearsExperience: 9,
    languages: ["English"],
    specialties: ["Airflow cleaning", "Gum health", "Whitening"],
    bio: "Emma's hygiene visits are famously gentle. She uses Airflow polishing and explains every step so there are no surprises.",
    photo: "/images/team/emma-clarke.jpg",
    availability: [
      { day: "mon", start: "08:30", end: "17:30" },
      { day: "tue", start: "12:00", end: "19:30" },
      { day: "thu", start: "08:30", end: "17:30" },
      { day: "sat", start: "09:00", end: "13:30" },
    ],
  },
];

export const services: Service[] = [
  {
    slug: "new-patient-exam",
    name: "New patient exam + X-rays",
    category: "general",
    durationMin: 45,
    summary: "A full check of teeth, gums and mouth, digital X-rays and a written plan.",
    icon: "ClipboardCheck",
    popular: true,
    prices: { "sarah-mitchell": 9500, "james-patel": 8000, "elena-rossi": 12000 },
  },
  {
    slug: "check-up",
    name: "Routine check-up",
    category: "general",
    durationMin: 30,
    summary: "Six-monthly examination for existing patients.",
    icon: "Stethoscope",
    prices: { "sarah-mitchell": 6500, "james-patel": 5500 },
    memberPricePence: 0,
  },
  {
    slug: "hygiene-clean",
    name: "Hygiene clean (Airflow)",
    category: "hygiene",
    durationMin: 45,
    summary: "Gentle scale and Airflow polish to remove staining and protect gums.",
    icon: "Sparkles",
    popular: true,
    prices: { "emma-clarke": 8500 },
    memberPricePence: 0,
  },
  {
    slug: "white-filling",
    name: "White filling",
    category: "restorative",
    durationMin: 45,
    summary: "Tooth-coloured composite filling, matched to your natural shade.",
    icon: "Shield",
    prices: { "sarah-mitchell": 16000, "james-patel": 13500 },
    memberPricePence: 12150,
  },
  {
    slug: "root-canal-front",
    name: "Root canal (front tooth)",
    category: "restorative",
    durationMin: 90,
    summary: "Saves an infected tooth under local anaesthetic, usually in one visit.",
    icon: "Activity",
    prices: { "sarah-mitchell": 55000, "james-patel": 48000, "elena-rossi": 75000 },
    financeEligible: true,
  },
  {
    slug: "crown",
    name: "Porcelain crown",
    category: "restorative",
    durationMin: 60,
    summary: "A natural-looking cap that restores a broken or weak tooth.",
    icon: "Crown",
    prices: { "sarah-mitchell": 75000, "james-patel": 65000 },
    financeEligible: true,
  },
  {
    slug: "teeth-whitening",
    name: "Teeth whitening (home kit)",
    category: "cosmetic",
    durationMin: 30,
    summary: "Custom trays and professional gel for a safe, even result in 2 to 3 weeks.",
    icon: "Sun",
    popular: true,
    prices: { "sarah-mitchell": 35000, "james-patel": 29900, "emma-clarke": 29900 },
  },
  {
    slug: "composite-bonding",
    name: "Composite bonding (per tooth)",
    category: "cosmetic",
    durationMin: 60,
    summary: "Reshape chips and gaps in a single visit with no drilling.",
    icon: "Wand2",
    popular: true,
    prices: { "sarah-mitchell": 28000, "james-patel": 24000 },
    financeEligible: true,
  },
  {
    slug: "aligner-consultation",
    name: "Clear aligners consultation",
    category: "orthodontics",
    durationMin: 30,
    summary: "3D scan and a preview of your straighter smile before you commit.",
    icon: "ScanFace",
    prices: { "elena-rossi": 5000 },
  },
  {
    slug: "dental-implant",
    name: "Single dental implant",
    category: "restorative",
    durationMin: 90,
    summary: "Permanent replacement for a missing tooth, crown included.",
    icon: "Anchor",
    popular: true,
    prices: { "elena-rossi": 240000 },
    financeEligible: true,
  },
  {
    slug: "emergency",
    name: "Emergency appointment",
    category: "emergency",
    durationMin: 30,
    summary: "Same-day slot to get you out of pain and plan next steps.",
    icon: "Siren",
    prices: { "sarah-mitchell": 9500, "james-patel": 8500 },
    memberPricePence: 0,
  },
];

export const reviews: Review[] = [
  { name: "Hannah W.", rating: 5, text: "I hadn't been to a dentist in eight years. Sarah never made me feel judged and I actually look forward to my check-ups now.", treatment: "Nervous patient", dentistSlug: "sarah-mitchell", isSample: true },
  { name: "Tom R.", rating: 5, text: "Booked an emergency slot through the chat at 7am and was seen by 10. Pain gone the same day.", treatment: "Emergency", dentistSlug: "james-patel", isSample: true },
  { name: "Priya S.", rating: 5, text: "Elena showed me a 3D preview of my aligner result before I paid anything. Brilliant experience.", treatment: "Clear aligners", dentistSlug: "elena-rossi", isSample: true },
  { name: "Mark D.", rating: 5, text: "The most gentle clean I've ever had. Emma explains everything as she goes.", treatment: "Hygiene", dentistSlug: "emma-clarke", isSample: true },
  { name: "Grace L.", rating: 5, text: "Prices were on the website, per dentist, and exactly what I paid. No surprises.", treatment: "Composite bonding", dentistSlug: "james-patel", isSample: true },
  { name: "Owen B.", rating: 5, text: "Evening appointment after work and free parking nearby. Couldn't be easier.", treatment: "Check-up", dentistSlug: "sarah-mitchell", isSample: true },
];

export const faqs: Faq[] = [
  { q: "How much does a check-up cost?", a: "From £55 for existing patients. New patients start with a full exam and X-rays, currently £65 when booked online." },
  { q: "Are you NHS or private?", a: "We are a private practice. That means longer appointments, same-week availability and published prices for every dentist." },
  { q: "Can I spread the cost of treatment?", a: "Yes. Treatments over £500 can be spread over 6 to 24 months at 0% APR, subject to status." },
  { q: "I'm nervous about the dentist. Can you help?", a: "Most of our new patients say they are nervous. We book longer first visits, explain every step and you can stop at any time." },
  { q: "What if I need to cancel?", a: "Use the link in your confirmation email to cancel or move your appointment up to 24 hours before, free of charge." },
  { q: "Do you see emergencies?", a: "Yes, we keep same-day emergency slots. Book online or call us; out of hours, call NHS 111." },
];

/** "I would like to..." hero intent selector. */
export const intents = [
  { label: "Fix a toothache today", serviceSlug: "emergency" },
  { label: "Get a check-up", serviceSlug: "new-patient-exam" },
  { label: "Whiten my teeth", serviceSlug: "teeth-whitening" },
  { label: "Straighten my teeth", serviceSlug: "aligner-consultation" },
  { label: "Replace a missing tooth", serviceSlug: "dental-implant" },
  { label: "Fix a chipped tooth", serviceSlug: "composite-bonding" },
] as const;

// ---- helpers --------------------------------------------------------------

export const formatPrice = (pence: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: pence % 100 === 0 ? 0 : 2,
  }).format(pence / 100);

export const fromPrice = (s: Service) => Math.min(...Object.values(s.prices));

export const dentistsForService = (s: Service) =>
  dentists.filter((d) => d.slug in s.prices);

export const servicesForDentist = (d: Dentist) =>
  services.filter((s) => d.slug in s.prices);

export const monthlyFinance = (pence: number, months: number) =>
  Math.ceil(pence / months);
