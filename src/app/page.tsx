import Image from "next/image";
import Link from "next/link";
import FaqChat from "@/components/faq-chat";
import InquiryForm from "@/components/inquiry-form";
import ServiceCarousel from "@/components/service-carousel";
import ServiceCard from "@/components/service-card";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getPublishedFaqTree } from "@/lib/faq";
import {
  getHomepageBeforeAfterPairs,
  getHomepageGalleryImages,
  getHomepageImageUrl,
} from "@/lib/homepage-media";
import { getPublishedServices } from "@/lib/services";
import {
  getActiveServiceAreas,
  getPublicContactDetails,
  getPublicHomeCopy,
} from "@/lib/site-content";

export default async function Home() {
  const [services, faqNodes, homeCopy, activeServiceAreas, contact] = await Promise.all([
    getPublishedServices(),
    getPublishedFaqTree(),
    getPublicHomeCopy(),
    getActiveServiceAreas(),
    getPublicContactDetails(),
  ]);
  const [galleryImages, beforeAfterPairs] = await Promise.all([
    homeCopy.galleryEnabled ? getHomepageGalleryImages() : Promise.resolve([]),
    homeCopy.beforeAfterEnabled ? getHomepageBeforeAfterPairs() : Promise.resolve([]),
  ]);
  const serviceLocations = [
    { city: "Aurora", state: "Colorado" },
    { city: "Denver", state: "Colorado" },
    ...activeServiceAreas.map(({ city, state }) => ({ city, state })),
  ].filter(
    (area, index, areas) =>
      areas.findIndex(
        (candidate) =>
          candidate.city.trim().toLowerCase() === area.city.trim().toLowerCase() &&
          candidate.state.trim().toLowerCase() === area.state.trim().toLowerCase(),
      ) === index,
  );
  const headlineWords = homeCopy.headline.trim().split(/\s+/);
  const headlineSplitIndex = Math.ceil(headlineWords.length / 2);
  const headlineLead = headlineWords.slice(0, headlineSplitIndex).join(" ");
  const headlineEmphasis = headlineWords.slice(headlineSplitIndex).join(" ");
  const gallerySectionNumber = 4;
  const beforeAfterSectionNumber =
    gallerySectionNumber + Number(homeCopy.galleryEnabled);
  const cleaningOptionsSectionNumber =
    beforeAfterSectionNumber + Number(homeCopy.beforeAfterEnabled);
  const processSectionNumber = cleaningOptionsSectionNumber + 1;

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
          </div>
          <div className="crown-hero-visual">
            <Image
              src="https://static.vecteezy.com/system/resources/thumbnails/027/484/635/small_2x/man-cleaning-and-detailing-luxury-car-with-microfiber-cloth-car-wash-service-man-hand-holding-blue-microfiber-cloth-polish-red-car-after-cleaning-auto-care-service-business-concept-generative-ai-photo.jpg"
              alt="Licensed illustrative stock image of a person polishing a car; not a Crown Cleaning Solutions project"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <span className="crown-image-label">Illustrative stock image · not a Crown project</span>
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
                Explore Car Detailing, Carpet Cleaning, Upholstery Cleaning,
                Move-in / Move-out Cleaning, Residential Deep Cleaning, and
                Post-Construction Cleaning.
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

        <section className="crown-trust-strip crown-guarantee-strip" aria-label="100% Satisfaction Guarantee">
          <div className="crown-container crown-guarantee-content">
            <div className="crown-guarantee-seal" aria-hidden="true">100%</div>
            <div className="crown-guarantee-copy">
              <h2>100% Satisfaction Guarantee</h2>
              <p>
                At Crown Cleaning Solutions, your satisfaction comes first. If
                you’re unhappy with any part of your cleaning, contact us
                within 48 hours of your service and we’ll return to touch up
                the areas you’re dissatisfied with.
              </p>
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
              <p className="crown-eyebrow">02 / About Crown</p>
              <h2>Cleaning that starts<br /><span>with a conversation.</span></h2>
              <p>
                Crown Cleaning Solutions serves customers in Aurora and Denver,
                Colorado, with other areas considered after ZIP-code
                confirmation. The listed services include Car Detailing,
                Carpet Cleaning, Upholstery Cleaning, Move-in / Move-out
                Cleaning, Residential Deep Cleaning, and Post-Construction
                Cleaning.
              </p>
              <p>
                A team member can follow up to discuss your request, clarify
                the service scope, and confirm availability. An inquiry is not
                an appointment.
              </p>
              <Link className="crown-text-link" href="/about">
                Read more about us <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="crown-section crown-testimonials-section" id="testimonials">
          <div className="crown-container">
            <p className="crown-eyebrow">03 / Customer feedback</p>
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

        {homeCopy.galleryEnabled && galleryImages.length > 0 && <section className="crown-section crown-gallery-section" id="gallery">
          <div className="crown-container">
            <div className="crown-section-heading">
              <div>
                <p className="crown-eyebrow">{String(gallerySectionNumber).padStart(2, "0")} / Evidence of Craft</p>
                <h2>A closer look<br /><span>at clean spaces.</span></h2>
              </div>
              <p>
                These photos show Crown Cleaning Solutions projects and are
                shared with permission.
              </p>
            </div>
            <div className="crown-gallery-grid">
              {galleryImages.map((image) => (
                <figure className="crown-gallery-card" key={image.id}>
                  <div className="crown-gallery-image">
                    <Image src={getHomepageImageUrl(image.image_path)} alt={image.image_alt} fill sizes="(max-width: 760px) 100vw, 33vw" unoptimized />
                  </div>
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className="crown-gallery-note">
              Each image is an authentic project photo shared with permission.
            </p>
          </div>
        </section>}

        {homeCopy.beforeAfterEnabled && beforeAfterPairs.length > 0 && <section className="crown-section crown-before-after-section" id="before-after">
          <div className="crown-container">
            <div className="crown-section-heading">
              <div>
                <p className="crown-eyebrow">{String(beforeAfterSectionNumber).padStart(2, "0")} / Before &amp; after</p>
                <h2>Results You Can See</h2>
              </div>
            </div>
            <div className="crown-before-after-grid">
              {beforeAfterPairs.map((pair) => (
                <article className="crown-before-after-card" key={pair.id}>
                  <div className="crown-before-after-pair">
                    <div className="crown-before-after-slot crown-before-after-image">
                      <Image src={getHomepageImageUrl(pair.before_image_path)} alt={pair.before_image_alt} fill sizes="(max-width: 760px) 100vw, 17vw" unoptimized />
                      <span>Before</span>
                    </div>
                    <div className="crown-before-after-slot crown-before-after-image">
                      <Image src={getHomepageImageUrl(pair.after_image_path)} alt={pair.after_image_alt} fill sizes="(max-width: 760px) 100vw, 17vw" unoptimized />
                      <span>After</span>
                    </div>
                  </div>
                  <p className="crown-before-after-caption">{pair.caption}</p>
                </article>
              ))}
            </div>
          </div>
        </section>}

        <section className="crown-section crown-standard-section" id="cleaning-options">
          <div className="crown-container">
            <div className="crown-section-heading crown-standard-heading">
              <div>
                <p className="crown-eyebrow">{String(cleaningOptionsSectionNumber).padStart(2, "0")} / Light &amp; Deep Cleaning</p>
                <h2>Choose the clean<br /><span>that fits your routine.</span></h2>
              </div>
              <p>
                Two customizable cleaning options, with a clear checklist of
                what each includes.
              </p>
            </div>

            <div className="crown-standard-grid">
              <article className="crown-cleaning-option">
                <div className="crown-cleaning-option-header">
                  <span className="crown-cleaning-option-number">01</span>
                  <span className="crown-cleaning-option-label">Light Cleaning</span>
                </div>
                <h3>Made for regular upkeep</h3>
                <p>Recommended for recurring cleanings.</p>
                <span className="crown-cleaning-recommendation">Customizable to your needs</span>
              </article>
              <article className="crown-cleaning-option crown-cleaning-option-deep">
                <div className="crown-cleaning-option-header">
                  <span className="crown-cleaning-option-number">02</span>
                  <span className="crown-cleaning-option-label">Deep Cleaning</span>
                </div>
                <h3>A more detailed clean</h3>
                <p>Recommended for move-out services or when you want a more thorough clean.</p>
                <span className="crown-cleaning-recommendation">Includes the Light Cleaning tasks plus additional detail.</span>
              </article>
            </div>
            <div className="crown-cleaning-more">
              <Link className="crown-button crown-button-primary" href="/light-and-deep-cleaning">
                Read more <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="crown-section crown-process-section" id="protocol">
          <div className="crown-container">
            <p className="crown-eyebrow">{String(processSectionNumber).padStart(2, "0")} / How It Works</p>
            <h2>From first inquiry<br /><span>to confirmed service.</span></h2>
            <div className="crown-process-grid">
              <article tabIndex={0}>
                <span>01</span>
                <h3>Send an inquiry</h3>
                <p>Share the cleaning service you are interested in and your location so the team can review your request.</p>
                <span className="crown-process-arrow" aria-hidden="true">→</span>
              </article>
              <article tabIndex={0}>
                <span>02</span>
                <h3>Request review</h3>
                <p>The team reviews the information you provide and considers the service you are asking about.</p>
                <span className="crown-process-arrow" aria-hidden="true">→</span>
              </article>
              <article tabIndex={0}>
                <span>03</span>
                <h3>Discuss your needs</h3>
                <p>A team member follows up with you to discuss your request and any details that need clarification.</p>
                <span className="crown-process-arrow" aria-hidden="true">→</span>
              </article>
              <article tabIndex={0}>
                <span>04</span>
                <h3>Confirm service</h3>
                <p>The business confirms service and availability with you. Submitting an inquiry is not an appointment.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="crown-section crown-coverage-section" id="coverage">
          <div className="crown-container crown-coverage-grid">
            <div>
              <p className="crown-eyebrow">{String(processSectionNumber + 1).padStart(2, "0")} / Service area</p>
              <h2>Serving Aurora,<br /><span>Denver, and more.</span></h2>
              <p>
                We serve Aurora and Denver, Colorado, and may serve more areas.
                Please share your ZIP code so we can confirm whether your
                location is within our service area.
              </p>
            </div>
            <div className="crown-city-list" aria-label="Service areas listed by Crown">
              {serviceLocations.map((area) => (
                <span key={`${area.city}-${area.state}`}>
                  {area.city}, {area.state}
                </span>
              ))}
              <p>ZIP code confirmation required</p>
            </div>
          </div>
        </section>

        <section className="crown-section crown-quote-section" id="quote">
          <div className="crown-container crown-quote-grid">
            <div>
              <p className="crown-eyebrow">{String(processSectionNumber + 2).padStart(2, "0")} / Request an estimate</p>
              <h2>Tell us about<br /><span>your space.</span></h2>
              <p>
                Share a few details and a ZIP code. The team will follow up to
                discuss your needs and confirm service availability.
              </p>
              <p className="crown-request-note">
                An inquiry is not a confirmed appointment.
              </p>
              <dl className="crown-contact-details">
                {contact.email && (
                  <div>
                    <dt>Email</dt>
                    <dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
                  </div>
                )}
                {contact.phone && (
                  <div>
                    <dt>Phone</dt>
                    <dd>
                      <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
                        {contact.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {contact.alternatePhone && (
                  <div>
                    <dt>Additional phone</dt>
                    <dd>
                      <a href={`tel:${contact.alternatePhone.replace(/[^\d+]/g, "")}`}>
                        {contact.alternatePhone}
                      </a>
                    </dd>
                  </div>
                )}
                {contact.businessHours && (
                  <div>
                    <dt>Business hours</dt>
                    <dd>{contact.businessHours}</dd>
                  </div>
                )}
                <div>
                  <dt>Service area</dt>
                  <dd>Aurora, Denver, and more areas may be available. ZIP-code confirmation required.</dd>
                </div>
              </dl>
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
