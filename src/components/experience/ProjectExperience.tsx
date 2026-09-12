"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Component, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ProjectArtifact } from "@/components/artifacts";
import { t, type Locale } from "@/lib/i18n";
import { href, site } from "@/lib/site";
import { EXPERIENCE_PROJECTS, experienceProjects, isExperienceProject, type ExperienceProject } from "./projects";
import styles from "./project-experience.module.css";

const ProjectScene = dynamic(() => import("./ProjectScene"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} /></svg>;
}

export function ProjectExperience({ locale, initialProject = "arc" }: { locale: Locale; initialProject?: ExperienceProject }) {
  const [project, setProject] = useState<ExperienceProject>(initialProject);
  const [operated, setOperated] = useState(false);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [active, setActive] = useState(false);
  const [motionOff, setMotionOff] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const stage = useRef<HTMLElement>(null);
  const selectedQuery = useSearchParams().get("project");
  const info = experienceProjects[project];
  const he = locale === "he";
  const onReady = useCallback(() => setReady(true), []);
  const onUnavailable = useCallback(() => { setUnavailable(true); setReady(false); }, []);

  useEffect(() => {
    setMounted(true);
    // Fiber configures its renderer asynchronously; detect unsupported WebGL before that work starts.
    try {
      const probe = document.createElement("canvas");
      const context = probe.getContext("webgl2");
      if (context) { context.getExtension("WEBGL_lose_context")?.loseContext(); setCanRender(true); }
      else setUnavailable(true);
    } catch { setUnavailable(true); }
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const readMotion = () => { try { setMotionOff(preference.matches || window.localStorage.getItem("portfolio-motion") === "off"); } catch { setMotionOff(preference.matches); } };
    readMotion();
    preference.addEventListener("change", readMotion);
    let visible = true;
    const updateActive = () => setActive(visible && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updateActive(); }, { threshold: .08 });
    if (stage.current) observer.observe(stage.current);
    document.addEventListener("visibilitychange", updateActive);
    return () => { observer.disconnect(); preference.removeEventListener("change", readMotion); document.removeEventListener("visibilitychange", updateActive); };
  }, []);

  useEffect(() => {
    setProject(isExperienceProject(selectedQuery) ? selectedQuery : "arc");
    setOperated(false);
    window.dispatchEvent(new Event("portfolio:selection"));
  }, [selectedQuery]);

  function select(value: ExperienceProject) {
    if (project === value) return;
    setProject(value); setOperated(false);
    const url = new URL(window.location.href);
    url.searchParams.set("project", value);
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event("portfolio:selection"));
  }

  function toggleMotion() {
    setMotionOff(value => {
      try { window.localStorage.setItem("portfolio-motion", value ? "on" : "off"); } catch { /* The preference still works for this visit. */ }
      return !value;
    });
  }

  return <section ref={stage} className={styles.experience} data-project={project} data-ready={ready} data-motion={motionOff ? "off" : "on"} style={{ "--project-accent": info.accent, "--project-secondary": info.secondary } as CSSProperties} aria-label={he ? "הפרויקטים של תומר ניידנוב" : "Tomer Naydnov’s selected projects"}>
    <div className={styles.stageHead}>
      <div className={styles.identity}><span className={styles.identityMarker} aria-hidden="true" /><div><p>{t(site.name, locale)}</p><span>{he ? "מהנדס תוכנה. בונה מוצרים. מלמד תכנות." : "Software engineer. Product builder. Programming instructor."}</span></div></div>
      <Link className={styles.aboutLink} href={href("/about", locale)}>{he ? "להכיר אותי" : "Meet the person behind the work"}<Arrow diagonal /></Link>
    </div>

    <div className={styles.stageBottom}>
      <div className={styles.selectorHeading}><p>{he ? "בחרו פרויקט" : "Select a project"}<span aria-hidden="true">↓</span></p><Link href={href("/work", locale)}>{he ? "כל הפרויקטים" : "All work"}<Arrow diagonal /></Link></div>
      <div className={styles.selector} role="group" aria-label={he ? "בחירת פרויקט לתצוגה" : "Project previews"}>
        {EXPERIENCE_PROJECTS.map(slug => {
          const item = experienceProjects[slug];
          return <div key={slug} className={styles.projectOption} data-selected={project === slug} style={{ "--option-accent": item.accent } as CSSProperties}>
            <button onClick={() => select(slug)} aria-pressed={project === slug} aria-label={he ? `תצוגה של ${item.name}` : `Preview ${item.name}`} disabled={!mounted}>
              <span className={styles.optionNumber}>{item.number}</span><span className={styles.optionName} dir="ltr">{item.name}</span><span className={styles.optionCategory}>{t(item.category, locale)}</span>
            </button>
            <Link href={href(`/work/${slug}`, locale)} aria-label={he ? `לפרויקט ${item.name}` : `Read ${item.name} case study`}><Arrow diagonal /></Link>
          </div>;
        })}
      </div>
      <div className={styles.stageFoot}><p>{he ? "מוצרים לאנשים. מערכות לעולם האמיתי." : "Products for people. Systems for the real world."}</p><button type="button" onClick={toggleMotion} aria-pressed={motionOff} disabled={!mounted}>{he ? "תנועה" : "Motion"}<span>{motionOff ? (he ? "כבויה" : "Off") : (he ? "פעילה" : "On")}</span><i data-off={motionOff} aria-hidden="true" /></button></div>
    </div>

    <div className={styles.sceneCaption} aria-hidden="true"><span>{info.number} / 03</span><span>{t(info.category, locale)}</span></div>
    <h1 key={project} className={styles.projectTitle} dir="ltr">{info.name}<span>.</span></h1>

    <div className={styles.world} aria-hidden="true">
      <div className={styles.atmosphere} />
      <div className={styles.fallback} data-hidden={ready}><ProjectArtifact slug={project} locale={locale} size="hero" /></div>
      <div className={styles.canvas} data-visible={ready}>
        {canRender && !unavailable && <SceneBoundary onUnavailable={onUnavailable}><ProjectScene project={project} operated={operated} active={active} reducedMotion={motionOff} rtl={he} onReady={onReady} onUnavailable={onUnavailable} /></SceneBoundary>}
      </div>
      <div className={styles.worldFade} />
    </div>

    <div className={styles.projectInfo}>
      <p className={styles.purpose}>{t(info.purpose, locale)}</p>
      <p className={styles.facts}><span>{t(info.role, locale)}</span><span>{t(info.status, locale)}</span></p>
      <Link className={styles.caseLink} href={href(`/work/${project}`, locale)}>{he ? "לסיפור המלא" : "Explore the project"}<Arrow /></Link>
    </div>

    <div className={styles.interaction}>
      <p className={styles.demoLabel}>{he ? "רעיון המוצר, בתנועה" : "The product idea, in motion"}</p>
      <button type="button" className={styles.operate} onClick={() => setOperated(value => !value)} aria-pressed={operated} aria-describedby="scene-response" disabled={!mounted}>
        <span className={styles.playIcon} aria-hidden="true">{operated ? "↺" : "↗"}</span>{t(operated ? info.reset : info.action, locale)}
      </button>
      <p id="scene-response" className={styles.response} role="status">{t(operated ? info.response : info.description, locale)}</p>
    </div>


  </section>;
}
