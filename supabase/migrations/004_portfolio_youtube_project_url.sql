-- Optional detail embed + external project link
alter table public.portfolio_projects
  add column if not exists youtube_url text;

alter table public.portfolio_projects
  add column if not exists project_url text;
