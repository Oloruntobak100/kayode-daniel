"use client";

import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { blogPosts } from "@/lib/content";

export default function Blog() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-content space-y-8 pb-8"
    >
      <motion.div variants={staggerItem}>
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          Writing
        </p>
        <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight">
          Notes & essays
        </h2>
      </motion.div>

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <motion.article
            key={post.slug}
            variants={staggerItem}
            className="glass-panel group cursor-pointer rounded-3xl p-6 transition hover:-translate-y-0.5 hover:shadow-glass"
            data-cursor-hover
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3.5 w-3.5" />
                {post.readingTimeMinutes} min read
              </span>
            </div>
            <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight group-hover:text-accent">
              {post.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
