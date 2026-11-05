import Image from "next/image";
import Link from "next/link";
import apartmentImageOne from "../../img/a1.jpg";
import apartmentImageTwo from "../../img/a2.jpg";
import apartmentImageThree from "../../img/a3.jpg";
import residentialImageOne from "../../img/r1.jpg";
import residentialImageTwo from "../../img/r2.png";
import residentialImageThree from "../../img/r3.jpg";
import InquiryForm from "@/components/inquiry-form";
import type { ActiveServiceArea } from "@/lib/site-content";
import { getStockServiceImageUrl, type PublishedService } from "@/lib/services";

const residentialServices = [
  {
    title: "Light Cleaning",
    image: residentialImageOne,
    alt: "A cleaner wiping a bathroom faucet with a cloth",
    description:
      "When your home needs a lighter refresh, this option can help with everyday upkeep. A typical light clean includes sweeping and mopping, dusting, and cleaning bathrooms, the kitchen, and more. It can be a good fit for homes that receive recurring service.",
  },
  {
    title: "Deep Cleaning",
    image: residentialImageTwo,
    alt: "A bright living room with a sofa and large windows",
    description:
      "For a more thorough clean, deep cleaning covers the areas in a light clean, with added attention to baseboards, windows and window sills, and the interiors of appliances.",
  },
  {
    title: "Move-In / Move-Out Cleaning",
    image: residentialImageThree,
    alt: "A cleaner wiping a window",
    description:
      "Moving can be stressful, so Crown offers cleaning for both move-ins and move-outs. From sweeping and mopping to wiping the inside of cabinets and appliances, the service helps prepare a home for its next chapter.",
  },
];

const apartmentServices = [
  {
    title: "Professional Cleaning for Apartments",
    image: apartmentImageOne,
    alt: "A flat mop cleaning an apartment floor",
    description:
      "Apartment living has plenty of conveniences, but keeping everything clean can be difficult when life is busy. Crown’s apartment cleaning is designed to help you enjoy a spotless living space without the hassle.",
  },
  {
    title: "Condo Cleaning",
    image: apartmentImageTwo,
    alt: "Cleaning team members working together",
    description:
      "Condos can have distinct layouts and shared spaces that call for specialized cleaning. Crown’s condo-cleaning approach considers the needs of your home, including both the interior of your unit and common areas.",
  },
  {
    title: "Other Apartment Cleaning Services",
    image: apartmentImageThree,
    alt: "A cleaner vacuuming a living room",
    description:
      "Crown takes pride in offering exceptional cleaning services for other residential properties. The goal is to make your apartment a place you enjoy coming home to, with flexible scheduling to fit a busy lifestyle. Compare the home-cleaning options above to explore the types of cleaning available.",
  },
];

function ImageCard({
  title,
  image,
  alt,
  description,
  index,
}: {
  title: string;
  image: (typeof residentialServices)[number]["image"];
  alt: string;
  description: string;
  index: number;
}) {
  return (
    <article className="crown-residential-card">
      <div className="crown-residential-card-image">
        <Image src={image} alt={alt} fill sizes="(max-width: 760px) 100vw, 33vw" />
        <span className="crown-image-label">
          Illustrative image · not Crown project work
        </span>
      </div>
      <div className="crown-residential-card-copy">
        <span className="crown-residential-card-number">
          {String(index).padStart(2, "0")}
        </span>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link
          href="#estimate"
          aria-label={`Request an estimate for ${title}`}
          className="crown-residential-card-link"
        >
          Discuss this service <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

function ServiceArea({
  areas,
}: {
  areas: ActiveServiceArea[];
}) {
  const additionalAreas = areas.filter((area) => {
    const city = area.city.trim().toLowerCase();
    const state = area.state.trim().toLowerCase();
    return !(
      ["aurora", "denver"].includes(city) &&
      ["co", "colorado"].includes(state)
    );
  });

  return (
    <section className="crown-section crown-residential-coverage" id="service-area">
      <div className="crown-container crown-residential-coverage-grid">
        <div>
          <p className="crown-eyebrow">Service area</p>
          <h2>
            A clean home,
            <br />
            <span>closer to you.</span>
          </h2>
          <p>
            Crown Cleaning Solutions serves Aurora and Denver, Colorado.
            Share your ZIP code with the team to confirm whether your location
            is within the service area.
          </p>
        </div>
        <div className="crown-residential-area-card">
          <span className="crown-residential-area-label">Currently listed</span>
          <ul>
            <li>Aurora, Colorado</li>
            <li>Denver, Colorado</li>
            {additionalAreas.map((area) => (
              <li key={area.id}>
                <span>{area.city}, {area.state}</span>
                {area.map_url && (
                  <a href={area.map_url} target="_blank" rel="noreferrer">
                    View map <span aria-hidden="true">↗</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p>ZIP-code confirmation required</p>
          <Link className="crown-button crown-button-secondary" href="/contact">
            Ask about your location <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ResidentialDeepCleaningPage({
  services,
  serviceAreas,
}: {
  services: PublishedService[];
  serviceAreas: ActiveServiceArea[];
}) {
  return (
    <main id="main">
      <section className="crown-residential-hero">
        <Image
          className="crown-residential-hero-image"
          src={getStockServiceImageUrl("residential_deep", 1800)}
          alt="Illustrative stock image of a clean home; not Crown project work"
          fill
          preload
          sizes="100vw"
        />
        <div className="crown-residential-hero-overlay" />
        <div className="crown-container crown-residential-hero-grid">
          <div className="crown-residential-hero-copy">
            <p className="crown-eyebrow">Residential cleaning</p>
            <h1>
              Residential Deep Cleaning
              <span>Aurora &amp; Denver, Colorado</span>
            </h1>
            <p>
              A busy schedule can make it hard to keep up with cleaning. Crown
              is a phone call away, and our experienced cleaners can handle the
              work while you relax or get on with your day. With an affordable
              price, keeping your home looking spotless can feel easier. Request
              a free estimate to discuss the costs for your space, then explore
              the options below to see what a typical visit may include.
            </p>
            <div className="crown-residential-hero-actions">
              <Link className="crown-button crown-button-primary" href="#residential-services">
                Explore cleaning options <span aria-hidden="true">↓</span>
              </Link>
              <Link className="crown-button crown-button-secondary" href="#how-it-works">
                How it works
              </Link>
            </div>
            <span className="crown-residential-photo-note">
              Illustrative stock image · not Crown project work
            </span>
          </div>
          <div className="crown-residential-hero-form" id="estimate">
            <InquiryForm services={services} />
          </div>
        </div>
      </section>

      <section className="crown-section crown-residential-services" id="residential-services">
        <div className="crown-container">
          <div className="crown-section-heading">
            <div>
              <p className="crown-eyebrow">Find the right fit</p>
              <h2>
                Our Residential
                <br />
                <span>Cleaning Services</span>
              </h2>
            </div>
            <p>
              From a lighter recurring clean to a more detailed deep clean or
              help around a move, explore the options and discuss what your home
              needs with Crown.
            </p>
          </div>
          <div className="crown-residential-card-grid">
            {residentialServices.map((service, index) => (
              <ImageCard key={service.title} {...service} index={index + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="crown-section crown-residential-apartments" id="apartment-cleaning">
        <div className="crown-container">
          <div className="crown-section-heading">
            <div>
              <p className="crown-eyebrow">Homes of different sizes</p>
              <h2>
                Apartment Cleaning
                <br />
                <span>Services in Colorado</span>
              </h2>
            </div>
            <p>
              Apartment and condo cleaning can be shaped around the layout of
              your home, shared spaces, and day-to-day routine.
            </p>
          </div>
          <div className="crown-residential-card-grid">
            {apartmentServices.map((service, index) => (
              <ImageCard key={service.title} {...service} index={index + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="crown-section crown-residential-process" id="how-it-works">
        <div className="crown-container">
          <div className="crown-section-heading">
            <div>
              <p className="crown-eyebrow">Simple next steps</p>
              <h2>
                How It
                <br />
                <span>Works</span>
              </h2>
            </div>
            <p>
              Start with a conversation about your home. Crown will follow up
              with you to discuss the request and service availability.
            </p>
          </div>
          <div className="crown-residential-process-grid">
            <article className="crown-residential-step crown-residential-quote-step">
              <span className="crown-residential-step-number">01</span>
              <h3>Get Your Free Quote</h3>
              <p>
                Complete the estimate request with your contact details and
                what you need cleaned. Those details help the team prepare an
                accurate estimate. Crown will review your request and follow
                up by email. Include your ZIP code so the team can confirm
                coverage. A request is not a confirmed appointment.
              </p>
            </article>
            <article className="crown-residential-step crown-residential-schedule-step">
              <span className="crown-residential-step-number">02</span>
              <h3>Arrange a Time</h3>
              <p>
                Contact Crown by phone or email to talk about scheduling. The
                friendly, responsive team can guide you through the next steps
                and help make the process straightforward.
              </p>
            </article>
            <article className="crown-residential-step crown-residential-relax-step">
              <span className="crown-residential-step-number">03</span>
              <h3>Relax</h3>
              <p>
                Let the experienced cleaning team take care of the work while
                you run errands or take a break. Crown works toward exceptional
                results, helping you enjoy a clean and comfortable home without
                the stress of doing it all yourself.
              </p>
              <p>
                Crown serves houses, apartments, and condos. Ask about the
                costs for your needs so you can plan. Whether you are looking
                for regular upkeep, deep cleaning, or move-in / move-out
                cleaning, the team can discuss your next cleaning session with
                you.
              </p>
              <div className="crown-residential-guide" id="clutter-support">
                <h4>Thinking about hoarding cleanup?</h4>
                <p>
                  If clutter feels overwhelming, Crown’s guide to recognizing
                  when hoarding-cleanup support may be needed can help you
                  consider possible next steps.
                </p>
                <Link href="/contact">
                  Contact Crown <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <ServiceArea areas={serviceAreas} />
    </main>
  );
}
