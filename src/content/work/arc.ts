import type { Project } from "@/lib/types";
export const arc: Project = {
  slug: "arc",
  title: "Arc",
  oneLiner: "A learning-operations platform connecting reusable content, live classrooms, student work, instructor feedback and the next teaching cycle.",
  hook: "The problem was never where the files lived. It was that authoring, teaching and feedback were separate systems.",
  snapshot: {
    problem: "Teaching material was repeatedly searched for, rebuilt and adapted while the evidence from each classroom disappeared into the next session.",
    move: "Treat the lesson as a living loop: reusable content becomes a classroom release, student work becomes feedback, and feedback changes what gets taught next.",
    contribution: "I co-developed Arc across architecture, portal workflows, authentication and authorization, realtime behavior, touch interaction, testing and a broad frontend refactor.",
    proof: "A reachable public portal and an audited private product repository with dated contribution history and substantial automated test infrastructure.",
  },
  tier: "flagship",
  stages: ["signal", "frame", "build", "prove", "field"],
  domain: ["product", "education", "platform"],
  role: "Co-developer · architecture, product workflows and quality",
  team: "Co-developed with another engineer",
  started: "2026-01",
  status: "live",
  statusLabel: "Portal online",
  statusDetail: "The public Arc portal is reachable. The exact feature set on the audited development branch is not asserted as deployed.",
  evidenceNote: "The contribution history and product structure were audited locally. The repository is private and proprietary; every interface shown here is reconstructed with fictional data. No learner or instructor material - and no unverified reach figures - are published.",
  metrics: [
    {
      label: "Product surface",
      value: "Multi-portal",
      note: "Student, instructor and operational flows",
    },
    {
      label: "Quality system",
      value: "Automated suites",
      note: "Repository inventory, not a pass-rate claim",
    },
    {
      label: "Responsive intent",
      value: "Phone · RTL · zoom",
      note: "Authored browser tests; not a device claim",
    },
    {
      label: "Repository record",
      value: "2026—",
      note: "Dated history from January 2026",
    },
  ],
  stack: [
    "Laravel 11",
    "PHP 8.2",
    "TypeScript",
    "React",
    "Alpine.js",
    "Laravel Reverb",
    "Vite",
    "PHPUnit",
    "Laravel Dusk",
  ],
  links: { live: "https://arcacademy.co" },
  sections: [
    {
      stage: "signal",
      heading: "The workaround was teaching us something",
      body: [
        "While teaching and developing educational material, I kept seeing the same quiet tax: instructors searching for the right version, rebuilding something that already existed, or beginning a lesson without the context left by the previous session. That observation is my account of the problem; it is not presented as a measured adoption study.",
        "A shared folder looks like the obvious fix. But a folder can tell you where a file is, not whether it is current, how it belongs in a lesson, what happened when it met a classroom, or what should change next.",
      ],
    },
    {
      stage: "frame",
      heading: "One loop, not another library",
      body: [
        "Arc now spans reusable activities and content packs, lesson composition, live classroom release, versioned student submissions, instructor review, revision requests, analytics and operational administration.",
        "The useful abstraction is the loop underneath those features: content becomes a lesson; a lesson becomes an activity; activity produces work; review changes the next version. The portfolio reconstructs that loop instead of publishing private product screens or listing every feature.",
      ],
    },
    {
      stage: "build",
      heading: "Working across the seams",
      body: [
        "Arc was co-developed with another engineer. The repository shows substantial work from both contributors, so the case is deliberately explicit about that boundary.",
        "My dated contributions cross layers: replacing loosely shaped controller data with typed view models, decomposing oversized portal controllers, restructuring application services, correcting authorization wiring and password handling, moving realtime behavior toward WebSocket-first delivery, building test and CI coverage, and making a collaborative flowchart work with touch and pointer input.",
        "That breadth is the point of the case. I was not moving between unrelated subjects; I was following the same classroom workflow through every technical boundary it crossed.",
      ],
    },
    {
      stage: "prove",
      heading: "Quality is part of the classroom workflow",
      body: [
        "The audited repository contains substantial automated test infrastructure. Authored browser tests explicitly exercise phone-sized layouts, both language directions and high zoom. That is evidence of deliberate validation work, not a claim that every test passes today or that every physical device is covered.",
        "The production lesson is simpler: a classroom interaction that works only with a mouse, only left-to-right, or only on a developer laptop is not partially finished. It is a broken teaching tool.",
      ],
    },
    {
      stage: "field",
      heading: "Live, private, and still moving",
      body: [
        "Arc has a reachable public portal and active deployment configuration. The branch audited for this portfolio is ahead of the shared development branch, so I do not claim that every inspected feature is already running in production.",
        "The product also contains real classroom and learner material. None of that is portfolio content. Names, submissions, recordings, uploads and operational records remain private; the artifact shown here is rebuilt from source structure with deliberately fictional data.",
      ],
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2026-05",
      title: "Replace loose view data with explicit view models.",
      why: "As portals grew, implicit controller-to-view contracts made changes hard to reason about and easy to break across roles.",
      tradeoff: "More types and mapping code in exchange for visible, testable boundaries.",
      revisit: "If a simpler boundary can preserve the same clarity without recreating array-shaped contracts.",
    },
    {
      id: "D-02",
      date: "2026-05",
      title: "Make authorization a platform boundary, not a controller habit.",
      why: "Student, instructor and administrative surfaces share data while requiring very different authority. Ad-hoc checks do not scale with that overlap.",
      tradeoff: "Policy wiring adds ceremony, but makes the security decision inspectable in one place.",
      revisit: "When a new role or portal cannot be described by the current policy model.",
    },
    {
      id: "D-03",
      date: "2026-07",
      title: "Treat touch support as behavior, not responsive styling.",
      why: "A collaborative flowchart can fit on a phone and still be unusable if its drag, selection and connection model assumes a mouse.",
      tradeoff: "A more complex pointer model and a larger interaction test surface.",
      revisit: "If the editor adopts a unified interaction engine with equivalent keyboard and touch behavior.",
    },
  ],
  rebuild: [
    "Define and preserve a privacy-safe adoption denominator before publishing reach numbers.",
    "Make deployment parity visible so a branch, a release and the live portal cannot quietly diverge.",
    "Keep the public reconstruction generated from fictional fixtures, never from blurred production records.",
  ],
};
