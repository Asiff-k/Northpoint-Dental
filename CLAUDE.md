@AGENTS.md

# Northpoint Dental (demo clinic website)

Premium UK private dental clinic website with an AI booking assistant, in-site booking with per-dentist pricing, and a live map. Built as a reusable template by Incodet: one config file drives everything, so a new clinic is a data swap.

Full spec: @docs/blueprint.md
Competitor research (what to copy, what makes us different): @docs/references.md

## Golden rules

1. **Config is the source of truth.** All clinic data (name, dentists, services, prices, hours, offers, reviews, FAQs) lives in `src/config/clinic.config.ts` until Phase 2, then in Supabase seeded from that file. Never hardcode clinic data in components.
2. **Prices are integers in pence.** Format only at render time with `formatPrice()`.
3. **One booking engine.** Website wizard, chatbot tools and the future phone agent all call the same server functions in `src/lib/booking/`. Never duplicate slot or price logic.
4. **Demo honesty.** Reviews, ratings, GDC numbers and awards in the config are samples. Show a small "Sample" label wherever `isSample` or `ratingIsSample` is true.
5. **UK English everywhere** (colour, centre, enquire). Dates `Tue 18 Nov`, times `14:30`, timezone `Europe/London`.
6. **Never use em dashes** in UI copy. Use commas, colons or full stops.
7. **No AI credits** in the UI ("Powered by...", "Built with AI"). The assistant is "Ava, Northpoint's virtual assistant".
8. **Mobile first.** Check every page at 375 px wide before calling it done.
9. One phase per session. Run `/phase-N`. Finish with `npm run build` passing, then commit.

## Stack

- Next.js 16 App Router, TypeScript, `src/` dir, Server Components by default
- Tailwind CSS v4 (tokens in `src/app/globals.css` via `@theme`)
- shadcn/ui for primitives (add in Phase 1), `lucide-react` icons, `motion` (Framer Motion) for animation
- Supabase (Postgres + Auth), EU/UK region (Phase 2)
- Vercel AI SDK + OpenAI `gpt-4o-mini` for chat (Phase 5)
- Resend (email), Telegram Bot API (owner alerts), Vercel Cron (reminders)
- Google Maps embed iframe (no API key)
- Hosting: Vercel

## Design system

Direction: calm boutique clinic, not a hospital. Premium, minimal, lots of white space, slow subtle motion.

| Token | Hex | Use |
| --- | --- | --- |
| primary | #0F3D3E | Buttons, headings, dark sections |
| accent | #5FD3B5 | Highlights, chat button, focus rings |
| surface | #F7FAF9 | Page background |
| card | #FFFFFF | Cards, panels |
| ink | #10201F | Body text |
| muted | #5B6B6A | Secondary text |
| warm | #F4E3D3 | Soft section backgrounds, review cards |
| danger | #D64545 | Emergency only |

- Fonts: Manrope (headings 600 to 700), Inter (body), self-hosted via `@fontsource-variable` (no Google Fonts calls, UK GDPR friendly)
- Type scale desktop 56/40/28/20/16/14 px; hero 36 px on mobile
- Radius: cards 16 px, buttons pill. 8 px spacing grid, max width 1200 px, section padding 96 px desktop / 64 px mobile
- Motion: fade-up 300 ms on scroll, card hover lift, respect `prefers-reduced-motion`
- WCAG AA contrast, 44 px tap targets, visible focus rings
- Imagery: light clinic interiors and team portraits (Unsplash, credited in `public/images/CREDITS.md`). Few close-up teeth shots.
- If the `frontend-design` skill is available, use it for visual decisions.

## Must-have UI patterns (from UK research)

- Top bar: live "Open now until 18:00" badge, phone, red "Dental emergency?" link
- Sticky header with Google rating badge and "Book online" pill button
- Hero "I would like to..." intent selector (`intents` in config) routing to booking or chat
- Two booking paths: appointment, or free 15-min consultation
- New patient offer banner, membership plan, member price column, "or from £X/month" finance line
- GDC number on every dentist card, GDC + CQC badges near prices and in footer
- Rotating review toast bottom-left (8 s, pause on hover, hidden on mobile)
- Dentist cards show live "Next available" slot (from Phase 3; static placeholder before)
- Mobile sticky bottom bar: Call + Book; chat bubble sits above it

## Folder conventions

```
src/
  app/                 routes (see sitemap in docs/blueprint.md)
  components/
    ui/                shadcn primitives
    site/              header, footer, top bar, mobile bar
    sections/          homepage and page sections
    booking/           wizard, slot picker
    chat/              chat widget
  config/              clinic.config.ts
  lib/
    booking/           slots.ts, bookings.ts (server only)
    supabase/          clients
    utils.ts
supabase/migrations/   SQL migrations (Phase 2+)
```

## Commands

- `npm run dev`: local dev at http://localhost:3000
- `npm run build`: must pass before every commit
- `npm run lint`

## Verification

When the Playwright MCP is connected (`.mcp.json`), open each page you changed at 1440 px and 375 px, take a screenshot, and fix layout issues before finishing. Never claim a page "looks good" without having looked at it.
