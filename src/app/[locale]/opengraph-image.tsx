import { ImageResponse } from "next/og";
import { LOCALES, isLocale, t } from "@/lib/i18n";
import { site } from "@/lib/site";

export const alt = "Tomer Naydnov";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const tagline = `${t(site.description, locale).split(". ")[0]}.`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080a",
          color: "#ecebe8",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#ff4d17",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#8a8f98",
            }}
          >
            Signal · Frame · Plan · Build · Prove · Field
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: -4 }}>
            {t(site.name, "en")}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.3,
              color: "#9299a2",
              maxWidth: 940,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#666d76",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 24,
          }}
        >
          <span>{t(site.role, "en")}</span>
          <span style={{ color: "#ff4d17" }}>מכלול</span>
        </div>
      </div>
    ),
    size,
  );
}
