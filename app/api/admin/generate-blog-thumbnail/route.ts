import { randomUUID } from "crypto";
import { fal } from "@fal-ai/client";
import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

function buildPrompt(title: string): string {
  const t = title.trim();
  return (
    `Editorial blog hero thumbnail: visually compelling, professional, and clearly related to the topic "${t}". ` +
    `Modern composition, engaging lighting, high detail, suitable for a website article card. ` +
    `No text, letters, logos, or watermarks in the image.`
  );
}

export async function POST(request: Request) {
  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    return NextResponse.json(
      { error: "FAL_KEY is not configured" },
      { status: 503 }
    );
  }

  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 }
    );
  }

  let title: string;
  try {
    const body = (await request.json()) as { title?: string };
    title = body.title?.trim() ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  fal.config({ credentials: falKey });

  let imageUrl: string | undefined;
  try {
    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: buildPrompt(title),
        image_size: "landscape_16_9",
        num_images: 1,
      },
    });

    const data = result.data as { images?: { url?: string }[] } | undefined;
    imageUrl = data?.images?.[0]?.url;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Fal generation failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  if (!imageUrl) {
    return NextResponse.json(
      { error: "No image returned from Fal" },
      { status: 502 }
    );
  }

  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) {
    return NextResponse.json(
      { error: "Failed to download generated image" },
      { status: 502 }
    );
  }

  const buf = Buffer.from(await imgRes.arrayBuffer());
  const rawType = imgRes.headers.get("content-type") || "";
  const contentType = rawType.startsWith("image/")
    ? rawType
    : "image/jpeg";
  const ext =
    contentType.includes("png")
      ? "png"
      : contentType.includes("webp")
        ? "webp"
        : "jpg";

  const path = `blog/covers/${randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("portfolio-thumbnails")
    .upload(path, buf, {
      contentType,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("portfolio-thumbnails").getPublicUrl(path);

  return NextResponse.json({ url: publicUrl });
}
