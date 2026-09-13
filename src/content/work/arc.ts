import type { Project } from "@/lib/types";

export const arc: Project = {
  slug: "arc",
  title: "Arc",
  oneLiner: "An educational platform connecting curriculum, classroom activities, student feedback, and program reporting.",
  hook: "Connect curriculum, classroom work, and program decisions.",
  snapshot: {
    problem: "Curriculum planning, classroom delivery, and program reporting can lose context when the material, student work, and feedback live in separate tools.",
    move: "Give students, instructors, and program teams connected workspaces, preserving the relationship between reusable content, classroom activity, and reviewed work.",
    contribution: "I build, support, and continually expand Arc with one coworker. My work spans typed application boundaries, permissions, realtime workflows, touch-friendly editors, and automated delivery checks.",
    proof: "A live portal, dated contribution history, automated delivery checks, and real local captures of the development build across its learning and management portals.",
  },
  tier: "flagship",
  stages: ["signal", "frame", "plan", "build", "prove", "field"],
  domain: ["product", "education", "platform"],
  role: "Co-developer · platform & product engineering",
  team: "Two developers · my coworker and me",
  started: "2026-01",
  status: "live",
  statusLabel: "Live · Continuously supported",
  statusDetail: "Actively supported and expanded by two developers. Together, Arc and Browser Coder serve 3,000+ students, instructors and managers.",
  evidenceNote: "Refreshed September 12, 2026 from the repository, product demo, workflow results and portal availability. The product tour runs development source with fictional classroom data in an isolated local database. Private source and learner records remain private; production has a separate release.",
  metrics: [
    { label: "Shared platform reach", value: "3,000+ people", note: "Arc and Browser Coder combined: students, instructors and managers" },
    { label: "Student experience", value: "Five themes", note: "Aurora, Aurora Light, Neon Hacker, Magic Forest and Space" },
    { label: "Activity catalog", value: "21 registered kinds", note: "Individual work, live sessions and external integrations have different handlers" },
    { label: "Curriculum", value: "Rule-based drafts", note: "Reusable activities, editable before publishing" },
    { label: "Delivery", value: "Gated CI", note: "Checks precede deployment of the tested commit" },
  ],
  stack: ["Laravel 11", "PHP 8.2+", "Blade", "Alpine.js", "TypeScript", "React", "Laravel Reverb", "Vite", "PHPUnit", "Laravel Dusk", "Docker"],
  links: { live: "https://arcacademy.co" },
  sections: [
    {
      stage: "signal",
      heading: "A classroom needs more than a content library",
      body: [
        "My teaching work made the friction familiar: finding and adapting material is only the beginning. During a lesson, an instructor also needs to manage activities, see student work, and return useful feedback.",
        "Arc brings those jobs together. Students work through activities; instructors guide the classroom and review submissions; content and operational teams manage the material and the wider program.",
      ],
    },
    {
      stage: "frame",
      heading: "Keep reuse, release, and revision distinct",
      body: [
        "The syllabus builder scores and distributes reusable activities using explicit rules and requirements. People review and edit the resulting draft. Publishing creates a new content pack; assigning it to a class and releasing lessons remain separate steps.",
        "Students save drafts and submit versions of their work. Instructors can publish a review or request a student revision. That feedback belongs to the student's work; editing the reusable curriculum remains a separate teaching decision.",
      ],
    },
    {
      stage: "plan",
      heading: "Support the classroom and the wider program",
      body: [
        "Arc provides role-specific experiences for students, instructors, content authors, school and program teams, and system administrators. Its canonical task registry contains 21 kinds with different handling paths, including individual work, instructor-led sessions and external integrations.",
        "Reporting keeps participation, drafts, submissions, reviews, and revisions distinct, with reporting periods and permission boundaries. This gives program teams context beyond a single completion count while instructors retain the individual work behind it.",
      ],
    },
    {
      stage: "build",
      heading: "Follow the workflow across technical boundaries",
      body: [
        "One coworker and I develop and support Arc. My work includes typed view models, portal and service refactors, authorization wiring, password handling, and a shared WebSocket-first update strategy with polling fallback.",
        "Interaction work matters just as much: I added touch and pointer support to the collaborative flowchart editor, including tap-to-place for new shapes. Later work simplified shared frontend components and repaired keyboard, layout, and localization behavior across the portals.",
      ],
    },
    {
      stage: "prove",
      heading: "Make quality part of delivery",
      body: [
        "The pipeline checks architecture boundaries, translations, backend behavior, frontend builds, and Docker configuration. Browser suites cover responsive layouts, keyboard interactions, and automated accessibility scans.",
        "My recent delivery work split browser tests into balanced shards and strengthened deployment checks. On September 11, the latest development run passed every required job and its development deployment. Production follows its own release branch.",
      ],
    },
    {
      stage: "field",
      heading: "An evolving classroom platform",
      body: [
        "Arc connects to Browser Coder for programming tasks and Arc Gaming Center for game-based activities. The platform keeps the classroom, lesson, assignment, and progress context around those specialist experiences.",
        "Arc and Browser Coder are live products that we continually support and expand. Together they serve 3,000+ students, instructors and managers. The engineering challenge is keeping that growing platform understandable for its users and maintainable across its portals.",
      ],
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2026-05",
      title: "Give each view an explicit data contract.",
      why: "Loose controller data made changes difficult to trace across portals.",
      tradeoff: "Typed view models add mapping code, but make the boundary visible and testable.",
      revisit: "When a simpler contract can keep the same clarity.",
    },
    {
      id: "D-02",
      date: "2026-05",
      title: "Centralize classroom permissions.",
      why: "The same lesson and submission data appears in portals with different responsibilities.",
      tradeoff: "Policies add structure while keeping authority checks inspectable and consistent.",
      revisit: "When a new role needs authority the current model cannot express.",
    },
    {
      id: "D-03",
      date: "2026-07",
      title: "Design touch behavior explicitly.",
      why: "Shrinking a flowchart editor does not make mouse-based dragging work on a phone.",
      tradeoff: "Tap-to-place and pointer support need additional interaction logic and validation.",
      revisit: "If one interaction model can cover mouse, touch, and keyboard equally well.",
    },
    {
      id: "D-04",
      date: "2026-09",
      title: "Deploy the commit that passed the checks.",
      why: "A green build should correspond to the code being released.",
      tradeoff: "A broader quality gate takes time, so browser suites are split into balanced shards.",
      revisit: "As the suite grows or its slowest paths change.",
    },
  ],
  architecture: {
    caption: "A simplified map of the audited application. Portal controllers resolve the actor and coordinate shared domain behavior; permissions stay explicit.",
    nodes: [
      { id: "authoring", label: "Content building", sub: "Activities → packs", x: 0, y: 0, kind: "client", note: "Content teams assemble drafts from reusable activities and lessons. Publishing creates new records without changing their original sources." },
      { id: "classroom", label: "Classroom", sub: "Teach · submit · review", x: 0, y: 2, kind: "client", note: "Students and instructors use separate portal workflows for lesson delivery, submissions, feedback, and revision requests." },
      { id: "portals", label: "Portal layer", sub: "Controllers + view models", x: 1, y: 1, kind: "edge", note: "HTTP controllers resolve the current actor, check authority, call application behavior, and return explicit view data." },
      { id: "domain", label: "Shared domain", sub: "Content · lessons · work", x: 2, y: 1, kind: "service", note: "Domain services hold shared workflows such as publishing content packs, releasing lessons, and saving or submitting student work." },
      { id: "realtime", label: "Realtime updates", sub: "Reverb + fallback", x: 3, y: 0, kind: "service", note: "Reverb and Echo carry live updates. A shared helper falls back to polling if the connection is unavailable and stops polling when it reconnects." },
      { id: "data", label: "Persistent data", sub: "Content + classroom records", x: 3, y: 2, kind: "store", note: "The data model keeps reusable content, classroom state, submission versions, and instructor reviews as distinct records." },
    ],
    edges: [
      { from: "authoring", to: "portals", label: "Build and publish" },
      { from: "classroom", to: "portals", label: "Classroom actions" },
      { from: "portals", to: "domain", label: "Authorized workflows" },
      { from: "domain", to: "realtime", label: "Live changes" },
      { from: "domain", to: "data", label: "Read and persist" },
    ],
  },
  rebuild: [
    "Make the relationship between development builds and production releases easier to inspect.",
    "Keep consolidating shared portal behavior as the number of activity types grows.",
    "Measure classroom outcomes separately from platform reach.",
  ],
};
