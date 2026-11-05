"use client";

import Image from "next/image";
import { useActionState } from "react";
import type { Database } from "@/lib/supabase/database.types";
import {
  legacyServiceCategoryValues,
  serviceCategoryOptions,
} from "@/lib/service-categories";
import {
  deleteService,
  deleteFaqOption,
  deleteHomepageBeforeAfterPair,
  deleteHomepageGalleryImage,
  saveContactSettings,
  saveFaqNode,
  saveFaqOption,
  saveHomepageBeforeAfterPair,
  saveHomepageGalleryImage,
  saveHomeCopy,
  saveService,
  saveServiceArea,
  uploadServiceImage,
  type ContentActionState,
} from "@/app/admin/content/actions";

const emptyState: ContentActionState = {};
type ServiceRow = Omit<Database["public"]["Tables"]["services"]["Row"], "pricing_display">;
type AreaRow = Database["public"]["Tables"]["service_areas"]["Row"];
type FaqNodeRow = Database["public"]["Tables"]["faq_nodes"]["Row"];
type FaqOptionRow = Database["public"]["Tables"]["faq_options"]["Row"];
type GalleryImageRow = Database["public"]["Tables"]["homepage_gallery_images"]["Row"];
type BeforeAfterPairRow = Database["public"]["Tables"]["homepage_before_after_pairs"]["Row"];
const legacyServiceCategorySet: ReadonlySet<string> = new Set(legacyServiceCategoryValues);

function Result({ state }: { state: ContentActionState }) {
  if (!state.message) return null;
  return (
    <p className={`form-status${state.success ? "" : " form-error"}`} role={state.success ? "status" : "alert"}>
      {state.message}
    </p>
  );
}

function ServiceEditor({
  service,
  isAdmin,
}: {
  service: ServiceRow | null;
  isAdmin: boolean;
}) {
  const [state, action, pending] = useActionState(saveService, emptyState);
  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteService,
    emptyState,
  );
  return (
    <div className="cms-editor">
    <form className="cms-form" action={action}>
      <input type="hidden" name="id" value={service?.id ?? ""} />
      <div className="form-row">
        <label>Title<input name="title" required maxLength={120} defaultValue={service?.title ?? ""} /></label>
        <label>URL slug<input name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={100} defaultValue={service?.slug ?? ""} /></label>
      </div>
      <div className="form-row">
        <label>Category<select name="category" defaultValue={service?.category ?? "car_detailing"}>
          {service && legacyServiceCategorySet.has(service.category) && (
            <optgroup label="Archived legacy service">
              <option value={service.category}>Legacy category ({service.category})</option>
            </optgroup>
          )}
          <optgroup label="Company-provided service list">
            {serviceCategoryOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
          </optgroup>
        </select></label>
        <label>Publication status<select name="status" defaultValue={service?.status ?? "draft"}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
      </div>
      <label>Display order<input type="number" name="sort_order" min={0} max={10000} defaultValue={service?.sort_order ?? 0} /></label>
      <label>Short summary<textarea name="summary" required rows={2} maxLength={300} defaultValue={service?.summary ?? ""} /></label>
      <label>Description<textarea name="description" required rows={5} maxLength={10000} defaultValue={service?.description ?? ""} /></label>
      <div className="form-row">
        <label>Inclusions <span className="optional">(one per line)</span><textarea name="inclusions" rows={4} maxLength={4000} defaultValue={stringList(service?.inclusions)} /></label>
        <label>Exclusions <span className="optional">(one per line)</span><textarea name="exclusions" rows={4} maxLength={4000} defaultValue={stringList(service?.exclusions)} /></label>
      </div>
      <Result state={state} />
      <button className="button button-dark" disabled={pending}>{pending ? "Saving…" : service ? "Save service" : "Add service"}</button>
    </form>
    {service && isAdmin && (
      <form
        className="cms-delete-service"
        action={deleteAction}
        onSubmit={(event) => {
          const confirmed = window.confirm(
            `Permanently delete "${service.title}" (${service.slug})? This cannot be undone. Existing inquiry records remain, but their live service link will be cleared. The service URL will no longer exist.`,
          );
          if (!confirmed) event.preventDefault();
        }}
      >
        <input type="hidden" name="service_id" value={service.id} />
        <button className="cms-delete-button" type="submit" disabled={deletePending}>
          {deletePending ? "Deleting…" : "Permanently delete service"}
        </button>
        <Result state={deleteState} />
      </form>
    )}
    </div>
  );
}

function stringList(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").join("\n") : "";
}

function ServiceImageForm({ service }: { service: ServiceRow }) {
  const [state, action, pending] = useActionState(uploadServiceImage, emptyState);
  return (
    <form className="cms-form cms-image-form" action={action}>
      <input type="hidden" name="service_id" value={service.id} />
      <h4>Service image</h4>
      {service.image_path && <p>Current image is set. Uploading a replacement removes the previous file.</p>}
      <label>Image file<input type="file" name="image" accept="image/jpeg,image/png,image/webp,image/avif" required /></label>
      <label>Descriptive alt text<input name="image_alt" required maxLength={300} defaultValue={service.image_alt ?? ""} /></label>
      <p className="cms-help">JPEG, PNG, WebP, or AVIF; maximum 5 MB. These files are publicly readable; upload only photos approved for public use and remove location metadata first.</p>
      <Result state={state} />
      <button className="button button-small button-outline" disabled={pending}>{pending ? "Uploading…" : "Upload image"}</button>
    </form>
  );
}

function GalleryImageForm({
  image,
  imageUrl,
}: {
  image: GalleryImageRow | null;
  imageUrl?: string;
}) {
  const [state, action, pending] = useActionState(saveHomepageGalleryImage, emptyState);
  const [deleteState, deleteAction, deletePending] = useActionState(deleteHomepageGalleryImage, emptyState);

  return (
    <div className="cms-project-photo-editor">
      {imageUrl && (
        <Image
          className="cms-project-photo-preview"
          src={imageUrl}
          alt={image?.image_alt ?? ""}
          width={480}
          height={320}
          unoptimized
        />
      )}
      <form className="cms-form" action={action}>
        <input type="hidden" name="id" value={image?.id ?? ""} />
        <label>Image file<input type="file" name="image" accept="image/jpeg,image/png,image/webp,image/avif" required={!image} /></label>
        <label>Descriptive alt text<input name="image_alt" required maxLength={300} defaultValue={image?.image_alt ?? ""} /></label>
        <label>Caption<input name="caption" required maxLength={160} defaultValue={image?.caption ?? ""} /></label>
        <label>Display order<input type="number" name="sort_order" min={0} max={10000} defaultValue={image?.sort_order ?? 0} /></label>
        <p className="cms-help">JPEG, PNG, WebP, or AVIF; maximum 5 MB. These files are publicly readable even while the section is hidden. Upload only genuine Crown project photos approved for public use; remove location metadata and avoid faces, addresses, or private belongings.</p>
        <Result state={state} />
        <button className="button button-small button-outline" disabled={pending}>{pending ? "Saving…" : image ? "Save gallery image" : "Add gallery image"}</button>
      </form>
      {image && (
        <form action={deleteAction} onSubmit={(event) => {
          if (!window.confirm(`Delete the gallery image "${image.caption}"?`)) event.preventDefault();
        }}>
          <input type="hidden" name="id" value={image.id} />
          <button className="cms-delete-button" type="submit" disabled={deletePending}>{deletePending ? "Deleting…" : "Delete image"}</button>
          <Result state={deleteState} />
        </form>
      )}
    </div>
  );
}

function BeforeAfterPairForm({
  pair,
  beforeImageUrl,
  afterImageUrl,
}: {
  pair: BeforeAfterPairRow | null;
  beforeImageUrl?: string;
  afterImageUrl?: string;
}) {
  const [state, action, pending] = useActionState(saveHomepageBeforeAfterPair, emptyState);
  const [deleteState, deleteAction, deletePending] = useActionState(deleteHomepageBeforeAfterPair, emptyState);

  return (
    <div className="cms-project-photo-editor">
      <div className="cms-project-photo-pair">
        {beforeImageUrl && (
          <Image
            className="cms-project-photo-preview"
            src={beforeImageUrl}
            alt={pair?.before_image_alt ?? ""}
            width={480}
            height={320}
            unoptimized
          />
        )}
        {afterImageUrl && (
          <Image
            className="cms-project-photo-preview"
            src={afterImageUrl}
            alt={pair?.after_image_alt ?? ""}
            width={480}
            height={320}
            unoptimized
          />
        )}
      </div>
      <form className="cms-form" action={action}>
        <input type="hidden" name="id" value={pair?.id ?? ""} />
        <div className="form-row">
          <label>Before photo<input type="file" name="before_image" accept="image/jpeg,image/png,image/webp,image/avif" required={!pair} /></label>
          <label>After photo<input type="file" name="after_image" accept="image/jpeg,image/png,image/webp,image/avif" required={!pair} /></label>
        </div>
        <div className="form-row">
          <label>Before photo alt text<input name="before_image_alt" required maxLength={300} defaultValue={pair?.before_image_alt ?? ""} /></label>
          <label>After photo alt text<input name="after_image_alt" required maxLength={300} defaultValue={pair?.after_image_alt ?? ""} /></label>
        </div>
        <label>Caption<input name="caption" required maxLength={160} defaultValue={pair?.caption ?? ""} /></label>
        <label>Display order<input type="number" name="sort_order" min={0} max={10000} defaultValue={pair?.sort_order ?? 0} /></label>
        <p className="cms-help">JPEG, PNG, WebP, or AVIF; each file maximum 5 MB. These files are publicly readable even while the section is hidden. Upload only genuine Crown project photos approved for public use; remove location metadata and avoid faces, addresses, or private belongings.</p>
        <Result state={state} />
        <button className="button button-small button-outline" disabled={pending}>{pending ? "Saving…" : pair ? "Save photo pair" : "Add photo pair"}</button>
      </form>
      {pair && (
        <form action={deleteAction} onSubmit={(event) => {
          if (!window.confirm(`Delete the before-and-after pair "${pair.caption}"?`)) event.preventDefault();
        }}>
          <input type="hidden" name="id" value={pair.id} />
          <button className="cms-delete-button" type="submit" disabled={deletePending}>{deletePending ? "Deleting…" : "Delete pair"}</button>
          <Result state={deleteState} />
        </form>
      )}
    </div>
  );
}

function ContactForm({
  email,
  phone,
  alternatePhone,
  businessHours,
}: {
  email: string;
  phone: string;
  alternatePhone: string;
  businessHours: string;
}) {
  const [state, action, pending] = useActionState(saveContactSettings, emptyState);
  return (
    <form className="cms-form" action={action}>
      <p className="cms-help">Only publish business contact details that are approved for the public website.</p>
      <label>Public email<input type="email" name="email" maxLength={320} defaultValue={email} /></label>
      <label>Public phone<input type="tel" name="phone" maxLength={30} defaultValue={phone} /></label>
      <label>Additional phone<input type="tel" name="alternatePhone" maxLength={30} defaultValue={alternatePhone} /></label>
      <label>Business hours<input name="businessHours" maxLength={160} defaultValue={businessHours} /></label>
      <Result state={state} />
      <button className="button button-dark" disabled={pending}>{pending ? "Saving…" : "Save contact details"}</button>
    </form>
  );
}

function HomeCopyForm({
  eyebrow,
  headline,
  introduction,
  galleryEnabled,
  beforeAfterEnabled,
}: {
  eyebrow: string;
  headline: string;
  introduction: string;
  galleryEnabled: boolean;
  beforeAfterEnabled: boolean;
}) {
  const [state, action, pending] = useActionState(saveHomeCopy, emptyState);
  return (
    <form className="cms-form" action={action}>
      <p className="cms-help">Public homepage text. Do not add unapproved claims, prices, testimonials, or service promises.</p>
      <label>Small heading<input name="eyebrow" required maxLength={120} defaultValue={eyebrow} /></label>
      <label>Main headline<input name="headline" required maxLength={240} defaultValue={headline} /></label>
      <label>Introduction<textarea name="introduction" required rows={4} maxLength={600} defaultValue={introduction} /></label>
      <fieldset className="cms-fieldset">
        <legend>Optional homepage sections</legend>
        <p className="cms-help">Keep these sections hidden until approved Crown project photos are ready. You can enable them here later.</p>
        <label className="cms-checkbox"><input type="checkbox" name="gallery_enabled" defaultChecked={galleryEnabled} /> Show the Evidence of Craft gallery</label>
        <label className="cms-checkbox"><input type="checkbox" name="before_after_enabled" defaultChecked={beforeAfterEnabled} /> Show before-and-after photos</label>
      </fieldset>
      <Result state={state} />
      <button className="button button-dark" disabled={pending}>{pending ? "Saving…" : "Save homepage settings"}</button>
    </form>
  );
}

function AreaEditor({ area }: { area: AreaRow | null }) {
  const [state, action, pending] = useActionState(saveServiceArea, emptyState);
  return (
    <form className="cms-form cms-area-form" action={action}>
      <input type="hidden" name="id" value={area?.id ?? ""} />
      <div className="form-row">
        <label>City<input name="city" required maxLength={120} defaultValue={area?.city ?? ""} /></label>
        <label>State / region<input name="state" required maxLength={80} defaultValue={area?.state ?? ""} /></label>
      </div>
      <label>Postal codes <span className="optional">(comma-separated, optional)</span><input name="postal_codes" maxLength={2000} defaultValue={area?.postal_codes.join(", ") ?? ""} /></label>
      <label>Map link <span className="optional">(HTTPS only)</span><input type="url" name="map_url" defaultValue={area?.map_url ?? ""} /></label>
      <label className="cms-checkbox"><input type="checkbox" name="is_active" defaultChecked={area?.is_active ?? false} /> Publish this service area</label>
      <Result state={state} />
      <button className="button button-small button-outline" disabled={pending}>{pending ? "Saving…" : area ? "Save area" : "Add area"}</button>
    </form>
  );
}

function FaqNodeEditor({
  node,
  nodes,
  options,
  isAdmin,
}: {
  node: FaqNodeRow;
  nodes: FaqNodeRow[];
  options: FaqOptionRow[];
  isAdmin: boolean;
}) {
  const [nodeState, nodeAction, nodePending] = useActionState(saveFaqNode, emptyState);
  return (
    <article className="cms-faq-node">
      <form className="cms-form" action={nodeAction}>
        <input type="hidden" name="id" value={node.id} />
        <div className="form-row">
          <label>Node slug<input name="slug" required maxLength={100} defaultValue={node.slug} /></label>
          <label>Sort order<input type="number" name="sort_order" min={0} max={10000} defaultValue={node.sort_order} /></label>
        </div>
        <label>Visitor question<textarea name="prompt" required rows={2} maxLength={300} defaultValue={node.prompt} /></label>
        <div className="form-row">
          <label>Status<select name="status" defaultValue={node.status}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
          <label className="cms-checkbox"><input type="checkbox" name="is_root" defaultChecked={node.is_root} /> This is the FAQ start question</label>
        </div>
        <Result state={nodeState} />
        <button className="button button-small button-outline" disabled={nodePending}>{nodePending ? "Saving…" : "Save question"}</button>
      </form>
      <div className="cms-options">
        <h4>Choices and answers</h4>
        {options.map((option) => (
          <FaqOptionEditor key={option.id} option={option} nodeId={node.id} nodes={nodes} isAdmin={isAdmin} />
        ))}
        <FaqOptionEditor nodeId={node.id} nodes={nodes} isAdmin={isAdmin} />
      </div>
    </article>
  );
}

function FaqOptionEditor({
  option,
  nodeId,
  nodes,
  isAdmin,
}: {
  option?: FaqOptionRow;
  nodeId: string;
  nodes: FaqNodeRow[];
  isAdmin: boolean;
}) {
  const [state, action, pending] = useActionState(saveFaqOption, emptyState);
  const destination = option?.next_node_id
    ? `node:${option.next_node_id}`
    : option?.action ?? "quote";
  return (
    <div className="cms-faq-option">
      <form className="cms-form" action={action}>
        <input type="hidden" name="id" value={option?.id ?? ""} />
        <input type="hidden" name="node_id" value={nodeId} />
        <label>Button label<input name="label" required maxLength={160} defaultValue={option?.label ?? ""} /></label>
        <label>Predefined answer<textarea name="answer" required rows={3} maxLength={4000} defaultValue={option?.answer ?? ""} /></label>
        <div className="form-row">
          <label>After this answer<select name="destination" defaultValue={destination}>
            <optgroup label="Go to another question">{nodes.filter((node) => node.id !== nodeId).map((node) => <option key={node.id} value={`node:${node.id}`}>{node.prompt}</option>)}</optgroup>
            <optgroup label="Finish or open a page"><option value="quote">Go to estimate request</option><option value="contact">Open contact page</option><option value="end">End conversation</option></optgroup>
          </select></label>
          <label>Sort order<input type="number" name="sort_order" min={0} max={10000} defaultValue={option?.sort_order ?? 0} /></label>
        </div>
        <Result state={state} />
        <button className="button button-small button-outline" disabled={pending}>{pending ? "Saving…" : option ? "Save choice" : "Add choice"}</button>
      </form>
      {option && isAdmin && (
        <form action={deleteFaqOption} onSubmit={(event) => {
          if (!window.confirm("Delete this FAQ choice?")) event.preventDefault();
        }}>
          <input type="hidden" name="id" value={option.id} />
          <button className="cms-delete-button" type="submit">Delete choice</button>
        </form>
      )}
    </div>
  );
}

export function ServiceForm({
  service,
  isAdmin,
}: {
  service: ServiceRow | null;
  isAdmin: boolean;
}) {
  return (
    <div className="cms-editor">
      <ServiceEditor service={service} isAdmin={isAdmin} />
      {service && <ServiceImageForm service={service} />}
    </div>
  );
}

export function ContactSettingsForm(props: {
  email: string;
  phone: string;
  alternatePhone: string;
  businessHours: string;
}) {
  return <ContactForm {...props} />;
}

export function HomeCopySettingsForm(props: {
  eyebrow: string;
  headline: string;
  introduction: string;
  galleryEnabled: boolean;
  beforeAfterEnabled: boolean;
}) {
  return <HomeCopyForm {...props} />;
}

export function ServiceAreaForm({ area }: { area: AreaRow | null }) {
  return <AreaEditor area={area} />;
}

export function HomepageGalleryImageForm(props: {
  image: GalleryImageRow | null;
  imageUrl?: string;
}) {
  return <GalleryImageForm {...props} />;
}

export function HomepageBeforeAfterPairForm(props: {
  pair: BeforeAfterPairRow | null;
  beforeImageUrl?: string;
  afterImageUrl?: string;
}) {
  return <BeforeAfterPairForm {...props} />;
}

export function FaqNodeForm(props: {
  node: FaqNodeRow;
  nodes: FaqNodeRow[];
  options: FaqOptionRow[];
  isAdmin: boolean;
}) {
  return <FaqNodeEditor {...props} />;
}

export function NewFaqNodeForm() {
  const [state, action, pending] = useActionState(saveFaqNode, emptyState);
  return (
    <form className="cms-form cms-new-faq" action={action}>
      <input type="hidden" name="id" value="" />
      <input type="hidden" name="status" value="draft" />
      <input type="hidden" name="sort_order" value="0" />
      <label>Question slug<input name="slug" required maxLength={100} placeholder="service-options" /></label>
      <label>Question prompt<textarea name="prompt" required rows={2} maxLength={300} /></label>
      <label className="cms-checkbox"><input type="checkbox" name="is_root" /> Make this the root question</label>
      <Result state={state} />
      <button className="button button-small button-outline" disabled={pending}>{pending ? "Adding…" : "Add draft question"}</button>
    </form>
  );
}
