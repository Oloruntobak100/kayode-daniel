"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Database, Sparkles, Workflow } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { skillsByCategory } from "@/lib/content";

const icons = [Code2, Cpu, Database, Workflow, Sparkles] as const;

export default function Skills() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-none space-y-10 pb-8"
    >
      <motion.div variants={staggerItem}>
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          Expertise
        </p>
        <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight">
          Skills & tools
        </h2>
      </motion.div>

      {skillsByCategory.map((cat, idx) => {
        const Icon = icons[idx % icons.length];
        return (
          <motion.section
            key={cat.id}
            variants={staggerItem}
            className="space-y-4 rounded-3xl border border-black/10 bg-white/40 p-6 shadow-soft backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display text-xl font-semibold">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((s, skillIdx) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                    delay: skillIdx * 0.035,
                  }}
                  className="rounded-pill border border-black/10 bg-foreground px-3 py-1 font-mono text-xs text-background"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.section>
        );
      })}
    </motion.div>
  );
}
