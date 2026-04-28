"use client";

import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CalendarRange,
  ChevronRight,
  Code2,
  Landmark,
  Layers2,
  Stethoscope,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";
import { experienceTimeline } from "@/lib/portfolio-source";
import { cn } from "@/lib/utils";

type TimelineEntry = (typeof experienceTimeline)[number];

function ChevronBulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((line) => (
        <li key={line} className="flex gap-2 text-sm leading-relaxed text-foreground/85">
          <ChevronRight
            className="mt-0.5 h-4 w-4 shrink-0 text-muted"
            aria-hidden
          />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

/** Notable project rows — uniform icon badge + optional `Title — subtitle` split */
function ProgramLines({ lines }: { lines: readonly string[] }) {
  return (
    <div className="space-y-3.5">
      {lines.map((line) => {
        const parts = line.split(" — ");
        const rest = parts.slice(1).join(" — ").trim();
        const hasSecondary = parts.length > 1 && rest.length > 0;
        return (
          <div key={line} className="flex gap-3">
            <span
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.09] bg-gradient-to-b from-white to-neutral-50 shadow-soft ring-1 ring-black/[0.03]"
              aria-hidden
            >
              <Layers2
                className="h-[18px] w-[18px] text-[color:var(--accent)]"
                strokeWidth={1.65}
              />
            </span>
            <p className="min-w-0 flex-1 border-l border-black/10 pl-3 pt-1 text-sm leading-snug text-foreground/90 md:pt-0.5">
              <span className="font-semibold text-foreground">{parts[0]}</span>
              {hasSecondary ? (
                <>
                  <span className="text-muted"> — </span>
                  <span>{rest}</span>
                </>
              ) : null}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function DatePill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-pill border border-black/12 bg-white px-3 py-2 text-xs font-medium text-foreground shadow-soft backdrop-blur-sm md:text-sm">
      <CalendarRange className="h-3.5 w-3.5 text-muted" aria-hidden />
      <span className="tracking-tight">{label}</span>
    </div>
  );
}

function TimelineNode({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-black/15 bg-background shadow-soft md:h-12 md:w-12">
      <Icon className="h-[18px] w-[18px] text-foreground md:h-5 md:w-5" aria-hidden />
    </div>
  );
}

function iconFor(id: TimelineEntry["id"]): LucideIcon {
  switch (id) {
    case "maybeach":
      return Landmark;
    case "hyella":
      return Stethoscope;
    case "freelance":
      return Workflow;
    default:
      return Code2;
  }
}

function TimelineCardBody({ entry }: { entry: TimelineEntry }) {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {entry.eyebrow}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{entry.intro}</p>
      <div className="mt-6 space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {entry.projectsSectionTitle}
        </p>
        <ProgramLines lines={entry.programs} />
      </div>
      <div className="mt-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {entry.roleSectionTitle}
        </p>
        <div className="mt-4">
          <ChevronBulletList items={entry.roleBullets} />
        </div>
      </div>
    </>
  );
}

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  return (
    <motion.article
      className={cn(
        "w-full rounded-2xl border border-black/10 bg-white/75 p-5 shadow-glass backdrop-blur-xl md:p-7"
      )}
    >
      <h3 className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
        {entry.role}
      </h3>
      <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted">
        <Building2 className="h-4 w-4 shrink-0 text-muted" aria-hidden />
        <span className="font-medium text-foreground">{entry.organization}</span>
        <span className="text-muted/80">·</span>
        <span>{entry.location}</span>
      </p>
      <div className="mt-6 border-t border-black/10 pt-6">
        <TimelineCardBody entry={entry} />
      </div>
    </motion.article>
  );
}

export default function ExperienceTimeline({
  entries,
}: {
  entries: typeof experienceTimeline;
}) {
  return (
    <div className="relative">
      <div className="space-y-14 md:space-y-0">
        {entries.map((entry, index) => {
          const Icon = iconFor(entry.id);
          const leftIsDate = index % 2 === 0;
          const isLast = index === entries.length - 1;

          return (
            <div key={entry.id} className="relative md:pb-28 md:last:pb-12">
              {/* Mobile */}
              <div className="flex gap-5 pl-1 md:hidden">
                <div className="relative flex shrink-0 flex-col items-center">
                  <TimelineNode Icon={Icon} />
                  {!isLast && (
                    <div className="mt-2 min-h-[4rem] w-px flex-1 bg-black/10" aria-hidden />
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-5 pb-4">
                  <DatePill label={entry.periodLabel} />
                  <TimelineCard entry={entry} />
                </div>
              </div>

              {/* Desktop alternating — 30% date column / 70% content column (swap when date flips side) */}
              <div
                className={cn(
                  "relative hidden md:grid md:gap-x-4",
                  leftIsDate
                    ? "md:grid-cols-[minmax(0,3fr)_48px_minmax(0,7fr)]"
                    : "md:grid-cols-[minmax(0,7fr)_48px_minmax(0,3fr)]"
                )}
              >
                <div
                  className={cn(
                    "flex pt-3 md:items-start",
                    leftIsDate ? "justify-end pr-8" : "justify-start pl-8"
                  )}
                >
                  {leftIsDate ? (
                    <DatePill label={entry.periodLabel} />
                  ) : (
                    <TimelineCard entry={entry} />
                  )}
                </div>

                <div className="relative flex flex-col items-center pt-3">
                  <TimelineNode Icon={Icon} />
                  {!isLast && (
                    <div
                      className="absolute left-1/2 top-[3.25rem] h-[calc(100%+5rem)] w-px -translate-x-1/2 bg-black/10"
                      aria-hidden
                    />
                  )}
                </div>

                <div
                  className={cn(
                    "flex pt-3 md:items-start",
                    leftIsDate ? "justify-start pl-8" : "justify-end pr-8"
                  )}
                >
                  {leftIsDate ? (
                    <TimelineCard entry={entry} />
                  ) : (
                    <DatePill label={entry.periodLabel} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
