import { createServiceRoleClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { blogPosts } from "@/lib/content";

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  reading_time_minutes: number | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

/** Public list item (published only) */
export type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string | null;
  readingTimeMinutes: number | null;
  publishedAt: string | null;
};

function mapListRow(row: {
  slug: string;
  title: string;
  excerpt: string | null;
  reading_time_minutes: number | null;
  published_at: string | null;
}): BlogListItem {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    readingTimeMinutes: row.reading_time_minutes,
    publishedAt: row.published_at,
  };
}

function staticBlogList(): BlogListItem[] {
  return blogPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    readingTimeMinutes: p.readingTimeMinutes,
    publishedAt: p.date,
  }));
}

export async function getPublishedBlogListWithMeta(): Promise<{
  posts: BlogListItem[];
  source: "supabase" | "static";
}> {
  if (!isSupabaseConfigured()) {
    return { posts: staticBlogList(), source: "static" };
  }
  const supabase = createServiceRoleClient();
  if (!supabase) {
    return { posts: staticBlogList(), source: "static" };
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, reading_time_minutes, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    return { posts: staticBlogList(), source: "static" };
  }

  if (!data?.length) {
    return { posts: [], source: "supabase" };
  }

  return {
    posts: data.map((row) => mapListRow(row)),
    source: "supabase",
  };
}

export type BlogPostPublic = BlogListItem & {
  body: string;
};

export async function getPublishedPostBySlug(
  slug: string
): Promise<BlogPostPublic | null> {
  if (!isSupabaseConfigured()) {
    const p = blogPosts.find((x) => x.slug === slug);
    if (!p) return null;
    return {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      readingTimeMinutes: p.readingTimeMinutes,
      publishedAt: p.date,
      body: `_This post is from static placeholder content. Connect Supabase and run blog migrations to load full articles from the database._\n\n${p.excerpt}`,
    };
  }

  const supabase = createServiceRoleClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "slug, title, excerpt, body, reading_time_minutes, published_at"
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return null;

  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    readingTimeMinutes: data.reading_time_minutes,
    publishedAt: data.published_at,
    body: data.body ?? "",
  };
}
