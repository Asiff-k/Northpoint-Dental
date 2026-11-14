---
description: Phase 4, emails, owner alerts and reminders
---
Build **Phase 4: notifications**. Read `CLAUDE.md`. Plan mode first.

1. Resend + React Email templates in `src/emails/`: BookingConfirmed (with manage link and .ics attachment), BookingCancelled, Reminder24h. Brand colours, UK English, no em dashes.
2. `src/lib/notify/telegram.ts`: send owner alert on new, cancelled and rescheduled bookings (service, dentist, time, patient name, phone, source).
3. Vercel Cron in `vercel.json` hitting `/api/cron/reminders` hourly, protected by `CRON_SECRET`, sending reminders for bookings 23 to 25 h ahead, idempotent (`reminder_sent_at` column).
4. All sends are fire-and-forget after the booking commits; failures are logged, never block the booking.

Done when: a test booking sends the email and the Telegram message. Commit `feat: phase 4 notifications`.
