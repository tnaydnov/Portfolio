import type { Project } from "@/lib/types";

export const lpr: Project = {
  slug: "license-plate-recognition",
  title: "License Plate Recognition",
  oneLiner:
    "A real-time parking-enforcement pipeline: motion detection, plate detection, OCR, alerting.",
  hook: "Real-time computer vision is mostly a scheduling problem wearing a machine-learning costume.",
  tier: "system",
  stages: ["frame", "build", "prove"],
  domain: ["applied-ai", "platform"],
  role: "Architecture · Build",
  started: "2025-01",
  ended: "2025-07",
  status: "archived",
  metrics: [
    { label: "Stages", value: "4", note: "Motion → detect → OCR → alert" },
    { label: "Mode", value: "Real-time", note: "Continuous video" },
    { label: "Deploy", value: "Compose", note: "Containerised services" },
  ],
  stack: [
    "Python",
    "YOLOv11",
    "PaddleOCR",
    "FastAPI",
    "Redis",
    "Docker",
    "PyQt5",
  ],
  links: { repo: "https://github.com/tnaydnov/License_Plate_Recognition" },
  media: {
    poster: "/images/lpr-preview.png",
    video: "/videos/lpr-demo.mp4",
    alt: "License plate recognition operator interface showing a detected plate",
  },
  sections: [
    {
      stage: "frame",
      heading: "The constraint is the frame budget",
      body: [
        "The accuracy question — can a model read a plate — is largely solved by choosing good components. The engineering question is whether the whole chain keeps up with a camera that does not slow down for you.",
        "That reframes the problem. Every stage in the pipeline is a consumer with a fixed time budget, and the design work is deciding what to drop rather than what to compute.",
      ],
    },
    {
      stage: "build",
      heading: "Cheap gates before expensive ones",
      body: [
        "The pipeline is ordered by cost. Motion detection is nearly free and rejects the overwhelming majority of frames, because a parking camera mostly watches nothing happen. Only surviving frames reach plate detection, and only detections reach OCR, which is the most expensive stage and therefore the last.",
        "Splitting the stages into separate services with a queue between them was the decision that made it work. It decouples the stages' rates, so a slow OCR pass creates backpressure instead of dropping the frame that mattered, and it lets each stage be tuned or replaced without disturbing the others.",
        "The operator interface is a desktop client rather than a web app, because the people using it sit in front of one screen in one room and need alerts that survive a browser tab being closed.",
      ],
    },
    {
      stage: "prove",
      heading: "Measured on the pipeline, not the model",
      body: [
        "Model accuracy in isolation is the wrong measure. What matters is end-to-end: of the vehicles that actually entered the frame, how many produced a correct plate in time to be useful.",
        "That number is always worse than the model's benchmark, and the gap is where the real engineering is.",
      ],
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2025",
      title: "Separate services with a queue, not a single process.",
      why: "The stages have very different costs and rates. Coupling them in one process means the slowest stage sets the frame rate for everything and there is no way to absorb a burst.",
      tradeoff:
        "Operational complexity, serialisation overhead between stages, and a much harder debugging story than a single script.",
      revisit:
        "If deployed to a single edge device where the network hop costs more than the decoupling is worth.",
    },
    {
      id: "D-02",
      date: "2025",
      title: "Motion gate before detection.",
      why: "A fixed parking camera shows an empty scene most of the time. Running detection on every frame spends the entire compute budget confirming nothing happened.",
      tradeoff:
        "A slow-moving or partially occluded vehicle can be missed at the gate, and that failure is invisible downstream — nothing logs a frame that was never considered.",
      revisit:
        "If false negatives at the gate turn out to be a real source of missed vehicles rather than a theoretical one.",
    },
  ],
  rebuild: [
    "Instrument the motion gate's rejections. It is the one stage whose failures leave no trace, which makes it the least trustworthy part of the system.",
    "Measure end-to-end capture rate from the beginning instead of component accuracy. It is the only number that describes whether the system works.",
  ],
};

export const tradingSystem: Project = {
  slug: "trading-system",
  title: "Trading System",
  oneLiner:
    "A multi-store e-commerce platform: store management, roles and permissions, carts, purchases and supplier integration.",
  hook: "A large team project where the hard part was the specification, not the code.",
  tier: "system",
  stages: ["frame", "plan", "build"],
  domain: ["platform"],
  role: "Contributor on a large team",
  team: "University team project",
  started: "2024-01",
  ended: "2025-08",
  status: "archived",
  metrics: [
    { label: "Scope", value: "Multi-store", note: "Roles, carts, suppliers" },
    { label: "Mode", value: "Team", note: "Not solo work" },
  ],
  stack: ["Java", "JavaScript", "REST", "Layered architecture"],
  links: { repo: "https://github.com/tnaydnov/Trading_System" },
  media: {
    poster: "/images/trading-preview.png",
    video: "/videos/trading-demo.mp4",
    alt: "Trading system storefront and management interface",
  },
  sections: [
    {
      stage: "frame",
      heading: "Requirements as the actual deliverable",
      body: [
        "This was a large team build against a long formal specification, and the lesson it taught was not about e-commerce. It was that on a team of that size, ambiguity in a requirement does not stay a small problem — every developer resolves it differently and the divergence surfaces at integration, which is the most expensive possible moment to find it.",
        "It is listed here as a team project because it was one. I owned parts of it, not all of it, and claiming otherwise would undermine everything else on this site.",
      ],
    },
    {
      stage: "plan",
      heading: "Permissions are the real domain model",
      body: [
        "The genuinely difficult part of a multi-store system is not transactions, it is authority: who may appoint whom, what a store owner can delegate, what happens to permissions granted by someone who is later removed.",
        "Getting that model wrong early is expensive because it is load-bearing for every feature above it.",
      ],
    },
    {
      stage: "build",
      heading: "Layers that hold under a team",
      body: [
        "Strict separation between the service layer and the domain was what made parallel work possible at all. It is a lesson that transferred directly into how I structured Applytide's backend years later.",
      ],
    },
  ],
  rebuild: [
    "Resolve specification ambiguity in writing before implementation starts. Every integration problem on this project traces back to a sentence two people read differently.",
    "Build the permission model first and test it hardest. It was underneath everything else and got the least dedicated attention.",
  ],
};
