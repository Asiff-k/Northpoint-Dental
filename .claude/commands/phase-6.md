---
description: Phase 6, clinic admin dashboard
---
Build **Phase 6: admin**. Read `CLAUDE.md`. Plan mode first.

1. Supabase Auth email + password, `/admin/login`, middleware/proxy protecting `/admin/*`; only users in an `admins` table get in.
2. `/admin`: today's timeline per dentist, upcoming list with filters (dentist, status, date), actions: cancel, mark completed, no-show.
3. `/admin/availability`: weekly rules editor per dentist, time-off list.
4. `/admin/prices`: editable matrix services x dentists (pence stored, pounds shown), member price, finance flag; saving revalidates public pages.
5. Simple stats cards: bookings this week, by source (web / chat / phone), revenue booked.

Done when: you can run a week without opening Supabase. Commit `feat: phase 6 admin`.
