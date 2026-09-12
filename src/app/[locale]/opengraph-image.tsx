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
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px 60px", background: "#0b0e11", color: "#eef4ef", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: hebrew ? "row-reverse" : "row", justifyContent: "space-between", alignItems: "center", fontSize: 23 }}>
        <span>{imageText(t(site.name, locale))}</span><span style={{ fontSize: 17, color: "#a8b3b5" }}>tomer-naydnov.com</span>
      </div>
      <div style={{ display: "flex", flexDirection: hebrew ? "row-reverse" : "row", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: hebrew ? "flex-end" : "flex-start", gap: 0, fontSize: hebrew ? 83 : 82, letterSpacing: hebrew ? -2 : -4, lineHeight: 1.05 }}>
          <span>{imageText(hebrew ? "תוכנה." : "Software.")}</span>
          <span style={{ color: "#a7ecd4" }}>{imageText(hebrew ? "מוצר." : "Product.")}</span>
          <span>{imageText(hebrew ? "אנשים." : "People.")}</span>
        </div>
        <svg width="470" height="360" viewBox="0 0 470 360" fill="none">
          <path d="m15 255 220-127 220 127-220 127ZM15 305l220-127 220 127M70 223l220 127M125 191l220 127M180 159l220 127M290 159 70 286M345 191 125 318M400 223 180 350" stroke="#a7ecd4" strokeOpacity=".12" />
          <path d="m51 253 54-31 54 31-54 31Z" fill="#21322f" stroke="#a7ecd4" strokeOpacity=".5" />
          <path d="m51 253 54 31v12l-54-31Zm54 31 54-31v12l-54 31Z" fill="#12231e" stroke="#a7ecd4" strokeOpacity=".25" />
          <path d="m84 234 21-12 21 12-21 12Z" fill="#a7ecd4" />
          <path d="m84 234 21 12v-54l-21-12Zm21 12 21-12v-54l-21 12Z" fill="#183d30" stroke="#a7ecd4" strokeOpacity=".5" />
          <path d="m84 180 21-12 21 12-21 12Z" fill="#a7ecd4" />
          <path d="m177 187 58-34 58 34-58 34Z" fill="#1d2a30" stroke="#9cbfdf" strokeOpacity=".5" />
          <path d="m177 187 58 34v12l-58-34Zm58 34 58-34v12l-58 34Z" fill="#142128" stroke="#9cbfdf" strokeOpacity=".3" />
          <path d="m202 89 33-19 33 19-33 19Z" fill="#b9d4e7" />
          <path d="m202 89 33 19v81l-33-19Zm33 19 33-19v81l-33 19Z" fill="#264353" stroke="#9cbfdf" strokeOpacity=".6" />
          <path d="m317 259 51-29 51 29-51 29Z" fill="#342e21" stroke="#e2c88e" strokeOpacity=".5" />
          <path d="m317 259 51 29v12l-51-29Zm51 29 51-29v12l-51 29Z" fill="#252115" stroke="#e2c88e" strokeOpacity=".3" />
          <path d="m342 189 26-15 26 15-26 15Z" fill="#e2c88e" />
          <path d="m342 189 26 15v49l-26-15Zm26 15 26-15v49l-26 15Z" fill="#564727" stroke="#e2c88e" strokeOpacity=".6" />
          <path d="m160 284 75 44 76-44M235 328v-78" stroke="#a7ecd4" strokeOpacity=".4" strokeDasharray="4 6" />
          <path d="M20 50V20h30m370 0h30v30" stroke="#a7ecd4" strokeOpacity=".4" />
        </svg>
      </div>
      <div style={{ display: "flex", justifyContent: hebrew ? "flex-end" : "flex-start", alignItems: "center", borderTop: "1px solid #2a3835", paddingTop: 20, fontSize: 21, color: "#a8b3b5" }}>
        {imageText(hebrew ? "מהנדס תוכנה · בונה מוצרים · מנחה תכנות" : "Software engineer · Product builder · Programming instructor")}
      </div>
    </div>,
    size,
  );
}
