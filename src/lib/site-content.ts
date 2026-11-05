import { createClient } from "@/lib/supabase/server";
import type { Database, Json } from "@/lib/supabase/database.types";

export type ActiveServiceArea = Pick<
  Database["public"]["Tables"]["service_areas"]["Row"],
  "id" | "city" | "state" | "postal_codes" | "map_url"
>;

export type PublicContactDetails = {
  email: string | null;
  phone: string | null;
  alternatePhone: string | null;
  businessHours: string | null;
};

const defaultPublicContactDetails: PublicContactDetails = {
  email: "info@cleancrown.net",
  phone: "983-456-4745",
  alternatePhone: "(720) 757 1163",
  businessHours: "Monday through Saturday, 8:00 AM–5:00 PM",
};

export type PublicHomeCopy = {
  eyebrow: string;
  headline: string;
  introduction: string;
  galleryEnabled: boolean;
  beforeAfterEnabled: boolean;
};

const defaultHomeCopy: PublicHomeCopy = {
  eyebrow: "Serving Aurora and Denver, Colorado",
  headline: "The right clean for your space.",
  introduction:
    "Explore Car Detailing, Carpet Cleaning, Upholstery Cleaning, Move-in / Move-out Cleaning, Residential Deep Cleaning, and Post-Construction Cleaning. Share your request with the team to discuss service details.",
  galleryEnabled: false,
  beforeAfterEnabled: false,
};

const legacyDemoHomeCopy: PublicHomeCopy = {
  eyebrow: "A little more breathing room",
  headline: "Come home to a brighter kind of clean.",
  introduction:
    "Thoughtful home cleaning that gives you back your time—and makes your space feel like your favorite place.",
  galleryEnabled: false,
  beforeAfterEnabled: false,
};

function getJsonString(value: Json, key: string): string | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  const field = value[key];
  return typeof field === "string" && field.trim() ? field.trim() : null;
}

function getJsonBoolean(value: Json, key: string, fallback: boolean): boolean {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return fallback;
  }

  const field = value[key];
  return typeof field === "boolean" ? field : fallback;
}

function getJsonStringOrDefault(value: Json, key: string, fallback: string): string | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return fallback;
  }

  if (!(key in value)) {
    return fallback;
  }

  return getJsonString(value, key);
}

export async function getActiveServiceAreas(): Promise<ActiveServiceArea[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("service_areas")
    .select("id, city, state, postal_codes, map_url")
    .eq("is_active", true)
    .order("sort_order")
    .order("city");

  if (error) {
    throw new Error("Unable to load active service areas.", { cause: error });
  }

  return data;
}

export async function getPublicContactDetails(): Promise<PublicContactDetails> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "contact")
    .maybeSingle();

  if (error) {
    throw new Error("Unable to load public contact details.", { cause: error });
  }

  const email = data
    ? getJsonStringOrDefault(data.value, "email", defaultPublicContactDetails.email ?? "")
    : defaultPublicContactDetails.email;
  const phone = data
    ? getJsonStringOrDefault(data.value, "phone", defaultPublicContactDetails.phone ?? "")
    : defaultPublicContactDetails.phone;
  const alternatePhone = data
    ? getJsonStringOrDefault(
        data.value,
        "alternatePhone",
        defaultPublicContactDetails.alternatePhone ?? "",
      )
    : defaultPublicContactDetails.alternatePhone;
  const businessHours = data
    ? getJsonStringOrDefault(
        data.value,
        "businessHours",
        defaultPublicContactDetails.businessHours ?? "",
      )
    : defaultPublicContactDetails.businessHours;

  return {
    email:
      email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null,
    phone:
      phone && /^\+?[0-9().\-\s]{7,30}$/.test(phone) ? phone : null,
    alternatePhone:
      alternatePhone && /^\+?[0-9().\-\s]{7,30}$/.test(alternatePhone)
        ? alternatePhone
        : null,
    businessHours:
      businessHours && businessHours.length <= 160 ? businessHours : null,
  };
}

export async function getPublicHomeCopy(): Promise<PublicHomeCopy> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "home_copy")
    .maybeSingle();

  if (error) {
    throw new Error("Unable to load public homepage copy.", { cause: error });
  }

  if (!data || typeof data.value !== "object" || data.value === null || Array.isArray(data.value)) {
    return defaultHomeCopy;
  }

  const eyebrow = getJsonString(data.value, "eyebrow");
  const headline = getJsonString(data.value, "headline");
  const introduction = getJsonString(data.value, "introduction");
  const galleryEnabled = getJsonBoolean(data.value, "gallery_enabled", false);
  const beforeAfterEnabled = getJsonBoolean(data.value, "before_after_enabled", false);
  const [galleryResult, beforeAfterResult] = await Promise.all([
    galleryEnabled
      ? supabase.from("homepage_gallery_images").select("id", { count: "exact", head: true })
      : Promise.resolve({ count: 0, error: null }),
    beforeAfterEnabled
      ? supabase.from("homepage_before_after_pairs").select("id", { count: "exact", head: true })
      : Promise.resolve({ count: 0, error: null }),
  ]);

  if (galleryResult.error) {
    throw new Error("Unable to verify homepage gallery visibility.", { cause: galleryResult.error });
  }
  if (beforeAfterResult.error) {
    throw new Error("Unable to verify before-and-after section visibility.", { cause: beforeAfterResult.error });
  }

  return {
    eyebrow:
      eyebrow === legacyDemoHomeCopy.eyebrow
        ? defaultHomeCopy.eyebrow
        : eyebrow ?? defaultHomeCopy.eyebrow,
    headline:
      headline === legacyDemoHomeCopy.headline
        ? defaultHomeCopy.headline
        : headline ?? defaultHomeCopy.headline,
    introduction:
      introduction === legacyDemoHomeCopy.introduction
        ? defaultHomeCopy.introduction
        : introduction ?? defaultHomeCopy.introduction,
    galleryEnabled: galleryEnabled && (galleryResult.count ?? 0) > 0,
    beforeAfterEnabled: beforeAfterEnabled && (beforeAfterResult.count ?? 0) > 0,
  };
}
