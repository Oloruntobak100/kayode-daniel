"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  AtSign,
  Bot,
  Calculator,
  Layers,
  Server,
  Smartphone,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Category filter data — names and skills exactly as specified */
const CATEGORIES = [
  {
    id: "fullstack" as const,
    name: "Full-Stack Development",
    Icon: Layers,
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript (ES2024)",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
      "GraphQL",
      "Supabase",
      "PostgreSQL",
      "Prisma ORM",
      "Redis",
      "BullMQ",
      "Firebase",
      "Capacitor.js",
      "Stripe Connect",
      "Supabase Authentication",
      "OAuth 2.0",
      "Resend",
      "PostHog",
      "OpenAI API",
      "Kimi K2.5",
      "Cloudflare",
      "Cloudflare R2",
      "Hostinger",
      "Vercel",
      "GitHub",
      "Cursor AI",
    ],
  },
  {
    id: "devops" as const,
    name: "DevOps & Infrastructure",
    Icon: Server,
    skills: [
      "Railway",
      "Hetzner VPS",
      "Vercel",
      "Cloudflare",
      "Hostinger",
      "n8n self-hosted",
      "Redis",
      "BullMQ",
      "GitHub Actions",
      "Environment config management",
    ],
  },
  {
    id: "automation" as const,
    name: "Automation & Workflow Engineering",
    Icon: Workflow,
    skills: [
      "n8n",
      "Make.com",
      "Zapier",
      "Webhook design",
      "Multi-step workflow architecture",
      "API orchestration",
      "Scheduled job automation",
      "Event-driven pipelines",
      "Blotato",
      "Telegram Bot API",
    ],
  },
  {
    id: "ai" as const,
    name: "AI & Agent Systems",
    Icon: Bot,
    skills: [
      "Claude API (Anthropic)",
      "OpenAI API",
      "Kimi K2.5",
      "LLM prompt engineering",
      "AI agent design",
      "RAG pipelines",
      "Supabase Vector Store",
      "MCP server integration",
      "Multi-agent workflows",
      "Structured output design",
      "Tool use / function calling",
    ],
  },
  {
    id: "email" as const,
    name: "Subdomain & Email Warmup Automation",
    Icon: AtSign,
    skills: [
      "Zoho Mail domain provisioning",
      "Cloudflare DNS (MX, SPF, DKIM, DMARC)",
      "Mailgun SMTP setup",
      "Mailivery warmup onboarding",
      "Subdomain-scale mailbox management (~600 subdomains)",
      "End-to-end deliverability pipeline",
    ],
  },
  {
    id: "qbo" as const,
    name: "QuickBooks & Accounting Automation",
    Icon: Calculator,
    skills: [
      "QuickBooks Online API",
      "Transaction auto-categorization",
      "IOLTA compliance workflows",
      "Bank reconciliation automation",
      "Uncleared/undeposited funds monitoring",
      "Large transaction alerts",
      "Three-way trust account reconciliation",
      "Multi-account QBO management (~30 accounts)",
    ],
  },
  {
    id: "mobile" as const,
    name: "Mobile & Cross-Platform",
    Icon: Smartphone,
    skills: [
      "Flutter",
      "Capacitor.js",
      "Capawesome OTA updates",
      "Cloudflare R2 storage",
      "iOS & Android deployment",
      "Supabase Storage",
    ],
  },
] as const;

export type SkillCategoryId = (typeof CATEGORIES)[number]["id"];

const tabTransition = { type: "spring" as const, stiffness: 380, damping: 32 };

const panelTransition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

function SkillPill({
  skill,
  reduceMotion,
}: {
  skill: string;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.li
      variants={{
        hidden: {
          opacity: reduceMotion ? 1 : 0,
          y: reduceMotion ? 0 : 8,
          scale: reduceMotion ? 1 : 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: reduceMotion ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className="group relative list-none"
    >
      <span
        className={cn(
          "inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-left text-sm text-white/85 shadow-sm backdrop-blur-md transition will-change-transform",
          "hover:scale-[1.04] hover:border-[color:var(--accent)]/55 hover:text-white",
          "hover:shadow-[0_0_24px_-4px_rgba(124,92,255,0.5)]"
        )}
      >
        <span className="break-words">{skill}</span>
      </span>
      <span
        className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[color:var(--accent)] to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden
      />
    </motion.li>
  );
}

function SkillsSectionContent() {
  const headingLineId = useId();
  const [activeId, setActiveId] = useState<SkillCategoryId>("fullstack");
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  const activeCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === activeId)!,
    [activeId]
  );

  const showUnderline = reduceMotion || headingInView;

  const stagger = reduceMotion ? 0 : 0.03;

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: reduceMotion ? 1 : 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: stagger,
          delayChildren: reduceMotion ? 0 : 0.02,
        },
      },
    }),
    [reduceMotion, stagger]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-none space-y-8 pb-4"
    >
      {/* Heading — outside dark card for contrast on light page, or keep inside — plan: dark showpiece contains all */}
      <div ref={headingRef} className="px-1 text-center md:text-left">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-muted">
          Capabilities
        </p>
        <h2
          className={cn(
            "font-display mt-2 text-balance bg-gradient-to-r from-[#4F6EF7] via-[#7C5CFF] to-[#8B5CF6] bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-6xl"
          )}
        >
          Skills & Expertise
        </h2>
        <motion.svg
          aria-hidden
          viewBox="0 0 280 10"
          className="mx-auto mt-4 h-2.5 w-[min(18rem,88vw)] md:mx-0"
          initial={false}
        >
          <defs>
            <linearGradient
              id={headingLineId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4F6EF7" />
              <stop offset="50%" stopColor="#7C5CFF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <motion.path
            d="M2 6 Q70 2 140 6 T278 6"
            fill="none"
            stroke={`url(#${headingLineId})`}
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: showUnderline ? 1 : 0 }}
            transition={{
              pathLength: {
                duration: reduceMotion ? 0 : 1.1,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          />
        </motion.svg>
      </div>

      {/* Dark glass showpiece */}
      <div
        className={cn(
          "relative isolate overflow-hidden rounded-[1.75rem] border border-white/10",
          "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 shadow-[0_24px_80px_-20px_rgba(79,110,247,0.35)]",
          "px-5 py-8 md:px-10 md:py-10"
        )}
      >
        <div
          className="skills-grid-bg skills-dot-grid pointer-events-none absolute inset-0 rounded-[inherit]"
          aria-hidden
        />

        <div className="relative z-10">
          <div
            role="tablist"
            aria-label="Skill categories"
            className="flex flex-wrap justify-center gap-2 md:justify-start"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeId === cat.id;
              const Icon = cat.Icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  id={`skills-tab-${cat.id}`}
                  aria-selected={isActive}
                  aria-controls="skills-tabpanel"
                  tabIndex={0}
                  onClick={() => setActiveId(cat.id)}
                  className={cn(
                    "relative inline-flex min-h-[2.75rem] items-center gap-2 rounded-full px-3.5 py-2 text-left text-xs font-medium transition-colors sm:px-4 sm:text-sm",
                    isActive
                      ? "text-white"
                      : "border border-white/15 bg-white/[0.04] text-white/70 hover:border-white/25 hover:bg-white/[0.07] hover:text-white/90"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skills-tab-glow"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4F6EF7]/45 via-[#7C5CFF]/40 to-[#8B5CF6]/45 shadow-[0_0_28px_-6px_rgba(124,92,255,0.75)] ring-1 ring-white/15"
                      transition={tabTransition}
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                    <span className="max-w-[14rem] leading-snug sm:max-w-none">
                      {cat.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-inner backdrop-blur-md md:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                role="tabpanel"
                id="skills-tabpanel"
                aria-labelledby={`skills-tab-${activeId}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={panelTransition}
              >
                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-2.5"
                >
                  {activeCategory.skills.map((skill) => (
                    <SkillPill
                      key={skill}
                      skill={skill}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </motion.ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Award-style skills section — tabbed categories, staggered pills, glass panel */
export function SkillsSection() {
  return <SkillsSectionContent />;
}

export default SkillsSection;
