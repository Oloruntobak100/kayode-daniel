import { randomUUID } from "crypto";
import { fal } from "@fal-ai/client";
import { NextResponse } from "next/server";
import { createServiceRoleClient, isSupabaseConfigured } from "@/lib/supabase/server";

const FAL_MODEL = "fal-ai/flux/dev" as const;

function buildPrompt(title: string, description: string): string {
  const t = title.trim();
  const d = description.trim();
  const context = d ? `${t}. ${d}` : t;
  return `Professional portfolio thumbnail image, abstract modern tech aesthetic, clean composition, no text, no logos, high quality, subtle gradient lighting — inspired by: ${context.slice(0, 500)}`;
}

function extractImageUrl(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const images = d.images;
  if (Array.isArray(images) && images[0] && typeof images[0] === "object") {
    const first = images[0] as { url?: string };
    if (typeof first.url === "string") return first.url;
  }
  const image = d.image;
  if (image && typeof image === "object") {
    const im = image as { url?: string };
    if (typeof im.url === "string") return im.url;
  }
  return null;
}

export async function POST(request: Request) {
  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    return NextResponse.json(
      { error: "FAL_KEY is not configured" },
      { status: 503 }
    );
  }

  let body: { title?: string; description?: string; project_id?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = body.title?.trim() ?? "";
  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const description = body.description?.trim() ?? "";
  const prompt = buildPrompt(title, description);

  let result;
  try {
    result = await fal.subscribe(FAL_MODEL, {
      input: {
        prompt,
        image_size: "landscape_16_9",
        num_images: 1,
        enable_safety_checker: true,
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Fal request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const falUrl = extractImageUrl(result.data);
  if (!falUrl) {
    return NextResponse.json(
      { error: "Could not read image URL from Fal response" },
      { status: 502 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ image_url: falUrl, stored: false });
  }

  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ image_url: falUrl, stored: false });
  }

  let buffer: ArrayBuffer;
  let contentType = "image/jpeg";
  try {
    const imgRes = await fetch(falUrl);
    if (!imgRes.ok) {
      return NextResponse.json({ image_url: falUrl, stored: false });
    }
    contentType = imgRes.headers.get("content-type") ?? "image/jpeg";
    buffer = await imgRes.arrayBuffer();
  } catch {
    return NextResponse.json({ image_url: falUrl, stored: false });
  }

  const ext = contentType.includes("png") ? "png" : "jpg";
  const path = `${body.project_id ?? randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("portfolio-thumbnails")
    .upload(path, buffer, {
      contentType,
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json({
      image_url: falUrl,
      stored: false,
      storage_error: uploadError.message,
    });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("portfolio-thumbnails").getPublicUrl(path);

  return NextResponse.json({ image_url: publicUrl, stored: true });
}
