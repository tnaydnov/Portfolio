"use client";

import type {
  FocusEvent as ReactFocusEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";

import styles from "./career-timeline.module.css";

export interface TimelineEntry {
  id: string;
  span: string;
  title: string;
  org: string;
  summary: string;
  current?: boolean;
}

export interface ExperienceEntry extends TimelineEntry {
  details: string[];
}

interface ExperienceLabels {
  current: string;
  roleDetails: string;
  closeDetails: string;
  responsibilities: string;
}

function disclosureInside(element: HTMLElement): HTMLDetailsElement | null {
  return element.querySelector("details");
}

function openPreview(details: HTMLDetailsElement) {
  if (details.open) return;
  details.open = true;
  details.dataset.preview = "true";
}

function closePreview(details: HTMLDetailsElement) {
  if (details.dataset.preview !== "true") return;
  details.open = false;
  delete details.dataset.preview;
}

export function ExperienceTimeline({
  entries,
  labels,
}: {
  entries: ExperienceEntry[];
  labels: ExperienceLabels;
}) {
  function handlePointerEnter(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const details = disclosureInside(event.currentTarget);
    if (details) openPreview(details);
  }

  function handlePointerLeave(event: ReactPointerEvent<HTMLElement>) {
    const details = disclosureInside(event.currentTarget);
    if (!details || event.currentTarget.contains(document.activeElement)) return;
    closePreview(details);
  }

  function handleFocus(event: ReactFocusEvent<HTMLElement>) {
    const details = disclosureInside(event.currentTarget);
    if (details) openPreview(details);
  }

  function handleBlur(event: ReactFocusEvent<HTMLElement>) {
    const next = event.relatedTarget as Node | null;
    if (next && event.currentTarget.contains(next)) return;
    const details = disclosureInside(event.currentTarget);
    if (details) closePreview(details);
  }

  function pinPreview(event: ReactMouseEvent<HTMLElement>) {
    const details = event.currentTarget.parentElement as HTMLDetailsElement | null;
    if (!details || details.dataset.preview !== "true") return;
    event.preventDefault();
    delete details.dataset.preview;
  }

  return (
    <ol className={styles.timeline}>
      {entries.map((entry, index) => {
        const titleId = `experience-${entry.id}-title`;
        return (
          <li
            key={entry.id}
            className={`${styles.item} ${entry.current ? styles.currentItem : ""}`}
          >
            <div className={styles.chronology}>
              <span className={styles.sequence} aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className={styles.span}><bdi>{entry.span}</bdi></p>
              {entry.current ? (
                <p className={styles.current}>
                  <span aria-hidden />
                  {labels.current}
                </p>
              ) : null}
            </div>

            <article
              className={styles.role}
              aria-labelledby={titleId}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              onFocusCapture={handleFocus}
              onBlurCapture={handleBlur}
            >
              <span className={styles.node} aria-hidden />
              <header>
                <h3 id={titleId} className={styles.title}>{entry.title}</h3>
                <p className={styles.org}>{entry.org}</p>
                <p className={styles.summary}>{entry.summary}</p>
              </header>

              <details className={styles.disclosure}>
                <summary className={styles.disclosureSummary} onClick={pinPreview}>
                  <span className={styles.closedCue}>{labels.roleDetails}</span>
                  <span className={styles.openCue}>{labels.closeDetails}</span>
                  <span className={styles.disclosureMark} aria-hidden />
                </summary>
                <div className={styles.detailPanel}>
                  <p className={styles.detailLabel}>{labels.responsibilities}</p>
                  <ul className={styles.detailList}>
                    {entry.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </details>
            </article>
          </li>
        );
      })}
    </ol>
  );
}

export function EducationTimeline({
  entries,
  currentLabel,
}: {
  entries: TimelineEntry[];
  currentLabel: string;
}) {
  return (
    <ol className={`${styles.timeline} ${styles.educationTimeline}`}>
      {entries.map((entry, index) => {
        const titleId = `education-${entry.id}-title`;
        return (
          <li
            key={entry.id}
            className={`${styles.item} ${entry.current ? styles.currentItem : ""}`}
          >
            <div className={styles.chronology}>
              <span className={styles.sequence} aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className={styles.span}><bdi>{entry.span}</bdi></p>
              {entry.current ? (
                <p className={styles.current}>
                  <span aria-hidden />
                  {currentLabel}
                </p>
              ) : null}
            </div>
            <article className={styles.role} aria-labelledby={titleId}>
              <span className={styles.node} aria-hidden />
              <h3 id={titleId} className={styles.title}>{entry.title}</h3>
              <p className={styles.org}>{entry.org}</p>
              <p className={styles.summary}>{entry.summary}</p>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
