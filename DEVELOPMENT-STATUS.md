# Development status

**Last updated:** 2026-11-03
**Project root:** `C:\Users\hp\Desktop\CCM`
**Status:** Slices 1–6 are implemented. Slice 4 anonymous submission, public inquiry-read denial, staff follow-up/history, malformed-input and honeypot rejection, same-email 10-minute duplicate protection, concurrency handling, cooldown expiry, and failed-backend behavior are verified. Slice 5 role-specific access and no-staff sign-in denial are verified. Slice 6 CMS service, homepage, contact, service-area, image, and synthetic FAQ workflows have been verified. The Crown redesign is implemented; lint, type-check, tests, production build, production route smoke checks, and desktop/tablet/mobile browser checks passed. The owner reports successful local testing against the new Supabase project after applying migrations and creating an admin user. This is not a production deployment.

## Resume here

- **Repository:** `https://github.com/EYONET/DEMO` (`main`). The app history and repository starter history are merged; the latest local commit is present on the remote.
- **Working stack:** Next.js App Router, TypeScript, Supabase Auth/Postgres/Storage; guided button-based FAQ only (no AI/LLM).
- **Run locally:** use Node.js and npm, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from the new development Supabase project in a private `.env.local`, then run `npm install` and `npm run dev`. Do not copy credentials into GitHub, documentation, or chat. Current owner preview uses `http://localhost:3000`.
- **Verified in the current development project:** The new project's four migrations were applied and the owner's Auth account was granted `admin`. The owner reports local app testing is working. Prior development-project checks include admin login/CMS access; service draft create/edit/delete and public draft invisibility; homepage copy persistence/display; contact settings persistence/display; service-area create/edit, publish/display, then deactivate/hide; and image upload/replacement on a synthetic draft. Lint, type-check, tests, production build, and public route smoke checks pass.
- **Synthetic CMS data intentionally remaining:** one inactive service-area row named `CMS Verification Test Updated, ZZ`. It is not published and should not be activated except for an explicitly approved test. The temporary image-test service was deleted; the outcome of deleting its Storage object was not independently inspected.
- **Next:** continue owner testing with synthetic inquiries and complete the client content questionnaire. Resolve the form-vs-approved-copy gap: the form currently collects an optional city but no ZIP/postal code, while approved coverage wording asks visitors to share a ZIP code. Confirm whether to add a postal-code field before launch. Then select hosting and a durable distributed rate-limit provider, create a separate production Supabase project, and complete production configuration and operational checks.
- **Pre-launch blockers:** approved business identity/content/pricing/coverage and privacy/retention wording; selected hosting/domain and a production Supabase project; production secrets, Auth redirect/email configuration, production migration/RLS/Storage verification, an owner-managed backup/restore plan, provider-backed inquiry abuse controls, production smoke tests, and handover. This remains a development preview, not production-ready.

## Current checkpoint

- Product choices: Next.js + TypeScript + Supabase; U.S.-oriented English; proposal services; Option A FAQ only; current public design is the owner-approved Crown Cleaning Solutions navy/gold redesign. The BrightNest demo design is historical.
- Owner-approved content supplied for Crown: regular/deep-cleaning explanation; Aurora/Denver, Colorado coverage with ZIP-code confirmation; public email, two phone numbers, and Monday–Saturday, 8:00 AM–5:00 PM business hours. Prices, testimonials, credentials, detailed service inclusions, and other operating claims are not approved for publication.
- The inquiry form requires name and email and optionally collects phone, city, service, and message. A ZIP/postal-code field is not currently present; confirm the field with the owner and add it if ZIP confirmation is needed at inquiry time.
- Current redesign includes all requested home-page content areas that can be represented without inventing facts. The customer-feedback area has three clearly labeled fictional layout-preview cards, not real customer reviews; replace them with genuine feedback only after approval. Stock-photo gallery imagery is explicitly illustrative and not Crown before-and-after evidence. Service-card images have an error fallback from CMS media to labeled stock imagery; service detail routes use the same fallback.
- The approved hero refinement renders the CMS headline in two color segments, with the latter half in gold, and uses the exact Vecteezy car-cleaning image from the reference, which the owner confirms is licensed for use. It remains clearly labeled illustrative stock, not Crown project work or a service claim.
- Matched the hero layout and styling to the reference’s split desktop composition, gold-accented eyebrow and image badge, heading scale, CTA treatment, and viewport-based height. Tuned hero copy leading and CTA height to keep the longer approved copy within the reference dimensions. Retained all wording and left the upper navy description bar unchanged; the inquiry follow-up note remains in the estimate section.
- Refined the hero description to 16px with 1.65 line-height on desktop and a 15px mobile treatment for a lighter, more readable text block without changing the approved wording.
- The home service cards use a continuously looping horizontal carousel at the reference speed of 80px/s, with previous/next controls and no pause/resume button. It pauses on hover/focus and direct interaction, honors reduced-motion preferences, and keeps service content CMS-driven.
- The gallery is presented as “Evidence of Craft,” inspired by the reference’s three-image layout, with clear notices that current photos are illustrative stock rather than Crown project evidence.
- A separate before-and-after section provides three paired layout placeholders. It explicitly states that no Crown project photos are supplied and that only approved authentic photos will be used.
- The process section follows the reference’s four-step Operational Framework layout, while describing only the inquiry, staff follow-up, and confirmation workflow.
- The pricing section currently includes dollar ranges solely as a clearly labeled visual demo, not Crown pricing. Replace or remove them before publication unless the client confirms actual prices.
- The homepage service-area list now combines the approved Aurora and Denver locations with additional active locations managed in the CMS; inactive areas are excluded and saving an area refreshes the homepage.
- Expanded the footer into four reference-inspired columns for services, company links, and inquiries, with an approved service-area summary and no unconfirmed contact details or operating claims.
- Increased public-page descriptive copy, card descriptions, footer links, and inquiry form typography for readability across desktop and mobile while keeping compact labels and navigation sizes unchanged.
- Added the owner-provided email, two phone numbers, and business hours to the estimate and contact sections. These values have editable CMS settings; the estimate section retains the approved Aurora/Denver ZIP-confirmation wording.
- System blueprint: `SYSTEM-DESIGN.md`
- Product requirements: `PRD.md`
- Delivery plan: `PLAN.md`
- Visual concept: `Design.md`
- Project instructions: `AGENTS.md`
- Static demo: `index.html`, `styles.css`, and `script.js`
- Next.js app: `src/app/page.tsx`, `src/app/layout.tsx`, and `src/components/`
- Dependency audit: 0 reported vulnerabilities after replacing the generated Next-specific ESLint preset.
- Supabase SSR/browser clients, generated database types, and four version-controlled schema/content migrations are present locally.

## Repository and tooling

- Active GitHub repository: `https://github.com/EYONET/DEMO`. Its starter commit was merged with the application history; the local latest commit is confirmed on remote `main`.
- The local app history originated in `https://github.com/eyosyaszerihun384-netizen/Cleaning-full-stack-app-repository`; the user is switching to a new GitHub account/repository after losing access to the prior account's 2FA authenticator.
- Local Git author identity and credential helper are configured.
- The app includes the project docs, safe environment template, and four version-controlled Supabase migrations. `.env.local` is ignored. The standalone demo files remain separate from the tracked full-stack repository baseline.
- Git 2.55.0, Node.js `v24.22.0`, and npm `11.19.1` are available.
- New test Supabase project `feuiuvlbqbfcyahzqwnl` is linked in the local CLI and matches the ignored `.env.local` project URL. The owner reports all four migrations were applied and the admin role was created after correcting an initial stale CLI project link. Never share or commit project credentials.
- Production configuration has not been set up or verified.
- Added a Node built-in test runner for inquiry validation and a GitHub Actions workflow for lint, type-check, tests, and production build. Clean `npm ci`, all four inquiry tests, lint, type-check, and production build pass locally; the GitHub workflow awaits a push to run remotely. Browser smoke checks visited `/`, `/about`, `/contact`, `/services`, `/admin/login`, and `/admin/content` at 375px and 1440px. All public routes and login returned 200 without horizontal overflow; unauthenticated content management redirected to sign-in.
- Demo FAQ browser QA exercised 39 choices across 11 menus, including child navigation, root return, quote action, thinking completion, and the 375px layout. Prior synthetic CMS FAQ publish/fallback behavior was also verified. No live published business FAQ tree exists to test.
- Read-only Storage listing found one object left by the deleted generated image-test service. Removed that exact object from the development `site-media` bucket; a follow-up listing confirmed it is empty. Attempts to inspect service-area and archived FAQ rows through `supabase db query --linked` failed because the CLI's temporary database role could not authenticate with the configured database password. No database rows were changed; the inactive synthetic service-area and archived synthetic FAQ nodes remain pending a successful read-only audit.
- Documented a production operations checklist in the README covering account ownership, secrets, Auth setup, production RLS/Storage verification, provider-backed rate limiting, backup/restore rehearsal, monitoring, staff access, and launch smoke tests.
- Docker/Podman are unavailable, so local Supabase services cannot run in this environment.

## Open prerequisites

- Confirm real U.S. business identity, location/service area, approved content/pricing, and operational policies before production publication.

## Completed slice 1 — Next.js foundation and design shell

- Created an App Router TypeScript application with server-rendered homepage content and client components for mobile navigation and FAQ chat.
- Reused the approved demo visual language and adapted service cards for four proposal categories.
- Kept U.S.-specific business details unclaimed and made the estimate section explicitly inactive; it does not collect or store information.
- Added FAQ topic branches with a simulated three-second thinking animation and non-AI disclosure.
- Kept the standalone demo excluded from the full-stack Git repository.
- Added local development commands to the README and updated the Supabase public key variable placeholder.

**Validation:** `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit` (0 vulnerabilities), `.env.local` ignore check, and HTTP smoke check (200 with expected page content).

**Not connected yet:** Inquiry persistence, CMS, staff authentication, backups, and production deployment.

## Slice 2 — Supabase connection and schema foundation (complete)

- Added Zod-validated Supabase URL/publishable-key configuration and SSR/browser client helpers.
- Added an initial migration for staff roles, proposal services, editable page content/settings/service areas, inquiries and events, FAQ decision-tree data, RLS, explicit table grants, and the public site-media bucket.
- Anonymous inquiry inserts are limited to approved columns; the database derives the service slug snapshot from a currently published service.
- Set the Supabase CLI project ID to a stable app slug and disabled automatic seed-file loading.
- Documented remote development-project setup, migration application, and first-admin provisioning in `README.md`.
- Confirmed the initial migration is applied to the linked Supabase project and generated TypeScript database definitions from its live schema; both Supabase clients now use those types.
- Applied all four migrations to the linked Supabase project; `npx supabase migration list --linked` confirms local and remote versions `202610150001`, `202610150002`, `202610150003`, and `202610160001` match.
- Added and applied migration `202610160001_prevent_recent_duplicate_inquiries.sql`. The database now rejects repeat inquiries with the same normalized email within 10 minutes, serializing concurrent inserts; the Next.js action presents a specific wait-and-retry message.
- The security advisor no longer flags the app-owned `has_staff_role` and `record_inquiry_event` functions after they were moved to the non-exposed `private` schema. It still flags `public.rls_auto_enable()` as executable by `anon` and `authenticated`. Its definition shows a `SECURITY DEFINER` PostgreSQL event-trigger helper that automatically enables RLS for newly created tables in `public`; it is not an app RPC or business function. Leave it unchanged.

**Anonymous API checks:** Published-service SELECT returned HTTP 200 with four demo rows; draft-service SELECT returned HTTP 200 with zero rows. Anonymous SELECT from inquiries returned HTTP 401. Anonymous PATCH to services returned HTTP 401. A synthetic inquiry with reserved `.invalid` email was accepted with HTTP 201; anonymous SELECT of that inquiry returned HTTP 401; an insert attempting to set `status` and `staff_notes` was rejected with HTTP 401.

**Authenticated admin check:** The owner verified `assigned_role = admin` and zero remaining rows for both rollback-test records and the earlier anonymous synthetic inquiry. The transaction SQL returned the expected inquiry status/note when testing the admin update policy. This confirms the transaction's synthetic tests were rolled back and the inquiry update policy worked for the admin role. Separate inquiry-manager/content-editor permissions and no-staff sign-in denial were subsequently verified in Slice 5.

**Exit checks:** Migrations apply and are recorded on the linked development project; anonymous access returns only published services; anonymous inquiry SELECT and content UPDATE are denied; anonymous inquiry INSERT is restricted to allowed fields; authenticated admin inquiry management works; rollback-test rows were rolled back/deleted. Slice 4 synthetic rows were separately removed after verification. `rls_auto_enable()` is a PostgreSQL event-trigger helper and is left unchanged.

**Validation:** `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit` (0 vulnerabilities), `git diff --check`, anonymous REST permission tests, authenticated admin transaction test, and homepage HTTP smoke test pass. `.env.local` remains ignored by Git. Local Supabase is unavailable because Docker/Podman are not installed.

## Slice 3 — Public content integration (complete)

- Replaced hard-coded homepage service cards with a server-side query for published Supabase services; query errors are explicit and an empty result shows a clear preparation message.
- Added `/services` and `/services/[slug]` routes backed by the same published-service query, including details, optional inclusion/exclusion lists, clear pricing/availability caveat, and 404 for unpublished or unknown slugs.
- Extracted reusable site header/footer, service card, and category icon components; navigation links work across routes.
- Added `/about` with active service areas from Supabase and `/contact` with only explicitly public contact settings. Empty/unconfirmed data is described without inventing a location or contact method.
- Added and applied migration `202610150003_add_demo_services.sql` with four demo records and no prices or unverified operational promises.
- Verified an anonymous REST request returns all four published services and local production-build HTTP smoke tests return HTTP 200 for the homepage, listing, detail, About, and Contact routes; unknown service routes return HTTP 404.
- Local production preview at `http://localhost:3100` was stopped at the user's request.

## Slice 4 — Visitor inquiry submission (complete)

- Replaced the inactive estimate placeholder with a provisional form for name and email (required), plus optional phone, city, service, and message; stakeholder approval of the exact fields is still pending.
- Added server-side Zod validation, published-service validation, and an insert limited to visitor-provided inquiry fields; staff-only status/notes are not accepted from the form.
- Added field-level validation feedback, pending/error/success states, and clear language that a request is not an appointment.
- Added a honeypot as a basic spam deterrent. It is not rate limiting or CAPTCHA. Added a database trigger that rejects another inquiry from the same normalized email within 10 minutes; this protects direct API submissions and concurrent requests, but is not a substitute for IP-based rate limits or CAPTCHA.
- The visible data-use notice is explicitly a development draft; business approval of privacy/retention terms and production-grade abuse protection remain launch prerequisites.

**Verified live:** From a signed-out browser session, submitted a synthetic request using `slice4-anon-verification-20261016@example.invalid`; the app displayed its success state. An anonymous REST read for that email returned HTTP 401, as expected. An earlier form attempt was made while the shared browser was signed in as the `content_editor` test account; it succeeded but is not counted as an anonymous submission.

**Additional validation checks:** Invalid email displays its field error; an injected honeypot value is rejected with the generic failure message; and a forged, unavailable service UUID returns the service validation error. Follow-up database queries confirmed none of these tests created inquiry rows.

**Duplicate and backend-failure verification:** Applied `202610160001_prevent_recent_duplicate_inquiries.sql` to the linked development project. The public form's first synthetic submission succeeded; a repeat from the same email returned the explicit 10-minute wait message. Two simultaneous anonymous REST inserts for one test email returned exactly one HTTP 201 and one HTTP 400 / `P0001` duplicate error. After backdating only the synthetic test row to 11 minutes old, the same email was accepted again, confirming the cooldown expires; all three duplicate/concurrency test rows were then removed and a count query returned zero. An isolated local app and fault-injection proxy returned HTTP 503 for inquiry writes: the visitor saw the generic save-failure message, no success state, and all entered fields remained populated. The submit button displayed its disabled pending state during the delayed request. Outage-test requests were not forwarded to Supabase and created no rows.

**Verified with the inquiry manager:** The dashboard showed the anonymous test inquiry. Saved status `contacted` and a clearly synthetic staff note, reloaded the page to confirm both values persisted, and confirmed activity history records the status transition from `new` to `contacted`.

**Cleanup complete:** With owner approval, deleted the five synthetic Slice 4 inquiries used for the form, role, duplicate, and concurrency checks; exact row checks returned zero afterward. The separate older `slice5-admin-test@example.invalid` row was not changed.

**Role-matrix verification complete:** The owner confirmed the no-staff account was denied sign-in with “This account does not have staff access.” The inquiry-manager and content-editor accounts have their respective restricted access. Direct route attempts from the no-staff account were not separately performed.

## Slice 5 — Staff authentication and inquiry dashboard (complete)

- Added the `/admin/login` Supabase Auth password sign-in flow; there is no public account registration.
- Added Next.js `proxy.ts` session refresh for staff routes and server-side session plus `staff_roles` checks for protected pages and mutations.
- Limited inquiry dashboard access to `admin` and `inquiry_manager`; `content_editor` cannot read or modify inquiries.
- Added a paginated and status-filtered inquiry list, inquiry detail view, contact details, staff notes, status updates, and database-triggered activity history.
- Kept Supabase RLS as the final data boundary; server actions validate status/notes and set the actor ID from the authenticated user.
- Updated lint to include `proxy.ts`.

**Code and route checks:** `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check` pass. A production HTTP smoke test confirmed `/admin/login` returns HTTP 200 and an unauthenticated `/admin` request redirects to `/admin/login`; its temporary server was stopped.

**Owner-verified live role checks:** The owner created and signed in with separate `inquiry_manager` and `content_editor` accounts. The inquiry manager has inquiry access only; the content editor has content-management access. No passwords or credentials were shared.

**Verification complete:** Owner confirmed no-staff sign-in is denied, while inquiry-manager and content-editor accounts have their respective access. The anonymous inquiry submission and persisted staff status/note/history flow are verified in Slice 4.

## Slice 6 — CMS, media, and FAQ editor (verified; approved production content remains)

- Added `/admin/content` protected for `admin` and `content_editor` roles, with a content link for admins and a role-aware post-login redirect for editors.
- Added a validated, plain-text homepage hero-copy editor backed by public `site_settings`; the homepage uses safe default copy until an approved CMS value is saved.
- Added service create/edit controls for title, slug, category, descriptions, inclusion/exclusion lists, approved pricing label, ordering, and publication status. Published service changes revalidate the homepage/listing/detail paths. Permanent service deletion is admin-only, requires browser confirmation, removes the public route, attempts to clean up its image, and redirects with a persistent success or cleanup-warning notice; existing inquiries retain their saved service-name snapshot while the live service relation is cleared.
- Added controlled public contact settings and service-area create/edit forms; coverage remains hidden until explicitly enabled.
- Added a FAQ question/choice editor backed by existing `faq_nodes` and `faq_options`, plus a public FAQ reader that uses a complete published database decision tree and retains the existing demo flow if no valid published tree exists.
- FAQ questions can be published leaf-first and root-last; publishing checks one root, at least one choice per published node, links only to published nodes, graph reachability, and absence of loops. The public reader independently rejects incomplete or malformed published graphs and falls back to the demo flow.
- Added authorized service-image upload using the existing `site-media` bucket, file-type and signature checks, a 5 MB limit, descriptive alt text, safe generated storage paths, metadata updates, and replacement-file cleanup. Next Server Actions body limit is configured to 6 MB for these checked uploads.
- Added a factual CMS note that backup behavior is determined by the Supabase plan and owner settings; the app does not claim to verify or create backups.

**Code and route checks:** `npm run lint`, `npm run typecheck`, and `npm run build` pass with the current CMS and deletion-feedback changes. Local smoke tests return 200 for `/`, `/about`, `/contact`, `/services`, and `/admin/login`; anonymous `/admin/content` redirects with HTTP 307. Both deletion notice variants render correctly. `git diff --check` passes. The development server on port 3000 remains available for owner-led review.

**Verified live with the signed-in admin:** Created a unique synthetic draft service, edited and reloaded it to confirm persistence, verified it stayed unpublished (absent from `/services` and returned 404 at its detail URL), opened and canceled the delete confirmation, then the owner permanently deleted it. A subsequent CMS reload confirmed the test service was gone. Existing services and inquiries were not changed.
The homepage copy save was also tested using the existing values without changing the public copy; the values persisted after reload and matched the eyebrow, headline, and introduction rendered on `/`.
Existing public contact settings were saved without changing their values, persisted after reload, and matched the contact links on `/contact`. A clearly labeled synthetic service area was created and edited; its values persisted, and `/about` hid it while inactive. With owner approval, it was temporarily activated and appeared on `/about`; it was then deactivated, persisted as inactive, and disappeared from the public page. The synthetic record `CMS Verification Test Updated, ZZ` remains in the CMS as inactive. The CMS currently has no delete control for service areas.
Uploaded a generated tiny PNG to a separate synthetic draft service, then replaced it with another; the updated alt text and image-present state persisted after reload, and the service remained unpublished. Replacement completed without a cleanup warning. The image-replacement action now reports a clear partial-success message if Supabase cannot remove the previous image. With owner approval, the image-test service was permanently deleted and is absent from the CMS. The delete action was subsequently updated to show a persistent success/cleanup-warning notice; both notice variants were tested. The actual storage-cleanup outcome for the already-deleted test image was not independently inspected.

**Verified with owner approval:** Created a synthetic FAQ root and leaf. Publishing the root before its child was rejected. Published the child first, then the root; verified the public chat showed the CMS root prompt and choices, navigated to the child, and displayed its predefined answer. Archived both test questions afterward and confirmed the demo FAQ fallback returned with the synthetic choices absent. The archived test nodes remain in the CMS because no FAQ-node delete control exists. Updated the chat so its opening message displays the active root prompt. `npm run lint`, `npm run typecheck`, and `npm run build` pass after this change.

**Local browser QA:** Confirmed the demo fallback opens with root options, a guided choice opens its child menu, “Main questions” returns to the root, and the estimate action restores the root menu. Escape closes the chat and returns focus to its launcher; reopening focuses the first option. At a 375px viewport, the page had no horizontal overflow. This smoke test does not yet cover every FAQ branch or a currently published CMS tree.

**Verification still required:** Review the remaining FAQ navigation and accessibility paths; inspect Supabase Storage for any orphan left by the earlier image-test deletion, which occurred before the persistent cleanup-warning notice was added. The CMS contains archived synthetic FAQ test questions and one inactive synthetic test area; none are published. No approved business FAQ content has been supplied.
