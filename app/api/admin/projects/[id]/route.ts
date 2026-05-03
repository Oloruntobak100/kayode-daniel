import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isValidShowcaseCategoryId } from "@/lib/portfolio-categories";
import { createServiceRoleClient } from "@/lib/supabase/server";

function revalidatePortfolioPages() {
  revalidatePath("/", "layout");
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

  let body: {
    title?: string;
    description?: string;
    content_image_url?: string | null;
    category_id?: string;
    image_url?: string | null;
    sort_order?: number;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (body.title !== undefined) {
    const t = body.title.trim();
    if (!t) {
      return NextResponse.json({ error: "title cannot be empty" }, { status: 400 });
    }
    patch.title = t;
  }
  if (body.description !== undefined) patch.description = body.description ?? "";
  if (body.content_image_url !== undefined) {
    patch.content_image_url = body.content_image_url?.trim() || null;
  }
  if (body.category_id !== undefined) {
    if (!isValidShowcaseCategoryId(body.category_id)) {
      return NextResponse.json({ error: "Invalid category_id" }, { status: 400 });
    }
    patch.category_id = body.category_id;
  }
  if (body.image_url !== undefined) {
    patch.image_url = body.image_url?.trim() || null;
  }
  if (body.sort_order !== undefined) patch.sort_order = body.sort_order;

  const { data, error } = await supabase
    .from("portfolio_projects")
    .update(patch)
    .eq("id", id)
    .select(
      "id, title, description, content_image_url, category_id, image_url, sort_order"
    )
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  revalidatePortfolioPages();

  return NextResponse.json({ ok: true });
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

  const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePortfolioPages();

  return NextResponse.json({ ok: true });
}
