import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isValidShowcaseCategoryId } from "@/lib/portfolio-categories";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { isYouTubeUrl } from "@/lib/youtube";

function revalidatePortfolioPages() {
  revalidatePath("/", "layout");
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
    .from("portfolio_projects")
    .select(
      "id, title, description, content_image_url, youtube_url, project_url, category_id, image_url, sort_order, created_at, updated_at"
    )
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const projects = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    content_image_url: row.content_image_url,
    youtube_url: row.youtube_url,
    project_url: row.project_url,
    category_id: row.category_id,
    image_url: row.image_url,
    sort_order: row.sort_order ?? 0,
  }));

  return NextResponse.json({ projects });
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
    title?: string;
    description?: string;
    content_image_url?: string | null;
    youtube_url?: string | null;
    project_url?: string | null;
    category_id?: string;
    image_url?: string | null;
    sort_order?: number;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = body.title?.trim();
  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const category_id = body.category_id?.trim();
  if (!category_id || !isValidShowcaseCategoryId(category_id)) {
    return NextResponse.json({ error: "Invalid category_id" }, { status: 400 });
  }

  const image_url = body.image_url?.trim() || null;

  const youtube_raw = body.youtube_url?.trim() || null;
  if (youtube_raw && !isYouTubeUrl(youtube_raw)) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  let project_url: string | null = null;
  if (body.project_url?.trim()) {
    try {
      const u = new URL(body.project_url.trim());
      if (u.protocol !== "http:" && u.protocol !== "https:") {
        return NextResponse.json({ error: "Invalid project URL" }, { status: 400 });
      }
      project_url = u.toString();
    } catch {
      return NextResponse.json({ error: "Invalid project URL" }, { status: 400 });
    }
  }

  const { data: maxRow } = await supabase
    .from("portfolio_projects")
    .select("sort_order")
    .eq("category_id", category_id)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextSortOrder = (maxRow?.sort_order ?? -1) + 1;

  const { data, error } = await supabase
    .from("portfolio_projects")
    .insert({
      title,
      description: body.description?.trim() ?? "",
      content_image_url: body.content_image_url?.trim() || null,
      youtube_url: youtube_raw,
      project_url,
      category_id,
      image_url,
      sort_order: nextSortOrder,
    })
    .select(
      "id, title, description, content_image_url, youtube_url, project_url, category_id, image_url, sort_order"
    )
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePortfolioPages();

  return NextResponse.json({ id: data.id });
}
