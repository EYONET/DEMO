import Link from "next/link";
import { getPublicHomeCopy } from "@/lib/site-content";

export default async function SiteFooter() {
  const homeCopy = await getPublicHomeCopy();

  return (
    <footer className="site-footer crown-footer">
      <div className="crown-container crown-footer-grid">
        <div className="crown-footer-brand">
          <Link className="brand crown-brand" href="/">
            <span className="brand-mark" aria-hidden="true">♛</span>
            <span>Crown <span className="brand-light">Cleaning Solutions</span></span>
          </Link>
          <p>
            Service information for Aurora and Denver, with more areas
            potentially available. ZIP-code confirmation is required.
          </p>
        </div>
        <nav className="crown-footer-column" aria-label="Cleaning services">
          <h2>Services</h2>
          <Link href="/services/car-detailing">Car Detailing</Link>
          <Link href="/services/carpet-cleaning">Carpet Cleaning</Link>
          <Link href="/services/upholstery-cleaning">Upholstery Cleaning</Link>
          <Link href="/services/move-in-move-out-cleaning">Move-in / Move-out Cleaning</Link>
          <Link href="/services/residential-deep-cleaning">Residential Deep Cleaning</Link>
          <Link href="/services/post-construction-cleaning">Post-Construction Cleaning</Link>
        </nav>
        <nav className="crown-footer-column" aria-label="Company information">
          <h2>Company</h2>
          <Link href="/about">About Crown</Link>
          <Link href="/light-and-deep-cleaning">Light &amp; Deep Cleaning</Link>
          {homeCopy.galleryEnabled && <Link href="/#gallery">Evidence of Craft</Link>}
          {homeCopy.beforeAfterEnabled && <Link href="/#before-after">Before &amp; after</Link>}
          <Link href="/#testimonials">Customer feedback</Link>
        </nav>
        <nav className="crown-footer-column" aria-label="Customer inquiries">
          <h2>Inquiries</h2>
          <Link href="/#coverage">Service area</Link>
          <Link href="/#protocol">How It Works</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link className="crown-footer-cta" href="/#quote">
            Request an estimate <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
      <div className="crown-container crown-footer-bottom">
        <span>© {new Date().getFullYear()} Crown Cleaning Solutions</span>
        <span>Estimate requests require team follow-up and are not confirmed appointments.</span>
      </div>
    </footer>
  );
}
