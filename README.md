# Northpoint Dental (Incodet demo)

Premium UK dental clinic website template: AI booking assistant, in-site booking, prices per dentist, live map. Built with Next.js 16, Tailwind 4, Supabase and Vercel, developed phase by phase with Claude Code.

## Quick start (5 minutes)

1. Unzip, open a terminal in the folder:
   ```bash
   npm install
   npm run dev
   ```
   Open http://localhost:3000. You should see the "Phase 0 ready" page listing dentists and prices.
2. Copy `.env.example` to `.env.local` (fill keys later, phase by phase).
3. Put it on GitHub (git is already initialised with a first commit):
   ```bash
   gh repo create northpoint-dental --private --source=. --push
   ```
4. Start Claude Code in this folder:
   ```bash
   claude
   ```
   Approve the Playwright MCP when asked (it lets Claude Code screenshot its own pages).
5. Type `/phase-1` and let it build the full static site.

## Phases (one Claude Code session each)

| Command | What it builds | Keys needed |
| --- | --- | --- |
| `/phase-1` | Every page and section, design system, sample images | none |
| `/phase-2` | Supabase schema, seed, data layer | Supabase |
| `/phase-3` | Booking engine, wizard, manage-booking page | Supabase |
| `/phase-4` | Confirmation emails, Telegram alerts, reminders | Resend, Telegram |
| `/phase-5` | Ava, the AI booking assistant | OpenAI |
| `/phase-6` | Clinic admin dashboard | Supabase |
| `/phase-7` | SEO, performance, legal pages, Vercel deploy | Vercel |
| `/check` | Lint, build, desktop + mobile screenshots of changed pages | none |

Tips: run `/clear` between phases, start each in plan mode (Shift+Tab), and deploy to Vercel after Phase 1 so you have a live link to show prospects early.

## Reusing for a new clinic

Edit `src/config/clinic.config.ts` (name, address, dentists, services, prices, hours, offers), swap images, re-run the seed script (after Phase 2). Remove every `isSample` review and rating before a real client goes live.

## Files that steer Claude Code

- `CLAUDE.md`: rules, stack, design tokens, must-have UI patterns
- `docs/blueprint.md`: full page-by-page spec
- `docs/references.md`: UK competitor research
- `.claude/commands/`: the phase commands
- `.claude/settings.json`: pre-approved safe commands, `.env.local` blocked from reading
- `.mcp.json`: Playwright MCP for visual checks
