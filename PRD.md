# Product Requirements Document

## Project

**Working name:** Crown Cleaning Solutions
**Product:** Responsive cleaning-service website with an authenticated content-management area and an FAQ button chatbot
**Status:** Initial requirements draft
**Source:** *Web Development & Chatbot Integration Proposal*

## 1. Product summary

Build a trustworthy, mobile-friendly website for Crown Cleaning Solutions. The owner has confirmed Aurora and Denver, Colorado as the general service area, with ZIP-code confirmation required. Visitors can learn about cleaning services, request an estimate or booking, and get immediate answers through a guided, button-based FAQ chatbot. Authorized staff can update site content and images and manage submitted inquiries.

The agreed chatbot scope is **Option A only**: a predefined decision tree with clickable choices and answers. The product will not include the proposal's Option B AI conversational chatbot.

## 2. Goals

- Present the company, its services, service area, and contact information clearly.
- Convert prospective customers into complete quote or booking inquiries.
- Provide immediate answers to common questions using a predictable, maintainable FAQ flow.
- Let authorized staff manage website content, images, and incoming inquiries without developer assistance.
- Work well on mobile, tablet, and desktop, with accessible and performant pages.
- Protect customer inquiry data and restrict administrative access.

## 3. Non-goals

- Open-ended AI chatbot, LLM integration, or paid chatbot API usage.
- Real-time availability, calendar scheduling, or guaranteed appointment reservations.
- Online payments, customer accounts, or a customer-facing booking portal.
- Native mobile applications.
- Multi-branch, franchise, or multi-tenant management.
- A multilingual launch unless confirmed as a requirement before implementation.

## 4. Users and roles

### Website visitor / prospective customer

Can browse public pages, use the FAQ chatbot, and submit a quote or booking inquiry.

### Administrator / staff member

Can sign in, manage approved website content and images, view and update inquiry status, and sign out. Administrative capabilities must be protected by authentication and database authorization policies.

## 5. Proposed technical foundation

- **Application:** Next.js with TypeScript.
- **Database and backend services:** Supabase (PostgreSQL, Authentication, and Storage where appropriate).
- **Authorization:** Supabase Auth for staff sign-in; PostgreSQL Row Level Security (RLS) for protected data.
- **Hosting:** To be selected. The proposal estimates annual domain and hosting charges; provider and deployment approach remain to be confirmed.
- **Configuration:** Local secrets belong in ignored `.env.local`; share only placeholder names and values in `.env.example`.
- **Initial localization assumption:** U.S.-oriented English copy. Aurora and Denver, Colorado are owner-approved coverage wording, but ZIP codes and exact coverage boundaries still require confirmation. Prices, legal entity details, and applicable policies must be supplied by the business before launch.

The implementation should use the Supabase public/publishable client key only in browser-safe configuration. Do not expose a Supabase service-role/secret key in client code or commit credentials.

## 6. Product scope and requirements

### 6.1 Public website

Provide five agreed page templates/areas:

1. **Home:** Hero and estimate CTA; services; service expectations; about/cleaning approach; optional project gallery and before-and-after sections; inquiry process; genuine-review placeholder; confirmed service area; estimate form; and the guided FAQ chatbot. Keep project-photo sections hidden until genuine Crown project photos are approved for publication. Do not display prices or substitute fabricated reviews, statistics, or trust claims.
2. **Services:** Service hub for Car Detailing, Carpet Cleaning, Upholstery Cleaning, Move-in / Move-out Cleaning, Residential Deep Cleaning, and Post-Construction Cleaning. Individual service detail routes use a shared template. Light and Deep Cleaning are described separately on the homepage and are not selectable inquiry services; their recommendations, inclusions, and add-ons are based on client-provided details.
3. **About:** Company information, confirmed local service coverage, and an interactive map or map link.
4. **Quote / booking request:** A clear, validated form for collecting customer inquiries.
5. **Contact:** Contact channels and relevant service/contact information.

The proposal says “5 custom pages” but separately describes several service pages. The page-template interpretation above is a planning assumption; confirm the final route/page count before design sign-off.

**Acceptance criteria**

- Navigation and calls to action make the services and inquiry form easy to find.
- Layouts adapt to mobile, tablet, and desktop viewports.
- Each service is clearly described and its content can be updated by authorized staff.
- Contact and service-area details are visible and maintained through the CMS where practical.
- Publish Crown's approved 100% Satisfaction Guarantee: customers should contact Crown within 48 hours if dissatisfied, and Crown will return to touch up the areas of concern.

### 6.2 Quote and booking inquiry form

- Use a clear, multi-step or otherwise manageable form to collect the details needed to respond to a prospective customer.
- Collect only necessary information; exact fields and required/optional status need stakeholder approval.
- Validate input on the server as well as in the browser.
- Store successful submissions in Supabase and show a clear confirmation to the visitor.
- Provide an understandable error state if submission fails; do not indicate success unless the inquiry was stored.
- Prevent repeat inquiries using the same normalized email within a 10-minute window, enforced in the database so concurrent or direct API submissions cannot bypass the form.
- Do not promise a confirmed appointment: the form creates an inquiry for staff follow-up.

**Acceptance criteria**

- Valid inquiries are persisted and visible to authorized staff.
- Invalid submissions are rejected with actionable field feedback.
- Visitors receive confirmation only after a successful save.
- Repeat submissions from the same email within 10 minutes are rejected without creating an extra inquiry.
- Public users cannot read other customers' inquiry records.

### 6.3 FAQ button chatbot — Option A

- Display a clearly labeled chatbot launcher on public pages.
- Guide visitors through menus of clickable choices using a predefined decision tree.
- Provide approved answers for common questions, including services and coverage areas. Do not publish prices; direct visitors to submit an inquiry for staff follow-up.
- Offer a route to the inquiry form or contact channel when the FAQ does not answer the visitor's question.
- Make FAQ content easy for staff to maintain, or provide an explicitly documented initial update process.
- Clearly indicate that responses are predefined and do not imply that the bot understands unrestricted free text.

**Acceptance criteria**

- Users can navigate all approved FAQ paths using buttons.
- Each answer reflects stakeholder-approved content; unknown or unsupported questions direct users to a human contact/inquiry route.
- The chat can be dismissed and reopened and remains usable on small screens.
- No LLM, OpenAI API, or other paid AI service is called.

### 6.4 Admin CMS and inquiry management

- Require authenticated staff access.
- Allow authorized staff to edit homepage/promotional text, service descriptions, and images used by the site.
- Let content staff manage homepage gallery images and complete before-and-after pairs, including captions, alt text, ordering, replacement, and removal. Show each section only when enabled and when it contains media; require customer permission for project photos.
- Provide an inquiry dashboard with relevant customer details, submission time, and a manageable status (for example: new, contacted, closed).
- Support secure image upload and replacement if Supabase Storage is used.
- Apply RLS policies so unauthenticated visitors cannot access admin content or inquiry records.
- Include a practical backup and recovery approach for database/content data; exact ownership and schedule must be confirmed.

**Acceptance criteria**

- Unauthenticated users cannot access admin screens or protected data.
- Authorized edits are reflected on the public website.
- Only authorized staff can list or update inquiries.
- Uploads reject unsupported file types and sizes and do not expose private data.

### 6.5 Search, accessibility, and performance

- Implement page titles, descriptions, semantic structure, and shareable URLs for the public pages.
- Provide keyboard-operable navigation, form controls, and chatbot controls, with visible focus and labels.
- Use responsive images and avoid unnecessary client-side JavaScript.
- Handle loading, empty, and error states for data-backed content.

## 7. Data overview

Proposed logical records (final schema to be designed during implementation):

- **Services/content:** public service details and display order. Prices are not displayed publicly.
- **Site content:** editable copy, promotional content, and media references.
- **FAQ nodes/options:** chatbot prompts, answer text, and links to subsequent choices or fallback actions.
- **Inquiries:** customer-provided details, requested service, message/preferences, submission timestamp, and staff-managed status.
- **Staff identities:** Supabase Auth users with an explicitly controlled admin/staff authorization mechanism.

Define retention, deletion, and access rules for customer inquiries before launch. Do not store payment data or other unnecessary sensitive information.

## 8. Success measures

- A visitor can reach and submit an inquiry on mobile and desktop.
- A submitted inquiry is visible only to authorized staff.
- Staff can update public service content without code changes.
- Visitors can reach useful answers through all approved FAQ paths or move to a human contact route.
- No Option B/LLM service is present in the production application.
- Launch-critical accessibility, security, and responsive checks pass.

## 9. Assumptions and decisions to confirm

1. Confirm the five page templates/routes and whether service detail pages count as additional pages.
2. Confirm business name, logo, brand direction, images, testimonials, contact details, service content, and internal quote practices.
3. Approve inquiry fields and whether users should be able to select a preferred date/time (request only, not live availability).
4. Confirm launch language(s); this draft assumes English-first content.
5. Confirm the U.S. city/state, map provider/link, and exact service-area coverage.
6. Identify admin users and decide who can publish content and manage inquiries.
7. Confirm the hosting/deployment provider, domain ownership, and Supabase project/region.
8. Confirm privacy notice, inquiry retention period, backup ownership, and any applicable local compliance requirements.
9. Public pricing is not displayed; price discussions happen through staff follow-up on inquiries.

## 10. Delivery boundary

The source proposal estimates **2–3 weeks** from contract initiation and initial deposit. Its location and pricing are Addis Ababa/Ethiopia-specific and must not be treated as a U.S. quote:

- Week 1: discovery, requirements, wireframes, and visual approval.
- Week 2: website, CMS, and inquiry form.
- Week 2.5: FAQ flow, integration, and testing.
- Week 3: final approval, deployment, and staff training.

The source proposal's investment figures (50,000 ETB for the core website plus Option A, with domain and hosting estimated separately) are retained only as historical source context; they are not applicable U.S. pricing. A U.S. project estimate, local operating costs, and any applicable taxes must be confirmed separately.
