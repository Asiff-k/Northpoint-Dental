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
  photo: string; // Unsplash portrait URL, credited in public/images/CREDITS.md
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
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&crop=faces&w=800&h=1000&q=75",
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
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&crop=faces&w=800&h=1000&q=75",
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
    photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&crop=faces&w=800&h=1000&q=75",
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
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=800&h=1000&q=75",
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

// ---- site content ---------------------------------------------------------

const unsplash = (id: string, w: number, h: number, faces = false) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop${faces ? "&crop=faces" : ""}&w=${w}&h=${h}&q=75`;

/** Sample imagery. Every photo is logged in public/images/CREDITS.md. */
export const images = {
  hero: {
    src: unsplash("1629909613654-28e377c37b09", 1400, 1500),
    alt: "A bright, calm treatment room at the clinic",
  },
  about: {
    src: unsplash("1629909615184-74f495363b67", 1600, 1000),
    alt: "The open-plan treatment area with natural light",
  },
  rooms: [
    {
      src: unsplash("1629909613654-28e377c37b09", 900, 700),
      alt: "Treatment room one, white and light filled",
    },
    {
      src: unsplash("1598256989800-fe5f95da9787", 900, 700),
      alt: "Treatment room two with warm wooden details",
    },
    {
      src: unsplash("1629909615184-74f495363b67", 900, 700),
      alt: "The hygiene suite",
    },
  ],
  technology: {
    src: unsplash("1606811841689-23dfddce3e95", 1200, 900),
    alt: "A dentist talking a patient through their scan on screen",
  },
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Dentists", href: "/dentists" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const hero = {
  eyebrow: "Welcoming new patients in Leeds",
  subhead:
    "Choose your dentist, see every price before you book, and reserve a time in under a minute.",
  intentLabel: "I would like to...",
  primaryCta: "Book an appointment",
  secondaryCta: "Ask Ava",
  consultationCta: "Or book a free 15-min consultation",
} as const;

export const whyChooseUs = [
  {
    icon: "HeartHandshake",
    title: "Nervous patients welcome",
    text: "Longer first visits, every step explained, and you can pause at any time.",
  },
  {
    icon: "CalendarClock",
    title: "Evening and Saturday appointments",
    text: "Open until 20:00 on Tuesdays and Thursdays, and Saturday mornings.",
  },
  {
    icon: "Siren",
    title: "Same-day emergencies",
    text: "We hold emergency slots back every day so you are not left in pain.",
  },
  {
    icon: "ReceiptPoundSterling",
    title: "Transparent per-dentist pricing",
    text: "Every clinician's fee is published. The price you see is the price you pay.",
  },
  {
    icon: "Percent",
    title: "0% finance",
    text: "Spread treatment over £500 across 6 to 24 months, interest free.",
  },
  {
    icon: "ScanLine",
    title: "Modern technology",
    text: "Digital X-rays, 3D intraoral scanning and Airflow polishing as standard.",
  },
] as const;

export const bookingSteps = [
  {
    title: "Choose your treatment",
    text: "Pick a service, or start with a free 15-minute consultation.",
  },
  {
    title: "Pick your dentist and time",
    text: "See each clinician's price and live availability, then choose a slot.",
  },
  {
    title: "Get instant confirmation",
    text: "Your booking is confirmed by email, with a link to change or cancel.",
  },
] as const;

/**
 * Before and after sliders. Illustrative only: one calm portrait per
 * treatment, with the "before" side muted in CSS. No clinical photography.
 */
export const beforeAfter = [
  {
    treatment: "Teeth whitening",
    serviceSlug: "teeth-whitening",
    caption: "A brighter, even shade in 2 to 3 weeks.",
    image: unsplash("1494790108377-be9c29b29330", 900, 1000, true),
    alt: "Portrait of a smiling woman",
  },
  {
    treatment: "Composite bonding",
    serviceSlug: "composite-bonding",
    caption: "Chips and gaps reshaped in a single visit.",
    image: unsplash("1500648767791-00dcc994a43e", 900, 1000, true),
    alt: "Portrait of a man with a relaxed smile",
  },
  {
    treatment: "Clear aligners",
    serviceSlug: "aligner-consultation",
    caption: "Straighter teeth with discreet, removable aligners.",
    image: unsplash("1544005313-94ddf0286df2", 900, 1000, true),
    alt: "Portrait of a woman looking calmly at the camera",
  },
] as const;

export const about = {
  headline: "Dentistry that feels calm, clear and unhurried",
  intro:
    "Northpoint opened on Park Square with one idea: a dental visit should feel as considered as the treatment itself.",
  story: [
    "Dr Sarah Mitchell founded the practice after years of seeing patients put off care because they felt rushed, judged or unsure what things would cost. Northpoint was designed to remove each of those worries.",
    "Appointments are longer. Every fee is published for every clinician. You choose who you see, and you can book, move or cancel online without picking up the phone.",
    "Today our team of four looks after families, professionals and plenty of people who thought they would never enjoy visiting a dentist.",
  ],
  values: [
    { title: "Unhurried", text: "Longer appointments so nothing feels rushed." },
    { title: "Transparent", text: "Published prices for every dentist and treatment." },
    { title: "Gentle", text: "A team chosen for kindness as much as skill." },
  ],
  technology: [
    {
      icon: "Radiation",
      title: "Digital X-rays",
      text: "Low-dose images in seconds, shown on screen so you can see what we see.",
    },
    {
      icon: "ScanFace",
      title: "Intraoral 3D scanner",
      text: "No putty impressions. A quick scan builds a precise 3D model of your teeth.",
    },
    {
      icon: "Wind",
      title: "Airflow polishing",
      text: "Warm water and fine powder lift staining gently, with no scraping.",
    },
  ],
  accreditations: [
    {
      name: "General Dental Council",
      short: "GDC",
      text: "Every clinician is registered with the GDC. Registration numbers are shown on each profile.",
    },
    {
      name: "Care Quality Commission",
      short: "CQC",
      text: "The practice is regulated by the CQC, the independent regulator of health care in England.",
    },
  ],
} as const;

// ---- helpers --------------------------------------------------------------

/** GDC number without the "(sample)" marker. Show a Sample tag when isDemo. */
export const gdcDisplay = (d: Dentist) =>
  d.gdcNumber.replace(/\s*\(sample\)/i, "");

/** "Dr Patel" for dentists, first name for the rest of the team. */
export const shortName = (d: Dentist) => {
  const parts = d.name.split(" ");
  return parts[0] === "Dr" ? `Dr ${parts[parts.length - 1]}` : parts[0];
};

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const getDentist = (slug: string) => dentists.find((d) => d.slug === slug);

export const maxPrice = (s: Service) => Math.max(...Object.values(s.prices));

/** Finance applies only to eligible services at or above the minimum spend. */
export const financeApplies = (s: Service, pence: number) =>
  clinic.finance.enabled &&
  Boolean(s.financeEligible) &&
  pence >= clinic.finance.minSpendPence;

export const longestFinanceTerm = () => Math.max(...clinic.finance.terms);

export const categoryLabels: Record<ServiceCategory, string> = {
  general: "General",
  hygiene: "Hygiene",
  cosmetic: "Cosmetic",
  restorative: "Restorative",
  orthodontics: "Orthodontics",
  emergency: "Emergency",
};

export const weekdayLabels: Record<Weekday, { short: string; long: string }> = {
  mon: { short: "Mon", long: "Monday" },
  tue: { short: "Tue", long: "Tuesday" },
  wed: { short: "Wed", long: "Wednesday" },
  thu: { short: "Thu", long: "Thursday" },
  fri: { short: "Fri", long: "Friday" },
  sat: { short: "Sat", long: "Saturday" },
  sun: { short: "Sun", long: "Sunday" },
};

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
