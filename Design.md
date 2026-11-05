# Crown Cleaning Solutions — Design Direction

## 1. Document purpose

This document records the current public-site design direction for Crown Cleaning Solutions. The earlier BrightNest sections below describe a historical static demo only and are not the design source of truth for the current Next.js application.

The current implementation is a front-end concept only:

- `index.html` contains the page content and semantic structure.
- `styles.css` defines the visual system, illustration, responsive behavior, and component states.
- `script.js` implements the mobile navigation, demo estimate form response, and predefined FAQ chat.

Keep these files together to preserve the concept. Open `index.html` in a modern browser to view it locally. No build system is required. The Google Fonts import in the stylesheet uses an internet connection; system-font fallbacks are defined if the fonts cannot load.

## Current Crown direction

- **Brand:** Crown Cleaning Solutions.
- **Visual system:** premium, restrained navy and gold, with high-contrast typography, editorial headings, square-edged controls, and responsive layouts.
- **Design reference:** the client-provided responsive HTML mockup. Do not copy its unsupported prices, testimonials, statistics, credentials, guarantees, or third-party company imagery.
- **Homepage content:** hero and estimate CTA; services; service expectations; cleaning approach/about; illustrative image gallery; inquiry process; a genuine-review placeholder; pricing guidance without invented prices; confirmed Aurora/Denver coverage; estimate form; and the existing guided FAQ chatbot. No separate FAQ section is needed.
- **Trust and differentiation:** publish only confirmed facts. Until the client provides approved trust claims or differentiators, use practical service and inquiry guidance rather than invented badges, experience claims, or guarantees.
- **Images:** Unsplash images are clearly labeled as illustrative stock, not Crown work. The gallery is not a before-and-after proof gallery; authentic Crown project photos can replace it only with owner approval and permission.
- **Unconfirmed content:** exact prices, testimonials, credentials, business hours, detailed service inclusions, and service policies remain unpublished pending approval.

The remaining BrightNest palette, typography, and page-structure sections are retained only to document the old static demo. They are not implementation requirements for the Crown app.

## 2. Design summary

**Concept:** A calm, warm, friendly cleaning brand that sells the feeling of getting one's time and comfortable home back—not just a list of cleaning tasks.

**Working brand:** BrightNest Cleaning.

**Brand promise:** “A brighter kind of clean.”

**Visual character:** Airy, natural, welcoming, thoughtful, and quietly professional. Avoid the cold, clinical look often associated with cleaning companies. Use a composed layout and restrained decoration so the experience feels dependable rather than overly playful.

**Primary audience:** U.S.-based households looking for home, deep, or move-in/move-out cleaning. The actual city/state, service radius, operating details, and real pricing are not established yet; the concept deliberately avoids inventing them.

**Primary action:** Request a free estimate.

**Secondary actions:** Explore cleaning services, learn how the process works, or use the guided FAQ.

## 3. Experience principles

1. **Lead with reassurance.** Explain the customer benefit in everyday language and show an approachable home scene before asking for a form submission.
2. **Make the next step obvious.** Use a consistent estimate CTA in the header, hero, process section, and form area.
3. **Reduce uncertainty.** Explain the three-step process, use simple service descriptions, and offer short predefined FAQ paths.
4. **Feel human, not automated.** Use warm copy, gentle color, and conversational FAQ answers. The FAQ is explicitly a button-guided rules-based helper—not an AI bot.
5. **Keep trust claims honest.** Do not publish invented reviews, star ratings, years in business, certifications, pricing, geographic coverage, or service guarantees.
6. **Work everywhere.** Preserve readable text, touch-friendly controls, clear focus states, and useful navigation across small and large screens.

## 4. Visual identity

### 4.1 Color palette

The palette combines leafy green with a warm off-white base and small amber accents. CSS variables are defined near the top of `styles.css`.

| Token | Current value | Usage |
|---|---|---|
| `--ink` | `#1e3028` | Primary text and headlines |
| `--muted` | `#69756d` | Explanatory copy and secondary labels |
| `--green` | `#426c52` | Brand emphasis, links, and supporting actions |
| `--green-dark` | `#254532` | Main CTA, footer band, and chat header |
| `--mint` | `#eaf0e7` | Light brand surface token |
| `--cream` | `#f8f8f3` | Main page background |
| `--line` | `#e6e9e1` | Quiet borders and separators |
| `--orange` | `#efa96a` | Small moments of warmth and attention |
| White | `#fff` | Cards, form, header surfaces, and contrast |

The palette should remain mostly light, using dark green selectively for emphasis. The amber tone is an accent, not a competing primary color. Check contrast whenever real brand colors or text sizes change.

### 4.2 Typography

- **Headings:** Manrope, with a system sans-serif fallback. Headlines are large, tightly tracked, and medium-weight to feel modern and confident without appearing corporate.
- **Body and UI:** DM Sans, with an Avenir/Arial-style fallback. Body copy is compact, readable, and friendly.
- **Hierarchy:** Large expressive hero statement; clear section titles; modest service-card titles; quiet uppercase eyebrow labels; smaller functional metadata.
- **Emphasis:** Use the green span in a heading to highlight the emotional or actionable phrase. Avoid excessive bold or all-caps text.

The font import is external. For an offline, privacy-sensitive, or fully self-contained production deployment, either accept the defined local system fallbacks or self-host properly licensed font files.

### 4.3 Shape, spacing, and depth

- Use generous section spacing to let the content breathe.
- Use compact, restrained corner radii on cards and controls; reserve the large arch for the hero illustration.
- Use subtle borders and low-opacity shadows rather than heavy outlines or prominent drop shadows.
- Keep buttons clear and touchable. The primary action is a solid dark-green rectangle with a small arrow cue.
- Separate content through background changes, spacing, and alignment rather than excessive decoration.

## 5. Page structure and content intent

The design is a single scrolling landing page with anchor navigation.

### 5.1 Sticky header

- Brand mark and wordmark at the left.
- Links to Services, How it works, and About us.
- Prominent “Get a free estimate” CTA.
- On narrow screens, replace the inline navigation with a menu button that toggles the navigation panel.
- Keep the header background translucent and lightly blurred where supported, with a quiet divider.

### 5.2 Hero

- Left column: small eyebrow label, large three-line emotional headline, concise value statement, primary estimate CTA, secondary services link, and a deliberately non-quantified demo social-proof treatment.
- Right column: custom CSS illustration of a serene living room with a window, plant, sofa, coffee table, rug, sunlight, and a small “happy place” note.
- A slim trust strip below summarizes intended brand qualities: thoughtful teams, respect for the home, and care in the details.
- The illustration is drawn with CSS shapes, not a third-party photo. It is decorative brand imagery, not evidence of a real customer home or a completed service.

### 5.3 Services

The current company-provided service list, in order, is:

1. Car Detailing.
2. Carpet Cleaning.
3. Upholstery Cleaning.
4. Move-in / Move-out Cleaning.
5. Residential Deep Cleaning.
6. Post-Construction Cleaning.

Use the approved service names without implying unconfirmed inclusions, availability, or prices. The earlier three-card service lineup below is historical static-demo content, not the current catalog.

### 5.4 “How it works”

Three numbered steps set expectations:

1. Tell us about your home.
2. Get a personal estimate.
3. Enjoy your fresh start.

The copy should make clear that a submitted request starts a follow-up conversation; it is not an instant confirmed appointment.

### 5.5 Estimate request

- Split layout: reassuring explanation and contact placeholder at left; a clear estimate form card at right.
- Initial fields: first name, email, service, city or ZIP code, and optional notes.
- Native required-field and email validation gives a basic interactive prototype.
- The current form is intentionally demo-only. JavaScript displays a clear message that it does not send or store submissions.
- Do not collect actual visitor details on this static demo.

For production, connect the form to the agreed server-side application and database workflow, add server validation and error handling, provide an appropriate privacy notice, and never show a success state unless persistence succeeds.

### 5.6 Brand band and footer

- Dark green brand band restates the emotional benefit and includes another estimate CTA.
- Footer repeats the wordmark, brand promise, and a CTA.
- Demo status and sample contact information are called out so they are not mistaken for real business details.

### 5.7 FAQ button chatbot

- Fixed “Questions?” launcher sits at the bottom-right.
- The panel contains a branded heading, a scrollable conversation area, clickable FAQ options, and a short disclosure that responses are predefined rather than AI-generated.
- Topics cover services and service-specific follow-ups, pricing, scheduling, service-area availability, preparation, supplies, pets, and care of the home.
- FAQ answers route into related follow-up questions. Visitors can return to the main topic list at any point.
- A three-second animated “Thinking” indicator appears after each selection to create a conversational pause. This is a deliberate visual simulation; no model is thinking and no AI service is called.
- Answers avoid claiming unsupported actual prices or coverage; visitors are directed to request a personalized estimate or share their location.
- The widget can be dismissed and reopened, and Escape closes it.

The current FAQ is a front-end illustration of the proposal's **Option A**. It is a deterministic menu of approved, editable answers. Do not add free-form AI, an LLM, or a paid chatbot API unless the product scope is explicitly changed.

## 6. Interaction specification

### Navigation

- Desktop navigation links scroll to their matching page sections.
- The mobile menu button exposes its state through `aria-expanded` and its controlled navigation through `aria-controls`.
- Choosing a mobile navigation link closes the menu.
- Keyboard focus has a clearly visible outline.

### Estimate form

- Native browser validity checks required fields and email format.
- Successful client-side validation on this demo shows a clear “not sent or saved” disclosure and resets the fields.
- No network request is made.
- A production implementation should have distinct pending, success, and failure states, with success only after a confirmed save.

### FAQ widget

- Launcher toggles the chat open or closed and updates its expanded state.
- When opened, focus moves to an FAQ choice unless an answer is in its simulated delay.
- Selecting an option appends the visitor's choice and corresponding answer, then presents the next related decision node.
- A “Main questions” control is available within follow-up topics so visitors can return to the top-level choices.
- Selecting a topic shows a three-second animated thinking indicator, then the predefined answer and a related follow-up decision node. While it is visible, other answer buttons are disabled.
- Close button and Escape close the panel; the close button returns focus to the launcher.
- Use text content APIs for dynamic message insertion rather than interpreting visitor text as HTML.

### Motion

- Small hover elevation on cards and buttons.
- Short transitions for navigation and FAQ panel state.
- The stylesheet respects `prefers-reduced-motion` by removing most animation/transition duration and smooth scrolling.
- Keep motion optional and nonessential to understanding or using the page.

## 7. Responsive behavior

The design is responsive and includes these key rules in `styles.css`:

- **Wide desktop (above 900px):** Two-column hero and content layouts; three service cards; inline navigation; large, decorative hero artwork.
- **Tablet/narrow desktop (900px and below):** Tighter container and column gaps; hero illustration and text remain side by side; trust strip can wrap.
- **Mobile (650px and below):** Header becomes a menu-toggle layout; hero and split sections become single-column; services become a vertical card list; form fields stack; content spacing and heading sizes adjust; FAQ panel scales to the available viewport.
- **Small touch screens:** The main estimate action, navigation toggle, FAQ launcher, and FAQ options remain visible and usable without hover.
- **Reduced-motion preference:** Nonessential animated transitions are minimized.

The HTML uses the responsive viewport meta tag. Responsive styling is present, but the demo should still be inspected at real target viewport widths and with keyboard navigation before approval. Responsive does not by itself mean production-ready or accessible in every context.

## 8. Accessibility and usability notes

The concept includes:

- Semantic page sections, navigation, main content, form labels, buttons, and footer.
- Skip-to-content link.
- Visible keyboard focus styling.
- Programmatically labeled main navigation and FAQ panel.
- `aria-expanded`, `aria-controls`, and chat message live-region semantics.
- Alt-role description for the CSS hero illustration.
- Required form fields with appropriate input types and autocomplete hints.
- Reduced-motion support.
- Text-based information alongside the CSS artwork; important content is not embedded only in images.

Before production, verify full keyboard operation, focus order and focus visibility on all backgrounds, screen-reader announcement quality, text and control contrast, zoom/reflow, FAQ panel focus behavior, and form error association. The current FAQ panel implements focus on open and return-to-launcher on close, but does not contain a full modal-style focus trap; treat it as a non-modal popover.

## 9. U.S. localization and content safeguards

The location assumption is **United States, with no city/state specified**. This design therefore uses generic English-language U.S. context, a city/ZIP prompt, and no geographic claim. Before launch, replace the concept with verified business information:

- Actual business name, logo, identity, and approved brand colors.
- City/state, ZIP codes or neighborhoods served, and service radius.
- Actual services, availability, inclusions/exclusions, and cancellation terms.
- Approved estimate process and real prices/currency, if prices will be published.
- Real email, phone, business hours, and response expectations.
- Approved testimonials and ratings only if authentic and permissioned.
- Privacy notice and any other applicable business disclosures.
- Local spelling, terminology, and tax or regulatory details reviewed for the operating location.

The Addis Ababa proposal's ETB amounts, location, and local assumptions are not U.S. prices and should not appear as such.

## 10. Production evolution

When translating this concept into the planned full-stack product:

1. Preserve the typography, palette, layout hierarchy, and visitor-first tone.
2. Make approved content and imagery editable in the CMS.
3. Connect the estimate flow to a secure backend with validation and authorization appropriate to a public inquiry form.
4. Add a staff-only inquiry dashboard and content administration.
5. Store approved FAQ options and responses in the agreed maintainable content source.
6. Keep secrets out of client-side code and source control.
7. Keep the chatbot deterministic and rules-based under the agreed Option A scope.
8. Revisit the page hierarchy and route count once the final business content is known.
9. Test the built pages against real device widths, content lengths, and approved imagery; the illustrated hero may need to be replaced or supplemented with licensed, authentic brand photography.

## 11. Current demo limitations

- No Next.js application, Supabase connection, CMS, authentication, database, analytics, or production deployment is included in this static demo.
- The estimate form never sends or saves data.
- Brand, email address, testimonials/social proof styling, and service details are illustrative placeholders.
- The business location and service area are unconfirmed.
- The CSS illustration and placeholder copy are not a representation or guarantee of real service delivery.
- The Google Fonts import requires a network connection; system fallbacks are available.
- No automated visual regression or cross-browser suite is configured in the static-file workspace.

## 12. Files that preserve this concept

| File | Purpose |
|---|---|
| `Design.md` | Design intent, rules, interactions, and constraints |
| `index.html` | Single-page content and semantic structure |
| `styles.css` | Palette, typography, illustration, components, and responsive rules |
| `script.js` | Navigation, demo form behavior, and guided FAQ interactions |
| `PRD.md` | Product requirements and decisions to confirm |
| `PLAN.md` | Proposed implementation and delivery phases |

Keep these files together when copying or archiving the design. The current workspace is not a Git repository, so there is no commit history yet. To use version control later, initialize Git in the project folder and commit the design files after reviewing them.
