export type StageId =
  | "signal"
  | "frame"
  | "plan"
  | "build"
  | "prove"
  | "field";

export interface Stage {
  id: StageId;
  index: string;
  name: string;
  /** Short imperative shown under the station name. */
  kicker: string;
  /** The claim, in first person. One sentence. */
  line: string;
  /** Long-form explanation for /system. */
  detail: string[];
  /** Concrete artifacts produced at this stage. */
  artifacts: string[];
}

export const STAGES: Stage[] = [
  {
    id: "signal",
    index: "01",
    name: "Signal",
    kicker: "Notice the real need",
    line: "Most work starts from a request. The good work starts one level earlier — from the thing people keep working around.",
    detail: [
      "A request is already a solution in disguise. Someone has diagnosed their own problem and handed you the prescription. My first job is to put the prescription down and go find the symptom.",
      "In practice that means watching how work actually gets done rather than how it is described. The signal is almost always a workaround: a spreadsheet that exists because a system does not, six instructors solving the same problem six different ways, a step everyone quietly repeats because the tool forgot it.",
      "This stage ends when I can state the problem in one sentence that the people living with it would recognise as their own.",
    ],
    artifacts: [
      "Problem statement (one sentence, in the user's words)",
      "Workaround inventory",
      "Stakeholder map",
    ],
  },
  {
    id: "frame",
    index: "02",
    name: "Frame",
    kicker: "Define the shape and the constraints",
    line: "Scope is decided by what you refuse to build. I write the 'not doing' list before the requirements.",
    detail: [
      "Framing is where most projects are actually won or lost, and it happens before a line of code exists. The output is not a feature list — it is a boundary.",
      "I write three things: what done looks like, what is explicitly out of scope for this pass, and which constraints are real versus which are habits. That third distinction matters more than it sounds. Teams routinely treat preferences as physics.",
      "I run this with the people who will live with the result, not just the people paying for it. Aligning expectations here is cheaper than renegotiating them in the build.",
    ],
    artifacts: [
      "Requirements one-pager",
      "Explicit non-goals list",
      "Definition of done, agreed with stakeholders",
    ],
  },
  {
    id: "plan",
    index: "03",
    name: "Plan",
    kicker: "Sequence it, own the critical path",
    line: "A plan is not a list of tasks. It is an argument about what must happen first, and what can safely go wrong.",
    detail: [
      "Decomposition is the part of my Industrial Engineering training that pays off daily. Any initiative can be broken into tasks; the skill is finding the ordering where risk is retired earliest and rework is cheapest.",
      "I build the timeline as a dependency graph before it becomes a Gantt chart, so the critical path is visible rather than implied. Then I put the riskiest unknown first, because a plan whose biggest assumption is tested in week eight is not a plan.",
      "I also plan for the handoff. Work that only I can continue is not finished work.",
    ],
    artifacts: [
      "Dependency graph and critical path",
      "Gantt plan with real slack",
      "Task breakdown with owners",
    ],
  },
  {
    id: "build",
    index: "04",
    name: "Build",
    kicker: "Make the thing, defend every box",
    line: "I build it myself. Not because I have to, but because the person who writes the plan should feel the cost of it.",
    detail: [
      "Software Engineering is the half of my training that keeps the other half honest. When you have to implement your own spec, you stop writing specs that are pleasant to read and impossible to ship.",
      "My bias is toward boring, legible architecture with a small number of well-defended exceptions. Every service in a diagram of mine should have an answer to two questions: why does this exist, and what would it take to delete it.",
      "I keep a decision log as I go rather than reconstructing one afterwards, because the reasoning is only accurate while the alternatives are still live.",
    ],
    artifacts: [
      "System architecture diagram",
      "Decision log (ADR-style)",
      "Working software, deployed",
    ],
  },
  {
    id: "prove",
    index: "05",
    name: "Prove",
    kicker: "Test the workflow, not just the code",
    line: "Passing tests prove the code does what I said. They do not prove the workflow survives a real person on a bad day.",
    detail: [
      "Unit tests are table stakes. What I actually care about is whether the end-to-end path holds when a user does something reasonable that I did not anticipate.",
      "So I test at the level of the job to be done: can a new instructor complete their first session without help, can a user recover from a failed upload, does the thing degrade gracefully when the network does.",
      "I also decide, before launch, what number would tell me this worked — and what number would tell me it did not. Choosing the disconfirming metric in advance is the only way to avoid grading your own homework later.",
    ],
    artifacts: [
      "Workflow QA checklist",
      "Success and failure metrics, chosen before launch",
      "Instrumentation on the critical path",
    ],
  },
  {
    id: "field",
    index: "06",
    name: "Field",
    kicker: "Ship, listen, change it",
    line: "The field always disagrees with the plan. The job is to be there when it does, and to change the thing rather than the story.",
    detail: [
      "This is the stage most portfolios skip, and it is the one that separates a project from a product. Launch is where you start learning, not where you stop.",
      "I keep a direct line to the people using the thing — instructors, coordinators, users — and I treat their complaints as unfiled bug reports rather than as noise. Every piece of feedback gets traced to either a change or an explicit decision not to change.",
      "Then the loop closes: the friction the field reports becomes the next signal, and it starts again.",
    ],
    artifacts: [
      "Feedback log, each entry traced to a change",
      "Post-launch iteration list",
      "Retrospective: what I would rebuild",
    ],
  },
];

export const STAGE_BY_ID = Object.fromEntries(
  STAGES.map((s) => [s.id, s]),
) as Record<StageId, Stage>;
