"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery, useReducedMotion } from "@/components/motion/hooks";
import { t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/site";
import type { CinematicQuality } from "./CinematicWorld";
import styles from "./cinematic-home.module.css";

const CinematicWorld = dynamic(
  () => import("./CinematicWorld").then((module) => module.CinematicWorld),
  { ssr: false, loading: () => null },
);

const LazyProjectArtifact = dynamic(
  () => import("@/components/artifacts/ProjectArtifact").then((module) => module.ProjectArtifact),
  { ssr: false, loading: () => <div className={styles.artifactLoading} aria-hidden /> },
);

const copy = {
  role: { en: "Technical Product Builder", he: "בונה מוצרים טכנולוגיים" },
  name: { en: "Tomer Naydnov", he: "תומר ניידנוב" },
  prompt: { en: "Have an idea?", he: "יש רעיון?" },
  thesis: {
    en: "I'll take it from there.",
    he: "מכאן אני לוקח את זה.",
  },
  disciplines: {
    en: "Need \u2192 Product \u2192 Production",
    he: "צורך ← מוצר ← פרודקשן",
  },
  scroll: { en: "Scroll to drop it in", he: "גללו כדי להכניס אותו פנימה" },
  skip: { en: "Skip intro", he: "דלגו על הפתיח" },
  soundOn: { en: "Sound on", he: "צליל פעיל" },
  soundOff: { en: "Sound off", he: "צליל כבוי" },
  experience: {
    en: "A vague need becomes a live product",
    he: "צורך מעורפל הופך למוצר חי",
  },
  signalLabel: { en: "NEW / 09:42", he: "חדש / 09:42" },
  signal: { en: "Could we build something for this?", he: "אולי אפשר לבנות לזה משהו?" },
  signalMessages: {
    en: ["We need something for this.", "This takes forever.", "Why are we doing this manually?", "Could this be simpler?"],
    he: ["צריך לזה משהו.", "זה לוקח נצח.", "למה אנחנו עושים את זה ידנית?", "אפשר לפשט את זה?"],
  },
  starts: { en: "That's usually where it starts.", he: "ככה זה בדרך כלל מתחיל." },
  fragments: { en: "A need. A frustration. A thought.", he: "צורך. תסכול. מחשבה." },
  discoveryTerms: {
    en: "people · behavior · constraints · workarounds",
    he: "אנשים · התנהגות · אילוצים · מעקפים",
  },
  understand: {
    en: "Before I decide what to build, I need to understand what needs to change.",
    he: "לפני שאני מחליט מה לבנות, אני צריך להבין מה באמת צריך להשתנות.",
  },
  questions: {
    en: ["Who needs it?", "What happens today?", "Where does it break?", "Why?", "What needs to change?"],
    he: ["מי צריך את זה?", "מה קורה היום?", "איפה זה נשבר?", "למה?", "מה באמת צריך להשתנות?"],
  },
  evidence: {
    en: ["conversation", "workflow", "handoff", "workaround", "constraint", "user action"],
    he: ["שיחה", "תהליך עבודה", "העברה", "מעקף", "אילוץ", "פעולת משתמש"],
  },
  decisions: {
    en: "A need becomes a product when the decisions become clear.",
    he: "צורך מתחיל להפוך למוצר כשיש החלטות ברורות.",
  },
  decisionFooter: {
    en: "scope · flow · tradeoffs · priority · system",
    he: "היקף · זרימה · פשרות · עדיפות · מערכת",
  },
  blueprint: {
    en: "Scope \u00b7 Flow \u00b7 Tradeoffs \u00b7 Decisions",
    he: "היקף · זרימה · פשרות · החלטות",
  },
  traceLabel: { en: "02 / TRACE", he: "02 / התחקות" },
  blueprintLabel: { en: "03 / BLUEPRINT", he: "03 / מפת מערכת" },
  assembleLabel: { en: "04 / ASSEMBLE", he: "04 / הרכבה" },
  testLabel: { en: "05 / TEST", he: "05 / בדיקה" },
  decisionTerms: {
    en: ["USER", "NEED", "FLOW", "REQUIREMENTS", "STATES", "CONSTRAINTS", "PRIORITY", "MVP", "SYSTEM"],
    he: ["משתמש", "צורך", "זרימה", "דרישות", "מצבים", "אילוצים", "עדיפות", "MVP", "מערכת"],
  },
  build: { en: "Then I build it.", he: "ואז אני בונה אותו." },
  buildTerms: {
    en: ["UX", "LOGIC", "DATA", "API", "INTERFACE", "SERVICES"],
    he: ["UX", "לוגיקה", "נתונים", "API", "ממשק", "שירותים"],
  },
  buildSupport: {
    en: "Product decisions and technical decisions belong in the same conversation.",
    he: "מבחינתי, החלטות מוצר והחלטות טכניות הן חלק מאותה שיחה.",
  },
  productSystem: { en: "PRODUCT / SYSTEM", he: "מוצר / מערכת" },
  workingState: { en: "PRODUCT / WORKING STATE", he: "מוצר / מצב עובד" },
  interfaceLabel: { en: "INTERFACE", he: "ממשק" },
  architectureTerms: {
    en: ["CLIENT", "API", "AUTH", "DATA", "LOGIC", "SERVICES"],
    he: ["לקוח", "API", "הרשאות", "נתונים", "לוגיקה", "שירותים"],
  },
  reality: { en: "Then reality gets a vote.", he: "ואז המציאות אומרת את שלה." },
  good: { en: "Good.", he: "טוב." },
  realitySupport: {
    en: "The product changes when use proves the plan wrong.",
    he: "המוצר משתנה כשהשימוש מוכיח שהתכנון טעה.",
  },
  expectedPath: { en: "EXPECTED PATH", he: "המסלול הצפוי" },
  unexpectedUse: { en: "WAIT — WHAT HAPPENS NEXT?", he: "רגע — מה קורה עכשיו?" },
  iteration: {
    en: ["TEST", "WATCH", "LEARN", "CHANGE"],
    he: ["בודק", "מתבונן", "לומד", "משנה"],
  },
  shipping: { en: ["BUILD", "TEST", "PRODUCTION", "LIVE"], he: ["BUILD", "TEST", "PRODUCTION", "LIVE"] },
  shippingLabel: {
    en: "Build, test, production, live",
    he: "בנייה, בדיקה, פרודקשן, עלייה לאוויר",
  },
  live: { en: "Live.", he: "באוויר." },
  payoff: {
    en: "From “we need something” to something people can actually use.",
    he: "מ־״צריך פה משהו״ למוצר שאנשים באמת יכולים להשתמש בו.",
  },
  proof: { en: "This isn't a process diagram.", he: "זה לא תרשים תהליך." },
  proofStrong: { en: "It's how I work.", he: "ככה אני עובד." },
  proofIntro: { en: "Selected work. Different lifecycle stages.", he: "עבודות נבחרות. שלבים שונים במחזור החיים." },
  viewProducts: { en: "See all work →", he: "לכל העבודות ←" },
} as const;

const PROJECTS = [
  {
    slug: "arc",
    title: "Arc",
    index: "01",
    status: { en: "Portal online", he: "הפורטל זמין" },
    provenance: { en: "Source-derived reconstruction · fictional data", he: "שחזור מבוסס מקור · נתונים בדויים" },
  },
  {
    slug: "applytide",
    title: "Applytide",
    index: "02",
    status: { en: "Source archived", he: "קוד המקור בארכיון" },
    provenance: { en: "Source-derived reconstruction · fictional data", he: "שחזור מבוסס מקור · נתונים בדויים" },
  },
  {
    slug: "eventa",
    title: "Eventa",
    index: "03",
    status: { en: "Discontinued · source public", he: "הופסק · הקוד ציבורי" },
    provenance: { en: "Illustrative product scenario · fictional profiles", he: "תרחיש מוצר להמחשה · פרופילים בדויים" },
  },
] as const;

const ACTS = [
  { id: "identity", at: 0 },
  { id: "signal", at: 0.12 },
  { id: "understand", at: 0.24 },
  { id: "decisions", at: 0.41 },
  { id: "build", at: 0.57 },
  { id: "reality", at: 0.73 },
  { id: "live", at: 0.87 },
  { id: "proof", at: 0.95 },
] as const;

const STABLE_PROGRESS: Record<string, number> = {
  identity: 0.075,
  signal: 0.19,
  understand: 0.35,
  decisions: 0.525,
  build: 0.695,
  reality: 0.845,
  live: 0.94,
  proof: 1,
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const TIMELINE_FRACTION = 0.8;
const range = (value: number, start: number, end: number) => clamp01((value - start) / (end - start));
const ease = (value: number) => value * value * (3 - 2 * value);
const opacityWindow = (value: number, start: number, end: number, feather = 0.025) =>
  ease(range(value, start, start + feather)) * (1 - ease(range(value, end - feather, end)));

type FoleyCue = "impact" | "lock" | "assemble" | "fault" | "gate" | "live";

const FOLEY_CUES: ReadonlyArray<{ at: number; cue: FoleyCue }> = [
  { at: 0.105, cue: "impact" },
  { at: 0.445, cue: "lock" },
  { at: 0.49, cue: "lock" },
  { at: 0.535, cue: "lock" },
  { at: 0.625, cue: "assemble" },
  { at: 0.665, cue: "assemble" },
  { at: 0.705, cue: "assemble" },
  { at: 0.795, cue: "fault" },
  { at: 0.875, cue: "gate" },
  { at: 0.902, cue: "gate" },
  { at: 0.929, cue: "gate" },
  { at: 0.943, cue: "live" },
];

function playFoley(context: AudioContext, cue: FoleyCue) {
  if (context.state !== "running") return;
  const now = context.currentTime;
  const output = context.createGain();
  const duration = cue === "live" ? 0.9 : cue === "fault" ? 0.34 : cue === "gate" ? 0.25 : 0.14;
  const volume = cue === "live" ? 0.075 : cue === "gate" ? 0.09 : 0.055;
  output.gain.setValueAtTime(0.0001, now);
  output.gain.exponentialRampToValueAtTime(volume, now + 0.008);
  output.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  output.connect(context.destination);

  const frequencies: Record<FoleyCue, [number, number, OscillatorType]> = {
    impact: [310, 72, "triangle"],
    lock: [1050, 470, "square"],
    assemble: [560, 190, "triangle"],
    fault: [170, 54, "sawtooth"],
    gate: [118, 42, "triangle"],
    live: [220, 330, "sine"],
  };
  const [start, end, type] = frequencies[cue];
  const oscillator = context.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(start, now);
  oscillator.frequency.exponentialRampToValueAtTime(end, now + duration);
  oscillator.connect(output);
  oscillator.start(now);
  oscillator.stop(now + duration);

  if (cue === "impact" || cue === "gate" || cue === "fault") {
    const length = Math.max(1, Math.floor(context.sampleRate * duration));
    const noiseBuffer = context.createBuffer(1, length, context.sampleRate);
    const channel = noiseBuffer.getChannelData(0);
    for (let index = 0; index < length; index += 1) channel[index] = (Math.random() * 2 - 1) * Math.pow(1 - index / length, 2);
    const noise = context.createBufferSource();
    const filter = context.createBiquadFilter();
    filter.type = cue === "fault" ? "bandpass" : "lowpass";
    filter.frequency.value = cue === "fault" ? 780 : 260;
    noise.buffer = noiseBuffer;
    noise.connect(filter).connect(output);
    noise.start(now);
  }

  if (cue === "live") {
    const upper = context.createOscillator();
    upper.type = "sine";
    upper.frequency.setValueAtTime(330, now);
    upper.frequency.linearRampToValueAtTime(440, now + duration);
    upper.connect(output);
    upper.start(now + 0.08);
    upper.stop(now + duration);
  }
}

function useAdaptiveQuality() {
  const [quality, setQuality] = useState<CinematicQuality>("balanced");

  useEffect(() => {
    const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const coarseNarrow = window.matchMedia("(pointer: coarse) and (max-width: 520px)").matches;
    const memory = device.deviceMemory;
    const cores = navigator.hardwareConcurrency || 4;
    if (device.connection?.saveData || (memory !== undefined && memory <= 4) || cores <= 4 || (coarseNarrow && cores <= 6)) {
      setQuality("essential");
      return;
    }
    if (!coarseNarrow && (memory ?? 8) >= 8 && cores >= 8 && window.innerWidth >= 1200) setQuality("premium");
  }, []);

  return quality;
}

function ProjectProof({
  locale,
  interactive,
  renderArtifacts = true,
}: {
  locale: Locale;
  interactive: boolean;
  renderArtifacts?: boolean;
}) {
  return (
    <div className={styles.projectProof}>
      {PROJECTS.map((project) => (
        <Link
          key={project.slug}
          href={href(`/work/${project.slug}`, locale)}
          aria-label={`${project.title}: ${t(project.status, locale)}. ${t(project.provenance, locale)}`}
          tabIndex={interactive ? undefined : -1}
          aria-hidden={!interactive}
          className={styles.projectProofItem}
        >
          <div className={styles.projectVisual}>
            {renderArtifacts
              ? <LazyProjectArtifact slug={project.slug} locale={locale} size="card" />
              : <div className={styles.artifactLoading} aria-hidden />}
          </div>
          <div className={styles.projectProofMeta}>
            <span>{project.index}</span>
            <strong>{project.title}</strong>
            <small>{t(project.status, locale)} · {t(project.provenance, locale)}</small>
          </div>
        </Link>
      ))}
    </div>
  );
}

type MachineStillStage = "signal" | "workflow" | "blueprint" | "foundry" | "test" | "tunnel";

function MachineStill({ stage }: { stage: MachineStillStage }) {
  return (
    <div className={styles.machineStill} data-stage={stage} dir="ltr" aria-hidden>
      <div className={styles.machineFloor} />
      <div className={styles.machineRail}><i /><i /><i /><i /><i /><i /></div>
      <b className={styles.machineCore} />
      <span className={styles.machineGate}><i /><i /></span>
      <em className={styles.machineFault} />
    </div>
  );
}

function ReducedExperience({ locale, markFocusInside, markFocusOutside, proofReady }: {
  locale: Locale;
  markFocusInside: () => void;
  markFocusOutside: (nextTarget: EventTarget | null) => void;
  proofReady: boolean;
}) {
  return (
    <section
      className={styles.reducedExperience}
      aria-labelledby="reduced-title"
      data-cinematic-mode-root
      tabIndex={-1}
      onFocusCapture={markFocusInside}
      onBlurCapture={(event) => markFocusOutside(event.relatedTarget)}
    >
      <header className={styles.reducedHero} data-reduced-scene="identity">
        <Link className={styles.reducedSkipLink} href={href("/work", locale)}>{t(copy.skip, locale)}</Link>
        <p>{t(copy.role, locale)}</p>
        <h1 id="reduced-title">{t(copy.name, locale)}</h1>
        <b>{t(copy.prompt, locale)}</b>
        <strong>{t(copy.thesis, locale)}</strong>
        <span>{t(copy.disciplines, locale)}</span>
      </header>

      <div className={styles.reducedStory}>
        <section className={styles.reducedBeat} data-reduced-scene="signal">
          <MachineStill stage="signal" />
          <div className={styles.reducedBeatCopy}>
            <span>{t(copy.signalLabel, locale)}</span>
            <h2>{t(copy.signal, locale)}</h2>
            <p>{t(copy.starts, locale)} {t(copy.fragments, locale)}</p>
          </div>
        </section>

        <section className={styles.reducedBeat} data-reduced-scene="understand">
          <MachineStill stage="workflow" />
          <div className={styles.reducedBeatCopy}>
            <span>{t(copy.traceLabel, locale)}</span>
            <h2>{t(copy.understand, locale)}</h2>
          </div>
        </section>

        <section className={styles.reducedBeat} data-reduced-scene="decisions">
          <MachineStill stage="blueprint" />
          <div className={styles.reducedBeatCopy}>
            <span>{t(copy.blueprintLabel, locale)}</span>
            <h2>{t(copy.decisions, locale)}</h2>
            <p>{t(copy.blueprint, locale)}</p>
          </div>
        </section>

        <section className={styles.reducedBeat} data-reduced-scene="build">
          <MachineStill stage="foundry" />
          <div className={styles.reducedBeatCopy}>
            <span>{t(copy.assembleLabel, locale)}</span>
            <h2>{t(copy.build, locale)}</h2>
            <p>{t(copy.buildSupport, locale)}</p>
          </div>
        </section>

        <section className={styles.reducedBeat} data-reduced-scene="reality">
          <MachineStill stage="test" />
          <div className={styles.reducedBeatCopy}>
            <span>{t(copy.testLabel, locale)}</span>
            <strong className={styles.reducedGood}>{t(copy.good, locale)}</strong>
            <h2>{t(copy.reality, locale)}</h2>
            <p>{t(copy.realitySupport, locale)}</p>
          </div>
        </section>

        <section className={styles.reducedBeat} data-reduced-scene="live">
          <MachineStill stage="tunnel" />
          <div className={styles.reducedBeatCopy}>
            <div className={styles.reducedGateLabels} dir="ltr" aria-label={t(copy.shippingLabel, locale)}>
              {copy.shipping.en.slice(0, 3).map((status) => <span key={status}>{status}</span>)}
            </div>
            <h2>{t(copy.live, locale)}</h2>
            <p>{t(copy.payoff, locale)}</p>
          </div>
        </section>

        <section className={`${styles.reducedBeat} ${styles.reducedProof}`} data-reduced-scene="proof">
          <div className={styles.reducedProofCopy}>
            <span>{t(copy.proofIntro, locale)}</span>
            <h2>{t(copy.proof, locale)} <strong>{t(copy.proofStrong, locale)}</strong></h2>
          </div>
          <ProjectProof locale={locale} interactive renderArtifacts={proofReady} />
          <Link className={styles.reducedWorkLink} href={href("/work", locale)}>{t(copy.viewProducts, locale)}</Link>
        </section>
      </div>
    </section>
  );
}

export function CinematicHome({ locale }: { locale: Locale }) {
  const systemReduced = useReducedMotion();
  const forcedCompact = useMediaQuery(
    "(max-height: 520px) and (orientation: landscape), (max-height: 600px) and (orientation: portrait)",
  );
  const quality = useAdaptiveQuality();
  const reduced = forcedCompact || systemReduced;
  const [progress, setProgress] = useState(0);
  const [worldRequested, setWorldRequested] = useState(false);
  const [rendererReady, setRendererReady] = useState(false);
  const [proofLoaded, setProofLoaded] = useState(false);
  const [motionPreferenceResolved, setMotionPreferenceResolved] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const progressRef = useRef(0);
  const soundContext = useRef<AudioContext | null>(null);
  const lastSoundProgress = useRef(0);
  const root = useRef<HTMLElement>(null);
  const skipLink = useRef<HTMLAnchorElement>(null);
  const proofRoot = useRef<HTMLDivElement>(null);
  const preservedProgress = useRef(0);
  const focusWasInCinematic = useRef(false);
  const queryApplied = useRef(false);
  const initialPreferencePending = useRef(true);

  useEffect(() => {
    const timer = window.setTimeout(() => { initialPreferencePending.current = false; }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { setMotionPreferenceResolved(true); }, []);

  useEffect(() => () => {
    const context = soundContext.current;
    soundContext.current = null;
    if (context && context.state !== "closed") void context.close().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => setWorldRequested(true), 320);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  useEffect(() => { if (reduced) setRendererReady(false); }, [reduced]);
  useEffect(() => { if (progress > 0.905) setProofLoaded(true); }, [progress]);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const element = root.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, element.offsetHeight - window.innerHeight);
      const next = clamp01(-rect.top / (distance * TIMELINE_FRACTION));
      progressRef.current = next;
      if (next > 0.002) setWorldRequested(true);
      setProgress((current) => (Math.abs(current - next) > 0.0005 ? next : current));
    };
    const requestMeasure = () => { if (!frame) frame = window.requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);
    return () => {
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const jump = useCallback((at: number, behavior: ScrollBehavior = "smooth") => {
    const element = root.current;
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY;
    const distance = element.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * TIMELINE_FRACTION * at, behavior });
  }, []);

  const disableSound = useCallback(() => {
    setSoundEnabled(false);
    const context = soundContext.current;
    soundContext.current = null;
    if (context && context.state !== "closed") void context.close().catch(() => undefined);
  }, []);

  const toggleSound = useCallback(async () => {
    if (soundEnabled) return disableSound();
    const AudioContextConstructor = window.AudioContext
      ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor) return;
    const context = new AudioContextConstructor();
    try {
      if (context.state === "suspended") await context.resume();
      if (context.state !== "running") throw new Error("Audio context unavailable");
      soundContext.current = context;
      lastSoundProgress.current = progressRef.current;
      setSoundEnabled(true);
    } catch {
      if (context.state !== "closed") await context.close().catch(() => undefined);
      setSoundEnabled(false);
    }
  }, [disableSound, soundEnabled]);

  useEffect(() => {
    const context = soundContext.current;
    if (!soundEnabled || !context) return;
    const syncState = () => { if (context.state !== "running") disableSound(); };
    const handleVisibility = () => { if (document.hidden) disableSound(); };
    context.addEventListener("statechange", syncState);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      context.removeEventListener("statechange", syncState);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [disableSound, soundEnabled]);

  useEffect(() => {
    const previous = lastSoundProgress.current;
    lastSoundProgress.current = progress;
    const context = soundContext.current;
    if (!soundEnabled || !context || progress <= previous) return;
    const crossed = FOLEY_CUES.filter(({ at }) => at > previous && at <= progress);
    if (crossed.length === 0) return;
    const cues = progress - previous > 0.12 ? crossed.slice(-1) : crossed;
    cues.forEach(({ cue }, index) => window.setTimeout(() => playFoley(context, cue), index * 55));
  }, [progress, soundEnabled]);

  const markFocusInside = useCallback(() => { focusWasInCinematic.current = true; }, []);
  const markFocusOutside = useCallback((nextTarget: EventTarget | null) => {
    const modeRoot = document.querySelector<HTMLElement>("[data-cinematic-mode-root]");
    focusWasInCinematic.current = nextTarget instanceof Node && Boolean(modeRoot?.contains(nextTarget));
  }, []);

  const previousReduced = useRef(reduced);
  useEffect(() => {
    const wasReduced = previousReduced.current;
    previousReduced.current = reduced;
    if (wasReduced === reduced) return;
    const shouldRestoreFocus = focusWasInCinematic.current;
    const initialHydrationSwap = initialPreferencePending.current && wasReduced && !reduced;
    initialPreferencePending.current = false;
    if (initialHydrationSwap) return;

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
    if (!motionPreferenceResolved || queryApplied.current) return;
    queryApplied.current = true;
    const query = new URLSearchParams(window.location.search);
    const requestedProgress = Number(query.get("progress"));
    const requestedScene = query.get("scene");
    const target = Number.isFinite(requestedProgress) && query.has("progress")
      ? clamp01(requestedProgress)
      : requestedScene ? STABLE_PROGRESS[requestedScene] : undefined;
    if (target === undefined) return;
    const frame = window.requestAnimationFrame(() => {
      if (reduced) {
        const sceneId = requestedScene && STABLE_PROGRESS[requestedScene] !== undefined
          ? requestedScene
          : ACTS.reduce<(typeof ACTS)[number]["id"]>((current, item) => target >= item.at ? item.id : current, ACTS[0].id);
        document.querySelector<HTMLElement>(`[data-reduced-scene="${sceneId}"]`)?.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
      jump(target, "auto");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [jump, motionPreferenceResolved, reduced]);

  const act = ACTS.reduce<(typeof ACTS)[number]>((current, item) => progress >= item.at ? item : current, ACTS[0]).id;
  const proofOpacity = ease(range(progress, 0.985, 0.9985));
  const proofInteractive = proofOpacity > 0.32;

  useEffect(() => {
    if (reduced || proofInteractive) return;
    const active = document.activeElement;
    if (active instanceof Node && proofRoot.current?.contains(active)) skipLink.current?.focus({ preventScroll: true });
  }, [proofInteractive, reduced]);

  if (reduced) {
    return (
      <ReducedExperience
        locale={locale}
        markFocusInside={markFocusInside}
        markFocusOutside={markFocusOutside}
        proofReady={motionPreferenceResolved}
      />
    );
  }

  const identityOpacity = 1 - ease(range(progress, 0.075, 0.13));
  const signalOpacity = opacityWindow(progress, 0.105, 0.238, 0.022);
  const understandOpacity = opacityWindow(progress, 0.242, 0.435, 0.025);
  const decisionsOpacity = opacityWindow(progress, 0.395, 0.57, 0.025);
  const buildOpacity = opacityWindow(progress, 0.585, 0.755, 0.025);
  const realityOpacity = opacityWindow(progress, 0.705, 0.895, 0.028);
  const shipOpacity = opacityWindow(progress, 0.845, 0.965, 0.022);
  const faultOpacity = opacityWindow(progress, 0.798, 0.842, 0.008);
  const realityVoteOpacity = opacityWindow(progress, 0.735, 0.795, 0.014);
  const liveOpacity = ease(range(progress, 0.92, 0.946));
  const shipStage = progress < 0.885 ? 0 : progress < 0.91 ? 1 : progress < 0.935 ? 2 : 3;

  return (
    <section
      ref={root}
      tabIndex={-1}
      className={styles.experience}
      aria-label={t(copy.experience, locale)}
      data-cinematic-home
      data-cinematic-mode-root
      data-act={act}
      data-progress={progress.toFixed(4)}
      data-quality={quality}
      data-motion="full"
      data-renderer={rendererReady ? "r3f" : "pending"}
      onFocusCapture={markFocusInside}
      onBlurCapture={(event) => markFocusOutside(event.relatedTarget)}
    >
      <div className={styles.stickyFrame}>
        <Link ref={skipLink} className={styles.skipLink} href={href("/work", locale)}>{t(copy.skip, locale)}</Link>
        <button
          type="button"
          className={styles.soundToggle}
          aria-pressed={soundEnabled}
          onClick={() => { void toggleSound(); }}
        >
          <i aria-hidden />
          {t(soundEnabled ? copy.soundOn : copy.soundOff, locale)}
        </button>

        <div className="sr-only">
          <h1>{t(copy.name, locale)} — {t(copy.role, locale)}</h1>
          <p>{t(copy.prompt, locale)} {t(copy.thesis, locale)} {t(copy.disciplines, locale)}</p>
          <ol>
            <li>{t(copy.signal, locale)} {t(copy.starts, locale)}</li>
            <li>{t(copy.understand, locale)}</li>
            <li>{t(copy.decisions, locale)}</li>
            <li>{t(copy.build, locale)} {t(copy.buildSupport, locale)}</li>
            <li>{t(copy.reality, locale)} {t(copy.realitySupport, locale)}</li>
            <li>{t(copy.live, locale)} {t(copy.payoff, locale)}</li>
            <li>{t(copy.proof, locale)} {t(copy.proofStrong, locale)}</li>
          </ol>
        </div>

        <div className={styles.cssFallback} aria-hidden><i /><i /><i /></div>
        <div className={styles.webgl} aria-hidden>
          {worldRequested ? (
            <CinematicWorld
              progress={progressRef}
              renderProgress={progress}
              quality={quality}
              signalMessages={copy.signalMessages[locale]}
              onRendererStatus={setRendererReady}
            />
          ) : null}
        </div>
        <div className={styles.lightField} aria-hidden />
        <div className={styles.vignette} aria-hidden />

        <div className={styles.identity} style={{ opacity: identityOpacity, transform: `translate3d(0, ${progress * -8}vh, 0)` }} aria-hidden>
          <p>{t(copy.role, locale)}</p>
          <h2>{t(copy.name, locale)}</h2>
          <b>{t(copy.prompt, locale)}</b>
          <strong>{t(copy.thesis, locale)}</strong>
          <small>{t(copy.disciplines, locale)}</small>
          <span>{t(copy.scroll, locale)} ↓</span>
        </div>

        <div className={styles.signalComposition} style={{ opacity: signalOpacity, transform: `translate3d(0, ${(0.19 - progress) * 12}vh, 0)` }} aria-hidden>
          <span>{t(copy.signalLabel, locale)}</span>
          <strong>{t(copy.fragments, locale)}</strong>
          <small>{t(copy.starts, locale)}</small>
        </div>

        <div className={styles.understandComposition} style={{ opacity: understandOpacity }} aria-hidden>
          <strong>{t(copy.understand, locale)}</strong>
          <small>{t(copy.discoveryTerms, locale)}</small>
        </div>

        <div className={styles.decisionsComposition} style={{ opacity: decisionsOpacity }} aria-hidden>
          <span>{t(copy.blueprintLabel, locale)}</span>
          <strong>{t(copy.blueprint, locale)}</strong>
        </div>

        <div className={styles.buildComposition} style={{ opacity: buildOpacity }} aria-hidden>
          <span>{t(copy.assembleLabel, locale)}</span>
          <strong>{t(copy.build, locale)}</strong>
          <div className={styles.buildTerms} dir={locale === "he" ? "rtl" : "ltr"}>
            {copy.buildTerms[locale].map((term) => <small key={term}>{term}</small>)}
          </div>
        </div>

        <div className={styles.realityComposition} style={{ opacity: realityOpacity }} aria-hidden>
          <strong className={styles.good} style={{ opacity: faultOpacity }}>{t(copy.good, locale)}</strong>
          <p style={{ opacity: realityVoteOpacity }}>{t(copy.reality, locale)}</p>
        </div>

        <div className={styles.shipComposition} style={{ opacity: shipOpacity }} aria-hidden>
          <div className={styles.shippingRail} dir="ltr" aria-label={t(copy.shippingLabel, locale)}>
            {copy.shipping.en.map((status, index) => <span key={status} data-active={index <= shipStage} data-live={status === "LIVE"}>{status}</span>)}
          </div>
          <strong style={{ opacity: liveOpacity }}>{t(copy.live, locale)}</strong>
          <p style={{ opacity: liveOpacity }}>{t(copy.payoff, locale)}</p>
        </div>

        <div
          ref={proofRoot}
          className={styles.proofComposition}
          style={{ opacity: proofOpacity, pointerEvents: proofInteractive ? "auto" : "none" }}
          aria-hidden={!proofInteractive}
        >
          <div className={styles.proofCopy}><span>{t(copy.proofIntro, locale)}</span><h2>{t(copy.proof, locale)} <strong>{t(copy.proofStrong, locale)}</strong></h2></div>
          {proofLoaded ? <ProjectProof locale={locale} interactive={proofInteractive} /> : null}
          <Link className={styles.workLink} tabIndex={proofInteractive ? undefined : -1} href={href("/work", locale)}>{t(copy.viewProducts, locale)}</Link>
        </div>

        <div className={styles.minimalProgress} aria-hidden><i><b style={{ transform: `scaleX(${progress})` }} /></i></div>
      </div>
    </section>
  );
}
