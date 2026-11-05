import { createClient } from "@/lib/supabase/server";
import { getSupabaseConfig } from "@/lib/supabase/config";
import type { Database } from "@/lib/supabase/database.types";

export type PublishedService = Pick<
  Database["public"]["Tables"]["services"]["Row"],
  | "id"
  | "slug"
  | "category"
  | "title"
  | "summary"
  | "description"
  | "inclusions"
  | "exclusions"
  | "image_path"
  | "image_alt"
>;

export function getServiceImageUrl(path: string): string {
  const { url } = getSupabaseConfig();
  const safePath = path.split("/").map(encodeURIComponent).join("/");
  return `${url}/storage/v1/object/public/site-media/${safePath}`;
}

const stockImageIds = {
  residential: "photo-1527515637462-cff94eecc1ac",
  commercial: "photo-1504307651254-35680f356dfd",
  deep: "photo-1581578731548-c64695cc6952",
  move_in: "photo-1600210492486-724fe5c67fb0",
  car_detailing: "photo-1492144534655-ae79c964c9d7",
  carpet_cleaning: "photo-1600166898405-da9535204843",
  upholstery_cleaning: "photo-1555041469-a586c61ea9bc",
  move_in_move_out: "photo-1600210492486-724fe5c67fb0",
  residential_deep: "photo-1581578731548-c64695cc6952",
  post_construction: "photo-1504307651254-35680f356dfd",
  light_cleaning: "photo-1581578731548-c64695cc6952",
  deep_cleaning: "photo-1581578731548-c64695cc6952",
} satisfies Record<PublishedService["category"], string>;

export function getStockServiceImageUrl(
  category: PublishedService["category"],
  width: number,
): string {
  return `https://images.unsplash.com/${stockImageIds[category]}?auto=format&fit=crop&w=${width}&q=80`;
}

export async function getPublishedServices(): Promise<PublishedService[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(
      "id, slug, category, title, summary, description, inclusions, exclusions, image_path, image_alt",
    )
    .eq("status", "published")
    .order("sort_order")
    .order("title");

  if (error) {
    throw new Error("Unable to load published services.", { cause: error });
  }

  return data;
}

export async function getPublishedService(
  slug: string,
): Promise<PublishedService | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(
      "id, slug, category, title, summary, description, inclusions, exclusions, image_path, image_alt",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load the published service "${slug}".`, {
      cause: error,
    });
  }

  return data;
}

export function getStringList(value: Database["public"]["Tables"]["services"]["Row"]["inclusions"]): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}
