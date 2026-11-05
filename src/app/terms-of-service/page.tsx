import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Terms of Service | Crown Cleaning Solutions",
  description:
    "Read the terms for using the Crown Cleaning Solutions website and submitting an estimate inquiry.",
};

export default function TermsOfServicePage() {
  return (
    <div className="crown-site">
      <SiteHeader />
      <main id="main">
        <section className="page-hero section crown-page-hero">
          <div className="container">
            <Link className="back-link" href="/">← Back to home</Link>
            <div className="eyebrow"><span className="eyebrow-dot" /> Legal information</div>
            <h1>Terms of<br /><span>Service.</span></h1>
            <p className="page-lead">Last updated November 5, 2026</p>
          </div>
        </section>
        <article className="crown-legal-content">
          <p>
            These terms describe use of the Crown Cleaning Solutions website
            and its estimate inquiry form. By using the website, you agree to
            use it lawfully and provide accurate information when submitting a
            request.
          </p>

          <section>
            <h2>Services and service area</h2>
            <p>
              Crown lists Car Detailing, Carpet Cleaning, Upholstery Cleaning,
              Move-in / Move-out Cleaning, Residential Deep Cleaning, and
              Post-Construction Cleaning. Light and Deep Cleaning are also
              described as informational options on a separate page.
            </p>
            <p>
              Crown serves Aurora and Denver, Colorado. Other locations may be
              considered after ZIP-code confirmation. Service scope and
              availability are discussed with the team.
            </p>
          </section>

          <section>
            <h2>Estimate inquiries are not bookings</h2>
            <p>
              Submitting the website form sends an inquiry; it does not reserve
              a time, confirm an appointment, or create a service booking.
              Crown staff must follow up to discuss the request, confirm
              service-area eligibility, scope, availability, and any terms
              agreed for the requested service.
            </p>
            <p>
              Public prices are not displayed on this website. Do not treat
              information on the website as a price quote or confirmation of
              service.
            </p>
          </section>

          <section>
            <h2>Light and Deep Cleaning information</h2>
            <p>
              The separate Light and Deep Cleaning page describes the
              recommendations and task checklist provided by Crown. These are
              informational options and are not separate choices in the
              estimate inquiry service list. Any requested work is discussed
              with Crown before service.
            </p>
          </section>

          <section>
            <h2>Satisfaction policy</h2>
            <p>
              If you are unhappy with any part of your cleaning, contact Crown
              within 48 hours of your service. Crown will return to touch up
              the areas you are dissatisfied with.
            </p>
          </section>

          <section>
            <h2>Website content and third-party resources</h2>
            <p>
              Some website photographs are illustrative stock images and do
              not depict Crown projects. Project photos, when displayed, are
              presented as Crown work only when approved for publication.
              Links or resources provided by third parties are subject to
              those providers’ own terms and policies.
            </p>
          </section>

          <section>
            <h2>Changes and questions</h2>
            <p>
              Website content and these terms may be updated as Crown’s
              services and practices are confirmed. For questions about these
              terms, use the contact details available on our{" "}
              <Link href="/contact">Contact page</Link>.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
