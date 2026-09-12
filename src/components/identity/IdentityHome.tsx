"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/lib/site";
import { IdentityFallback } from "./IdentityFallback";
import styles from "./identity-home.module.css";

const IdentityScene = dynamic(() => import("./IdentityScene"), { ssr: false });

class SceneBoundary extends Component<
  { children: ReactNode; onUnavailable: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onUnavailable();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}

export function IdentityHome() {
  const [canRender, setCanRender] = useState(false);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const sceneHost = useRef<HTMLDivElement>(null);
  const failed = useRef(false);

  const onReady = useCallback(() => {
    if (!failed.current) setReady(true);
  }, []);

  const onUnavailable = useCallback(() => {
    failed.current = true;
    setReady(false);
    setUnavailable(true);
  }, []);

  useEffect(() => {
    try {
      const probe = document.createElement("canvas").getContext("webgl2");
      if (probe) {
        probe.getExtension("WEBGL_lose_context")?.loseContext();
        setCanRender(true);
      } else {
        onUnavailable();
      }
    } catch {
      onUnavailable();
    }

    // Context loss does not bubble; capture it at the stable scene wrapper.
    const host = sceneHost.current;
    host?.addEventListener("webglcontextlost", onUnavailable, true);
    return () => host?.removeEventListener("webglcontextlost", onUnavailable, true);
  }, [onUnavailable]);

  return (
    <>
      <section className={styles.hero} data-testid="identity-hero" data-ready={ready} aria-labelledby="identity-title">
        <p className={styles.eyebrow}>
          <span>Software engineer</span><i aria-hidden="true" />
          <span>Product builder</span><i aria-hidden="true" />
          <span>Programming instructor</span>
        </p>

        <div className={styles.nameFrame}>
          <h1 id="identity-title" className={styles.name}>
            <span className="sr-only">Tomer Naydnov</span>
            <span className={styles.fallback} data-hidden={ready} aria-hidden="true">
              <IdentityFallback />
            </span>
          </h1>
          <div ref={sceneHost} className={styles.canvas} data-visible={ready} aria-hidden="true">
            {canRender && !unavailable ? (
              <SceneBoundary onUnavailable={onUnavailable}>
                <IdentityScene onReady={onReady} onUnavailable={onUnavailable} />
              </SceneBoundary>
            ) : null}
          </div>
        </div>

        <div className={styles.intro}>
          <p className={styles.description}>
            I turn messy problems into useful software—and make complex ideas easier to understand.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/work">Explore my work<Arrow /></Link>
            <Link className={styles.aboutLink} href="/about">A little about me<Arrow diagonal /></Link>
          </div>
        </div>
      </section>

      <section className={`shell ${styles.perspective}`} aria-labelledby="perspective-title">
        <div className={styles.sectionTop}>
          <p className={styles.sectionLabel}>The person behind the pieces</p>
          <p className={styles.current}><span aria-hidden="true" />Currently co-developing Arc and teaching programming at Nitzanim.</p>
        </div>
        <div className={styles.perspectiveCopy}>
          <h2 id="perspective-title">Good software starts<br />with understanding people.</h2>
          <p>Technical support taught me to look past the first symptom. Teaching taught me to make the complicated clear. Engineering gives me the tools to build something useful from both.</p>
          <Link href="/about">My background &amp; approach<Arrow diagonal /></Link>
        </div>
        <div className={styles.workLinks}>
          <p>A few things I&apos;ve put into the world</p>
          <Link href="/work/arc"><strong>Arc</strong><span>Connecting the learning loop</span><Arrow diagonal /></Link>
          <Link href="/work/applytide"><strong>Applytide</strong><span>Bringing order to the job search</span><Arrow diagonal /></Link>
          <Link href="/work/eventa"><strong>Eventa</strong><span>Making a first connection easier</span><Arrow diagonal /></Link>
          <a className={styles.cvLink} href={site.cv} download={site.cvFileName}>The short version: my CV <span aria-hidden="true">↓</span></a>
        </div>
      </section>
    </>
  );
}
