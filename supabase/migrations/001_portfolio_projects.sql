-- Portfolio showcase projects (admin-managed). Apply in Supabase SQL editor or via CLI.
-- Server-side reads/writes use SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  content_image_url text,
  category_id text not null,
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_projects_sort_idx
  on public.portfolio_projects (sort_order asc, created_at desc);

alter table public.portfolio_projects enable row level security;

-- No policies: anon/authenticated cannot access via PostgREST.
-- Only the service role (used in Next.js API routes) bypasses RLS.

-- Optional: public Storage bucket for persisted thumbnails (create in Dashboard → Storage, or run below).
-- Public URL pattern: {SUPABASE_URL}/storage/v1/object/public/portfolio-thumbnails/<path>

insert into storage.buckets (id, name, public)
values ('portfolio-thumbnails', 'portfolio-thumbnails', true)
on conflict (id) do nothing;

-- Allow public read of thumbnails; uploads only via service role (server).
drop policy if exists "Public read portfolio thumbnails" on storage.objects;

create policy "Public read portfolio thumbnails"
  on storage.objects for select
  using (bucket_id = 'portfolio-thumbnails');
