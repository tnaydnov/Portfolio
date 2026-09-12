"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { site } from "@/lib/site";
import { playgroundObjects, type PlaygroundObject, type PlaygroundState } from "./playground";
import { PlaygroundFallback } from "./PlaygroundFallback";
import styles from "./playground-home.module.css";

const PlaygroundScene = dynamic(() => import("./PlaygroundScene"), { ssr: false });
const initialState: PlaygroundState = { engineering: false, teaching: false, runs: 0 };

class SceneBoundary extends Component<{ children: ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} /></svg>;
}

export function PlaygroundHome() {
  const [state, setState] = useState<PlaygroundState>(initialState);
  const [selected, setSelected] = useState<PlaygroundObject | null>(null);
  const [turn, setTurn] = useState(0);
  const [reset, setReset] = useState(0);
  const [active, setActive] = useState(false);
  const [motionOff, setMotionOff] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [dragging, setDragging] = useState(false);
  const section = useRef<HTMLElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; start: number; moved: boolean } | null>(null);
  const engineering = useRef<HTMLButtonElement>(null);
  const product = useRef<HTMLButtonElement>(null);
  const teaching = useRef<HTMLButtonElement>(null);
  const anchors = useMemo(() => ({ engineering, product, teaching }), []);
  const onReady = useCallback(() => setReady(true), []);
  const onUnavailable = useCallback(() => {
    setUnavailable(true); setReady(false);
    Object.values(anchors).forEach(ref => { if (ref.current) { ref.current.style.transform = ""; ref.current.style.left = ""; ref.current.style.top = ""; } });
  }, [anchors]);

  useEffect(() => {
    setMounted(true);
    try {
      const probe = document.createElement("canvas").getContext("webgl2");
      if (probe) { probe.getExtension("WEBGL_lose_context")?.loseContext(); setCanRender(true); }
      else setUnavailable(true);
    } catch { setUnavailable(true); }
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const readPreference = () => { try { setMotionOff(preference.matches || localStorage.getItem("portfolio-motion") === "off"); } catch { setMotionOff(preference.matches); } };
    readPreference(); preference.addEventListener("change", readPreference);
    let inView = true;
    const update = () => setActive(inView && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); }, { threshold: .08 });
    if (section.current) observer.observe(section.current);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); preference.removeEventListener("change", readPreference); };
  }, []);

  const interact = useCallback((object: PlaygroundObject) => {
    setSelected(object);
    setState(previous => object === "product" ? { ...previous, runs: previous.runs + 1 } : { ...previous, [object]: !previous[object] });
  }, []);
  function resetPlayground() { setState(initialState); setSelected(null); setTurn(0); setReset(previous => previous + 1); }
  function toggleMotion() {
    setMotionOff(previous => { try { localStorage.setItem("portfolio-motion", previous ? "on" : "off"); } catch { /* Works for this visit even without storage. */ } return !previous; });
  }
  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button,a") || event.button !== 0 || !ready) return;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, start: turn, moved: false };
  }
  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current; if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x; const dy = event.clientY - gesture.y;
    if (!gesture.moved && (Math.abs(dx) < 7 || Math.abs(dy) > Math.abs(dx))) return;
    if (!gesture.moved) { gesture.moved = true; setDragging(true); event.currentTarget.setPointerCapture(event.pointerId); }
    if (event.cancelable) event.preventDefault();
    setTurn(Math.max(-.46, Math.min(.46, gesture.start + dx * .003)));
  }
  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.id !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    drag.current = null; setDragging(false);
  }
  const note = selected ? playgroundObjects[selected] : null;

  return <>
    <section ref={section} className={styles.hero} data-ready={ready} data-motion={motionOff ? "off" : "on"} aria-label="Meet Tomer Naydnov">
      <div className={styles.intro}>
        <p className={styles.eyebrow}><span aria-hidden="true" /> Software engineer · Product builder · Programming instructor</p>
        <h1>Tomer{" "}<br />Naydnov<span>.</span></h1>
        <p className={styles.lead}>A curious mind.<br /><span>A hands-on builder.</span></p>
        <p className={styles.description}>I turn messy problems into useful software—and make complex ideas easier to understand.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/work">Explore my work<Arrow /></Link><Link className={styles.aboutLink} href="/about">A little about me<Arrow diagonal /></Link></div>
        <p className={styles.current}><span aria-hidden="true" />Currently co-developing Arc and teaching programming at Nitzanim.</p>
      </div>
      <div className={styles.playground} data-testid="playground" data-dragging={dragging} data-turn={turn.toFixed(3)} data-loop={state.runs}
        onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={endDrag} onPointerCancel={endDrag}
        onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); setTurn(previous => Math.max(-.46, Math.min(.46, previous + (event.key === "ArrowRight" ? .1 : -.1)))); } }}
        tabIndex={mounted && ready ? 0 : -1} role="group" aria-label="Interactive playground. Drag sideways or use the left and right arrow keys to turn the view.">
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.fallback} data-hidden={ready} aria-hidden="true"><PlaygroundFallback engineering={state.engineering} teaching={state.teaching} /></div>
        <div className={styles.canvas} data-visible={ready} aria-hidden="true">
          {canRender && !unavailable && <SceneBoundary onUnavailable={onUnavailable}><PlaygroundScene state={state} turn={turn} reset={reset} active={active} reducedMotion={motionOff} anchors={anchors} onReady={onReady} onUnavailable={onUnavailable} onInteract={interact} /></SceneBoundary>}
        </div>
        <div className={styles.vignette} aria-hidden="true" />
        {(Object.keys(playgroundObjects) as PlaygroundObject[]).map(key => {
          const item = playgroundObjects[key];
          return <button key={key} ref={anchors[key]} type="button" className={`${styles.hotspot} ${styles[key]}`} onClick={() => interact(key)} disabled={!mounted}
            aria-label={`${item.title}: ${item.action}`} aria-pressed={key === "product" ? undefined : state[key]} aria-describedby="playground-description" style={{ "--object-color": item.color } as CSSProperties}>
            <i aria-hidden="true">{key === "engineering" ? "⌘" : key === "product" ? "↻" : "✳"}</i><span><strong>{item.title}</strong><span>{item.action}<b aria-hidden="true">↗</b></span></span>
          </button>;
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">{note ? `${note.heading} ${note.body}` : "The playground is ready to explore."}</p>
      <div className={styles.playBar}>
        <div className={styles.playHint}><span aria-hidden="true">↔</span><p id="playground-description"><strong>{note ? note.heading : "A little room for curiosity."}</strong><span>{ready ? "Drag to turn. Tap an object. See what happens." : "Explore the ideas behind the objects."}</span></p></div>
        <div className={styles.playTools}><button type="button" onClick={resetPlayground} disabled={!mounted}>Reset playground<span aria-hidden="true">↺</span></button><button type="button" onClick={toggleMotion} aria-pressed={motionOff} disabled={!mounted}>Motion <span>{motionOff ? "off" : "on"}</span><i data-off={motionOff} aria-hidden="true" /></button></div>
      </div>
    </section>
      {note && <aside className={`shell ${styles.insight}`} style={{ "--object-color": note.color } as CSSProperties}>
        <div><p>{note.title}</p><button type="button" aria-label="Close object note" onClick={() => setSelected(null)}>×</button></div>
        <h2>{note.heading}</h2><p>{note.body}</p><Link href={note.link}>{note.linkLabel}<Arrow diagonal /></Link>
      </aside>}
    <section className={`shell ${styles.perspective}`} aria-labelledby="perspective-title">
      <p className={styles.sectionLabel}>The person behind the pieces</p>
      <div><h2 id="perspective-title">Good software starts<br />with understanding people.</h2><p>Technical support taught me to look past the first symptom. Teaching taught me to make the complicated clear. Engineering gives me the tools to build something useful from both.</p><Link href="/about">My background & approach<Arrow diagonal /></Link></div>
      <div className={styles.workLinks}><span>A few things I&apos;ve put into the world</span><Link href="/work/arc"><strong>Arc</strong><span>Connecting the learning loop</span><Arrow diagonal /></Link><Link href="/work/applytide"><strong>Applytide</strong><span>Bringing order to the job search</span><Arrow diagonal /></Link><Link href="/work/eventa"><strong>Eventa</strong><span>Making a first connection easier</span><Arrow diagonal /></Link><a href={site.cv} download={site.cvFileName}>The short version: my CV <span aria-hidden="true">↓</span></a></div>
    </section>
  </>;
}
