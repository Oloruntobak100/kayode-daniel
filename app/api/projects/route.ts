import { NextResponse } from "next/server";
import { getPortfolioShowcaseProjectsWithMeta } from "@/lib/portfolio-projects";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Public read of showcase projects — same data as the home page server fetch. */
export async function GET() {
  const { projects, source } = await getPortfolioShowcaseProjectsWithMeta();

  return NextResponse.json(
    { projects, source },
    {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    }
  );
}
