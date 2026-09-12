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
    proof: "Public source preserves the guest, organizer, and operator workflows. The former live service is discontinued.",
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
  evidenceNote: "Built and operated independently. Refreshed September 2026 against the published source; no guest, match, or event-outcome metrics are reported.",
  metrics: [
    { label: "Entry", value: "QR + OTP", note: "A browser-based path into the event" },
    { label: "Guest experience", value: "Event-scoped", note: "Profiles, matching, and private messaging" },
    { label: "Organizers", value: "Order → event", note: "Setup, payments, and printable materials" },
    { label: "Operations", value: "Managed", note: "Analytics and moderation tools" },
  ],
  stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Playwright", "Vitest"],
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
