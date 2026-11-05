import { createClient } from "@/lib/supabase/server";
import { getSupabaseConfig } from "@/lib/supabase/config";
import type { Database } from "@/lib/supabase/database.types";

export type HomepageGalleryImage =
  Database["public"]["Tables"]["homepage_gallery_images"]["Row"];
export type HomepageBeforeAfterPair =
  Database["public"]["Tables"]["homepage_before_after_pairs"]["Row"];

export function getHomepageImageUrl(path: string): string {
  const { url } = getSupabaseConfig();
  const safePath = path.split("/").map(encodeURIComponent).join("/");
  return `${url}/storage/v1/object/public/site-media/${safePath}`;
}

export async function getHomepageGalleryImages(): Promise<HomepageGalleryImage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("homepage_gallery_images")
    .select("id, image_path, image_alt, caption, sort_order, created_at, updated_at")
    .order("sort_order")
    .order("created_at");

  if (error) {
    throw new Error("Unable to load homepage gallery images.", { cause: error });
  }

  return data;
}

export async function getHomepageBeforeAfterPairs(): Promise<HomepageBeforeAfterPair[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("homepage_before_after_pairs")
    .select("id, before_image_path, before_image_alt, after_image_path, after_image_alt, caption, sort_order, created_at, updated_at")
    .order("sort_order")
    .order("created_at");

  if (error) {
    throw new Error("Unable to load homepage before-and-after photos.", { cause: error });
  }

  return data;
}
