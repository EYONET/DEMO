import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getActiveServiceAreas } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About | Crown Cleaning Solutions",
  description:
    "Learn about Crown Cleaning Solutions and its six services in Aurora and Denver. ZIP-code confirmation required.",
};

export default async function AboutPage() {
  const serviceAreas = await getActiveServiceAreas();

  return (
    <div className="crown-site">
      <SiteHeader />
      <main id="main">
        <section className="page-hero section crown-page-hero">
          <div className="container">
            <Link className="back-link" href="/">← Back to home</Link>
            <div className="eyebrow"><span className="eyebrow-dot" /> About Crown</div>
            <h1>A clean that fits<br /><span>what you need.</span></h1>
            <p className="page-lead">
              Crown Cleaning Solutions serves Aurora and Denver, Colorado, and
              may serve more areas. Share your ZIP code so the team can confirm
              whether your location is within the service area.
            </p>
          </div>
        </section>
        <section className="section about-page-section crown-about-section">
          <div className="container about-page-grid">
            <article className="about-story">
              <div className="eyebrow">Company-listed services</div>
              <h2>Cleaning services for different needs.</h2>
              <p>
                The company lists Car Detailing, Carpet Cleaning, Upholstery
                Cleaning, Move-in / Move-out Cleaning, Residential Deep
                Cleaning, and Post-Construction Cleaning.
              </p>
              <p>
                Contact the team to discuss the service scope, coverage, and
                availability for your request.
              </p>
              <div className="about-story-actions">
                <Link className="button button-outline" href="/services">
                  Explore services <span aria-hidden="true">↗</span>
                </Link>
                <Link className="button button-dark" href="/#quote">
                  Request an estimate <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
            <aside className="service-area-panel" aria-labelledby="service-area-heading">
              <span className="eyebrow">Where we work</span>
              <h2 id="service-area-heading">Service areas</h2>
              <p>
                We serve Aurora and Denver, Colorado, and may serve more areas.
                Please share your ZIP code so we can confirm whether your
                location is within our service area.
              </p>
              {serviceAreas.length > 0 ? (
                <>
                  <p>Additional currently listed locations:</p>
                  <ul className="area-list">
                    {serviceAreas.map((area) => (
                      <li key={area.id}>
                        <span>{area.city}, {area.state}</span>
                        {area.postal_codes.length > 0 && (
                          <small>ZIP codes: {area.postal_codes.join(", ")}</small>
                        )}
                        {area.map_url && (
                          <a href={area.map_url} target="_blank" rel="noreferrer">
                            View map <span aria-hidden="true">↗</span>
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>Contact the team with your ZIP code to check coverage.</p>
              )}
              <Link className="text-link" href="/contact">
                Ask about your location <span aria-hidden="true">→</span>
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
