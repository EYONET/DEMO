import type { Metadata } from "next";
import Link from "next/link";
import CleaningOptionsDetails from "@/components/cleaning-options-details";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Light and Deep Cleaning | Crown Cleaning Solutions",
  description:
    "Compare Light and Deep Cleaning tasks, recommendations, and optional add-ons from Crown Cleaning Solutions.",
};

export default function CleaningOptionsPage() {
  return (
    <div className="crown-site">
      <SiteHeader />
      <main id="main">
        <section className="page-hero section crown-page-hero">
          <div className="container">
            <Link className="back-link" href="/#cleaning-options">
              ← Back to home
            </Link>
            <div className="eyebrow"><span className="eyebrow-dot" /> Cleaning options</div>
            <h1>Light and Deep<br /><span>Cleaning.</span></h1>
            <p className="page-lead">
              Choose from two customizable options. Light Cleaning is
              recommended for recurring cleanings. Deep Cleaning is
              recommended for move-out services or when you want a more
              thorough clean.
            </p>
          </div>
        </section>
        <section className="crown-section crown-cleaning-details-section">
          <div className="crown-container">
            <CleaningOptionsDetails />
            <div className="page-cta">
              <p>Have questions about Light or Deep Cleaning?</p>
              <Link className="button button-dark" href="/#quote">
                Request an estimate <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
