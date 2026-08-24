"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery, useReducedMotion } from "@/components/motion/hooks";
import { t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/site";
import type { CinematicQuality } from "./CinematicWorld";
import styles from "./cinematic-home.module.css";

const CinematicWorld = dynamic(
  () => import("./CinematicWorld").then((module) => module.CinematicWorld),
  { ssr: false, loading: () => null },
);

type Copy = {
  role: { en: string; he: string };
  thesis: { en: string; he: string };
  sub: { en: string; he: string };
  begin: { en: string; he: string };
  skip: { en: string; he: string };
  sourceNote: { en: string; he: string };
};

const copy: Copy = {
  role: { en: "Technical product builder", he: "בונה מוצר טכני" },
  thesis: {
    en: "I find the workaround everyone has accepted, trace it to the real problem, and build the fix.",
    he: "אני מוצא את העקיפה שכולם כבר קיבלו, עוקב אחריה עד לבעיה האמיתית — ובונה את התיקון.",
  },
  sub: {
    en: "The artifact is real. The physics are not.",
    he: "הארטיפקט אמיתי. הפיזיקה לא.",
  },
  begin: { en: "Scroll to question the obvious", he: "גללו כדי לשאול על המובן מאליו" },
  skip: { en: "Skip cinematic", he: "דלגו על החוויה" },
  sourceNote: {
    en: "Source-derived interface · fictional private data",
    he: "ממשק מבוסס־מקור · מידע פרטי בדיוני",
  },
};

const localized = {
  chapterQuestion: { en: "Question", he: "שאלה" },
  chapterArc: { en: "Arc", he: "Arc" },
  chapterListen: { en: "Listen", he: "הקשבה" },
  chapterApplytide: { en: "Applytide", he: "Applytide" },
  chapterEventa: { en: "Eventa", he: "Eventa" },
  chapterCorrect: { en: "Correct", he: "תיקון" },
  chapterReturn: { en: "Return", he: "חזרה" },
  teachingExample: { en: "illustrative teaching example", he: "דוגמת הוראה להמחשה" },
  arcReconstruction: { en: "ARC / reconstructed workflow", he: "ARC / תהליך עבודה משוחזר" },
  aligned: { en: "aligned", he: "מיושר" },
  openArc: { en: "Open the Arc case →", he: "למקרה הבוחן של Arc ←" },
  reconstructedBrowser: {
    en: "Reconstructed job-search browser",
    he: "דפדפן חיפוש עבודה משוחזר",
  },
  inspectApplytide: { en: "Inspect Applytide →", he: "למקרה הבוחן של Applytide ←" },
  eventaScenario: {
    en: "EVENTA / illustrative product scenario",
    he: "EVENTA / תרחיש מוצר להמחשה",
  },
  presenceNotPortraits: { en: "presence, not portraits", he: "נוכחות, לא דיוקנאות" },
  presenceA: { en: "Presence A", he: "נוכחות א׳" },
  presenceB: { en: "Presence B", he: "נוכחות ב׳" },
  teaching: { en: "teaching", he: "הוראה" },
  systems: { en: "systems", he: "מערכות" },
  making: { en: "making", he: "יצירה" },
  events: { en: "events", he: "אירועים" },
  product: { en: "product", he: "מוצר" },
  education: { en: "education", he: "חינוך" },
  detailVisible: {
    en: "one relevant detail becomes visible",
    he: "פרט רלוונטי אחד נעשה גלוי",
  },
  eventaQuestion: {
    en: "“You build tools for people who teach?”",
    he: "״אתם בונים כלים לאנשים שמלמדים?״",
  },
  eventaProvenance: {
    en: "Illustrative scenario · fictional profile data",
    he: "תרחיש להמחשה · נתוני פרופיל בדיוניים",
  },
  inspectEventa: { en: "Inspect Eventa →", he: "למקרה הבוחן של Eventa ←" },
  systemAnswers: { en: "the system answers back", he: "המערכת עונה בחזרה" },
  notActuallyProblem: {
    en: "No. That is not actually the problem.",
    he: "לא. זאת בעצם לא הבעיה.",
  },
  requestedFeature: {
    en: "- Build the requested feature.",
    he: "- לבנות את הפיצ׳ר שהתבקש.",
  },
  necessaryRequest: {
    en: "+ Find what made the request necessary.",
    he: "+ למצוא מה הפך את הבקשה לנחוצה.",
  },
  eventaTiming: { en: "EVENTA / timing", he: "EVENTA / תזמון" },
  applytidePath: { en: "APPLYTIDE / path", he: "APPLYTIDE / מסלול" },
  arcStructure: { en: "ARC / structure", he: "ARC / מבנה" },
  openingExplanation: { en: "OPENING / explanation", he: "פתיחה / הסבר" },
  chaptersAria: { en: "Cinematic chapters", he: "פרקי החוויה הקולנועית" },
  sound: { en: "Sound", he: "סאונד" },
  on: { en: "on", he: "פעיל" },
  off: { en: "off", he: "כבוי" },
  quality: { en: "Quality", he: "איכות" },
  qualityEssential: { en: "essential", he: "בסיסית" },
  qualityBalanced: { en: "balanced", he: "מאוזנת" },
  qualityPremium: { en: "premium", he: "מרבית" },
  motion: { en: "Motion", he: "תנועה" },
  reduced: { en: "reduced", he: "מופחתת" },
  full: { en: "full", he: "מלאה" },
  enableMotion: { en: "Enable cinematic motion", he: "הפעילו תנועה קולנועית" },
  reducedTeachingLabel: { en: "01 / Teaching", he: "01 / הוראה" },
  hiddenAssumption: { en: "The hidden assumption", he: "ההנחה הסמויה" },
  teachingSummary: {
    en: "returns text. The explanation changes before the student is blamed.",
    he: "מחזירה טקסט. משנים את ההסבר לפני שמאשימים את התלמיד.",
  },
  reducedArcLabel: { en: "02 / Arc", he: "02 / Arc" },
  duplicateToStructure: {
    en: "Duplicated work becomes structure",
    he: "עבודה כפולה הופכת למבנה",
  },
  arcSummary: {
    en: "A source-grounded reconstruction of the content → classroom → work → feedback loop. Private operational data stays private.",
    he: "שחזור מבוסס־מקור של הלולאה תוכן ← כיתה ← עבודה ← משוב. נתונים תפעוליים פרטיים נשארים פרטיים.",
  },
  reducedApplytideLabel: { en: "03 / Applytide", he: "03 / Applytide" },
  browserProblemSpace: {
    en: "A browser becomes the problem space",
    he: "הדפדפן הופך למרחב הבעיה",
  },
  applytideSummary: {
    en: "A source-derived interface rebuilt with fictional applications: capture, pipeline, follow-up and context in one place.",
    he: "ממשק המבוסס על קוד המקור ונבנה מחדש עם מועמדויות בדיוניות: קליטה, צינור, מעקב והקשר במקום אחד.",
  },
  reducedEventaLabel: { en: "04 / Eventa", he: "04 / Eventa" },
  informationVisible: {
    en: "Information changes what becomes visible",
    he: "מידע משנה את מה שנעשה גלוי",
  },
  eventaSummary: {
    en: "An illustrative reconstruction of an event product. Owner-provided records describe it as formerly live and now discontinued; public source verifies the implemented surface, not outcomes.",
    he: "שחזור המחשה של מוצר אירועים. מסמכים שסופקו על ידי הבעלים מתארים אותו כמי שהיה פעיל וכיום הופסק; קוד המקור הציבורי מאמת את הממשק שמומש, לא תוצאות.",
  },
  experienceAria: {
    en: "The Question Behind the Question",
    he: "השאלה שמאחורי השאלה",
  },
  semanticTeaching: {
    en: "A teaching example exposes a hidden assumption.",
    he: "דוגמת הוראה חושפת הנחה סמויה.",
  },
  semanticArc: {
    en: "Reconstructed instructor documents reorganize into Arc.",
    he: "מסמכי מדריכים משוחזרים מסתדרים מחדש והופכים ל־Arc.",
  },
  semanticApplytide: {
    en: "A source-derived Applytide interface becomes a field of browser tabs.",
    he: "ממשק Applytide המבוסס על קוד המקור הופך לשדה של לשוניות דפדפן.",
  },
  semanticEventa: {
    en: "An illustrative Eventa scenario changes what two presences can perceive.",
    he: "תרחיש Eventa להמחשה משנה את מה ששתי נוכחויות יכולות לתפוס.",
  },
  semanticCorrection: {
    en: "One corrected assumption recomputes the earlier systems.",
    he: "תיקון של הנחה אחת מחשב מחדש את המערכות הקודמות.",
  },
  wait: { en: "Wait.", he: "רגע." },
  whyThisWay: { en: "Why are we doing it this way?", he: "למה אנחנו עושים את זה ככה?" },
  workaroundEvidence: {
    en: "The workaround was the evidence.",
    he: "הפתרון העוקף היה הראיה.",
  },
  listen: { en: "LISTEN", he: "להקשיב" },
  brokenSentence: {
    en: "The sentence that broke was not the student’s.",
    he: "המשפט שנשבר לא היה של התלמיד.",
  },
  explanationChanges: {
    en: "So the explanation—not the person—changes.",
    he: "לכן ההסבר — לא האדם — משתנה.",
  },
  browserWorkaround: {
    en: "Then the browser became the workaround.",
    he: "ואז הדפדפן הפך לפתרון העוקף.",
  },
  hiddenPerson: {
    en: "Sometimes the system hides another person.",
    he: "לפעמים המערכת מסתירה אדם אחר.",
  },
  changedSystem: {
    en: "The question changed. So did the system.",
    he: "השאלה השתנתה. גם המערכת.",
  },
  viewWorkNow: { en: "View selected work", he: "לצפייה בעבודות" },
  enterExperience: { en: "Enter the experience", he: "כניסה לחוויה" },
} satisfies Record<string, { en: string; he: string }>;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const range = (value: number, start: number, end: number) =>
  clamp01((value - start) / (end - start));
const ease = (value: number) => value * value * (3 - 2 * value);
const opacityWindow = (value: number, start: number, end: number, feather = 0.035) =>
  ease(range(value, start, start + feather)) *
  (1 - ease(range(value, end - feather, end)));

const CHAPTERS = [
  { id: "question", at: 0, label: localized.chapterQuestion },
  { id: "arc", at: 0.2, label: localized.chapterArc },
  { id: "pause", at: 0.43, label: localized.chapterListen },
  { id: "applytide", at: 0.49, label: localized.chapterApplytide },
  { id: "eventa", at: 0.7, label: localized.chapterEventa },
  { id: "correction", at: 0.84, label: localized.chapterCorrect },
  { id: "return", at: 0.93, label: localized.chapterReturn },
] as const;

const STABLE_PROGRESS: Record<string, number> = {
  question: 0,
  arc: 0.36,
  pause: 0.46,
  applytide: 0.57,
  eventa: 0.79,
  correction: 0.89,
  return: 0.965,
};

function useStoredQuality() {
  const [quality, setQuality] = useState<CinematicQuality>("balanced");

  useEffect(() => {
    const stored = window.localStorage.getItem("tomer-cinematic-quality");
    if (stored === "essential" || stored === "balanced" || stored === "premium") {
      setQuality(stored);
      return;
    }

    const device = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const clearlyConstrained =
      device.connection?.saveData === true ||
      ((device.deviceMemory ?? 8) <= 4 && navigator.hardwareConcurrency <= 4);
    if (clearlyConstrained) setQuality("essential");
  }, []);

  const update = useCallback((next: CinematicQuality) => {
    setQuality(next);
    window.localStorage.setItem("tomer-cinematic-quality", next);
  }, []);

  return [quality, update] as const;
}

function useProceduralSound(enabled: boolean, chapter: string) {
  const audio = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!enabled) {
      void audio.current?.close().catch(() => undefined);
      audio.current = null;
      return;
    }

    const AudioCtor = window.AudioContext;
    if (!AudioCtor) return;
    let context: AudioContext;
    try {
      context = new AudioCtor();
    } catch {
      return;
    }
    audio.current = context;
    if (context.state === "suspended") void context.resume().catch(() => undefined);

    return () => {
      void context.close().catch(() => undefined);
      if (audio.current === context) audio.current = null;
    };
  }, [enabled]);

  useEffect(() => {
    const context = audio.current;
    if (!enabled || !context) return;
    try {
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const frequencies: Record<string, number> = {
        question: 174,
        arc: 116,
        pause: 82,
        applytide: 146,
        eventa: 196,
        correction: 98,
        return: 174,
      };
      oscillator.type = chapter === "eventa" ? "sine" : "triangle";
      oscillator.frequency.setValueAtTime(frequencies[chapter] ?? 130, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.045, now + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.3);
    } catch {
      // Audio is an optional layer; the visual and semantic experience must continue.
    }
  }, [chapter, enabled]);
}

function TeachingSurface({ progress, locale }: { progress: number; locale: Locale }) {
  const error = progress >= 0.03 && progress < 0.078;
  const corrected = progress >= 0.078;
  const depth = ease(range(progress, 0.105, 0.205));

  return (
    <div
      className={styles.editor}
      style={
        {
          "--editor-y": `${-18 * depth}vh`,
          "--editor-z": `${250 * depth}px`,
          "--editor-rx": `${17 * depth}deg`,
          "--editor-scale": 1 - depth * 0.14,
          opacity: opacityWindow(progress, 0.008, 0.22, 0.045),
        } as CSSProperties
      }
    >
      <div className={styles.windowBar}>
        <span className={styles.windowDots} aria-hidden>● ● ●</span>
        <span>conditions.py</span>
        <span className={styles.reconstruction}>{t(localized.teachingExample, locale)}</span>
      </div>
      <pre className={styles.code} dir="ltr">
        <code>
          <span><i>01</i> age = {corrected && <b className={styles.insert}>int(</b>}input(<em>&quot;Enter age: &quot;</em>){corrected && <b className={styles.insert}>)</b>}</span>
          <span><i>02</i> if age &gt;= <strong>16</strong>:</span>
          <span><i>03</i>     print(<em>&quot;Allowed&quot;</em>)</span>
          <span><i>04</i> else:</span>
          <span><i>05</i>     print(<em>&quot;Too young&quot;</em>)</span>
        </code>
      </pre>
      <div className={`${styles.console} ${error ? styles.consoleError : ""}`} dir="ltr">
        <span>OUTPUT</span>
        <strong>{error ? "TypeError: '>=' not supported between str and int" : corrected ? "Allowed" : "Run the example"}</strong>
      </div>
      {error && <div className={styles.liveCursor} aria-hidden />}
    </div>
  );
}

function ArcSurface({ progress, locale }: { progress: number; locale: Locale }) {
  const local = range(progress, 0.31, 0.45);
  return (
    <div
      className={styles.arcSurface}
      style={{ opacity: opacityWindow(progress, 0.285, 0.46, 0.035) }}
    >
      <div className={styles.artifactLabel}>
        <span>{t(localized.arcReconstruction, locale)}</span>
        <span>{Math.round(local * 100).toString().padStart(3, "0")}% {t(localized.aligned, locale)}</span>
      </div>
      <div className={styles.arcGrid}>
        <div className={styles.fileTree} dir="ltr">
          <span>▾ CONDITIONS</span>
          <span>　lesson_final.py</span>
          <span>　lesson_final_2.py</span>
          <span>　lesson_revised.py</span>
          <span>▾ LOOPS</span>
          <span>　exercise_copy.py</span>
          <span>　exercise_new.py</span>
        </div>
        <div className={styles.arcIndex}>
          <div className={styles.arcTopline}><strong>Arc</strong><span>Teaching material / indexed</span></div>
          <div className={styles.arcRows}>
            <span><b>Conditions</b><i>one canonical path</i></span>
            <span><b>Loops</b><i>reviewed structure</i></span>
            <span><b>Functions</b><i>owner-described model</i></span>
          </div>
          <span className={styles.visualLink}>{t(localized.openArc, locale)}</span>
        </div>
      </div>
    </div>
  );
}

function ApplytideSurface({ progress, locale }: { progress: number; locale: Locale }) {
  const local = range(progress, 0.49, 0.66);
  const lift = ease(range(local, 0.08, 0.58));
  const fade = 1 - ease(range(local, 0.69, 0.98));

  return (
    <div
      className={styles.browser}
      style={
        {
          opacity: opacityWindow(progress, 0.48, 0.68, 0.035) * fade,
          "--tab-y": `${-190 * lift}px`,
          "--tab-z": `${210 * lift}px`,
          "--tab-rx": `${-14 * lift}deg`,
          "--tab-ry": `${8 * lift}deg`,
          "--tab-shadow": 0.1 + lift * 0.9,
        } as CSSProperties
      }
    >
      <div className={styles.browserChrome}>
        <div className={styles.traffic}>● ● ●</div>
        <div className={styles.tabs}>
          <span>Inbox (18)</span>
          <span className={styles.liftingTab}>Product roles</span>
          <span>Applications</span>
          <span>Follow up</span>
        </div>
        <span className={styles.browserMenu}>•••</span>
      </div>
      <div className={styles.address} dir="ltr">applytide.local / applications</div>
      <div className={styles.pipeline}>
        {[
          ["Captured", "Product builder", "Platform role"],
          ["Applied", "Systems product", "Technical PM"],
          ["Interview", "Workflow tools"],
        ].map(([stage, ...items]) => (
          <div key={stage}>
            <strong>{stage}</strong>
            {items.map((item) => <span key={item}>{item}<i>fictional</i></span>)}
          </div>
        ))}
      </div>
      <div className={styles.browserFoot}>
        <span>{t(copy.sourceNote, locale)}</span>
        <span className={styles.visualLink}>{t(localized.inspectApplytide, locale)}</span>
      </div>
    </div>
  );
}

function EventaSurface({ progress, locale }: { progress: number; locale: Locale }) {
  const local = ease(range(progress, 0.72, 0.84));
  return (
    <div
      className={styles.eventa}
      style={{ opacity: opacityWindow(progress, 0.7, 0.855, 0.032) }}
    >
      <div className={styles.artifactLabel}>
        <span>{t(localized.eventaScenario, locale)}</span>
        <span>{t(localized.presenceNotPortraits, locale)}</span>
      </div>
      <div
        className={styles.presenceStage}
        style={
          {
            "--world-a-x": `${110 * local}px`,
            "--world-b-x": `${-110 * local}px`,
            "--shared-opacity": local,
            "--shared-scale": 0.82 + local * 0.18,
          } as CSSProperties
        }
      >
        <div className={`${styles.presence} ${styles.presenceA}`}>
          <span>{t(localized.presenceA, locale)}</span>
          <b>{t(localized.teaching, locale)}</b><b>{t(localized.systems, locale)}</b><b>{t(localized.making, locale)}</b>
        </div>
        <div className={styles.sharedPresence}>
          <span>{t(localized.detailVisible, locale)}</span>
          <strong>{t(localized.eventaQuestion, locale)}</strong>
        </div>
        <div className={`${styles.presence} ${styles.presenceB}`}>
          <span>{t(localized.presenceB, locale)}</span>
          <b>{t(localized.events, locale)}</b><b>{t(localized.product, locale)}</b><b>{t(localized.education, locale)}</b>
        </div>
      </div>
      <div className={styles.eventaFoot}>
        <span>{t(localized.eventaProvenance, locale)}</span>
        <span className={styles.visualLink}>{t(localized.inspectEventa, locale)}</span>
      </div>
    </div>
  );
}

function CorrectionSurface({ progress, locale }: { progress: number; locale: Locale }) {
  const changed = progress > 0.862;
  const recomputations = [
    [localized.eventaTiming, 0.856],
    [localized.applytidePath, 0.878],
    [localized.arcStructure, 0.9],
    [localized.openingExplanation, 0.922],
  ] as const;
  return (
    <div
      className={styles.correction}
      style={{ opacity: opacityWindow(progress, 0.835, 0.94, 0.025) }}
      dir={locale === "he" ? "rtl" : "ltr"}
    >
      <div className={styles.artifactLabel}><span dir="ltr">ASSUMPTION.LOG</span><span>{t(localized.systemAnswers, locale)}</span></div>
      <strong className={styles.correctionCallout}>{t(localized.notActuallyProblem, locale)}</strong>
      <div className={styles.diffLine}>
        <span className={changed ? styles.removed : ""}>{t(localized.requestedFeature, locale)}</span>
        <span className={changed ? styles.added : styles.pending}>{t(localized.necessaryRequest, locale)}</span>
      </div>
      <div className={styles.recompileTrack}>
        {recomputations.map(([label, at]) => (
          <i key={label.en} className={progress >= at ? styles.recompiled : ""}>{t(label, locale)}</i>
        ))}
      </div>
    </div>
  );
}

function ProgressControls({
  progress,
  chapter,
  quality,
  setQuality,
  sound,
  setSound,
  motionReduced,
  setMotionReduced,
  jump,
  locale,
}: {
  progress: number;
  chapter: string;
  quality: CinematicQuality;
  setQuality: (quality: CinematicQuality) => void;
  sound: boolean;
  setSound: (value: boolean) => void;
  motionReduced: boolean;
  setMotionReduced: (value: boolean) => void;
  jump: (at: number) => void;
  locale: Locale;
}) {
  const nextQuality: Record<CinematicQuality, CinematicQuality> = {
    essential: "balanced",
    balanced: "premium",
    premium: "essential",
  };
  const qualityLabel = {
    essential: localized.qualityEssential,
    balanced: localized.qualityBalanced,
    premium: localized.qualityPremium,
  } satisfies Record<CinematicQuality, { en: string; he: string }>;
  return (
    <div className={styles.controls}>
      <div className={styles.progressRail} aria-hidden><i style={{ transform: `scaleX(${progress})` }} /></div>
      <div className={styles.controlRow}>
        <div className={styles.chapterNav} aria-label={t(localized.chaptersAria, locale)}>
          {CHAPTERS.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => jump(item.at)}
              aria-current={chapter === item.id ? "step" : undefined}
            >
              {t(item.label, locale)}
            </button>
          ))}
        </div>
        <div className={styles.toggles}>
          <button type="button" onClick={() => setSound(!sound)} aria-pressed={sound}>
            {t(localized.sound, locale)} {t(sound ? localized.on : localized.off, locale)}
          </button>
          <button type="button" onClick={() => setQuality(nextQuality[quality])}>
            {t(localized.quality, locale)} {t(qualityLabel[quality], locale)}
          </button>
          <button type="button" onClick={() => setMotionReduced(!motionReduced)} aria-pressed={motionReduced}>
            {t(localized.motion, locale)} {t(motionReduced ? localized.reduced : localized.full, locale)}
          </button>
          <Link href={href("/work", locale)}>{t(copy.skip, locale)}</Link>
        </div>
      </div>
    </div>
  );
}

function ReducedExperience({ locale, enableMotion }: { locale: Locale; enableMotion: () => void }) {
  return (
    <section className={styles.reducedExperience} aria-labelledby="reduced-title" data-cinematic-mode-root>
      <div className={styles.reducedIntro}>
        <p className={styles.eyebrow}>{t(copy.role, locale)}</p>
        <h1 id="reduced-title">Tomer Naydnov</h1>
        <p className={styles.reducedThesis}>{t(copy.thesis, locale)}</p>
        <p>{t(copy.sub, locale)}</p>
        <div className={styles.reducedActions}>
          <button type="button" onClick={enableMotion}>{t(localized.enableMotion, locale)}</button>
          <Link href={href("/work", locale)}>{t(copy.skip, locale)}</Link>
        </div>
      </div>
      <div className={styles.reducedGrid}>
        <article id="reduced-teaching" tabIndex={-1}><span>{t(localized.reducedTeachingLabel, locale)}</span><h2>{t(localized.hiddenAssumption, locale)}</h2><p><code>input()</code> {t(localized.teachingSummary, locale)}</p></article>
        <article id="reduced-arc" tabIndex={-1}><span>{t(localized.reducedArcLabel, locale)}</span><h2>{t(localized.duplicateToStructure, locale)}</h2><p>{t(localized.arcSummary, locale)}</p></article>
        <article id="reduced-applytide" tabIndex={-1}><span>{t(localized.reducedApplytideLabel, locale)}</span><h2>{t(localized.browserProblemSpace, locale)}</h2><p>{t(localized.applytideSummary, locale)}</p></article>
        <article id="reduced-eventa" tabIndex={-1}><span>{t(localized.reducedEventaLabel, locale)}</span><h2>{t(localized.informationVisible, locale)}</h2><p>{t(localized.eventaSummary, locale)}</p></article>
      </div>
    </section>
  );
}

export function CinematicHome({ locale }: { locale: Locale }) {
  const systemReduced = useReducedMotion();
  const compactViewport = useMediaQuery(
    "(max-height: 560px) and (orientation: landscape), (max-height: 650px) and (max-width: 420px) and (orientation: portrait)",
  );
  const [motionOverride, setMotionOverride] = useState<"full" | "reduced" | null>(null);
  const [quality, setQuality] = useStoredQuality();
  const [sound, setSound] = useState(false);
  const [progress, setProgress] = useState(0);
  const [worldReady, setWorldReady] = useState(false);
  const progressRef = useRef(0);
  const preservedProgress = useRef(0);
  const root = useRef<HTMLElement>(null);
  const focusWasInCinematic = useRef(false);
  const reduced =
    compactViewport ||
    motionOverride === "reduced" ||
    (motionOverride === null && systemReduced);

  useEffect(() => {
    const stored = window.localStorage.getItem("tomer-cinematic-motion");
    if (stored === "reduced") setMotionOverride("reduced");
    else if (stored === "full") window.localStorage.removeItem("tomer-cinematic-motion");
  }, []);

  useEffect(() => {
    const trackFocus = (event: FocusEvent) => {
      focusWasInCinematic.current =
        event.target instanceof Element &&
        Boolean(event.target.closest("[data-cinematic-mode-root]"));
    };
    document.addEventListener("focusin", trackFocus);
    return () => document.removeEventListener("focusin", trackFocus);
  }, []);

  const setReduced = useCallback((value: boolean) => {
    const next = value ? "reduced" : "full";
    setMotionOverride(next);
    if (value) window.localStorage.setItem("tomer-cinematic-motion", next);
    else window.localStorage.removeItem("tomer-cinematic-motion");
  }, []);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => setWorldReady(true), 700);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const element = root.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, element.offsetHeight - window.innerHeight);
      const next = clamp01(-rect.top / distance);
      progressRef.current = next;
      if (next > 0.002) setWorldReady(true);
      setProgress((current) => (Math.abs(current - next) > 0.0005 ? next : current));
    };
    const requestMeasure = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);
    return () => {
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const chapter = useMemo(() => {
    let current: (typeof CHAPTERS)[number] = CHAPTERS[0];
    for (const item of CHAPTERS) if (progress >= item.at) current = item;
    return current.id;
  }, [progress]);

  useProceduralSound(sound, chapter);

  const jump = useCallback((at: number, behavior: ScrollBehavior = "smooth") => {
    const element = root.current;
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY;
    const distance = element.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * at, behavior });
  }, []);

  const previousReduced = useRef(reduced);
  useEffect(() => {
    const wasReduced = previousReduced.current;
    previousReduced.current = reduced;
    if (wasReduced === reduced) return;

    const shouldRestoreFocus = focusWasInCinematic.current;

    const frame = window.requestAnimationFrame(() => {
      if (!reduced) {
        progressRef.current = preservedProgress.current;
        setProgress(preservedProgress.current);
        jump(preservedProgress.current, "auto");
        if (shouldRestoreFocus) root.current?.focus({ preventScroll: true });
        return;
      }

      const at = progressRef.current;
      preservedProgress.current = at;
      const target = at < 0.2
        ? "reduced-teaching"
        : at < 0.47
          ? "reduced-arc"
          : at < 0.7
            ? "reduced-applytide"
            : "reduced-eventa";
      const destination = document.getElementById(target);
      destination?.scrollIntoView({ behavior: "auto", block: "start" });
      if (shouldRestoreFocus) destination?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [jump, reduced]);

  useEffect(() => {
    if (reduced) return;
    const query = new URLSearchParams(window.location.search);
    const requestedProgress = Number(query.get("progress"));
    const requestedScene = query.get("scene");
    const target = Number.isFinite(requestedProgress) && query.has("progress")
      ? clamp01(requestedProgress)
      : requestedScene
        ? STABLE_PROGRESS[requestedScene]
        : undefined;
    if (target === undefined) return;

    const frame = window.requestAnimationFrame(() => jump(target, "auto"));
    return () => window.cancelAnimationFrame(frame);
  }, [jump, reduced]);

  if (reduced) {
    return <ReducedExperience locale={locale} enableMotion={() => setReduced(false)} />;
  }

  // Identity is the first frame, not a reveal the visitor must earn. Hold it
  // immediately, then clear the stage before the teaching artifact arrives.
  const identityOpacity = 1 - ease(range(progress, 0.035, 0.08));
  const pauseOpacity = opacityWindow(progress, 0.425, 0.505, 0.025);
  const returnOpacity = opacityWindow(progress, 0.91, 1, 0.028);

  return (
      <section
        ref={root}
        tabIndex={-1}
        className={styles.experience}
        aria-label={t(localized.experienceAria, locale)}
        data-cinematic-home
        data-chapter={chapter}
        data-progress={progress.toFixed(4)}
        data-quality={quality}
        data-sound={sound ? "on" : "off"}
        data-motion="full"
        data-renderer={worldReady ? "r3f" : "pending"}
        data-cinematic-mode-root
      >
        <div className="sr-only">
          <h1>Tomer Naydnov — {t(copy.role, locale)}</h1>
          <p>{t(copy.thesis, locale)}</p>
          <ol>
            <li>{t(localized.semanticTeaching, locale)}</li>
            <li>{t(localized.semanticArc, locale)}</li>
            <li>{t(localized.semanticApplytide, locale)}</li>
            <li>{t(localized.semanticEventa, locale)}</li>
            <li>{t(localized.semanticCorrection, locale)}</li>
          </ol>
        </div>

        <div className={styles.stickyFrame}>
          <div className={styles.webgl}>
            {worldReady ? (
              <CinematicWorld
                progress={progressRef}
                renderProgress={progress}
                quality={quality}
              />
            ) : null}
          </div>
          <div className={styles.lightField} aria-hidden />
          <div className={styles.scanlines} aria-hidden />

          <div className={styles.identity} style={{ opacity: identityOpacity }} aria-hidden>
            <p className={styles.eyebrow}>{t(copy.role, locale)}</p>
            <h2>Tomer Naydnov</h2>
            <p>{t(copy.thesis, locale)}</p>
            <span>{t(copy.begin, locale)} ↓</span>
          </div>

          <div
            className={styles.quickEntry}
            style={{
              opacity: identityOpacity,
              visibility: identityOpacity > 0.35 ? "visible" : "hidden",
              pointerEvents: identityOpacity > 0.35 ? "auto" : "none",
            }}
            aria-hidden={identityOpacity <= 0.35}
          >
            <Link tabIndex={identityOpacity > 0.35 ? undefined : -1} href={href("/work", locale)}>{t(localized.viewWorkNow, locale)}</Link>
            <button tabIndex={identityOpacity > 0.35 ? undefined : -1} type="button" onClick={() => jump(0.055)}>{t(localized.enterExperience, locale)} ↓</button>
          </div>

          <div className={styles.question} style={{ opacity: opacityWindow(progress, 0.058, 0.25, 0.04) }} aria-hidden>
            <span>{t(localized.wait, locale)}</span>
            <strong>{t(localized.whyThisWay, locale)}</strong>
          </div>

          <div aria-hidden><TeachingSurface progress={progress} locale={locale} /></div>

          <div className={styles.sceneTitle} style={{ opacity: opacityWindow(progress, 0.18, 0.31, 0.025) }} aria-hidden>
            <span>ARC / 01</span>
            <strong>{t(localized.workaroundEvidence, locale)}</strong>
          </div>
          <div aria-hidden><ArcSurface progress={progress} locale={locale} /></div>

          <div className={styles.pause} style={{ opacity: pauseOpacity }} aria-hidden>
            <span>{t(localized.listen, locale)}</span>
            <strong>{t(localized.brokenSentence, locale)}</strong>
            <p>{t(localized.explanationChanges, locale)}</p>
          </div>

          <div className={styles.sceneTitle} style={{ opacity: opacityWindow(progress, 0.47, 0.535, 0.018) }} aria-hidden>
            <span>APPLYTIDE / 02</span>
            <strong>{t(localized.browserWorkaround, locale)}</strong>
          </div>
          <div aria-hidden><ApplytideSurface progress={progress} locale={locale} /></div>

          <div className={styles.sceneTitle} style={{ opacity: opacityWindow(progress, 0.68, 0.735, 0.018) }} aria-hidden>
            <span>EVENTA / 03</span>
            <strong>{t(localized.hiddenPerson, locale)}</strong>
          </div>
          <div aria-hidden><EventaSurface progress={progress} locale={locale} /></div>

          <div aria-hidden><CorrectionSurface progress={progress} locale={locale} /></div>

          <div className={styles.return} style={{ opacity: returnOpacity }} aria-hidden>
            <p>{t(copy.sub, locale)}</p>
            <h2>Tomer Naydnov</h2>
            <strong>{t(copy.thesis, locale)}</strong>
            <span>{t(localized.changedSystem, locale)}</span>
          </div>

          <ProgressControls
            progress={progress}
            chapter={chapter}
            quality={quality}
            setQuality={setQuality}
            sound={sound}
            setSound={setSound}
            motionReduced={reduced}
            setMotionReduced={setReduced}
            jump={jump}
            locale={locale}
          />
        </div>
      </section>
  );
}
