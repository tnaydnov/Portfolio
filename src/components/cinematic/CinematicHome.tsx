"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery, useReducedMotion } from "@/components/motion/hooks";
import { t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/site";
import type { CinematicQuality } from "./CinematicWorld";
import styles from "./cinematic-home.module.css";

const CinematicWorld = dynamic(
  () => import("./CinematicWorld").then((module) => module.CinematicWorld),
  { ssr: false, loading: () => null },
);

const copy = {
  role: { en: "Technical product builder", he: "בונה מוצר טכני" },
  thesis: {
    en: "I find the workaround everyone has accepted, trace it to the real problem, and build the fix.",
    he: "אני מוצא את המעקף שכולם כבר התרגלו אליו, עוקב אחריו עד לבעיה האמיתית — ובונה את התיקון.",
  },
  sub: {
    en: "The request is small. The system underneath isn’t.",
    he: "הבקשה קטנה. המערכת שמתחתיה — לא.",
  },
  begin: { en: "Scroll to follow the request", he: "גללו כדי לעקוב אחרי הבקשה" },
  skip: { en: "Skip to the work", he: "דלגו לעבודות" },
  enter: { en: "Enter the story", he: "כניסה לסיפור" },
  request: { en: "Can you add another button?", he: "אפשר להוסיף עוד כפתור?" },
  reply: { en: "Maybe. What needs to happen?", he: "אולי. מה צריך לקרות?" },
  requestLabel: { en: "REQUEST", he: "בקשה" },
  tomerLabel: { en: "TOMER", he: "תומר" },
  experience: {
    en: "A request walks into Tomer’s systems workshop",
    he: "בקשה נכנסת לסדנת המערכות של תומר",
  },
  chapters: { en: "Story chapters", he: "פרקי הסיפור" },
  chapterRequest: { en: "Request", he: "בקשה" },
  chapterTrace: { en: "Trace", he: "מעקב" },
  chapterListen: { en: "Listen", he: "הקשבה" },
  chapterTest: { en: "Test", he: "ניסוי" },
  chapterReframe: { en: "Reframe", he: "מסגור מחדש" },
  chapterReturn: { en: "Return", he: "חזרה" },
  loopLabel: { en: "UNDER THE REQUEST", he: "מתחת לבקשה" },
  loopTitle: { en: "Copy. Search. Ask. Wait. Repeat.", he: "להעתיק. לחפש. לשאול. לחכות. שוב." },
  perspectiveLabel: { en: "THREE PEOPLE / ONE INSTRUCTION", he: "שלושה אנשים / הנחיה אחת" },
  perspective: { en: "Same words. Different understanding.", he: "אותן מילים. הבנה שונה." },
  listenLabel: { en: "LISTEN", he: "להקשיב" },
  listen: { en: "That hesitation is data.", he: "ההיסוס הזה הוא מידע." },
  testLabel: { en: "THE LITERAL ANSWER", he: "התשובה המילולית" },
  test: { en: "One button. Then too many.", he: "כפתור אחד. ואז יותר מדי." },
  secondRequest: { en: "So… another button?", he: "אז… עוד כפתור?" },
  secondReply: { en: "Still no.", he: "עדיין לא." },
  reframeLabel: { en: "REFRAME", he: "מסגור מחדש" },
  reframe: {
    en: "The request was real. The requested solution wasn’t.",
    he: "הבקשה הייתה אמיתית. הפתרון שהתבקש — לא.",
  },
  realityLabel: { en: "REALITY EDITS THE SOLUTION", he: "המציאות עורכת את הפתרון" },
  reality: { en: "One last hesitation. One last correction.", he: "עוד היסוס אחד. עוד תיקון אחד." },
  resolvedLabel: { en: "THE REQUEST, REWRITTEN", he: "הבקשה, בניסוח מחדש" },
  resolved: { en: "Help people understand what happens next.", he: "לעזור לאנשים להבין מה הצעד הבא." },
  resolution: { en: "The question changed. So did the system.", he: "השאלה השתנתה. גם המערכת." },
  ctaLead: { en: "See what this looks like in real work.", he: "לראות איך זה נראה בעבודה אמיתית." },
  sound: { en: "Sound", he: "סאונד" },
  on: { en: "On", he: "פעיל" },
  off: { en: "Off", he: "כבוי" },
  quality: { en: "Quality", he: "איכות" },
  qualityEssential: { en: "Essential", he: "בסיסית" },
  qualityBalanced: { en: "Balanced", he: "מאוזנת" },
  qualityPremium: { en: "Premium", he: "מרבית" },
  reduceMotion: { en: "Reduce motion", he: "הפחתת תנועה" },
  enableMotion: { en: "Enable cinematic motion", he: "הפעלת תנועה קולנועית" },
  reducedTitle: { en: "A request arrives in the wrong shape.", he: "בקשה מגיעה בצורה הלא נכונה." },
  reducedBody: {
    en: "Tomer does not begin with the requested feature. He begins by asking what needs to happen, then follows the workaround to the system underneath.",
    he: "תומר לא מתחיל מהפיצ׳ר שהתבקש. הוא מתחיל בשאלה מה צריך לקרות, ואז עוקב אחרי המעקף אל המערכת שמתחתיו.",
  },
  reducedTrace: {
    en: "The request opens into a loop of copying, searching, asking, waiting and repeating.",
    he: "הבקשה נפתחת ללולאה של העתקה, חיפוש, שאלה, המתנה וחזרה.",
  },
  reducedListen: {
    en: "Rather than repeat the explanation, Tomer watches where another person hesitates.",
    he: "במקום לחזור על אותו הסבר, תומר מתבונן ברגע שבו אדם אחר מהסס.",
  },
  reducedTest: {
    en: "The requested button is built, tested and allowed to fail. It multiplies the problem.",
    he: "הכפתור שהתבקש נבנה, נבדק ומקבל רשות להיכשל. הוא מכפיל את הבעיה.",
  },
  reducedReframe: {
    en: "The clutter is removed, the path is simplified, and real use gets the final word.",
    he: "העומס מוסר, המסלול מפושט, והשימוש האמיתי מקבל את המילה האחרונה.",
  },
  viewWork: { en: "View the work →", he: "לצפייה בעבודות ←" },
} satisfies Record<string, { en: string; he: string }>;

const CHAPTERS = [
  { id: "request", at: 0, label: copy.chapterRequest },
  { id: "trace", at: 0.275, label: copy.chapterTrace },
  { id: "listen", at: 0.42, label: copy.chapterListen },
  { id: "test", at: 0.475, label: copy.chapterTest },
  { id: "reframe", at: 0.655, label: copy.chapterReframe },
  { id: "return", at: 0.915, label: copy.chapterReturn },
] as const;

const STABLE_PROGRESS: Record<string, number> = {
  request: 0.13,
  trace: 0.315,
  listen: 0.445,
  test: 0.56,
  reframe: 0.775,
  return: 0.975,
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const range = (value: number, start: number, end: number) =>
  clamp01((value - start) / (end - start));
const ease = (value: number) => value * value * (3 - 2 * value);
const opacityWindow = (value: number, start: number, end: number, feather = 0.035) =>
  ease(range(value, start, start + feather)) *
  (1 - ease(range(value, end - feather, end)));

function useStoredQuality() {
  const [quality, setQuality] = useState<CinematicQuality>("balanced");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("tomer-cinematic-quality");
      if (stored === "essential" || stored === "balanced" || stored === "premium") {
        setQuality(stored);
        return;
      }
    } catch {
      // A blocked storage API must not block the experience.
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
    try {
      window.localStorage.setItem("tomer-cinematic-quality", next);
    } catch {
      // Keep the in-memory choice when storage is unavailable.
    }
  }, []);

  return [quality, update] as const;
}

function useProceduralSound(chapter: string) {
  const audio = useRef<AudioContext | null>(null);
  const lastCue = useRef(0);
  const [enabled, setEnabled] = useState(false);

  const toggle = useCallback(() => {
    if (enabled) {
      void audio.current?.close().catch(() => undefined);
      audio.current = null;
      setEnabled(false);
      return;
    }

    const AudioCtor = window.AudioContext;
    if (!AudioCtor) return;
    try {
      const context = new AudioCtor();
      audio.current = context;
      if (context.state === "suspended") void context.resume().catch(() => undefined);
      setEnabled(true);
    } catch {
      setEnabled(false);
    }
  }, [enabled]);

  useEffect(() => {
    const context = audio.current;
    if (!enabled || !context) return;
    try {
      const wallTime = performance.now();
      if (wallTime - lastCue.current < 110) return;
      lastCue.current = wallTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const frequencies: Record<string, number> = {
        request: 220,
        trace: 92,
        listen: 72,
        test: 138,
        reframe: 104,
        return: 174,
      };
      const now = context.currentTime;
      oscillator.type = chapter === "request" || chapter === "return" ? "sine" : "triangle";
      oscillator.frequency.setValueAtTime(frequencies[chapter] ?? 130, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.016);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.26);
    } catch {
      // Sound is optional and never carries unique meaning.
    }
  }, [chapter, enabled]);

  useEffect(() => {
    const onVisibility = () => {
      const context = audio.current;
      if (!context) return;
      if (document.hidden) void context.suspend().catch(() => undefined);
      else if (enabled) void context.resume().catch(() => undefined);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [enabled]);

  useEffect(() => () => {
    void audio.current?.close().catch(() => undefined);
    audio.current = null;
  }, []);

  return { enabled, toggle };
}

function ReducedExperience({
  locale,
  canEnableMotion,
  enableMotion,
  markFocusInside,
  markFocusOutside,
}: {
  locale: Locale;
  canEnableMotion: boolean;
  enableMotion: () => void;
  markFocusInside: () => void;
  markFocusOutside: (nextTarget: EventTarget | null) => void;
}) {
  const frames = [
    { title: copy.request, body: copy.reducedTitle, visual: styles.storyRequest },
    { title: copy.reply, body: copy.reducedBody, visual: styles.storyQuestion },
    { title: copy.loopTitle, body: copy.reducedTrace, visual: styles.storyLoop },
    { title: copy.listen, body: copy.reducedListen, visual: styles.storyListen },
    { title: copy.test, body: copy.reducedTest, visual: styles.storyTest },
    { title: copy.resolved, body: copy.reducedReframe, visual: styles.storyResolved },
  ];

  return (
    <section
      className={styles.reducedExperience}
      aria-labelledby="reduced-title"
      data-cinematic-mode-root
      tabIndex={-1}
      onFocusCapture={markFocusInside}
      onBlurCapture={(event) => markFocusOutside(event.relatedTarget)}
    >
      <div className={styles.reducedIntro}>
        <p className={styles.eyebrow}>{t(copy.role, locale)}</p>
        <h1 id="reduced-title" tabIndex={-1}>Tomer Naydnov</h1>
        <p className={styles.reducedThesis}>{t(copy.thesis, locale)}</p>
        <ol className={styles.storyboard}>
          {frames.map((frame, index) => (
            <li key={frame.title.en}>
              <div className={`${styles.storyVisual} ${frame.visual}`} aria-hidden>
                <i /><i /><i /><i /><i />
              </div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{t(frame.title, locale)}</h2>
              <p>{t(frame.body, locale)}</p>
            </li>
          ))}
        </ol>
        <div className={styles.reducedResolution}>
          <span>{t(copy.resolution, locale)}</span>
          <strong>{t(copy.ctaLead, locale)}</strong>
        </div>
        <div className={styles.reducedActions}>
          <Link href={href("/work", locale)}>{t(copy.viewWork, locale)}</Link>
          {canEnableMotion ? (
            <button type="button" onClick={enableMotion}>{t(copy.enableMotion, locale)}</button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function CinematicHome({ locale }: { locale: Locale }) {
  const systemReduced = useReducedMotion();
  const forcedCompact = useMediaQuery(
    "(max-height: 520px) and (orientation: landscape), (max-height: 580px) and (max-width: 360px) and (orientation: portrait)",
  );
  const [motionOverride, setMotionOverride] = useState<"full" | "reduced" | null>(null);
  const [quality, setQuality] = useStoredQuality();
  const [progress, setProgress] = useState(0);
  const [worldRequested, setWorldRequested] = useState(false);
  const [rendererReady, setRendererReady] = useState(false);
  const progressRef = useRef(0);
  const root = useRef<HTMLElement>(null);
  const skipLink = useRef<HTMLAnchorElement>(null);
  const enterButton = useRef<HTMLButtonElement>(null);
  const endLink = useRef<HTMLAnchorElement>(null);
  const preservedProgress = useRef(0);
  const focusWasInCinematic = useRef(false);
  const modeChangeRequested = useRef(false);
  const queryApplied = useRef(false);
  const initialPreferencePending = useRef(true);
  const reduced = forcedCompact || motionOverride === "reduced" || (motionOverride === null && systemReduced);

  useEffect(() => {
    try {
      if (window.localStorage.getItem("tomer-cinematic-motion") === "reduced") {
        setMotionOverride("reduced");
      }
    } catch {
      // The system preference remains the fallback.
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      initialPreferencePending.current = false;
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const setReduced = useCallback((value: boolean) => {
    setMotionOverride(value ? "reduced" : "full");
    try {
      if (value) window.localStorage.setItem("tomer-cinematic-motion", "reduced");
      else window.localStorage.removeItem("tomer-cinematic-motion");
    } catch {
      // Keep the in-memory preference.
    }
  }, []);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => setWorldRequested(true), 320);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (reduced) setRendererReady(false);
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
      if (next > 0.002) setWorldRequested(true);
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

  const { enabled: soundEnabled, toggle: toggleSound } = useProceduralSound(chapter);

  useEffect(() => {
    if (reduced && soundEnabled) toggleSound();
  }, [reduced, soundEnabled, toggleSound]);

  const jump = useCallback((at: number, behavior: ScrollBehavior = "smooth") => {
    const element = root.current;
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY;
    const distance = element.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * at, behavior });
  }, []);

  const markFocusInside = useCallback(() => {
    focusWasInCinematic.current = true;
  }, []);

  const markFocusOutside = useCallback((nextTarget: EventTarget | null) => {
    const modeRoot = document.querySelector<HTMLElement>("[data-cinematic-mode-root]");
    focusWasInCinematic.current = nextTarget instanceof Node && Boolean(modeRoot?.contains(nextTarget));
  }, []);

  const requestMotionMode = useCallback((nextReduced: boolean) => {
    const modeRoot = document.querySelector<HTMLElement>("[data-cinematic-mode-root]");
    focusWasInCinematic.current = Boolean(modeRoot?.contains(document.activeElement));
    modeChangeRequested.current = true;
    setReduced(nextReduced);
  }, [setReduced]);

  const previousReduced = useRef(reduced);
  useEffect(() => {
    const wasReduced = previousReduced.current;
    previousReduced.current = reduced;
    if (wasReduced === reduced) return;

    const requested = modeChangeRequested.current;
    const shouldRestoreFocus = requested || focusWasInCinematic.current;
    modeChangeRequested.current = false;

    const initialHydrationSwap =
      initialPreferencePending.current && !requested && wasReduced && !reduced;
    initialPreferencePending.current = false;
    if (initialHydrationSwap) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      if (!reduced) {
        progressRef.current = preservedProgress.current;
        setProgress(preservedProgress.current);
        jump(preservedProgress.current, "auto");
        if (shouldRestoreFocus) root.current?.focus({ preventScroll: true });
        focusWasInCinematic.current = shouldRestoreFocus;
        return;
      }
      preservedProgress.current = progressRef.current;
      const reducedRoot = document.querySelector<HTMLElement>("[data-cinematic-mode-root]");
      if (reducedRoot) {
        const top = reducedRoot.getBoundingClientRect().top + window.scrollY;
        const distance = Math.max(0, reducedRoot.offsetHeight - window.innerHeight);
        window.scrollTo({ top: top + distance * preservedProgress.current, behavior: "auto" });
        if (shouldRestoreFocus) reducedRoot.focus({ preventScroll: true });
      }
      focusWasInCinematic.current = shouldRestoreFocus;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [jump, reduced]);

  useEffect(() => {
    if (reduced || queryApplied.current) return;
    queryApplied.current = true;
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

  useEffect(() => {
    if (reduced) return;
    const active = document.activeElement;
    const identityInteractive = 1 - ease(range(progress, 0.04, 0.085)) > 0.2;
    const endingInteractive = ease(range(progress, 0.978, 0.995)) > 0.6;
    const sceneControlBecameHidden =
      (active === enterButton.current && !identityInteractive) ||
      (active === endLink.current && !endingInteractive);
    if (sceneControlBecameHidden) skipLink.current?.focus({ preventScroll: true });
  }, [progress, reduced]);

  if (reduced) {
    return (
      <ReducedExperience
        locale={locale}
        canEnableMotion={!forcedCompact}
        enableMotion={() => requestMotionMode(false)}
        markFocusInside={markFocusInside}
        markFocusOutside={markFocusOutside}
      />
    );
  }

  const identityOpacity = 1 - ease(range(progress, 0.04, 0.085));
  const requestOpacity = opacityWindow(progress, 0.07, 0.175, 0.025);
  const replyOpacity = opacityWindow(progress, 0.145, 0.245, 0.025);
  const loopOpacity = opacityWindow(progress, 0.255, 0.36, 0.025);
  const perspectiveOpacity = opacityWindow(progress, 0.35, 0.43, 0.018);
  const listenOpacity = opacityWindow(progress, 0.415, 0.485, 0.016);
  const testOpacity = opacityWindow(progress, 0.475, 0.605, 0.025);
  const deadpanOpacity = opacityWindow(progress, 0.595, 0.675, 0.014);
  const reframeOpacity = opacityWindow(progress, 0.655, 0.825, 0.028);
  const realityOpacity = opacityWindow(progress, 0.815, 0.895, 0.018);
  const questionOpacity = opacityWindow(progress, 0.895, 0.965, 0.018);
  const resolvedOpacity = opacityWindow(progress, 0.95, 0.991, 0.012);
  const endOpacity = ease(range(progress, 0.978, 0.995));

  return (
    <section
      ref={root}
      tabIndex={-1}
      className={styles.experience}
      aria-label={t(copy.experience, locale)}
      data-cinematic-home
      data-cinematic-mode-root
      data-chapter={chapter}
      data-progress={progress.toFixed(4)}
      data-quality={quality}
      data-sound={soundEnabled ? "on" : "off"}
      data-motion="full"
      data-renderer={rendererReady ? "r3f" : "pending"}
      onFocusCapture={markFocusInside}
      onBlurCapture={(event) => markFocusOutside(event.relatedTarget)}
    >
      <div className={styles.stickyFrame}>
        <Link ref={skipLink} className={styles.skipLink} href={href("/work", locale)}>
          {t(copy.skip, locale)}
        </Link>

        <div className="sr-only">
          <h1><bdi dir="ltr">Tomer Naydnov</bdi> — {t(copy.role, locale)}</h1>
          <p>{t(copy.thesis, locale)}</p>
          <ol>
            <li>{t(copy.request, locale)}</li>
            <li>{t(copy.reply, locale)}</li>
            <li>{t(copy.reducedTrace, locale)}</li>
            <li>{t(copy.perspective, locale)}</li>
            <li>{t(copy.listen, locale)}</li>
            <li>{t(copy.reducedTest, locale)}</li>
            <li>{t(copy.reframe, locale)}</li>
            <li>{t(copy.reality, locale)}</li>
            <li>{t(copy.resolved, locale)}</li>
            <li>{t(copy.resolution, locale)}</li>
          </ol>
        </div>

        <div className={styles.webgl} aria-hidden>
          {worldRequested ? (
            <CinematicWorld
              progress={progressRef}
              renderProgress={progress}
              quality={quality}
              onRendererStatus={setRendererReady}
            />
          ) : null}
        </div>
        <div className={styles.cssFallback} aria-hidden>
          <i /><i /><i />
        </div>
        <div className={styles.lightField} aria-hidden />
        <div className={styles.vignette} aria-hidden />

        <div
          className={styles.identity}
          style={{
            opacity: identityOpacity,
            visibility: identityOpacity > 0.05 ? "visible" : "hidden",
            pointerEvents: identityOpacity > 0.2 ? "auto" : "none",
          }}
        >
          <p className={styles.eyebrow} aria-hidden>{t(copy.role, locale)}</p>
          <h2 aria-hidden>Tomer Naydnov</h2>
          <p aria-hidden>{t(copy.thesis, locale)}</p>
          <span aria-hidden>{t(copy.begin, locale)} ↓</span>
          <button
            ref={enterButton}
            tabIndex={identityOpacity > 0.2 ? undefined : -1}
            type="button"
            onClick={() => {
              jump(0.105);
              window.requestAnimationFrame(() => root.current?.focus({ preventScroll: true }));
            }}
          >
            {t(copy.enter, locale)} ↓
          </button>
        </div>

        <div className={`${styles.dialogue} ${styles.requestDialogue}`} style={{ opacity: requestOpacity }} aria-hidden>
          <span>{t(copy.requestLabel, locale)}</span>
          <strong>{t(copy.request, locale)}</strong>
        </div>

        <div className={`${styles.dialogue} ${styles.tomerDialogue}`} style={{ opacity: replyOpacity }} aria-hidden>
          <span>{t(copy.tomerLabel, locale)}</span>
          <strong>{t(copy.reply, locale)}</strong>
          <small>{t(copy.sub, locale)}</small>
        </div>

        <div className={`${styles.sceneCaption} ${styles.loopCaption}`} style={{ opacity: loopOpacity }} aria-hidden>
          <span>{t(copy.loopLabel, locale)}</span>
          <strong>{t(copy.loopTitle, locale)}</strong>
        </div>

        <div className={`${styles.sceneCaption} ${styles.perspectiveCaption}`} style={{ opacity: perspectiveOpacity }} aria-hidden>
          <span>{t(copy.perspectiveLabel, locale)}</span>
          <strong>{t(copy.perspective, locale)}</strong>
        </div>

        <div className={styles.silence} style={{ opacity: listenOpacity }} aria-hidden>
          <span>{t(copy.listenLabel, locale)}</span>
          <strong>{t(copy.listen, locale)}</strong>
        </div>

        <div className={`${styles.sceneCaption} ${styles.testCaption}`} style={{ opacity: testOpacity }} aria-hidden>
          <span>{t(copy.testLabel, locale)}</span>
          <strong>{t(copy.test, locale)}</strong>
        </div>

        <div className={styles.deadpan} style={{ opacity: deadpanOpacity }} aria-hidden>
          <p><span>{t(copy.requestLabel, locale)}</span>{t(copy.secondRequest, locale)}</p>
          <p><span>{t(copy.tomerLabel, locale)}</span><strong>{t(copy.secondReply, locale)}</strong></p>
        </div>

        <div className={`${styles.sceneCaption} ${styles.reframeCaption}`} style={{ opacity: reframeOpacity }} aria-hidden>
          <span>{t(copy.reframeLabel, locale)}</span>
          <strong>{t(copy.reframe, locale)}</strong>
        </div>

        <div className={`${styles.sceneCaption} ${styles.realityCaption}`} style={{ opacity: realityOpacity }} aria-hidden>
          <span>{t(copy.realityLabel, locale)}</span>
          <strong>{t(copy.reality, locale)}</strong>
        </div>

        <div className={styles.questionReveal} style={{ opacity: questionOpacity }} aria-hidden>
          <span>{t(copy.resolution, locale)}</span>
        </div>

        <div className={styles.resolvedRequest} style={{ opacity: resolvedOpacity }} aria-hidden>
          <span>{t(copy.resolvedLabel, locale)}</span>
          <strong>{t(copy.resolved, locale)}</strong>
        </div>

        <div
          className={styles.endCard}
          style={{ opacity: endOpacity, pointerEvents: endOpacity > 0.6 ? "auto" : "none" }}
          aria-hidden={endOpacity <= 0.6}
        >
          <p aria-hidden>{t(copy.role, locale)}</p>
          <h2 aria-hidden>Tomer Naydnov</h2>
          <strong aria-hidden>{t(copy.ctaLead, locale)}</strong>
          <Link ref={endLink} tabIndex={endOpacity > 0.6 ? undefined : -1} href={href("/work", locale)}>
            {t(copy.viewWork, locale)}
          </Link>
        </div>

        <div className={styles.controls}>
          <div className={styles.progressRail} aria-hidden><i style={{ transform: `scaleX(${progress})` }} /></div>
          <div className={styles.controlRow}>
            <nav className={styles.chapterNav} aria-label={t(copy.chapters, locale)}>
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
            </nav>
            <div className={styles.settings}>
              <button type="button" onClick={toggleSound} aria-pressed={soundEnabled}>
                {t(copy.sound, locale)} {t(soundEnabled ? copy.on : copy.off, locale)}
              </button>
              <label>
                <span>{t(copy.quality, locale)}</span>
                <select
                  aria-label={t(copy.quality, locale)}
                  value={quality}
                  onChange={(event) => {
                    setRendererReady(false);
                    setQuality(event.target.value as CinematicQuality);
                  }}
                >
                  <option value="essential">{t(copy.qualityEssential, locale)}</option>
                  <option value="balanced">{t(copy.qualityBalanced, locale)}</option>
                  <option value="premium">{t(copy.qualityPremium, locale)}</option>
                </select>
              </label>
              <button
                type="button"
                onClick={() => {
                  if (soundEnabled) toggleSound();
                  requestMotionMode(true);
                }}
              >
                {t(copy.reduceMotion, locale)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
