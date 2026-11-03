import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer crown-footer">
      <div className="crown-container crown-footer-grid">
        <div className="crown-footer-brand">
          <Link className="brand crown-brand" href="/">
            <span className="brand-mark" aria-hidden="true">♛</span>
            <span>Crown <span className="brand-light">Cleaning Solutions</span></span>
          </Link>
          <p>
            Regular and deep cleaning information for customers in Aurora and
            Denver, Colorado. ZIP-code confirmation is required.
          </p>
        </div>
        <nav className="crown-footer-column" aria-label="Cleaning services">
          <h2>Services</h2>
          <Link href="/services">All cleaning services</Link>
          <Link href="/#solutions">Residential cleaning</Link>
          <Link href="/#solutions">Commercial cleaning</Link>
          <Link href="/#solutions">Deep cleaning</Link>
          <Link href="/#solutions">Move-in cleaning</Link>
        </nav>
        <nav className="crown-footer-column" aria-label="Company information">
          <h2>Company</h2>
          <Link href="/about">About Crown</Link>
          <Link href="/#standard">Our standard</Link>
          <Link href="/#story">Cleaning approach</Link>
          <Link href="/#gallery">Evidence of Craft</Link>
          <Link href="/#before-after">Before &amp; after</Link>
          <Link href="/#testimonials">Customer feedback</Link>
        </nav>
        <nav className="crown-footer-column" aria-label="Customer inquiries">
          <h2>Inquiries</h2>
          <Link href="/#pricing">Pricing guidance</Link>
          <Link href="/#coverage">Service area</Link>
          <Link href="/#protocol">Operational framework</Link>
          <Link href="/contact">Contact</Link>
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
