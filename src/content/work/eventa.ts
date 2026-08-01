import type { Project } from "@/lib/types";

export const eventa: Project = {
  slug: "eventa",
  title: "Eventa",
  oneLiner:
    "A mobile-first web platform for social connection at weddings — QR onboarding, guest profiles, matching and private messaging.",
  hook: "A wedding puts a hundred and fifty strangers in one room and gives them no way to meet each other.",
  tier: "flagship",
  stages: ["signal", "frame", "prove", "field"],
  domain: ["product"],
  role: "Product · Design · Build",
  started: "2026-01",
  status: "ongoing",
  metrics: [
    { label: "Surface", value: "Mobile-first", note: "No install, no app store" },
    { label: "Onboarding", value: "QR", note: "Table card to profile" },
    { label: "State", value: "In build", note: "Actively developed" },
  ],
  stack: ["TypeScript", "Mobile web", "QR onboarding", "Realtime messaging"],
  links: { repo: "https://github.com/tnaydnov/eventa" },
  sections: [
    {
      stage: "signal",
      heading: "The room is already full of the right people",
      body: [
        "Weddings assemble a hundred and fifty people who have been pre-filtered by two people who know them all well, seat them by family politics, and then provide no mechanism whatsoever for them to meet.",
        "The existing behaviour is the signal: guests already do this manually and badly. They ask the couple about someone across the room. They get seated next to a stranger and spend the evening finding out whether there was anything there. The couple fields matchmaking requests for weeks afterwards.",
        "The interesting constraint is that this is a two-hour window with a hard start and a hard end, inside a physical space, among people with a real social connection to the same two hosts. That is a completely different problem from general-purpose dating, and treating it as one would produce a much worse product.",
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
        "The metric that matters is completion rate through onboarding, and I would rather know it is low before an event than discover it afterwards from a couple who trusted me with their wedding.",
      ],
    },
    {
      stage: "field",
      heading: "Iterating on the journey, not the feature list",
      body: [
        "The work so far has been repeatedly cutting the path between scanning a code and being present in the room. Almost every change has removed a step rather than adding a capability.",
        "The same has applied to how the product describes itself. Messaging that sounds appealing in isolation reads very differently on a table card at someone's wedding, and getting the tone wrong makes people opt out before they have seen anything. That copy has gone through as many revisions as the onboarding flow itself.",
        "This one is still in build, and it is listed here as in-progress rather than dressed up as finished.",
      ],
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2026",
      title: "Mobile web with QR entry. No native app.",
      why: "Install friction at the moment of use is fatal. The product has a two-hour window and competes with an open bar; a download plus an account is more steps than the situation can support.",
      tradeoff:
        "No push notifications, no home-screen presence, and less capable device access. All acceptable next to actually getting people through the door.",
      revisit:
        "If a venue or planner partnership makes it possible to onboard guests before the event rather than during it.",
    },
    {
      id: "D-02",
      date: "2026",
      title: "Treat privacy as a framing constraint, not a settings page.",
      why: "Everyone in the room shares mutual acquaintances and will meet again. A visibility model that suits anonymous strangers is actively wrong here, and retrofitting one is not possible once behaviour has formed around the loose version.",
      tradeoff:
        "A more conservative default that shows less and converts more slowly than a fully open directory would.",
      revisit:
        "Only with evidence from real events that the conservative default is suppressing the core interaction.",
    },
    {
      id: "D-03",
      date: "2026",
      title: "Optimise for the median guest, not the ideal user.",
      why: "The realistic user is any age, in a dim room, on an unfamiliar phone, mildly distracted. Designing for a comfortable 28-year-old on a new device produces something that fails for most of the room.",
      tradeoff:
        "Larger targets, plainer language and fewer gestures than the design would otherwise use — visually less interesting, functionally correct.",
      revisit: "No.",
    },
  ],
  rebuild: [
    "Instrument onboarding drop-off per step before building anything past onboarding. It is the number the entire product depends on and it deserved measurement first.",
    "Write the table-card copy before the interface. The first thing a guest reads is six words on a piece of card, and that is doing more work than any screen in the product.",
    "Test on a five-year-old phone from day one rather than at the end. Every performance decision would have been different.",
  ],
};
