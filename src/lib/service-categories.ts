export const serviceCategoryValues = [
  "car_detailing",
  "carpet_cleaning",
  "upholstery_cleaning",
  "move_in_move_out",
  "residential_deep",
  "post_construction",
] as const;

export const legacyServiceCategoryValues = [
  "residential",
  "commercial",
  "deep",
  "move_in",
  "light_cleaning",
  "deep_cleaning",
] as const;

export const serviceCategoryOptions = [
  { value: "car_detailing", label: "Car Detailing" },
  { value: "carpet_cleaning", label: "Carpet Cleaning" },
  { value: "upholstery_cleaning", label: "Upholstery Cleaning" },
  { value: "move_in_move_out", label: "Move-in / Move-out Cleaning" },
  { value: "residential_deep", label: "Residential Deep Cleaning" },
  { value: "post_construction", label: "Post-Construction Cleaning" },
] as const;
