import Image from "next/image";
import Link from "next/link";
import FaqChat from "@/components/faq-chat";
import InquiryForm from "@/components/inquiry-form";
import ServiceCarousel from "@/components/service-carousel";
import ServiceCard from "@/components/service-card";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getPublishedFaqTree } from "@/lib/faq";
import { getPublishedServices } from "@/lib/services";
import { getPublicHomeCopy } from "@/lib/site-content";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1200&q=80",
    alt: "Illustrative stock photograph of a clean carpeted living space",
    title: "Carpet and living spaces",
  },
  {
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    alt: "Illustrative stock photograph of a tidy living room",
    title: "Everyday home upkeep",
  },
  {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    alt: "Illustrative stock photograph of a cleaner working indoors",
    title: "A closer clean",
  },
];

export default async function Home() {
  const [services, faqNodes, homeCopy] = await Promise.all([
    getPublishedServices(),
    getPublishedFaqTree(),
    getPublicHomeCopy(),
  ]);
  const headlineWords = homeCopy.headline.trim().split(/\s+/);
  const headlineSplitIndex = Math.ceil(headlineWords.length / 2);
  const headlineLead = headlineWords.slice(0, headlineSplitIndex).join(" ");
  const headlineEmphasis = headlineWords.slice(headlineSplitIndex).join(" ");

  return (
    <div className="crown-site">
      <SiteHeader />
      <main id="main">
        <section className="crown-hero">
          <div className="crown-hero-copy">
            <div className="crown-eyebrow">{homeCopy.eyebrow}</div>
            <h1>
              {headlineLead}
              {headlineEmphasis && <> <span>{headlineEmphasis}</span></>}
            </h1>
            <p>{homeCopy.introduction}</p>
            <div className="crown-actions">
              <Link className="crown-button crown-button-primary" href="#quote">
                Request an estimate <span aria-hidden="true">↗</span>
              </Link>
              <Link className="crown-button crown-button-secondary" href="#solutions">
                Explore services
              </Link>
            </div>
            <p className="crown-request-note">
              An inquiry is a request for follow-up, not a confirmed appointment.
            </p>
          </div>
          <div className="crown-hero-visual">
            <Image
              src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1600&q=85"
              alt="Illustrative stock photograph of a person washing a car; not a Crown Cleaning Solutions project"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <span className="crown-image-label">Illustrative stock image · not a Crown project</span>
          </div>
        </section>

        <section className="crown-trust-strip" aria-label="Service information">
          <div className="crown-container crown-trust-grid">
            <p><span aria-hidden="true">01</span> Regular and deep cleaning</p>
            <p><span aria-hidden="true">02</span> Aurora and Denver, Colorado</p>
            <p><span aria-hidden="true">03</span> ZIP code coverage confirmation</p>
          </div>
        </section>

        <section className="crown-section" id="solutions">
          <div className="crown-container">
            <div className="crown-section-heading">
              <div>
                <p className="crown-eyebrow">01 / Cleaning services</p>
                <h2>Find the right clean<br /><span>for your space.</span></h2>
              </div>
              <p>
                Regular cleaning supports everyday upkeep. Deep cleaning is more
                detailed and focuses on built-up dirt and areas that may not be
                included in a standard clean. We can help you choose.
              </p>
            </div>
            {services.length > 0 ? (
              <ServiceCarousel>
                {services.map((service, index) => (
                  <ServiceCard key={service.id} service={service} index={index} />
                ))}
              </ServiceCarousel>
            ) : (
              <p className="crown-empty-state">
                Service details are being prepared. Contact the team to discuss
                what you need.
              </p>
            )}
          </div>
        </section>

        <section className="crown-section crown-standard-section" id="standard">
          <div className="crown-container">
            <p className="crown-eyebrow">02 / What to expect</p>
            <h2>Clear information.<br /><span>A considered clean.</span></h2>
            <div className="crown-standard-grid">
              <article>
                <span>01</span>
                <h3>Choose the right service</h3>
                <p>Not sure whether regular or deep cleaning fits? Tell us what you need and we can help you choose.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Check your location</h3>
                <p>Share your ZIP code so the team can confirm whether your location is within the service area.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Get a follow-up</h3>
                <p>Send an inquiry and the team will follow up. Submitting the form does not confirm an appointment.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="crown-section" id="story">
          <div className="crown-container crown-story-grid">
            <div className="crown-story-image">
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                alt="Illustrative stock photograph of a clean, bright living room"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
              />
              <span className="crown-image-label">Illustrative stock image</span>
            </div>
            <div className="crown-story-copy">
              <p className="crown-eyebrow">03 / The cleaning approach</p>
              <h2>Everyday upkeep<br /><span>or a deeper clean.</span></h2>
              <p>
                Regular cleaning focuses on everyday upkeep, such as wiping
                surfaces, cleaning bathrooms, and vacuuming floors. Deep cleaning
                is more detailed and targets built-up dirt and areas that may not
                be included in a standard cleaning.
              </p>
              <p>We can help you choose the right service.</p>
              <Link className="crown-text-link" href="#quote">
                Tell us what you need <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="crown-section crown-gallery-section" id="gallery">
          <div className="crown-container">
            <div className="crown-section-heading">
              <div>
                <p className="crown-eyebrow">04 / Evidence of Craft</p>
                <h2>A closer look<br /><span>at clean spaces.</span></h2>
              </div>
              <p>
                These licensed stock photos are visual references only—not
                Crown projects or evidence of results. Authentic project photos
                can replace them when available and approved.
              </p>
            </div>
            <div className="crown-gallery-grid">
              {galleryImages.map((image) => (
                <figure className="crown-gallery-card" key={image.src}>
                  <div className="crown-gallery-image">
                    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 100vw, 33vw" />
                    <span className="crown-image-label">Stock image · not a Crown project</span>
                  </div>
                  <figcaption>{image.title}</figcaption>
                </figure>
              ))}
            </div>
            <p className="crown-gallery-note">
              No before-and-after examples are shown. Any future project
              photography will be genuine and published only with permission.
            </p>
          </div>
        </section>

        <section className="crown-section crown-before-after-section" id="before-after">
          <div className="crown-container">
            <div className="crown-section-heading">
              <div>
                <p className="crown-eyebrow">05 / Before &amp; after</p>
                <h2>Real project photos<br /><span>coming when approved.</span></h2>
              </div>
              <p>
                This space is reserved for matched before-and-after photos from
                Crown projects. No project photos have been provided for this
                preview, so these are clearly marked layout placeholders.
              </p>
            </div>
            <div className="crown-before-after-grid">
              {[1, 2, 3].map((pairNumber) => (
                <article className="crown-before-after-card" key={pairNumber}>
                  <div className="crown-before-after-pair">
                    <div className="crown-before-after-slot">
                      <span>Before</span>
                      <p>Approved Crown project photo needed</p>
                    </div>
                    <div className="crown-before-after-slot">
                      <span>After</span>
                      <p>Approved Crown project photo needed</p>
                    </div>
                  </div>
                  <p className="crown-before-after-caption">
                    Photo pair placeholder {String(pairNumber).padStart(2, "0")}
                  </p>
                </article>
              ))}
            </div>
            <p className="crown-gallery-note">
              These are not photos or examples of completed work. Only genuine
              Crown project images, shared with permission, will appear here.
            </p>
          </div>
        </section>

        <section className="crown-section crown-process-section" id="protocol">
          <div className="crown-container">
            <p className="crown-eyebrow">06 / Operational Framework</p>
            <h2>From first inquiry<br /><span>to confirmed service.</span></h2>
            <div className="crown-process-grid">
              <article>
                <span>01</span>
                <h3>Send an inquiry</h3>
                <p>Share the cleaning service you are interested in and your location so the team can review your request.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Request review</h3>
                <p>The team reviews the information you provide and considers the service you are asking about.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Discuss your needs</h3>
                <p>A team member follows up with you to discuss your request and any details that need clarification.</p>
              </article>
              <article>
                <span>04</span>
                <h3>Confirm service</h3>
                <p>The business confirms service and availability with you. Submitting an inquiry is not an appointment.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="crown-section crown-testimonials-section" id="testimonials">
          <div className="crown-container">
            <p className="crown-eyebrow">07 / Customer feedback</p>
            <h2>Reviews, when<br /><span>they’re ready.</span></h2>
            <div className="crown-review-grid">
              {[1, 2, 3].map((previewNumber) => (
                <article className="crown-placeholder-card" key={previewNumber}>
                  <span aria-hidden="true">“</span>
                  <div className="crown-review-preview">
                    <p className="crown-review-preview-label">
                      Fictional layout preview · not a real review
                    </p>
                    <blockquote>
                      Sample customer feedback will appear here after a real
                      review is received and approved for publication.
                    </blockquote>
                    <p className="crown-review-attribution">
                      Placeholder {String(previewNumber).padStart(2, "0")} · no customer
                    </p>
                  </div>
                </article>
              ))}
            </div>
            </div>
        </section>

        <section className="crown-section crown-pricing-section" id="pricing">
          <div className="crown-container crown-pricing-grid">
            <div>
              <p className="crown-eyebrow">08 / Pricing guidance</p>
              <h2>Let’s understand<br /><span>what you need.</span></h2>
            </div>
            <div className="crown-pricing-copy">
              <p>
                Pricing has not been provided for publication. Share the type of
                cleaning you are considering and the team can follow up about
                your request.
              </p>
              <Link className="crown-button crown-button-primary" href="#quote">
                Request an estimate <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="crown-section crown-coverage-section" id="coverage">
          <div className="crown-container crown-coverage-grid">
            <div>
              <p className="crown-eyebrow">09 / Service area</p>
              <h2>Serving Aurora<br /><span>and Denver.</span></h2>
              <p>
                We serve customers in the Aurora and Denver, Colorado area.
                Please share your ZIP code so we can confirm whether your
                location is within our service area.
              </p>
            </div>
            <div className="crown-city-list" aria-label="Confirmed service area">
              <span>Aurora, Colorado</span>
              <span>Denver, Colorado</span>
              <p>ZIP code confirmation required</p>
            </div>
          </div>
        </section>

        <section className="crown-section crown-quote-section" id="quote">
          <div className="crown-container crown-quote-grid">
            <div>
              <p className="crown-eyebrow">10 / Request an estimate</p>
              <h2>Tell us about<br /><span>your space.</span></h2>
              <p>
                Share a few details and a ZIP code. The team will follow up to
                discuss your needs and confirm service availability.
              </p>
              <p className="crown-request-note">
                An inquiry is not a confirmed appointment.
              </p>
            </div>
            <InquiryForm services={services} />
          </div>
        </section>
      </main>
      <SiteFooter />
      <FaqChat publishedNodes={faqNodes} />
    </div>
  );
}
