import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getPublicContactDetails } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact | Crown Cleaning Solutions",
  description:
    "Contact Crown Cleaning Solutions about its six cleaning services in Aurora and Denver.",
};

export default async function ContactPage() {
  const contact = await getPublicContactDetails();

  return (
    <div className="crown-site">
      <SiteHeader />
      <main id="main">
        <section className="page-hero section">
          <div className="container">
            <Link className="back-link" href="/">← Back to home</Link>
            <div className="eyebrow"><span className="eyebrow-dot" /> Get in touch</div>
            <h1>We’d be glad<br /><span>to hear from you.</span></h1>
            <p className="page-lead">
              Ask about one of the listed cleaning services, or share your ZIP
              code so the team can confirm whether your location is within
              Aurora, Denver, or more areas we may serve.
            </p>
          </div>
        </section>
        <section className="section contact-section">
          <div className="container contact-grid">
            <article className="contact-panel">
              <span className="eyebrow">Contact details</span>
              <h2>Talk with the team.</h2>
              {contact.email || contact.phone || contact.alternatePhone || contact.businessHours ? (
                <ul className="contact-methods">
                  {contact.email && (
                    <li>
                      <span className="contact-method-icon" aria-hidden="true">✉</span>
                      <span>
                        <small>Email</small>
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      </span>
                    </li>
                  )}
                  {contact.phone && (
                    <li>
                      <span className="contact-method-icon" aria-hidden="true">☎</span>
                      <span>
                        <small>Phone</small>
                        <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>{contact.phone}</a>
                      </span>
                    </li>
                  )}
                  {contact.alternatePhone && (
                    <li>
                      <span className="contact-method-icon" aria-hidden="true">☎</span>
                      <span>
                        <small>Additional phone</small>
                        <a href={`tel:${contact.alternatePhone.replace(/[^\d+]/g, "")}`}>
                          {contact.alternatePhone}
                        </a>
                      </span>
                    </li>
                  )}
                  {contact.businessHours && (
                    <li>
                      <span className="contact-method-icon" aria-hidden="true">◷</span>
                      <span>
                        <small>Business hours</small>
                        <span>{contact.businessHours}</span>
                      </span>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="contact-pending">
                  Business email and phone details have not been confirmed or
                  published yet. Please check back later.
                </p>
              )}
            </article>
            <aside className="contact-panel contact-next-step">
              <span className="eyebrow">Need a quote?</span>
              <h2>Tell us what you’re looking for.</h2>
              <p>
                Send an estimate request and the team can follow up to discuss
                your needs. A request does not confirm an appointment.
              </p>
              <Link className="button button-dark" href="/#quote">
                Request an estimate <span aria-hidden="true">↗</span>
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
