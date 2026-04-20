"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import ShowcaseProjectCard from "@/components/ui/ShowcaseProjectCard";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { ProjectPortfolioCategoryId } from "@/lib/portfolio-source";
import {
  portfolioShowcaseProjects,
  projectPortfolioCategories,
} from "@/lib/content";
import { cn } from "@/lib/utils";

function categoryLabelFor(
  categoryId: (typeof portfolioShowcaseProjects)[number]["categoryId"]
): string {
  const row = projectPortfolioCategories.find((c) => c.id === categoryId);
  return row?.label ?? categoryId;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] =
    useState<ProjectPortfolioCategoryId>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return [...portfolioShowcaseProjects];
    return portfolioShowcaseProjects.filter(
      (p) => p.categoryId === activeFilter
    );
  }, [activeFilter]);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-none pb-10"
    >
      <motion.div variants={staggerItem} className="mb-8 md:mb-10">
        <div className="relative inline-block">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Portfolio
          </p>
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-[3px] w-[min(100%,7rem)] rounded-full bg-accent"
          />
        </div>
        <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight">
          Selected work
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Filter by engagement type — dummy entries for layout; swap in real assets
          from your admin later.
        </p>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="mb-10 flex flex-wrap gap-2 md:gap-3"
        role="tablist"
        aria-label="Project categories"
      >
        {projectPortfolioCategories.map((cat) => {
          const selected = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selected}
              data-cursor-hover
              onClick={() => setActiveFilter(cat.id)}
              className={cn(
                "rounded-pill border px-4 py-2 text-xs font-medium transition md:text-sm",
                selected
                  ? "border-accent/45 bg-accent/12 text-foreground shadow-soft ring-2 ring-accent/25"
                  : "border-black/10 bg-white/55 text-foreground/85 backdrop-blur-sm hover:border-black/18"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {filtered.map((p) => (
          <ShowcaseProjectCard
            key={p.id}
            title={p.title}
            categoryLabel={categoryLabelFor(p.categoryId)}
            imageSrc={p.imageSrc}
          />
        ))}
      </motion.div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted">
          Nothing in this category yet — pick another filter.
        </p>
      ) : null}
    </motion.div>
  );
}
