-- Allow missing card thumbnail without inserting remote placeholder URLs.
alter table public.portfolio_projects
  alter column image_url drop not null;
