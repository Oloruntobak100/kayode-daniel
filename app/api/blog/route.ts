import { NextResponse } from "next/server";
import { getPublishedBlogListWithMeta } from "@/lib/blog";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const { posts, source } = await getPublishedBlogListWithMeta();

  return NextResponse.json(
    { posts, source },
    {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    }
  );
}
