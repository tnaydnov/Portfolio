"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
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
  thesis: {
    en: "I take a vague need and turn it into a real product—working, tested and shipped.",
    he: "אני לוקח צורך מעורפל והופך אותו למוצר אמיתי — עובד, בדוק ומושק.",
  },
  disciplines: {
    en: "Product thinking · UX · Systems · Code · Delivery",
    he: "חשיבה מוצרית · חוויית משתמש · מערכות · קוד · הוצאה לפועל",
  },
  scroll: { en: "Scroll to start with almost nothing", he: "גללו כדי להתחיל מכמעט כלום" },
  skip: { en: "Skip intro", he: "דלגו על הפתיח" },
  experience: {
    en: "A vague need becomes a live product",
    he: "צורך מעורפל הופך למוצר חי",
  },
  signalLabel: { en: "NEW / 09:42", he: "חדש / 09:42" },
  signal: { en: "Could we build something for this?", he: "אולי אפשר לבנות לזה משהו?" },
  starts: { en: "That’s usually where it starts.", he: "ככה זה בדרך כלל מתחיל." },
  fragments: { en: "A need. A frustration. A thought.", he: "צורך. תסכול. מחשבה." },
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
  decisionTerms: {
    en: ["USER", "NEED", "FLOW", "REQUIREMENTS", "STATES", "CONSTRAINTS", "PRIORITY", "MVP", "SYSTEM"],
    he: ["משתמש", "צורך", "זרימה", "דרישות", "מצבים", "אילוצים", "עדיפות", "MVP", "מערכת"],
  },
  build: { en: "Then I build it.", he: "ואז אני בונה אותו." },
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
  proof: { en: "This isn’t a process diagram.", he: "זה לא תרשים תהליך." },
  proofStrong: { en: "It’s how I work.", he: "ככה אני עובד." },
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
  live: 0.925,
  proof: 1,
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const TIMELINE_FRACTION = 0.8;
const range = (value: number, start: number, end: number) => clamp01((value - start) / (end - start));
const ease = (value: number) => value * value * (3 - 2 * value);
const localizeList = (value: { readonly en: readonly string[]; readonly he: readonly string[] }, locale: Locale) =>
  value[locale];
const opacityWindow = (value: number, start: number, end: number, feather = 0.025) =>
  ease(range(value, start, start + feather)) * (1 - ease(range(value, end - feather, end)));

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
      <header className={styles.reducedHero}>
        <Link className={styles.reducedSkipLink} href={href("/work", locale)}>{t(copy.skip, locale)}</Link>
        <p>{t(copy.role, locale)}</p>
        <h1 id="reduced-title">{t(copy.name, locale)}</h1>
        <strong>{t(copy.thesis, locale)}</strong>
        <span>{t(copy.disciplines, locale)}</span>
      </header>

      <div className={styles.reducedStory}>
        <section className={styles.reducedBeat}>
          <div className={styles.reducedSignal}>
            <span>{t(copy.signalLabel, locale)}</span>
            <strong>{t(copy.signal, locale)}</strong>
          </div>
          <div><h2>{t(copy.starts, locale)}</h2><p>{t(copy.fragments, locale)}</p></div>
        </section>

        <section className={styles.reducedBeat}>
          <div className={styles.reducedEvidence}>
            {localizeList(copy.questions, locale).map((question) => <span key={question}>{question}</span>)}
          </div>
          <h2>{t(copy.understand, locale)}</h2>
        </section>

        <section className={styles.reducedBeat}>
          <div className={styles.reducedDecisionField}>
            {localizeList(copy.decisionTerms, locale).map((term) => <span key={term}>{term}</span>)}
          </div>
          <h2>{t(copy.decisions, locale)}</h2>
        </section>

        <section className={styles.reducedBeat}>
          <div className={styles.reducedSystem} dir="ltr" aria-hidden>
            <div><span>{t(copy.interfaceLabel, locale)}</span><i /><i /><i /></div>
            {localizeList(copy.architectureTerms, locale).map((term) => <b key={term}>{term}</b>)}
          </div>
          <div><h2>{t(copy.build, locale)}</h2><p>{t(copy.buildSupport, locale)}</p></div>
        </section>

        <section className={styles.reducedBeat}>
          <div className={styles.reducedIteration}>
            {localizeList(copy.iteration, locale).map((verb, index) => <span key={verb} data-corrected={index === 3}>{verb}</span>)}
          </div>
          <div><h2>{t(copy.reality, locale)}</h2><p>{t(copy.realitySupport, locale)}</p></div>
        </section>

        <section className={styles.reducedBeat}>
          <div className={styles.reducedShipping} dir="ltr" aria-label={t(copy.shippingLabel, locale)}>
            {copy.shipping.en.map((status) => <span key={status} data-live={status === "LIVE"}>{status}</span>)}
          </div>
          <div><h2>{t(copy.live, locale)}</h2><p>{t(copy.payoff, locale)}</p></div>
        </section>

        <section className={`${styles.reducedBeat} ${styles.reducedProof}`}>
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
    "(max-height: 520px) and (orientation: landscape), (max-height: 580px) and (max-width: 360px) and (orientation: portrait)",
  );
  const quality = useAdaptiveQuality();
  const reduced = forcedCompact || systemReduced;
  const [progress, setProgress] = useState(0);
  const [worldRequested, setWorldRequested] = useState(false);
  const [rendererReady, setRendererReady] = useState(false);
  const [proofLoaded, setProofLoaded] = useState(false);
  const [motionPreferenceResolved, setMotionPreferenceResolved] = useState(false);
  const progressRef = useRef(0);
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
    if (reduced || queryApplied.current) return;
    queryApplied.current = true;
    const query = new URLSearchParams(window.location.search);
    const requestedProgress = Number(query.get("progress"));
    const requestedScene = query.get("scene");
    const target = Number.isFinite(requestedProgress) && query.has("progress")
      ? clamp01(requestedProgress)
      : requestedScene ? STABLE_PROGRESS[requestedScene] : undefined;
    if (target === undefined) return;
    const frame = window.requestAnimationFrame(() => jump(target, "auto"));
    return () => window.cancelAnimationFrame(frame);
  }, [jump, reduced]);

  const act = ACTS.reduce<(typeof ACTS)[number]>((current, item) => progress >= item.at ? item : current, ACTS[0]).id;
  const proofOpacity = ease(range(progress, 0.945, 0.985));
  const proofInteractive = proofOpacity > 0.82;

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
  const signalOpacity = opacityWindow(progress, 0.105, 0.275, 0.025);
  const understandOpacity = opacityWindow(progress, 0.225, 0.435, 0.03);
  const decisionsOpacity = opacityWindow(progress, 0.395, 0.595, 0.03);
  const buildOpacity = opacityWindow(progress, 0.55, 0.755, 0.03);
  const realityOpacity = opacityWindow(progress, 0.705, 0.895, 0.028);
  const shipOpacity = opacityWindow(progress, 0.845, 0.965, 0.022);
  const worldOpacity = 1 - ease(range(progress, 0.945, 0.995));
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

        <div className="sr-only">
          <h1>{t(copy.name, locale)} — {t(copy.role, locale)}</h1>
          <p>{t(copy.thesis, locale)}</p>
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
        <div className={styles.webgl} style={{ opacity: worldOpacity }} aria-hidden>
          {worldRequested ? (
            <CinematicWorld progress={progressRef} renderProgress={progress} quality={quality} onRendererStatus={setRendererReady} />
          ) : null}
        </div>
        <div className={styles.lightField} aria-hidden />
        <div className={styles.vignette} aria-hidden />

        <div className={styles.identity} style={{ opacity: identityOpacity, transform: `translate3d(0, ${progress * -8}vh, 0)` }} aria-hidden>
          <p>{t(copy.role, locale)}</p>
          <h2>{t(copy.name, locale)}</h2>
          <strong>{t(copy.thesis, locale)}</strong>
          <small>{t(copy.disciplines, locale)}</small>
          <span>{t(copy.scroll, locale)} ↓</span>
        </div>

        <div className={styles.signalComposition} style={{ opacity: signalOpacity, transform: `translate3d(0, ${(0.19 - progress) * 12}vh, 0)` }} aria-hidden>
          <div className={styles.signalCard}><span>{t(copy.signalLabel, locale)}</span><strong>{t(copy.signal, locale)}</strong></div>
          <p>{t(copy.starts, locale)}</p>
          <small>{t(copy.fragments, locale)}</small>
        </div>

        <div className={styles.understandComposition} style={{ opacity: understandOpacity }} aria-hidden>
          <div className={styles.questionField}>
            {localizeList(copy.questions, locale).map((question, index) => <span key={question} style={{ "--index": index } as CSSProperties}>{question}</span>)}
          </div>
          <div className={styles.evidenceField}>
            {localizeList(copy.evidence, locale).map((item, index) => <span key={item} style={{ "--index": index } as CSSProperties}>{item}</span>)}
          </div>
          <strong>{t(copy.understand, locale)}</strong>
        </div>

        <div className={styles.decisionsComposition} style={{ opacity: decisionsOpacity }} aria-hidden>
          <div className={styles.decisionPlanes}>
            {localizeList(copy.decisionTerms, locale).map((term, index) => <span key={term} style={{ "--index": index } as CSSProperties}>{term}</span>)}
          </div>
          <strong>{t(copy.decisions, locale)}</strong>
          <small>{t(copy.decisionFooter, locale)}</small>
        </div>

        <div className={styles.buildComposition} style={{ opacity: buildOpacity }} aria-hidden>
          <div className={styles.buildCopy}><span>{t(copy.productSystem, locale)}</span><strong>{t(copy.build, locale)}</strong><p>{t(copy.buildSupport, locale)}</p></div>
          <div className={styles.interfaceSurface} dir="ltr">
            <header><i /><i /><i /><span>{t(copy.workingState, locale)}</span></header>
            <div className={styles.interfaceBody}><aside><i /><i /><i /></aside><main><span /><strong /><i /><i /><i /></main></div>
          </div>
          <div className={styles.architectureSurface} dir="ltr">
            {localizeList(copy.architectureTerms, locale).map((term) => <span key={term}>{term}</span>)}
          </div>
        </div>

        <div className={styles.realityComposition} style={{ opacity: realityOpacity }} aria-hidden>
          <div className={styles.realityCopy}><strong>{t(copy.reality, locale)}</strong><p>{t(copy.realitySupport, locale)}</p></div>
          <div className={styles.useEvidence} dir="ltr">
            <span className={styles.useCursor}>↗</span><label>{t(copy.expectedPath, locale)}</label><div><i /><i /><i /></div><small>{t(copy.unexpectedUse, locale)}</small>
          </div>
          <div className={styles.iterationRail}>
            {localizeList(copy.iteration, locale).map((verb, index) => <span key={verb} style={{ "--index": index } as CSSProperties}>{verb}</span>)}
          </div>
        </div>

        <div className={styles.shipComposition} style={{ opacity: shipOpacity }} aria-hidden>
          <div className={styles.shippingRail} dir="ltr" aria-label={t(copy.shippingLabel, locale)}>
            {copy.shipping.en.map((status, index) => <span key={status} data-active={index <= shipStage} data-live={status === "LIVE"}>{status}</span>)}
          </div>
          <strong>{t(copy.live, locale)}</strong><p>{t(copy.payoff, locale)}</p>
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
