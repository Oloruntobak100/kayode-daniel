/**
 * Portfolio source of truth — narrative, credentials, stacks, and deliverables.
 * Sections (Me, Skills, Projects, etc.) should consume derived data from `content.ts`,
 * which maps this file into UI-friendly shapes.
 */

/** One-line titles you can use in hero / LinkedIn-style headers */
export const professionalTitles =
  "Full-Stack Developer | Systems Analyst | Automation Engineer";

/** Elevator positioning — what you do in one breath */
export const elevatorPitch =
  "I design, build, and deploy enterprise-grade systems that solve real operational problems.";

/**
 * Me section only — short, human intro. Detail lives in Experience, Skills, Projects.
 */
export const meIntroduction = {
  /** Small label above the name */
  eyebrow: "About",

  /** One-line expertise signal (shown under name) */
  subtitle:
    "Systems analyst | Full-Stack Developer | Automation Engineer | MSc Information Systems",

  /** About Me body copy */
  paragraphs: [
    `I am a Systems Analyst and Full-Stack Developer specializing in information systems development, enterprise system deployment, business process automation, and API integration — helping organizations streamline operations, improve efficiency, and gain a competitive edge.`,

    `I design and build custom web and mobile applications, enterprise platforms, websites, and high-converting landing pages, translating complex business requirements into scalable, production-ready systems.`,

    `I specialize in automating business workflows, API integration, and synchronizing data across multiple systems, enabling organizations to operate more efficiently and make real-time, data-informed decisions. My approach is rooted in strong system analysis, clean architecture, and automation-first thinking, ensuring every solution is both scalable and sustainable.`,
  ],
} as const;

/**
 * About / Me metrics row.
 * Third column: “integrations delivered” reads better than “tech mastered” — it signals
 * shipped API/automation/integration work (aligned with your positioning) rather than a vague stack count.
 */
export const meMetrics = [
  { value: "7+", label: "Years of experience" },
  { value: "20+", label: "Projects completed" },
  { value: "40+", label: "Integrations delivered" },
] as const;

/** Full professional summary (multi-paragraph, publication-ready) */
export const professionalSummary = {
  lead: `With 7+ years of experience, I combine full-stack engineering, business analysis, and workflow automation to deliver scalable solutions across ERP, EMR/EHR, and data-driven platforms.`,

  stackContext: `I work extensively with Next.js, Node.js, Supabase, and Vercel, alongside automation tooling such as n8n to build integrated, end-to-end systems.`,

  education: `I am pursuing a Master’s in Information Systems, with emphasis on automation, data systems, and scalable architecture.`,

  /** Sharpened analyst / delivery narrative (merged from your longer paragraph) */
  analystDelivery: `Results-oriented systems analyst with 4+ years dedicated to analyzing, designing, and implementing reliable IT solutions. I gather and document requirements, run structured analysis, and translate business needs into specifications, workflows, and testable designs. I author system specifications and diagrams that align delivery teams, build comprehensive test plans, execute functional and UAT cycles, and drive defects to closure so complex software performs as intended in production.`,
} as const;

/**
 * Core positioning: you are not “only dev” or “only analyst” —
 * you own analysis → build → automation → deployment → adoption.
 */
export const positioningStatement = {
  headline: "Systems builder — analysis to production",

  /** Short manifesto for hero or About lead */
  manifesto: `You need someone who can architect the system, build it, automate it with APIs and workflows, deploy and scale it on modern cloud stacks, then train users and sustain adoption. That combination is uncommon — it’s how I work.`,

  notJust: ["“Full-stack developer” alone", '"Systems analyst" alone'],

  youAre: [
    "Architect and clarify the system (analysis & requirements)",
    "Implement the system (full-stack development)",
    "Automate and integrate it (n8n, APIs, webhooks, orchestration)",
    "Deploy and scale it (Vercel, Supabase, cloud-ready patterns)",
    "Train users and transfer knowledge (documentation, training, adoption)",
  ],
} as const;

/** Tech stack — explicit groupings */
export const techStack = [
  {
    id: "fullstack",
    title: "Full-stack development",
    items: [
      "Next.js — frontend & SSR applications",
      "Node.js — backend services & APIs",
      "REST API design & integration",
      "Authentication & authorization patterns",
    ],
  },
  {
    id: "backend",
    title: "Backend & infrastructure",
    items: [
      "Supabase — database, auth, realtime",
      "SQL / MySQL",
      "Deployment via Vercel",
      "Cloud-oriented architectures",
    ],
  },
  {
    id: "automation",
    title: "Automation & integration",
    items: [
      "n8n workflow automation",
      "API orchestration",
      "Webhooks & event-driven flows",
    ],
  },
  {
    id: "data",
    title: "Data & analytics",
    items: [
      "Power BI",
      "DAX / Power Pivot",
      "Dimensional modeling (star schema)",
      "Data visualization & operational reporting",
    ],
  },
] as const;

/**
 * Infinite marquee strips — short labels + grouping line for Skills UI.
 * Sourced from `techStack`; order is intentional for two balanced rows.
 */
export const skillsMarqueeItems = [
  { id: "m-next", name: "Next.js", group: "Full-stack" },
  { id: "m-ts", name: "TypeScript", group: "Language" },
  { id: "m-node", name: "Node.js", group: "Runtime" },
  { id: "m-rest", name: "REST APIs", group: "Integration" },
  { id: "m-auth", name: "Auth patterns", group: "Security" },
  { id: "m-supa", name: "Supabase", group: "Backend" },
  { id: "m-sql", name: "SQL / MySQL", group: "Data" },
  { id: "m-vercel", name: "Vercel", group: "Deploy" },
  { id: "m-cloud", name: "Cloud architecture", group: "Infra" },
  { id: "m-n8n", name: "n8n", group: "Automation" },
  { id: "m-api", name: "API orchestration", group: "Integration" },
  { id: "m-hook", name: "Webhooks", group: "Events" },
  { id: "m-pbi", name: "Power BI", group: "Analytics" },
  { id: "m-dax", name: "DAX / Power Pivot", group: "Analytics" },
  { id: "m-model", name: "Star schema", group: "Modeling" },
  { id: "m-viz", name: "Data visualization", group: "Reporting" },
] as const;

/** Experience section — one-line framing (detail is in the blocks below) */
export const experienceOverview =
  "Programs and deployments where I've supported delivery end-to-end—from requirements and documentation through configuration, testing, training, and stabilization—not as a passive handoff.";

/** Government & large-program credibility */
export const enterpriseSystems = {
  sectionTitle: "Government & enterprise programs",
  intro:
    "Hands-on participation across national and federal digital programs — documentation, SDLC alignment, and delivery support.",

  programs: [
    {
      name: "National Social Safety-Nets Coordinating Office Management Information System",
      shortName: "NASSCO MIS",
    },
    {
      name: "Federal Road Maintenance Agency — Inventory & Asset System",
      shortName: "FERMA IMIS",
    },
    {
      name: "Federal Road Maintenance Agency — Document / Enterprise Document Management",
      shortName: "FERMA EDMS",
    },
    {
      name: "Nigeria for Women Project — Management Information System",
      shortName: "NFWP MIS / PMIS",
    },
    {
      name: "Central Bank of Nigeria — Enterprise Content Management",
      shortName: "CBN ECM",
    },
    {
      name: "Catholic Archdiocese of Lagos — Integration Management Information System",
      shortName: "CAL IMIS",
    },
    {
      name: "HYELLA ERP & EMR (enterprise health / ERP suite — delivery context)",
      shortName: "HYELLA",
    },
  ],

  roleSummary: [
    "Co-managed aspects of the system development lifecycle with delivery teams",
    "Produced core documentation across SDLC phases (requirements through rollout)",
    "Supported system design, structure, configuration, and delivery milestones",
  ],
} as const;

/** Healthcare EMR/EHR — differentiation */
export const healthcareDeployments = {
  sectionTitle: "Healthcare — EMR / EHR deployments",
  intro:
    "Led customization, configuration, and deployment of electronic health record systems for hospital operations — positioned as delivery ownership, not passive support.",

  hospitals: [
    "St. Nicholas Hospital — Lagos",
    "NISA Premier Hospital — Abuja",
    "LIMI Hospitals — Abuja",
    "Zankli Medical Center",
    "Adonai Hospital — Nasarawa",
    "Chivar Specialist Hospital — Abuja",
  ],

  deliveryHighlights: [
    "Executive-level product presentations to hospital leadership",
    "Requirements engineering workshops across clinical and admin departments",
    "Translation of hospital workflows into system configuration and master data",
    "System testing — UAT coordination and functional validation",
    "End-user training programs and super-user enablement",
    "Documentation suites: user manuals, tutorial videos, knowledge transfer packs",
    "Post-go-live remote support, tuning, and optimization",
  ],

  impact: [
    "Digitized core hospital operations",
    "Improved accessibility and consistency of patient data",
    "Reduced manual errors and operational friction",
  ],
} as const;

/**
 * Experience section — vertical timeline (dates & locations as provided).
 * Program and healthcare lines are derived from the blocks above.
 */
export const experienceTimeline = [
  {
    id: "maybeach",
    organization: "Maybeach Technologies",
    location: "Abuja, Nigeria",
    periodLabel: "Sep 2019 – Jan 2021",
    role: "Project Manager",
    eyebrow: enterpriseSystems.sectionTitle,
    intro: enterpriseSystems.intro,
    programs: enterpriseSystems.programs.map(
      (p) => `${p.shortName} — ${p.name}`
    ),
    roleSectionTitle: "Role & contribution",
    roleBullets: [...enterpriseSystems.roleSummary],
  },
  {
    id: "hyella",
    organization: "Hyella Limited",
    location: "Lagos, Nigeria",
    periodLabel: "Jan 2021 – Mar 2024",
    role: "System Analyst / Deployment Engineer",
    eyebrow: healthcareDeployments.sectionTitle,
    intro: healthcareDeployments.intro,
    hospitalsTitle: "Hospitals & clients",
    hospitals: [...healthcareDeployments.hospitals],
    deliveryTitle: "Delivery scope",
    deliveryBullets: [...healthcareDeployments.deliveryHighlights],
    impactTitle: "Impact",
    impactBullets: [...healthcareDeployments.impact],
  },
  {
    id: "northsnow",
    organization: "Northsnow",
    location: "United Kingdom",
    periodLabel: "Mar 2024 – Present",
    role: "Lead System Architect & Lead Developer",
    eyebrow: "Full-stack product delivery",
    intro:
      "I lead system architecture and full-stack development for Northsnow's web and mobile applications — translating product goals into scalable, production-ready systems across our suite of platforms.",
    productHighlight:
      "Products include Godea, Quantiva, PainScope, PayPill, Leadii, and Accounting Automation — spanning analytics and operations, healthcare scenarios, payments, lead management, and finance automation.",
    stackTitle: "Core tools & deployment",
    stackBullets: [
      "Next.js, React, TypeScript",
      "Node.js, REST & event-driven APIs",
      "BullMQ, Redis (queues & caching)",
      "GitHub — collaboration, reviews, CI/CD hooks",
      "PostgreSQL, Docker, cloud-native deployments",
    ],
    deliveryBullets: [
      "End-to-end ownership from architecture through deployment and iteration",
      "Reliability, performance, and security treated as first-class concerns",
    ],
  },
] as const;

/** Product-style portfolio pieces — frame as solutions */
export const fullStackProducts = [
  {
    id: "godea",
    name: "Godea",
    description:
      "Full-stack web platform engineered for scale — modern UI, robust backend, deployed on Vercel with performance and reliability as first-class concerns.",
    tech: ["Next.js", "Node.js", "Vercel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "quantiva",
    name: "Quantiva",
    description:
      "Data-centric platform combining structured backends with analytics-oriented workflows for decision support.",
    tech: ["Next.js", "APIs", "Analytics"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "painscope",
    name: "PainScope",
    description:
      "Cloud application focused on healthcare monitoring scenarios with real-time and longitudinal data handling.",
    tech: ["Cloud", "Realtime", "Healthcare UX"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "paypill",
    name: "PayPill",
    description:
      "Payment-capable product integrating secure APIs, transactional flows, and operational dashboards.",
    tech: ["Payments", "APIs", "Security"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "leadii",
    name: "Leadii",
    description:
      "Lead management / CRM-style platform with automation hooks and workflow triggers for sales and follow-up.",
    tech: ["CRM patterns", "Automation", "Workflows"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
] as const;

/** Portfolio grid — filter tabs + dummy entries (replace via admin later) */
export const projectPortfolioCategories = [
  { id: "all", label: "All" },
  {
    id: "saas-web-app",
    label: "SaaS & Web and App Development",
  },
  { id: "crm-api", label: "CRM & API Integration" },
  { id: "ai-agent", label: "AI Agent Workflows" },
  {
    id: "social-automation",
    label: "Social Media Automation",
  },
  {
    id: "data-viz",
    label: "Data Analytics and Visualization",
  },
] as const;

export type ProjectPortfolioCategoryId =
  (typeof projectPortfolioCategories)[number]["id"];

export const portfolioShowcaseProjects = [
  {
    id: "show-godea",
    title: "Godea",
    categoryId: "saas-web-app" as const,
    imageSrc: "https://picsum.photos/seed/godea/800/520",
  },
  {
    id: "show-quantiva",
    title: "Quantiva",
    categoryId: "data-viz" as const,
    imageSrc: "https://picsum.photos/seed/quantiva/800/520",
  },
  {
    id: "show-painscope",
    title: "PainScope",
    categoryId: "saas-web-app" as const,
    imageSrc: "https://picsum.photos/seed/painscope/800/520",
  },
  {
    id: "show-paypill",
    title: "PayPill",
    categoryId: "crm-api" as const,
    imageSrc: "https://picsum.photos/seed/paypill/800/520",
  },
  {
    id: "show-leadii",
    title: "Leadii",
    categoryId: "crm-api" as const,
    imageSrc: "https://picsum.photos/seed/leadii/800/520",
  },
  {
    id: "show-accounting",
    title: "Accounting Automation",
    categoryId: "saas-web-app" as const,
    imageSrc: "https://picsum.photos/seed/accounting/800/520",
  },
  {
    id: "show-n8n-flow",
    title: "Enterprise workflow hub",
    categoryId: "ai-agent" as const,
    imageSrc: "https://picsum.photos/seed/n8nflow/800/520",
  },
  {
    id: "show-api-mesh",
    title: "API integration mesh",
    categoryId: "crm-api" as const,
    imageSrc: "https://picsum.photos/seed/apimesh/800/520",
  },
  {
    id: "show-social-suite",
    title: "Cross-channel publishing",
    categoryId: "social-automation" as const,
    imageSrc: "https://picsum.photos/seed/socialsuite/800/520",
  },
  {
    id: "show-insights",
    title: "Operations insights dashboard",
    categoryId: "data-viz" as const,
    imageSrc: "https://picsum.photos/seed/insights/800/520",
  },
  {
    id: "show-agent-rag",
    title: "RAG support assistant",
    categoryId: "ai-agent" as const,
    imageSrc: "https://picsum.photos/seed/ragagent/800/520",
  },
  {
    id: "show-growth",
    title: "Growth analytics cockpit",
    categoryId: "data-viz" as const,
    imageSrc: "https://picsum.photos/seed/growthdash/800/520",
  },
];

/** Earlier career — credibility without overstating title */
export const priorExperience = [
  {
    organization: "Maybeach Technologies Ltd.",
    role: "IT Support Consultant & Front-End Developer",
    period: "Feb 2020 – Dec 2020",
    highlights: [
      "Implemented UI/UX mock-ups and wireframes in HTML, CSS, and JavaScript",
      "Testing and debugging for layout, functionality, and performance",
      "Technical troubleshooting across hardware, software, and basic networking",
    ],
  },
] as const;

/** Optional Me section pills — empty when not used */
export const profileTags = [] as const;
