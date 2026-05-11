import { randomUUID } from "crypto";
import { fal } from "@fal-ai/client";
import { NextResponse } from "next/server";
import {
  buildGigBannerPrompt,
  FIVERR_GIG_BANNER_HEIGHT,
  FIVERR_GIG_BANNER_WIDTH,
  parseGigKeywords,
} from "@/lib/gig-banner-prompt";
import { createServiceRoleClient } from "@/lib/supabase/server";

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

  let title = "";
  let keywordsRaw = "";
  try {
    const body = (await request.json()) as {
      title?: string;
      keywords?: string;
    };
    title = body.title?.trim() ?? "";
    keywordsRaw =
      typeof body.keywords === "string" ? body.keywords : "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const keywords = parseGigKeywords(keywordsRaw);
  const prompt = buildGigBannerPrompt(title, keywords);

  fal.config({ credentials: falKey });

  let imageUrl: string | undefined;
  try {
    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt,
        image_size: {
          width: FIVERR_GIG_BANNER_WIDTH,
          height: FIVERR_GIG_BANNER_HEIGHT,
        },
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

  const path = `gig-banners/${randomUUID()}.${ext}`;

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

  return NextResponse.json({
    url: publicUrl,
    width: FIVERR_GIG_BANNER_WIDTH,
    height: FIVERR_GIG_BANNER_HEIGHT,
  });
}
