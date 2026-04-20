"use client";

import { motion } from "framer-motion";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { experienceOverview, experienceTimeline } from "@/lib/content";

export default function Experience() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-none space-y-10"
    >
      <motion.div variants={staggerItem}>
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          Experience
        </p>
        <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight">
          Career timeline
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{experienceOverview}</p>
      </motion.div>

      <motion.div variants={staggerItem}>
        <ExperienceTimeline entries={experienceTimeline} />
      </motion.div>
    </motion.div>
  );
}
