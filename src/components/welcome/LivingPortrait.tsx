"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "./living-portrait.module.css";

const portrait = "/images/tomer-welcome.webp";
const sizes = "(max-width: 600px) 360px, (max-width: 900px) 480px, (max-width: 1100px) 560px, 750px";
const waveFrames = [0, -8, 6, -6, 3, 0].map((degrees) => ({ transform: `rotate(${degrees}deg)` }));

export function LivingPortrait() {
  const matteId = `portrait-matte-${useId().replaceAll(":", "")}`;
  const stage = useRef<HTMLDivElement>(null);
  const hand = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const greeted = useRef(false);
  const inView = useRef(true);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [waving, setWaving] = useState(false);
  const [greeting, setGreeting] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduced(preference.matches);
    const syncVisibility = () => setVisible(inView.current && !document.hidden);
    syncMotion();
    syncVisibility();
    preference.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      syncVisibility();
    }, { threshold: .15 });
    if (stage.current) observer.observe(stage.current);
    return () => {
      preference.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
      observer.disconnect();
      animation.current?.cancel();
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  const moving = loaded && !failed && !reduced && !paused && visible;

  useEffect(() => {
    const element = stage.current;
    if (!element || !moving) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    function draw() {
      x += (targetX - x) * .09;
      y += (targetY - y) * .09;
      element!.style.setProperty("--look-x", x.toFixed(3));
      element!.style.setProperty("--look-y", y.toFixed(3));
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .003) frame = requestAnimationFrame(draw);
      else frame = 0;
    }
    function start() { if (!frame) frame = requestAnimationFrame(draw); }
    function follow(event: PointerEvent) {
      if (!finePointer.matches || event.pointerType === "touch") return;
      const rect = element!.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - .5) * 2));
      targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - .5) * 2));
      start();
    }
    function reset() { targetX = 0; targetY = 0; start(); }
    element.addEventListener("pointermove", follow, { passive: true });
    element.addEventListener("pointerleave", reset);
    finePointer.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", follow);
      element.removeEventListener("pointerleave", reset);
      finePointer.removeEventListener("change", reset);
      element.style.removeProperty("--look-x");
      element.style.removeProperty("--look-y");
    };
  }, [moving]);

  const animateWave = useCallback(() => {
    if (!hand.current) return;
    animation.current?.cancel();
    setWaving(true);
    const next = hand.current.animate(waveFrames, { duration: 1900, easing: "ease-in-out" });
    animation.current = next;
    next.onfinish = () => setWaving(false);
  }, []);

  useEffect(() => {
    if (!moving) {
      animation.current?.cancel();
      setWaving(false);
    }
  }, [moving]);

  function wave() {
    if (timeout.current) clearTimeout(timeout.current);
    setGreeting(true);
    timeout.current = setTimeout(() => setGreeting(false), 3600);
    if (moving) animateWave();
  }

  useEffect(() => {
    if (!moving || greeted.current) return;
    // Start only once the portrait is decoded and in view; content never waits.
    const timer = setTimeout(() => {
      greeted.current = true;
      animateWave();
    }, 500);
    return () => clearTimeout(timer);
  }, [moving, animateWave]);

  return (
    <div className={styles.studio} ref={stage} data-testid="living-portrait" data-moving={moving} data-loaded={loaded}>
      <svg className={styles.filters} width="0" height="0" aria-hidden="true">
        <defs><filter id={matteId} colorInterpolationFilters="sRGB">
          {/* Key the white studio backdrop at render time. Dark clothing and
              warm skin stay opaque instead of picking up the background tint. */}
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 -14 0 13.7" result="keyed" />
          <feComposite in="keyed" in2="SourceGraphic" operator="in" />
        </filter></defs>
      </svg>
      <div className={styles.scene}>
      <div className={styles.arch} aria-hidden="true"><div className={styles.windowBar}><i /><i /><i /><span>tomer / in his element</span></div><span className={styles.halo} /></div>
      <div className={styles.orbit} aria-hidden="true" />
      <div className={styles.hello} aria-hidden="true"><span>&lt;hello /&gt;</span><svg viewBox="0 0 60 45" fill="none"><path d="M5 4c25-4 44 8 42 28m-9-5 9 9 7-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
      <div className={styles.portraitWindow}>
        <div className={styles.person} style={{ filter: `url(#${matteId})` }}>
          <div className={styles.body}>
            <Image src={portrait} width={1024} height={1536} sizes={sizes} priority alt="Tomer Naydnov smiling and raising a hand in welcome" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
          </div>
          {!failed && <>
            <div className={styles.wrist} aria-hidden="true"><Image src={portrait} width={1024} height={1536} sizes={sizes} alt="" /></div>
            <div ref={hand} className={styles.hand} aria-hidden="true"><Image src={portrait} width={1024} height={1536} sizes={sizes} alt="" /></div>
            <div className={styles.blink} aria-hidden="true"><Image src="/images/tomer-blink.webp" width={1024} height={1536} sizes={sizes} alt="" loading="eager" /></div>
          </>}
        </div>
      </div>
      <div className={styles.signature} aria-hidden="true"><span className={styles.signatureMark}>&gt;_</span><span>Curious by default.<br /><strong>Human, always.</strong></span></div>
      <div className={styles.coordinate} aria-hidden="true"><span />ideas → things that work</div>
      </div>
      <div className={styles.controls}>
        <p className={styles.greeting} role="status" aria-live="polite">{greeting ? "Hey! Glad you stopped by." : ""}</p>
        {hydrated && !failed && <div className={styles.controlRow}>
          <button type="button" className={styles.waveButton} onClick={wave} disabled={waving}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m8 13-2-5a1.4 1.4 0 0 1 2.6-1L11 12 8.3 5.7a1.4 1.4 0 0 1 2.6-1l2.7 6.4-2-5.2a1.4 1.4 0 0 1 2.6-1l2.8 6.7-.2-2.2c-.2-2 2.4-2.6 2.7-.6l.6 5.2c.4 3.3-1.1 5.2-3.9 6.4-3.4 1.4-5.8.6-8-2l-3.5-4a1.5 1.5 0 0 1 2.1-2.1L10 15M4 3 3 2M20 3l1-1" /></svg>
            {waving ? "Hey there!" : "Wave hello"}
          </button>
          {!reduced && <button type="button" className={styles.motionButton} onClick={() => setPaused((value) => !value)} aria-pressed={paused} aria-label={paused ? "Resume portrait animation" : "Pause portrait animation"} title={paused ? "Resume animation" : "Pause animation"}>
            <svg viewBox="0 0 20 20" aria-hidden="true">{paused ? <path d="m7 4 9 6-9 6Z" fill="currentColor" /> : <path d="M7 5v10m6-10v10" stroke="currentColor" strokeWidth="2" />}</svg>
          </button>}
        </div>}
      </div>
    </div>
  );
}
