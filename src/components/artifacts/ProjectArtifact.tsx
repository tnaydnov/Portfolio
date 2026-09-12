import type { Locale } from "@/lib/i18n";
import styles from "./project-artifact.module.css";

const STUDIES = {
  arc: {
    title: "Arc", index: "01", theme: "arc", note: "A place for learning.",
    label: { en: "Arc: teaching documents unfold into one structured learning workspace", he: "Arc: מסמכי הוראה נפתחים לסביבת למידה אחת ומסודרת" },
    provenance: { en: "Illustrative product study · source-informed", he: "המחשת מוצר · מבוססת מקור" },
  },
  applytide: {
    title: "Applytide", index: "02", theme: "apply", note: "Make the next move.",
    label: { en: "Applytide: folded application cards bring a fragmented job search into order", he: "Applytide: כרטיסי מועמדות מקופלים מארגנים חיפוש עבודה מפוזר" },
    provenance: { en: "Illustrative product study · source-informed", he: "המחשת מוצר · מבוססת מקור" },
  },
  eventa: {
    title: "Eventa", index: "03", theme: "event", note: "An opening to connect.",
    label: { en: "Eventa: paper invitations connect people sharing the same event", he: "Eventa: הזמנות נייר מחברות בין אנשים שנמצאים באותו אירוע" },
    provenance: { en: "Illustrative scenario · fictional profiles", he: "תרחיש להמחשה · פרופילים בדיוניים" },
  },
  "license-plate-recognition": {
    title: "Recognition", index: "04", theme: "recognition", note: "From image to information.",
    label: { en: "License plate recognition: three paper layers represent detection, recognition and output", he: "זיהוי לוחיות רישוי: שלוש שכבות נייר מייצגות איתור, זיהוי ופלט" },
    provenance: { en: "Simulated pipeline · no measured confidence", he: "צינור מדומה · ללא ציון ביטחון מדוד" },
  },
  "trading-system": {
    title: "Trading system", index: "05", theme: "trading", note: "The rules beneath the surface.",
    label: { en: "Trading system: folded store cards reveal permissions, actions and state", he: "מערכת מסחר: כרטיסי חנויות מקופלים חושפים הרשאות, פעולות ומצבים" },
    provenance: { en: "Illustrative system study · source-informed", he: "המחשת מערכת · מבוססת מקור" },
  },
} as const;

type ArtifactSlug = keyof typeof STUDIES;
type ProjectArtifactProps = { slug: string; locale: Locale; size?: "card" | "hero" };

function ArcStudy() {
  return <div className={styles.book}>
    <div className={styles.bookBack} />
    <div className={styles.bookLeft}><span>Arc / Curriculum</span><strong>Room<br />to learn.</strong><i /><i /><i /><b>01</b></div>
    <div className={styles.bookRight}><span>Learning workspace</span><div className={styles.lesson}><b>01</b><span>Python</span><i>↗</i></div><div className={styles.lesson}><b>02</b><span>Conditions</span><i>↗</i></div><div className={styles.lesson}><b>03</b><span>Loops</span><i>↗</i></div><div className={styles.lesson}><b>04</b><span>Functions</span><i>↗</i></div><small>One source. Ready to teach.</small></div>
    <div className={styles.bookTab}>Open / Learn / Apply</div>
  </div>;
}

function ApplyStudy() {
  return <div className={styles.application}>
    <div className={styles.applicationBack} />
    <div className={styles.applicationSheet}><div className={styles.browser}><i /><i /><i /><span>applytide / workspace</span></div><span className={styles.sheetKicker}>Your next chapter</span><strong>A little<br />more direction.</strong><div className={styles.applicationRows}><span><i />Saved</span><span><i />Applied</span><span><i />Interview</span></div></div>
    <div className={styles.applicationFold}><span>Next step</span><strong>Follow<br />through.</strong><i>↗</i></div>
    <div className={styles.applicationTicket}><span>One search.<br />One place.</span><b>↗</b></div>
  </div>;
}

function EventStudy() {
  return <div className={styles.eventStudy}>
    <div className={styles.eventRing} />
    <div className={styles.eventCard}><span>Eventa / Invitation</span><strong>Hello,<br />again.</strong><div className={styles.eventSymbol}><i /><i /><i /><i /></div><small>Same room. New connection.</small></div>
    <div className={styles.guestCard}><span>Meet someone</span><strong>A new<br />perspective.</strong><div className={styles.guestPortrait}><i /><b /></div><small>Illustrative profile</small></div>
    <div className={styles.eventTicket}><span>You are<br />here.</span><b>●</b></div>
  </div>;
}

function RecognitionStudy() {
  return <div className={styles.recognitionStudy}>
    <div className={styles.captureSheet}><span>01 / Detect</span><div className={styles.captureFrame}><i /><i /><i /><i /><b /></div><small>Camera input</small></div>
    <div className={styles.recognitionSheet}><span>02 / Recognize</span><div className={styles.plate}>ABC · 123</div><div className={styles.scanLines}><i /><i /><i /><i /><i /></div><small>Illustrative input</small></div>
    <div className={styles.outputSheet}><span>03 / Read</span><strong>Image<br />to data.</strong><i>↗</i><small>Pipeline study</small></div>
  </div>;
}

function TradingStudy() {
  return <div className={styles.tradingStudy}>
    <div className={styles.tradingBase}><span>System / Structure</span><strong>Good rules.<br />Clear states.</strong><div><i /><i /><i /></div></div>
    <div className={styles.permissionSheet}><span>01 / Permissions</span><b>Who can<br />do what.</b><i>↗</i></div>
    <div className={styles.stateSheet}><span>02 / State</span><b>Every action<br />has a context.</b><i>↗</i></div>
  </div>;
}

const SCENES = { arc: ArcStudy, applytide: ApplyStudy, eventa: EventStudy, "license-plate-recognition": RecognitionStudy, "trading-system": TradingStudy };

export function ProjectArtifact({ slug, locale, size = "card" }: ProjectArtifactProps) {
  if (!(slug in STUDIES)) return null;
  const study = STUDIES[slug as ArtifactSlug];
  const Scene = SCENES[slug as ArtifactSlug];
  const caption = slug === "license-plate-recognition"
    ? locale === "he" ? "צינור ראייה ממוחשבת" : "Computer-vision pipeline"
    : slug === "eventa"
      ? locale === "he" ? "תרחיש להמחשה" : "Illustrative scenario"
      : locale === "he" ? "המחשת מוצר" : "Product illustration";
  return (
    <div className={`${styles.artifact} ${styles[study.theme]}`} data-size={size} role="img" aria-label={`${study.label[locale]}. ${study.provenance[locale]}`} dir="ltr">
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.coverCaption}><span>{study.title}</span><span>{study.index} / Product study</span></div>
        <div className={styles.scene}><Scene /></div>
        <span className={styles.studyNote}>{study.note}</span>
      </div>
      <div className={styles.provenance} aria-hidden="true" dir={locale === "he" ? "rtl" : "ltr"}>{caption}</div>
    </div>
  );
}
export type { ProjectArtifactProps };
