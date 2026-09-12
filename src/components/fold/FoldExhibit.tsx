"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode, useCallback, useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "@/components/motion/hooks";
import type { Locale } from "@/lib/i18n";
import styles from "./fold-exhibit.module.css";

const FoldScene = dynamic(() => import("./FoldScene"), { ssr: false });

const COPY = {
  en: {
    exhibit: "Arc, unfolded",
    detail: "A learning loop, in three folds.",
    open: "Unfold the thinking",
    close: "Fold it back",
    states: ["Prepare", "Teach", "Refine"],
    explanations: ["Reusable lessons", "Classroom work", "Feedback & revision"],
    assembled: "Three connected stages of Arc's learning loop.",
    unfolded: "The learning loop is unfolded: prepare reusable lessons, use them in the classroom, and refine through feedback.",
  },
  he: {
    exhibit: "Arc, מבפנים",
    detail: "מעגל למידה, בשלושה קפלים.",
    open: "לפתוח את המחשבה",
    close: "לקפל בחזרה",
    states: ["הכנה", "הוראה", "שיפור"],
    explanations: ["שיעורים לשימוש חוזר", "עבודה בכיתה", "משוב ועדכון"],
    assembled: "שלושה שלבים מחוברים במעגל הלמידה של Arc.",
    unfolded: "מעגל הלמידה נפתח: הכנת שיעורים לשימוש חוזר, עבודה בכיתה ושיפור בעזרת משוב.",
  },
} as const;

class SceneBoundary extends Component<{ children: ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function FoldFallback({ expanded }: { expanded: boolean }) {
  return (
    <div className={styles.fallback} data-expanded={expanded} aria-hidden="true">
      <div className={styles.paperShadow} />
      <div className={styles.paperChain}>
        <div className={`${styles.paperFace} ${styles.paperFirst}`}>
          <i className={styles.printRule} />
          <span className={styles.printLoop} />
          <i className={styles.printFoot} />
          <div className={`${styles.paperFace} ${styles.paperMiddle}`}>
            <i className={styles.printRule} />
            <span className={styles.printLines}><i /><i /><i /></span>
            <i className={styles.printFoot} />
            <div className={`${styles.paperFace} ${styles.paperLast}`}>
              <i className={styles.printRule} />
              <span className={`${styles.printLoop} ${styles.printReturn}`} />
              <i className={styles.printFoot} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FoldExhibit({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const [expanded, setExpanded] = useState(false);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const reducedMotion = useReducedMotion();
  const figure = useRef<HTMLElement>(null);
  const detailsId = useId();
  const onReady = useCallback(() => setReady(true), []);
  const onUnavailable = useCallback(() => { setUnavailable(true); setReady(false); }, []);

  useEffect(() => {
    const element = figure.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "80px" });
    observer.observe(element);
    const syncVisibility = () => setTabVisible(document.visibilityState === "visible");
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  return (
    <figure ref={figure} className={styles.exhibit} data-expanded={expanded} dir={locale === "he" ? "rtl" : "ltr"}>
      <div className={styles.exhibitLabel}>
        <span>{copy.exhibit}</span>
        <span className={styles.edition} aria-hidden="true">01 — 03</span>
      </div>
      <div className={styles.art} aria-hidden="true">
        <div className={styles.fallbackLayer} data-hidden={ready && !unavailable}>
          <FoldFallback expanded={expanded} />
        </div>
        {!unavailable && (
          <div className={styles.scene} data-ready={ready}>
            <SceneBoundary onUnavailable={onUnavailable}>
              <FoldScene
                expanded={expanded}
                reducedMotion={reducedMotion}
                active={inView && tabVisible}
                onReady={onReady}
                onUnavailable={onUnavailable}
              />
            </SceneBoundary>
          </div>
        )}
      </div>
      <div className={styles.control}>
        <button
          type="button"
          className={styles.unfoldButton}
          aria-pressed={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((previous) => !previous)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className={styles.buttonIcon}>
            <path d="M2 4.5 6.5 2.5l5 2L16 2.5v11l-4.5 2-5-2L2 15.5v-11Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M6.5 2.5v11m5-9v11" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          {expanded ? copy.close : copy.open}
          <span className={styles.controlArrow} aria-hidden="true">↗</span>
        </button>
      </div>
      <figcaption className={styles.caption} id={detailsId}>
        <p className={styles.captionIntro}>{copy.detail}</p>
        <ol className={styles.stages}>
          {copy.states.map((stage, index) => (
            <li key={stage}>
              <span className={styles.stageNumber} aria-hidden="true">0{index + 1}</span>
              <div>
                <span className={styles.stageName}>{stage}</span>
                <span className={styles.stageDetail}>{copy.explanations[index]}</span>
              </div>
            </li>
          ))}
        </ol>
        <span className={styles.srOnly} role="status">{expanded ? copy.unfolded : copy.assembled}</span>
      </figcaption>
    </figure>
  );
}

export { FoldExhibit };
