insert into public.services (
  slug,
  category,
  title,
  summary,
  description,
  inclusions,
  exclusions,
  sort_order,
  status
)
values
  (
    'light-cleaning',
    'light_cleaning',
    'Light Cleaning',
    'A customizable cleaning service recommended for recurring cleanings.',
    'Light Cleaning is a customizable service recommended for recurring cleanings. Crown Cleaning Solutions brings its own cleaning supplies. Send an inquiry to discuss your needs and confirm the requested scope; an inquiry is not a confirmed appointment.',
    '[
      "Bathroom: bath and shower, toilet, sinks, and mirror",
      "Vacuum all carpeted areas",
      "Take out trash and replace liners",
      "Dust furniture surfaces, light fixtures, and ceiling fans",
      "Sweep and mop",
      "Kitchen: clean sink area, outside of kitchen cabinets, stove, countertops, and outside of appliances"
    ]'::jsonb,
    '[
      "Laundry, patio sweeping, and walls are not included by default but may be added upon request."
    ]'::jsonb,
    7,
    'published'
  ),
  (
    'deep-cleaning',
    'deep_cleaning',
    'Deep Cleaning',
    'A customizable, more thorough cleaning recommended for move-out services.',
    'Deep Cleaning is a customizable service recommended for move-out services and for clients who want a more thorough clean. It includes the Light Cleaning tasks plus additional detail work. Crown Cleaning Solutions brings its own cleaning supplies. Send an inquiry to discuss your needs and confirm the requested scope; an inquiry is not a confirmed appointment.',
    '[
      "Bathroom: bath and shower, toilet, sinks, and mirror",
      "Vacuum all carpeted areas",
      "Take out trash and replace liners",
      "Dust furniture surfaces, light fixtures, and ceiling fans",
      "Sweep and mop",
      "Kitchen: clean sink area, outside of kitchen cabinets, stove, countertops, and outside of appliances",
      "Clean inside the microwave, refrigerator, dishwasher, and oven",
      "Clean windows and window sills",
      "Clean baseboards"
    ]'::jsonb,
    '[
      "Laundry, patio sweeping, and walls are not included by default but may be added upon request."
    ]'::jsonb,
    8,
    'published'
  )
on conflict (slug) do update
set category = excluded.category,
    title = excluded.title,
    summary = excluded.summary,
    description = excluded.description,
    inclusions = excluded.inclusions,
    exclusions = excluded.exclusions,
    pricing_display = null,
    sort_order = excluded.sort_order,
    status = excluded.status,
    updated_at = now();

update public.site_settings
set value = jsonb_set(
      value,
      '{introduction}',
      to_jsonb('Explore Car Detailing, Carpet Cleaning, Upholstery Cleaning, Move-in / Move-out Cleaning, Residential Deep Cleaning, Post-Construction Cleaning, Light Cleaning, and Deep Cleaning. Share your request with the team to discuss service details.'::text),
      true
    ),
    updated_at = now()
where key = 'home_copy'
  and value ->> 'introduction' = 'Explore Car Detailing, Carpet Cleaning, Upholstery Cleaning, Move-in / Move-out Cleaning, Residential Deep Cleaning, and Post-Construction Cleaning. Share your request with the team to discuss service details.';
