import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock3, House } from "lucide-react";
import type { Metadata } from "next";
import BlogMarkdown from "@/components/blog/BlogMarkdown";
import { getPublishedPostBySlug } from "@/lib/blog";
import { cn } from "@/lib/utils";

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
  const ogImage =
    post.thumbnailUrl != null ? [{ url: post.thumbnailUrl }] : undefined;
  return {
    title: `${title} — Kayode Daniel`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.thumbnailUrl != null ? [post.thumbnailUrl] : undefined,
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
          aria-label="Kayode Daniel — portfolio home"
          title="Kayode Daniel — portfolio home"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-black/10 bg-white/60 px-3 py-2 text-sm font-semibold text-muted shadow-sm backdrop-blur-sm transition hover:border-accent/35 hover:text-foreground"
        >
          <House className="h-5 w-5 shrink-0 text-accent" strokeWidth={2} aria-hidden />
          <span>Kayode Daniel</span>
        </Link>

        <article className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Writing
          </p>
          {post.thumbnailUrl ? (
            <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-black/8 bg-black/5">
              <Image
                src={post.thumbnailUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
              />
            </div>
          ) : null}
          <h1
            className={cn(
              "font-display text-3xl font-semibold tracking-tight sm:text-4xl",
              post.thumbnailUrl ? "mt-8" : "mt-3"
            )}
          >
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
