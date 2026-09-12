import { ImageResponse } from "next/og";
import { LOCALES, isLocale, t } from "@/lib/i18n";
import { site } from "@/lib/site";

export const alt = "Tomer Naydnov — Software engineer & product builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const hebrew = locale === "he";
  // Next 15's bundled Satori lays out glyphs left to right. These fixed,
  // unpointed Hebrew-only lines need visual order; never use this for mixed text.
  // https://github.com/vercel/satori#language-and-typography
  const imageText = (value: string) => hebrew ? [...value].reverse().join("") : value;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "58px 66px", background: "#f8e88a", color: "#20264a", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: hebrew ? "row-reverse" : "row", justifyContent: "space-between", alignItems: "center", fontSize: 23 }}>
        <span>{imageText(t(site.name, locale))}</span><span style={{ fontSize: 17 }}>tomer-naydnov.com</span>
      </div>
      <div style={{ display: "flex", flexDirection: hebrew ? "row-reverse" : "row", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: hebrew ? "flex-end" : "flex-start", gap: 4, fontSize: hebrew ? 78 : 79, letterSpacing: hebrew ? -2 : -4, lineHeight: 1.1 }}>
          <span>{imageText(hebrew ? "שאלות טובות." : "Good questions.")}</span>
          <span style={{ color: "#264bec" }}>{imageText(hebrew ? "דברים שימושיים." : "Useful things.")}</span>
        </div>
        <svg width="335" height="340" viewBox="0 0 335 340" fill="none">
          <path d="M22 80 114 34v232L22 312Z" fill="#264bec" />
          <path d="m114 34 95 55v232l-95-55Z" fill="#fffdf5" />
          <path d="m209 89 97-44v232l-97 44Z" fill="#1735b9" />
          <path d="m44 94 46-23m-46 179 46-23m42-148 53 30m-53 114 53 30m44-143 52-24m-52 162 52-24" stroke="#f8e88a" strokeWidth="3" />
          <path d="m132 143 53 30m-53-7 53 30m-53-7 38 22" stroke="#264bec" strokeWidth="6" />
          <path d="M87 130c-46-7-58 79-20 58" stroke="#fffdf5" strokeWidth="12" />
          <path d="M277 145c-47-7-58 79-20 58" stroke="#fffdf5" strokeWidth="12" />
        </svg>
      </div>
      <div style={{ display: "flex", justifyContent: hebrew ? "flex-end" : "flex-start", alignItems: "center", borderTop: "1px solid #b9b080", paddingTop: 22, fontSize: 22 }}>
        {imageText(hebrew ? "מהנדס תוכנה · בונה מוצרים · מנחה תכנות" : "Software engineer · Product builder · Programming instructor")}
      </div>
    </div>,
    size,
  );
}
