/**
 * Portfolio source of truth — narrative, credentials, stacks, and deliverables.
 * Sections (Me, Skills, Projects, etc.) should consume derived data from `content.ts`,
 * which maps this file into UI-friendly shapes.
 */

/** One-line titles you can use in hero / LinkedIn-style headers */
export const professionalTitles =
  "Full-Stack Developer · Systems Analyst · Automation Engineer";

/** Elevator positioning — what you do in one breath */
export const elevatorPitch =
  "I help teams turn messy business problems into software that people can actually use day to day.";

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
    `I work as a systems analyst and full-stack developer: I dig into how an organization really works, then design and deliver software that fits—whether that is a new app, a deployment on site, or wiring systems together with APIs and automation.`,

    `I build web and mobile apps, platforms, and marketing sites, and I care that what ships matches what the business actually asked for—not a guess from six months ago.`,

    `A lot of my work is about saving people time: connecting tools, automating the boring parts, and making data easier to act on. I like clean architecture, but the goal is always something the team can run and grow without it turning into a maintenance nightmare.`,
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
  lead: `I have been doing this for 7+ years: full-stack work, business analysis, and automation—on ERP, hospital systems, data platforms, and the glue between them.`,

  stackContext: `These days I lean on Next.js, Node.js, Supabase, and Vercel, plus n8n when a process needs to run itself instead of live in a spreadsheet.`,

  education: `I am studying for a Master’s in Information Systems, focused on automation, data, and how systems scale without getting brittle.`,

  /** Sharpened analyst / delivery narrative (merged from your longer paragraph) */
  analystDelivery: `For the last 4+ years, analysis and delivery have been a big part of the job. I sit with people, write down what they need in plain terms, and turn that into specs, flowcharts, and testable designs. I plan tests, run functional and UAT, and work issues through until the software does what it promised in real use—not just on demo day.`,
} as const;

/**
 * Core positioning: you are not “only dev” or “only analyst” —
 * you own analysis → build → automation → deployment → adoption.
 */
export const positioningStatement = {
  headline: "Systems builder — analysis to production",

  /** Short manifesto for hero or About lead */
  manifesto: `Some roles stop at a document; others only write code. I like owning the line from “what do we need?” to “it’s in production and people are using it”—architecture, build, automation, deploy, and helping the team get comfortable. That’s the mix I bring.`,

  notJust: ["“Full-stack developer” alone", '"Systems analyst" alone'],

  youAre: [
    "Figure out the system: analysis, questions, and clear requirements",
    "Build the system: full-stack, not just a slide",
    "Wire it to other tools: n8n, APIs, webhooks, the boring made automatic",
    "Put it in production: Vercel, Supabase, patterns that do not fall over under load",
    "Help people adopt it: docs, training, so it survives the first month",
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
  { id: "m-react", name: "React", group: "UI" },
  { id: "m-ts", name: "TypeScript", group: "Language" },
  { id: "m-tailwind", name: "Tailwind CSS", group: "Styling" },
  { id: "m-node", name: "Node.js", group: "Runtime" },
  { id: "m-rest", name: "REST APIs", group: "Integration" },
  { id: "m-auth", name: "Auth patterns", group: "Security" },
  { id: "m-supa", name: "Supabase", group: "Backend" },
  { id: "m-sql", name: "SQL / MySQL", group: "Data" },
  { id: "m-pg", name: "PostgreSQL", group: "Data" },
  { id: "m-vercel", name: "Vercel", group: "Deploy" },
  { id: "m-git", name: "Git & GitHub", group: "Delivery" },
  { id: "m-docker", name: "Docker", group: "Infra" },
  { id: "m-cloud", name: "Cloud architecture", group: "Infra" },
  { id: "m-n8n", name: "n8n", group: "Automation" },
  { id: "m-api", name: "API orchestration", group: "Integration" },
  { id: "m-hook", name: "Webhooks", group: "Events" },
  { id: "m-redis", name: "Redis", group: "Infra" },
  { id: "m-queue", name: "BullMQ / queues", group: "Automation" },
  { id: "m-test", name: "Testing & UAT", group: "Quality" },
  { id: "m-pbi", name: "Power BI", group: "Analytics" },
  { id: "m-dax", name: "DAX / Power Pivot", group: "Analytics" },
  { id: "m-model", name: "Star schema", group: "Modeling" },
  { id: "m-viz", name: "Data visualization", group: "Reporting" },
] as const;

/** Experience section — one-line framing (detail is in the blocks below) */
export const experienceOverview =
  "A sample of the programs I have supported all the way through: figuring out requirements, writing it down, configuring, testing, training, and helping things settle after go-live—without disappearing after a PDF handover.";

/** Government & large-program credibility */
export const enterpriseSystems = {
  sectionTitle: "Government & enterprise programs",
  intro:
    "Most of my work sat between the agencies and clients who needed the software and the team that built it. I listened, wrote down what we agreed, kept everyone pointed at the same picture of “done,” and stuck around for testing and launch so the important details did not get lost in translation.",

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
      name: "Financial Institution Application Processing System (FIAPS) — Central Bank of Nigeria",
      shortName: "CBN FIAPS",
    },
    {
      name: "CBN Paperlite Application — Central Bank of Nigeria",
      shortName: "CBN Paperlite",
    },
    {
      name: "National Identity Management Commission — Management Information System",
      shortName: "NIMC MIS",
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
    "I was the person clients and our developers both came to—workshops, calls, and follow-ups—so the build matched what the business said they needed, not what someone thought they said three months ago",
    "I met with leaders and their teams, mapped how the work really ran, and put it in writing so the devs knew exactly what to build and how to test it",
    "I kept the project paperwork honest end to end: what we asked for, how we designed it, what we released, how to use it, and what we handed over at the end",
    "I did not hand off a build I had not poked: functional checks and UAT with users so we caught issues before the client’s big day",
    "After launch, I stayed reachable—fixes, small config changes, and helping people get comfortable with the new system",
  ],
} as const;

/** Healthcare EMR/EHR — differentiation */
export const healthcareDeployments = {
  sectionTitle: "Healthcare — EMR / EHR deployments",
  intro:
    "I rolled out and tailored hospital EHR/EMR systems: not a ticket on a wall, but end-to-end—talking to doctors and admin, getting settings right, training people, and staying in the loop after go-live.",

  hospitals: [
    "St. Nicholas Hospital — Lagos",
    "NISA Premier Hospital — Abuja",
    "LIMI Hospitals — Abuja",
    "Zankli Medical Center",
    "Adonai Hospital — Nasarawa",
    "Chivar Specialist Hospital — Abuja",
  ],

  deliveryHighlights: [
    "Walked leadership through what the product could (and could not) do, in language that matched how they make decisions",
    "Ran working sessions in wards and back office so we did not miss how care and paperwork actually run day to day",
    "Turned those conversations into how the system was set up: forms, fields, and master data that matched the hospital’s reality",
    "Coordinated UAT and day-to-day testing with staff so we fixed problems before they hit patients and billing",
    "Trained end users and a few “super users” so the floor had someone to ask besides calling me for every small thing",
    "Left real manuals, short videos, and handover notes people could return to when memory fades",
    "Stuck with sites after go-live: remote help, small tweaks, and nudging performance when something felt clunky",
  ],

  impact: [
    "Less paper and fewer side spreadsheets for the work that has to be auditable",
    "Patient and clinical information easier to find in one place when the team needs it",
    "Fewer avoidable errors and less duplicate data entry in daily routines",
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
    role: "Project Manager & Systems Analyst",
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
      "I lead how we shape and build Northsnow’s web and mobile apps: turning a product idea into something we can run in production, then improve without breaking what users already trust.",
    productHighlight:
      "The suite includes Godea, Quantiva, PainScope, PayPill, Leadii, and Accounting Automation—covering analytics, day-to-day ops, healthcare, payments, leads, and finance workflows.",
    stackTitle: "Core tools & deployment",
    stackBullets: [
      "Next.js, React, TypeScript",
      "Node.js, REST & event-driven APIs",
      "BullMQ, Redis (queues & caching)",
      "GitHub — reviews, collaboration, and CI",
      "PostgreSQL, Docker, cloud-native deployments",
    ],
    deliveryBullets: [
      "I own the line from “what are we building?” to shipping and the next release—not just the first cut",
      "I treat speed, stability, and security as things you plan for, not things you fix after a bad week",
    ],
  },
] as const;

/** Product-style portfolio pieces — frame as solutions */
export const fullStackProducts = [
  {
    id: "godea",
    name: "Godea",
    description:
      "A full stack web app built to grow: solid UI, backend that can take traffic, on Vercel, with the slow paths and error cases thought through—not an afterthought.",
    tech: ["Next.js", "Node.js", "Vercel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "quantiva",
    name: "Quantiva",
    description:
      "Pulls data into one place and supports workflows around it so people can make calls from evidence, not from a gut feeling in a static report.",
    tech: ["Next.js", "APIs", "Analytics"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "painscope",
    name: "PainScope",
    description:
      "Healthcare-facing product: data that updates in real time when it matters, and a history you can look back on when a case runs long.",
    tech: ["Cloud", "Realtime", "Healthcare UX"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "paypill",
    name: "PayPill",
    description:
      "Takes money in safely, talks to payment providers cleanly, and gives operations a place to see what is moving—without the finance team living in a vendor portal.",
    tech: ["Payments", "APIs", "Security"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "leadii",
    name: "Leadii",
    description:
      "Pipeline and follow-up in one system: when a lead comes in, who owns it, what happens next, and a few automations so nothing obvious slips.",
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
      "Turned wireframes and mockups into real pages in HTML, CSS, and JavaScript",
      "Found and fixed what broke: layout, interactions, and slow or flaky behaviour",
      "Fielded day-to-day IT issues on hardware, software, and the basics of the network",
    ],
  },
] as const;

/** Optional Me section pills — empty when not used */
export const profileTags = [] as const;
