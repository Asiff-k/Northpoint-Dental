---
description: Phase 7, SEO, performance, legal and Vercel deploy
---
Build **Phase 7: polish and deploy**. Read `CLAUDE.md`.

1. `Dentist` JSON-LD (NAP, geo, hours, priceRange), per-service `MedicalProcedure`-style metadata, `sitemap.ts`, `robots.ts`, OG images with `next/og`.
2. Lighthouse on mobile for `/`, `/pricing`, `/book`: fix to 90+ (image sizes, font display, lazy map iframe, reduce client JS).
3. `/privacy` and `/terms`: UK GDPR wording for a demo, cancellation policy, cookie note. Add a cookie-free analytics option (Vercel Analytics).
4. Accessibility pass: keyboard through wizard and chat, focus rings, alt text, contrast.
5. Deploy: list exact steps for Vercel (import repo, env vars, cron), then run `vercel` if the CLI is logged in. Remind me the Hobby plan is non-commercial: real clients go on a Pro account.

Commit `chore: phase 7 polish and deploy`.
