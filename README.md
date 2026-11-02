# Cleaning Service Full-Stack App

Full-stack cleaning-services website built with Next.js, TypeScript, and Supabase. The application foundation is in place; backend integration will be developed in slices.

## Project documents

- [System design](./SYSTEM-DESIGN.md) — architecture, data model, security, workflows, and implementation slices.
- [Product requirements](./PRD.md) — agreed MVP behavior and decisions to confirm.
- [Development plan](./PLAN.md) — phases, milestones, risks, and validation.
- [Design concept](./Design.md) — current Crown design direction and historical BrightNest reference.
- [Agent instructions](./AGENTS.md) — project-wide engineering and security conventions.
- [Development status](./DEVELOPMENT-STATUS.md) — current checkpoint and next slice.

## Current status

The Next.js App Router site reads published public content from Supabase and includes an inquiry form with server validation, anonymous insert/read-protection policies, a 10-minute same-email duplicate guard, and explicit save-failure handling. Anonymous submission, duplicate/concurrent request handling, and staff follow-up have been verified with synthetic data. Staff role separation and no-staff sign-in denial, plus CMS service/content, service-area, image, and FAQ workflows, have also been verified. Final launch QA and production setup remain. See [DEVELOPMENT-STATUS.md](./DEVELOPMENT-STATUS.md) for the verification record and current resume point. This is still a development preview, not production-ready.

The public-site redesign now uses the owner-approved Crown Cleaning Solutions brand and navy/gold direction. Approved public copy includes regular/deep-cleaning guidance and Aurora/Denver coverage with ZIP-code confirmation. Stock imagery is illustrative, not Crown work; real testimonials, prices, credentials, and project photos remain subject to owner approval.

The project concept and implementation decisions are captured in [PRD.md](./PRD.md), [PLAN.md](./PLAN.md), [SYSTEM-DESIGN.md](./SYSTEM-DESIGN.md), and [Design.md](./Design.md). Source repository: [DEMO](https://github.com/EYONET/DEMO). Keep `.env.local` and all real credentials local and ignored; GitHub contains only safe configuration templates.

## Local development

Requirements: Node.js LTS and npm.

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`. Useful checks:

```powershell
npm run lint
npm run typecheck
npm run build
```

The homepage is a development preview. Use synthetic test details only; business-approved privacy/retention terms and production anti-abuse protections are still launch prerequisites.

## Production operations checklist

Do not use the development Supabase project for customer data. Before launch:

1. Create production hosting and Supabase projects owned by the business; restrict production dashboard and GitHub access to named maintainers.
2. Configure only the public Supabase URL/publishable key for the app and keep any server secrets in the hosting provider's encrypted environment settings. Set production Supabase Auth site URL, allowed redirect URLs, email delivery, and recovery flows.
3. Apply the reviewed migrations to production and verify inquiry RLS, staff-role boundaries, Storage upload restrictions, and anonymous access using non-owner test accounts.
4. Configure provider-backed inquiry abuse controls after choosing the hosting platform. Do not rely on process-local memory in a horizontally scaled/serverless deployment; keep the email cooldown as an additional database safeguard.
5. Choose a backup plan that matches the Supabase plan and the business's recovery requirements. Name the backup owner, record frequency/retention, and rehearse restoring the database and uploaded media into a separate project.
6. Configure platform error reporting and uptime alerts without logging inquiry contents, credentials, auth tokens, or personal information. Assign an on-call contact and document the provider support/escalation path.
7. Create individual staff accounts with least-privilege roles, test sign-in, sign-out, password recovery, and access removal, then securely hand account ownership and recovery contacts to the business.
8. Run production smoke tests for public pages, inquiry success/error, duplicate rejection, staff login/roles, CMS publishing, FAQ flows, uploads, mobile layout, and backup/alert configuration. Remove all synthetic test records afterward.

Deployment approval requires the business owner to accept operational ownership of hosting, Supabase, backups, staff access, and customer inquiry follow-up. Never put customer inquiries into CI or test data.

## Supabase development setup

1. Create or select a **development** project in the Supabase dashboard. Choose an appropriate region and store the database password in a password manager.
2. In the project's API settings, copy the **Project URL** and **publishable key** into `.env.local`:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to those dashboard values. Do not use a secret/service-role key in either variable, and never paste credentials into chat.
3. Confirm that `.env.local` is ignored by Git:

   ```powershell
   git check-ignore .env.local
   ```

4. To apply the version-controlled migrations to a new/empty development project, open a terminal in this folder and run:

   ```powershell
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   npx supabase db push
   ```

   Find the project ref in the Supabase dashboard URL. The CLI may request credentials in your local terminal; do not share them. Do not run `db push` against a project with existing application data or schema until its state has been reviewed.
5. Create the first Supabase Auth user in the dashboard:

   - Open **Authentication** → **Users**.
   - Choose **Add user** (the label can vary), and enter your own email address.
   - Set a strong password and store it securely. Do not share it in chat.
   - Confirm the new user appears in the user list before continuing.

   Then open **SQL Editor**, create a new query, replace the example email with the exact email used for that Auth user, and run this query to grant the first admin role:

   ```sql
   insert into public.staff_roles (user_id, role)
   select id, 'admin'::public.staff_role
   from auth.users
   where lower(email) = lower('owner@example.com')
   on conflict (user_id) do update set role = excluded.role;
   ```

   Verify that exactly one expected user has the `admin` role before proceeding. Do not grant admin access to an unverified account. Staff sign in at `/admin/login`; only users with `admin` or `inquiry_manager` roles can access the inquiry dashboard. Do not enable public signup or grant an unverified account a staff role.

   To verify the assignment, run this read-only query in SQL Editor after replacing the example email:

   ```sql
   select u.email, sr.role
   from auth.users as u
   join public.staff_roles as sr on sr.user_id = u.id
   where lower(u.email) = lower('owner@example.com');
   ```

6. Verify the admin's database permissions without leaving test rows behind. In SQL Editor, replace the example email below and run the **entire script**. It temporarily sets the database role and JWT claims for the transaction, tests draft service and inquiry permissions, and rolls back all test writes at the end. Confirm the result shows `is_admin = true`, `role = admin`, and that each insert/select/update returns the marked test row. Do not run this script with real customer data.

   ```sql
   begin;

   select set_config(
     'request.jwt.claim.sub',
     (select id::text from auth.users
      where lower(email) = lower('owner@example.com')),
     true
   );
   select set_config('request.jwt.claim.role', 'authenticated', true);
   select set_config(
     'request.jwt.claims',
     jsonb_build_object(
       'sub', (select id::text from auth.users
               where lower(email) = lower('owner@example.com')),
       'role', 'authenticated'
     )::text,
     true
   );
   set local role authenticated;

   select auth.uid() as test_user_id,
          private.has_staff_role(array['admin']::public.staff_role[]) as is_admin;
   select role
   from public.staff_roles
   where user_id = auth.uid();

   insert into public.services (
     slug, category, title, summary, description, status
   )
   values (
     'rls-admin-test-20261015',
     'residential',
     'RLS admin test - rollback',
     'Synthetic permission test only.',
     'Synthetic permission test only; this transaction will roll back.',
     'draft'
   )
   returning slug, status;

   select slug, status
   from public.services
   where slug = 'rls-admin-test-20261015';

   update public.services
   set summary = 'RLS admin update succeeded inside rollback test.'
   where slug = 'rls-admin-test-20261015'
   returning slug, summary;

   insert into public.inquiries (
     customer_name, email, message, privacy_notice_version
   )
   values (
     'RLS admin test - rollback',
     'slice2-admin-test@example.invalid',
     'Synthetic permission test only; this transaction will roll back.',
     'slice2-admin-test-only'
   )
   returning id, customer_name, status;

   select id, customer_name, status
   from public.inquiries
   where email = 'slice2-admin-test@example.invalid';

   update public.inquiries
   set status = 'contacted',
       staff_notes = 'Synthetic staff permission check; rolled back.'
   where email = 'slice2-admin-test@example.invalid'
   returning status, staff_notes;

   rollback;
   ```

   If the owner email is misspelled or the account lacks the admin role, the checks should fail or report `is_admin = false`; stop and correct the role assignment before proceeding. The transaction is rolled back, so none of the test content or inquiry remains.

Local Supabase emulation (`npx supabase start`) requires Docker Desktop or Podman. Neither is currently available in the development environment. Anonymous REST checks confirmed published services are visible, drafts and inquiries are not, service updates are denied, and anonymous inquiries cannot set staff-only fields. The owner/admin's transaction-based SQL check succeeded for inquiry management and rolled back its test records.

Migration `202610150003_add_demo_services.sql` is applied to the linked development project and adds four clearly labeled demo service entries for the homepage. Replace or remove these entries and review all published copy before a production launch.

The public homepage and `/services` listing read published service rows from Supabase. Each service has a detail route at `/services/[slug]`; draft/unknown slugs return 404. `/about` reads active service-area records, and `/contact` reads only explicitly public contact settings. The homepage estimate form validates submissions on the server and inserts only approved inquiry fields under the anonymous-insert RLS policy. Anonymous read access is denied. Invalid email, honeypot, and forged service selection are rejected; repeat email submissions are blocked for 10 minutes in the database, including concurrent API requests. A signed-out synthetic request was visible to the inquiry manager, whose status/note update and activity history persisted. A simulated HTTP 503 showed the save error without success and preserved form fields. Verification records were deleted. The honeypot and email cooldown are not substitutes for IP-based rate limiting or CAPTCHA before a public launch.

Staff sign in at `/admin/login` using a provisioned Supabase Auth account. `/admin` and `/admin/inquiries/[id]` are limited to users with `admin` or `inquiry_manager` roles. `/admin/content` is for `admin` and `content_editor` roles. The app checks the session and role, and Supabase RLS remains the data-authorization boundary. There is no public registration page. The owner verified that an `inquiry_manager` has inquiry access only, a `content_editor` has content-management access, and a no-staff account is refused sign-in. Direct route attempts with the no-staff account were not separately tested. The inquiry manager also verified a signed-out test inquiry, saved its status and note, and confirmed the status activity entry. The two Slice 4 test inquiries were deleted after verification.

The CMS at `/admin/content` edits homepage hero copy, service descriptions, publication status, pricing labels, images, public contact details, service areas, and FAQ decision-tree nodes/options. FAQ changes stay draft until published. Publish FAQ leaf questions first, then their parent questions, and publish the root last; the app validates that a published tree has one reachable root, no loops, and valid links. Until a complete tree is published, the existing demo FAQ remains visible. Only admins can permanently delete a service, with an explicit confirmation; deletion removes its public route and attempts to remove its image, while existing inquiries keep their saved service-name snapshot but lose the live service relation. Uploaded media is restricted to JPEG, PNG, WebP, or AVIF files up to 5 MB; the server verifies file signatures before using the existing `site-media` bucket. Publishing content is still the owner's responsibility; enter only approved business details.

## Security

- Never commit `.env.local`, Supabase secrets, or customer data.
- Keep real environment values in the local environment or the host's encrypted settings.
- Use Supabase Row Level Security for data authorization; protecting routes in the UI is not sufficient.
- The public quote form must create inquiries only; it must not expose inquiries or claim to confirm appointments.
- The chatbot is Option A: a predefined FAQ decision tree, with no LLM/API integration.
