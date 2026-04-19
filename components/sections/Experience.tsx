"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import {
  enterpriseSystems,
  experienceOverview,
  healthcareDeployments,
  priorExperience,
} from "@/lib/content";

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
          Programs & deployments
        </h2>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          {experienceOverview}
        </p>
      </motion.div>

      <motion.section variants={staggerItem} className="space-y-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            {enterpriseSystems.sectionTitle}
          </p>
          <p className="mt-2 text-muted">{enterpriseSystems.intro}</p>
        </div>
        <ul className="space-y-3">
          {enterpriseSystems.programs.map((p) => (
            <li
              key={p.shortName}
              className="rounded-2xl border border-black/10 bg-white/35 px-4 py-3 text-sm backdrop-blur-md"
            >
              <span className="font-semibold text-foreground">{p.shortName}</span>
              <span className="text-muted"> — </span>
              <span className="text-foreground/90">{p.name}</span>
            </li>
          ))}
        </ul>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Role & contribution
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-foreground/90">
            {enterpriseSystems.roleSummary.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </motion.section>

      <motion.section variants={staggerItem} className="space-y-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            {healthcareDeployments.sectionTitle}
          </p>
          <p className="mt-2 text-muted">{healthcareDeployments.intro}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Hospitals & clients
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {healthcareDeployments.hospitals.map((h) => (
              <li key={h}>
                <span className="inline-block rounded-full border border-black/10 bg-white/40 px-3 py-1 text-xs backdrop-blur-sm">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Delivery scope
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-foreground/90">
            {healthcareDeployments.deliveryHighlights.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Impact
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/90">
            {healthcareDeployments.impact.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </motion.section>

      <motion.section variants={staggerItem} className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          Earlier roles
        </p>
        {priorExperience.map((job) => (
          <div
            key={job.organization}
            className="rounded-3xl border border-black/10 bg-white/35 p-6 backdrop-blur-md"
          >
            <p className="font-display text-lg font-semibold">{job.organization}</p>
            <p className="mt-1 text-sm font-medium text-foreground/80">{job.role}</p>
            <p className="text-xs text-muted">{job.period}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-foreground/90">
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </motion.section>
    </motion.div>
  );
}
