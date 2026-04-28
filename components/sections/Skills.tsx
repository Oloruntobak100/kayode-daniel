"use client";

import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { Plug } from "lucide-react";
import { cn } from "@/lib/utils";

export type MarqueeSkill = {
  name: string;
  slug: string | null;
  /** Hex without `#` for cdn.simpleicons.org */
  color?: string;
  fallback?: LucideIcon;
};

/** Curated stack logos (~28) — round-robin split across 4 rows */
export const SKILLS_MARQUEE_DATA: MarqueeSkill[] = [
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "Framer Motion", slug: "framer", color: "0055FF" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "GraphQL", slug: "graphql", color: "E10098" },
  { name: "Supabase", slug: "supabase", color: "3FCF8E" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "Prisma", slug: "prisma", color: "2D3748" },
  { name: "Redis", slug: "redis", color: "DC382D" },
  { name: "Firebase", slug: "firebase", color: "DD2C00" },
  { name: "Vercel", slug: "vercel", color: "000000" },
  { name: "Cloudflare", slug: "cloudflare", color: "F38020" },
  { name: "Railway", slug: "railway", color: "0B0D0E" },
  { name: "Hetzner", slug: "hetzner", color: "D50C2D" },
  { name: "GitHub", slug: "github", color: "181717" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "n8n", slug: "n8n", color: "EA4B71" },
  { name: "Make", slug: "make", color: "6D00CC" },
  { name: "Zapier", slug: "zapier", color: "FF4A00" },
  { name: "OpenAI", slug: "openai", color: "412991" },
  { name: "Anthropic", slug: "anthropic", color: "D97757" },
  { name: "Telegram", slug: "telegram", color: "26A5E4" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "QuickBooks", slug: "intuit", color: "2CA01C" },
  { name: "Flutter", slug: "flutter", color: "02569B" },
];

/** Distribute items round-robin so each row stays balanced when the list grows */
export function chunkIntoRows<T>(items: readonly T[], rowCount: number): T[][] {
  const rows: T[][] = Array.from({ length: rowCount }, () => []);
  items.forEach((item, i) => {
    rows[i % rowCount]!.push(item);
  });
  return rows;
}

const ROWS = [
  { direction: "left" as const, durationSec: 38 },
  { direction: "right" as const, durationSec: 28 },
  { direction: "left" as const, durationSec: 44 },
  { direction: "right" as const, durationSec: 32 },
];

const maskStyle: CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
};

function SkillPill({ skill }: { skill: MarqueeSkill }) {
  const Fallback = skill.fallback ?? Plug;
  const hex = skill.color ?? "525252";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-xl border border-black/[0.08] bg-white/[0.85] px-3 py-2 shadow-soft backdrop-blur-md transition sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-2.5",
        "hover:border-black/15 hover:shadow-glass"
      )}
    >
      {skill.slug ? (
        // eslint-disable-next-line @next/next/no-img-element -- Simple Icons CDN SVGs; no Next/Image pipeline needed
        <img
          src={`https://cdn.simpleicons.org/${skill.slug}/${hex}`}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          decoding="async"
          className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
        />
      ) : (
        <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-foreground/70 sm:h-5 sm:w-5">
          <Fallback className="h-4 w-4" aria-hidden />
        </span>
      )}
      <span className="whitespace-nowrap text-xs font-medium text-foreground sm:text-sm">
        {skill.name}
      </span>
    </span>
  );
}

function MarqueeRow({
  skills,
  direction,
  durationSec,
}: {
  skills: readonly MarqueeSkill[];
  direction: "left" | "right";
  durationSec: number;
}) {
  const doubled = [...skills, ...skills];

  return (
    <div className="marquee-row relative isolate overflow-hidden py-1.5 sm:py-2" style={maskStyle}>
      <div
        className={cn(
          "marquee-track flex w-max gap-2 pr-2 sm:gap-3 sm:pr-3",
          direction === "left" ? "marquee-track--left" : "marquee-track--right"
        )}
        style={
          {
            "--mq-dur": `${durationSec}s`,
          } as CSSProperties
        }
      >
        {doubled.map((skill, idx) => (
          <SkillPill key={`${skill.name}-${idx}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

/** Four-row infinite marquee — rows 1 & 3 left, 2 & 4 right; speeds differ per row */
export function SkillsMarquee() {
  const rowChunks = chunkIntoRows(SKILLS_MARQUEE_DATA, 4);

  return (
    <div className="flex w-full flex-col gap-1 md:gap-1.5">
      {ROWS.map((row, i) => (
        <MarqueeRow
          key={i}
          skills={rowChunks[i] ?? []}
          direction={row.direction}
          durationSec={row.durationSec}
        />
      ))}
    </div>
  );
}

/** Section wrapper + marquee — composes below SkillsSection on the Skills route */
export default function Skills() {
  return (
    <section className="w-full max-w-none space-y-4 pb-8 sm:space-y-6 sm:pb-10">
      <header className="px-1 text-center md:text-left">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted sm:text-[11px] sm:tracking-[0.35em]">
          Stack
        </p>
        <h3 className="font-display mt-2 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
          Tools I build with
        </h3>
      </header>
      <SkillsMarquee />
    </section>
  );
}
