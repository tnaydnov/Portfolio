import captures from "./media.json";
import type { ProductTour, TourFilm, TourScreen } from "./types";

interface Capture {
  revision: string;
  captured: string;
  hero: string;
  companion?: string;
  screens: TourScreen[];
  films: TourFilm[];
}

type Framing = Pick<ProductTour, "eyebrow" | "title" | "intro" | "audience" | "capabilities" | "technology"> & { note: string };

const framing: Record<string, Framing> = {
  arc: {
    eyebrow: "ARC / A CONNECTED LEARNING PLATFORM",
    title: "Keep the learning connected.",
    intro: "One platform, different responsibilities. Follow the work from a student's activity to classroom feedback and the wider program.",
    audience: "Students, instructors & education teams",
    capabilities: [
      { title: "Learn & revise", description: "Activities, saved work and feedback stay together in the student's lesson." },
      { title: "Teach & create", description: "Instructors review classroom work while authors maintain reusable learning content." },
      { title: "See the wider picture", description: "School and program teams have scoped views of classrooms and learning activity." },
    ],
    technology: [
      { layer: "Application", tools: "Laravel · Blade · Alpine.js", purpose: "Role-specific portals connect reusable content, classroom delivery and reviewed student work." },
      { layer: "Interactive work", tools: "TypeScript · React · Reverb", purpose: "Specialist activity editors and shared updates sit within the classroom's permissions and context." },
      { layer: "Quality & delivery", tools: "PHPUnit · Dusk · Docker", purpose: "Typed boundaries, authorization checks and browser suites support changes across the portals." },
    ],
    note: "Captured from the development source with fictional schools, accounts and student work in a fresh local database. Reviews and revisions use the actual application. The live portal has its own release; these screens document this development snapshot.",
  },
  "browser-coder": {
    eyebrow: "BROWSER CODER / THE TEACHING WORKBENCH",
    title: "Make the next line make sense.",
    intro: "The result is only the start. See the variables behind it, compare a previous pause, or follow a drawing back to its source.",
    audience: "Programming learners & learning platforms",
    capabilities: [
      { title: "Write & run", description: "A browser workspace connects source code to server-side language execution." },
      { title: "Pause & understand", description: "Breakpoints, variables and pause history make execution state visible." },
      { title: "Draw & replay", description: "Python Turtle output can be replayed alongside the line that created each step." },
    ],
    technology: [
      { layer: "Workspace", tools: "TypeScript · Monaco · IndexedDB", purpose: "Editing, local files, diagnostics and debugger presentation run in the browser." },
      { layer: "Execution", tools: "Node.js · Express · Language adapters", purpose: "A shared pipeline validates requests, manages language processes and streams execution state." },
      { layer: "Learning context", tools: "Host messaging · Canvas · Replay", purpose: "Arc can embed a bounded coding activity. Recorded Turtle commands connect visual output to source." },
    ],
    note: "Recorded from the original source and a real local Python execution service, using two sample programs. Run, debugging, pause history and Turtle replay were exercised. The repository includes other language adapters; this tour demonstrates Python.",
  },
  applytide: {
    eyebrow: "APPLYTIDE / A PERSONAL JOB-SEARCH WORKSPACE",
    title: "Every opportunity has a next step.",
    intro: "A job search is a collection of small decisions. Keep the posting, application, documents and follow-up in one personal workspace.",
    audience: "Individual job seekers",
    capabilities: [
      { title: "Build a pipeline", description: "Save opportunities and track each application through its current stage." },
      { title: "Keep the context", description: "Application notes and uploaded documents stay close to the opportunity." },
      { title: "Follow through", description: "Plan a reminder so the next action has a place and a date." },
    ],
    technology: [
      { layer: "Product surfaces", tools: "React · TypeScript · Chrome MV3", purpose: "An authenticated workspace manages the search. A browser extension provides a separate capture entry point." },
      { layer: "Application services", tools: "FastAPI · PostgreSQL · Redis", purpose: "API and domain layers handle user records, documents, sessions and usage controls." },
      { layer: "Background work", tools: "Scheduler · React Email · AI budget", purpose: "Scheduled tasks and email rendering are separate from requests. Model usage has explicit cost controls." },
    ],
    note: "The archived app was run locally with a fresh database and a fictional account. The tour uses actual application changes and uploaded sample PDFs. Browser-extension capture, external email delivery and paid AI calls were not part of this recording.",
  },
  eventa: {
    eyebrow: "EVENTA / FROM A CELEBRATION TO A CONVERSATION",
    title: "Meet within the moment.",
    intro: "There are two sides to the experience: an organizer sets up the event, then guests discover and meet each other inside it.",
    audience: "Wedding organizers & their guests",
    capabilities: [
      { title: "Set the scene", description: "The customer website introduces the product and guides organizers through event setup." },
      { title: "Find a connection", description: "Guests enter a mobile web experience with profiles and discovery scoped to their event." },
      { title: "Start talking", description: "Reciprocal interest opens a connection; conversations stay within the event context." },
    ],
    technology: [
      { layer: "Product surfaces", tools: "Next.js · React · TypeScript", purpose: "The customer website, mobile guest experience and organizer tools share one application." },
      { layer: "Data & boundaries", tools: "Supabase · PostgreSQL", purpose: "Event, profile, like and conversation data support the product's visibility and access rules." },
      { layer: "Operation & quality", tools: "Server routes · Playwright · Vitest", purpose: "Server workflows connect event setup and operation, backed by unit and browser-test infrastructure." },
    ],
    note: "The discontinued product was restored locally against a fresh Supabase database with fictional events and demo profiles. Screens preserve the app's original language; tour descriptions are in English. External SMS, payments and AI services were not exercised.",
  },
};

const media: Record<string, Capture> = captures;

export function getProductTour(slug: string): ProductTour | undefined {
  const capture = media[slug];
  const copy = framing[slug];
  if (!capture || !copy) return undefined;
  const hero = capture.screens.find(screen => screen.id === capture.hero);
  if (!hero) throw new Error(`Missing product-tour hero for ${slug}`);
  const { note, ...description } = copy;
  return {
    ...description,
    hero,
    companion: capture.screens.find(screen => screen.id === capture.companion),
    screens: capture.screens,
    films: capture.films,
    evidence: { captured: capture.captured, revision: capture.revision, note, manifest: `/media/projects/${slug}/capture-manifest.json` },
  };
}
