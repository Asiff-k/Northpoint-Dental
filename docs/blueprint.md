# Northpoint Dental: build spec

Live, editable version of this plan: https://claude.ai/artifact/M5R3PMMy6vPcYy7JYiynzN
This file is the copy Claude Code reads. If they disagree, ask the user which wins.

Confirmed decisions: UK market (GBP), demo site for Incodet sales and reusable template, own booking engine (not Cal.com), brand "Northpoint Dental" with deep teal + mint.

## 1. Sitemap

| Route | Page | Main job |
| --- | --- | --- |
| `/` | Home | Trust + push to booking or chat |
| `/services` | All services | Browse by category, "from £X" prices |
| `/services/[slug]` | Service detail | What it is, duration, price per dentist, book button |
| `/dentists` | Our team | Dentist cards with role, GDC number, specialties |
| `/dentists/[slug]` | Dentist profile | Bio, their services and prices, next free slots |
| `/pricing` | Fee guide | Price matrix: services x dentists, member column, finance |
| `/book` | Booking wizard | 4 steps, accepts `?service=&dentist=&type=consultation` |
| `/booking/[token]` | Manage booking | View, cancel or reschedule from the email link |
| `/about` | About | Story, technology, accreditations, team photo |
| `/contact` | Contact and location | Map, hours, getting here, contact form |
| `/privacy`, `/terms` | Legal | UK GDPR notice, cancellation policy |
| `/admin` | Clinic dashboard | Bookings, availability, prices (Supabase Auth) |

Emergency is a homepage section (`/#emergency`) linked from the red top-bar link, not its own page.
Every page: floating chat button, "Book online" in header, ends with a booking CTA.

## 2. Homepage, top to bottom

1. **Top bar** (dark, thin): live "Open now until 18:00" / "Closed, opens Mon 08:30" badge, phone, red "Dental emergency?" link.
2. **Header** (sticky, blurred background on scroll): logo, nav (Services, Dentists, Pricing, About, Contact), Google rating badge (4.9 stars, 412 reviews, "Sample" tag), "Book online" pill.
3. **New patient offer strip**: "New patient exam + X-rays ~~£95~~ £65 when you book online". Dismissible.
4. **Hero**: eyebrow "Welcoming new patients in Leeds", headline from `clinic.tagline`, one-line subhead. Large **"I would like to..." intent selector** (from `intents`) + "Book an appointment" primary + "Ask Ava" secondary (opens chat). Secondary link: "Or book a free 15-min consultation". Right: clinic interior photo with a floating card "Next available: Today 15:45 with Dr Patel". Trust row: rating, years open, patients treated, GDC/CQC.
5. **Quick booking bar**: Service, Dentist ("First available"), Date, "See times" -> `/book?...`.
6. **Services grid**: 8 popular-first cards, icon + name + "from £X" + duration; "View all services".
7. **Meet the dentists**: 4 cards: photo, name, role, GDC number, 2 specialties, "Next available" chip, "Book with ...".
8. **Why choose us**: 6 points with icons: nervous patients welcome, evening and Saturday appointments, same-day emergencies, transparent per-dentist pricing, 0% finance, modern technology.
9. **How booking works**: 3 steps.
10. **Pricing preview**: 5 popular treatments with "£X to £Y depending on clinician" + "or from £X/month" for finance-eligible + membership card (£18/month, includes list).
11. **Reviews**: carousel of 6 (`reviews`), each with "Sample review" tag in demo.
12. **Before and after**: 3 drag sliders (whitening, bonding, aligners), "Illustrative images" tag.
13. **Emergency** (`#emergency`): red-flag list, "Same-day slots available", Call + Book emergency buttons, out-of-hours line.
14. **FAQ**: accordion from `faqs`, FAQPage schema.
15. **Location**: map left; address, hours table with today highlighted, getting-here list, "Get directions" right.
16. **Final CTA band**: "Ready when you are" + Book + Ask Ava.
17. **Footer**: NAP, hours, quick links, socials, legal, "Registered with the GDC. Regulated by the CQC." line, "Demo website by Incodet" small link.

Global overlays: review toast bottom-left (desktop only), chat bubble bottom-right, mobile sticky bar (Call | Book) with the chat bubble above it.

## 3. Inner pages

- **Service detail**: hero (name, benefit, duration, from price, finance line), what it is, who it is for, what happens (3 to 5 steps), aftercare, **price-by-dentist table** (photo, name, role, price, member price, next free slot, "Book with Dr X"), related FAQs, related services, CTA. Note: "Final cost confirmed after examination."
- **Dentist profile**: photo, name, role, GDC number, years, languages, bio, their services + prices, next 5 free slots as one-click chips.
- **Pricing**: category filter tabs; desktop matrix (rows services, columns dentists, plus Member column); mobile one card per service; membership block; finance calculator (slider over amount, 6/12/24 months, 0% APR, disclaimer); GDC + CQC badges.
- **About**: story, room photos, technology (digital X-ray, intraoral scanner, Airflow), accreditations.
- **Contact**: map, NAP, WhatsApp, email, hours, getting here, contact form (name, email, phone, message, consent).
- **Admin**: today, upcoming filtered by dentist, cancel / complete / no-show, edit availability and time off, edit prices.

## 4. Pricing model

- Price per dentist + service pair, integer pence. Missing pair = not offered.
- "From" price = min across dentists (`fromPrice()`).
- Member price optional per service; "Not included" when absent.
- Finance line only where `financeEligible` and price >= `finance.minSpendPence`: "or from £X/month over 24 months, 0% APR".
- Bookings store a price snapshot.

## 5. Booking engine

Wizard on `/book` (progress bar, sticky summary card on the right, on mobile a bottom summary sheet):
1. Service (grouped by category) or "Free consultation"
2. Dentist (only those offering it, with exact price) or "First available"
3. Date and time: 14-day strip, greyed days without slots, time chips
4. Details: name, email, phone, new/existing, optional note, consent checkbox
5. Confirmation: reference (e.g. `NPD-7K3Q`), summary, Add to calendar (.ics + Google link), manage link

Slot rules: dentist weekly availability minus time off minus confirmed bookings; slot step 15 min; length = service duration; buffer 10 min; min notice 2 h; window 60 days; all times `Europe/London`.

After confirm: server re-checks inside a transaction, inserts `confirmed`; email to patient (Resend); Telegram alert to owner; reminder 24 h before (Vercel Cron); cancel/reschedule via token link until 24 h before.

Double booking blocked in Postgres with an exclusion constraint (`btree_gist`, `tstzrange(starts_at, ends_at)` per dentist, status = confirmed).

Server functions live in `src/lib/booking/` and are the only place slot and price logic exists:
`getServices`, `getDentists`, `getPrice`, `getAvailableSlots`, `getNextAvailable`, `createBooking`, `findBooking`, `cancelBooking`, `rescheduleBooking`.

## 6. AI assistant ("Ava")

- Vercel AI SDK, `gpt-4o-mini`, streaming, route `/api/chat`.
- Tools call the booking functions above: `list_services`, `list_dentists`, `get_price`, `check_availability` (max 6 slots), `create_booking`, `find_booking`, `cancel_booking`, `reschedule_booking`, `request_callback`.
- UI: bubble bottom-right with "Ask Ava" label on desktop; greeting + chips ("Book an appointment", "Prices", "Opening hours", "I'm in pain"); slots render as tappable chips; booking ends in a summary card with a Confirm button. Never books without that click.
- Hero intent selector can open Ava pre-filled with the intent.
- Guardrails: no diagnosis or medicine advice; red-flag words -> offer same-day emergency slot + phone; breathing/swallowing swelling -> 999; out of hours -> NHS 111; only say "booked" after `create_booking` succeeds; rate limit 30 messages / 10 min per IP; max 400 output tokens; collect only name, email, phone.

## 7. Location

Google Maps embed iframe from `address.mapEmbedQuery` (no key), rounded, 360 px desktop / 260 px mobile, lazy-loaded. "Get directions" opens `https://www.google.com/maps/dir/?api=1&destination=...`. `Dentist` JSON-LD with NAP, geo, hours, priceRange.

## 8. Data model (Phase 2)

| Table | Key columns |
| --- | --- |
| `clinic_settings` | one row: name, contact, address, hours json, booking rules json |
| `dentists` | id, slug, name, role, bio, photo_url, gdc_number, years_experience, languages, specialties, active |
| `services` | id, slug, name, category, summary, icon, default_duration_min, member_price_pence, finance_eligible, popular, active |
| `dentist_services` | dentist_id, service_id, price_pence, duration_min (nullable override) |
| `availability_rules` | dentist_id, weekday, start_time, end_time |
| `time_off` | dentist_id, starts_at, ends_at, reason |
| `bookings` | id, reference, dentist_id, service_id, starts_at, ends_at, status, patient_name, email, phone, is_new_patient, note, price_pence, source (web/chat/phone), manage_token, created_at |

RLS on. Public read for catalogue tables; bookings written only by server code with the service role key; admin via Supabase Auth.

## 9. Phases

| Phase | Output | Done when |
| --- | --- | --- |
| 1 Static site | All public routes, design system, config-driven, sample images | Every route renders at 1440 and 375 px, build passes |
| 2 Database | Supabase schema, seed from config, RLS, data layer swap | Changing a price in Supabase changes the site |
| 3 Booking | Slot engine + tests, booking API, wizard, manage page, constraint | Two tabs cannot book the same slot |
| 4 Notifications | Resend emails, Telegram alert, cron reminder, .ics | One booking triggers both messages |
| 5 Ava | Chat widget + `/api/chat` with tools and guardrails | A full booking done inside chat |
| 6 Admin | Login, bookings list, availability and prices | Clinic runs a week without opening Supabase |
| 7 Polish + deploy | SEO, schema, sitemap, OG images, Lighthouse, legal, Vercel | Lighthouse mobile 90+ on Home |
| 8 Voice (optional) | Vapi agent calling the booking API | Phone booking shows in admin |

## 10. Out of scope for v1

Online payments and deposits, patient accounts, multi-location, NHS booking, practice-software sync (needed for a real client, see risks in the live plan).
