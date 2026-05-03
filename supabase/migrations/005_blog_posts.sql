-- Blog posts (Markdown body); public reads via Next.js API (service role) or optional anon policy

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null default '',
  reading_time_minutes integer,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_list_idx
  on public.blog_posts (published desc, published_at desc nulls last);

alter table public.blog_posts enable row level security;

-- Published posts readable anonymously (optional client-side reads)
drop policy if exists "Public read published blog posts" on public.blog_posts;

create policy "Public read published blog posts"
  on public.blog_posts for select
  using (published = true);
