import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isValidBlogSlug } from "@/lib/blog-slug";
import { createServiceRoleClient } from "@/lib/supabase/server";

function revalidateBlogPages(slug?: string) {
  revalidatePath("/", "layout");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}

export async function GET() {
  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, excerpt, body, reading_time_minutes, published, published_at, thumbnail_url, created_at, updated_at"
    )
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: data ?? [] });
}

export async function POST(request: Request) {
  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 }
    );
  }

  let body: {
    slug?: string;
    title?: string;
    excerpt?: string | null;
    body?: string;
    reading_time_minutes?: number | null;
    published?: boolean;
    published_at?: string | null;
    thumbnail_url?: string | null;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const slug = body.slug?.trim();
  if (!slug || !isValidBlogSlug(slug)) {
    return NextResponse.json(
      { error: "Invalid slug — use lowercase letters, numbers, and hyphens only" },
      { status: 400 }
    );
  }

  const title = body.title?.trim();
  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const published = Boolean(body.published);
  let published_at: string | null = null;
  if (published) {
    published_at =
      body.published_at?.trim() ||
      new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      slug,
      title,
      excerpt: body.excerpt?.trim() || null,
      body: body.body?.trim() ?? "",
      reading_time_minutes:
        body.reading_time_minutes != null
          ? Math.max(0, Math.floor(body.reading_time_minutes))
          : null,
      published,
      published_at,
      thumbnail_url: body.thumbnail_url?.trim() || null,
    })
    .select("id, slug, title")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateBlogPages(data.slug);

  return NextResponse.json({ id: data.id, slug: data.slug });
}
