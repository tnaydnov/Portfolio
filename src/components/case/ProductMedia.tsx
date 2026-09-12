"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { TourFilm, TourScreen } from "@/content/tours/types";
import styles from "./product-tour.module.css";

function ExpandIcon() {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M12 3h5v5M17 3l-6 6M8 17H3v-5m0 5 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function PlayIcon() {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m7 4 9 6-9 6V4Z" fill="currentColor"/></svg>;
}

export function ScreenshotGallery({ screens, project }: { screens: TourScreen[]; project: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLAnchorElement | null>(null);
  const screen = selected === null ? null : screens[selected];
  const isOpen = selected !== null;

  useEffect(() => {
    if (!isOpen) return;
    const modal = dialog.current;
    if (!modal) return;
    modal.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      modal.close();
    };
  }, [isOpen]);

  const close = () => {
    dialog.current?.close();
    setSelected(null);
    setZoomed(false);
    lastTrigger.current?.focus();
  };
  const move = (delta: number) => {
    setSelected(value => value === null ? null : (value + delta + screens.length) % screens.length);
    setZoomed(false);
  };

  return <>
    <div className={styles.screenGrid} data-testid="product-screens">
      {screens.map((item, index) => <figure className={styles.screenCard} key={item.id} id={`screen-${item.id}`} data-mobile={item.mobile || undefined}>
        <a className={styles.screenLink} href={item.src} aria-label={`Expand: ${item.title}`} onClick={event => {
          event.preventDefault(); lastTrigger.current = event.currentTarget; setZoomed(false); setSelected(index);
        }}>
          <div className={styles.screenCanvas}>
            <Image src={item.src} alt={`${project}: ${item.title}`} width={item.width} height={item.height} sizes="(max-width: 700px) 92vw, (max-width: 1200px) 44vw, 560px" quality={90}/>
          </div>
          <span className={styles.expand}><ExpandIcon/><span>View screen</span></span>
        </a>
        <figcaption>
          <div className={styles.screenMeta}><span>{String(index + 1).padStart(2, "0")} / {item.portal}</span><span aria-hidden="true">↗</span></div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </figcaption>
      </figure>)}
    </div>
    {screen && <dialog ref={dialog} className={styles.lightbox} aria-labelledby="screen-viewer-title" onCancel={event => {event.preventDefault(); close();}} onClick={event => {if (event.target === event.currentTarget) close();}} onKeyDown={event => {
      if (event.target instanceof HTMLButtonElement || event.target === event.currentTarget) {
        if (event.key === "ArrowRight") {event.preventDefault(); move(1);}
        if (event.key === "ArrowLeft") {event.preventDefault(); move(-1);}
      }
    }}>
      <div className={styles.viewerHeader}>
        <div><span>{project} / {screen.portal}</span><h3 id="screen-viewer-title">{screen.title}</h3></div>
        <div className={styles.viewerActions}>
          <button type="button" onClick={() => setZoomed(value => !value)} aria-pressed={zoomed}>{zoomed ? "Fit screen" : "Zoom in"}</button>
          <button type="button" onClick={close} className={styles.closeViewer} aria-label="Close screen viewer">×</button>
        </div>
      </div>
      <div className={styles.viewerImage} data-zoomed={zoomed} tabIndex={0} aria-label={zoomed ? "Full-size screenshot. Scroll to inspect details." : "Screenshot preview"}>
        {/* Full source pixels are intentional in the inspection view. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={screen.src} alt={`${project}: ${screen.title}`} width={screen.width} height={screen.height}/>
      </div>
      <div className={styles.viewerFooter}>
        <button type="button" onClick={() => move(-1)} aria-label="Previous screen">←</button>
        <p><span>{(selected ?? 0) + 1} / {screens.length}</span>{screen.description}</p>
        <button type="button" onClick={() => move(1)} aria-label="Next screen">→</button>
      </div>
    </dialog>}
  </>;
}

export function TourVideo({ film }: { film: TourFilm }) {
  const portrait = film.height > film.width;
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const pendingSeek = useRef<number | null>(null);
  const focusOnStart = useRef(false);
  const begin = (at = 0, focus = false) => {
    focusOnStart.current = focus;
    pendingSeek.current = at;
    if (!started) setStarted(true);
    else if (video.current) {
      video.current.currentTime = at;
      void video.current.play().catch(() => {});
    }
  };
  useEffect(() => {
    if (!started || !video.current) return;
    if (focusOnStart.current) {
      video.current.focus({ preventScroll: true });
      focusOnStart.current = false;
    }
    void video.current.play().catch(() => {});
  }, [started]);

  useEffect(() => {
    const pauseOtherFilm = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== film.id) video.current?.pause();
    };
    window.addEventListener("portfolio:play-film", pauseOtherFilm);
    return () => window.removeEventListener("portfolio:play-film", pauseOtherFilm);
  }, [film.id]);

  return <figure className={styles.film} data-testid="product-film">
    <div className={styles.filmStage} data-portrait={portrait || undefined} style={{aspectRatio: portrait ? undefined : `${film.width} / ${film.height}`}}>
      <div className={styles.filmViewport} style={portrait ? {aspectRatio: `${film.width} / ${film.height}`, maxWidth: `min(100%, 410px, calc(min(700px, 82svh) * ${film.width / film.height}))`} : undefined}>
      {!started ? <button type="button" className={styles.filmPoster} onClick={() => begin(0, true)} aria-label={`Play: ${film.title}`}>
        <Image src={film.poster} alt="" width={film.width} height={film.height} sizes="(max-width: 700px) 92vw, 1120px" quality={90}/>
        <span className={styles.playLabel}><span className={styles.playIcon}><PlayIcon/></span><span><strong>Watch the walkthrough</strong><span>{Math.round(film.duration)} seconds · Original app</span></span></span>
      </button> : <video ref={video} controls playsInline tabIndex={0} preload="metadata" poster={film.poster} aria-label={film.title} onError={() => setFailed(true)} onPlay={() => window.dispatchEvent(new CustomEvent("portfolio:play-film", { detail: film.id }))} onLoadedMetadata={() => {
        if (video.current && pendingSeek.current !== null) {video.current.currentTime = pendingSeek.current;pendingSeek.current = null;}
      }} onTimeUpdate={() => {
        const current = video.current?.currentTime ?? 0;
        setActiveChapter(Math.max(0, film.chapters.findLastIndex(chapter => current >= chapter.at)));
      }}>
        <source src={film.src} type={film.src.endsWith(".mp4") ? "video/mp4" : "video/webm"}/>
        {film.captions && <track kind="captions" src={film.captions} srcLang="en" label="English"/>}
        <a href={film.src}>Download the walkthrough</a>
      </video>}
      </div>
    </div>
    <figcaption className={styles.filmCaption}>
      <div><span className={styles.micro}>IN MOTION</span><h3>{film.title}</h3><p>{film.description}</p></div>
      <a href={film.src} download className={styles.downloadFilm}>Download video <span aria-hidden="true">↓</span></a>
    </figcaption>
    {failed && <p className={styles.mediaError} role="status">The video could not load. You can still explore the screenshots below or download the recording.</p>}
    {film.chapters.length > 1 && <div className={styles.filmChapters} aria-label="Video chapters">{film.chapters.map((chapter, index) => <button key={chapter.title} type="button" onClick={() => begin(chapter.at)} aria-pressed={started && activeChapter === index}>
      <span>{String(Math.floor(chapter.at / 60)).padStart(2,"0")}:{String(Math.floor(chapter.at % 60)).padStart(2,"0")}</span>{chapter.title}
    </button>)}</div>}
    {film.chapters.some(chapter => chapter.description) && <details className={styles.transcript}><summary>Read the walkthrough</summary><ol>{film.chapters.map(chapter => <li key={chapter.title}><strong>{chapter.title}</strong><p>{chapter.description}</p></li>)}</ol></details>}
    <noscript><p className={styles.mediaError}><a href={film.src}>Watch the recorded walkthrough</a></p></noscript>
  </figure>;
}
