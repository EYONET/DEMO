# Crown Cleaning Solutions Website — System Design

**Status:** MVP implementation blueprint
**Product:** U.S.-based cleaning service website, staff CMS, inquiry management, and Option A FAQ chatbot
**Application stack:** Next.js + TypeScript + Supabase
**Design baseline:** Client-approved Crown Cleaning Solutions redesign documented in `Design.md`
**Source scope:** *Web Development & Chatbot Integration Proposal*
**Last updated:** October 15, 2026

---

## 1. Purpose and how to use this document

This document turns the proposal and the agreed project defaults into an implementable design. It describes the app's user flows, architecture, data, authorization, CMS, form submission, FAQ decision tree, deployment, testing, and the steps needed to begin.

The implementation should proceed in small, demonstrable slices rather than attempting the whole system at once. Each slice below includes a user-visible outcome and conditions for considering it complete.

### Decisions already made

- Build the full-stack application with **Next.js and Supabase**.
- Use **English and U.S.-oriented presentation**. Public prices are not displayed; staff discusses pricing directly with customers after inquiry.
- Use the owner-approved Crown Cleaning Solutions navy-and-gold redesign for public pages. The BrightNest design is historical.
- Include the public website, quote/booking inquiry form, custom CMS, staff inquiry dashboard, media editing, and **Option A button-guided FAQ chatbot**.
- Do **not** implement Option B, open-ended AI, an LLM, or a paid chatbot API.
- Treat a form submission as an **inquiry/request for staff follow-up**, not a confirmed appointment.
- Keep the current three-second chatbot thinking animation as a deliberate presentation effect. It is not model inference.
- Treat stock photography as illustrative only; do not represent it as Crown project work or before-and-after proof.

### Assumptions and open decisions

These defaults allow implementation to start, but should be replaced or explicitly approved before public production:

| Topic | Working assumption | Needs confirmation before launch |
|---|---|---|
| Business identity | Crown Cleaning Solutions is the owner-approved brand name. | Confirm the legal entity name and approved logo/assets before legal or operational use. |
| Location | Owner-approved coverage wording: Aurora and Denver, Colorado; confirm ZIP codes with each inquiry. | Exact ZIP codes/neighborhoods, travel radius, and any additional cities. |
| Language | English. | Additional languages, if any. |
| Public pricing | No prices displayed on public pages. | Staff discusses prices directly with customers after inquiry. |
| Satisfaction guarantee | Crown confirms a 100% satisfaction promise: customers should contact Crown within 48 hours if dissatisfied, and Crown will return to touch up the areas of concern. | Confirm contact channel and any exclusions before expanding or qualifying this promise. |
| Public routes | Home, services hub, service detail templates, about, estimate request, contact. | Exact route/page count and final navigation. |
| Form | Multi-step inquiry with contact, service, property/location, and optional notes/preferences. | Required fields, phone requirement, preferred-date question, consent wording. |
| Staff | One owner/admin initially; additional staff can be added. | Named staff, their privileges, and who approves/publishes content. |
| Hosting | GitHub repository plus a Next.js-capable host such as Vercel. | Hosting account, domain, billing owner. GitHub Pages remains suitable only for the static demo. |
| Data retention | Keep inquiries until staff closes/deletes them under an agreed policy. | Retention period, deletion policy, privacy notice, local legal review. |

Do not invent real testimonials, certifications, customer counts, prices, response guarantees, service areas, insurance claims, background-check claims, or business policies to fill these gaps.

---

## 2. Proposal scope translated into system behavior

### 2.1 Public-facing website

The proposal calls for a responsive website with:

- **Homepage:** clear hero and inquiry CTA; services; service expectations; cleaning approach/about; optional project gallery and before-and-after sections; inquiry process; genuine-review placeholder; confirmed Aurora/Denver coverage; estimate form; and the existing guided FAQ chatbot. Keep project-photo sections hidden until approved Crown project photos are added. Do not display prices or unsupported statistics, testimonials, credentials, or trust claims.
- **Services hub:** Car Detailing, Carpet Cleaning, Upholstery Cleaning, Move-in / Move-out Cleaning, Residential Deep Cleaning, and Post-Construction Cleaning, in the company-provided order. Light and Deep Cleaning are informational options with a separate homepage section, not inquiry service choices; their scope is based on the client-provided checklist.
- **Quote and booking system:** custom, multi-step estimate request form.
- **Company information:** About Us, Addis Ababa service coverage, interactive map, and contact points.

For this U.S.-based project, “Addis Ababa” is replaced with a **verified U.S. service area** once supplied. The proposal's “5 custom pages” phrase is ambiguous because the service list can create extra detail pages. For planning, use these templates:

1. Home (`/`)
2. Services hub (`/services`)
3. Service detail (`/services/[slug]`, shared template for the six selectable company-provided services)
4. About and service area (`/about`)
5. Estimate request (`/quote`)
6. Contact (`/contact`)

The header/footer can link the quote and contact sections prominently. Confirm whether service detail pages count as additional custom pages before scope is finalized.

### 2.2 Custom CMS and admin panel

The proposal requires:

- Visual media editor for hero artwork, service gallery images, and team photos.
- Content management for service descriptions and promotional text. Public prices are not displayed.
- Centralized dashboard for submitted booking/estimate inquiries.
- Role-based login security and database backup controls.

System interpretation:

- Staff authenticate before any admin page or data is available.
- Authorized staff edit structured content and images, preview it, then publish it.
- The homepage gallery and before-and-after sections use separate CMS-managed collections. Content staff can upload, replace, caption, reorder, and remove genuine Crown project photos; before-and-after content must be stored as complete pairs. These sections default to hidden and remain hidden if their corresponding collection is empty. Do not use stock images as project evidence; upload only photos approved for public use.
- Authorized staff view inquiry records, inspect details, and update their workflow status.
- Admin users can view backup configuration/status and the documented recovery procedure. Supabase performs the underlying database backups according to the selected plan; the app must not falsely claim to create or restore backups itself.
- The UI will explain platform backup limitations and link staff to the relevant Supabase project controls where possible.

### 2.3 Chatbot scope: Option A only

Option A in the proposal is a button-driven FAQ with a predefined decision tree, answering common questions such as services, per-room pricing, and service areas. It is listed at **0 ETB/month on a free platform tier** in the source proposal.

For the application:

- A visitor picks a top-level question.
- The app shows its approved answer and the related next choices.
- The visitor can return to the main topics or reach the estimate/contact flow.
- FAQ content is managed in the CMS.
- Unsupported questions lead to a human-contact/inquiry fallback.
- There is no free-text answer generation, LLM, OpenAI integration, or paid AI API.

The chatbot's three-second animated “Thinking” state is a visual delay already used in the demo. It must be described as a guided FAQ, not represented as genuine AI reasoning.

### 2.4 Source proposal schedule and financial terms

The proposal states a **2–3 week** target after contract initiation and initial deposit:

- Week 1: discovery, requirements, wireframes, design-theme approval, and content structure.
- Week 2: frontend, admin dashboard, booking form, and responsive checks.
- Week 2.5: chatbot configuration, response testing, and fixes.
- Week 3: approval, server/domain setup, deployment, and staff training.

Proposal payment terms are 50% upfront and 50% after completion/demo approval, before domain handover.

The proposal's price table lists:

- Core website and admin CMS: **40,000 ETB**.
- Option A FAQ chatbot: **10,000 ETB**.
- Core plus Option A: **50,000 ETB**.
- Option B AI chatbot: **25,000 ETB** upgrade; core plus Option B: **65,000 ETB**.
- Estimated annual domain: **3,000 ETB**; hosting: **8,000 ETB**.
- Option A platform running cost: **0 ETB/month**, subject to its free-tier assumptions.

These are Ethiopia/ETB proposal figures. **They are not a U.S. project quote, U.S. hosting estimate, or approved current price.** The Option B figures are recorded for source traceability only and are out of scope. Confirm actual U.S. project pricing, local operating costs, provider quotas, and tax obligations separately.

---

## 3. Product boundaries

### In scope for the MVP

- Responsive public pages for all confirmed page templates.
- The company-approved selectable service list supersedes the proposal categories: Car Detailing, Carpet Cleaning, Upholstery Cleaning, Move-in / Move-out Cleaning, Residential Deep Cleaning, and Post-Construction Cleaning. Light and Deep Cleaning are informational homepage content, not inquiry choices. Use client-provided scope details for those options only; keep pricing unpublished until confirmed.
- A multi-step quote/booking **inquiry** form with validation and a reliable persisted result.
- Customer confirmation after successful persistence and understandable failure handling.
- Staff sign-in, CMS, media management, inquiries dashboard, and statuses.
- Option A FAQ decision tree, editable through the CMS, with the demo's visual delay.
- Database security via Supabase Row Level Security (RLS).
- Metadata, accessible interaction basics, responsive layouts, and production deployment.
- Backup configuration and recovery documentation surfaced for staff.

### Explicitly out of scope unless later agreed

- Option B conversational AI or any LLM integration.
- Real-time calendar availability, guaranteed appointment booking, dispatch, or route optimization.
- Customer accounts or a customer-facing order portal.
- Online payments, invoicing, subscriptions, or payment-card storage.
- Multiple franchise tenants or business locations managed under one tenant-aware application.
- SMS/email marketing campaigns, CRM integrations, or automatic quotes.
- A promise that the form creates an appointment. It creates an inquiry for follow-up.

---

## 4. Users and workflows

### 4.1 Visitor / prospective customer

1. Opens the public website on mobile or desktop.
2. Reviews services, company details, confirmed service area, and contact information.
3. Optionally uses the FAQ decision tree to resolve a question.
4. Starts the estimate request and moves through its steps.
5. Reviews and submits their request.
6. Sees a confirmation only after the server confirms it was saved, including a note that staff must confirm availability.

Visitor permissions: read published public content; submit an inquiry; **never** list/read inquiries, access admin tools, or edit public content.

### 4.2 Staff member

1. Opens `/admin/login`, signs in through Supabase Auth, and is authorized as staff/admin.
2. Sees a protected overview with new inquiry count and recent inquiries.
3. Opens an inquiry, reviews submitted details, and updates status/notes according to assigned permissions.
4. Edits CMS content, previews it, and publishes approved changes.
5. Uploads/replaces allowed public images.
6. Reviews backup configuration and recovery guidance.
7. Signs out; the session is invalidated and protected routes require authentication again.

### 4.3 Admin / owner

An admin has the staff capabilities plus user/role management and operational settings. The initial MVP can begin with one owner account provisioned manually in Supabase. Avoid a public staff-registration form.

Suggested roles:

- **Admin:** manage staff access, all content, FAQs, images, inquiries, and operational backup guidance.
- **Editor:** manage public content, services, FAQs, and approved images; cannot manage staff access or database operations.
- **Inquiry manager:** view/update inquiries; cannot publish content or manage roles.

If the first build needs to stay smaller, implement Admin and Staff roles first, with the mapping below. Preserve least privilege in policies so the roles can be split without rewriting the data model.

---

## 5. Application architecture

### 5.1 Components

```text
Visitor browser
  ├── Public Next.js pages (server-rendered where appropriate)
  ├── Client-side form and FAQ interactions
  └── HTTPS request ─────────────────────────────┐
                                                 │
Next.js application host                         │
  ├── Public content reads ──────────────────────┼── Supabase PostgreSQL
  ├── Inquiry server endpoint + validation ──────┤    ├── RLS-protected tables
  ├── Staff server actions / route handlers ─────┤    └── Authenticated sessions
  ├── Supabase SSR session handling              │
  └── Admin CMS and dashboard                    └── Supabase Storage
                                                       └── Public approved media

Staff browser
  └── Authenticated Next.js admin pages/actions ─────── Supabase Auth + RLS
```

### 5.2 Stack choices

- **Next.js App Router with TypeScript:** public rendering, admin routing, server-side form endpoint/actions, and reusable UI components.
- **Supabase PostgreSQL:** authoritative source for site content, services, FAQs, and inquiries.
- **Supabase Auth:** password-based staff sign-in/invitations with server-validated sessions.
- **Supabase Storage:** site image assets, with controlled authenticated uploads and public reads only for approved published images.
- **`@supabase/ssr`:** Next.js server/browser clients and secure session cookies; use the current official package guidance when scaffolding.
- **Validation:** schema validation on the server (for example, Zod); browser validation improves usability but is not the security boundary.
- **Hosting:** a Next.js-capable platform such as Vercel. GitHub Pages can only host the existing static demo, not this server-backed Next.js application.
- **Version control/CI:** GitHub repository and deploy checks. Never commit secrets.

Use current stable versions and follow the package ecosystem's official setup at the time of implementation rather than hard-coding a version number in this design.

### 5.3 Request paths

#### Public content

1. Next.js renders a route and fetches only published content.
2. The Supabase publishable/anon client key is safe to expose as a public identifier, not as a secret.
3. RLS and read policies expose only public, published rows.
4. Images use an approved public Storage bucket path or an image CDN URL.

#### Inquiry submission

1. Browser submits the form to a Next.js server route/action over HTTPS.
2. Server validates and normalizes all fields, applies abuse controls, and rejects malformed input.
3. Server inserts using a client that is still constrained by database RLS; do not expose a service-role secret to the browser.
4. If the save succeeds, return a non-sensitive confirmation reference/message.
5. If validation, rate limiting, or persistence fails, return an actionable error and do not show success.
6. Staff later retrieve the inquiry through their authenticated session and authorized role.

Use a honeypot and request throttling as the baseline; decide on a CAPTCHA/Turnstile option before public launch based on abuse and privacy tradeoffs. Do not silently drop submissions.

#### Staff content changes

1. Server validates the staff session and role.
2. Server action/route checks the operation and validates submitted content/file metadata.
3. Database RLS applies the same role constraint even if a route guard is bypassed.
4. Updated content is published or remains draft per the chosen CMS state.
5. Invalidate the relevant Next.js cache/tag/path so the public view reflects the new approved version.

---

## 6. Public routes and design behavior

### 6.1 Route plan

| Route | Purpose | Data |
|---|---|---|
| `/` | Hero, calls to action, service highlights, approved stats/testimonials, how it works, FAQ entry point. | Published site settings/content, service summaries. |
| `/services` | Services hub for the six selectable company-provided services in their approved order. | Published services. |
| `/services/[slug]` | Shared detail template for each published service. | One published service record. |
| `/about` | Company story, confirmed coverage, map or map link, approved company details. | Published content and service-area entries. |
| `/quote` | Multi-step quote/booking inquiry flow. | Published service choices and privacy text. |
| `/contact` | Approved contact points, business hours, and inquiry CTA. | Published contact settings. |
| `/admin/login` | Staff sign-in. | Supabase Auth. |
| `/admin` | Protected dashboard overview. | Inquiry counts and operational links. |
| `/admin/inquiries` | Protected inquiry list and filters. | Authorized inquiries. |
| `/admin/inquiries/[id]` | Protected inquiry detail/status update. | One authorized inquiry. |
| `/admin/content` | Manage page sections, settings, and media. | CMS tables/Storage. |
| `/admin/services` | Create/edit/reorder/preview service content. | Service records. |
| `/admin/faqs` | Manage the Option A decision tree and validate links. | FAQ nodes/options. |
| `/admin/operations` | Display backup configuration/last verified date and recovery instructions. | Operational metadata/documentation; platform backup controls remain in Supabase. |

Admin routes may be grouped into fewer screens if usability and role checks remain explicit.

### 6.2 Preserve the demo design for the MVP

Carry the current `Design.md`, `index.html`, `styles.css`, and `script.js` design direction into reusable Next.js components:

- Warm off-white, leafy/dark green, muted green, and amber palette.
- Manrope-style display headings and DM Sans-style body typography, subject to font licensing/loading choice.
- Clear estimate CTA, airy spacing, quiet borders, and restrained shadows.
- CSS or properly licensed home-scene hero artwork.
- Sticky header, responsive mobile menu, three process steps, service cards, estimate form, and a guided FAQ launcher.
- Keep truthful placeholders only in internal/demo environments; replace them with approved copy before production.

The existing HTML is a visual reference, not production React code. Rebuild semantic sections and components in Next.js instead of embedding the entire static page in an unsafe HTML string.

### 6.3 Post-MVP visual refinement

After base functionality is stable, conduct a dedicated design review to make the experience feel more distinctive and less like a generic template:

- Replace generic claims and stock-like details with verified brand-specific copy and assets.
- Evaluate spacing, proportions, type scale, buttons, card patterns, icon style, and above-the-fold composition with actual business content.
- Review responsiveness against real devices and long/short content.
- Refine the hero illustration or select appropriately licensed authentic imagery.
- Improve visual consistency and accessibility without changing approved workflows.
- Treat this as a measured design task with screenshots/approval, not a rewrite of the application architecture.

---

## 7. Quote/booking inquiry form

### 7.1 Recommended multi-step flow

Keep the form short enough to complete, show progress, and let visitors go back without losing input.

**Step 1 — Service**

- Requested service: one of the six selectable company-provided services, or “not sure.”
- Conditional home/business type or other short scope information, only if necessary to prepare an estimate.
- Do not ask for an exact price assumption or suggest an appointment is reserved.

**Step 2 — Property and location**

- City and state or ZIP code (needed to check service area).
- Optional property size/rooms and service notes if approved as useful.
- Optional preferred date or date range, explicitly a preference/request and not confirmed availability.

**Step 3 — Contact**

- Name.
- Email.
- Phone number optional by default, pending business decision.
- Message/notes optional.
- Required acknowledgement of the privacy notice/permission to respond, with counsel-approved wording before launch.

**Review and submit**

- Show a concise summary before submission.
- Provide edit/back navigation.
- State that this is an estimate/service inquiry and the team must confirm price, coverage, and schedule.
- Disable duplicate submission while pending; preserve values on failure.
- Reject another inquiry from the same normalized email within 10 minutes using a database trigger, including concurrent and direct API submissions.
- Reject another inquiry from the same normalized email within 10 minutes using a database trigger, including concurrent and direct API submissions.

If a multi-step flow creates friction in usability testing, retain the fields but present a compact single-page form; the core requirement is a manageable validated request form.

### 7.2 Validation and submission requirements

- Validate types, maximum lengths, allowed service identifiers, and formats on the server.
- Trim/normalize text; reject HTML/script payloads as input values are always rendered as text.
- Use an explicit allowlist for services and status enums.
- Set sensible request-body/field size limits.
- Require required fields and explain errors next to the relevant field and in a summary where appropriate.
- Rate-limit submissions by an appropriate privacy-conscious strategy; avoid storing full IP addresses unless necessary and disclosed.
- Add a honeypot and decide on CAPTCHA/Turnstile only if the abuse risk warrants it.
- Never expose inquiry data in URL parameters, logs, analytics, or public error messages.
- Do not email customer details to an unapproved recipient. Optional notifications should contain minimal data and must not be required for database persistence.
- Persist a stable inquiry ID, then display a non-sensitive confirmation.
- Return a traceable support/reference ID for server failures without leaking internal database details.

### 7.3 Inquiry state machine

Suggested MVP statuses:

```text
new → contacted → quoted → scheduled → closed
             └──────────────→ closed
```

`scheduled` is an internal staff state only; it does not indicate the website automatically schedules a job. Use a constrained enum/check constraint. Keep the submitted inquiry fields immutable to staff except for explicit corrections with an audit trail; store operational status and staff notes separately.

Optional future statuses: `spam`, `cancelled`, or `unserviceable`; agree on workflow before adding.

---

## 8. Custom CMS and admin workflows

### 8.1 Authentication and onboarding

- No public “create account” screen.
- Admin invites/staff accounts are created by the owner through Supabase Auth/admin process.
- Admin identity and role are assigned in a trusted server/admin process, never from editable user profile metadata supplied by the browser.
- Sessions are read and refreshed using the supported Supabase SSR cookie flow.
- Protected page rendering and every mutation perform server-side session and role checks.
- RLS independently enforces the same access rule for direct database access.
- Add a clear sign-out path and protect against an account with no approved role.

### 8.2 Content editor

Editors can update:

- Homepage hero title/copy/CTA, promotions, approved highlight stats, testimonials (with authenticity/permission reminder), and media references.
- About content, company contact information, business hours, and coverage details.
- Services hub ordering and each service's title, description, inclusions, exclusions, and media. Do not edit or display prices.
- Estimate form explanatory/privacy copy and service labels where relevant.
- SEO title/description and social preview fields for public pages.

Recommended editing behavior:

1. Load existing content and show a loading state.
2. Validate required fields and length limits.
3. Save draft, preview, then publish with an explicit confirmation.
4. Show save/publish errors; never display success if persistence fails.
5. Revalidate public routes after successful publish.

For a smaller first slice, implement direct editing of a defined page/service set with validation. Do not create an unbounded page-builder or arbitrary HTML editor.

### 8.3 Visual media editor

- Supabase Storage bucket for approved site media, with public read only for published assets.
- Authenticated role-checked uploads; database/storage policy must enforce authorization independently.
- Restrict to supported raster formats and SVG policy (prefer disallowing SVG uploads unless sanitized); restrict file size and image dimensions.
- Use generated unique object paths rather than overwriting a shared filename while a CDN may cache it.
- Store alt text, caption, storage path, MIME type, size, and optional owning content reference in metadata/table.
- Use Next.js image optimization for supported remote storage URLs and configured host allowlist.
- Reject unsupported content and show a clear upload failure; clean up abandoned objects under a documented procedure.
- Never upload secrets, private documents, or customer-submitted home images into the public content bucket.

### 8.4 Inquiry dashboard

Features:

- Summary counts by status; avoid unnecessary metrics containing personal data.
- Search/filter by status, service, and date; pagination for larger lists.
- Sort by submitted time and show newest first.
- Detail view with submitted data, contact actions, status selector, internal notes, and history timestamps.
- Confirm destructive actions such as deletion; restrict deletion to owner/admin and retain according to policy.
- Empty, loading, stale-session, and error states.
- Avoid exposing sensitive record fields to unauthorized UI components or logs.

### 8.5 Backup controls and recovery

The proposal asks for database backup controls in the custom admin panel. Deliver this safely by:

- Showing which Supabase project/environment is connected without revealing secrets.
- Documenting the configured Supabase backup mode/retention and the date it was last checked (manual verification metadata unless a reliable platform API is explicitly adopted).
- Linking administrators to the Supabase dashboard's authoritative backup/restore controls.
- Providing a concise restore/escalation runbook and a periodic restore-test reminder.
- Including content/media recovery considerations, since database backup and Storage-object recovery are not the same thing.

Do **not** add a fake “Backup now” button, assume a database backup includes Storage files, or claim app-triggered restore functionality without an implemented and tested provider-supported mechanism. Confirm project plan capabilities, retention, point-in-time recovery, and separate media protection with the Supabase account owner.

---

## 9. Option A FAQ decision-tree system

### 9.1 Visitor behavior

- Initial greeting offers top-level buttons such as Services, Scheduling, Service Area, Preparation, and Request an Estimate.
- A button selection appends the selected question, displays the demo's three-second thinking animation, then appends a predefined answer and relevant follow-up choices.
- Each branch offers a return to main topics; the visitor can close/reopen the panel and navigate to the estimate/contact flow.
- A fallback branch says it cannot answer that question and directs the visitor to contact/request an estimate.
- Avoid free-text input in Option A; if later added for convenience, do not imply arbitrary text is understood.
- Respect keyboard access, focus behavior, screen-reader announcements, small screens, and reduced-motion preferences.

### 9.2 CMS decision-tree authoring

Represent the flow as:

- A **node**: heading/prompt shown with a group of options.
- An **option**: a visible button label, its answer text, and optional next-node reference or action.
- A root node: the starting prompt/options.
- Actions: navigate to estimate, contact, or end/restart.

Before publishing, validate:

- Exactly one active root per FAQ version.
- Every option has a non-empty label and answer.
- Every referenced next node exists, is active, and belongs to the same published tree.
- No orphan nodes (unless intentionally a reusable leaf), missing destinations, or accidental loops; loops can be allowed only if they are intentional and navigation remains understandable.
- Button order is explicit and stable.
- Answers are approved, current, and do not contain unverified pricing or coverage promises.

Publishing should be transactional or versioned so visitors never receive a half-updated tree. At MVP, a single active tree may be enough; create draft/published versions only if multiple editors need review.

### 9.3 FAQ topics derived from the proposal/demo

Initial CMS seed should cover, with owner-approved responses:

- Which of the six selectable company-provided services would the visitor like to discuss?
- What is included in each service?
- How can a visitor submit an estimate request and receive staff follow-up?
- What U.S. cities/ZIP codes are served?
- How does an inquiry/booking request work, and is a date confirmed?
- What happens after the request is submitted?
- How should a customer prepare the home?
- Are cleaning products/equipment supplied? Are preferences accommodated?
- How are pets, access, fragile belongings, and special instructions handled?
- How can a visitor reach staff if the FAQ does not answer their question?

The current U.S. service area, pricing practices, supplies, staffing, pet policies, and operations are unknown. Do not publish prices; direct pricing questions to staff follow-up.

---

## 10. Database design

The following is a logical initial model, not executable migration SQL. Implement schema changes as version-controlled migrations and generate typed database definitions from the actual schema.

### 10.1 Tables

#### `services`

| Column | Type/notes |
|---|---|
| `id` | UUID primary key |
| `slug` | Unique, URL-safe slug |
| `category` | Constrained type for the six selectable company-provided services; legacy categories remain only on archived records. |
| `title`, `summary`, `description` | Non-empty approved copy |
| `inclusions`, `exclusions` | Structured JSON/text array after schema validation |
| `pricing_display` | Legacy nullable field retained for data compatibility; not editable and excluded from public and staff API reads. |
| `image_path`, `image_alt` | Nullable public Storage reference and alt text |
| `sort_order` | Integer |
| `status` | Draft/published/archived |
| `created_at`, `updated_at` | Timestamps |

#### `page_content`

| Column | Type/notes |
|---|---|
| `id` | UUID primary key |
| `route`, `section_key` | Unique pair for controlled sections |
| `content` | JSONB with validated, typed section shape; no arbitrary executable HTML |
| `status` | Draft/published |
| `updated_by`, `updated_at` | Auth user reference and timestamp |

Prefer defined section keys and runtime schemas over a generic unvalidated content blob.

#### `site_settings`

Single controlled settings record for verified business name/contact details, business hours, currency, social links, service-area/map references, and default SEO. Validate URLs, phone/email, and display values on save.

#### `service_areas`

Optional explicit service-area list (city/state/ZIP coverage), sort order, active/public flag. Only publish locations confirmed by the owner. Avoid storing exact customer addresses in this public content table.

#### `inquiries`

| Column | Type/notes |
|---|---|
| `id` | UUID primary key; non-sensitive reference may be shown to visitor |
| `created_at` | Server-generated timestamp |
| `service_id` / `service_slug_snapshot` | Requested service reference plus stable label snapshot if needed |
| `customer_name` | Required, bounded text |
| `email` | Required, normalized, validated |
| `phone` | Nullable, if collected |
| `city`, `state`, `postal_code` | Only fields needed to check service area; avoid exact street address at MVP |
| `property_type`, `size_or_room_count` | Optional and only if approved/useful |
| `preferred_date` | Nullable requested preference, never reservation |
| `message` | Optional bounded text |
| `privacy_notice_version` | Version of notice/consent copy presented at submission |
| `status` | Constrained enum/check: new/contacted/quoted/scheduled/closed |
| `updated_at`, `updated_by` | Workflow audit fields |

Keep submission fields separate from staff-only operational fields. Consider an `inquiry_events` table for status changes/audit notes if staff actions need a history; do not expose internal notes publicly.

#### `faq_nodes`

Prompt, stable slug, sort order, published version/status, and timestamps.

#### `faq_options`

Button label, approved answer, parent node, next node or constrained action (quote/contact/end), sort order, active state, and timestamps.

Use foreign keys and checks so a row cannot specify conflicting next-node and action behavior. Add cycle validation in the FAQ publish path.

#### `media_assets` (optional but recommended for CMS auditability)

Storage object path, safe public URL/reference, MIME type, size, width/height, alt text, caption, uploader, created timestamp, and soft-delete state.

#### `profiles` or role metadata

Only if needed for staff display name and internal preferences. A profile row is not by itself proof of authorization. Authorization should be based on a trusted, admin-managed role mechanism.

### 10.2 Indexes and data constraints

- Unique indexes on service slug, route/section key, and any required stable identifiers.
- Index inquiries by `(status, created_at DESC)`, plus service and created time for dashboard filters.
- Index published records used in public route queries.
- Enforce allowed status/category values with PostgreSQL enums or check constraints.
- Add length/non-null checks where appropriate; rely on server validation too.
- Ensure all tables have RLS enabled before production data is inserted.
- Use a safe timezone strategy (store timestamps as `timestamptz`; display in business-local timezone when known).

---

## 11. Authentication, authorization, and RLS

### 11.1 Credential handling

- `.env.local` is developer-only, ignored by Git, and never committed.
- `.env.example` contains variable names and empty placeholders only.
- Browser code may receive the Supabase project URL and publishable/anon key.
- `service_role`/secret keys must never be rendered to the browser, placed in `NEXT_PUBLIC_*`, included in source, or logged.
- Prefer policies and user-session scoped operations so the full app does not need a service-role key.
- If a future administrative task genuinely requires a service-role key, isolate it in a server-only module/secret store, authorize and audit every invocation, and never use it as a shortcut around RLS.
- Rotate any credential accidentally committed or shared.

### 11.2 Role strategy

Use a trusted role mechanism. One practical option is an owner/admin-managed role in Supabase Auth `app_metadata`, set only by an administrator/server-side privileged operation. Never use user-editable `user_metadata` as proof of privilege. Alternatively, use a dedicated staff-role table with carefully reviewed RLS policies.

Application route checks provide clear UX; database RLS is the actual data boundary. Both are mandatory.

### 11.3 Policy intent matrix

| Resource | Anonymous visitor | Authenticated non-staff | Authorized staff |
|---|---|---|---|
| Published site/service content | Select published rows only | Same | Read all; edit per role |
| Draft/unpublished content | No access | No access | Editors/admins as assigned |
| FAQ tree | Read active published tree only | Same | Edit/publish per role |
| Inquiry list/detail | No select | No select | Select within assigned staff scope |
| Inquiry insert | Only through validated inquiry path and narrowly constrained insert policy | No extra rights | May insert if needed |
| Inquiry update/status | No access | No access | Inquiry manager/admin only |
| Inquiry delete/export | No access | No access | Owner/admin only, with policy and audit |
| Public media reads | Published media only | Same | Read |
| Media upload/delete | No access | No access | Editors/admins per bucket policy |
| Role management | No access | No access | Admin only |

Exact SQL policies require testing with anonymous, ordinary-authenticated, and each staff role. Never rely solely on hidden UI or middleware.

### 11.4 Inquiry abuse boundary

RLS policies that allow anonymous insert are a deliberate public surface. Restrict inserts to only necessary inquiry fields; status, staff notes, roles, `created_at`, and `updated_by` must be set by trusted code/database defaults and not accepted from the visitor. Validate server-side and apply rate limits/abuse controls. Public `select`, `update`, and `delete` must always be denied.

---

## 12. Storage, backup, privacy, and operations

### 12.1 Storage

- Public bucket is only for approved, non-sensitive website assets.
- Private/customer uploads are not part of the MVP. Never put inquiry attachments in a public bucket.
- Enforce authenticated role checks in Storage policies, MIME/size restrictions in both application and bucket policy where possible.
- Keep object paths non-guessable; public assets can still be publicly reachable once published.
- Plan image variants/resizing and cache invalidation.

### 12.2 Backup/recovery

- Select the Supabase plan after checking current automatic backup/retention and restore options.
- Document database backups separately from Storage media backups.
- Verify restore steps in a non-production project before launch; record a last-tested date and accountable owner.
- Do not promise a backup frequency or retention until confirmed in the account.
- Keep schema migrations and content seed data in source control without personal inquiry data.
- Define who can trigger restores and what downtime/approval is required.

### 12.3 Privacy and retention

- Collect only the information staff needs to respond.
- Publish accurate privacy language before collecting real inquiries.
- Determine retention, deletion, access requests, and who can export customer details with appropriate local review.
- Avoid third-party analytics/session replay until reviewed for privacy and configured to exclude form content.
- Avoid full customer data in logs, error trackers, screenshots, demo fixtures, or test artifacts.
- Use synthetic data for development and tests.

### 12.4 Operational monitoring

- Log server errors with a request correlation ID, not raw form payloads.
- Alert on failed inquiry persistence and hosting/Supabase health using selected provider tools.
- Monitor storage quota, database capacity, backup status, and spam submission volume.
- Provide a human contact fallback if the FAQ or inquiry route is unavailable.
- Keep development, preview, and production environments separate where practical.

---

## 13. Performance, accessibility, SEO, and security quality

### Performance

- Server-render public pages and published content by default; add client-side JavaScript only for interactions.
- Use responsive/compressed images and Next.js image optimization.
- Cache public content with explicit invalidation after publish; never cache private inquiries across users.
- Paginate inquiries and bound FAQ/content queries.
- Avoid loading the admin bundle on public pages.
- Do not let the three-second FAQ visual delay block the page or other navigation.

### Accessibility

- Semantic landmarks, hierarchical headings, labels, field-level error text, and keyboard-operable controls.
- Visible focus, adequate contrast, reduced-motion support, and usable zoom/reflow.
- Announce FAQ answers/status politely to assistive technology; avoid unexpectedly moving focus during screen-reader use.
- Maintain focus and Escape behavior for chat without treating a non-modal panel as a modal.
- Provide meaningful image alt text; decorative CSS artwork should be hidden from assistive technology.
- Validate the full multi-step form with keyboard and screen-reader testing.

### SEO

- Unique title and description per public route.
- Canonical/robots/sitemap setup appropriate to deployment; keep admin and preview environments out of search indexing.
- Open Graph metadata and fast-loading share images.
- Local SEO only after actual service locations and business details are verified.
- Structured business data only when supported by real, confirmed information.

### Security

- HTTPS in all deployed environments.
- Server-side authorization for admin actions and RLS for database/storage.
- No secrets in client bundles, Git, preview artifacts, analytics, or error messages.
- Validate every request and file upload; apply output encoding through normal React text rendering.
- Prevent CSRF as appropriate for cookie-authenticated mutations; use framework-supported protections and same-site cookies.
- Avoid custom authentication or password storage.
- Review dependency updates and run the framework production security checks before launch.
- Test direct API/database access as well as UI navigation.

---

## 14. Testing and acceptance criteria

### 14.1 Minimum test layers

1. **Unit tests:** form validation/normalization, status rules, role decisions, FAQ graph validation, and content schema.
2. **Database tests:** migration application; RLS visibility and mutation for anonymous, customer, editor, inquiry manager, and admin roles.
3. **Integration tests:** inquiry insert and errors, content read/publish, image metadata/policies, session handling.
4. **End-to-end tests:** visitor inquiry, staff login, update inquiry, edit/publish service and FAQ content, sign out.
5. **Responsive/accessibility smoke tests:** mobile/desktop breakpoints, keyboard operation, form errors, FAQ controls, reduced motion.
6. **Production checks:** clean build, environment configuration, Supabase connection, migration state, and live smoke test.

### 14.2 MVP acceptance checklist

- [ ] All approved proposal sections are available: home/hero, service pages, service area/about/map, quote request, contact, CMS, inquiry dashboard, media editor, and Option A FAQ.
- [ ] The six selectable company-provided services can be represented and displayed in the specified order. Light/Deep Cleaning details are presented separately and not selectable in inquiries.
- [ ] Staff can sign in; no public staff registration exists.
- [ ] Unauthorized users cannot open admin pages/actions or read private inquiries.
- [ ] The form validates on the server and stores a successful inquiry exactly once per accepted submission.
- [ ] Failed persistence never appears as success and leaves the user's input available to retry.
- [ ] Status/notes do not come from or become editable by a public visitor.
- [ ] Staff can find, view, and update inquiry workflow status.
- [ ] Staff can edit service descriptions, promotions, and images; no public prices are displayed.
- [ ] FAQ entries can be maintained by staff; each active path is valid and fallback works.
- [ ] FAQ is clearly guided/predefined; there are no AI model/API calls.
- [ ] No invented U.S. city, price, testimonial, or operational promise is live.
- [ ] Backup capabilities and limitations match the Supabase account plan and a restore procedure is documented.
- [ ] Mobile and keyboard users can use every essential journey.
- [ ] Production environment has no secret committed or bundled client-side.

---

## 15. Slice-by-slice implementation sequence

Each slice should be reviewed in the running app before moving on.

### Slice 0 — Accounts, repository, and product choices

**Outcome:** The project has a real home and credentials are handled safely.

- Create/choose a GitHub repository for the full-stack app. Keep the static GitHub Pages demo separate or clearly label its repository.
- Install Git locally if it is not already installed; the current development environment did not expose the `git` command when checked.
- Create/confirm a Supabase account and create a development project in a suitable U.S. region after considering data location/compliance.
- Save the database password securely in a password manager; do not send it in chat or commit it.
- Identify the project owner/admin email and confirm U.S. business location, page count, form requirements, and business identity.
- Choose a Next.js-capable deployment account/provider; GitHub Pages cannot run Next.js server routes.

**Exit checks:** Repository exists; Supabase project exists; owner can access both; credentials are not in Git; unresolved business decisions are recorded.

### Slice 1 — Next.js foundation and design shell

**Outcome:** Responsive routes load with the demo visual system and no backend dependency.

- Scaffold Next.js App Router + TypeScript in the chosen repository.
- Add lint/typecheck/test scripts, initial shared layout, navigation, footer, public routes, and CSS tokens.
- Rebuild demo structure as React components and validate at mobile/desktop widths.
- Add `.gitignore`, safe `.env.example`, and setup instructions.
- Deploy a preview build before backend integration if convenient.

**Exit checks:** Clean install, lint, typecheck, and production build pass; routes work; no secrets or personal data in repo.

### Slice 2 — Supabase connection and schema foundation

**Outcome:** App can safely read published demo content from Supabase.

- Add Supabase SSR/browser clients and typed database definitions.
- Commit migrations for services, content, settings, FAQ nodes/options, inquiries, and staff role foundation.
- Enable RLS immediately and add narrowly scoped policies.
- Seed only clearly labeled demo content and verify public reads.
- Add a local/preview configuration guide.

**Exit checks:** Migrations apply from a clean database; public reads only show published content; private tables are not exposed.

**Current checkpoint:** Migrations `202610150001` through `202610150003` and `202610160001` are applied to the linked development project. Anonymous API checks confirmed published-service SELECT returns four rows while draft-service SELECT returns zero, inquiry SELECT is denied, service UPDATE is denied, and a valid synthetic inquiry is accepted only with permitted fields. The admin transaction test confirmed the owner has the `admin` role and can manage an inquiry; the test update returned its marked row, and follow-up counts confirmed test rows were rolled back/deleted. Inquiry-manager/content-editor access and no-staff sign-in denial were subsequently verified in Slices 4–5. App-owned `SECURITY DEFINER` functions have been moved out of the exposed API schema. The advisor's remaining `public.rls_auto_enable()` finding is a PostgreSQL event-trigger helper that enables RLS on newly created `public` tables, not an application RPC; leave it unchanged. Docker/Podman are unavailable locally.

### Slice 3 — Services, About, Contact, and public content

**Current checkpoint:** The homepage and `/services` listing read published service cards from Supabase, and `/services/[slug]` renders published service details or returns 404 for unknown/unpublished slugs. `/about` lists only active service-area rows; `/contact` reads only explicitly public contact settings. Both show clear pending-content messaging when the business has not published confirmed data. Query errors are surfaced and empty lists have an explicit state. Migration `202610150003_add_demo_services.sql` is applied to the linked development project and adds cautious demo service content with no unverified prices or operational promises. Local production-build HTTP smoke checks passed on homepage, listing, detail, About, and Contact routes. At the Slice 3 checkpoint, the estimate form was not implemented; it was subsequently completed in Slice 4 below. Replace/remove demo records and review all published copy before production.

**Outcome:** Proposal public pages are data-backed and the CMS can eventually edit their content.

- Implement home, Services hub/detail template, About/service area/map link, and Contact.
- Add responsive content and metadata.
- Keep U.S. location/pricing placeholders unpublished until approved.

**Exit checks:** All proposal content areas exist, including the six company-approved selectable services; no unsupported claims display.

### Slice 4 — Secure quote/booking inquiry

**Outcome:** A real customer request is persisted and can only be viewed by staff.

**Current checkpoint:** The homepage estimate form and server action use server-side validation, a honeypot, explicit success/error states, and the publishable Supabase client under the anonymous-insert RLS policy. A signed-out synthetic submission succeeded; anonymous inquiry SELECT returned HTTP 401. Invalid email, honeypot, and forged service UUIDs were rejected without writes. A database trigger and email/created-time index reject a repeat from the same normalized email within 10 minutes, including simultaneous direct API requests. The app displays a specific cooldown message, allows a retry after the window, and preserves entered fields on save failure. Concurrent requests returned exactly one success and one duplicate rejection. An isolated HTTP 503 test produced a generic failure state and no success; the pending button was disabled. Staff visibility, status/note update, and history were confirmed; all Slice 4 synthetic inquiry rows used for these checks were deleted. Remaining limitations include no IP-based rate limit/CAPTCHA and no production-provider outage/availability guarantee.

- Agree form fields and privacy text; implement multi-step UX and server-side schema validation.
- Add server route/action, abuse controls, database insert policy, and success/error behavior.
- Test duplicate submissions, failed connection, malformed payloads, anonymous select denial, and staff visibility.

**Exit checks:** Persisted inquiry is visible to authorized staff only; all failure cases are explicit; no false success.

### Slice 5 — Staff authentication and inquiry dashboard

**Outcome:** Staff can securely review and process requests.

**Current checkpoint:** Supabase staff sign-in/sign-out, route/session refresh, role guards, inquiry list with filters/pagination, detail view, status and note updates, and activity history are implemented. The owner verified that `inquiry_manager` has inquiry access only, `content_editor` has content-management access, and a no-staff user is denied sign-in with an explicit access message. As inquiry manager, they opened the signed-out synthetic submission, saved a status and note, and confirmed the status change in activity history after reload. Direct route attempts by the no-staff user were not separately tested.

- Provision owner/admin account; implement sign-in/out and protected `/admin`.
- Add paginated/filterable list, detail page, status changes, notes, and role checks.
- Add audit timestamps/history appropriate to the approved workflow.

**Exit checks:** Anonymous and non-staff access is denied at app and database layers; staff actions are traceable.

### Slice 6 — CMS, media, and FAQ editor

**Outcome:** Staff can maintain site content and the Option A decision tree.

**Current checkpoint:** `/admin/content` is restricted to admin/content-editor roles. Structured service, homepage hero, public contact, service-area, FAQ, and image controls are implemented. With owner approval, a synthetic service draft was created, edited, confirmed private on public routes, and deleted; homepage/contact values persisted and rendered; a synthetic area was published and then hidden again; and a tiny synthetic image was uploaded and replaced on a draft service, which was then deleted. The area `CMS Verification Test Updated, ZZ` remains saved but inactive. The prior test image's exact Storage cleanup outcome was not independently inspected. A synthetic FAQ child/root verified root-first rejection, child-then-root publication, public navigation/answers, and archived-data fallback to the demo FAQ; the test FAQ nodes remain archived in the CMS. The visitor chat now displays the CMS root prompt when opened. No real/approved FAQ content has been supplied. Admin-only service deletion gives a persistent success or image-cleanup-warning notice. Backup messaging explains that Supabase backup behavior depends on the owner's plan/settings and does not claim the app manages backups.

- Build controlled editors, preview/publish, cache invalidation, service pricing/content, and media upload.
- Build FAQ node/option editor and graph validator; seed approved FAQ paths.
- Add operational backup status/guidance screen.

**Exit checks:** A staff edit changes the public site; unauthorized modifications are denied; FAQ paths validate; media is restricted correctly; backup messaging reflects actual provider capabilities.

### Slice 7 — QA, launch, and handover

**Outcome:** Stable production deployment with staff prepared to operate it.

- Complete automated and manual QA, performance/accessibility review, content approval, and security check.
- Configure production Supabase, host environment variables, domain, HTTPS, logs, backups, and monitoring.
- Apply migrations, seed production-approved content, smoke test visitor and staff flows.
- Train staff and hand over owner-controlled accounts and recovery runbook.

**Exit checks:** Owner approves release; no test secrets/demo content remain; recovery path and account ownership are documented.

### Slice 8 — Post-MVP visual refinement

**Outcome:** A more distinctive and polished U.S.-business design, based on real content and usage.

- Review the real brand and imagery with the client.
- Audit generic placeholder/vibe-coded cues and refine hierarchy, interactions, typography, iconography, visual voice, and responsive behavior.
- Validate against actual user feedback without removing established functionality.

---

## 16. What you should do to start developing

### You can do now

1. **Supabase:** Sign in at Supabase, create a development project, select an appropriate U.S. region, and keep the database password private. Do not paste credentials into chat.
2. **Repository:** A public GitHub repo for the Next.js app has been created and connected; the static Pages demo remains separate.
3. **Development location:** The current chat workspace is the local project root and is connected to the full-stack repository.
4. **Install/confirm tooling locally:** Git, Node.js, and npm are available in this environment. Check that `git --version`, `node --version`, and `npm --version` work in your terminal.
5. **Business content:** Start gathering the business name/logo, city/state/ZIP areas, service descriptions, approved prices/estimate rules, contact email/phone, hours, photos, genuine testimonials/permissions, and service policies.
6. **Operations choices:** Decide who needs admin access, whether staff require different roles, the inquiry retention period, preferred hosting, domain, and privacy-notice owner.
7. **Keep secrets local:** Put the project URL and publishable key into ignored `.env.local`, not source files. The database password is not the frontend key and should stay private.

### Do not do yet

- Do not publish an empty/unfinished full-stack app using the static demo's public repository without deciding what repository files are public.
- Do not use a Supabase `service_role`/secret key in client configuration or `NEXT_PUBLIC_*`.
- Do not put real customer inquiries into the demo or a development database.
- Do not publish sample contact details, placeholder testimonials, or unverified U.S. service areas/prices as real.
- Do not use the proposal's ETB prices as U.S. prices.
- Do not implement AI for Option A.

### Information to provide when we start the first slice

No credentials are needed in chat. Provide:

- The project folder/repository you want to use (or confirm that we should create the app from the current workspace after Git is installed).
- Whether you created the Supabase project and which safe setup step you reached; never share database passwords or secret keys.
- The U.S. business name/city/state if decided; otherwise we use clearly marked unpublished placeholders.
- Who will receive inquiries and the preferred staff access email(s) (do not send passwords).
- Any decision on telephone collection, preferred cleaning dates, privacy wording owner, and host/domain.

---

## 17. Environment configuration and setup checklist

Recommended configuration uses the current Supabase publishable-key naming where supported. If the selected Supabase project/dashboard uses the legacy anon key name, confirm the SDK's supported key format and use one consistent variable name.

Example `.env.example` (names only; no real values):

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Optional server-only secrets should be added only when a specific server operation requires them, use non-public variable names, and be stored in the host's encrypted environment settings. Never place the service-role key in `.env.example` with a real value.

Pre-development checklist:

- [ ] Git repository exists and `.gitignore` excludes `.env*` except `.env.example`.
- [ ] Node.js LTS and npm available.
- [ ] Supabase development project and owner access confirmed.
- [ ] Development and production projects separated or a safe separation strategy documented.
- [ ] Environment file exists only locally with URL and public key.
- [ ] Database migrations are versioned; no manual-only schema changes.
- [ ] No secrets, live customer data, or unapproved content in repository.

---

## 18. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Proposal page count is ambiguous | Scope creep and approval delays | Confirm route/template count before detailed design sign-off. |
| U.S. business location/pricing is unknown | Inaccurate public claims and unusable service-area FAQ | Keep values unpublished; gather owner-approved U.S. content. |
| Public inquiry route receives spam | Staff burden and database noise | Server validation, rate limits, honeypot, monitoring, and additional CAPTCHA only if needed. |
| RLS is incomplete | Exposure of customer inquiries or CMS edits | Enable RLS from the first migration and test direct anonymous/role access. |
| Owner shares a secret key | Unauthorized database access | Never request secrets in chat; use local environment and rotate any exposed credential. |
| Supabase free tier limits differ from proposal | Unexpected cost or performance issue | Verify current quotas, backups, Storage, and hosting needs before launch. |
| Backup is mistaken for restore capability | Data/media loss during incident | Document actual plan, restore test, and media backup separately. |
| “Booking” implies guaranteed scheduling | Customer expectation or liability mismatch | Label as inquiry/request and staff-confirmed availability. |
| Placeholder/demo claims reach production | Trust and compliance issues | Separate demo seed data, use publish workflow, and require content approval. |
| Generic visual language feels “vibe-coded” | Lower client confidence | Preserve current MVP concept, then run a planned brand-led refinement slice with real assets/content. |
| GitHub Pages is used for full-stack Next.js | Server features do not run | Deploy full app on a Next.js-capable host; retain Pages only for static demo. |

---

## 19. Proposal traceability matrix

| Proposal item | System location / implementation |
|---|---|
| Dynamic homepage hero, CTA, highlights, testimonials | Public homepage and controlled published content; claims require approval. |
| Six company-approved services | Services table, hub, shared detail route, and CMS editor. |
| Custom multi-step estimate request | `/quote` flow, server validation, inquiry storage, staff follow-up. |
| About Us, service-area coverage, interactive map, contacts | `/about`, `/contact`, verified service-area settings, map/link. |
| Visual media editor for hero/gallery/team | CMS and approved Supabase Storage bucket. |
| Edit service descriptions, promotional text, pricing | Content/service editor with draft/publish and no invented U.S. prices. |
| Central lead dashboard | Protected `/admin/inquiries` with filtering and workflow status. |
| Role-based login security | Supabase Auth, trusted staff roles, protected routes/actions, RLS. |
| Database backup controls | Admin operations view, actual Supabase backup/restore settings, tested runbook. |
| Option A guided chatbot | FAQ nodes/options, clickable tree, approved answers, human fallback. |
| Option B AI chatbot | Explicitly excluded. |
| Responsive/mobile design | Rebuild existing design concept in reusable responsive Next.js components. |
| Search/SEO | Per-route metadata, local SEO only after location verification. |
| Two-to-three-week delivery estimate | Source proposal target, not guaranteed U.S. schedule/quote; validate at kickoff. |
| ETB investment and infrastructure prices | Recorded as Ethiopia-specific source facts; not applied to U.S. estimates. |

---

## 20. Definition of MVP complete

The MVP is complete when a visitor can understand the confirmed services and coverage, follow a guided FAQ path, and successfully submit a validated request; an authorized staff member can securely review/process that request and maintain the published service/site/FAQ content; database and storage permissions have passed role-based tests; and the deployed app has a verified operational and recovery plan.

The MVP must retain the design concept the client approved, while the later design refinement remains a separate planned slice. No feature is considered complete solely because its page looks finished; its persistence, permissions, error cases, and operational ownership must also work.
