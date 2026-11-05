update public.services
set status = 'archived',
    updated_at = now()
where category in ('residential', 'commercial', 'deep', 'move_in')
  and status <> 'archived';

insert into public.services (
  slug,
  category,
  title,
  summary,
  description,
  sort_order,
  status
)
values
  (
    'car-detailing',
    'car_detailing',
    'Car Detailing',
    'Service details are being confirmed. Contact the team to discuss your needs.',
    'Contact the team to discuss the service you need. The requested scope and availability will be confirmed with you. An inquiry is not an appointment.',
    1,
    'published'
  ),
  (
    'carpet-cleaning',
    'carpet_cleaning',
    'Carpet Cleaning',
    'Service details are being confirmed. Contact the team to discuss your needs.',
    'Contact the team to discuss the service you need. The requested scope and availability will be confirmed with you. An inquiry is not an appointment.',
    2,
    'published'
  ),
  (
    'upholstery-cleaning',
    'upholstery_cleaning',
    'Upholstery Cleaning',
    'Service details are being confirmed. Contact the team to discuss your needs.',
    'Contact the team to discuss the service you need. The requested scope and availability will be confirmed with you. An inquiry is not an appointment.',
    3,
    'published'
  ),
  (
    'move-in-move-out-cleaning',
    'move_in_move_out',
    'Move-in / Move-out Cleaning',
    'Service details are being confirmed. Contact the team to discuss your needs.',
    'Contact the team to discuss the service you need. The requested scope and availability will be confirmed with you. An inquiry is not an appointment.',
    4,
    'published'
  ),
  (
    'residential-deep-cleaning',
    'residential_deep',
    'Residential Deep Cleaning',
    'Service details are being confirmed. Contact the team to discuss your needs.',
    'Contact the team to discuss the service you need. The requested scope and availability will be confirmed with you. An inquiry is not an appointment.',
    5,
    'published'
  ),
  (
    'post-construction-cleaning',
    'post_construction',
    'Post-Construction Cleaning',
    'Service details are being confirmed. Contact the team to discuss your needs.',
    'Contact the team to discuss the service you need. The requested scope and availability will be confirmed with you. An inquiry is not an appointment.',
    6,
    'published'
  )
on conflict (slug) do update
set category = excluded.category,
    title = excluded.title,
    summary = excluded.summary,
    description = excluded.description,
    inclusions = '[]'::jsonb,
    exclusions = '[]'::jsonb,
    pricing_display = null,
    sort_order = excluded.sort_order,
    status = excluded.status,
    updated_at = now();

update public.site_settings
set value = jsonb_set(
      value,
      '{introduction}',
      to_jsonb('Explore Car Detailing, Carpet Cleaning, Upholstery Cleaning, Move-in / Move-out Cleaning, Residential Deep Cleaning, and Post-Construction Cleaning. Share your request with the team to discuss service details.'::text),
      true
    ),
    updated_at = now()
where key = 'home_copy'
  and value ->> 'introduction' = 'Regular cleaning focuses on everyday upkeep, such as wiping surfaces, cleaning bathrooms, and vacuuming floors. Deep cleaning is more detailed and targets built-up dirt and areas that may not be included in a standard cleaning. We can help you choose the right service.';
