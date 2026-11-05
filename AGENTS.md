# Project instructions

## Product scope

- Build the full-stack cleaning-services application with Next.js, TypeScript, and Supabase.
- Treat `SYSTEM-DESIGN.md` as the implementation source of truth; use `PRD.md`, `PLAN.md`, and `Design.md` for product scope, delivery phases, and visual direction.
- Use the client-approved Crown Cleaning Solutions navy-and-gold redesign for public pages; the earlier BrightNest design is historical and must not replace it.
- Use the company-provided service list, in order: Car Detailing, Carpet Cleaning, Upholstery Cleaning, Move-in / Move-out Cleaning, Residential Deep Cleaning, and Post-Construction Cleaning. Light and Deep Cleaning are informational options with a separate homepage section, not inquiry service choices.
- Keep the chatbot within Option A: predefined, button-guided FAQ decision tree only. Do not add LLM or paid AI API integration.
- Treat quote/booking submissions as inquiries that require staff follow-up, not confirmed appointments.
- The approved service-area wording is Aurora and Denver, Colorado, with ZIP-code confirmation required. The client confirmed Crown brings cleaning supplies and provided the Light/Deep Cleaning checklist and add-ons; do not extend those details to other services. Keep prices, testimonials, credentials, hours, and other operating claims unpublished unless confirmed.
- Clearly identify stock photos as illustrative and not Crown project work. Do not present stock imagery as before-and-after evidence; use real project photos only after approval and permission.

## Security and data handling

- Keep secrets and real environment values out of source control. Commit only placeholder variable names in `.env.example`; `.env.local` must remain ignored.
- Never expose Supabase service-role/secret keys in browser code, `NEXT_PUBLIC_*` variables, logs, or documentation.
- Enforce authorization on the server and in Supabase Row Level Security policies. UI hiding is not authorization.
- Public visitors may submit inquiries but must never read or modify inquiry records. Validate submissions on the server and show success only after persistence succeeds.
- Collect only the customer information required for staff follow-up. Use synthetic data in development and tests.
- Do not add arbitrary executable HTML editing to the CMS; validate CMS content and uploads.

## Implementation practices

- Use TypeScript types and runtime validation at untrusted input boundaries.
- Prefer server-rendered public pages and narrowly scoped client-side interactions.
- Keep changes focused on the current development slice. Update related documentation when behavior or decisions change.
- Test the affected slice, including authorization/error behavior for backend work; run lint, type-check, tests, and production build as those commands become available.
- Record completed slices, decisions, blockers, and verification in `DEVELOPMENT-STATUS.md`. Keep this file concise and update it after each meaningful development checkpoint, not for every individual edit.
- Do not claim production readiness until deployment configuration, permissions, operational ownership, and smoke tests have been verified.

## Project documentation

- `SYSTEM-DESIGN.md`: architecture, data model, permissions, workflows, acceptance criteria, and slice plan.
- `PRD.md`: product requirements and unresolved business decisions.
- `PLAN.md`: delivery phases, milestones, and validation checklist.
- `Design.md`: approved MVP visual concept and post-MVP design intent.
- `DEVELOPMENT-STATUS.md`: current implementation slice, completed work, blockers, and next action.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
