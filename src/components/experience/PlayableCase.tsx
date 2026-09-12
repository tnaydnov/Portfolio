"use client";
import { useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./playable-case.module.css";
type DemoSlug = "arc" | "applytide" | "eventa";
const COMMON = {
    label: "Illustrative demo",
    note: "Fictional sample data. This example is separate from the original product.",
    reset: "Reset example",
    sample: "Sample",
} satisfies Record<string, string>;
const PROJECT = {
    arc: {
        title: "Arc",
        status: "Co-developed · Portal online",
        accent: "var(--arc-accent, #9de5ce)",
    },
    applytide: {
        title: "Applytide",
        status: "Solo project · Source archived",
        accent: "var(--applytide-accent, #ff9c85)",
    },
    eventa: {
        title: "Eventa",
        status: "Solo project · Discontinued",
        accent: "var(--eventa-accent, #cab6ff)",
    },
} as const;
function Arrow({ back = false }: {
    back?: boolean;
}) {
    return <svg className={back ? styles.resetIcon : styles.arrowIcon} width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    {back ? <path d="M5 5.5a6 6 0 1 1-1 7M5 2v4.5H.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> : <path d="M3.5 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
  </svg>;
}
function Check() {
    return <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function DocumentMark({ className }: {
    className?: string;
}) {
    return <svg className={className} width="30" height="36" viewBox="0 0 30 36" fill="none" aria-hidden="true"><path d="M6 2h12l7 7v25H6V2Z" stroke="currentColor" strokeWidth="1.2"/><path d="M18 2v8h7M11 17h9m-9 5h9m-9 5h5" stroke="currentColor" strokeWidth="1.2"/></svg>;
}
function Frame({ slug, compact, children }: {
    slug: DemoSlug;
    compact?: boolean;
    children: ReactNode;
}) {
    const project = PROJECT[slug];
    return (<div role="region" aria-label={`${project.title} interactive example`} className={styles.demo} style={{ "--demo-accent": project.accent } as CSSProperties} data-project={slug} data-compact={compact || undefined} data-testid="playable-case" dir={"ltr"}>
      <div className={styles.demoHeader}>
        <div className={styles.demoIdentity}><span className={styles.liveDot} aria-hidden="true"/><span>{COMMON.label}</span></div>
        <span className={styles.lifecycle}>{project.status}</span>
      </div>
      <p className={styles.demoNote}>{COMMON.note}</p>
      {children}
    </div>);
}
function StageHeading({ step, children, complete = false }: {
    step: string;
    children: ReactNode;
    complete?: boolean;
}) {
    return <div className={styles.stageHeading}><span className={styles.stageIndex} aria-hidden="true">{complete ? <Check /> : step}</span><span>{children}</span></div>;
}
const ARC = {
    title: "A lesson keeps its history.",
    intro: "Release it to a class. Bring what you learn back to the source.",
    source: "Reusable source",
    lesson: "Loops & patterns",
    lessonMeta: "Sample lesson · 2 activities",
    sourceVersion: "Source version 1",
    sourceKept: "Source kept for reuse",
    classroom: "Classroom release",
    emptyClass: "Ready when the class is.",
    emptyClassBody: "A release gives this class its own lesson context.",
    className: "Sample classroom",
    releasedFrom: "Released from source version 1",
    classActivity: "Activity 1 · Trace the loop",
    activityBody: "What does the loop print at each step?",
    review: "Feedback → next revision",
    emptyReview: "Classroom evidence can shape the next lesson.",
    feedback: "Add a worked example before independent practice.",
    feedbackLabel: "Sample instructor feedback",
    revision: "Version 2 · Draft",
    linked: "Linked to this classroom release",
    release: "Release sample lesson",
    addFeedback: "Add sample feedback",
    complete: "Loop connected",
    initialStatus: "The source is reusable. Release a copy to see the classroom context.",
    releaseStatus: "A classroom release now exists. The reusable source remains at version 1.",
    feedbackStatus: "Sample feedback is linked to a version 2 draft. This class still has its version 1 release.",
} satisfies Record<string, string>;
type ClassroomRelease = {
    id: string;
    sourceVersion: 1;
    title: string;
};
type LessonRevision = {
    version: 2;
    releaseId: string;
    feedback: string;
};
function ArcExample() {
    const [release, setRelease] = useState<ClassroomRelease | null>(null);
    const [revision, setRevision] = useState<LessonRevision | null>(null);
    const primary = useRef<HTMLButtonElement>(null);
    const stateId = useId();
    const action = () => {
        if (!release)
            setRelease({ id: "sample-classroom-release", sourceVersion: 1, title: "sample-loops" });
        else if (!revision)
            setRevision({ version: 2, releaseId: release.id, feedback: "worked-example" });
    };
    const reset = () => {
        setRelease(null);
        setRevision(null);
        requestAnimationFrame(() => primary.current?.focus());
    };
    return <>
    <div className={styles.heading}><h3>{ARC.title}</h3><p>{ARC.intro}</p></div>
    <div className={styles.arcWorkspace} id={stateId}>
      <div className={styles.arcSource} data-testid="arc-source">
        <StageHeading step="01">{ARC.source}</StageHeading>
        <div className={styles.lessonCard}>
          <div className={styles.cardTopline}><span>{ARC.lessonMeta}</span><DocumentMark /></div>
          <h4>{ARC.lesson}</h4>
          <pre className={styles.codeSample} dir="ltr"><code><span>for</span> step <span>in</span> range(3):{"\n"}    print(step)</code></pre>
          <div className={styles.sourceFooter}><span>{ARC.sourceVersion}</span><span className={styles.version}>v1</span></div>
        </div>
        <div className={styles.sourceState} data-active={!!release}><span aria-hidden="true">{release ? "↗" : "↻"}</span>{release ? ARC.sourceKept : ARC.source}</div>
      </div>
      <div className={styles.arcClassroom} data-active={!!release}>
        <StageHeading step="02" complete={!!release}>{ARC.classroom}</StageHeading>
        {release ? <div className={`${styles.classroomCard} ${styles.enter}`} data-testid="arc-release">
          <div className={styles.cardTopline}><span className={styles.accentText}>{ARC.className}</span><span className={styles.version}>v{release.sourceVersion}</span></div>
          <h4>{ARC.lesson}</h4>
          <p className={styles.linkedNote}>{ARC.releasedFrom}</p>
          <div className={styles.activity}><span className={styles.activityNumber} aria-hidden="true">01</span><div><strong>{ARC.classActivity}</strong><p>{ARC.activityBody}</p></div></div>
        </div> : <div className={styles.emptyClass}><div className={styles.emptyOrbit} aria-hidden="true"><DocumentMark /></div><h4>{ARC.emptyClass}</h4><p>{ARC.emptyClassBody}</p></div>}
      </div>
      <div className={styles.arcReview} data-active={!!revision}>
        <StageHeading step="03" complete={!!revision}>{ARC.review}</StageHeading>
        {revision ? <div className={`${styles.reviewContent} ${styles.enter}`} data-testid="arc-revision">
          <div><span className={styles.microLabel}>{ARC.feedbackLabel}</span><p>“{ARC.feedback}”</p></div>
          <div className={styles.revisionLink}><span className={styles.revisionPill}>{ARC.revision}</span><span>{ARC.linked}</span></div>
        </div> : <p className={styles.emptyReview}>{ARC.emptyReview}</p>}
      </div>
    </div>
    <div className={styles.actionBar}>
      <button ref={primary} type="button" className={styles.primaryButton} onClick={action} disabled={!!revision} aria-controls={stateId}>{revision ? <Check /> : <Arrow />}{revision ? ARC.complete : release ? ARC.addFeedback : ARC.release}</button>
      <button type="button" className={styles.resetButton} onClick={reset} disabled={!release}><Arrow back/>{COMMON.reset}</button>
    </div>
    <p className={styles.stateNote} role="status" aria-atomic="true">{revision ? ARC.feedbackStatus : release ? ARC.releaseStatus : ARC.initialStatus}</p>
  </>;
}
const APPLY = {
    title: "Catch the opportunity first.",
    intro: "One posting becomes a record the rest of the process can use.",
    posting: "Sample opportunity",
    job: "Software Engineer",
    company: "Sample Studio",
    jobType: "Full-time · Hybrid",
    description: "Build thoughtful tools with a small product team.",
    sourceLabel: "Posting details",
    workspace: "Application workspace",
    saved: "Saved",
    applied: "Applied",
    interview: "Interview",
    capture: "Capture sample opportunity",
    captured: "Opportunity captured",
    empty: "A place for the opportunity.",
    emptyBody: "Capture the posting to give it a structured history.",
    record: "Captured record",
    history: "Application history",
    historyAction: "Posting captured into Saved",
    historyContext: "Role, company and source stay together.",
    initialStatus: "The posting is still outside the pipeline. Capture it to create the first record.",
    capturedStatus: "One structured record now holds the opportunity and its history. Nothing was sent to an employer.",
    emptyHistory: "History begins with capture.",
} satisfies Record<string, string>;
type CapturedOpportunity = {
    id: string;
    role: "software-engineer";
    company: "sample-studio";
    stage: "saved";
    history: readonly [
        "captured"
    ];
};
function ApplytideExample() {
    const [record, setRecord] = useState<CapturedOpportunity | null>(null);
    const primary = useRef<HTMLButtonElement>(null);
    const workspaceId = useId();
    const capture = () => setRecord((previous) => previous ?? { id: "sample-opportunity", role: "software-engineer", company: "sample-studio", stage: "saved", history: ["captured"] });
    const reset = () => { setRecord(null); requestAnimationFrame(() => primary.current?.focus()); };
    return <>
    <div className={styles.heading}><h3>{APPLY.title}</h3><p>{APPLY.intro}</p></div>
    <div className={styles.captureWorkspace} id={workspaceId}>
      <div className={styles.posting} data-captured={!!record} data-testid="applytide-posting">
        <StageHeading step="01">{APPLY.posting}</StageHeading>
        <div className={styles.companyMark} aria-hidden="true"><span /><span /><span /></div>
        <p className={styles.companyName}>{APPLY.company}</p>
        <h4>{APPLY.job}</h4>
        <p className={styles.jobType}>{APPLY.jobType}</p>
        <p className={styles.jobDescription}>{APPLY.description}</p>
        <div className={styles.postingFooter}><span>{APPLY.sourceLabel}</span>{record ? <span className={styles.captureCheck}><Check />{APPLY.saved}</span> : <span className={styles.sourceGlyph} aria-hidden="true">↗</span>}</div>
      </div>
      <div className={styles.pipeline}>
        <StageHeading step="02" complete={!!record}>{APPLY.workspace}</StageHeading>
        <div className={styles.pipelineStages} aria-label={"Application stages"}>
          <span data-active={!!record}>{APPLY.saved} <span>{record ? 1 : 0}</span></span><span>{APPLY.applied} <span>0</span></span><span>{APPLY.interview} <span>0</span></span>
        </div>
        <div className={styles.recordArea}>
          {record ? <div className={`${styles.capturedRecord} ${styles.enter}`} data-testid="applytide-record">
            <div className={styles.cardTopline}><span>{APPLY.record}</span><span className={styles.savedPill}>{APPLY.saved}</span></div>
            <h4>{APPLY.job}</h4><p>{APPLY.company}</p>
            <div className={styles.recordSource}><span aria-hidden="true">↖</span>{APPLY.posting}</div>
          </div> : <div className={styles.emptyRecord}><span className={styles.recordOutline} aria-hidden="true"><i /><i /><i /></span><h4>{APPLY.empty}</h4><p>{APPLY.emptyBody}</p></div>}
        </div>
        <div className={styles.history}>
          <span className={styles.microLabel}>{APPLY.history}</span>
          {record ? <div className={styles.historyEntry} data-testid="applytide-history"><span className={styles.historyDot} aria-hidden="true"/><div><strong>{APPLY.historyAction}</strong><span>{APPLY.historyContext}</span></div></div> : <p>{APPLY.emptyHistory}</p>}
        </div>
      </div>
    </div>
    <div className={styles.actionBar}>
      <button ref={primary} type="button" className={styles.primaryButton} onClick={capture} disabled={!!record} aria-controls={workspaceId}>{record ? <Check /> : <Arrow />}{record ? APPLY.captured : APPLY.capture}</button>
      <button type="button" className={styles.resetButton} onClick={reset} disabled={!record}><Arrow back/>{COMMON.reset}</button>
    </div>
    <p className={styles.stateNote} role="status" aria-atomic="true">{record ? APPLY.capturedStatus : APPLY.initialStatus}</p>
  </>;
}
const EVENT = {
    title: "Start with a shared room.",
    intro: "A short path from event entry to a relevant introduction.",
    event: "Sample celebration",
    eventScope: "Only inside this sample event",
    open: "Open sample event",
    preview: "Preview an introduction",
    previewed: "Introduction previewed",
    guests: "Sample guests",
    eventEntry: "Event entry",
    profile: "A little shared context",
    previewLabel: "Introduction preview · Nothing is sent",
    welcome: "The event is the starting point.",
    welcomeBody: "Open the example to explore three fictional profiles in one event.",
    initialStatus: "One sample event. Three fictional guests. No account or personal information is needed.",
    enteredStatus: "The sample event is open. Select a guest to see their profile.",
    previewStatus: "A local introduction preview is shown. No message or connection request was sent.",
} satisfies Record<string, string>;
const GUESTS = [
    { id: "noa", initial: "N", name: "Noa", interest: "Photography & city walks", context: "A friend of the hosts. Usually the one taking the photos.", color: "#cab6ff" },
    { id: "daniel", initial: "D", name: "Daniel", interest: "Live music & cooking", context: "Knows the hosts through work. Always has a concert recommendation.", color: "#f2c6a4" },
    { id: "maya", initial: "M", name: "Maya", interest: "Hiking & good coffee", context: "A longtime friend of the hosts. Happiest on a trail.", color: "#acd4bd" },
] as const;
function EventaExample() {
    const [eventId, setEventId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string>(GUESTS[0].id);
    const [introduction, setIntroduction] = useState<{
        eventId: string;
        guestId: string;
    } | null>(null);
    const primary = useRef<HTMLButtonElement>(null);
    const workspaceId = useId();
    const guest = GUESTS.find((item) => item.id === selectedId) ?? GUESTS[0];
    const previewVisible = introduction?.eventId === eventId && introduction?.guestId === guest.id;
    const action = () => {
        if (!eventId)
            setEventId("sample-celebration");
        else
            setIntroduction({ eventId, guestId: guest.id });
    };
    const selectGuest = (id: string) => { setSelectedId(id); setIntroduction(null); };
    const reset = () => { setEventId(null); setSelectedId(GUESTS[0].id); setIntroduction(null); requestAnimationFrame(() => primary.current?.focus()); };
    const selectedStatus = `${guest.name}'s profile is shown inside the sample event.`;
    return <>
    <div className={styles.heading}><h3>{EVENT.title}</h3><p>{EVENT.intro}</p></div>
    <div className={styles.eventWorkspace} id={workspaceId}>
      <div className={styles.eventRail}>
        <div className={styles.eventTicket}>
          <div className={styles.eventSymbol} aria-hidden="true"><span /><span /></div>
          <span className={styles.microLabel}>{COMMON.sample}</span>
          <h4>{EVENT.event}</h4>
          <p><span className={styles.scopeDot} aria-hidden="true"/>{EVENT.eventScope}</p>
        </div>
        {eventId ? <ul className={styles.guestList} aria-label={EVENT.guests}>
          {GUESTS.map((item) => <li key={item.id}><button type="button" className={styles.guestButton} aria-pressed={guest.id === item.id} aria-label={`View ${item.name}'s profile`} onClick={() => selectGuest(item.id)}><span className={styles.smallAvatar} style={{ "--guest-color": item.color } as CSSProperties} aria-hidden="true">{item.initial}</span><span><strong>{item.name}</strong><span>{item.interest}</span></span><span className={styles.guestArrow} aria-hidden="true">↗</span></button></li>)}
        </ul> : <div className={styles.guestPreview} aria-hidden="true">{GUESTS.map((item) => <span key={item.id} style={{ "--guest-color": item.color } as CSSProperties}>{item.initial}</span>)}</div>}
      </div>
      <div className={styles.profileArea}>
        {eventId ? <div key={guest.id} className={`${styles.profileCard} ${styles.enter}`} data-testid="eventa-profile">
          <div className={styles.profileTopline}><span className={styles.microLabel}>{COMMON.sample}</span><span>{EVENT.profile}</span></div>
          <div className={styles.profileIdentity}><span className={styles.largeAvatar} style={{ "--guest-color": guest.color } as CSSProperties} aria-hidden="true">{guest.initial}</span><div><h4>{guest.name}</h4><p>{guest.interest}</p></div></div>
          <p className={styles.profileContext}>{guest.context}</p>
          <div className={styles.eventBoundary}><span aria-hidden="true">↳</span>{EVENT.event}</div>
          {previewVisible && <div className={`${styles.introduction} ${styles.enter}`} data-testid="eventa-introduction"><span className={styles.microLabel}>{EVENT.previewLabel}</span><p>{`Hi ${guest.name} — how do you know the hosts?`}</p></div>}
        </div> : <div className={styles.eventWelcome}><span className={styles.entryMark} aria-hidden="true">↗</span><span className={styles.microLabel}>{EVENT.eventEntry}</span><h4>{EVENT.welcome}</h4><p>{EVENT.welcomeBody}</p></div>}
      </div>
    </div>
    <div className={styles.actionBar}>
      <button ref={primary} type="button" className={styles.primaryButton} onClick={action} disabled={previewVisible} aria-controls={workspaceId}>{previewVisible ? <Check /> : <Arrow />}{!eventId ? EVENT.open : previewVisible ? EVENT.previewed : EVENT.preview}</button>
      <button type="button" className={styles.resetButton} onClick={reset} disabled={!eventId}><Arrow back/>{COMMON.reset}</button>
    </div>
    <p className={styles.stateNote} role="status" aria-atomic="true">{previewVisible ? EVENT.previewStatus : eventId ? selectedStatus : EVENT.initialStatus}</p>
  </>;
}
export function PlayableCase({ slug, compact = false }: {
    slug: string;
    compact?: boolean;
}) {
    if (slug !== "arc" && slug !== "applytide" && slug !== "eventa")
        return null;
    return <Frame key={slug} slug={slug} compact={compact}>
    {slug === "arc" ? <ArcExample /> : slug === "applytide" ? <ApplytideExample /> : <EventaExample />}
  </Frame>;
}
export default PlayableCase;
