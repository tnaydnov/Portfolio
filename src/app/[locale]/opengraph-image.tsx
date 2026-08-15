import { ImageResponse } from "next/og";
import { me, now } from "@/content/cv";
import { LOCALES, isLocale, t } from "@/lib/i18n";

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
  const rtl = locale === "he";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          background: "#fdf8f0",
          color: "#241f1a",
          padding: 88,
          direction: rtl ? "rtl" : "ltr",
        }}
      >
        <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: -2 }}>
          {t(me.greeting, locale)}
        </div>
        <div style={{ display: "flex", fontSize: 38, lineHeight: 1.35, color: "#5f5850", maxWidth: 900 }}>
          {t(me.what, locale)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16 }}>
          <div style={{ display: "flex", width: 14, height: 14, borderRadius: 7, background: "#d1532a" }} />
          <div style={{ display: "flex", fontSize: 30, color: "#241f1a" }}>
            {t(now.wanted, locale)}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
