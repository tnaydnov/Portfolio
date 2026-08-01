import type { Project } from "@/lib/types";

export const applytide: Project = {
  slug: "applytide",
  title: "Applytide",
  oneLiner:
    "A job-application management platform: pipeline, documents, reminders, analytics and interview prep.",
  hook: "A job search is a pipeline with terrible instrumentation. I built the instrumentation.",
  tier: "flagship",
  stages: ["signal", "frame", "plan", "build", "prove", "field"],
  domain: ["product", "platform", "applied-ai"],
  role: "Product & architecture · Full-stack build",
  team: "Two contributors",
  started: "2025-01",
  ended: "2026-04",
  status: "archived",
  metrics: [
    { label: "Services", value: "6", note: "Compose topology" },
    { label: "Data models", value: "20", note: "PostgreSQL, UUID keys" },
    { label: "API routers", value: "14", note: "REST + WebSocket" },
    { label: "Locales", value: "2", note: "EN / HE, full RTL" },
  ],
  stack: [
    "React 18",
    "TypeScript",
    "FastAPI",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Nginx",
    "OpenAI API",
    "Chrome MV3",
  ],
  links: { repo: "https://github.com/tnaydnov/Applytide" },
  sections: [
    {
      stage: "signal",
      heading: "The tracking is the job",
      body: [
        "Anyone running a serious job search is operating a pipeline: sourcing, qualification, application, follow-up, interview, decision. It has stages, conversion rates, and a cycle time. It is a process, and people run it in a spreadsheet or in their head.",
        "The friction is not finding jobs. It is the accounting around them — which version of the CV went where, what you said in the cover letter, when you promised to follow up, and which of forty applications is actually still alive. That work is boring, high-frequency, and exactly what software is for.",
        "What I got wrong initially: I assumed the painful step was writing applications. It was not. The painful step was capture — getting a posting out of a browser tab and into a structured record before the tab closed. Everything downstream depends on that one moment being frictionless.",
      ],
    },
    {
      stage: "frame",
      heading: "Constraints that actually bound the design",
      body: [
        "Two real constraints shaped almost every decision. The first was cost: any feature calling a language model has an unbounded bill attached to it, and a personal project cannot absorb that. The second was trust: this system holds a user's CV, their employment history, and a list of every company they are quietly talking to. That is a small dataset with a very high blast radius.",
        "So security and cost control were not features to add later — they were framing constraints. That is why the build contains things a side project usually skips: HttpOnly cookie sessions rather than tokens in localStorage, TOTP two-factor, revocable session tracking, per-endpoint rate limits, and a hard daily spending cap on AI calls enforced in Redis.",
        "Explicitly out of scope: automated applying. It was the most-requested idea and I refused it. Mass-applying is a strategy that fails candidates and annoys employers, and building it would have made the product worse at the thing it was for.",
      ],
    },
    {
      stage: "plan",
      heading: "Capture first, because everything hangs off it",
      body: [
        "Since capture was the load-bearing step, the browser extension was built early rather than as an add-on. Getting a posting into the system in one click is the difference between a tool someone uses and a tool someone means to use.",
        "The rest sequenced along the pipeline itself: capture, then the Kanban stages that model the process, then documents, then the reminder and analytics layers that only become meaningful once there is history to reason about. Analytics last is deliberate — a dashboard over three records is decoration.",
        "The architecture was planned as separate services from the start where the boundaries were genuinely different: HTML email rendering is a Node concern, background scheduling is not an API concern, and the reverse proxy is where rate limiting belongs.",
      ],
    },
    {
      stage: "build",
      heading: "Six containers, and a defence for each",
      body: [
        "The system runs as a Docker Compose topology: Nginx terminating and rate-limiting, a React SPA, a FastAPI backend, a Node email microservice, PostgreSQL, Redis, and a scheduler process for background work.",
        "The backend is layered rather than flat — an API layer of 14 routers with Pydantic schemas at the boundary, a domain layer holding business logic, a persistence layer of 20 SQLAlchemy models under Alembic migrations, and an infrastructure layer for email, LLM access, security and workers. The point of that separation is that the LLM integration is infrastructure, not business logic; it can be swapped or disabled without touching the domain.",
        "The hardest problem was extraction: turning an arbitrary job page into structured fields. The naive answer is to send the page to a model. That answer is wrong for reasons covered in the decision log below.",
        "The second hardest was internationalisation. Full Hebrew support means real RTL — not a mirrored stylesheet, but a layout that is correct in both directions, including inputs, charts, and drag-and-drop. Retrofitting that is expensive, which is why it was designed in rather than bolted on.",
      ],
    },
    {
      stage: "prove",
      heading: "Budgets, health checks, and the things you cannot unit-test",
      body: [
        "Some of this was conventional: Pydantic schemas validating every endpoint boundary, parameterised queries throughout, a health endpoint checking both Postgres and Redis.",
        "The parts I care more about are the ones that catch failures a test suite would not. LLM usage is logged per call with token counts and cost attributed to a user, against a configurable daily budget. That is not observability theatre — it is the mechanism that makes an AI feature safe to leave running unattended.",
        "Session management is testable in the same spirit: a user can list their active sessions and revoke them. The question that validates it is not 'does the endpoint return 200', it is 'can a user who lost a laptop actually recover'.",
      ],
    },
    {
      stage: "field",
      heading: "Archived on purpose",
      body: [
        "Applytide is archived, and I would rather say why than quietly leave it looking active.",
        "It reached the point where it did what it was designed to do, and the remaining work was operational — running infrastructure, absorbing AI costs for other people, and maintaining a security surface that deserves real attention rather than spare evenings. Continuing would have meant committing to operate a product, which is a different decision from building one.",
        "What it produced instead is the clearest evidence I have of end-to-end system ownership: a real architecture, real security posture, real cost controls, and a documented set of decisions I can still defend.",
      ],
    },
  ],
  architecture: {
    caption:
      "Applytide's runtime topology. Every box had to answer two questions: why does this exist, and what would it take to delete it.",
    nodes: [
      {
        id: "ext",
        label: "Chrome extension",
        sub: "Manifest V3",
        x: 0,
        y: 0,
        kind: "client",
        note: "One-click capture from any job page. Exists because capture was the load-bearing step; without it the pipeline never gets populated. Deleting it would mean manual entry, which historically means no entry.",
      },
      {
        id: "nginx",
        label: "Nginx",
        sub: "Reverse proxy · TLS · rate limit",
        x: 1,
        y: 1,
        kind: "edge",
        note: "Rate limiting belongs at the edge, not in application code, so that abuse is rejected before it costs a database connection. Removable only by moving those concerns into a managed edge layer.",
      },
      {
        id: "web",
        label: "React SPA",
        sub: "Vite · TS · Tailwind",
        x: 2,
        y: 0,
        kind: "client",
        note: "48 shadcn/ui components over Radix primitives, with full RTL. Kept as an SPA rather than SSR because the app is entirely behind auth — there is nothing to serve to a crawler.",
      },
      {
        id: "api",
        label: "FastAPI",
        sub: "14 routers · domain layer",
        x: 2,
        y: 1,
        kind: "service",
        note: "The core. Layered API / domain / db / infra so that LLM access is swappable infrastructure rather than business logic.",
      },
      {
        id: "mail",
        label: "Email service",
        sub: "Node · React Email",
        x: 2,
        y: 2,
        kind: "service",
        note: "Separate because HTML email rendering is a JavaScript ecosystem problem and forcing it into Python would have meant worse templates. The clearest case in the system for a service boundary.",
      },
      {
        id: "worker",
        label: "Scheduler",
        sub: "APScheduler",
        x: 4,
        y: 2,
        kind: "service",
        note: "Background jobs, cleanup and reminder dispatch. Split from the API so that a slow job cannot occupy a request worker.",
      },
      {
        id: "pg",
        label: "PostgreSQL 16",
        sub: "20 models · Alembic",
        x: 3,
        y: 0,
        kind: "store",
        note: "UUID primary keys, UTC timestamps, JSONB for the genuinely variable fields. Migrations under Alembic from the first model.",
      },
      {
        id: "redis",
        label: "Redis 7",
        sub: "Cache · limits · AI budget",
        x: 3,
        y: 1,
        kind: "store",
        note: "Also the enforcement point for the daily LLM spending cap. That single use justifies it independently of caching.",
      },
    ],
    edges: [
      { from: "ext", to: "nginx" },
      { from: "nginx", to: "web" },
      { from: "nginx", to: "api" },
      { from: "nginx", to: "mail" },
      { from: "api", to: "pg" },
      { from: "api", to: "redis" },
      { from: "api", to: "mail", label: "render" },
      { from: "worker", to: "pg" },
      { from: "worker", to: "mail", label: "dispatch" },
    ],
  },
  decisions: [
    {
      id: "D-01",
      date: "2025",
      title:
        "Three-stage extraction cascade (JSON-LD → DOM → LLM) instead of LLM-only parsing.",
      why: "A large share of job boards already publish valid JobPosting structured data, which is free, instant and exact. Sending those pages to a model would mean paying per job for a worse answer, and models hallucinate confidently on fields like salary where being wrong is costly.",
      tradeoff:
        "Three code paths and three distinct failure modes to maintain instead of one, in exchange for lower cost and higher precision on the majority path.",
      revisit:
        "If model cost per extraction falls far enough that the accounting stops mattering, or if structured-data coverage across boards collapses.",
    },
    {
      id: "D-02",
      date: "2025",
      title: "Hard daily LLM budget enforced in Redis, with per-user attribution.",
      why: "Any AI feature exposed to users is an uncapped liability. Logging token usage after the fact tells you what went wrong; a budget stops it.",
      tradeoff:
        "Users can hit a ceiling and see a degraded experience on a bad day, which is a worse product moment than silently paying. I preferred a bounded bill.",
      revisit:
        "If usage patterns become predictable enough to move from a hard cap to per-user quotas.",
    },
    {
      id: "D-03",
      date: "2025",
      title: "JWT in HttpOnly cookies, not tokens in localStorage.",
      why: "The dataset is a user's employment history and a list of companies they are privately talking to. Any XSS in an SPA turns localStorage tokens into a full account takeover.",
      tradeoff:
        "CSRF becomes a concern that has to be handled explicitly, and cross-origin setups get harder. That is a better class of problem to own.",
      revisit: "Not without a very good reason.",
    },
    {
      id: "D-04",
      date: "2025",
      title: "Refused automated mass-applying, the most requested feature.",
      why: "It optimises the metric the product displays while making the user's actual outcome worse, and it degrades the ecosystem it operates in. A tool for running a search well should not ship a feature that runs it badly at scale.",
      tradeoff:
        "Gave up the single most obviously marketable capability and the growth story attached to it.",
      revisit: "No.",
    },
    {
      id: "D-05",
      date: "2026-04",
      title: "Archive rather than operate.",
      why: "Remaining work was operational — infrastructure, absorbing others' AI costs, and maintaining a security surface that deserves real attention. That is a commitment to operate a product, which is a different decision from building one.",
      tradeoff:
        "No live deployment to show, and no usage metrics. The code, architecture and reasoning remain inspectable.",
      revisit:
        "If there is a reason to operate it that justifies the running cost and the duty of care.",
    },
  ],
  constraints: {
    question: "How should an arbitrary job page become structured data?",
    actual: {
      time: 1,
      scope: 1,
      note: "Real conditions: solo build, ongoing cost exposure, and a correctness bar high enough that a wrong salary field is worse than no salary field. That combination points at the cascade.",
    },
    scenarios: [
      {
        time: 0,
        scope: 0,
        outcome:
          "LLM-only. One code path, ships in an afternoon, and you accept both the per-job cost and the hallucinated fields. Correct choice for a prototype whose purpose is to test whether anyone wants capture at all.",
      },
      {
        time: 0,
        scope: 1,
        outcome:
          "JSON-LD with an LLM fallback. Two paths. Captures most of the cost saving for a fraction of the work — the pragmatic version if the deadline is real.",
      },
      {
        time: 0,
        scope: 2,
        outcome:
          "Not coherent. Broad scope on a short clock produces three half-built paths and no reliable one.",
      },
      {
        time: 1,
        scope: 0,
        outcome:
          "LLM-only, but instrumented properly: per-call cost logging and a budget cap. Cheaper to build, and the telemetry tells you later whether the cascade is worth it.",
      },
      {
        time: 1,
        scope: 1,
        outcome:
          "The three-stage cascade — JSON-LD, then DOM parsing, then LLM fallback. What I actually built. Free and exact on the majority path, degrading gracefully to paid-and-fuzzy only when it has to.",
      },
      {
        time: 1,
        scope: 2,
        outcome:
          "Cascade plus per-board adapters for the top sites. Better accuracy, but each adapter is a maintenance liability that breaks silently when a site redesigns.",
      },
      {
        time: 2,
        scope: 0,
        outcome:
          "Overkill in the wrong direction. Time spent perfecting a single fragile path that structured data would have solved for free.",
      },
      {
        time: 2,
        scope: 1,
        outcome:
          "Cascade with an evaluation harness — a labelled corpus of pages measuring precision per stage, so routing decisions are evidence-based rather than intuited.",
      },
      {
        time: 2,
        scope: 2,
        outcome:
          "Cascade, evaluation harness, and a fine-tuned small model for the fallback tier. Best accuracy per unit cost, and only justifiable at real volume.",
      },
    ],
  },
  rebuild: [
    "Build the evaluation harness for extraction first. I made routing decisions between the three stages on judgement when a labelled corpus of a few hundred pages would have made them measurable.",
    "Start with one locale and add Hebrew at a defined checkpoint. Designing bidirectional from day one was the right call architecturally, but it taxed every single component while the product still had no users.",
    "Cut the admin panel. It was built because it was interesting, and it served one administrator — me. That effort belonged in capture reliability.",
  ],
};
