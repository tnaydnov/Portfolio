import Link from "next/link";
import {
  arcRecordingsWorld,
  getArcRecordingsTour,
} from "@/content/arc-explorer/recordings";
import { arc } from "@/content/work/arc";
import { browserCoder } from "@/content/work/browser-coder";
import { ProjectWorldPage } from "@/components/case/ProjectWorldPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/work/arc/recordings",
  description:
    "Real Arc workflows recorded from the original application, with fictional data. Themes, live classrooms, curriculum and the feedback loop.",
});
export default function ArcRecordingsPage() {
  return (
    <>
      <div
        style={{
          padding: "16px 4%",
          background: "#e0eadd",
          color: "#375a40",
          fontSize: 12,
          display: "flex",
          gap: 18,
          flexWrap: "wrap",
        }}
      >
        <Link href="/work/arc">← Back to Arc’s portal explorer</Link>
        <span>Original application recordings · Fictional demo data</span>
      </div>
      <ProjectWorldPage
        project={arc}
        tour={getArcRecordingsTour()}
        world={arcRecordingsWorld}
        next={browserCoder}
      />
    </>
  );
}
