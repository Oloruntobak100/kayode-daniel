import Link from "next/link";
import { House } from "lucide-react";
import type { Metadata } from "next";
import Blog from "@/components/sections/Blog";
import { getPublishedBlogListWithMeta } from "@/lib/blog";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Notes & essays — Kayode Daniel",
  description:
    "Long-form notes on delivery, systems design, and consulting practice.",
};

export default async function BlogIndexPage() {
  const blog = await getPublishedBlogListWithMeta();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-content px-4 py-10 pb-24 pt-[calc(5rem+env(safe-area-inset-top))] sm:px-6 md:py-14">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            aria-label="Kayode Daniel — portfolio home"
            title="Kayode Daniel — portfolio home"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-black/10 bg-white/60 px-3 py-2 text-sm font-semibold text-muted shadow-sm backdrop-blur-sm transition hover:border-accent/35 hover:text-foreground"
          >
            <House className="h-5 w-5 shrink-0 text-accent" strokeWidth={2} aria-hidden />
            <span>Kayode Daniel</span>
          </Link>
        </div>

        <div className="mt-10">
          <Blog initialPosts={blog.posts} blogSource={blog.source} />
        </div>
      </div>
    </div>
  );
}
