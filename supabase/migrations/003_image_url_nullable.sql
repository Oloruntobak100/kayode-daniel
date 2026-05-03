-- Allow NULL card thumbnails (app sends null when optional thumbnail is cleared).
-- Safe to run multiple times: only runs ALTER when image_url is still NOT NULL.

do $$
begin
  if exists (
    select 1
    from pg_catalog.pg_attribute a
    join pg_catalog.pg_class t on a.attrelid = t.oid
    join pg_catalog.pg_namespace n on t.relnamespace = n.oid
    where n.nspname = 'public'
      and t.relname = 'portfolio_projects'
      and a.attname = 'image_url'
      and a.attnum > 0
      and not a.attisdropped
      and a.attnotnull
  ) then
    alter table public.portfolio_projects
      alter column image_url drop not null;
  end if;
end $$;
