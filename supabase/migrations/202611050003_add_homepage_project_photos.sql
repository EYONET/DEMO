create table public.homepage_gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_path text not null,
  image_alt text not null check (length(trim(image_alt)) between 1 and 300),
  caption text not null check (length(trim(caption)) between 1 and 160),
  sort_order integer not null default 0 check (sort_order between 0 and 10000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.homepage_before_after_pairs (
  id uuid primary key default gen_random_uuid(),
  before_image_path text not null,
  before_image_alt text not null check (length(trim(before_image_alt)) between 1 and 300),
  after_image_path text not null,
  after_image_alt text not null check (length(trim(after_image_alt)) between 1 and 300),
  caption text not null check (length(trim(caption)) between 1 and 160),
  sort_order integer not null default 0 check (sort_order between 0 and 10000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index homepage_gallery_images_order_idx
  on public.homepage_gallery_images (sort_order, created_at);
create index homepage_before_after_pairs_order_idx
  on public.homepage_before_after_pairs (sort_order, created_at);

create trigger homepage_gallery_images_set_updated_at
  before update on public.homepage_gallery_images
  for each row execute function public.set_updated_at();
create trigger homepage_before_after_pairs_set_updated_at
  before update on public.homepage_before_after_pairs
  for each row execute function public.set_updated_at();

alter table public.homepage_gallery_images enable row level security;
alter table public.homepage_before_after_pairs enable row level security;

create policy "Anyone can read homepage gallery images"
  on public.homepage_gallery_images for select to anon, authenticated
  using (true);
create policy "Content staff can manage homepage gallery images"
  on public.homepage_gallery_images for all to authenticated
  using ((select private.has_staff_role(array['admin', 'content_editor']::public.staff_role[])))
  with check ((select private.has_staff_role(array['admin', 'content_editor']::public.staff_role[])));

create policy "Anyone can read homepage before after pairs"
  on public.homepage_before_after_pairs for select to anon, authenticated
  using (true);
create policy "Content staff can manage homepage before after pairs"
  on public.homepage_before_after_pairs for all to authenticated
  using ((select private.has_staff_role(array['admin', 'content_editor']::public.staff_role[])))
  with check ((select private.has_staff_role(array['admin', 'content_editor']::public.staff_role[])));

create policy "Content staff can delete homepage project media"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'site-media'
    and (name like 'homepage/gallery/%' or name like 'homepage/before-after/%')
    and (select private.has_staff_role(array['admin', 'content_editor']::public.staff_role[]))
  );

grant select, insert, update, delete on
  public.homepage_gallery_images,
  public.homepage_before_after_pairs
to authenticated;
grant select on
  public.homepage_gallery_images,
  public.homepage_before_after_pairs
to anon;

notify pgrst, 'reload schema';
