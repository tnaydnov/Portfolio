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
    span: "Nitzanim tenure · 2023 — present",
    title: "EdTech Project Leader & Content Developer",
    org: "Nitzanim",
    summary: "Lead educational projects, develop learning content and help turn field needs into digital products. Earlier work at Nitzanim included programming instruction.",
    details: [
      "Work with clients and educational stakeholders to clarify needs, define requirements and deliverables, and keep expectations aligned.",
      "Develop syllabuses, presentations, lesson plans, instructor guides and programming exercises for different audiences and starting points.",
      "Build project timelines and Gantt plans, break initiatives into tasks and coordinate work through testing and delivery.",
      "Co-develop Arc Academy with another engineer: translate field needs into product requirements, prioritise improvements, test workflows and coordinate rollout with instructors and relevant teams.",
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
    summary: "Current studies in the design, measurement and improvement of systems and processes.",
    current: true,
  },
  {
    id: "bgu",
    span: "2021 — 2025",
    title: "B.Sc. Software Engineering",
    org: "Ben-Gurion University of the Negev",
    summary: "Completed in 2025. The software engineering foundation behind the products and systems in this portfolio.",
  },
];
/** The environment in which the cross-functional profile is most useful. */
export const brief: {
  term: string;
  def: string;
}[] = [
  {
    term: "The team",
    def: "A small team with direct conversations between product, engineering and users.",
  },
  {
    term: "The work",
    def: "Follow a problem from discovery and planning through implementation and revision.",
  },
  {
    term: "The distance to users",
    def: "Close enough to understand the workflow and hear what needs to change.",
  },
  {
    term: "What I bring",
    def: "Requirements, delivery planning and hands-on engineering, with clear communication throughout.",
  },
];
export const now: {
  label: string;
  items: string[];
} = {
  label: "Now",
  items: [
    "Leading EdTech projects and developing learning content at Nitzanim.",
    "Co-developing Arc Academy and contributing to Browser Coder.",
    "Studying Industrial Engineering & Management at Shenkar.",
  ],
};
