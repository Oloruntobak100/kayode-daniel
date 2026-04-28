"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CalendarRange,
  ChevronDown,
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
type FreelanceEntry = Extract<TimelineEntry, { id: "freelance" }>;

function isFreelanceEntry(e: TimelineEntry): e is FreelanceEntry {
  return e.id === "freelance";
}

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

type ProgramGroup = FreelanceEntry["programGroups"][number];

function FreelanceNotableAccordion({ groups }: { groups: readonly ProgramGroup[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-2.5">
      {groups.map((group) => {
        const isOpen = !!open[group.id];
        const panelId = `freelance-panel-${group.id}`;
        const btnId = `freelance-trigger-${group.id}`;

        return (
          <div
            key={group.id}
            className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white/70 shadow-soft ring-1 ring-black/[0.02] backdrop-blur-sm transition-shadow hover:shadow-md hover:ring-black/[0.04]"
          >
            <button
              id={btnId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() =>
                setOpen((prev) => ({ ...prev, [group.id]: !prev[group.id] }))
              }
              className="flex w-full items-center gap-3 px-3.5 py-3 text-left transition-colors hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/35 md:px-4 md:py-3.5"
            >
              <span
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.09] bg-gradient-to-b from-white to-neutral-50 shadow-soft ring-1 ring-black/[0.03]"
                aria-hidden
              >
                <Layers2
                  className="h-[18px] w-[18px] text-[color:var(--accent)]"
                  strokeWidth={1.65}
                />
              </span>
              <span className="min-w-0 flex-1 font-semibold text-sm leading-snug text-foreground">
                {group.title}
              </span>
              <span
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-neutral-50/90 px-2.5 py-0.5 text-[11px] font-medium tabular-nums text-muted"
                aria-label={`${group.items.length} deliverables`}
              >
                {group.items.length}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-muted transition-transform duration-300 ease-out",
                  isOpen && "rotate-180 text-[color:var(--accent)]"
                )}
                aria-hidden
                strokeWidth={2}
              />
            </button>

            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="border-t border-black/[0.06] bg-gradient-to-b from-neutral-50/50 to-transparent px-4 pb-4 pt-3"
                >
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm leading-relaxed text-foreground/88"
                      >
                        <ChevronRight
                          className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--accent)]"
                          aria-hidden
                          strokeWidth={2}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
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
        {isFreelanceEntry(entry) ? (
          <FreelanceNotableAccordion groups={entry.programGroups} />
        ) : (
          <ProgramLines lines={entry.programs} />
        )}
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
