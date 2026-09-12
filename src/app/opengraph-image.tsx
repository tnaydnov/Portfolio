import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Hey, I'm Tomer. Software engineer, product builder and programming instructor.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "public/images/tomer-social.png"));

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "62px 64px",
        background: "#f6f3eb",
        color: "#28352b",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: 650, paddingTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#435c3e", fontSize: 23 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#d5a451" }} />
          {site.name}
        </div>
        <div style={{ display: "flex", marginTop: 34, fontSize: 66, lineHeight: 1.1, letterSpacing: -3 }}>
          Hey, I&apos;m Tomer.
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 29, gap: 7, color: "#435c3e", fontSize: 24, lineHeight: 1.35 }}>
          <div>Software engineer · Product builder</div>
          <div>Programming instructor</div>
        </div>
        <div style={{ display: "flex", maxWidth: 570, marginTop: 28, color: "#5c655a", fontSize: 25, lineHeight: 1.5 }}>
          I turn messy problems into useful software—and make complex ideas easier to understand.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: "auto", color: "#435c3e", fontSize: 20 }}>
          {new URL(site.url).hostname}
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 19 19 5M5 5h14v14" />
          </svg>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 54,
          top: 54,
          display: "flex",
          width: 380,
          height: 522,
          overflow: "hidden",
          borderRadius: "190px 190px 22px 22px",
          border: "1px solid #28352b1a",
          background: "#ffffff",
        }}
      >
        {/* A pre-sized PNG keeps this route independent of runtime image conversion. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={"data:image/png;base64," + portrait.toString("base64")}
          alt=""
          width={380}
          height={570}
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    </div>,
    size,
  );
}
