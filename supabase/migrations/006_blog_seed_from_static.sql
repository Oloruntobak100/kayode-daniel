-- Optional: seed from previous static copy in lib/content (edit body in admin)
insert into public.blog_posts (slug, title, excerpt, body, reading_time_minutes, published, published_at)
values
  (
    'shipping-faster-with-ai',
    'Shipping faster with AI without drowning in prompts',
    'How I structure small teams to adopt LLM-assisted dev without losing code quality.',
    'Add your full article in the admin panel — this is placeholder text from the static site migration.',
    6,
    true,
    '2026-03-12T00:00:00Z'
  ),
  (
    'schema-first-apis',
    'Schema-first APIs that actually stay in sync',
    'Zod + OpenAPI + codegen: patterns that reduced integration bugs on my last SaaS build.',
    'Add your full article in the admin panel — this is placeholder text from the static site migration.',
    8,
    true,
    '2026-02-02T00:00:00Z'
  ),
  (
    'consulting-retainers',
    'Retainers that feel fair on both sides',
    'Scope boundaries, communication rhythm, and what I put in writing before day one.',
    'Add your full article in the admin panel — this is placeholder text from the static site migration.',
    5,
    true,
    '2026-01-18T00:00:00Z'
  )
on conflict (slug) do nothing;
