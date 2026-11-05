import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy | Crown Cleaning Solutions",
  description:
    "Learn how Crown Cleaning Solutions handles information submitted through its website.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="crown-site">
      <SiteHeader />
      <main id="main">
        <section className="page-hero section crown-page-hero">
          <div className="container">
            <Link className="back-link" href="/">← Back to home</Link>
            <div className="eyebrow"><span className="eyebrow-dot" /> Legal information</div>
            <h1>Privacy<br /><span>Policy.</span></h1>
            <p className="page-lead">Last updated November 5, 2026</p>
          </div>
        </section>
        <article className="crown-legal-content">
          <p>
            Crown Cleaning Solutions (“Crown,” “we,” “us,” or “our”) respects
            your privacy. This policy explains what information this website
            collects when you send an estimate inquiry and how that information
            is used.
          </p>

          <section>
            <h2>Information you provide</h2>
            <p>
              The estimate inquiry form asks for your name and email address.
              Phone number, city, requested service, and message are optional.
              Information you choose to include in your message may also be
              collected. Please do not include payment details, access codes,
              alarm codes, or other sensitive information in the form.
            </p>
          </section>

          <section>
            <h2>How we use and protect inquiry information</h2>
            <p>
              We use inquiry details to review your request, follow up with
              you, discuss service scope, and check whether your ZIP code is
              within our service area. Inquiry records are stored in Supabase
              and are available to authorized Crown staff for follow-up.
              Access is restricted through staff permissions and database
              access policies.
            </p>
            <p>
              We do not sell inquiry information. We do not use this website
              to accept payments, sell gift certificates, or complete service
              bookings.
            </p>
          </section>

          <section>
            <h2>Service providers and external resources</h2>
            <p>
              Supabase provides the database and staff authentication used by
              this application. Public pages also request fonts and illustrative
              images from third-party providers, including Google Fonts,
              Unsplash, and Vecteezy. Those providers may receive technical
              information, such as your IP address and browser details, when
              your browser requests their resources. Their privacy practices
              are governed by their own policies.
            </p>
          </section>

          <section>
            <h2>Cookies and analytics</h2>
            <p>
              The website is not configured with Google Analytics, Google Ads,
              advertising retargeting, lead-attribution software, or call
              tracking. Necessary session cookies may be used for authorized
              staff sign-in. This website does not currently offer marketing
              email or SMS sign-up forms.
            </p>
          </section>

          <section>
            <h2>Retention and your requests</h2>
            <p>
              We keep inquiry information for as long as it is needed to review
              and follow up on the request and for related business or legal
              needs. A fixed deletion schedule has not been established. You
              may contact us to ask about, correct, or request deletion of
              information you submitted; we may need to retain information
              where required for legitimate business or legal reasons.
            </p>
            <p>
              Privacy laws may provide additional rights depending on where
              you live. To make a privacy request, use the contact details on
              our <Link href="/contact">Contact page</Link>. If no direct
              contact details are displayed, submit the{" "}
              <Link href="/#quote">estimate request form</Link> and identify
              your message as a privacy request. It will be stored as an
              inquiry and available to authorized staff.
            </p>
          </section>

          <section>
            <h2>Children’s privacy</h2>
            <p>
              This website is intended for adults seeking cleaning services.
              If you believe a child has submitted personal information through
              the website, please contact us so we can review the request.
            </p>
          </section>

          <section>
            <h2>Changes to this policy</h2>
            <p>
              We may update this policy when our website or information
              practices change. The latest version and its update date will be
              posted on this page.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
