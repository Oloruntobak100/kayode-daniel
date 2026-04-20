"use client";

import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Cloud,
  Code2,
  Database,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { skillsMarqueeItems as strip } from "@/lib/content";
import { cn } from "@/lib/utils";

type StripItem = (typeof strip)[number];

function iconForSkill(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (
    n.includes("power") ||
    n.includes("dax") ||
    n.includes("viz") ||
    n.includes("schema")
  )
    return BarChart3;
  if (
    n.includes("n8n") ||
    n.includes("webhook") ||
    n.includes("orchestr")
  )
    return Workflow;
  if (n.includes("sql") || n.includes("supabase")) return Database;
  if (
    n.includes("vercel") ||
    n.includes("deploy") ||
    n.includes("cloud")
  )
    return Cloud;
  return Code2;
}

function SkillStripCard({ item }: { item: StripItem }) {
  const Icon = iconForSkill(item.name);
  return (
    <div
      className={cn(
        "flex min-w-[13.5rem] shrink-0 items-center gap-3 rounded-2xl border border-black/10 bg-white/75 px-4 py-3 shadow-soft backdrop-blur-md transition sm:min-w-[15rem] sm:px-5 sm:py-3.5",
        "hover:border-accent/35 hover:shadow-glass"
      )}
    >
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="font-display text-base font-semibold uppercase tracking-wide text-foreground">
          {item.name}
        </p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
          {item.group}
        </p>
      </div>
    </div>
  );
}

function MarqueeTrack({
  items,
  direction,
}: {
  items: readonly StripItem[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  const anim =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div
      className="group/marquee relative overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className={cn(
          "flex w-max gap-4 pr-4 will-change-transform",
          anim,
          "motion-reduce:animate-none",
          "group-hover/marquee:[animation-play-state:paused]"
        )}
      >
        {doubled.map((item, idx) => (
          <SkillStripCard key={`${item.id}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const mid = Math.ceil(strip.length / 2);
  const rowForward = strip.slice(0, mid);
  const rowReverse = strip.slice(mid);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-none space-y-10 pb-10"
    >
      <motion.div
        variants={staggerItem}
        className="relative overflow-hidden rounded-3xl px-1 pb-2 pt-1"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(79,110,247,0.09),transparent_58%)]"
        />
        <div className="relative space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">
            Inventory
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-foreground">The </span>
            <span className="bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
              tech stack
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
            Tools and platforms I use across delivery — infinite scroll preview;
            hover a row to pause.
          </p>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="space-y-6">
        <MarqueeTrack items={rowForward} direction="right" />
        <MarqueeTrack items={rowReverse} direction="left" />
      </motion.div>

      <motion.p
        variants={staggerItem}
        className="text-center text-xs text-muted"
      >
        Categories mirror your structured stack in{" "}
        <code className="font-mono text-[10px]">lib/portfolio-source.ts</code>.
      </motion.p>
    </motion.div>
  );
}
