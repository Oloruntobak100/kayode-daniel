"use client";

import type { CSSProperties } from "react";
import {
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  ClipboardCheck,
  Cloud,
  Code2,
  Database,
  GitBranch,
  HardDrive,
  Layers,
  ListOrdered,
  Package,
  Workflow,
  Wind,
} from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { skillsMarqueeItems as strip } from "@/lib/content";
import { cn } from "@/lib/utils";

type StripItem = (typeof strip)[number];

/** Stable row splits — avoids new array refs each render breaking the marquee loop. */
const MARQUEE_MID = Math.ceil(strip.length / 2);
const SKILL_ROW_TOP = strip.slice(0, MARQUEE_MID);
const SKILL_ROW_BOTTOM = strip.slice(MARQUEE_MID);

function subscribeReducedMotion(cb: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** SSR / hydration: assume motion ok until client reads real preference. */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
}

function iconForSkill(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (n.includes("react") && !n.includes("next")) return Layers;
  if (n.includes("tailwind")) return Wind;
  if (n.includes("git")) return GitBranch;
  if (n.includes("docker")) return Package;
  if (n.includes("redis")) return HardDrive;
  if (n.includes("bull") || n.includes("queue")) return ListOrdered;
  if (n.includes("test") || n.includes("uat")) return ClipboardCheck;
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
  if (n.includes("sql") || n.includes("postgres") || n.includes("supabase"))
    return Database;
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

/**
 * Pixel infinite marquee via requestAnimationFrame.
 * Avoid any ancestor Framer `transform` on the Skills route (SectionLayout uses `sectionMarqueeSafe`).
 */
function MarqueeTrack({
  items,
  direction,
  durationSec,
}: {
  items: readonly StripItem[];
  direction: "left" | "right";
  durationSec?: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const innerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const rightSeedRef = useRef(false);
  const rafRef = useRef(0);

  const loopItems = prefersReducedMotion ? [...items] : [...items, ...items];
  const seconds = durationSec ?? 30;

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const el = innerRef.current;
    if (!el) return;

    let cancelled = false;
    let last = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;

      const seg = el.scrollWidth / 2;
      const dt = Math.min((now - last) / 1000, 0.08);
      last = now;

      if (seg > 4) {
        const speed = seg / seconds;

        if (direction === "right") {
          if (!rightSeedRef.current) {
            offsetRef.current = -seg;
            rightSeedRef.current = true;
          }
          if (!pausedRef.current) {
            offsetRef.current += speed * dt;
            while (offsetRef.current >= 0) {
              offsetRef.current -= seg;
            }
          }
        } else if (!pausedRef.current) {
          offsetRef.current -= speed * dt;
          while (offsetRef.current <= -seg) {
            offsetRef.current += seg;
          }
        }

        el.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    let resizeDebounce: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(() => {
        if (direction === "left") {
          offsetRef.current = 0;
        } else {
          rightSeedRef.current = false;
          offsetRef.current = 0;
        }
      }, 140);
    });
    ro.observe(el);

    return () => {
      cancelled = true;
      clearTimeout(resizeDebounce);
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      rightSeedRef.current = false;
      offsetRef.current = 0;
      el.style.transform = "";
    };
  }, [direction, seconds, prefersReducedMotion]);

  const maskStyle = {
    maskImage:
      "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
  } as const;

  return (
    <div
      className="relative isolate overflow-hidden py-2"
      style={maskStyle as CSSProperties}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div
        ref={innerRef}
        className="flex w-max gap-4 pr-4 will-change-transform"
      >
        {loopItems.map((item, idx) => (
          <SkillStripCard key={`${item.id}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
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
            Tools and platforms I use across delivery — infinite scroll; hover a
            row to pause.
          </p>
        </div>
      </motion.div>

      <div className="space-y-6">
        <MarqueeTrack items={SKILL_ROW_TOP} direction="right" durationSec={28} />
        <MarqueeTrack
          items={SKILL_ROW_BOTTOM}
          direction="left"
          durationSec={32}
        />
      </div>

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
