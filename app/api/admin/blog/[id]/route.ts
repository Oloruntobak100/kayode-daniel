import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isValidBlogSlug } from "@/lib/blog-slug";
import { createServiceRoleClient } from "@/lib/supabase/server";

function revalidateBlogPages(slug?: string | null) {
  revalidatePath("/", "layout");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Ctx) {
  const { id } = await context.params;
  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 }
    );
  }

  const { data: existing } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

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

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (body.slug !== undefined) {
    const s = body.slug.trim();
    if (!s || !isValidBlogSlug(s)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
    patch.slug = s;
  }
  if (body.title !== undefined) {
    const t = body.title.trim();
    if (!t) {
      return NextResponse.json({ error: "title cannot be empty" }, { status: 400 });
    }
    patch.title = t;
  }
  if (body.excerpt !== undefined) patch.excerpt = body.excerpt?.trim() || null;
  if (body.body !== undefined) patch.body = body.body ?? "";
  if (body.reading_time_minutes !== undefined) {
    patch.reading_time_minutes =
      body.reading_time_minutes != null
        ? Math.max(0, Math.floor(body.reading_time_minutes))
        : null;
  }
  if (body.published !== undefined) {
    patch.published = Boolean(body.published);
  }
  if (body.thumbnail_url !== undefined) {
    patch.thumbnail_url = body.thumbnail_url?.trim() || null;
  }
  if (body.published_at !== undefined) {
    const raw = body.published_at?.trim();
    patch.published_at = raw ? new Date(raw).toISOString() : null;
  } else if (body.published === false) {
    patch.published_at = null;
  } else if (body.published === true) {
    patch.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .update(patch)
    .eq("id", id)
    .select("id, slug")
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

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  revalidateBlogPages(data.slug);
  if (existing?.slug && existing.slug !== data.slug) {
    revalidateBlogPages(existing.slug);
  }

  return NextResponse.json({ ok: true, slug: data.slug });
}

export async function DELETE(_request: Request, context: Ctx) {
  const { id } = await context.params;
  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 }
    );
  }

  const { data: row } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateBlogPages(row?.slug ?? undefined);

  return NextResponse.json({ ok: true });
}
