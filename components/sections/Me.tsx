"use client";

import { motion } from "framer-motion";
import TagPill from "@/components/ui/TagPill";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { profile } from "@/lib/content";

export default function Me() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-none space-y-8"
    >
      <motion.div variants={staggerItem}>
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          {profile.meEyebrow}
        </p>
        <p className="mt-2 font-display text-4xl font-semibold tracking-tight">
          {profile.name}
        </p>
        <p className="mt-2 text-base text-muted">{profile.meSubtitle}</p>
      </motion.div>

      <motion.div variants={staggerItem} className="space-y-4 text-lg leading-relaxed text-foreground/95">
        {profile.meParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </motion.div>

      {/* Metrics after write-up — light surface, dark text (no white-on-white) */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl border border-black/10 bg-white/60 px-4 py-5 shadow-soft backdrop-blur-sm sm:px-6"
      >
        <div className="grid grid-cols-3 divide-x divide-black/10">
          {profile.metrics.map((m) => (
            <div
              key={m.label}
              className="flex flex-col items-center px-2 text-center first:pl-0 last:pr-0 sm:px-4"
            >
              <span className="font-display text-2xl font-semibold tabular-nums tracking-tight text-foreground sm:text-3xl">
                {m.value}
              </span>
              <span className="mt-2 max-w-[9rem] text-[10px] font-medium uppercase leading-snug tracking-[0.12em] text-muted sm:text-xs">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
        {profile.tags.map((t) => (
          <TagPill key={t}>{t}</TagPill>
        ))}
      </motion.div>

      <motion.div variants={staggerItem} className="glass-panel rounded-3xl p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {profile.currentlyBuilding.title}
        </p>
        <p className="font-display mt-2 text-xl font-semibold">
          {profile.currentlyBuilding.projectName}
        </p>
        <p className="mt-2 text-sm text-muted">
          {profile.currentlyBuilding.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
