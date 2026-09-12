import type { Project } from "@/lib/types";

export const lpr: Project = {
  slug: "license-plate-recognition",
  title: "License Plate Recognition",
  oneLiner: "A computer-vision prototype that turns parking video into plate detections, recognized characters, and operator alerts.",
  hook: "Connect motion, detection, and character analysis into one pipeline.",
  snapshot: {
    problem: "Distance, angle, lighting, and motion blur change the input at every stage of continuous plate recognition.",
    move: "Filter for motion, detect plates, analyze their characters, and pass results through queued services to an operator interface.",
    contribution: "On a five-person team, I focused on motion detection, gathering and preparing data, training and fine-tuning the recognition models, and pipeline integration.",
    proof: "The upstream team repository preserves the Python services, model integration, queues, and desktop interface.",
  },
  tier: "system",
  stages: ["frame", "build", "prove"],
  domain: ["applied-ai", "platform"],
  role: "Motion detection · model training · plate analysis",
  team: "Five-person university team",
  started: "2024-11",
  ended: "2025-07",
  status: "archived",
  statusLabel: "Completed team project",
  statusDetail: "University project with source preserved in the upstream repository and an archived personal mirror.",
  evidenceNote: "University team project, refreshed against the upstream repository in September 2026. Model and end-to-end accuracy figures are not published.",
  metrics: [
    { label: "Pipeline", value: "Four stages", note: "Motion → detection → OCR → alert" },
    { label: "Processing", value: "Asynchronous", note: "Queues separate stages with different costs" },
    { label: "Operator", value: "Desktop client", note: "A dedicated surface for results and alerts" },
  ],
  stack: ["Python", "Ultralytics YOLO", "PaddleOCR", "FastAPI", "Redis", "Docker", "PyQt5"],
  links: { repo: "https://github.com/BGU-LPR-Project/lpr_final_project" },
  visual: "lpr-pipeline",
  sections: [
    {
      stage: "frame",
      heading: "Work with the variation in real footage",
      body: [
        "A clear plate crop is a useful starting point. Continuous footage adds changing angles, glare, distance, and blur before the recognition model receives an image.",
        "My work included gathering and preparing project data, then training, evaluating, and fine-tuning the plate-recognition and analysis models.",
      ],
    },
    {
      stage: "build",
      heading: "Make the stages work together",
      body: [
        "I worked on the motion detector that filters frames before heavier processing. Plate detection and character analysis then operate as connected stages: a poor crop becomes a poor input for the next model.",
        "The team separated those stages into services with queues, allowing their processing rates to differ. A PyQt operator client presents the results and alerts.",
      ],
    },
    {
      stage: "prove",
      heading: "Evaluate the whole recognition path",
      body: [
        "The project reinforced the difference between evaluating a model and evaluating a system. A useful result needs the motion gate, plate detection, character analysis, and delivery path to agree.",
        "For a next iteration, I would preserve the dataset and training configuration together and measure complete plate capture, including the frames rejected by the motion gate.",
      ],
    },
  ],
  decisions: [
    {
      id: "D-01", date: "2025", title: "Separate stages with queues.",
      why: "Motion filtering, detection, and OCR have different processing costs.",
      tradeoff: "Independent stages add serialization, deployment, and debugging work.",
      revisit: "For an edge device where a single-process design could be simpler.",
    },
    {
      id: "D-02", date: "2025", title: "Filter for motion before detection.",
      why: "Avoid sending unchanged frames through the heavier recognition stages.",
      tradeoff: "A missed frame at the gate cannot be recovered by downstream models.",
      revisit: "When measured gate misses outweigh the processing saved.",
    },
  ],
  rebuild: [
    "Version the data, training configuration, and evaluation set together.",
    "Record enough motion-gate rejections to investigate missed vehicles.",
    "Measure complete plate capture alongside component-level results.",
  ],
};

export const tradingSystem: Project = {
  slug: "trading-system",
  title: "Trading System",
  oneLiner: "A multi-store marketplace with store management, permissions, shopping carts, purchases, and supplier integration.",
  hook: "Agree on the rules before the storefront depends on them.",
  snapshot: {
    problem: "Store ownership, delegated permissions, purchases, and external integrations all depend on precise shared rules.",
    move: "Model authority and state transitions explicitly, then separate domain behavior from the application services.",
    contribution: "I contributed to the university team's implementation, working through specification and integration decisions across the shared system.",
    proof: "An archived Java/Spring repository preserves the marketplace, security layers, and automated tests.",
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
  statusDetail: "The completed university project is preserved in an archived public repository.",
  evidenceNote: "Team project; technical scope verified against the archived Java/Spring repository in September 2026.",
  metrics: [
    { label: "Domain", value: "Multi-store", note: "Ownership, delegation, carts, and suppliers" },
    { label: "Implementation", value: "Layered Java", note: "Domain, services, security, and tests" },
  ],
  stack: ["Java 17", "Spring Boot", "Spring Security", "Vaadin", "JPA", "MySQL", "WebSockets", "JUnit", "Mockito"],
  links: { repo: "https://github.com/tnaydnov/Trading_System" },
  visual: "trading-model",
  sections: [
    {
      stage: "frame",
      heading: "Turn the specification into shared decisions",
      body: ["This team project followed a detailed formal specification. Resolving ambiguous requirements together mattered because different interpretations could remain hidden until independently built components met."],
    },
    {
      stage: "plan",
      heading: "Make authority part of the domain",
      body: ["A store system needs explicit answers about appointments, delegated permissions, and revocation. Those rules shape the operations that every store manager and owner can perform."],
    },
    {
      stage: "build",
      heading: "Keep parallel work compatible",
      body: ["Separate service and domain layers gave the team shared boundaries for implementation and testing. The experience influenced how I later organized application behavior in Applytide."],
    },
  ],
  rebuild: [
    "Record ambiguous requirements and the team's agreed interpretation before implementation.",
    "Validate permission changes and revocation paths early in the integration plan.",
  ],
};
