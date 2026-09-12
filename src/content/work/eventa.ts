import type { Project } from "@/lib/types";
export const eventa: Project = {
  slug: "eventa",
  title: "Eventa",
  oneLiner: "A mobile-first web platform for social connection at weddings — QR onboarding, guest profiles, matching and private messaging.",
  hook: "A wedding can put strangers in one room while giving them no natural way to meet.",
  snapshot: {
    problem: "People can share a room, a host and a moment while still lacking the context that would make a conversation feel natural.",
    move: "Use the event itself as the trust boundary: a QR opens a short, event-scoped path from arrival to a relevant introduction.",
    contribution: "I independently conceived, designed, built and operated Eventa end to end: onboarding, profiles, matching, messaging, privacy and organizer controls.",
    proof: "A published source snapshot with product, operations, privacy, testing and CI documentation. The service itself has been discontinued.",
  },
  tier: "flagship",
  stages: ["signal", "frame", "prove", "field"],
  domain: ["product"],
  role: "Product · design · full-stack build · operation",
  team: "Solo project · sole creator",
  started: "2026",
  ended: "2026",
  status: "discontinued",
  statusLabel: "Discontinued · source public",
  statusDetail: "Owner-provided records - the source CV and project README - describe it as formerly live. It is now discontinued and published as an unmaintained source snapshot.",
  evidenceNote: "Tomer confirms he was Eventa's sole creator and describes it as formerly operated and later discontinued. The public source snapshot verifies the implemented product surface; no user, match or event outcome is claimed.",
  metrics: [
    {
      label: "Surface",
      value: "Mobile-first",
      note: "No install, no app store",
    },
    {
      label: "Onboarding",
      value: "QR",
      note: "Table card to profile",
    },
    {
      label: "State",
      value: "Discontinued",
      note: "Source preserved for review",
    },
  ],
  stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Playwright", "Vitest"],
  links: { repo: "https://github.com/tnaydnov/eventa" },
  sections: [
    {
      stage: "signal",
      heading: "The room is already full of the right people",
      body: [
        "The product hypothesis begins with a room of people connected to the same hosts but separated by table plans, family groups and incomplete information about one another.",
        "That creates a short, event-bound interaction rather than a general-purpose dating context. The source reflects that framing through QR entry, event-scoped profiles, matching and private messaging.",
      ],
    },
    {
      stage: "frame",
      heading: "Onboarding is the entire product risk",
      body: [
        "Everything depends on one number: how many guests get through onboarding during an event. If that fails, no feature downstream matters, because a matching product with four participants is not a product.",
        "That framing rules out an enormous amount. No app store install — nobody downloads an app at a wedding. No account creation with email verification. No password. The path from a QR code on a table card to a usable profile has to be short enough to complete while standing up, holding a drink, in bad lighting.",
        "It also made privacy a framing constraint rather than a settings screen. These are not anonymous strangers; they are the bride's cousin and the groom's colleague, and they will all see each other again. A social product for a room full of people with mutual acquaintances has to be built on the assumption that every interaction is semi-public and permanently attributable. Visibility and messaging had to be designed with that in mind from the start, not softened later.",
        "Accessibility sits in the same category. A wedding crowd spans every age and every level of comfort with technology, in a dim room, on whatever phone they happen to own. That is not an edge case — it is the median user.",
      ],
    },
    {
      stage: "prove",
      heading: "The only test that counts happens once",
      body: [
        "This product cannot be iterated the way normal software is. An event happens once, it cannot be replayed, and a failure during it is not recoverable — you do not get a second attempt at a wedding.",
        "So validation has to happen before the event rather than during it: walking the full path on the oldest and cheapest phone available, in poor lighting, on venue wifi, with the assumption that the person holding it has never seen the product and will not read anything.",
        "The metric that would matter is completion rate through onboarding, and it should be measured before any live-event claim is made.",
      ],
    },
    {
      stage: "field",
      heading: "Iterating on the journey, not the feature list",
      body: [
        "The source snapshot shows a deliberately short path from QR entry to an event-scoped profile, with product copy and onboarding treated as part of the same interaction.",
        "That is evidence of implementation, not evidence that guests completed the flow, that conversations occurred or that an event produced an outcome.",
        "Eventa was later discontinued. I published the source as a portfolio artifact rather than presenting an unavailable service as a live product.",
      ],
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2026",
      title: "Mobile web with QR entry. No native app.",
      why: "Install friction at the moment of use is fatal. The product has a two-hour window and competes with an open bar; a download plus an account is more steps than the situation can support.",
      tradeoff: "No push notifications, no home-screen presence, and less capable device access. All acceptable next to actually getting people through the door.",
      revisit: "If a venue or planner partnership makes it possible to onboard guests before the event rather than during it.",
    },
    {
      id: "D-02",
      date: "2026",
      title: "Treat privacy as a framing constraint, not a settings page.",
      why: "Everyone in the room shares mutual acquaintances and will meet again. A visibility model that suits anonymous strangers is actively wrong here, and retrofitting one is not possible once behaviour has formed around the loose version.",
      tradeoff: "A more conservative default that shows less and converts more slowly than a fully open directory would.",
      revisit: "Only with evidence from real events that the conservative default is suppressing the core interaction.",
    },
    {
      id: "D-03",
      date: "2026",
      title: "Optimise for the median guest, not the ideal user.",
      why: "The realistic user is any age, in a dim room, on an unfamiliar phone, mildly distracted. Designing for a comfortable 28-year-old on a new device produces something that fails for most of the room.",
      tradeoff: "Larger targets, plainer language and fewer gestures than the design would otherwise use — visually less interesting, functionally correct.",
      revisit: "No.",
    },
  ],
  rebuild: [
    "Instrument onboarding drop-off per step before building anything past onboarding. It is the number the entire product depends on and it deserved measurement first.",
    "Write the table-card copy before the interface. The first thing a guest reads is six words on a piece of card, and that is doing more work than any screen in the product.",
    "Test on a five-year-old phone from day one rather than at the end. Every performance decision would have been different.",
  ],
};
