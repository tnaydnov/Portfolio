import type { Project } from "@/lib/types";

export const applytide: Project = {
  slug: "applytide",
  title: "Applytide",
  oneLiner: "A job-search workspace for capturing opportunities, tracking applications, managing documents, and preparing for interviews.",
  hook: "Give every opportunity a place, a history, and a next step.",
  snapshot: {
    problem: "Job postings, tailored CVs, follow-ups, and interview notes were scattered across browser tabs, files, and memory.",
    move: "Capture a posting from the browser and keep its documents, progress, reminders, and preparation together.",
    contribution: "I designed and built the complete product: Chrome extension, React interface, FastAPI backend, data model, document tools, and AI cost controls.",
    proof: "Archived public source and a recorded local application workflow, including persisted stage changes, notes, documents and reminders.",
  },
  tier: "flagship",
  stages: ["signal", "frame", "build", "field"],
  domain: ["product", "platform", "applied-ai"],
  role: "Product · design · full-stack engineering",
  team: "Solo project · sole creator",
  started: "2025-08",
  ended: "2026-04",
  status: "archived",
  statusLabel: "Source archived",
  statusDetail: "The final version is local-only after hosted infrastructure was removed. The public repository is archived.",
  evidenceNote: "Built independently from August 2025 to April 2026. September 2026 captures run the archived product with a fresh database and fictional account. The extension and paid AI integrations are documented in source but were not exercised in this tour; no external-usage results are reported.",
  metrics: [
    { label: "Capture", value: "Browser → record", note: "Chrome extension and structured extraction" },
    { label: "Workflow", value: "One pipeline", note: "Stages, reminders, and interview preparation" },
    { label: "Documents", value: "In context", note: "Application materials stay with the opportunity" },
    { label: "AI controls", value: "Bounded spend", note: "Usage attribution and a configurable daily budget" },
  ],
  stack: ["React 18", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "Docker", "Nginx", "OpenAI API", "Chrome MV3"],
  links: { repo: "https://github.com/tnaydnov/Applytide" },
  sections: [
    {
      stage: "signal",
      heading: "Start where the opportunity appears",
      body: [
        "A job search creates a lot of small records: the posting, the CV version, the follow-up date, the interview notes. I wanted those records to stay connected instead of becoming another collection of tabs.",
        "Capture became the starting point. The extension brings a posting into the application pipeline; document management, reminders, analytics, and interview preparation build on that record.",
      ],
    },
    {
      stage: "frame",
      heading: "Use AI where it earns its cost",
      body: [
        "Extraction tries structured JobPosting data first, then the page's DOM, then an LLM fallback. A usable source field can pass through without a model call; unfamiliar pages still have a fallback.",
        "The AI layer records usage and account attribution against a configurable daily budget. The product also includes cookie-based sessions, session revocation, two-factor authentication, and request limits.",
      ],
    },
    {
      stage: "build",
      heading: "Build around distinct responsibilities",
      body: [
        "The React interface talks to a layered FastAPI backend backed by PostgreSQL and Redis. A separate Node service renders email, and a scheduler handles reminders and background work.",
        "I built the interface for English and Hebrew, including right-to-left layouts. The same attention to state appears in application stages, document history, and user-managed sessions.",
      ],
    },
    {
      stage: "field",
      heading: "An implemented product, preserved as source",
      body: [
        "Applytide became a local-only project after its hosted infrastructure was removed. The repository is archived, with the product and its engineering decisions available to inspect.",
        "The next investment I would make is an extraction evaluation set: representative job pages, expected fields, and measurements for each stage of the cascade.",
      ],
    },
  ],
  architecture: {
    caption: "The application separates browser capture, API behavior, persistence, email rendering, and scheduled work. Deployment configuration is preserved in the archived source.",
    nodes: [
      { id: "ext", label: "Chrome extension", sub: "Capture a posting", x: 0, y: 0, kind: "client", note: "Starts a structured application record from a job posting in the browser." },
      { id: "nginx", label: "Nginx", sub: "Routing + edge limits", x: 1, y: 1, kind: "edge", note: "The reverse proxy routes requests and applies edge-level controls." },
      { id: "web", label: "React interface", sub: "Pipeline + documents", x: 2, y: 0, kind: "client", note: "An authenticated workspace for opportunities, documents, reminders, and preparation, with English and Hebrew layouts." },
      { id: "api", label: "FastAPI", sub: "API + domain logic", x: 2, y: 1, kind: "service", note: "Separates request handling, domain behavior, data access, and infrastructure such as LLM calls." },
      { id: "mail", label: "Email service", sub: "Node + React Email", x: 2, y: 2, kind: "service", note: "Renders email templates in a dedicated JavaScript service." },
      { id: "worker", label: "Scheduler", sub: "Reminders + cleanup", x: 4, y: 2, kind: "service", note: "Runs background tasks separately from the API's request workers." },
      { id: "pg", label: "PostgreSQL", sub: "Records + migrations", x: 3, y: 0, kind: "store", note: "Stores application data with Alembic migrations, UUID keys, timestamps, and variable fields in JSONB." },
      { id: "redis", label: "Redis", sub: "Cache + usage limits", x: 3, y: 1, kind: "store", note: "Supports caching, limits, and the configured daily AI spending budget." },
    ],
    edges: [
      { from: "ext", to: "nginx" }, { from: "nginx", to: "web" }, { from: "nginx", to: "api" },
      { from: "nginx", to: "mail" }, { from: "api", to: "pg" }, { from: "api", to: "redis" },
      { from: "api", to: "mail", label: "Render" }, { from: "worker", to: "pg" }, { from: "worker", to: "mail", label: "Dispatch" },
    ],
  },
  decisions: [
    {
      id: "D-01", date: "2025", title: "Try source data before a model call.",
      why: "Structured JobPosting fields can be extracted directly when a page provides them.",
      tradeoff: "JSON-LD, DOM, and LLM paths each need maintenance. Extraction coverage was not benchmarked.",
      revisit: "When measured coverage or model costs justify a different routing strategy.",
    },
    {
      id: "D-02", date: "2025", title: "Put a budget around AI usage.",
      why: "Per-call usage can accumulate beyond a personal project's operating budget.",
      tradeoff: "A daily ceiling can make AI features temporarily unavailable.",
      revisit: "When real usage supports more precise account-level quotas.",
    },
    {
      id: "D-03", date: "2025", title: "Use HttpOnly cookie sessions.",
      why: "Session credentials should not be readable by application JavaScript.",
      tradeoff: "Cookie authentication also needs explicit CSRF and cross-origin handling.",
      revisit: "When the authentication model or client environment changes.",
    },
    {
      id: "D-04", date: "2025", title: "Keep application submission in the user's hands.",
      why: "The product organizes a search and its context; automated mass-applying was outside its scope.",
      tradeoff: "Users still review and send each application themselves.",
      revisit: "Only if automation can preserve deliberate, user-reviewed applications.",
    },
    {
      id: "D-05", date: "2026-04", title: "Keep the source without operating the service.",
      why: "Hosting, AI costs, and ongoing maintenance required a separate commitment.",
      tradeoff: "The public artifact is source code; the final application runs locally.",
      revisit: "If a clear operating plan justifies restarting the service.",
    },
  ],
  constraints: {
    question: "How should a job page become structured data?",
    actual: { time: 1, scope: 1, note: "A solo project with ongoing model costs and a need to preserve source fields accurately." },
    scenarios: [
      { time: 0, scope: 0, outcome: "LLM-only parsing: one path for an early prototype, with model costs and output checks still required." },
      { time: 0, scope: 1, outcome: "JSON-LD with an LLM fallback. Two extraction paths keep the initial implementation smaller." },
      { time: 0, scope: 2, outcome: "Reduce the scope first. A short deadline leaves little room to validate several extraction paths." },
      { time: 1, scope: 0, outcome: "LLM-only parsing with per-call usage tracking, output validation, and a budget cap." },
      { time: 1, scope: 1, outcome: "The implemented cascade: JSON-LD, DOM parsing, then an LLM fallback. Usable source data avoids a model call." },
      { time: 1, scope: 2, outcome: "Add adapters for selected job boards, accepting the maintenance cost when their layouts change." },
      { time: 2, scope: 0, outcome: "Use the extra time to evaluate a focused extraction path before adding more features." },
      { time: 2, scope: 1, outcome: "Add a labeled evaluation set to measure field accuracy and coverage across the cascade." },
      { time: 2, scope: 2, outcome: "Evaluate the cascade and board adapters, then test whether a smaller fallback model improves cost and quality." },
    ],
  },
  rebuild: [
    "Create a representative extraction evaluation set before changing the cascade.",
    "Add a second interface language at a defined checkpoint, after the core workflow is stable.",
    "Keep administrative tooling proportional to the project's actual operating needs.",
  ],
};
