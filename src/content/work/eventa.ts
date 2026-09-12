import type { Project } from "@/lib/types";

export const eventa: Project = {
  slug: "eventa",
  title: "Eventa",
  oneLiner: "A mobile web platform for meeting people at weddings, with QR entry, guest profiles, matching, messaging, and organizer tools.",
  hook: "Use a shared event to make the first introduction easier.",
  snapshot: {
    problem: "Guests can share a celebration without knowing enough about each other to start a conversation.",
    move: "Offer a short QR-to-profile journey and keep discovery, introductions, and private messages inside the event.",
    contribution: "I conceived, designed, built, and operated the product, including the guest experience, organizer ordering, payments, and operational tools.",
    proof: "Public source and recorded local workflows preserve customer customization, organizer guest preparation and reporting, guest interactions and separate operator tools. The former live service is discontinued.",
  },
  tier: "flagship",
  stages: ["signal", "frame", "build", "field"],
  domain: ["product"],
  role: "Product · design · full-stack build · operation",
  team: "Solo project · sole creator",
  started: "2026",
  ended: "2026",
  status: "discontinued",
  statusLabel: "Discontinued · Source public",
  statusDetail: "Formerly live. The service is discontinued, and the public source is an unmaintained snapshot.",
  evidenceNote: "Built and operated independently. September 2026 captures run the original product against a fresh local Supabase database with fictional event data. External SMS, payments and AI providers were not exercised; no real guest or event-outcome metrics are reported.",
  metrics: [
    { label: "Entry", value: "QR + OTP", note: "A browser-based path into the event" },
    { label: "Guest experience", value: "Event-scoped", note: "Profiles, matching, and private messaging" },
    { label: "Organizers", value: "Order → event", note: "Setup, payments, and printable materials" },
    { label: "Operations", value: "Managed", note: "Analytics and moderation tools" },
  ],
  stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Supabase Storage", "Supabase Realtime", "Playwright", "Vitest"],
  links: { repo: "https://github.com/tnaydnov/eventa" },
  sections: [
    {
      stage: "signal",
      heading: "The event provides the context",
      body: [
        "A wedding brings together people who share hosts and a moment, but often arrive in separate social circles. Eventa explored whether that shared context could make introductions easier.",
        "The guest experience stays within the celebration: scan a QR code, complete verification and a profile, discover other guests, and begin a conversation.",
      ],
    },
    {
      stage: "frame",
      heading: "Keep entry short and boundaries clear",
      body: [
        "I chose mobile web so a guest could enter from a table card without installing an app. OTP verification, concise profile steps, and direct controls shape the path to participation.",
        "Profiles and messaging need clear event and visibility boundaries. Privacy, blocking, and moderation belong in that interaction model from the beginning.",
      ],
    },
    {
      stage: "build",
      heading: "Build the organizer's side too",
      body: [
        "The product extended beyond guest matching. Organizers had an order and setup wizard, payment flows, event management, and printable QR materials. Operator tools covered analytics and moderation.",
        "I built those surfaces with Next.js, React, and Supabase, alongside unit and browser-test infrastructure. The guest, organizer, and operator experiences needed distinct responsibilities within the same product.",
      ],
    },
    {
      stage: "field",
      heading: "Preserve the product and its lessons",
      body: [
        "I operated Eventa and later discontinued it. Its public repository preserves the implementation as a source snapshot.",
        "If I revisited the idea, I would measure the QR-to-profile path first: where guests hesitate, which steps they finish, and whether the introduction flow helps them start a conversation.",
      ],
    },
  ],
  architecture: {
    caption: "Customer, guest and organizer surfaces share a Next.js application. Protected server routes enforce session and event scope before accessing data or issuing photo URLs.",
    nodes: [
      { id: "customer", label: "Customer website", sub: "Product · Event setup", x: 0, y: 0, kind: "client", note: "The public website and order wizard introduce the service and collect organizer setup choices." },
      { id: "attendee", label: "Guest experience", sub: "Profiles · Likes · Chat", x: 0, y: 1, kind: "client", note: "Event-scoped mobile web routes use a signed HttpOnly session. Realtime updates have recovery and polling paths." },
      { id: "organizer", label: "Organizer portal", sub: "Guest lists · Event report", x: 0, y: 2, kind: "client", note: "A token-protected client portal prepares guest lists and shows the event report. Operator administration is a separate authenticated surface." },
      { id: "routes", label: "Protected server routes", sub: "Session + event checks", x: 1, y: 1, kind: "edge", note: "Server routes handle profiles, reciprocal likes, conversations, messages and signed photo URLs. Sensitive profile fields are encrypted server-side." },
      { id: "database", label: "Supabase Postgres", sub: "Event-scoped records", x: 2, y: 0, kind: "store", note: "Profiles, likes, conversations, persisted messages and organizer analytics live in the database." },
      { id: "photos", label: "Photo storage", sub: "Signed access", x: 2, y: 1, kind: "store", note: "Supabase Storage holds profile photos. The protected photo route supplies signed URLs." },
      { id: "providers", label: "External adapters", sub: "SMS · Checkout · Moderation", x: 2, y: 2, kind: "service", note: "Source integrations include SMS verification, notifications, payment/invoice and image moderation providers. These services were disabled or unused during local capture." },
    ],
    edges: [
      { from: "customer", to: "routes", label: "setup" },
      { from: "attendee", to: "routes", label: "authenticated actions" },
      { from: "organizer", to: "routes", label: "management" },
      { from: "routes", to: "database", label: "read / persist" },
      { from: "routes", to: "photos", label: "signed access" },
      { from: "routes", to: "providers", label: "external workflows" },
    ],
  },
  decisions: [
    {
      id: "D-01", date: "2026", title: "Meet guests in the browser.",
      why: "A QR link offers a direct entry point at the moment of use.",
      tradeoff: "Mobile web has different device and notification limits from a native app.",
      revisit: "If advance onboarding becomes part of the organizer's process.",
    },
    {
      id: "D-02", date: "2026", title: "Keep discovery inside the event.",
      why: "Shared event context is the reason for the introduction.",
      tradeoff: "A smaller pool and conservative visibility rules limit discovery beyond the celebration.",
      revisit: "When guest feedback supports a clearly defined follow-up experience.",
    },
    {
      id: "D-03", date: "2026", title: "Treat organizers and operators as product users.",
      why: "Orders, event setup, payments, and moderation need usable workflows too.",
      tradeoff: "Supporting the complete operation increases scope beyond the guest interface.",
      revisit: "If a narrower operating model can remove entire workflows.",
    },
  ],
  rebuild: [
    "Measure completion and drop-off through the onboarding steps.",
    "Test the table-card message and QR entry together with the interface.",
    "Validate the core journey on older phones and constrained connections early.",
  ],
};
