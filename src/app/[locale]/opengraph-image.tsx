import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LOCALES } from "@/lib/i18n";

export const alt = "Tomer Naydnov — software engineer and technical product builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function OpengraphImage() {
  const background = await readFile(
    join(process.cwd(), "public", "images", "og-evidence-board.png"),
  );
  const backgroundDataUrl = `data:image/png;base64,${background.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          overflow: "hidden",
          background: "#eee6d8",
          color: "#151615",
          fontFamily: "sans-serif",
        }}
      >
        {/* The generated image is atmosphere only; all factual text is exact HTML. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundDataUrl}
          alt=""
          width="1200"
          height="630"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "58px 68px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 11,
                height: 11,
                borderRadius: 999,
                background: "#d54416",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              EVIDENCE / PRODUCT / SYSTEMS
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                display: "flex",
                maxWidth: 720,
                fontSize: 86,
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: -4,
              }}
            >
              Tomer Naydnov
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: 650,
                fontSize: 28,
                lineHeight: 1.25,
                color: "#4f5658",
              }}
            >
              Software engineer. EdTech builder. M.Sc. student.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: 650,
              justifyContent: "space-between",
              borderTop: "1px solid rgba(21,22,21,.3)",
              paddingTop: 18,
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: 2.5,
              color: "#323637",
            }}
          >
            <span>NEED</span>
            <span style={{ color: "#d54416" }}>→</span>
            <span>PLAN</span>
            <span style={{ color: "#d54416" }}>→</span>
            <span>BUILD</span>
            <span style={{ color: "#d54416" }}>→</span>
            <span>FIELD</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
