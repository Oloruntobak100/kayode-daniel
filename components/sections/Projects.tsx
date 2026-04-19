"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { projects } from "@/lib/content";

export default function Projects() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-content pb-8"
    >
      <motion.div variants={staggerItem} className="mb-10">
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          Portfolio
        </p>
        <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight">
          Selected projects
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          A few builds that highlight product thinking, integrations, and polish.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <motion.div key={p.id} variants={staggerItem}>
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
