import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 6 * 1024 * 1024;

function extForMime(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  return "jpg";
}

export async function POST(request: Request) {
  const supabase = createServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const mime = file.type || "application/octet-stream";
  if (!ALLOWED.has(mime)) {
    return NextResponse.json(
      { error: "Use JPEG, PNG, WebP, or GIF" },
      { status: 400 }
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.byteLength > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image too large (max 6 MB)" },
      { status: 400 }
    );
  }

  const path = `content/${randomUUID()}.${extForMime(mime)}`;

  const { error: uploadError } = await supabase.storage
    .from("portfolio-thumbnails")
    .upload(path, buf, {
      contentType: mime,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: uploadError.message },
      { status: 500 }
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("portfolio-thumbnails").getPublicUrl(path);

  return NextResponse.json({ url: publicUrl });
}
