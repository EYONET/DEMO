revoke select on public.services from anon, authenticated;

grant select (
  id,
  slug,
  category,
  title,
  summary,
  description,
  inclusions,
  exclusions,
  image_path,
  image_alt,
  sort_order,
  status,
  created_at,
  updated_at
)
on public.services to anon, authenticated;

notify pgrst, 'reload schema';
