---
description: Phase 3, booking engine, wizard and manage page
---
Build **Phase 3: booking engine**. Read `CLAUDE.md` and `docs/blueprint.md` section 5. Plan mode first.

1. `src/lib/booking/slots.ts`: pure function `generateSlots({rules, timeOff, bookings, durationMin, stepMin, bufferMin, minNoticeHours, windowDays, now})` in Europe/London (handle BST/GMT with `date-fns-tz` or `Temporal` polyfill). Add Vitest tests: lunch gaps, buffer, min notice, DST change weekend, fully booked day, "first available" across dentists.
2. `src/lib/booking/bookings.ts` (server only): `getAvailableSlots`, `getNextAvailable`, `createBooking` (re-check + insert, map exclusion-constraint violation to a friendly "slot just taken" error), `findBooking`, `cancelBooking`, `rescheduleBooking`. References like `NPD-7K3Q`, `manage_token` random 32 bytes.
3. Route handlers or server actions for the wizard, validated with zod.
4. Make the `/book` wizard real: 4 steps + confirmation, URL-synced state, 14-day date strip, time chips, sticky summary with exact price, consent checkbox, .ics download and Google Calendar link.
5. `/booking/[token]`: view, cancel, reschedule (blocked inside 24 h).
6. Replace "Next available" placeholders on dentist cards, service tables and the hero card with `getNextAvailable`.

Done when: tests pass, build passes, and two browser tabs racing for the same slot produce one booking and one friendly error. Commit `feat: phase 3 booking engine`.
