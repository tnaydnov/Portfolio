import type { Project } from "@/lib/types";

export const lpr: Project = {
  slug: "license-plate-recognition",
  title: "License Plate Recognition",
  oneLiner: "A university computer-vision prototype connecting vehicle movement, plate recognition, and annotated operator playback.",
  hook: "Follow a vehicle from its first movement to a readable plate.",
  snapshot: {
    problem: "Distance, angle, lighting, and motion blur change the input at every stage of continuous plate recognition.",
    move: "Find moving vehicles, track them across frames, associate plate crops with those tracks, and display the recognition results.",
    contribution: "On a five-person team, I focused on motion detection, gathering and preparing data, training and fine-tuning the recognition models, and pipeline integration.",
    proof: "The upstream team repository preserves the Python services, model weights, annotated evaluation data, and PyQt viewer. This review establishes source behavior, without a fresh inference run or benchmark.",
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
  evidenceNote: "Upstream source reviewed in September 2026. The current path recognizes and visualizes plates; older authorization logic is not connected to it. No published accuracy result or fresh inference run is claimed.",
  metrics: [
    { label: "Recognition", value: "Across frames", note: "Vehicle tracks retain repeated plate readings" },
    { label: "Transport", value: "Queues + HTTP", note: "Redis frames; cropped images sent to OCR" },
    { label: "Operator", value: "Desktop viewer", note: "Playback controls and annotated video" },
  ],
  stack: ["Python", "OpenCV", "Ultralytics YOLO11", "PaddleOCR", "FastAPI", "Redis", "Docker Compose", "PyQt5"],
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
        "I worked on motion detection, data preparation, model training and pipeline integration. In the current source, optical flow gates new vehicle inference, centroid tracking preserves vehicle identity, and plate crops are associated with those tracks.",
        "Redis carries input and annotated output frames. Workers send plate crops to a separate OCR service over HTTP, then update the vehicle's recognition state. A PyQt viewer provides playback controls and displays the annotated video.",
      ],
    },
    {
      stage: "prove",
      heading: "Evaluate the whole recognition path",
      body: [
        "The project reinforced the difference between evaluating a model and evaluating a system. Motion gating, tracking, plate association and character recognition all affect whether a complete plate reaches the operator.",
        "The repository includes annotations and evaluation scripts, but the runners need their interfaces reconciled with the current pipeline before producing a new benchmark. I would version the training setup and evaluation data together, then measure complete plate capture, including motion-gate rejections.",
      ],
    },
  ],
  decisions: [
    {
      id: "D-01", date: "2025", title: "Separate stages with queues.",
      why: "Motion filtering, detection, and OCR have different processing costs.",
      tradeoff: "Frame serialization and queue backlog add latency, while each worker still waits for its OCR HTTP response.",
      revisit: "For an edge device where a single-process design could be simpler.",
    },
    {
      id: "D-02", date: "2025", title: "Filter for motion before detection.",
      why: "Skip new vehicle inference when optical flow finds no motion candidates.",
      tradeoff: "Missed motion can suppress a new vehicle candidate; existing tracks can still receive plate inference while they age out.",
      revisit: "When measured gate misses outweigh the processing saved.",
    },
    {
      id: "D-03", date: "2025", title: "Keep recognition attached to a vehicle track.",
      why: "Repeated plate observations can strengthen one vehicle record across frames.",
      tradeoff: "Nearby vehicles and occlusion can confuse centroid association; confidence and repeated text still need end-to-end evaluation.",
      revisit: "When measured identity switches justify a stronger tracking method.",
    },
  ],
  rebuild: [
    "Version the data, training configuration, and evaluation set together.",
    "Reconnect evaluation runners to the current pipeline's result contract.",
    "Record enough motion-gate rejections to investigate missed vehicles.",
    "Measure complete plate capture alongside component-level results.",
  ],
};

export const tradingSystem: Project = {
  slug: "trading-system",
  title: "Trading System",
  oneLiner: "A university retail marketplace modeling delegated store permissions, composable purchase rules, and checkout failure handling.",
  hook: "Agree on the rules before the storefront depends on them.",
  snapshot: {
    problem: "Store ownership, delegated permissions, purchases, and external integrations all depend on precise shared rules.",
    move: "Model nomination and revocation as a graph, compose basket rules, and separate stock reservation from payment and supply actions.",
    contribution: "I contributed to the university team's implementation, working through specification and integration decisions across the shared system.",
    proof: "The Java/Spring repository preserves the Vaadin interface, domain rules, and tests that use mocked payment and supply adapters to inspect order and stock changes.",
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
  evidenceNote: "Source reviewed in September 2026; no fresh runtime or test-pass claim. Active repositories are in memory, and current startup does not wire the payment and supply adapters.",
  metrics: [
    { label: "Authority", value: "Role graph", note: "Nominations, permissions, cascading revocation" },
    { label: "Rules", value: "Composable", note: "Basket conditions and combined discounts" },
    { label: "Checkout", value: "Compensation", note: "Attempt cancellation after a supply failure" },
  ],
  stack: ["Java 17", "Spring Boot", "Vaadin", "In-memory repositories", "BCrypt", "JWT", "Vaadin Push", "JUnit", "Mockito"],
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
      body: [
        "Owners and managers receive nomination requests and respond through a message center. Each store records who appointed whom, so ownership withdrawal can remove the descendant appointments that depend on it.",
        "Basket policies use product, category and price conditions. AND, OR and XOR combine conditions; MAX and PLUS combine discounts. Shared interfaces let the domain evaluate those expressions and the interface display their structure.",
      ],
    },
    {
      stage: "build",
      heading: "Keep parallel work compatible",
      body: [
        "Separate service and domain layers gave the team shared boundaries for implementation and testing. Checkout reserves stock, calls payment and supply adapters, and attempts to cancel completed external actions if supply fails. Mock-based tests inspect the resulting inventory and per-store orders.",
        "This is an academic implementation with in-memory repositories and unfinished deployment boundaries. The experience influenced how I later organized application behavior in Applytide.",
      ],
    },
  ],
  decisions: [
    {
      id: "D-01", date: "2024", title: "Record the relationships behind authority.",
      why: "Revoking an owner's role can also invalidate appointments made through that owner.",
      tradeoff: "The nomination graph, permissions and user-facing role records must stay consistent.",
      revisit: "When changing delegation rules or introducing durable role history.",
    },
    {
      id: "D-02", date: "2024", title: "Compose purchase rules from reusable parts.",
      why: "Product, category and basket constraints can share an evaluation model and a nested visual representation.",
      tradeoff: "Expression semantics, UI wording and numerical edge cases need the same tests.",
      revisit: "Before extending the existing rules or treating the editor as production-ready.",
    },
    {
      id: "D-03", date: "2024", title: "Give external actions a cancellation path.",
      why: "A successful payment can be followed by a failed supply request.",
      tradeoff: "Best-effort compensation needs durable retries and reconciliation before it can offer reliable recovery.",
      revisit: "When connecting real providers and persistent order storage.",
    },
  ],
  rebuild: [
    "Record ambiguous requirements and the team's agreed interpretation before implementation.",
    "Validate permission changes and revocation paths early in the integration plan.",
    "Persist reservations and orders, and recalculate the payable amount from trusted checkout state.",
    "Complete adapter wiring, user-interface state isolation, and durable compensation before deployment.",
  ],
};
