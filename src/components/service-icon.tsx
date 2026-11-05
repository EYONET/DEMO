import type { Database } from "@/lib/supabase/database.types";

const servicePresentation = {
  residential: { icon: "home", iconClass: "icon-home" },
  commercial: { icon: "commercial", iconClass: "icon-key" },
  deep: { icon: "sparkle", iconClass: "icon-sparkle" },
  move_in: { icon: "key", iconClass: "icon-key" },
  car_detailing: { icon: "sparkle", iconClass: "icon-sparkle" },
  carpet_cleaning: { icon: "sparkle", iconClass: "icon-sparkle" },
  upholstery_cleaning: { icon: "sparkle", iconClass: "icon-sparkle" },
  move_in_move_out: { icon: "key", iconClass: "icon-key" },
  residential_deep: { icon: "sparkle", iconClass: "icon-sparkle" },
  post_construction: { icon: "commercial", iconClass: "icon-key" },
  light_cleaning: { icon: "sparkle", iconClass: "icon-sparkle" },
  deep_cleaning: { icon: "sparkle", iconClass: "icon-sparkle" },
} satisfies Record<
  Database["public"]["Enums"]["service_category"],
  { icon: string; iconClass: string }
>;

export function getServicePresentation(
  category: Database["public"]["Enums"]["service_category"],
) {
  return servicePresentation[category];
}

export default function ServiceIcon({
  category,
}: {
  category: Database["public"]["Enums"]["service_category"];
}) {
  const { icon } = getServicePresentation(category);

  if (icon === "home") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="m7 22 17-14 17 14v18H7V22Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M19 40V27h10v13" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M34 8h4v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "sparkle") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="m23 5 4.4 13.6L41 23l-13.6 4.4L23 41l-4.4-13.6L5 23l13.6-4.4L23 5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="m38 32 1.8 5.2L45 39l-5.2 1.8L38 46l-1.8-5.2L31 39l5.2-1.8L38 32Z" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "commercial") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M8 40V14l16-7v33m0-22h16v22M5 40h38" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M14 18h3m-3 7h3m-3 7h3m13-7h3m-3 7h3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="17" cy="24" r="9" stroke="currentColor" strokeWidth="2.2" />
      <path d="m24 30 14 14m-5-19 6 6m-12-1 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M17 21v6m-3-3h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
