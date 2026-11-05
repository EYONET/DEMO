import type { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "@/components/service-card";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getPublishedServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Cleaning Services | Crown Cleaning Solutions",
  description:
    "Explore six services from Crown Cleaning Solutions in Aurora and Denver.",
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <div className="crown-site">
      <SiteHeader />
      <main id="main">
        <section className="page-hero section">
          <div className="container">
            <Link className="back-link" href="/">← Back to home</Link>
            <div className="eyebrow"><span className="eyebrow-dot" /> Crown Cleaning Solutions</div>
            <h1>Cleaning services<br /><span>for your space.</span></h1>
            <p className="page-lead">
              Explore the six services listed by Crown Cleaning Solutions.
              Service details, scope, and availability are confirmed with the
              team.
            </p>
          </div>
        </section>
        <section className="section services-section">
          <div className="container">
            {services.length > 0 ? (
              <div className="service-grid">
                {services.map((service, index) => (
                  <ServiceCard key={service.id} service={service} index={index} />
                ))}
              </div>
            ) : (
              <p className="service-empty">
                Service details are being prepared. Please check back soon.
              </p>
            )}
            <div className="page-cta">
              <p>Have questions about a service?</p>
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
