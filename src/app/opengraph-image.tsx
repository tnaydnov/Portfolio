import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.socialImage.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "public/images/tomer-social.png"));

  return new ImageResponse(
    <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", background: "#e7eeee", color: "#172f35", fontFamily: "sans-serif" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: "#067c68", display: "flex" }} />
      <div style={{ display: "flex", flexDirection: "column", width: 714, padding: "58px 0 54px 64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
            <rect width="64" height="64" rx="12" fill="#172f35" />
            <path d="M16 21h24M28 21v24m10 0V25l12 20V21" stroke="#a7ecd4" strokeWidth="4" />
          </svg>
          <div style={{ display: "flex", color: "#50676a", fontSize: 17, letterSpacing: 4 }}>PERSONAL PORTFOLIO</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 45, fontSize: 82, lineHeight: 1.03, letterSpacing: -4, fontWeight: 700 }}>
          <div>Tomer</div>
          <div>Naydnov</div>
        </div>
        <div style={{ display: "flex", marginTop: 28, color: "#067c68", fontSize: 26, fontWeight: 700 }}>
          Software engineer &amp; product builder
        </div>
        <div style={{ display: "flex", marginTop: 15, color: "#50676a", fontSize: 25 }}>
          Turning ideas into useful products.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto", color: "#172f35", fontSize: 20 }}>
          <div style={{ display: "flex", width: 24, height: 2, background: "#067c68" }} />
          {new URL(site.url).hostname}
        </div>
      </div>
      <div style={{ position: "absolute", right: 48, top: 54, display: "flex", width: 372, height: 522, overflow: "hidden", borderRadius: 24, border: "1px solid #c4d5d0", background: "#ffffff" }}>
        {/* Reuse the existing portrait with no runtime conversion or remote fetch. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={"data:image/png;base64," + portrait.toString("base64")} alt="" width={372} height={558} style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
    </div>,
    size,
  );
}
