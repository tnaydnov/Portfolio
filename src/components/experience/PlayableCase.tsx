"use client";

import { useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import styles from "./playable-case.module.css";

type DemoSlug = "arc" | "applytide" | "eventa";
type Copy = { en: string; he: string };

const COMMON = {
  label: { en: "Illustrative demo", he: "הדגמה להמחשה" },
  note: { en: "Fictional sample data. This example is separate from the original product.", he: "נתונים בדיוניים לדוגמה. ההמחשה נפרדת מהמוצר המקורי." },
  reset: { en: "Reset example", he: "איפוס ההדגמה" },
  sample: { en: "Sample", he: "דוגמה" },
} satisfies Record<string, Copy>;

const PROJECT = {
  arc: {
    title: "Arc",
    status: { en: "Co-developed · Portal online", he: "פיתוח משותף · הפורטל זמין" },
    accent: "var(--arc-accent, #9de5ce)",
  },
  applytide: {
    title: "Applytide",
    status: { en: "Solo project · Source archived", he: "פיתוח עצמאי · הקוד בארכיון" },
    accent: "var(--applytide-accent, #ff9c85)",
  },
  eventa: {
    title: "Eventa",
    status: { en: "Solo project · Discontinued", he: "פיתוח עצמאי · הופסק" },
    accent: "var(--eventa-accent, #cab6ff)",
  },
} as const;

function Arrow({ back = false }: { back?: boolean }) {
  return <svg className={back ? styles.resetIcon : styles.arrowIcon} width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    {back ? <path d="M5 5.5a6 6 0 1 1-1 7M5 2v4.5H.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M3.5 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
  </svg>;
}

function Check() {
  return <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function DocumentMark({ className }: { className?: string }) {
  return <svg className={className} width="30" height="36" viewBox="0 0 30 36" fill="none" aria-hidden="true"><path d="M6 2h12l7 7v25H6V2Z" stroke="currentColor" strokeWidth="1.2" /><path d="M18 2v8h7M11 17h9m-9 5h9m-9 5h5" stroke="currentColor" strokeWidth="1.2" /></svg>;
}

function Frame({ slug, locale, compact, children }: { slug: DemoSlug; locale: Locale; compact?: boolean; children: ReactNode }) {
  const project = PROJECT[slug];
  return (
    <div
      role="region"
      aria-label={locale === "he" ? `הדגמה אינטראקטיבית: ${project.title}` : `${project.title} interactive example`}
      className={styles.demo}
      style={{ "--demo-accent": project.accent } as CSSProperties}
      data-project={slug}
      data-compact={compact || undefined}
      data-testid="playable-case"
      dir={locale === "he" ? "rtl" : "ltr"}
    >
      <div className={styles.demoHeader}>
        <div className={styles.demoIdentity}><span className={styles.liveDot} aria-hidden="true" /><span>{COMMON.label[locale]}</span></div>
        <span className={styles.lifecycle}>{project.status[locale]}</span>
      </div>
      <p className={styles.demoNote}>{COMMON.note[locale]}</p>
      {children}
    </div>
  );
}

function StageHeading({ step, children, complete = false }: { step: string; children: ReactNode; complete?: boolean }) {
  return <div className={styles.stageHeading}><span className={styles.stageIndex} aria-hidden="true">{complete ? <Check /> : step}</span><span>{children}</span></div>;
}

const ARC = {
  title: { en: "A lesson keeps its history.", he: "השיעור שומר על ההקשר." },
  intro: { en: "Release it to a class. Bring what you learn back to the source.", he: "משחררים לכיתה. מחזירים את מה שלומדים אל המקור." },
  source: { en: "Reusable source", he: "תוכן לשימוש חוזר" },
  lesson: { en: "Loops & patterns", he: "לולאות ודפוסים" },
  lessonMeta: { en: "Sample lesson · 2 activities", he: "שיעור לדוגמה · 2 פעילויות" },
  sourceVersion: { en: "Source version 1", he: "גרסת מקור 1" },
  sourceKept: { en: "Source kept for reuse", he: "המקור נשמר לשימוש חוזר" },
  classroom: { en: "Classroom release", he: "שחרור לכיתה" },
  emptyClass: { en: "Ready when the class is.", he: "מוכן כשהכיתה מוכנה." },
  emptyClassBody: { en: "A release gives this class its own lesson context.", he: "השחרור יוצר לשיעור הקשר משלו בכיתה הזו." },
  className: { en: "Sample classroom", he: "כיתה לדוגמה" },
  releasedFrom: { en: "Released from source version 1", he: "שוחרר מגרסת מקור 1" },
  classActivity: { en: "Activity 1 · Trace the loop", he: "פעילות 1 · עוקבים אחרי הלולאה" },
  activityBody: { en: "What does the loop print at each step?", he: "מה הלולאה מדפיסה בכל צעד?" },
  review: { en: "Feedback → next revision", he: "משוב ← הגרסה הבאה" },
  emptyReview: { en: "Classroom evidence can shape the next lesson.", he: "מה שקורה בכיתה יכול לעצב את השיעור הבא." },
  feedback: { en: "Add a worked example before independent practice.", he: "להוסיף דוגמה פתורה לפני התרגול העצמאי." },
  feedbackLabel: { en: "Sample instructor feedback", he: "משוב מנחה לדוגמה" },
  revision: { en: "Version 2 · Draft", he: "גרסה 2 · טיוטה" },
  linked: { en: "Linked to this classroom release", he: "מקושר לשחרור הזה לכיתה" },
  release: { en: "Release sample lesson", he: "שחרור שיעור לדוגמה" },
  addFeedback: { en: "Add sample feedback", he: "הוספת משוב לדוגמה" },
  complete: { en: "Loop connected", he: "מעגל הלמידה חובר" },
  initialStatus: { en: "The source is reusable. Release a copy to see the classroom context.", he: "המקור מיועד לשימוש חוזר. שחררו עותק כדי לראות את ההקשר הכיתתי." },
  releaseStatus: { en: "A classroom release now exists. The reusable source remains at version 1.", he: "נוצר שחרור לכיתה. המקור לשימוש חוזר נשאר בגרסה 1." },
  feedbackStatus: { en: "Sample feedback is linked to a version 2 draft. This class still has its version 1 release.", he: "המשוב לדוגמה מקושר לטיוטת גרסה 2. לכיתה הזו נשאר השחרור מגרסה 1." },
} satisfies Record<string, Copy>;

type ClassroomRelease = { id: string; sourceVersion: 1; title: string };
type LessonRevision = { version: 2; releaseId: string; feedback: string };

function ArcExample({ locale }: { locale: Locale }) {
  const [release, setRelease] = useState<ClassroomRelease | null>(null);
  const [revision, setRevision] = useState<LessonRevision | null>(null);
  const primary = useRef<HTMLButtonElement>(null);
  const stateId = useId();
  const action = () => {
    if (!release) setRelease({ id: "sample-classroom-release", sourceVersion: 1, title: "sample-loops" });
    else if (!revision) setRevision({ version: 2, releaseId: release.id, feedback: "worked-example" });
  };
  const reset = () => {
    setRelease(null);
    setRevision(null);
    requestAnimationFrame(() => primary.current?.focus());
  };

  return <>
    <div className={styles.heading}><h3>{ARC.title[locale]}</h3><p>{ARC.intro[locale]}</p></div>
    <div className={styles.arcWorkspace} id={stateId}>
      <div className={styles.arcSource} data-testid="arc-source">
        <StageHeading step="01">{ARC.source[locale]}</StageHeading>
        <div className={styles.lessonCard}>
          <div className={styles.cardTopline}><span>{ARC.lessonMeta[locale]}</span><DocumentMark /></div>
          <h4>{ARC.lesson[locale]}</h4>
          <pre className={styles.codeSample} dir="ltr"><code><span>for</span> step <span>in</span> range(3):{"\n"}    print(step)</code></pre>
          <div className={styles.sourceFooter}><span>{ARC.sourceVersion[locale]}</span><span className={styles.version}>v1</span></div>
        </div>
        <div className={styles.sourceState} data-active={!!release}><span aria-hidden="true">{release ? "↗" : "↻"}</span>{release ? ARC.sourceKept[locale] : ARC.source[locale]}</div>
      </div>
      <div className={styles.arcClassroom} data-active={!!release}>
        <StageHeading step="02" complete={!!release}>{ARC.classroom[locale]}</StageHeading>
        {release ? <div className={`${styles.classroomCard} ${styles.enter}`} data-testid="arc-release">
          <div className={styles.cardTopline}><span className={styles.accentText}>{ARC.className[locale]}</span><span className={styles.version}>v{release.sourceVersion}</span></div>
          <h4>{ARC.lesson[locale]}</h4>
          <p className={styles.linkedNote}>{ARC.releasedFrom[locale]}</p>
          <div className={styles.activity}><span className={styles.activityNumber} aria-hidden="true">01</span><div><strong>{ARC.classActivity[locale]}</strong><p>{ARC.activityBody[locale]}</p></div></div>
        </div> : <div className={styles.emptyClass}><div className={styles.emptyOrbit} aria-hidden="true"><DocumentMark /></div><h4>{ARC.emptyClass[locale]}</h4><p>{ARC.emptyClassBody[locale]}</p></div>}
      </div>
      <div className={styles.arcReview} data-active={!!revision}>
        <StageHeading step="03" complete={!!revision}>{ARC.review[locale]}</StageHeading>
        {revision ? <div className={`${styles.reviewContent} ${styles.enter}`} data-testid="arc-revision">
          <div><span className={styles.microLabel}>{ARC.feedbackLabel[locale]}</span><p>“{ARC.feedback[locale]}”</p></div>
          <div className={styles.revisionLink}><span className={styles.revisionPill}>{ARC.revision[locale]}</span><span>{ARC.linked[locale]}</span></div>
        </div> : <p className={styles.emptyReview}>{ARC.emptyReview[locale]}</p>}
      </div>
    </div>
    <div className={styles.actionBar}>
      <button ref={primary} type="button" className={styles.primaryButton} onClick={action} disabled={!!revision} aria-controls={stateId}>{revision ? <Check /> : <Arrow />}{revision ? ARC.complete[locale] : release ? ARC.addFeedback[locale] : ARC.release[locale]}</button>
      <button type="button" className={styles.resetButton} onClick={reset} disabled={!release}><Arrow back />{COMMON.reset[locale]}</button>
    </div>
    <p className={styles.stateNote} role="status" aria-atomic="true">{revision ? ARC.feedbackStatus[locale] : release ? ARC.releaseStatus[locale] : ARC.initialStatus[locale]}</p>
  </>;
}

const APPLY = {
  title: { en: "Catch the opportunity first.", he: "קודם כול, שומרים את ההזדמנות." },
  intro: { en: "One posting becomes a record the rest of the process can use.", he: "מודעת משרה הופכת לרשומה שכל המשך התהליך יכול להישען עליה." },
  posting: { en: "Sample opportunity", he: "הזדמנות לדוגמה" },
  job: { en: "Software Engineer", he: "מהנדס/ת תוכנה" },
  company: { en: "Sample Studio", he: "סטודיו לדוגמה" },
  jobType: { en: "Full-time · Hybrid", he: "משרה מלאה · היברידית" },
  description: { en: "Build thoughtful tools with a small product team.", he: "בניית כלים שימושיים בצוות מוצר קטן." },
  sourceLabel: { en: "Posting details", he: "פרטי המשרה" },
  workspace: { en: "Application workspace", he: "סביבת המועמדויות" },
  saved: { en: "Saved", he: "נשמרה" },
  applied: { en: "Applied", he: "הוגשה" },
  interview: { en: "Interview", he: "ריאיון" },
  capture: { en: "Capture sample opportunity", he: "שמירת הזדמנות לדוגמה" },
  captured: { en: "Opportunity captured", he: "ההזדמנות נשמרה" },
  empty: { en: "A place for the opportunity.", he: "מקום לשמור בו את ההזדמנות." },
  emptyBody: { en: "Capture the posting to give it a structured history.", he: "שמרו את המודעה כדי ליצור לה היסטוריה מסודרת." },
  record: { en: "Captured record", he: "רשומה שנשמרה" },
  history: { en: "Application history", he: "היסטוריית המועמדות" },
  historyAction: { en: "Posting captured into Saved", he: "פרטי המשרה נשמרו בשלב ״נשמרה״" },
  historyContext: { en: "Role, company and source stay together.", he: "התפקיד, החברה והמקור נשארים יחד." },
  initialStatus: { en: "The posting is still outside the pipeline. Capture it to create the first record.", he: "המודעה עדיין מחוץ לתהליך. שמרו אותה כדי ליצור רשומה ראשונה." },
  capturedStatus: { en: "One structured record now holds the opportunity and its history. Nothing was sent to an employer.", he: "רשומה אחת מחזיקה עכשיו את ההזדמנות ואת ההיסטוריה שלה. דבר לא נשלח למעסיק." },
  emptyHistory: { en: "History begins with capture.", he: "ההיסטוריה מתחילה בשמירת המשרה." },
} satisfies Record<string, Copy>;

type CapturedOpportunity = { id: string; role: "software-engineer"; company: "sample-studio"; stage: "saved"; history: readonly ["captured"] };

function ApplytideExample({ locale }: { locale: Locale }) {
  const [record, setRecord] = useState<CapturedOpportunity | null>(null);
  const primary = useRef<HTMLButtonElement>(null);
  const workspaceId = useId();
  const capture = () => setRecord((previous) => previous ?? { id: "sample-opportunity", role: "software-engineer", company: "sample-studio", stage: "saved", history: ["captured"] });
  const reset = () => { setRecord(null); requestAnimationFrame(() => primary.current?.focus()); };

  return <>
    <div className={styles.heading}><h3>{APPLY.title[locale]}</h3><p>{APPLY.intro[locale]}</p></div>
    <div className={styles.captureWorkspace} id={workspaceId}>
      <div className={styles.posting} data-captured={!!record} data-testid="applytide-posting">
        <StageHeading step="01">{APPLY.posting[locale]}</StageHeading>
        <div className={styles.companyMark} aria-hidden="true"><span /><span /><span /></div>
        <p className={styles.companyName}>{APPLY.company[locale]}</p>
        <h4>{APPLY.job[locale]}</h4>
        <p className={styles.jobType}>{APPLY.jobType[locale]}</p>
        <p className={styles.jobDescription}>{APPLY.description[locale]}</p>
        <div className={styles.postingFooter}><span>{APPLY.sourceLabel[locale]}</span>{record ? <span className={styles.captureCheck}><Check />{APPLY.saved[locale]}</span> : <span className={styles.sourceGlyph} aria-hidden="true">↗</span>}</div>
      </div>
      <div className={styles.pipeline}>
        <StageHeading step="02" complete={!!record}>{APPLY.workspace[locale]}</StageHeading>
        <div className={styles.pipelineStages} aria-label={locale === "he" ? "שלבי המועמדות" : "Application stages"}>
          <span data-active={!!record}>{APPLY.saved[locale]} <span>{record ? 1 : 0}</span></span><span>{APPLY.applied[locale]} <span>0</span></span><span>{APPLY.interview[locale]} <span>0</span></span>
        </div>
        <div className={styles.recordArea}>
          {record ? <div className={`${styles.capturedRecord} ${styles.enter}`} data-testid="applytide-record">
            <div className={styles.cardTopline}><span>{APPLY.record[locale]}</span><span className={styles.savedPill}>{APPLY.saved[locale]}</span></div>
            <h4>{APPLY.job[locale]}</h4><p>{APPLY.company[locale]}</p>
            <div className={styles.recordSource}><span aria-hidden="true">↖</span>{APPLY.posting[locale]}</div>
          </div> : <div className={styles.emptyRecord}><span className={styles.recordOutline} aria-hidden="true"><i /><i /><i /></span><h4>{APPLY.empty[locale]}</h4><p>{APPLY.emptyBody[locale]}</p></div>}
        </div>
        <div className={styles.history}>
          <span className={styles.microLabel}>{APPLY.history[locale]}</span>
          {record ? <div className={styles.historyEntry} data-testid="applytide-history"><span className={styles.historyDot} aria-hidden="true" /><div><strong>{APPLY.historyAction[locale]}</strong><span>{APPLY.historyContext[locale]}</span></div></div> : <p>{APPLY.emptyHistory[locale]}</p>}
        </div>
      </div>
    </div>
    <div className={styles.actionBar}>
      <button ref={primary} type="button" className={styles.primaryButton} onClick={capture} disabled={!!record} aria-controls={workspaceId}>{record ? <Check /> : <Arrow />}{record ? APPLY.captured[locale] : APPLY.capture[locale]}</button>
      <button type="button" className={styles.resetButton} onClick={reset} disabled={!record}><Arrow back />{COMMON.reset[locale]}</button>
    </div>
    <p className={styles.stateNote} role="status" aria-atomic="true">{record ? APPLY.capturedStatus[locale] : APPLY.initialStatus[locale]}</p>
  </>;
}

const EVENT = {
  title: { en: "Start with a shared room.", he: "מתחילים מהחדר המשותף." },
  intro: { en: "A short path from event entry to a relevant introduction.", he: "מסלול קצר מכניסה לאירוע ועד התחלה של היכרות." },
  event: { en: "Sample celebration", he: "אירוע לדוגמה" },
  eventScope: { en: "Only inside this sample event", he: "רק בתוך האירוע לדוגמה" },
  open: { en: "Open sample event", he: "כניסה לאירוע לדוגמה" },
  preview: { en: "Preview an introduction", he: "תצוגה מקדימה להיכרות" },
  previewed: { en: "Introduction previewed", he: "תצוגת ההיכרות נפתחה" },
  guests: { en: "Sample guests", he: "אורחים לדוגמה" },
  eventEntry: { en: "Event entry", he: "כניסה לאירוע" },
  profile: { en: "A little shared context", he: "קצת הקשר משותף" },
  previewLabel: { en: "Introduction preview · Nothing is sent", he: "תצוגה מקדימה להיכרות · דבר לא נשלח" },
  welcome: { en: "The event is the starting point.", he: "האירוע הוא נקודת ההתחלה." },
  welcomeBody: { en: "Open the example to explore three fictional profiles in one event.", he: "פתחו את ההדגמה כדי להכיר שלושה פרופילים בדיוניים באירוע אחד." },
  initialStatus: { en: "One sample event. Three fictional guests. No account or personal information is needed.", he: "אירוע אחד לדוגמה. שלושה אורחים בדיוניים. אין צורך בחשבון או בפרטים אישיים." },
  enteredStatus: { en: "The sample event is open. Select a guest to see their profile.", he: "האירוע לדוגמה פתוח. בחרו אורח או אורחת כדי לראות את הפרופיל." },
  previewStatus: { en: "A local introduction preview is shown. No message or connection request was sent.", he: "מוצגת תצוגה מקדימה להיכרות. לא נשלחה הודעה או בקשת קשר." },
} satisfies Record<string, Copy>;

const GUESTS = [
  { id: "noa", initial: { en: "N", he: "נ" }, name: { en: "Noa", he: "נועה" }, interest: { en: "Photography & city walks", he: "צילום ושיטוטים בעיר" }, context: { en: "A friend of the hosts. Usually the one taking the photos.", he: "חברה של המארחים. בדרך כלל זו שמצלמת את כולם." }, color: "#cab6ff" },
  { id: "daniel", initial: { en: "D", he: "ד" }, name: { en: "Daniel", he: "דניאל" }, interest: { en: "Live music & cooking", he: "הופעות חיות ובישול" }, context: { en: "Knows the hosts through work. Always has a concert recommendation.", he: "מכיר את המארחים מהעבודה. תמיד יש לו המלצה על הופעה." }, color: "#f2c6a4" },
  { id: "maya", initial: { en: "M", he: "מ" }, name: { en: "Maya", he: "מאיה" }, interest: { en: "Hiking & good coffee", he: "טיולים וקפה טוב" }, context: { en: "A longtime friend of the hosts. Happiest on a trail.", he: "חברה ותיקה של המארחים. הכי שמחה בשבילי הטיול." }, color: "#acd4bd" },
] as const;

function EventaExample({ locale }: { locale: Locale }) {
  const [eventId, setEventId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>(GUESTS[0].id);
  const [introduction, setIntroduction] = useState<{ eventId: string; guestId: string } | null>(null);
  const primary = useRef<HTMLButtonElement>(null);
  const workspaceId = useId();
  const guest = GUESTS.find((item) => item.id === selectedId) ?? GUESTS[0];
  const previewVisible = introduction?.eventId === eventId && introduction?.guestId === guest.id;
  const action = () => {
    if (!eventId) setEventId("sample-celebration");
    else setIntroduction({ eventId, guestId: guest.id });
  };
  const selectGuest = (id: string) => { setSelectedId(id); setIntroduction(null); };
  const reset = () => { setEventId(null); setSelectedId(GUESTS[0].id); setIntroduction(null); requestAnimationFrame(() => primary.current?.focus()); };
  const selectedStatus = locale === "he" ? `הפרופיל של ${guest.name.he} מוצג בתוך האירוע לדוגמה.` : `${guest.name.en}'s profile is shown inside the sample event.`;

  return <>
    <div className={styles.heading}><h3>{EVENT.title[locale]}</h3><p>{EVENT.intro[locale]}</p></div>
    <div className={styles.eventWorkspace} id={workspaceId}>
      <div className={styles.eventRail}>
        <div className={styles.eventTicket}>
          <div className={styles.eventSymbol} aria-hidden="true"><span /><span /></div>
          <span className={styles.microLabel}>{COMMON.sample[locale]}</span>
          <h4>{EVENT.event[locale]}</h4>
          <p><span className={styles.scopeDot} aria-hidden="true" />{EVENT.eventScope[locale]}</p>
        </div>
        {eventId ? <ul className={styles.guestList} aria-label={EVENT.guests[locale]}>
          {GUESTS.map((item) => <li key={item.id}><button type="button" className={styles.guestButton} aria-pressed={guest.id === item.id} aria-label={locale === "he" ? `הפרופיל של ${item.name.he}` : `View ${item.name.en}'s profile`} onClick={() => selectGuest(item.id)}><span className={styles.smallAvatar} style={{ "--guest-color": item.color } as CSSProperties} aria-hidden="true">{item.initial[locale]}</span><span><strong>{item.name[locale]}</strong><span>{item.interest[locale]}</span></span><span className={styles.guestArrow} aria-hidden="true">↗</span></button></li>)}
        </ul> : <div className={styles.guestPreview} aria-hidden="true">{GUESTS.map((item) => <span key={item.id} style={{ "--guest-color": item.color } as CSSProperties}>{item.initial[locale]}</span>)}</div>}
      </div>
      <div className={styles.profileArea}>
        {eventId ? <div key={guest.id} className={`${styles.profileCard} ${styles.enter}`} data-testid="eventa-profile">
          <div className={styles.profileTopline}><span className={styles.microLabel}>{COMMON.sample[locale]}</span><span>{EVENT.profile[locale]}</span></div>
          <div className={styles.profileIdentity}><span className={styles.largeAvatar} style={{ "--guest-color": guest.color } as CSSProperties} aria-hidden="true">{guest.initial[locale]}</span><div><h4>{guest.name[locale]}</h4><p>{guest.interest[locale]}</p></div></div>
          <p className={styles.profileContext}>{guest.context[locale]}</p>
          <div className={styles.eventBoundary}><span aria-hidden="true">↳</span>{EVENT.event[locale]}</div>
          {previewVisible && <div className={`${styles.introduction} ${styles.enter}`} data-testid="eventa-introduction"><span className={styles.microLabel}>{EVENT.previewLabel[locale]}</span><p>{locale === "he" ? `היי ${guest.name.he}, איך הכרת את המארחים?` : `Hi ${guest.name.en} — how do you know the hosts?`}</p></div>}
        </div> : <div className={styles.eventWelcome}><span className={styles.entryMark} aria-hidden="true">↗</span><span className={styles.microLabel}>{EVENT.eventEntry[locale]}</span><h4>{EVENT.welcome[locale]}</h4><p>{EVENT.welcomeBody[locale]}</p></div>}
      </div>
    </div>
    <div className={styles.actionBar}>
      <button ref={primary} type="button" className={styles.primaryButton} onClick={action} disabled={previewVisible} aria-controls={workspaceId}>{previewVisible ? <Check /> : <Arrow />}{!eventId ? EVENT.open[locale] : previewVisible ? EVENT.previewed[locale] : EVENT.preview[locale]}</button>
      <button type="button" className={styles.resetButton} onClick={reset} disabled={!eventId}><Arrow back />{COMMON.reset[locale]}</button>
    </div>
    <p className={styles.stateNote} role="status" aria-atomic="true">{previewVisible ? EVENT.previewStatus[locale] : eventId ? selectedStatus : EVENT.initialStatus[locale]}</p>
  </>;
}

export function PlayableCase({ slug, locale, compact = false }: { slug: string; locale: Locale; compact?: boolean }) {
  if (slug !== "arc" && slug !== "applytide" && slug !== "eventa") return null;
  return <Frame key={slug} slug={slug} locale={locale} compact={compact}>
    {slug === "arc" ? <ArcExample locale={locale} /> : slug === "applytide" ? <ApplytideExample locale={locale} /> : <EventaExample locale={locale} />}
  </Frame>;
}

export default PlayableCase;
