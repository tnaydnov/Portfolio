import { getProductTour } from "@/content/tours";
import { arcWorld } from "@/content/tours/arc-world";
import type { ProjectWorld } from "@/content/tours/worlds";
import { getArcMedia } from "./media";

export const arcRecordingsWorld: ProjectWorld = {
  ...arcWorld,
  headline: "The original platform. In use.",
  description:
    "Explore Arc's actual interfaces: administration and BI, instructor workspaces, student themes, live classrooms and curriculum building. Every capture uses fictional local data.",
  stories: [
    {
      id: "administration-bi",
      label: "Understand the program",
      title: "See the program. Inspect the reasoning.",
      description:
        "Move from program inventory and lesson activity to learning friction, operational indices and scoped review reports. The reporting cohort is fictional; these are the original application's calculations and displays.",
      film: "admin-bi-exploration",
      screens: [
        "bi-overview",
        "bi-friction",
        "bi-impact",
        "scoped-grading",
        "scoped-progress",
      ],
      takeaway: {
        title: "A number needs its context.",
        text: "Admin BI separates inventory from period activity. Calculation disclosures and minimum-data gates qualify comparisons. Scoped reporting keeps review workload and learning progress distinct. These are operational signals, not measured educational or financial outcomes.",
      },
    },
    {
      id: "instructor-workspace",
      label: "Teach with context",
      title: "Keep the classroom within reach.",
      description:
        "The instructor enters an assigned classroom and moves between learners, grades, statistics and the lesson tree. The same workspace connects what is taught to the work that comes back.",
      screens: [
        "instructor-classroom",
        "instructor-learners",
        "instructor-statistics",
      ],
      takeaway: {
        title: "One classroom, connected views.",
        text: "The lesson tree remains beside the selected panel. Material release, submitted versions and published reviews retain their own states; an instructor can inspect them without losing classroom context.",
      },
    },
    ...arcWorld.stories,
  ],
};

export function getArcRecordingsTour() {
  const original = getProductTour("arc")!;
  return {
    ...original,
    ...getArcMedia(),
    evidence: {
      ...original.evidence,
      captured: "September 2026",
      manifest: "/media/projects/arc/portals/capture-manifest.json",
      note: "Original Arc interfaces recorded in an isolated development environment. The newer BI cohort and earlier learning examples use separate fictional datasets. Screenshots retain the original UI; films add editorial framing, chapters and captions.",
    },
  };
}
