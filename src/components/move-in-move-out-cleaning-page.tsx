import Image from "next/image";
import Link from "next/link";
import InquiryForm from "@/components/inquiry-form";
import type { PublishedService } from "@/lib/services";
import { getStockServiceImageUrl } from "@/lib/services";

export default function MoveInMoveOutCleaningPage({
  services,
  service,
}: {
  services: PublishedService[];
  service: PublishedService;
}) {
  return (
    <main id="main">
      <section className="crown-move-hero">
        <Image
          className="crown-move-hero-image"
          src={getStockServiceImageUrl(service.category, 1800)}
          alt="Illustrative stock image of a home interior; not Crown project work"
          fill
          preload
          sizes="100vw"
        />
        <div className="crown-move-hero-overlay" />
        <div className="crown-container crown-move-hero-grid">
          <div className="crown-move-hero-form" id="estimate">
            <InquiryForm
              key={service.id}
              services={services}
              defaultServiceId={service.id}
            />
          </div>
          <div className="crown-move-hero-copy">
            <p className="crown-eyebrow">A fresh start for your next chapter</p>
            <h1>
              Move-In / Move-Out
              <span>Cleaning Services</span>
              <small>Aurora &amp; Denver, Colorado</small>
            </h1>
            <p>
              Moving can be stressful enough. Let Crown take care of the
              cleaning while you focus on the transition. We offer cleaning
              for both move-ins and move-outs, with tasks from sweeping and
              mopping to wiping inside cabinets and appliances.
            </p>
            <Link className="crown-button crown-button-primary" href="#estimate">
              Request a free estimate <span aria-hidden="true">↗</span>
            </Link>
            <span className="crown-move-photo-note">
              Illustrative stock image · not Crown project work
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
