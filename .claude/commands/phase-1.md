---
description: Phase 1, build the full static site from clinic.config.ts
---
Build **Phase 1: static site** of Northpoint Dental. Read `CLAUDE.md`, `docs/blueprint.md` (sections 1, 2, 3, 7) and `docs/references.md` first. Start in plan mode and show me the component list before writing code.

Scope:
1. Install and init shadcn/ui (neutral base, CSS variables), then add: button, card, badge, accordion, tabs, select, sheet, dialog, input, textarea, checkbox, label, slider, tooltip, separator.
2. Map the design tokens already in `src/app/globals.css` to shadcn variables so buttons, rings and cards use our teal/mint palette.
3. Build site chrome in `src/components/site/`: TopBar (live open-now from `clinic.hours`, computed in Europe/London), Header (sticky, rating badge with Sample tag, Book pill, mobile Sheet menu), Footer, MobileStickyBar, ReviewToast (desktop only, 8 s rotation, pause on hover), ChatBubble placeholder that opens a "Ava is coming in Phase 5" panel.
4. Build every homepage section in `src/components/sections/` in the order in blueprint section 2, including the "I would like to..." intent selector, offer strip, membership card, finance line, before/after drag slider, emergency block and FAQ (with FAQPage JSON-LD).
5. Build all public routes in the sitemap. `/book` is a styled placeholder wizard shell (steps visible, no logic) that reads `?service=&dentist=` and preselects them. `/booking/[token]` and `/admin` are simple placeholders.
6. Use `generateStaticParams` for service and dentist slugs, and `generateMetadata` per page.
7. Images: use Unsplash images via `next/image` (add `images.unsplash.com` to `remotePatterns`). Pick calm clinic interiors and professional portraits; no close-up teeth. Record each photo URL in `public/images/CREDITS.md`.
8. Motion: a small `FadeIn` client wrapper using `motion/react`, respecting reduced motion.
9. Every sample review, rating, GDC number shows a small "Sample" tag.

Done when: `npm run build` passes, `npm run lint` is clean, and you have opened `/`, `/services/composite-bonding`, `/dentists/elena-rossi`, `/pricing`, `/book` and `/contact` at 1440 px and 375 px (Playwright MCP) and fixed anything broken. Then commit: `feat: phase 1 static site`.
