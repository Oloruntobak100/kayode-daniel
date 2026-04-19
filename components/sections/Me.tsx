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
      className="mx-auto max-w-content space-y-8"
    >
      <motion.div variants={staggerItem}>
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          About
        </p>
        <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight">
          {profile.name}
        </h2>
        <p className="mt-2 text-muted">{profile.location}</p>
      </motion.div>

      <motion.p variants={staggerItem} className="text-lg leading-relaxed">
        {profile.bio}
      </motion.p>

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
