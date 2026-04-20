/**
 * UI-facing content — imported by components.
 * Canonical narrative & credentials live in `./portfolio-source.ts`; keep that file updated first.
 */

import {
  fullStackProducts,
  meIntroduction,
  meMetrics,
  professionalTitles,
  profileTags,
  techStack,
} from "./portfolio-source";

export type SectionId =
  | "me"
  | "experience"
  | "projects"
  | "skills"
  | "blog"
  | "contact";

export const profile = {
  firstName: "Kayode Daniel",
  headline: professionalTitles,
  greeting: "Hey, I'm Kayode Daniel 👋",
  name: "Kayode Daniel",
  location: "Lagos, Nigeria",
  meEyebrow: meIntroduction.eyebrow,
  meSubtitle: meIntroduction.subtitle,
  meParagraphs: [...meIntroduction.paragraphs],
  metrics: [...meMetrics],
  /** Home / hero — transparent PNG in `public/avatar-hero.png` (`npm run copy:hero`). */
  avatarSrc: "/avatar-hero.png",
  /** Me / Experience sidebar portrait — `public/profile-me.png`. */
  photoSrc: "/profile-me.png",
  tags: [...profileTags],
} as const;

/** Re-export structured source blocks for rich Me / future sections */
export {
  elevatorPitch,
  enterpriseSystems,
  experienceOverview,
  experienceTimeline,
  healthcareDeployments,
  meMetrics,
  portfolioShowcaseProjects,
  positioningStatement,
  priorExperience,
  professionalSummary,
  professionalTitles,
  projectPortfolioCategories,
} from "./portfolio-source";

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  tech: readonly string[];
  liveUrl: string;
  githubUrl: string;
};

export const projects: readonly ProjectItem[] = fullStackProducts.map((p) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  tech: [...p.tech],
  liveUrl: p.liveUrl,
  githubUrl: p.githubUrl,
}));

export const skillsByCategory = techStack.map((cat) => ({
  id: cat.id,
  title: cat.title,
  skills: [...cat.items],
}));

export const blogPosts = [
  {
    slug: "shipping-faster-with-ai",
    title: "Shipping faster with AI without drowning in prompts",
    date: "2026-03-12",
    readingTimeMinutes: 6,
    excerpt:
      "How I structure small teams to adopt LLM-assisted dev without losing code quality.",
  },
  {
    slug: "schema-first-apis",
    title: "Schema-first APIs that actually stay in sync",
    date: "2026-02-02",
    readingTimeMinutes: 8,
    excerpt:
      "Zod + OpenAPI + codegen: patterns that reduced integration bugs on my last SaaS build.",
  },
  {
    slug: "consulting-retainers",
    title: "Retainers that feel fair on both sides",
    date: "2026-01-18",
    readingTimeMinutes: 5,
    excerpt:
      "Scope boundaries, communication rhythm, and what I put in writing before day one.",
  },
] as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Oloruntobak100",
    icon: "github" as const,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "linkedin" as const,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: "twitter" as const,
  },
] as const;
