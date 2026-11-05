import type { Metadata } from "next";
import Link from "next/link";
import SignOutButton from "@/app/admin/sign-out-button";
import { signOutStaff } from "@/app/admin/actions";
import {
  ContactSettingsForm,
  FaqNodeForm,
  HomepageBeforeAfterPairForm,
  HomepageGalleryImageForm,
  HomeCopySettingsForm,
  NewFaqNodeForm,
  ServiceAreaForm,
  ServiceForm,
} from "@/app/admin/content/cms-forms";
import { getPublicContactDetails, getPublicHomeCopy } from "@/lib/site-content";
import { getHomepageImageUrl } from "@/lib/homepage-media";
import { requireContentStaff } from "@/lib/staff-auth";

export const metadata: Metadata = {
  title: "Site content | Crown Cleaning Solutions",
  robots: { index: false, follow: false },
};

export default async function ContentManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string | string[] }>;
}) {
  const params = await searchParams;
  const notice = Array.isArray(params.notice) ? "" : params.notice;
  const deletionNotice =
    notice === "service-deleted"
      ? {
          message:
            "Service permanently deleted. Existing inquiries retain their saved service name, but are no longer linked to this service.",
          warning: false,
        }
      : notice === "service-image-cleanup"
        ? {
            message:
              "Service deleted, but its image could not be removed. Ask the administrator to clean it up in Supabase Storage.",
            warning: true,
          }
        : null;

  const { supabase, user, role } = await requireContentStaff();
  const [
    { data: services, error: serviceError },
    { data: areas, error: areaError },
    { data: faqNodes, error: faqNodeError },
    { data: faqOptions, error: faqOptionError },
    { data: galleryImages, error: galleryError },
    { data: beforeAfterPairs, error: beforeAfterError },
    contact,
    homeCopy,
  ] = await Promise.all([
    supabase
      .from("services")
      .select("id, slug, category, title, summary, description, inclusions, exclusions, image_path, image_alt, sort_order, status, created_at, updated_at")
      .order("sort_order")
      .order("title"),
    supabase.from("service_areas").select("*").order("sort_order").order("city"),
    supabase.from("faq_nodes").select("*").order("sort_order").order("slug"),
    supabase.from("faq_options").select("*").order("sort_order"),
    supabase.from("homepage_gallery_images").select("*").order("sort_order").order("created_at"),
    supabase.from("homepage_before_after_pairs").select("*").order("sort_order").order("created_at"),
    getPublicContactDetails(),
    getPublicHomeCopy(),
  ]);

  if (serviceError) throw new Error("Unable to load editable services.", { cause: serviceError });
  if (areaError) throw new Error("Unable to load editable service areas.", { cause: areaError });
  if (faqNodeError) throw new Error("Unable to load FAQ questions.", { cause: faqNodeError });
  if (faqOptionError) throw new Error("Unable to load FAQ choices.", { cause: faqOptionError });
  if (galleryError) throw new Error("Unable to load homepage gallery images.", { cause: galleryError });
  if (beforeAfterError) throw new Error("Unable to load homepage before-and-after photos.", { cause: beforeAfterError });

  return (
    <main id="main" className="admin-page">
      <header className="admin-header">
        <Link className="brand" href="/">
          Crown Cleaning Solutions <span className="brand-light">staff</span>
        </Link>
        <div className="admin-user">
          <span>{user.email} · {role.replace("_", " ")}</span>
          {role !== "content_editor" && <Link className="button button-small button-outline" href="/admin">Inquiries</Link>}
          <SignOutButton action={signOutStaff} />
        </div>
      </header>
      <section className="admin-content cms-page">
        <div className="admin-title-row">
          <div>
            <div className="eyebrow">Staff workspace</div>
            <h1>Site content</h1>
            <p>Changes to published content appear on the public website. Only publish business-approved information.</p>
          </div>
          <Link className="button button-small button-outline" href="/" target="_blank">View website ↗</Link>
        </div>
        {deletionNotice && (
          <p
            className={`cms-action-notice${deletionNotice.warning ? " cms-action-notice-warning" : ""}`}
            role={deletionNotice.warning ? "alert" : "status"}
          >
            {deletionNotice.message}
          </p>
        )}

        <section className="cms-section" id="services">
          <div className="cms-section-heading">
            <div><span className="eyebrow">Public service pages</span><h2>Services</h2></div>
            <p>The six company-provided service categories are available below. Draft services stay private; publishing makes service details visible on the site.</p>
          </div>
          <div className="cms-grid">
            {services.map((service) => (
              <article className="cms-card" key={service.id}>
                <div className="cms-card-heading">
                  <h3>{service.title}</h3>
                  <span className={`status-pill status-${service.status}`}>{service.status}</span>
                </div>
                <ServiceForm service={service} isAdmin={role === "admin"} />
              </article>
            ))}
            <article className="cms-card">
              <div className="cms-card-heading"><h3>Add a service</h3><span className="status-pill">draft by default</span></div>
              <ServiceForm service={null} isAdmin={role === "admin"} />
            </article>
          </div>
        </section>

        <section className="cms-section" id="homepage">
          <div className="cms-section-heading">
            <div><span className="eyebrow">Homepage</span><h2>Homepage settings</h2></div>
            <p>Edit hero copy and control whether the project gallery sections are shown publicly.</p>
          </div>
          <article className="cms-card cms-narrow">
            <HomeCopySettingsForm {...homeCopy} />
          </article>
        </section>

        <section className="cms-section" id="contact">
          <div className="cms-section-heading">
            <div><span className="eyebrow">Public details</span><h2>Contact information</h2></div>
            <p>Only provide contact details approved by the business.</p>
          </div>
          <article className="cms-card cms-narrow">
            <ContactSettingsForm
              email={contact.email ?? ""}
              phone={contact.phone ?? ""}
              alternatePhone={contact.alternatePhone ?? ""}
              businessHours={contact.businessHours ?? ""}
            />
          </article>
        </section>

        <section className="cms-section" id="homepage-gallery">
          <div className="cms-section-heading">
            <div><span className="eyebrow">Homepage project photos</span><h2>Evidence of Craft gallery</h2></div>
            <p>Add, replace, caption, reorder, or remove approved Crown project photos. Uploaded files are publicly readable even while this section is hidden; enable it in Homepage settings after adding images.</p>
          </div>
          <div className="cms-grid">
            {galleryImages.map((image) => (
              <article className="cms-card" key={image.id}>
                <div className="cms-card-heading"><h3>{image.caption}</h3><span className="status-pill status-published">public when section is on</span></div>
                <HomepageGalleryImageForm image={image} imageUrl={getHomepageImageUrl(image.image_path)} />
              </article>
            ))}
            <article className="cms-card">
              <div className="cms-card-heading"><h3>Add a gallery photo</h3><span className="status-pill status-closed">hidden until section is on</span></div>
              <HomepageGalleryImageForm image={null} />
            </article>
          </div>
        </section>

        <section className="cms-section" id="homepage-before-after">
          <div className="cms-section-heading">
            <div><span className="eyebrow">Homepage project photos</span><h2>Before &amp; after pairs</h2></div>
            <p>Upload authentic before-and-after photos as a pair, with descriptive alt text and a caption. Files are publicly readable even while this section is hidden; enable it in Homepage settings when ready.</p>
          </div>
          <div className="cms-grid">
            {beforeAfterPairs.map((pair) => (
              <article className="cms-card" key={pair.id}>
                <div className="cms-card-heading"><h3>{pair.caption}</h3><span className="status-pill status-published">public when section is on</span></div>
                <HomepageBeforeAfterPairForm
                  pair={pair}
                  beforeImageUrl={getHomepageImageUrl(pair.before_image_path)}
                  afterImageUrl={getHomepageImageUrl(pair.after_image_path)}
                />
              </article>
            ))}
            <article className="cms-card">
              <div className="cms-card-heading"><h3>Add a before-and-after pair</h3><span className="status-pill status-closed">hidden until section is on</span></div>
              <HomepageBeforeAfterPairForm pair={null} />
            </article>
          </div>
        </section>

        <section className="cms-section" id="service-areas">
          <div className="cms-section-heading">
            <div><span className="eyebrow">Coverage</span><h2>Service areas</h2></div>
            <p>Enable an area only after the business confirms it is served.</p>
          </div>
          <div className="cms-grid">
            {areas.map((area) => (
              <article className="cms-card" key={area.id}>
                <div className="cms-card-heading">
                  <h3>{area.city}, {area.state}</h3>
                  <span className={`status-pill${area.is_active ? "" : " status-closed"}`}>{area.is_active ? "active" : "hidden"}</span>
                </div>
                <ServiceAreaForm area={area} />
              </article>
            ))}
            <article className="cms-card">
              <div className="cms-card-heading"><h3>Add an area</h3><span className="status-pill status-closed">hidden by default</span></div>
              <ServiceAreaForm area={null} />
            </article>
          </div>
        </section>

        <section className="cms-section" id="faq">
          <div className="cms-section-heading">
            <div><span className="eyebrow">Guided answers</span><h2>FAQ decision tree</h2></div>
            <p>Predefined buttons only; no AI. Publish the root and all connected questions before they appear to visitors.</p>
          </div>
          <article className="cms-card cms-narrow">
            <div className="cms-card-heading"><h3>Add a question</h3><span className="status-pill status-closed">draft by default</span></div>
            <NewFaqNodeForm />
          </article>
          {faqNodes.length === 0 && (
            <p className="admin-empty">
              No FAQ questions have been added to Supabase yet. The existing
              demo FAQ remains visible to visitors until a complete published
              decision tree replaces it.
            </p>
          )}
          {faqNodes.map((node) => (
            <article className="cms-card cms-faq-card" key={node.id}>
              <div className="cms-card-heading">
                <h3>{node.prompt}</h3>
                <span className={`status-pill status-${node.status}`}>{node.is_root ? "root · " : ""}{node.status}</span>
              </div>
              <FaqNodeForm
                node={node}
                nodes={faqNodes}
                options={faqOptions.filter((option) => option.node_id === node.id)}
                isAdmin={role === "admin"}
              />
            </article>
          ))}
        </section>

        <section className="cms-section cms-operational-note">
          <div className="cms-section-heading">
            <div><span className="eyebrow">Operations</span><h2>Backups and recovery</h2></div>
          </div>
          <article className="cms-card cms-narrow">
            <p>Backup schedules and recovery guarantees depend on the current Supabase project plan and owner configuration. Confirm these in the Supabase dashboard; this app does not independently create or verify backups.</p>
          </article>
        </section>
      </section>
    </main>
  );
}
