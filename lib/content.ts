/** Central place for copy & data — edit here only. */

export type SectionId =
  | "me"
  | "projects"
  | "skills"
  | "blog"
  | "contact";

export const profile = {
  firstName: "Kayode",
  headline: "Full Stack Developer & Technical Consultant",
  greeting: "Hey, I'm Kayode 👋",
  name: "Kayode",
  location: "Lagos, Nigeria",
  bio: `I'm a full stack engineer and consultant focused on shipping reliable SaaS products, AI-assisted workflows, and automation that saves teams real time. I enjoy turning ambiguous requirements into calm, maintainable systems.`,
  /** Home / hero — transparent PNG in `public/avatar-hero.png` (`npm run copy:hero`). */
  avatarSrc: "/avatar-hero.png",
  /** Me section left column (replace with your photo in `public/profile.jpg` if you use one). */
  photoSrc: "/profile.jpg",
  tags: [
    "Full Stack Dev",
    "AI Automation",
    "SaaS Builder",
    "Freelance Consultant",
    "MSc Information Systems",
  ],
  currentlyBuilding: {
    title: "Currently building",
    projectName: "Atlas — internal ops copilot",
    description:
      "A Next.js + AI toolkit for consultants to summarize meetings and draft follow-ups.",
  },
} as const;

export const projects = [
  {
    id: "atlas",
    name: "Atlas Ops Copilot",
    description:
      "Meeting capture, summarization, and CRM sync for small consulting teams.",
    tech: ["Next.js", "TypeScript", "OpenAI", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "ledgerflow",
    name: "Ledgerflow",
    description:
      "Automated invoicing dashboard with Stripe webhooks and email digests.",
    tech: ["React", "Node.js", "Redis", "Tailwind"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "fieldnote",
    name: "Fieldnote",
    description:
      "Offline-first mobile companion for site surveys with sync to cloud storage.",
    tech: ["React Native", "SQLite", "S3", "TypeScript"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
] as const;

export const skillsByCategory = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: ["Node.js", "REST APIs", "GraphQL", "Prisma", "Auth", "Webhooks"],
  },
  {
    id: "databases",
    title: "Databases",
    skills: ["PostgreSQL", "Redis", "MongoDB", "Supabase"],
  },
  {
    id: "automation",
    title: "Automation",
    skills: ["CI/CD", "Docker", "GitHub Actions", "n8n", "Zapier"],
  },
  {
    id: "ai",
    title: "AI / ML Tools",
    skills: [
      "OpenAI API",
      "Vercel AI SDK",
      "LangChain",
      "Embeddings",
      "RAG patterns",
    ],
  },
] as const;

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
    href: "https://github.com",
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
