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

      <motion.div
        variants={staggerItem}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] px-4 py-6 shadow-lg sm:px-6"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-red-950/35 via-transparent to-transparent"
        />
        <div className="relative grid grid-cols-3 divide-x divide-white/[0.08]">
          {profile.metrics.map((m) => (
            <div key={m.label} className="flex flex-col px-3 text-left first:pl-0 last:pr-0 sm:px-6">
              <span className="font-display text-3xl font-semibold tabular-nums tracking-tight text-white sm:text-4xl">
                {m.value}
              </span>
              <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/45 sm:text-xs">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="space-y-4 text-lg leading-relaxed">
        {profile.meParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
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
