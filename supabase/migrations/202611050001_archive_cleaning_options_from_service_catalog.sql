update public.services
set status = 'archived',
    updated_at = now()
where slug in ('light-cleaning', 'deep-cleaning')
  and status <> 'archived';

update public.site_settings
set value = jsonb_set(
      value,
      '{introduction}',
      to_jsonb('Explore Car Detailing, Carpet Cleaning, Upholstery Cleaning, Move-in / Move-out Cleaning, Residential Deep Cleaning, and Post-Construction Cleaning. Share your request with the team to discuss service details.'::text),
      true
    ),
    updated_at = now()
where key = 'home_copy'
  and value ->> 'introduction' = 'Explore Car Detailing, Carpet Cleaning, Upholstery Cleaning, Move-in / Move-out Cleaning, Residential Deep Cleaning, Post-Construction Cleaning, Light Cleaning, and Deep Cleaning. Share your request with the team to discuss service details.';
