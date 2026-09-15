import type { Project } from "@/lib/types";

export const browserCoder: Project = {
  slug: "browser-coder",
  title: "Browser Coder",
  oneLiner: "A teaching IDE with six-language execution, step-by-step debugging and replayable Python Turtle graphics.",
  hook: "Getting an answer is one thing. Understanding how the program got there is another.",
  snapshot: {
    problem: "A learner can run a program and still be unsure which line, variable or execution state explains the result.",
    move: "Connect the editor, debugger, source-linked feedback and visual output inside a workspace that also fits into a lesson.",
    contribution: "I build, support, and continually expand Browser Coder with one coworker. My work includes learning-platform integration, the execution refactor, debugging tools, diagnostics and reliability fixes.",
    proof: "A live product, public source, merged contribution history, and recorded Python execution, debugging and Turtle replay from the original application.",
  },
  tier: "flagship",
  stages: ["frame", "build", "prove", "field"],
  domain: ["education", "platform"],
  role: "Co-developer · integration, debugging & architecture",
  team: "Two developers · my coworker and me",
  started: "2026-04",
  status: "live",
  statusLabel: "Live · Continuously supported",
  statusDetail: "Actively supported and expanded by two developers. Together, Arc and Browser Coder serve 3,000+ students, instructors and managers.",
  evidenceNote: "Public code and merged pull requests document my contributions from April-August 2026. The September 2026 tour runs sample programs against a real local Python execution service. Capture source revisions are recorded alongside the media.",
  metrics: [
    { label: "Shared platform reach", value: "3,000+ people", note: "Arc and Browser Coder combined: students, instructors and managers" },
    { label: "Language adapters", value: "6", note: "JavaScript, TypeScript, Python, Java, PHP and C#" },
    { label: "Interface", value: "EN + HE", note: "Teaching explanations and controls" },
    { label: "Execution", value: "Server-side", note: "Browser editor, managed language processes" },
  ],
  stack: ["TypeScript", "Monaco", "Vite", "Node.js", "Express", "IndexedDB", "Python", "Java", "PHP", ".NET", "Docker", "nginx"],
  links: {
    repo: "https://github.com/ninasokolov8/browser-coder",
    live: "http://167.71.63.99/?mode=full",
  },
  sections: [
    {
      stage: "frame",
      heading: "A workspace that fits the lesson",
      body: [
        "One coworker and I develop Browser Coder as part of the learning platform we support. A learner can work in its full browser interface, or encounter a smaller coding activity embedded in Arc.",
        "My integration work connected those contexts through a host-message protocol, predictable workspace initialization and shared controls for running code, editing files and showing panels. A lesson can set the boundaries of an activity without maintaining a separate editor.",
      ],
    },
    {
      stage: "build",
      heading: "One path from code to execution",
      body: [
        "Single-file and multi-file projects, buffered runs and interactive sessions had accumulated different execution paths. I contributed a refactor that brings them through one pipeline and a registry of language adapters, so transport choices do not quietly change how the same program behaves.",
        "Monaco and the workspace run in the browser. Compilation, execution and debugging run on the server in managed language processes with per-run workspaces. The service streams output, accepts interactive input, enforces resource limits and cleans up when a session ends.",
      ],
    },
    {
      stage: "build",
      heading: "Make the current step understandable",
      body: [
        "My contributions include debugger adapters and their interface, compiler diagnostics, explanatory hovers and source-linked output. Breakpoints, variable values and the call stack give a learner concrete things to inspect when a result surprises them.",
        "Recorded pause history lets a learner compare earlier snapshots while a debug session is paused. It changes the view, not the running program. Python Turtle adds a different kind of explanation: recorded drawing commands can be replayed alongside the source that produced them.",
      ],
    },
    {
      stage: "prove",
      heading: "A stopped program should look stopped",
      body: [
        "One regression left the debugger toolbar, current-line highlight and history controls on screen after a program had finished. The interface appeared to offer actions against a session that no longer existed.",
        "I centralized session teardown across completion, Stop, errors, disconnection, closing the source tab and revoked run permission. The finished run's history and decorations clear together, while the learner's breakpoints remain ready for the next run. Regression tests cover that behavior against a real Python session.",
      ],
    },
    {
      stage: "field",
      heading: "Show output only when it means something",
      body: [
        "Another small-looking issue opened a blank Turtle window when ordinary Python reached its first breakpoint. An empty graphics payload was being treated as evidence of a drawing.",
        "I moved that decision to the shared rendering boundary: a program must produce drawable content before the window appears. Run, Debug and embedded delivery now use the same rule. It is a useful example of the work I enjoy - following a confusing product behavior back to the state and boundaries that caused it.",
      ],
    },
  ],
  architecture: {
    caption: "The editor lives in the browser; language execution is a separate, managed server workflow.",
    nodes: [
      { id: "workbench", label: "Browser workbench", sub: "Monaco · IndexedDB", x: 0, y: 1, kind: "client", note: "Editing, local workspace persistence, diagnostics and debugger presentation." },
      { id: "host", label: "Learning platform", sub: "Arc / Step-Up", x: 0, y: 0, kind: "client", note: "An external host can initialize an embedded activity and set its editing and execution policy." },
      { id: "api", label: "Execution API", sub: "HTTP · NDJSON", x: 1, y: 1, kind: "edge", note: "Validates requests and carries output, input and session control." },
      { id: "pipeline", label: "Shared run pipeline", sub: "Lifecycle · limits", x: 2, y: 1, kind: "service", note: "One execution path selects the language adapter and manages the run's lifecycle." },
      { id: "languages", label: "Language adapters", sub: "Compile · run · debug", x: 3, y: 0, kind: "service", note: "Six adapters connect the pipeline to the relevant server-side toolchains and debug protocols." },
      { id: "jobs", label: "Per-run workspaces", sub: "Files · temporary output", x: 3, y: 2, kind: "store", note: "Each run has its own job directory. Production hardening is applied at the API-container level; this is not a container per learner." },
    ],
    edges: [
      { from: "host", to: "workbench", label: "validated messages" },
      { from: "workbench", to: "api", label: "run / inspect" },
      { from: "api", to: "pipeline" },
      { from: "pipeline", to: "languages" },
      { from: "pipeline", to: "jobs" },
    ],
  },
  decisions: [
    {
      id: "BC-01", date: "2026-07",
      title: "Separate the language from the way a run is delivered.",
      why: "Different execution paths had drifted in validation, runtime flags and interactive behavior.",
      tradeoff: "A more explicit adapter contract and migration work in exchange for one place to manage a run.",
      revisit: "When a new language requires a genuinely different lifecycle that the shared contract cannot represent clearly.",
    },
    {
      id: "BC-02", date: "2026-08",
      title: "End the debugger session as one operation.",
      why: "A finished program must not leave controls and highlights implying that it is still paused.",
      tradeoff: "Finished-run snapshot review is removed; breakpoint settings remain for the next run.",
      revisit: "If persistent run recordings become an explicit product feature with their own storage and lifecycle.",
    },
    {
      id: "BC-03", date: "2026-08",
      title: "Let drawable content decide whether Turtle output opens.",
      why: "Run, Debug and embedded delivery were interpreting empty graphics payloads differently.",
      tradeoff: "A shared content check at the rendering boundary replaces convenient checks in individual callers.",
      revisit: "If the product introduces a deliberate blank-canvas activity that needs a different, explicit opening rule.",
    },
  ],
};
