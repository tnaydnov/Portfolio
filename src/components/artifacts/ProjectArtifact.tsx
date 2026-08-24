import type { Locale } from "@/lib/i18n";
import styles from "./project-artifact.module.css";

const ARTIFACT_SLUGS = [
  "arc",
  "applytide",
  "eventa",
  "license-plate-recognition",
  "trading-system",
] as const;

type ArtifactSlug = (typeof ARTIFACT_SLUGS)[number];

type ProjectArtifactProps = {
  slug: string;
  locale: Locale;
  size?: "card" | "hero";
};

const LABELS: Record<ArtifactSlug, Record<Locale, string>> = {
  arc: {
    en: "Arc: scattered teaching documents converge into one structured learning workspace",
    he: "Arc: מסמכי הוראה מפוזרים מתכנסים לסביבת למידה אחת ומסודרת",
  },
  applytide: {
    en: "Applytide: a browser tab leaves the screen and reorganizes a fragmented job search",
    he: "Applytide: לשונית דפדפן יוצאת מהמסך ומארגנת מחדש חיפוש עבודה מפוזר",
  },
  eventa: {
    en: "Eventa: a physical QR card opens a path between people sharing the same event",
    he: "Eventa: כרטיס QR פיזי פותח נתיב בין אנשים שנמצאים באותו אירוע",
  },
  "license-plate-recognition": {
    en: "License plate recognition: gathered data and a camera stream converge into a trained recognition pipeline",
    he: "זיהוי לוחיות רישוי: נתונים שנאספו וזרם מצלמה מתכנסים לצינור זיהוי מאומן",
  },
  "trading-system": {
    en: "Trading system: store actions expose the permissions and state underneath a multi-store marketplace",
    he: "מערכת מסחר: פעולות בחנות חושפות את ההרשאות והמצבים שמתחת לשוק רב־חנויות",
  },
};

const PROVENANCE: Record<ArtifactSlug, Record<Locale, string>> = {
  arc: {
    en: "SOURCE-DERIVED RECONSTRUCTION · FICTIONAL DATA",
    he: "שחזור מבוסס מקור · מידע בדיוני",
  },
  applytide: {
    en: "SOURCE-DERIVED RECONSTRUCTION · FICTIONAL DATA",
    he: "שחזור מבוסס מקור · מידע בדיוני",
  },
  eventa: {
    en: "ILLUSTRATIVE SCENARIO · FICTIONAL PROFILES",
    he: "תרחיש להמחשה · פרופילים בדיוניים",
  },
  "license-plate-recognition": {
    en: "SIMULATED PIPELINE · NO MEASURED CONFIDENCE",
    he: "צינור מדומה · ללא ציון ביטחון מדוד",
  },
  "trading-system": {
    en: "SOURCE-DERIVED SYSTEM STUDY",
    he: "מחקר מערכת מבוסס מקור",
  },
};

function isArtifactSlug(slug: string): slug is ArtifactSlug {
  return (ARTIFACT_SLUGS as readonly string[]).includes(slug);
}

function FrameMarks() {
  return (
    <>
      <span className={`${styles.frameMark} ${styles.frameMarkNorthWest}`} />
      <span className={`${styles.frameMark} ${styles.frameMarkNorthEast}`} />
      <span className={`${styles.frameMark} ${styles.frameMarkSouthWest}`} />
      <span className={`${styles.frameMark} ${styles.frameMarkSouthEast}`} />
    </>
  );
}

function BrowserDots() {
  return (
    <span className={styles.browserDots}>
      <i />
      <i />
      <i />
    </span>
  );
}

function ArcArtifact() {
  return (
    <div className={`${styles.scene} ${styles.arcScene}`}>
      <div className={styles.arcDeskShadow} />
      <div className={styles.arcWindow}>
        <div className={styles.browserBar}>
          <BrowserDots />
          <span className={styles.address}>arc / learning workspace</span>
          <span className={styles.statusLamp} />
        </div>
        <div className={styles.arcInterface}>
          <aside className={styles.arcRail}>
            <span className={styles.arcRailTitle}>CURRICULUM</span>
            {['Python', 'Conditions', 'Loops', 'Functions'].map((item, index) => (
              <span className={styles.arcRailItem} data-active={index === 1} key={item}>
                <i /> {item}
              </span>
            ))}
          </aside>
          <div className={styles.arcCanvas}>
            <span className={styles.arcKicker}>02 / CONDITIONS</span>
            <span className={styles.arcHeading}>One source. Ready to teach.</span>
            <div className={styles.arcLessonRow}>
              <span className={styles.arcLessonNumber}>01</span>
              <span className={styles.arcLessonCopy}>
                <i />
                <i />
              </span>
              <span className={styles.arcLessonTag}>READY</span>
            </div>
            <div className={styles.arcLessonRow}>
              <span className={styles.arcLessonNumber}>02</span>
              <span className={styles.arcLessonCopy}>
                <i />
                <i />
              </span>
              <span className={styles.arcLessonTag}>READY</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.paper} ${styles.arcPaperA}`}>
        <span>lesson_final_3.docx</span>
        <i />
        <i />
        <i />
      </div>
      <div className={`${styles.paper} ${styles.arcPaperB}`}>
        <span>תרגול_תנאים.pdf</span>
        <i />
        <i />
      </div>
      <div className={`${styles.paper} ${styles.arcPaperC}`}>
        <span>new_new_copy.pptx</span>
        <i />
        <i />
        <i />
      </div>

      <svg className={styles.arcPaths} viewBox="0 0 1000 560" focusable="false">
        <path d="M62 132 C214 122 212 246 369 266" />
        <path d="M91 466 C244 441 258 334 369 298" />
        <path d="M936 104 C767 122 801 231 643 259" />
      </svg>
      <span className={styles.arcCursor}>↘</span>
    </div>
  );
}

function ApplytideArtifact() {
  const tabs = ["Role", "Jobs", "Inbox", "Sheet", "Notes", "Role", "Apply"];

  return (
    <div className={`${styles.scene} ${styles.applyScene}`}>
      <div className={styles.monitorGlow} />
      <div className={styles.applyMonitor}>
        <div className={styles.applyBezelTop} />
        <div className={styles.applyScreen}>
          <div className={styles.tabStrip}>
            {tabs.map((tab, index) => (
              <span className={styles.browserTab} data-index={index} key={`${tab}-${index}`}>
                <i /> {tab}
              </span>
            ))}
            <span className={styles.newTab}>+</span>
          </div>
          <div className={styles.applyBrowserBody}>
            <aside>
              <span />
              <span />
              <span />
              <span />
            </aside>
            <div className={styles.applicationBoard}>
              <span className={styles.boardTitle}>APPLICATIONS / TODAY</span>
              <div className={styles.boardColumns}>
                {['FOUND', 'APPLIED', 'FOLLOW-UP'].map((column) => (
                  <div key={column}>
                    <b>{column}</b>
                    <i />
                    <i />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.applyBezelBottom} />
      </div>

      <div className={styles.liftedTab}>
        <span className={styles.liftedTabFace}>
          <i /> Product role — saved
          <b>×</b>
        </span>
        <span className={styles.liftedTabEdge} />
      </div>
      <span className={styles.tabContactShadow} />
      <span className={styles.applyCursor}>↗</span>
      <span className={styles.applyDeskLine} />
    </div>
  );
}

function QrMark() {
  return (
    <svg className={styles.qrMark} viewBox="0 0 29 29" focusable="false">
      <path d="M1 1h9v9H1zM3 3v5h5V3zM19 1h9v9h-9zM21 3v5h5V3zM1 19h9v9H1zM3 21v5h5v-5zM13 2h3v3h-3zM12 7h4v4h-4zM18 12h3v3h-3zM23 12h5v3h-5zM12 13h4v7h-4zM17 17h4v4h-4zM23 17h5v5h-5zM11 23h4v5h-4zM17 23h3v3h-3zM22 24h6v4h-6z" />
    </svg>
  );
}

function EventaArtifact() {
  return (
    <div className={`${styles.scene} ${styles.eventaScene}`}>
      <div className={styles.eventTable}>
        <span className={styles.tableRingA} />
        <span className={styles.tableRingB} />
        <span className={styles.tableRingC} />
        <div className={`${styles.placeCard} ${styles.placeCardA}`}>
          <span>TABLE 04</span>
          <b>NOA</b>
        </div>
        <div className={`${styles.placeCard} ${styles.placeCardB}`}>
          <span>TABLE 09</span>
          <b>AMIT</b>
        </div>
        <div className={styles.qrCard}>
          <QrMark />
          <span>SCAN TO ENTER</span>
          <b>EVENTA / 24</b>
        </div>
        <div className={styles.eventPortal}>
          <span className={styles.portalLeft} />
          <span className={styles.portalRight} />
          <i />
        </div>
        <svg className={styles.eventPath} viewBox="0 0 1000 560" focusable="false">
          <path d="M274 425 C342 324 409 410 488 299 C562 196 647 282 744 155" />
        </svg>
        <span className={`${styles.chair} ${styles.chairA}`} />
        <span className={`${styles.chair} ${styles.chairB}`} />
        <span className={styles.sharedMoment}>one room / a reason to notice</span>
      </div>
    </div>
  );
}

function DetectionCorners() {
  return (
    <>
      <i className={`${styles.detectCorner} ${styles.detectNorthWest}`} />
      <i className={`${styles.detectCorner} ${styles.detectNorthEast}`} />
      <i className={`${styles.detectCorner} ${styles.detectSouthWest}`} />
      <i className={`${styles.detectCorner} ${styles.detectSouthEast}`} />
    </>
  );
}

function LprArtifact() {
  return (
    <div className={`${styles.scene} ${styles.lprScene}`}>
      <div className={styles.cctvFrame}>
        <div className={styles.cctvHeader}>
          <span>GATE 03 / CAMERA 02</span>
          <b>REC</b>
          <time>08:41:22</time>
        </div>
        <div className={styles.roadScene}>
          <span className={styles.roadHorizon} />
          <span className={styles.roadLeft} />
          <span className={styles.roadRight} />
          <span className={styles.roadDashA} />
          <span className={styles.roadDashB} />
          <div className={styles.vehicle}>
            <span className={styles.rearWindow} />
            <span className={styles.tailLightA} />
            <span className={styles.tailLightB} />
            <span className={styles.plate}>TEST · 042</span>
          </div>
          <div className={styles.detectionBox}>
            <DetectionCorners />
            <span>SIM</span>
          </div>
          <span className={styles.scanLine} />
        </div>
      </div>
      <div className={styles.plateReceipt}>
        <span>FRAME 0421</span>
        <strong>TEST · PLATE · 042</strong>
        <i>DATA → TRAIN → DETECT → ANALYSE</i>
      </div>
      <svg className={styles.lprTrace} viewBox="0 0 1000 560" focusable="false">
        <path d="M542 357 C657 358 702 431 814 410" />
      </svg>
    </div>
  );
}

function TradingArtifact() {
  return (
    <div className={`${styles.scene} ${styles.tradingScene}`}>
      <div className={styles.marketLedger}>
        <div className={styles.ledgerHeader}>
          <span>STORE / CONTROL ROOM</span>
          <b>STATE / SYNCED</b>
        </div>
        <div className={styles.ledgerGrid}>
          <div>
            <small>STORE</small>
            <span>04</span>
            <span>09</span>
            <span>12</span>
          </div>
          <div>
            <small>ROLE</small>
            <span>OWNER</span>
            <span>MANAGER</span>
            <span>MEMBER</span>
          </div>
          <div>
            <small>STATE</small>
            <span>OPEN</span>
            <span>CHECKOUT</span>
            <span>DELIVERY</span>
          </div>
        </div>
        <span className={styles.marketRule}>APPOINT → PERMIT → PURCHASE</span>
      </div>
      <div className={`${styles.orderSlip} ${styles.buySlip}`}>
        <span>CART / 0148</span>
        <strong>3 ITEMS</strong>
        <i>checkout pending</i>
      </div>
      <div className={`${styles.orderSlip} ${styles.sellSlip}`}>
        <span>APPOINT / 0149</span>
        <strong>MANAGER</strong>
        <i>permissions 4 / 6</i>
      </div>
      <div className={styles.ruleGate}>
        <span>01</span>
        <span>ROLE</span>
        <i />
        <span>02</span>
        <span>POLICY</span>
        <i />
        <span>03</span>
        <span>ACTION</span>
      </div>
      <svg className={styles.tradeTrace} viewBox="0 0 1000 560" focusable="false">
        <path d="M154 413 C322 446 320 253 490 280 C654 304 646 136 832 166" />
      </svg>
      <span className={styles.tradeToken}>OK</span>
    </div>
  );
}

const SCENES: Record<ArtifactSlug, () => React.ReactNode> = {
  arc: ArcArtifact,
  applytide: ApplytideArtifact,
  eventa: EventaArtifact,
  "license-plate-recognition": LprArtifact,
  "trading-system": TradingArtifact,
};

export function ProjectArtifact({ slug, locale, size = "card" }: ProjectArtifactProps) {
  if (!isArtifactSlug(slug)) return null;

  const Scene = SCENES[slug];

  return (
    <div
      className={`${styles.artifact} ${styles[slug.replaceAll("-", "_")]}`}
      data-size={size}
      role="img"
      aria-label={`${LABELS[slug][locale]}. ${PROVENANCE[slug][locale]}`}
      dir="ltr"
    >
      <div className={styles.room} aria-hidden="true">
        <span className={styles.roomLight} />
        <span className={styles.floorPlane} />
        <FrameMarks />
        <div className={styles.metadata}>
          <span>{slug.replaceAll("-", " / ").toUpperCase()}</span>
          <span>{PROVENANCE[slug][locale]}</span>
        </div>
        <Scene />
      </div>
    </div>
  );
}

export type { ProjectArtifactProps };
