---
description: Phase 5, Ava the AI booking assistant
---
Build **Phase 5: Ava**. Read `CLAUDE.md` and `docs/blueprint.md` section 6. Plan mode first.

1. Install `ai` and `@ai-sdk/openai` (and `@ai-sdk/react`). Check the installed version's docs in `node_modules` before writing code; the AI SDK API changes between majors.
2. `/api/chat` route: system prompt built from config (clinic facts, hours, today's date in Europe/London, guardrails), model `gpt-4o-mini`, max 400 output tokens, streaming. Tools exactly as in the blueprint, each calling `src/lib/booking/` functions. `create_booking` requires a `confirmed: true` flag that only the UI Confirm button sets.
3. Rate limit 30 messages / 10 min per IP (in-memory map is fine for the demo; note Upstash for production).
4. `src/components/chat/`: bubble with "Ask Ava" label, panel with greeting and chips, streamed messages, slot chips, booking summary card with Confirm, emergency card with Call button, typing indicator, mobile full-height sheet. Hero intent selector and "Ask Ava" buttons open it with a pre-filled message.
5. Write a short eval script (`scripts/ava-evals.ts`) with 10 test conversations: price question, book with any dentist, book with Dr Rossi, toothache at night, swollen face can't swallow, asks for antibiotics, cancel a booking, off-topic question, Welsh/Polish speaker, prompt-injection attempt. Print pass/fail.

Done when: a full booking works inside the chat and evals pass. Commit `feat: phase 5 ava assistant`.
