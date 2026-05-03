"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { BlogListItem } from "@/lib/blog";
import { cn } from "@/lib/utils";

type BlogSource = "supabase" | "static";

type Props = {
  initialPosts: BlogListItem[];
  blogSource: BlogSource;
};

export default function Blog({ initialPosts, blogSource }: Props) {
  const [posts, setPosts] = useState(initialPosts);
  const [source, setSource] = useState(blogSource);

  useEffect(() => {
    setPosts(initialPosts);
    setSource(blogSource);
  }, [initialPosts, blogSource]);

  useEffect(() => {
    let cancelled = false;
    async function refresh() {
      try {
        const res = await fetch("/api/blog", { cache: "no-store" });
        if (!res.ok || cancelled) return;
        const json = (await res.json()) as {
          posts?: BlogListItem[];
          source?: BlogSource;
        };
        if (cancelled) return;
        if (json.posts) setPosts(json.posts);
        if (json.source) setSource(json.source);
      } catch {
        /* keep SSR props */
      }
    }
    void refresh();
    return () => {
      cancelled = true;
    };
  }, []);

  const isLive = source === "supabase" && posts.length > 0;
  const isEmptyDb = source === "supabase" && posts.length === 0;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-content pb-10"
    >
      <motion.div variants={staggerItem} className="mb-12">
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          Writing
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Notes & essays
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          {isLive ? (
            <>
              Long-form notes on delivery, systems design, and consulting practice.
            </>
          ) : isEmptyDb ? (
            <>
              Posts will appear here once you add them in the admin (Supabase connected,
              no published posts yet).
            </>
          ) : (
            <>
              Placeholder entries for layout; connect Supabase and publish posts from the
              admin panel.
            </>
          )}
        </p>
      </motion.div>

      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <motion.article key={post.slug} variants={staggerItem}>
            <Link
              href={`/blog/${post.slug}`}
              className={cn(
                "group block rounded-2xl border border-black/10 bg-white/70 p-6 shadow-soft backdrop-blur-md transition",
                "hover:border-accent/25 hover:shadow-glass"
              )}
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                {post.publishedAt ? (
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                ) : null}
                {post.readingTimeMinutes != null ? (
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden />
                    {post.readingTimeMinutes} min read
                  </span>
                ) : null}
              </div>
              <h3 className="font-display mt-4 text-xl font-semibold tracking-tight transition group-hover:text-accent sm:text-2xl">
                {post.title}
              </h3>
              {post.excerpt ? (
                <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
              ) : null}
              <span className="mt-4 inline-block text-sm font-medium text-accent opacity-0 transition group-hover:opacity-100">
                Read article →
              </span>
            </Link>
          </motion.article>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-12 text-center text-sm text-muted">
          No published posts yet.
        </p>
      ) : null}
    </motion.div>
  );
}
