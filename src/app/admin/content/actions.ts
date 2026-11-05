"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireContentStaff } from "@/lib/staff-auth";
import {
  legacyServiceCategoryValues,
  serviceCategoryValues,
} from "@/lib/service-categories";
import type { Database } from "@/lib/supabase/database.types";

export type ContentActionState = {
  message?: string;
  success?: boolean;
};

const legacyServiceCategorySet: ReadonlySet<string> = new Set(legacyServiceCategoryValues);

const serviceSchema = z.object({
  id: z.union([z.literal(""), z.uuid()]),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens.").max(100),
  category: z.union([z.enum(serviceCategoryValues), z.enum(legacyServiceCategoryValues)]),
  title: z.string().trim().min(1).max(120),
  summary: z.string().trim().min(1).max(300),
  description: z.string().trim().min(1).max(10000),
  inclusions: z.string().max(4000),
  exclusions: z.string().max(4000),
  sort_order: z.coerce.number().int().min(0).max(10000),
  status: z.enum(["draft", "published", "archived"]),
}).superRefine((service, context) => {
  if (
    legacyServiceCategorySet.has(service.category) &&
    (service.id === "" || service.status !== "archived")
  ) {
    context.addIssue({
      code: "custom",
      path: ["category"],
      message: "Choose one of the approved service categories. Legacy categories may remain only on archived services.",
    });
  }
});

const areaSchema = z.object({
  id: z.union([z.literal(""), z.uuid()]),
  city: z.string().trim().min(1).max(120),
  state: z.string().trim().min(2).max(80),
  postal_codes: z.string().max(2000),
  map_url: z.union([z.literal(""), z.url().refine((url) => url.startsWith("https://"))]),
  is_active: z.string().optional(),
});

const faqNodeSchema = z.object({
  id: z.union([z.literal(""), z.uuid()]),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens.").max(100),
  prompt: z.string().trim().min(1).max(300),
  status: z.enum(["draft", "published", "archived"]),
  is_root: z.string().optional(),
  sort_order: z.coerce.number().int().min(0).max(10000),
});

const faqOptionSchema = z.object({
  id: z.union([z.literal(""), z.uuid()]),
  node_id: z.uuid(),
  label: z.string().trim().min(1).max(160),
  answer: z.string().trim().min(1).max(4000),
  destination: z.string().trim(),
  sort_order: z.coerce.number().int().min(0).max(10000),
});

const contactSchema = z.object({
  email: z.union([z.literal(""), z.email().max(320)]),
  phone: z.string().trim().max(30).refine(
    (value) => !value || /^\+?[0-9().\-\s]{7,30}$/.test(value),
    "Enter a valid phone number.",
  ),
  alternatePhone: z.string().trim().max(30).refine(
    (value) => !value || /^\+?[0-9().\-\s]{7,30}$/.test(value),
    "Enter a valid alternate phone number.",
  ),
  businessHours: z.string().trim().max(160),
});

const homepageGalleryImageSchema = z.object({
  id: z.union([z.literal(""), z.uuid()]),
  image_alt: z.string().trim().min(1).max(300),
  caption: z.string().trim().min(1).max(160),
  sort_order: z.coerce.number().int().min(0).max(10000),
});

const homepageBeforeAfterPairSchema = z.object({
  id: z.union([z.literal(""), z.uuid()]),
  before_image_alt: z.string().trim().min(1).max(300),
  after_image_alt: z.string().trim().min(1).max(300),
  caption: z.string().trim().min(1).max(160),
  sort_order: z.coerce.number().int().min(0).max(10000),
});

const homeCopySchema = z.object({
  eyebrow: z.string().trim().min(1).max(120),
  headline: z.string().trim().min(1).max(240),
  introduction: z.string().trim().min(1).max(600),
  galleryEnabled: z.boolean(),
  beforeAfterEnabled: z.boolean(),
});

function value(formData: FormData, name: string) {
  const result = formData.get(name);
  return typeof result === "string" ? result : "";
}

function splitLines(text: string) {
  return text
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseFaqDestination(destination: string) {
  if (destination.startsWith("node:") && z.uuid().safeParse(destination.slice(5)).success) {
    return { next_node_id: destination.slice(5), action: null as null };
  }

  if (["quote", "contact", "end"].includes(destination)) {
    return {
      next_node_id: null,
      action: destination as Database["public"]["Enums"]["faq_action"],
    };
  }

  return null;
}

async function validatePublishedFaq(
  supabase: Awaited<ReturnType<typeof requireContentStaff>>["supabase"],
  nodeOverride?: {
    id: string;
    is_root: boolean;
    status: Database["public"]["Enums"]["content_status"];
  },
  optionOverride?: {
    id: string;
    node_id: string;
    next_node_id: string | null;
    action: Database["public"]["Enums"]["faq_action"] | null;
  },
) {
  const { data: nodes, error: nodeError } = await supabase
    .from("faq_nodes")
    .select("id, is_root, status");
  if (nodeError) throw new Error("Unable to validate FAQ nodes.", { cause: nodeError });

  const { data: options, error: optionError } = await supabase
    .from("faq_options")
    .select("id, node_id, next_node_id, action");
  if (optionError) throw new Error("Unable to validate FAQ choices.", { cause: optionError });

  const candidateNodes = nodes.map((node) =>
    nodeOverride?.id === node.id
      ? { ...node, is_root: nodeOverride.is_root, status: nodeOverride.status }
      : node,
  );
  const publishedNodes = candidateNodes.filter((node) => node.status === "published");
  const roots = publishedNodes.filter((node) => node.is_root);

  if (roots.length > 1) {
    return "Only one published FAQ question can be marked as the root.";
  }
  if (roots.length === 0 && publishedNodes.some((node) => node.is_root)) {
    return "A published root question is required.";
  }

  const candidateOptions = optionOverride
    ? [
        ...options.filter((option) => option.id !== optionOverride.id),
        optionOverride,
      ]
    : options;
  const publishedIds = new Set(publishedNodes.map((node) => node.id));
  const children = new Map<string, string[]>();

  for (const node of publishedNodes) {
    const choices = candidateOptions.filter((option) => option.node_id === node.id);
    if (choices.length === 0) {
      return "Every published FAQ question needs at least one choice.";
    }
    for (const choice of choices) {
      if (choice.next_node_id && !publishedIds.has(choice.next_node_id)) {
        return "Every linked FAQ question must also be published.";
      }
      if (choice.next_node_id) {
        children.set(node.id, [...(children.get(node.id) ?? []), choice.next_node_id]);
      }
    }
  }

  const visited = new Set<string>();
  const active = new Set<string>();
  function visit(nodeId: string): boolean {
    if (active.has(nodeId)) return false;
    if (visited.has(nodeId)) return true;
    active.add(nodeId);
    for (const childId of children.get(nodeId) ?? []) {
      if (!visit(childId)) return false;
    }
    active.delete(nodeId);
    visited.add(nodeId);
    return true;
  }

  for (const node of publishedNodes) {
    if (!visit(node.id)) {
      return "FAQ choices cannot contain a loop.";
    }
  }
  if (roots.length === 0 && nodeOverride?.is_root) {
    return "Publish the child questions first, then publish the root question last.";
  }
  if (roots.length === 0 && optionOverride?.next_node_id && !publishedIds.has(optionOverride.next_node_id)) {
    return "Publish the destination question before linking a published question to it.";
  }
  if (roots.length === 1) {
    const reachable = new Set<string>();
    function markReachable(nodeId: string) {
      if (reachable.has(nodeId)) return;
      reachable.add(nodeId);
      for (const childId of children.get(nodeId) ?? []) {
        markReachable(childId);
      }
    }
    markReachable(roots[0].id);
    if (reachable.size !== publishedNodes.length) {
      return "Every published FAQ question must be reachable from the root.";
    }
  }

  return null;
}

export async function saveService(
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const parsed = serviceSchema.safeParse({
    id: value(formData, "id"),
    slug: value(formData, "slug"),
    category: value(formData, "category"),
    title: value(formData, "title"),
    summary: value(formData, "summary"),
    description: value(formData, "description"),
    inclusions: value(formData, "inclusions"),
    exclusions: value(formData, "exclusions"),
    sort_order: value(formData, "sort_order"),
    status: value(formData, "status"),
  });
  if (!parsed.success) return { message: parsed.error.issues[0]?.message ?? "Review the service fields." };

  const { supabase } = await requireContentStaff();
  const record = {
    slug: parsed.data.slug,
    category: parsed.data.category,
    title: parsed.data.title,
    summary: parsed.data.summary,
    description: parsed.data.description,
    inclusions: splitLines(parsed.data.inclusions),
    exclusions: splitLines(parsed.data.exclusions),
    status: parsed.data.status,
    sort_order: parsed.data.sort_order,
    updated_at: new Date().toISOString(),
  };

  const result = parsed.data.id
    ? await supabase.from("services").update(record).eq("id", parsed.data.id).select("id").maybeSingle()
    : await supabase.from("services").insert(record).select("id").maybeSingle();

  if (result.error) {
    console.error("Unable to save service content.", { code: result.error.code });
    return { message: "Unable to save this service. Check that its slug is unique and try again." };
  }
  if (!result.data) return { message: "This service is unavailable or you no longer have permission to edit it." };

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath(`/services/${parsed.data.slug}`);
  return { success: true, message: "Service saved." };
}

export async function deleteService(
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const serviceId = value(formData, "service_id");
  if (!z.uuid().safeParse(serviceId).success) {
    return { message: "Choose a valid service to delete." };
  }

  const { supabase, role } = await requireContentStaff();
  if (role !== "admin") {
    return { message: "Only administrators can permanently delete services." };
  }

  const { data: service, error: readError } = await supabase
    .from("services")
    .select("id, slug, image_path")
    .eq("id", serviceId)
    .maybeSingle();

  if (readError) {
    console.error("Unable to load service before deletion.", {
      code: readError.code,
    });
    return { message: "Unable to verify the selected service. Nothing was deleted." };
  }
  if (!service) return { message: "This service no longer exists." };

  const { data: deleted, error: deleteError } = await supabase
    .from("services")
    .delete()
    .eq("id", serviceId)
    .select("id")
    .maybeSingle();

  if (deleteError) {
    console.error("Unable to delete service.", { code: deleteError.code });
    return { message: "Unable to delete this service. Nothing was changed." };
  }
  if (!deleted) {
    return {
      message:
        "The service was not deleted. Confirm your admin access and try again.",
    };
  }

  let imageCleanupFailed = false;
  if (service.image_path) {
    const { error: imageError } = await supabase.storage
      .from("site-media")
      .remove([service.image_path]);
    if (imageError) {
      imageCleanupFailed = true;
      console.error("Unable to remove deleted service image.", {
        message: imageError.message,
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath(`/services/${service.slug}`);
  revalidatePath("/admin/content");

  redirect(
    imageCleanupFailed
      ? "/admin/content?notice=service-image-cleanup"
      : "/admin/content?notice=service-deleted",
  );
}

export async function saveContactSettings(
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const parsed = contactSchema.safeParse({
    email: value(formData, "email").trim().toLowerCase(),
    phone: value(formData, "phone"),
    alternatePhone: value(formData, "alternatePhone"),
    businessHours: value(formData, "businessHours"),
  });
  if (!parsed.success) return { message: parsed.error.issues[0]?.message ?? "Review the contact details." };

  const { supabase, user } = await requireContentStaff();
  const { error } = await supabase.from("site_settings").upsert({
    key: "contact",
    value: {
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      alternatePhone: parsed.data.alternatePhone || null,
      businessHours: parsed.data.businessHours || null,
    },
    is_public: true,
    updated_by: user.id,
  });
  if (error) {
    console.error("Unable to save public contact settings.", { code: error.code });
    return { message: "Unable to save contact details. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/contact");
  return { success: true, message: "Public contact details saved." };
}

export async function saveHomeCopy(
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const parsed = homeCopySchema.safeParse({
    eyebrow: value(formData, "eyebrow"),
    headline: value(formData, "headline"),
    introduction: value(formData, "introduction"),
    galleryEnabled: formData.get("gallery_enabled") === "on",
    beforeAfterEnabled: formData.get("before_after_enabled") === "on",
  });
  if (!parsed.success) return { message: parsed.error.issues[0]?.message ?? "Review the homepage copy." };

  const { supabase, user } = await requireContentStaff();
  if (parsed.data.galleryEnabled) {
    const { count, error } = await supabase
      .from("homepage_gallery_images")
      .select("id", { count: "exact", head: true });
    if (error) {
      console.error("Unable to verify homepage gallery images.", { code: error.code });
      return { message: "Unable to verify gallery images. Try again before enabling this section." };
    }
    if (!count) return { message: "Add at least one approved gallery image before enabling it." };
  }
  if (parsed.data.beforeAfterEnabled) {
    const { count, error } = await supabase
      .from("homepage_before_after_pairs")
      .select("id", { count: "exact", head: true });
    if (error) {
      console.error("Unable to verify before-and-after photos.", { code: error.code });
      return { message: "Unable to verify before-and-after photos. Try again before enabling this section." };
    }
    if (!count) return { message: "Add at least one approved before-and-after pair before enabling it." };
  }

  const { error } = await supabase.from("site_settings").upsert({
    key: "home_copy",
    value: {
      eyebrow: parsed.data.eyebrow,
      headline: parsed.data.headline,
      introduction: parsed.data.introduction,
      gallery_enabled: parsed.data.galleryEnabled,
      before_after_enabled: parsed.data.beforeAfterEnabled,
    },
    is_public: true,
    updated_by: user.id,
  });
  if (error) {
    console.error("Unable to save homepage copy.", { code: error.code });
    return { message: "Unable to save homepage copy. Please try again." };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Homepage settings saved." };
}

export async function saveServiceArea(
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const parsed = areaSchema.safeParse({
    id: value(formData, "id"),
    city: value(formData, "city"),
    state: value(formData, "state"),
    postal_codes: value(formData, "postal_codes"),
    map_url: value(formData, "map_url"),
    is_active: value(formData, "is_active"),
  });
  if (!parsed.success) return { message: parsed.error.issues[0]?.message ?? "Review the service area." };

  const { supabase } = await requireContentStaff();
  const record = {
    city: parsed.data.city,
    state: parsed.data.state,
    postal_codes: parsed.data.postal_codes.split(",").map((code) => code.trim()).filter(Boolean),
    map_url: parsed.data.map_url || null,
    is_active: parsed.data.is_active === "on",
  };
  const result = parsed.data.id
    ? await supabase.from("service_areas").update(record).eq("id", parsed.data.id).select("id").maybeSingle()
    : await supabase.from("service_areas").insert(record).select("id").maybeSingle();
  if (result.error) {
    console.error("Unable to save a service area.", { code: result.error.code });
    return { message: "Unable to save this service area. Please try again." };
  }
  if (!result.data) return { message: "This service area is unavailable or you no longer have permission to edit it." };

  revalidatePath("/");
  revalidatePath("/about");
  return { success: true, message: "Service area saved." };
}

export async function saveFaqNode(
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const parsed = faqNodeSchema.safeParse({
    id: value(formData, "id"),
    slug: value(formData, "slug"),
    prompt: value(formData, "prompt"),
    status: value(formData, "status"),
    is_root: value(formData, "is_root"),
    sort_order: value(formData, "sort_order"),
  });
  if (!parsed.success) return { message: parsed.error.issues[0]?.message ?? "Review the FAQ question." };

  const { supabase } = await requireContentStaff();
  if (!parsed.data.id && parsed.data.status === "published") {
    return { message: "Create the question as a draft, add its choices, then publish it." };
  }
  const record = {
    slug: parsed.data.slug,
    prompt: parsed.data.prompt,
    status: parsed.data.status,
    is_root: parsed.data.is_root === "on",
    sort_order: parsed.data.sort_order,
  };
  if (record.status === "published") {
    const invalidGraph = await validatePublishedFaq(
      supabase,
      { id: parsed.data.id || "__new__", is_root: record.is_root, status: record.status },
    );
    if (invalidGraph) return { message: invalidGraph };
  }

  const result = parsed.data.id
    ? await supabase.from("faq_nodes").update(record).eq("id", parsed.data.id).select("id").maybeSingle()
    : await supabase.from("faq_nodes").insert(record).select("id").maybeSingle();
  if (result.error) {
    console.error("Unable to save an FAQ question.", { code: result.error.code });
    return { message: "Unable to save this FAQ question. Check that its slug is unique." };
  }
  if (!result.data) return { message: "This FAQ question is unavailable or you no longer have permission to edit it." };

  revalidatePath("/");
  return { success: true, message: "FAQ question saved." };
}

export async function saveFaqOption(
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const parsed = faqOptionSchema.safeParse({
    id: value(formData, "id"),
    node_id: value(formData, "node_id"),
    label: value(formData, "label"),
    answer: value(formData, "answer"),
    destination: value(formData, "destination"),
    sort_order: value(formData, "sort_order"),
  });
  if (!parsed.success) return { message: parsed.error.issues[0]?.message ?? "Review the FAQ choice." };
  const destination = parseFaqDestination(parsed.data.destination);
  if (!destination) {
    return { message: "Choose another published question or a valid ending action." };
  }

  const { supabase } = await requireContentStaff();
  const candidate = {
    id: parsed.data.id || randomUUID(),
    node_id: parsed.data.node_id,
    next_node_id: destination.next_node_id,
    action: destination.action,
  };
  const { data: parent, error: parentError } = await supabase
    .from("faq_nodes")
    .select("status")
    .eq("id", parsed.data.node_id)
    .maybeSingle();
  if (parentError) return { message: "Unable to verify the parent FAQ question." };
  if (!parent) return { message: "This FAQ question no longer exists." };

  if (parent.status === "published") {
    const invalidGraph = await validatePublishedFaq(supabase, undefined, candidate);
    if (invalidGraph) return { message: invalidGraph };
  }

  const record = {
    node_id: parsed.data.node_id,
    label: parsed.data.label,
    answer: parsed.data.answer,
    next_node_id: destination.next_node_id,
    action: destination.action,
    sort_order: parsed.data.sort_order,
  };
  const result = parsed.data.id
    ? await supabase.from("faq_options").update(record).eq("id", parsed.data.id).select("id").maybeSingle()
    : await supabase.from("faq_options").insert(record).select("id").maybeSingle();
  if (result.error) {
    console.error("Unable to save an FAQ choice.", { code: result.error.code });
    return { message: "Unable to save this FAQ choice. Please try again." };
  }
  if (!result.data) return { message: "This FAQ choice is unavailable or you no longer have permission to edit it." };

  revalidatePath("/");
  return { success: true, message: "FAQ choice saved." };
}

export async function deleteFaqOption(formData: FormData) {
  const id = value(formData, "id");
  if (!z.uuid().safeParse(id).success) throw new Error("Invalid FAQ choice.");
  const { supabase, role } = await requireContentStaff();
  if (role !== "admin") throw new Error("Only administrators can delete FAQ choices.");
  const { error } = await supabase.from("faq_options").delete().eq("id", id);
  if (error) throw new Error("Unable to delete FAQ choice.", { cause: error });
  revalidatePath("/");
  revalidatePath("/admin/content");
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const imageTypes = {
  "image/jpeg": { extension: "jpg", signature: (bytes: Uint8Array) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  "image/png": { extension: "png", signature: (bytes: Uint8Array) => bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 },
  "image/webp": { extension: "webp", signature: (bytes: Uint8Array) => String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP" },
  "image/avif": { extension: "avif", signature: (bytes: Uint8Array) => String.fromCharCode(...bytes.slice(4, 12)).includes("ftypavif") },
} as const;

export async function uploadServiceImage(
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const serviceId = value(formData, "service_id");
  const alt = value(formData, "image_alt").trim();
  const file = formData.get("image");
  if (!z.uuid().safeParse(serviceId).success) return { message: "Choose a valid service first." };
  if (!(file instanceof File) || file.size === 0) return { message: "Choose an image file." };
  if (file.size > MAX_IMAGE_BYTES) return { message: "Images must be 5 MB or smaller." };
  if (alt.length < 1 || alt.length > 300) return { message: "Add descriptive alt text (up to 300 characters)." };
  const imageType = imageTypes[file.type as keyof typeof imageTypes];
  if (!imageType) return { message: "Use a JPEG, PNG, WebP, or AVIF image." };
  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (!imageType.signature(bytes)) return { message: "The file contents do not match the selected image type." };

  const { supabase } = await requireContentStaff();
  const { data: existing, error: readError } = await supabase
    .from("services")
    .select("image_path, slug")
    .eq("id", serviceId)
    .maybeSingle();
  if (readError) return { message: "Unable to verify the selected service." };
  if (!existing) return { message: "The selected service no longer exists." };

  const path = `services/${serviceId}/${randomUUID()}.${imageType.extension}`;
  const { error: uploadError } = await supabase.storage
    .from("site-media")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (uploadError) {
    console.error("Unable to upload service image.", { message: uploadError.message });
    return { message: "Image upload failed. Please try again." };
  }

  const { error: updateError } = await supabase
    .from("services")
    .update({ image_path: path, image_alt: alt })
    .eq("id", serviceId);
  if (updateError) {
    const { error: cleanupError } = await supabase.storage
      .from("site-media")
      .remove([path]);
    if (cleanupError) {
      console.error("Unable to clean up an unreferenced service image.", {
        message: cleanupError.message,
      });
    }
    console.error("Unable to save service image metadata.", { code: updateError.code });
    return { message: "The image uploaded, but its service details could not be saved." };
  }

  let replacementCleanupFailed = false;
  if (existing.image_path) {
    const { error: removeError } = await supabase.storage
      .from("site-media")
      .remove([existing.image_path]);
    if (removeError) {
      replacementCleanupFailed = true;
      console.error("Unable to remove the replaced service image.", {
        message: removeError.message,
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath(`/services/${existing.slug}`);
  return {
    success: true,
    message: replacementCleanupFailed
      ? "New image uploaded, but the previous image could not be removed. Ask the administrator to clean it up in Supabase Storage."
      : "Service image uploaded.",
  };
}

type ValidatedImage = {
  file: File;
  extension: string;
};

async function validateImageFile(
  formData: FormData,
  fieldName: string,
  required: boolean,
): Promise<{ image?: ValidatedImage; error?: string }> {
  const entry = formData.get(fieldName);
  if (!(entry instanceof File) || entry.size === 0) {
    return required ? { error: "Choose an image file." } : {};
  }
  if (entry.size > MAX_IMAGE_BYTES) return { error: "Images must be 5 MB or smaller." };
  const imageType = imageTypes[entry.type as keyof typeof imageTypes];
  if (!imageType) return { error: "Use a JPEG, PNG, WebP, or AVIF image." };
  const bytes = new Uint8Array(await entry.slice(0, 16).arrayBuffer());
  if (!imageType.signature(bytes)) {
    return { error: "The file contents do not match the selected image type." };
  }
  return { image: { file: entry, extension: imageType.extension } };
}

async function uploadHomepageImage(
  supabase: Awaited<ReturnType<typeof requireContentStaff>>["supabase"],
  folder: "gallery" | "before-after",
  image: ValidatedImage,
) {
  const path = `homepage/${folder}/${randomUUID()}.${image.extension}`;
  const { error } = await supabase.storage
    .from("site-media")
    .upload(path, image.file, { contentType: image.file.type, upsert: false });
  if (error) {
    console.error("Unable to upload homepage project photo.", { message: error.message });
    return { path: null, error: "Image upload failed. Please try again." };
  }
  return { path, error: null };
}

async function removeHomepageImage(
  supabase: Awaited<ReturnType<typeof requireContentStaff>>["supabase"],
  paths: string[],
) {
  const { error } = await supabase.storage.from("site-media").remove(paths);
  if (error) {
    console.error("Unable to remove homepage project photo files.", { message: error.message });
    return false;
  }
  return true;
}

export async function saveHomepageGalleryImage(
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const parsed = homepageGalleryImageSchema.safeParse({
    id: value(formData, "id"),
    image_alt: value(formData, "image_alt"),
    caption: value(formData, "caption"),
    sort_order: value(formData, "sort_order"),
  });
  if (!parsed.success) return { message: parsed.error.issues[0]?.message ?? "Review the gallery image details." };

  const { supabase } = await requireContentStaff();
  let existing: { id: string; image_path: string } | null = null;
  if (parsed.data.id) {
    const result = await supabase
      .from("homepage_gallery_images")
      .select("id, image_path")
      .eq("id", parsed.data.id)
      .maybeSingle();
    if (result.error) return { message: "Unable to verify the selected gallery image." };
    if (!result.data) return { message: "This gallery image no longer exists." };
    existing = result.data;
  }

  const imageResult = await validateImageFile(formData, "image", !existing);
  if (imageResult.error) return { message: imageResult.error };
  let newPath: string | null = null;
  if (imageResult.image) {
    const upload = await uploadHomepageImage(supabase, "gallery", imageResult.image);
    if (upload.error || !upload.path) return { message: upload.error ?? "Image upload failed." };
    newPath = upload.path;
  }

  const imagePath = newPath ?? existing?.image_path;
  if (!imagePath) return { message: "Choose an image file." };
  const record = {
    image_path: imagePath,
    image_alt: parsed.data.image_alt,
    caption: parsed.data.caption,
    sort_order: parsed.data.sort_order,
  };
  const result = existing
    ? await supabase.from("homepage_gallery_images").update(record).eq("id", existing.id).select("id").maybeSingle()
    : await supabase.from("homepage_gallery_images").insert(record).select("id").maybeSingle();
  if (result.error || !result.data) {
    if (newPath) await removeHomepageImage(supabase, [newPath]);
    console.error("Unable to save homepage gallery image.", { code: result.error?.code });
    return { message: "Unable to save this gallery image. Please try again." };
  }

  const oldImageRemoved = !newPath || !existing?.image_path ||
    await removeHomepageImage(supabase, [existing.image_path]);
  revalidatePath("/", "layout");
  revalidatePath("/admin/content");
  return {
    success: true,
    message: oldImageRemoved
      ? "Gallery image saved."
      : "Gallery image saved, but its previous file could not be removed from storage.",
  };
}

export async function deleteHomepageGalleryImage(
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const id = value(formData, "id");
  if (!z.uuid().safeParse(id).success) return { message: "Choose a valid gallery image." };
  const { supabase } = await requireContentStaff();
  const [imageResult, settingsResult, countResult] = await Promise.all([
    supabase.from("homepage_gallery_images").select("id, image_path").eq("id", id).maybeSingle(),
    supabase.from("site_settings").select("value").eq("key", "home_copy").maybeSingle(),
    supabase.from("homepage_gallery_images").select("id", { count: "exact", head: true }),
  ]);
  if (imageResult.error || settingsResult.error || countResult.error) {
    return { message: "Unable to verify the gallery image before deletion." };
  }
  if (!imageResult.data) return { message: "This gallery image no longer exists." };
  const settingValue = settingsResult.data?.value;
  const galleryEnabled =
    typeof settingValue === "object" && settingValue !== null && !Array.isArray(settingValue) &&
    settingValue.gallery_enabled === true;
  if (galleryEnabled && (countResult.count ?? 0) <= 1) {
    return { message: "Hide the gallery before deleting its last image." };
  }

  const { data: deleted, error } = await supabase
    .from("homepage_gallery_images")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();
  if (error) return { message: "Unable to delete the gallery image." };
  if (!deleted) return { message: "This gallery image was not deleted." };

  const storageRemoved = await removeHomepageImage(supabase, [imageResult.data.image_path]);
  revalidatePath("/", "layout");
  revalidatePath("/admin/content");
  return {
    success: storageRemoved,
    message: storageRemoved
      ? "Gallery image deleted."
      : "The gallery image was removed from the website, but its file could not be removed from storage.",
  };
}

export async function saveHomepageBeforeAfterPair(
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const parsed = homepageBeforeAfterPairSchema.safeParse({
    id: value(formData, "id"),
    before_image_alt: value(formData, "before_image_alt"),
    after_image_alt: value(formData, "after_image_alt"),
    caption: value(formData, "caption"),
    sort_order: value(formData, "sort_order"),
  });
  if (!parsed.success) return { message: parsed.error.issues[0]?.message ?? "Review the before-and-after pair details." };

  const { supabase } = await requireContentStaff();
  let existing: {
    id: string;
    before_image_path: string;
    after_image_path: string;
  } | null = null;
  if (parsed.data.id) {
    const result = await supabase
      .from("homepage_before_after_pairs")
      .select("id, before_image_path, after_image_path")
      .eq("id", parsed.data.id)
      .maybeSingle();
    if (result.error) return { message: "Unable to verify the selected before-and-after pair." };
    if (!result.data) return { message: "This before-and-after pair no longer exists." };
    existing = result.data;
  }

  const [beforeResult, afterResult] = await Promise.all([
    validateImageFile(formData, "before_image", !existing),
    validateImageFile(formData, "after_image", !existing),
  ]);
  if (beforeResult.error) return { message: `Before image: ${beforeResult.error}` };
  if (afterResult.error) return { message: `After image: ${afterResult.error}` };

  const newPaths: string[] = [];
  let beforePath: string | null = null;
  let afterPath: string | null = null;
  if (beforeResult.image) {
    const upload = await uploadHomepageImage(supabase, "before-after", beforeResult.image);
    if (upload.error || !upload.path) return { message: upload.error ?? "Before image upload failed." };
    beforePath = upload.path;
    newPaths.push(upload.path);
  }
  if (afterResult.image) {
    const upload = await uploadHomepageImage(supabase, "before-after", afterResult.image);
    if (upload.error || !upload.path) {
      if (newPaths.length > 0) await removeHomepageImage(supabase, newPaths);
      return { message: `After image: ${upload.error ?? "Image upload failed."}` };
    }
    afterPath = upload.path;
    newPaths.push(upload.path);
  }

  const beforeImagePath = beforePath ?? existing?.before_image_path;
  const afterImagePath = afterPath ?? existing?.after_image_path;
  if (!beforeImagePath || !afterImagePath) {
    if (newPaths.length > 0) await removeHomepageImage(supabase, newPaths);
    return { message: "Choose both a before and an after image." };
  }
  const record = {
    before_image_path: beforeImagePath,
    before_image_alt: parsed.data.before_image_alt,
    after_image_path: afterImagePath,
    after_image_alt: parsed.data.after_image_alt,
    caption: parsed.data.caption,
    sort_order: parsed.data.sort_order,
  };
  const result = existing
    ? await supabase.from("homepage_before_after_pairs").update(record).eq("id", existing.id).select("id").maybeSingle()
    : await supabase.from("homepage_before_after_pairs").insert(record).select("id").maybeSingle();
  if (result.error || !result.data) {
    if (newPaths.length > 0) await removeHomepageImage(supabase, newPaths);
    console.error("Unable to save homepage before-and-after pair.", { code: result.error?.code });
    return { message: "Unable to save this before-and-after pair. Please try again." };
  }

  const oldPaths = [
    beforePath && existing?.before_image_path,
    afterPath && existing?.after_image_path,
  ].filter((path): path is string => Boolean(path));
  const oldImagesRemoved = oldPaths.length === 0 || await removeHomepageImage(supabase, oldPaths);
  revalidatePath("/", "layout");
  revalidatePath("/admin/content");
  return {
    success: true,
    message: oldImagesRemoved
      ? "Before-and-after pair saved."
      : "Pair saved, but one or more previous files could not be removed from storage.",
  };
}

export async function deleteHomepageBeforeAfterPair(
  _previous: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const id = value(formData, "id");
  if (!z.uuid().safeParse(id).success) return { message: "Choose a valid before-and-after pair." };
  const { supabase } = await requireContentStaff();
  const [pairResult, settingsResult, countResult] = await Promise.all([
    supabase.from("homepage_before_after_pairs").select("id, before_image_path, after_image_path").eq("id", id).maybeSingle(),
    supabase.from("site_settings").select("value").eq("key", "home_copy").maybeSingle(),
    supabase.from("homepage_before_after_pairs").select("id", { count: "exact", head: true }),
  ]);
  if (pairResult.error || settingsResult.error || countResult.error) {
    return { message: "Unable to verify the before-and-after pair before deletion." };
  }
  if (!pairResult.data) return { message: "This before-and-after pair no longer exists." };
  const settingValue = settingsResult.data?.value;
  const sectionEnabled =
    typeof settingValue === "object" && settingValue !== null && !Array.isArray(settingValue) &&
    settingValue.before_after_enabled === true;
  if (sectionEnabled && (countResult.count ?? 0) <= 1) {
    return { message: "Hide the before-and-after section before deleting its last pair." };
  }

  const { data: deleted, error } = await supabase
    .from("homepage_before_after_pairs")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();
  if (error) return { message: "Unable to delete the before-and-after pair." };
  if (!deleted) return { message: "This before-and-after pair was not deleted." };

  const storageRemoved = await removeHomepageImage(supabase, [
    pairResult.data.before_image_path,
    pairResult.data.after_image_path,
  ]);
  revalidatePath("/", "layout");
  revalidatePath("/admin/content");
  return {
    success: storageRemoved,
    message: storageRemoved
      ? "Before-and-after pair deleted."
      : "The pair was removed from the website, but one or more image files could not be removed from storage.",
  };
}
