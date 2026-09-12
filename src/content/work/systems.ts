import type { Project } from "@/lib/types";
export const lpr: Project = {
  slug: "license-plate-recognition",
  title: "License Plate Recognition",
  oneLiner: "A computer-vision prototype for continuous parking video: motion filtering, trained plate recognition, character analysis and alerts.",
  hook: "The hard part was not one model. It was teaching motion, plate recognition and plate analysis to behave like one system.",
  snapshot: {
    problem: "In continuous footage, the same plate changes with distance, angle, light and motion blur while every slow or inaccurate stage contaminates the next one.",
    move: "Treat data gathering, motion gating, plate recognition and plate analysis as one trainable pipeline, then decouple the expensive stages with queues.",
    contribution: "On a five-person team, I focused on motion detection and the plate-recognition and plate-analysis models: gathering and preparing data, training, evaluating, fine-tuning and integrating them into the pipeline.",
    proof: "The upstream team repository preserves 69 commits and an inspectable multi-service Python architecture.",
  },
  tier: "system",
  stages: ["frame", "build", "prove"],
  domain: ["applied-ai", "platform"],
  role: "Motion detection · model training & fine-tuning · plate analysis",
  team: "Five-person university team",
  started: "2024-11",
  ended: "2025-07",
  status: "archived",
  statusLabel: "Completed team project",
  statusDetail: "Completed university team project; source preserved in the upstream repository.",
  evidenceNote: "Tomer describes his focus as motion detection, data gathering and the training and fine-tuning of the plate-recognition and analysis models. The upstream history independently shows five contributors and 15 commits from Tomer's associated account, including motion, project-structure and interface work. No deployment or end-to-end accuracy result is claimed. Project documentation conflicts on the YOLO version, so this case uses the version-neutral description ‘Ultralytics YOLO-based detection.’",
  metrics: [
    {
      label: "Stages",
      value: "4",
      note: "Motion → detect → OCR → alert",
    },
    {
      label: "Mode",
      value: "Continuous input",
      note: "Asynchronous stages",
    },
    {
      label: "Deploy",
      value: "Compose",
      note: "Containerised services",
    },
  ],
  stack: ["Python", "Ultralytics YOLO", "PaddleOCR", "FastAPI", "Redis", "Docker", "PyQt5"],
  links: { repo: "https://github.com/BGU-LPR-Project/lpr_final_project" },
  visual: "lpr-pipeline",
  sections: [
    {
      stage: "frame",
      heading: "The model begins with the data",
      body: [
        "A clean, centered plate crop is an easy demonstration. Continuous footage is not: distance, angle, glare, darkness, occlusion and motion blur keep changing the input before a model gets to reason about it.",
        "My work began with gathering and preparing project data, then training and fine-tuning the recognition and analysis models against the kinds of variation the pipeline had to handle. The project did not preserve a publishable dataset size or accuracy result, so this case describes the work rather than inventing a benchmark.",
      ],
    },
    {
      stage: "build",
      heading: "Several models, one failure chain",
      body: [
        "I worked on the motion detector that gated the pipeline before the heavier models ran. Unchanged frames were rejected early; only relevant frames continued toward plate recognition and analysis. The repository does not contain a publishable measurement of how many frames the gate rejected.",
        "The recognition and plate-analysis models were not isolated experiments. I trained, evaluated and fine-tuned them as connected stages, because a weak crop or localization result immediately becomes bad input for character analysis.",
        "The team split the stages into services with queues to decouple their rates. In that design, a slow OCR pass can create backpressure instead of forcing every stage into one frame budget, and each component can be tuned or replaced independently. End-to-end throughput was not measured for this case study.",
        "The project used a desktop operator client so alerts lived in a dedicated surface rather than a disposable browser tab.",
      ],
    },
    {
      stage: "prove",
      heading: "Measure the models and the whole chain",
      body: [
        "Model evaluation is necessary because it shows whether new data and fine-tuning improved recognition under held-out conditions. It is still incomplete: end-to-end capture asks whether a vehicle entering the frame produces correct plate text in time to matter.",
        "No publishable model or end-to-end measurement was preserved, so this case explains the evaluation method rather than claiming an accuracy result.",
      ],
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2025",
      title: "Separate services with a queue, not a single process.",
      why: "The stages have very different costs and rates. Coupling them in one process means the slowest stage sets the frame rate for everything and there is no way to absorb a burst.",
      tradeoff: "Operational complexity, serialisation overhead between stages, and a much harder debugging story than a single script.",
      revisit: "If deployed to a single edge device where the network hop costs more than the decoupling is worth.",
    },
    {
      id: "D-02",
      date: "2025",
      title: "Motion gate before detection.",
      why: "A fixed parking camera shows an empty scene most of the time. Running detection on every frame spends the entire compute budget confirming nothing happened.",
      tradeoff: "A slow-moving or partially occluded vehicle can be missed at the gate, and that failure is invisible downstream — nothing logs a frame that was never considered.",
      revisit: "If false negatives at the gate turn out to be a real source of missed vehicles rather than a theoretical one.",
    },
  ],
  rebuild: [
    "Version the dataset, training configuration and evaluation set together. Without that lineage, fine-tuning becomes a sequence of impressions rather than a reproducible experiment.",
    "Instrument the motion gate's rejections. It is the one stage whose failures leave no trace, which makes it the least trustworthy part of the system.",
    "Measure end-to-end capture rate from the beginning instead of component accuracy. It is the only number that describes whether the system works.",
  ],
};
export const tradingSystem: Project = {
  slug: "trading-system",
  title: "Trading System",
  oneLiner: "A multi-store e-commerce platform: store management, roles and permissions, carts, purchases and supplier integration.",
  hook: "A large team project where the hard part was the specification, not the code.",
  snapshot: {
    problem: "In a multi-store marketplace, ambiguous authority rules multiply across appointments, permissions, purchases and integration work.",
    move: "Treat roles, permissions and state transitions as the load-bearing domain before building the storefront around them.",
    contribution: "I contributed to a large university team implementation and learned to resolve specification ambiguity before it becomes an integration defect.",
    proof: "An archived Java/Spring repository with the marketplace domain, security layers and a substantial automated-test structure.",
  },
  tier: "rep",
  stages: ["frame", "plan", "build"],
  domain: ["platform"],
  role: "Contributor on a large team",
  team: "University team project",
  started: "2024-05",
  ended: "2024-07",
  status: "archived",
  statusLabel: "Completed team project",
  statusDetail: "Completed university team project; public repository is archived.",
  evidenceNote: "The source verifies a substantial Java/Spring system and test structure. Its short public mirror history does not provide a reliable subsystem-by-subsystem contribution ledger, so the case keeps Tomer's role at team-contributor level.",
  metrics: [
    {
      label: "Scope",
      value: "Multi-store",
      note: "Roles, carts, suppliers",
    },
    {
      label: "Mode",
      value: "Team",
      note: "Not solo work",
    },
  ],
  stack: ["Java 17", "Spring Boot", "Spring Security", "Vaadin", "JPA", "MySQL", "WebSockets", "JUnit", "Mockito"],
  links: { repo: "https://github.com/tnaydnov/Trading_System" },
  visual: "trading-model",
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
        "Strict separation between the service layer and the domain was what made parallel work possible at all. It is a lesson that transferred directly into how I later structured Applytide's backend.",
      ],
    },
  ],
  rebuild: [
    "Resolve specification ambiguity in writing before implementation starts. Every integration problem on this project traces back to a sentence two people read differently.",
    "Build the permission model first and test it hardest. It was underneath everything else and got the least dedicated attention.",
  ],
};
