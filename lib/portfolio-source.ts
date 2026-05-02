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
  "I help startups and businesses turn ideas into reality—from information systems and product design through to shipped software—with 8+ years across ERP, SaaS, EHR, mobile, and workflow-heavy systems.";

/**
 * Me section only — short, human intro. Detail lives in Experience, Skills, Projects.
 */
export const meIntroduction = {
  /** Small label above the name */
  eyebrow: "About",

  /** One-line expertise signal (shown under name); leave empty to hide in Me section */
  subtitle: "",

  /** About Me body copy */
  paragraphs: [
    `I help startups and businesses turn ideas into reality through well-designed information systems—building software products that are structured, scalable, and aligned with how the business actually operates. With over 8 years of experience in managing the successful design and development of Enterprise Resource Planning solutions, SaaS applications, electronic health record systems, mobile applications, and more, I deliver high-quality solutions that are built to last.`,

    `When you work with me, you're not just hiring a developer—you're working with a technical partner who takes ownership of the product end-to-end, from architecture and design to development and deployment.`,

    `I take the time to understand your vision, your users, and how your business runs, so the final product is not just built, but built right.`,

    `If you value structure, quality, and long-term results, we should talk.`,
  ],
} as const;

/**
 * About / Me metrics row.
 * Third column: “integrations delivered” reads better than “tech mastered” — it signals
 * shipped API/automation/integration work (aligned with your positioning) rather than a vague stack count.
 */
export const meMetrics = [
  { value: "8+", label: "Years of experience" },
  { value: "20+", label: "Projects completed" },
  { value: "40+", label: "Integrations delivered" },
] as const;

/** Full professional summary (multi-paragraph, publication-ready) */
export const professionalSummary = {
  lead: `With 8+ years in information systems, I combine consulting on how businesses work and how they should be supported, with full-stack and automation delivery—across ERP, health information systems, data platforms, and enterprise integration.`,

  stackContext: `My current stack leans on Next.js, Node.js, Supabase, and Vercel, with n8n and custom APIs where processes need to run as reliable, auditable automations instead of ad hoc spreadsheets.`,

  education: `I am completing a Master’s in Information Systems, with emphasis on automation, enterprise data, and architecture that remains supportable as the business changes.`,

  /** Sharpened analyst / delivery narrative (merged from your longer paragraph) */
  analystDelivery: `In IS analysis, design, and delivery roles, I work with leadership and operations: eliciting and documenting needs in business language, mapping processes, and turning agreements into data definitions, designs, and testable builds. I own functional and UAT cycles, drive defects to closure, and make sure what goes live matches the organization’s definition of the system—not a model that no longer matches production use.`,
} as const;

/**
 * Core positioning: you are not “only dev” or “only analyst” —
 * you own analysis → build → automation → deployment → adoption.
 */
export const positioningStatement = {
  headline: "IS consulting and design — to systems that run the business well",

  /** Short manifesto for hero or About lead */
  manifesto: `I move from how the business and its processes actually work, to what the information system must do, then to build, integration, and go-live—so the organization is run through systems that match reality, not a slide deck from last year.`,

  notJust: [
    "“Full-stack developer” alone",
    '"Systems analyst" alone',
    "“Consulting” without delivery",
  ],

  youAre: [
    "Consult and model: how work, data, and decisions should flow in the business before design is fixed",
    "Shape the information system: requirements, data, and interfaces that match the organization’s operating model",
    "Build and integrate: full-stack delivery and APIs across CRM, ERP, and other core systems",
    "Run disciplined releases: quality gates, documentation, and a clean handover to operations",
    "Sustain adoption: training, stabilization, and follow-on change as the business and its use of information evolve",
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
  "My path so far—shaped by real-world projects, hands-on experience, complex systems, and a focus on building solutions that work.";

/** Sub-heading above program / project lists (shared across experience cards) */
export const experienceNotableProjectsTitle = "Notable Projects" as const;

/** Government & large-program credibility */
export const enterpriseSystems = {
  sectionTitle: "Government & enterprise programs",
  intro:
    "I worked as a Systems Analyst and Project Manager at Maybeach Technologies Limited, delivering enterprise software solutions across healthcare, finance, and government sectors. My role spanned the full software lifecycle, with a strong focus on quality assurance, documentation, and process optimization. I consistently delivered reliable, user-focused applications that met client and operational needs.",

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
    "I led requirements gathering and translated business needs into detailed technical specifications for development teams.",
    "I developed project work plans, timelines, and implementation strategies to ensure timely delivery.",
    "I designed and executed comprehensive test cases, identifying and resolving bugs to ensure system reliability.",
    "I created user manuals, installation guides, and technical documentation to support deployment and adoption.",
    "I facilitated communication between clients and developers, ensuring alignment, clarity, and successful project outcomes.",
  ],
} as const;

/** Healthcare EMR/EHR — differentiation */
export const healthcareDeployments = {
  sectionTitle: "Healthcare — EMR / EHR deployments",
  intro:
    "My work involves managing the development, customization, and deployment of Electronic Health Records (EHR) systems for healthcare facilities. I work closely with hospital owners, CEOs, CFOs, heads of departments across different specialties, as well as senior developers and business teams to ensure smooth collaboration and successful project delivery.",

  programs: [
    {
      shortName: "St. Nicholas Hospital",
      name: "Lagos",
    },
    {
      shortName: "NISA Premier Hospital",
      name: "Abuja",
    },
    {
      shortName: "LIMI Hospitals",
      name: "Abuja",
    },
    {
      shortName: "Zankli Medical Center",
      name: "Abuja",
    },
    {
      shortName: "Adonai Hospital",
      name: "Nasarawa",
    },
    {
      shortName: "Chivar Specialist Hospital",
      name: "Abuja",
    },
  ],

  roleSummary: [
    "I led technical presentations and product demonstrations to CEOs, CFOs, doctors, and business owners, showcasing how the system supports healthcare operations.",
    "I developed automated test scripts using Selenium and TestNG, improving test coverage and reducing manual testing effort.",
    "I implemented CI/CD pipelines with Jenkins to enable continuous testing and faster, more reliable releases.",
    "I conducted field deployments, training sessions, and onboarding for healthcare clients, improving system adoption and usability.",
    "I created user manuals and support documentation, strengthening both client understanding and internal support processes.",
  ],
} as const;

/** Freelance — API integration & automation (Upwork / Fiverr) */
export const freelanceAutomation = {
  sectionTitle: "API Integration & Workflow Automation",
  intro:
    "I work as a freelance Automation & Integration Specialist on Fiverr and Upwork, helping businesses eliminate manual work and connect their systems end-to-end. My focus is on building reliable workflows using APIs, n8n, and AI agents that actually solve real operational problems. I take time to understand how a business runs, then design automation that fits naturally into their process.",

  /** Expandable notable-project groups (Experience card — freelance only) */
  notableGroups: [
    {
      id: "business-process",
      title: "Business Process Automation",
      items: [
        "Automating GoHighLevel CRM via Telegram with n8n, Make, Zapier MCP & Cursor",
        "Automated Custom PDF Document Generator using n8n & GoogleSheets",
        "Three-Way IOLTA Trust Account Reconciliation Automation",
        "Multi-Agent MCP Workflow via Telegram Chatbot",
        "Automated Email-Based Information Retrieval System",
        "Firecrawl MCP Integration with n8n Automation",
        "Automate Law Firm Court Forms & Legal Case Documents with n8n",
        "n8n Webhook Workflow: Send CRM Data → to n8n workflow → Firecrawl Crawl & Return Result",
      ],
    },
    {
      id: "ai-agents",
      title: "AI Agents & Chatbots",
      items: [
        "WhatsApp Chatbot Automation via Cursor AI + n8n",
        "Automated Weekly Content Generator – n8n, Telegram & Google Sheets",
        "Automating GoHighLevel CRM via Telegram with n8n, Make, Zapier MCP & Cursor",
        "WhatsApp Chatbot with Subscription Access",
        "Clawdbot AI Setup: Cloud & Local Deployment with Multi-Channel Automation",
        "Telegram RAG Chatbot Using Supabase Vector Store (Answers from PDFs)",
      ],
    },
    {
      id: "quickbooks",
      title: "QuickBooks & Accounting AI Automation",
      items: [
        "QuickBooks Automated Transaction Coding Review System",
        "IOLTA Compliance Management Platform",
        "Custom Interface for QuickBooks Management Using Cursor AI + Make.com",
        "QuickBooks Account-Level Financial Chatbot",
        "Automated Bank Accounts Reconciliation for QuickBooks",
        "Automate QuickBooks Uncategorized Transaction Detection with n8n",
        "QuickBooks Old Uncleared Transactions Monitoring Tool",
        "QuickBooks Large Transaction Monitoring Automation",
        "IOLTA Account Reconciliation Automation for QuickBooks",
        "Three-Way IOLTA Trust Account Reconciliation Automation",
        "Connect to any QuickBooks Account Without API Keys Using n8n & Cursor AI",
        "QuickBooks Undeposited Funds Tracking Automation",
      ],
    },
    {
      id: "social-media",
      title: "Social Media Automation",
      items: [
        "AI Video Generation – Shotstack, ElevenLabs & Blotato",
        "n8n Automation to Create Articles, Images & Post to Social Media",
        "Automated Weekly Content Generator – n8n, Telegram & Google Sheets",
        "Video Generation with ffmpeg n8n",
        "N8N Automated Facebook Posting – Images & Articles",
        "Automated Video Generation with Kie.ai Veo3",
        "Automated Instagram Carousel Generation Using AI & Blotato API",
        "Automated Avatar Motivational Video Creation Using Fal AI & n8n",
        "RSS feed new extract + posting on Facebook and LinkedIn n8n",
      ],
    },
    {
      id: "email-warmup",
      title: "Subdomain and Email Warmup Automation",
      items: [
        "Domain & hosting (Zoho) — Adds the subdomain in Zoho Mail and enables mail hosting",
        "DNS setup (Cloudflare + Zoho) — Configure MX / SPF / DKIM / DMARC in Cloudflare and runs Zoho DNS checks so authentication and routing are correct before connections go live.",
        "Mailbox & SMTP (Zoho + Mailgun) — Creates the mailbox, sets up Mailgun SMTP credentials, and connects IMAP/SMTP so mail can receive and send as designed.",
        "Mailivery warmup — Connects the mailbox to Mailivery, applies volume / schedule / ramp‑up, and starts warmup using the finalized DNS and credentials.",
      ],
    },
  ],

  roleSummary: [
    "I design and build end-to-end workflow automation systems using n8n, APIs, webhooks, OAuth, and JWT.",
    "I integrate CRMs (HubSpot, Salesforce, GoHighLevel, custom systems) with internal tools, finance platforms, and databases.",
    "I develop AI-powered workflows for data classification, routing, summarization, and decision support.",
    "I automate reporting, data synchronization, and error handling to ensure reliable, production-ready systems.",
    "I analyze business processes, redesign workflows, and implement automation that reduces manual effort and improves efficiency.",
  ],
} as const;

/** Northsnow — product suite & engineering scope */
export const northsnowExperience = {
  sectionTitle: "Full-stack product delivery",
  intro:
    "I build functional products, not just apps—turning ideas into scalable, production-ready systems. I work across mobile, web, and backend, combining clean architecture with real-time workflows, automation, and AI. My focus is on creating applications that function, connect, respond, and scale with the business. From MVP to full deployment, I handle the entire lifecycle.",

  notableProjects: [
    {
      title: "Godeapp",
      description:
        "A unified social platform that connects cloud storage (Google Drive, Dropbox, OneDrive) with content sharing, live streaming, subscriptions, and creator monetization—all in one ecosystem.",
    },
    {
      title: "Quantiva",
      description:
        "An AI-powered document generation platform that supports everything from academic writing to enterprise compliance, serving individuals, teams, and entire organizations.",
    },
    {
      title: "PainScope",
      description:
        "Autonomous AI agents that continuously scan the web to identify unmet customer needs and quantify their business potential with data-backed insights.",
    },
    {
      title: "Leadii",
      description:
        "AI-driven outbound system that researches, qualifies, and engages prospects across WhatsApp, SMS, and social platforms—running fully automated outreach workflows.",
    },
    {
      title: "PayPill",
      description:
        "A digital healthcare ecosystem combining AI and blockchain to deliver intelligent patient management and next-generation healthcare infrastructure.",
    },
    {
      title: "DataMiner AI",
      description:
        "A structured web scraping and data extraction platform that pulls data from predefined sources, processes it, and generates clean, actionable reports automatically.",
    },
    {
      title: "IOLTA Compliance & QuickBooks AI Agent",
      description:
        "An AI-powered compliance system that monitors trust accounts, integrates with QuickBooks, detects anomalies, and keeps firms audit-ready through a natural language interface.",
    },
  ],

  roleSummary: [
    "I design and build full-stack applications across mobile, web, and backend systems using modern frameworks and scalable architectures.",
    "I develop event-driven systems using APIs and webhooks, enabling real-time automation and seamless system communication.",
    "I integrate AI capabilities into products for decision-making, automation, and intelligent user interactions.",
    "I handle end-to-end product development—from architecture and database design to deployment and scaling.",
    "I build production-ready MVPs that are stable, extensible, and aligned with real business use cases.",
  ],
} as const;

/**
 * Experience section — vertical timeline (dates & locations as provided).
 * Program and healthcare lines are derived from the blocks above.
 */
export const experienceTimeline = [
  {
    id: "maybeach",
    organization: "Maybeach Technologies Limited",
    location: "Abuja, Nigeria",
    periodLabel: "Sep 2019 – Jan 2021",
    role: "Project Manager & Systems Analyst",
    eyebrow: enterpriseSystems.sectionTitle,
    intro: enterpriseSystems.intro,
    projectsSectionTitle: experienceNotableProjectsTitle,
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
    projectsSectionTitle: experienceNotableProjectsTitle,
    programs: healthcareDeployments.programs.map(
      (p) => `${p.shortName} — ${p.name}`
    ),
    roleSectionTitle: "Key Roles & Contributions",
    roleBullets: [...healthcareDeployments.roleSummary],
  },
  {
    id: "freelance",
    organization: "Upwork & Fiverr",
    location: "Freelancing",
    periodLabel: "2024 – Till Date",
    role: "Business Automation, and API Integration",
    eyebrow: freelanceAutomation.sectionTitle,
    intro: freelanceAutomation.intro,
    projectsSectionTitle: experienceNotableProjectsTitle,
    programGroups: [...freelanceAutomation.notableGroups],
    roleSectionTitle: "Key Roles & Contributions",
    roleBullets: [...freelanceAutomation.roleSummary],
  },
  {
    id: "northsnow",
    organization: "Northsnow",
    location: "United Kingdom",
    periodLabel: "Mar 2024 – Present",
    role: "Software Engineer",
    eyebrow: northsnowExperience.sectionTitle,
    intro: northsnowExperience.intro,
    projectsSectionTitle: experienceNotableProjectsTitle,
    programs: northsnowExperience.notableProjects.map(
      (p) => `${p.title} — ${p.description}`
    ),
    roleSectionTitle: "Key Roles & Contributions",
    roleBullets: [...northsnowExperience.roleSummary],
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
    imageSrc: "/avatar.svg",
  },
  {
    id: "show-quantiva",
    title: "Quantiva",
    categoryId: "data-viz" as const,
    imageSrc: "/avatar.svg",
  },
  {
    id: "show-painscope",
    title: "PainScope",
    categoryId: "saas-web-app" as const,
    imageSrc: "/avatar.svg",
  },
  {
    id: "show-paypill",
    title: "PayPill",
    categoryId: "crm-api" as const,
    imageSrc: "/avatar.svg",
  },
  {
    id: "show-leadii",
    title: "Leadii",
    categoryId: "crm-api" as const,
    imageSrc: "/avatar.svg",
  },
  {
    id: "show-accounting",
    title: "Accounting Automation",
    categoryId: "saas-web-app" as const,
    imageSrc: "/avatar.svg",
  },
  {
    id: "show-n8n-flow",
    title: "Enterprise workflow hub",
    categoryId: "ai-agent" as const,
    imageSrc: "/avatar.svg",
  },
  {
    id: "show-api-mesh",
    title: "API integration mesh",
    categoryId: "crm-api" as const,
    imageSrc: "/avatar.svg",
  },
  {
    id: "show-social-suite",
    title: "Cross-channel publishing",
    categoryId: "social-automation" as const,
    imageSrc: "/avatar.svg",
  },
  {
    id: "show-insights",
    title: "Operations insights dashboard",
    categoryId: "data-viz" as const,
    imageSrc: "/avatar.svg",
  },
  {
    id: "show-agent-rag",
    title: "RAG support assistant",
    categoryId: "ai-agent" as const,
    imageSrc: "/avatar.svg",
  },
  {
    id: "show-growth",
    title: "Growth analytics cockpit",
    categoryId: "data-viz" as const,
    imageSrc: "/avatar.svg",
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
