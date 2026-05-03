import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import type { Metadata } from "next";
import BlogMarkdown from "@/components/blog/BlogMarkdown";
import { getPublishedPostBySlug } from "@/lib/blog";

type Props = { params: { slug: string } };

function siteUrl(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    return { title: "Not found" };
  }
  const title = post.title;
  const description = post.excerpt ?? title;
  const canonical = siteUrl() ? `${siteUrl()}/blog/${slug}` : undefined;
  return {
    title: `${title} — Kayode Daniel`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const dateLabel =
    post.publishedAt != null
      ? new Date(post.publishedAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-content px-4 py-10 pb-24 pt-[calc(5rem+env(safe-area-inset-top))] sm:px-6 md:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 text-accent" aria-hidden />
          Back to site
        </Link>

        <article className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Writing
          </p>
          <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
            {dateLabel ? (
              <time dateTime={post.publishedAt ?? undefined}>{dateLabel}</time>
            ) : null}
            {post.readingTimeMinutes != null ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" aria-hidden />
                {post.readingTimeMinutes} min read
              </span>
            ) : null}
          </div>

          <BlogMarkdown content={post.body} className="mt-12 max-w-none" />
        </article>
      </div>
    </div>
  );
}
