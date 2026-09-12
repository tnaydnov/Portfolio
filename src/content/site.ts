export const experienceTimeline: {
  id: string;
  span: string;
  title: string;
  org: string;
  summary: string;
  details: string[];
  current?: boolean;
}[] = [
  {
    id: "nitzanim",
    span: "2023 — now",
    title: "Programming Instructor & EdTech Content Developer",
    org: "Nitzanim",
    summary: "Teach programming and turn field needs into curricula, delivery plans and digital learning products.",
    details: [
      "Work with clients and educational stakeholders to understand needs, clarify requirements, define deliverables and keep expectations aligned throughout development.",
      "Plan and develop syllabuses, presentations, lesson plans, instructor guides and programming exercises, adapting the sequence and explanation to different starting points and audiences.",
      "Build project timelines and Gantt plans, break initiatives into actionable tasks and support execution from initial planning through testing and delivery.",
      "Co-develop Arc with another engineer, translating field needs into product requirements, prioritising improvements, testing workflows and coordinating rollout with instructors and relevant teams.",
    ],
    current: true,
  },
  {
    id: "technical-support",
    span: "2020 — 2023",
    title: "Technical Support Roles · Tier 2",
    org: "IDF · Israel Electric Corporation · Isracard",
    summary: "Diagnosed user and system problems across three large organisations, learning to separate reported symptoms from underlying causes.",
    details: [
      "Provided Tier 2 support involving Active Directory, Citrix, remote access, hardware, software and connectivity.",
      "Investigated user-reported symptoms and the system issues behind them, documented solutions and communicated next steps to users and technical teams.",
      "That work formed the habit of treating the first report as evidence—not necessarily as the root cause.",
    ],
  },
];
export const educationTimeline: {
  id: string;
  span: string;
  title: string;
  org: string;
  summary: string;
  current?: boolean;
}[] = [
  {
    id: "shenkar",
    span: "2026 — expected 2028",
    title: "M.Sc. Industrial Engineering & Management",
    org: "Shenkar College of Engineering, Design and Art",
    summary: "Studying the formal tools for designing, measuring and improving the systems I had previously approached by instinct.",
    current: true,
  },
  {
    id: "bgu",
    span: "2021 — 2025",
    title: "B.Sc. Software Engineering",
    org: "Ben-Gurion University of the Negev",
    summary: "The engineering foundation behind the systems and projects shown throughout this portfolio.",
  },
];
/** The environment in which the cross-functional profile is most useful. */
export const brief: {
  term: string;
  def: string;
}[] = [
  {
    term: "The team",
    def: "A small, candid team where product, engineering and users are close enough to learn from one another quickly.",
  },
  {
    term: "The work",
    def: "Owning a problem from the first uncomfortable observation through framing, delivery and the iteration after real use.",
  },
  {
    term: "The distance to users",
    def: "Short. Direct conversations and observation produce better decisions than second-hand summaries.",
  },
  {
    term: "What I bring",
    def: "I can investigate the workflow, write the specification, understand the data model, build the critical path, teach the decision and revise it when reality disagrees.",
  },
];
export const now: {
  label: string;
  items: string[];
} = {
  label: "Now",
  items: [
    "Co-developing Arc and improving educational workflows at Nitzanim.",
    "Studying Industrial Engineering & Management at Shenkar.",
    "Teaching programming and developing learning material.",
  ],
};
