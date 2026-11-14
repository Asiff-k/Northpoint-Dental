---
description: Visual and build check of the pages changed in this session
---
1. Run `npm run lint` and `npm run build`; fix errors.
2. With the Playwright MCP, open every route changed in this session at 1440 px and 375 px, screenshot each, and look for: overflow, overlapping text, broken images, unreadable contrast, buttons under 44 px, missing "Sample" tags.
3. Search changed files for em dashes and replace them.
4. Report a short table: page, desktop OK, mobile OK, fixes made.
