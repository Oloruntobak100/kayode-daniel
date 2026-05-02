-- If you created the table with youtube_url (001 before rename), migrate it.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'portfolio_projects'
      and column_name = 'youtube_url'
  ) then
    alter table public.portfolio_projects rename column youtube_url to content_image_url;
  end if;
end $$;
