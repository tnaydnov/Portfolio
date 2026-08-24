import type { Project } from "@/lib/types";

export const lpr: Project = {
  slug: "license-plate-recognition",
  title: "License Plate Recognition",
  oneLiner: {
    en: "A parking-enforcement prototype designed for continuous video: motion detection, plate detection, OCR and alerting.",
    he: "אב־טיפוס לאכיפת חניה שתוכנן לווידאו רציף: זיהוי תנועה, זיהוי לוחית, OCR והתראות.",
  },
  hook: {
    en: "A continuous computer-vision pipeline is a scheduling problem wearing a machine-learning costume.",
    he: "צינור ראייה ממוחשבת רציף הוא בעיית תזמון שלובשת תחפושת של למידת מכונה.",
  },
  snapshot: {
    problem: {
      en: "A camera never waits for detection, OCR or network work to catch up; slow stages turn useful frames into stale results.",
      he: "מצלמה לא מחכה לזיהוי, OCR או רשת; שלבים איטיים הופכים פריימים שימושיים לתוצאות מאוחרות.",
    },
    move: {
      en: "Order the pipeline by cost, reject empty frames early and decouple the expensive stages with queues.",
      he: "לסדר את הצינור לפי עלות, לדחות פריימים ריקים מוקדם ולנתק את השלבים היקרים בעזרת תורים.",
    },
    contribution: {
      en: "On a five-person team, my repository-visible work includes motion detection, Docker and project structure, and operator-interface work.",
      he: "בצוות של חמישה, העבודה שלי שנראית במאגר כוללת זיהוי תנועה, Docker ומבנה הפרויקט, ועבודה על ממשק המפעיל.",
    },
    proof: {
      en: "The upstream team repository preserves 69 commits and an inspectable multi-service Python architecture.",
      he: "מאגר הצוות המקורי שומר 69 קומיטים וארכיטקטורת Python מרובת שירותים שניתן לבדוק.",
    },
  },
  tier: "system",
  stages: ["frame", "build", "prove"],
  domain: ["applied-ai", "platform"],
  role: { en: "Motion pipeline · Docker/structure · operator UI", he: "צינור תנועה · Docker ומבנה · ממשק מפעיל" },
  team: { en: "Five-person university team", he: "צוות אוניברסיטאי של חמישה" },
  started: "2024-11",
  ended: "2025-07",
  status: "archived",
  statusLabel: { en: "Completed team project", he: "פרויקט צוות שהושלם" },
  statusDetail: {
    en: "Completed university team project; source preserved in the upstream repository.",
    he: "פרויקט צוות אוניברסיטאי שהושלם; קוד המקור נשמר במאגר המקורי.",
  },
  evidenceNote: {
    en: "The upstream history shows five contributors and 15 commits from Tomer's associated account. No deployment or end-to-end accuracy measurement is claimed. Project documentation conflicts on the YOLO version, so this case uses the version-neutral description ‘Ultralytics YOLO-based detection.’",
    he: "ההיסטוריה במאגר המקורי מציגה חמישה תורמים ו־15 קומיטים מהחשבון המקושר לתומר. אין טענה לפריסה או למדידת דיוק מקצה לקצה. תיעוד הפרויקט סותר את עצמו לגבי גרסת YOLO, ולכן המקרה משתמש בתיאור הניטרלי ׳זיהוי מבוסס Ultralytics YOLO׳.",
  },
  metrics: [
    {
      label: { en: "Stages", he: "שלבים" },
      value: { en: "4", he: "4" },
      note: {
        en: "Motion → detect → OCR → alert",
        he: "תנועה ← זיהוי ← OCR ← התראה",
      },
    },
    {
      label: { en: "Mode", he: "מצב" },
      value: { en: "Continuous input", he: "קלט רציף" },
      note: { en: "Asynchronous stages", he: "שלבים אסינכרוניים" },
    },
    {
      label: { en: "Deploy", he: "פריסה" },
      value: { en: "Compose", he: "Compose" },
      note: { en: "Containerised services", he: "שירותים בקונטיינרים" },
    },
  ],
  stack: ["Python", "Ultralytics YOLO", "PaddleOCR", "FastAPI", "Redis", "Docker", "PyQt5"],
  links: { repo: "https://github.com/BGU-LPR-Project/lpr_final_project" },
  visual: "lpr-pipeline",
  sections: [
    {
      stage: "frame",
      heading: {
        en: "The constraint is the frame budget",
        he: "האילוץ הוא תקציב הפריימים",
      },
      body: {
        en: [
          "A component benchmark can answer whether a model can read a plate under known conditions. It does not answer whether the whole chain can keep up with a camera that does not slow down for it.",
          "That reframes the problem. Every stage in the pipeline is a consumer with a fixed time budget, and the design work is deciding what to drop rather than what to compute.",
        ],
        he: [
          "מדד של רכיב יכול לענות אם מודל קורא לוחית בתנאים ידועים. הוא לא עונה אם כל השרשרת עומדת בקצב של מצלמה שלא מאטה בשבילה.",
          "זה ממסגר מחדש את הבעיה. כל שלב בצינור הוא צרכן עם תקציב זמן קבוע, ועבודת התכנון היא להחליט ממה לוותר ולא מה לחשב.",
        ],
      },
    },
    {
      stage: "build",
      heading: {
        en: "Cheap gates before expensive ones",
        he: "שערים זולים לפני יקרים",
      },
      body: {
        en: [
          "The pipeline is ordered by expected cost. Motion detection was placed first to reject unchanged frames before they reached plate detection; only detected plates continued to OCR, the most expensive stage. The repository does not contain a publishable measurement of how many frames each gate rejected.",
          "The team split the stages into services with queues to decouple their rates. In that design, a slow OCR pass can create backpressure instead of forcing every stage into one frame budget, and each component can be tuned or replaced independently. End-to-end throughput was not measured for this case study.",
          "The project used a desktop operator client so alerts lived in a dedicated surface rather than a disposable browser tab.",
        ],
        he: [
          "הצינור מסודר לפי עלות צפויה. זיהוי תנועה הוצב ראשון כדי לדחות פריימים שלא השתנו לפני זיהוי לוחית; רק לוחיות שזוהו המשיכו ל־OCR, השלב היקר ביותר. במאגר אין מדידה שניתן לפרסם לגבי שיעור הפריימים שכל שער דחה.",
          "הצוות פיצל את השלבים לשירותים עם תורים כדי לנתק בין הקצבים שלהם. בעיצוב הזה, מעבר OCR איטי יכול ליצור לחץ אחורי במקום לכפות תקציב פריים אחד על כל השלבים, וכל רכיב ניתן לכוונון או החלפה בנפרד. תפוקה מקצה לקצה לא נמדדה עבור מקרה הבוחן הזה.",
          "הפרויקט השתמש בלקוח מפעיל שולחני כדי שההתראות יחיו במשטח ייעודי ולא בטאב דפדפן שניתן לסגור.",
        ],
      },
    },
    {
      stage: "prove",
      heading: {
        en: "Measured on the pipeline, not the model",
        he: "נמדד על הצינור, לא על המודל",
      },
      body: {
        en: [
          "Model accuracy in isolation is the wrong measure. What matters is end-to-end: of the vehicles that actually entered the frame, how many produced a correct plate in time to be useful.",
          "That result can diverge sharply from a model benchmark. The project did not preserve a publishable end-to-end measurement, so this remains the evaluation I would add rather than an outcome I claim.",
        ],
        he: [
          "דיוק המודל בפני עצמו הוא המדד הלא נכון. מה שחשוב הוא מקצה לקצה: מתוך כלי הרכב שבאמת נכנסו לפריים, כמה הפיקו לוחית נכונה בזמן שהיה בו שימוש.",
          "התוצאה הזו יכולה לסטות משמעותית ממדד של מודל. הפרויקט לא שמר מדידה מקצה לקצה שניתן לפרסם, ולכן זו הבדיקה שהייתי מוסיף ולא תוצאה שאני טוען לה.",
        ],
      },
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2025",
      title: {
        en: "Separate services with a queue, not a single process.",
        he: "שירותים נפרדים עם תור, לא תהליך יחיד.",
      },
      why: {
        en: "The stages have very different costs and rates. Coupling them in one process means the slowest stage sets the frame rate for everything and there is no way to absorb a burst.",
        he: "לשלבים יש עלויות וקצבים שונים מאוד. צימוד שלהם בתהליך אחד אומר שהשלב האיטי ביותר קובע את קצב הפריימים לכולם ואין דרך לספוג פרץ.",
      },
      tradeoff: {
        en: "Operational complexity, serialisation overhead between stages, and a much harder debugging story than a single script.",
        he: "מורכבות תפעולית, תקורת סריאליזציה בין השלבים, וסיפור דיבוג קשה בהרבה מסקריפט יחיד.",
      },
      revisit: {
        en: "If deployed to a single edge device where the network hop costs more than the decoupling is worth.",
        he: "אם נפרס למכשיר קצה יחיד שבו קפיצת הרשת עולה יותר משהניתוק שווה.",
      },
    },
    {
      id: "D-02",
      date: "2025",
      title: {
        en: "Motion gate before detection.",
        he: "שער תנועה לפני זיהוי.",
      },
      why: {
        en: "A fixed parking camera shows an empty scene most of the time. Running detection on every frame spends the entire compute budget confirming nothing happened.",
        he: "מצלמת חניה קבועה מראה סצנה ריקה רוב הזמן. הרצת זיהוי על כל פריים מוציאה את כל תקציב החישוב על אישור שכלום לא קרה.",
      },
      tradeoff: {
        en: "A slow-moving or partially occluded vehicle can be missed at the gate, and that failure is invisible downstream — nothing logs a frame that was never considered.",
        he: "רכב שנע לאט או מוסתר חלקית עלול להתפספס בשער, והכשל הזה בלתי נראה בהמשך — שום דבר לא מתעד פריים שמעולם לא נשקל.",
      },
      revisit: {
        en: "If false negatives at the gate turn out to be a real source of missed vehicles rather than a theoretical one.",
        he: "אם שליליים־שגויים בשער יתבררו כמקור אמיתי לרכבים שהוחמצו ולא כתיאורטי.",
      },
    },
  ],
  rebuild: {
    en: [
      "Instrument the motion gate's rejections. It is the one stage whose failures leave no trace, which makes it the least trustworthy part of the system.",
      "Measure end-to-end capture rate from the beginning instead of component accuracy. It is the only number that describes whether the system works.",
    ],
    he: [
      "למדוד את הדחיות של שער התנועה. זה השלב היחיד שהכשלים שלו לא משאירים עקבות, מה שהופך אותו לחלק הכי פחות אמין במערכת.",
      "למדוד שיעור לכידה מקצה לקצה מההתחלה במקום דיוק רכיבים. זה המספר היחיד שמתאר אם המערכת עובדת.",
    ],
  },
};

export const tradingSystem: Project = {
  slug: "trading-system",
  title: "Trading System",
  oneLiner: {
    en: "A multi-store e-commerce platform: store management, roles and permissions, carts, purchases and supplier integration.",
    he: "פלטפורמת מסחר רב־חנויות: ניהול חנויות, תפקידים והרשאות, עגלות, רכישות ואינטגרציית ספקים.",
  },
  hook: {
    en: "A large team project where the hard part was the specification, not the code.",
    he: "פרויקט צוות גדול שבו החלק הקשה היה האפיון, לא הקוד.",
  },
  snapshot: {
    problem: {
      en: "In a multi-store marketplace, ambiguous authority rules multiply across appointments, permissions, purchases and integration work.",
      he: "בשוק רב־חנויות, כל עמימות בכללי סמכות מתרבה דרך מינויים, הרשאות, רכישות ואינטגרציה.",
    },
    move: {
      en: "Treat roles, permissions and state transitions as the load-bearing domain before building the storefront around them.",
      he: "להתייחס לתפקידים, הרשאות ומעברי מצב כדומיין נושא העומס לפני שבונים סביבם את חזית המסחר.",
    },
    contribution: {
      en: "I contributed to a large university team implementation and learned to resolve specification ambiguity before it becomes an integration defect.",
      he: "תרמתי למימוש בצוות אוניברסיטאי גדול ולמדתי לפתור עמימות באפיון לפני שהיא הופכת לתקלה באינטגרציה.",
    },
    proof: {
      en: "An archived Java/Spring repository with the marketplace domain, security layers and a substantial automated-test structure.",
      he: "מאגר Java/Spring בארכיון עם דומיין המסחר, שכבות האבטחה ומבנה משמעותי של בדיקות אוטומטיות.",
    },
  },
  tier: "system",
  stages: ["frame", "plan", "build"],
  domain: ["platform"],
  role: { en: "Contributor on a large team", he: "תורם בצוות גדול" },
  team: { en: "University team project", he: "פרויקט צוות אוניברסיטאי" },
  started: "2024-05",
  ended: "2024-07",
  status: "archived",
  statusLabel: { en: "Completed team project", he: "פרויקט צוות שהושלם" },
  statusDetail: {
    en: "Completed university team project; public repository is archived.",
    he: "פרויקט צוות אוניברסיטאי שהושלם; המאגר הציבורי נמצא בארכיון.",
  },
  evidenceNote: {
    en: "The source verifies a substantial Java/Spring system and test structure. Its short public mirror history does not provide a reliable subsystem-by-subsystem contribution ledger, so the case keeps Tomer's role at team-contributor level.",
    he: "קוד המקור מאמת מערכת Java/Spring משמעותית ומבנה בדיקות. ההיסטוריה הציבורית הקצרה של המאגר אינה מספקת פנקס תרומות אמין לפי תתי־מערכות, ולכן המקרה משאיר את התפקיד של תומר ברמת תורם בצוות.",
  },
  metrics: [
    {
      label: { en: "Scope", he: "היקף" },
      value: { en: "Multi-store", he: "רב־חנויות" },
      note: { en: "Roles, carts, suppliers", he: "תפקידים, עגלות, ספקים" },
    },
    {
      label: { en: "Mode", he: "מצב" },
      value: { en: "Team", he: "צוות" },
      note: { en: "Not solo work", he: "לא עבודה עצמאית" },
    },
  ],
  stack: ["Java 17", "Spring Boot", "Spring Security", "Vaadin", "JPA", "MySQL", "WebSockets", "JUnit", "Mockito"],
  links: { repo: "https://github.com/tnaydnov/Trading_System" },
  visual: "trading-model",
  sections: [
    {
      stage: "frame",
      heading: {
        en: "Requirements as the actual deliverable",
        he: "הדרישות כתוצר האמיתי",
      },
      body: {
        en: [
          "This was a large team build against a long formal specification, and the lesson it taught was not about e-commerce. It was that on a team of that size, ambiguity in a requirement does not stay a small problem — every developer resolves it differently and the divergence surfaces at integration, which is the most expensive possible moment to find it.",
          "It is listed here as a team project because it was one. I owned parts of it, not all of it, and claiming otherwise would undermine everything else on this site.",
        ],
        he: [
          "זו הייתה בנייה של צוות גדול מול אפיון פורמלי ארוך, והלקח שהיא לימדה לא היה על מסחר אלקטרוני. הוא היה שבצוות בגודל כזה, עמימות בדרישה לא נשארת בעיה קטנה — כל מפתח פותר אותה אחרת והפער צף באינטגרציה, שהיא הרגע היקר ביותר האפשרי לגלות אותו.",
          "זה מופיע כאן כפרויקט צוות כי זה מה שהוא היה. הייתי אחראי על חלקים ממנו, לא על כולו, וטענה אחרת הייתה מערערת כל דבר אחר באתר הזה.",
        ],
      },
    },
    {
      stage: "plan",
      heading: {
        en: "Permissions are the real domain model",
        he: "ההרשאות הן מודל הדומיין האמיתי",
      },
      body: {
        en: [
          "The genuinely difficult part of a multi-store system is not transactions, it is authority: who may appoint whom, what a store owner can delegate, what happens to permissions granted by someone who is later removed.",
          "Getting that model wrong early is expensive because it is load-bearing for every feature above it.",
        ],
        he: [
          "החלק הקשה באמת במערכת רב־חנויות הוא לא עסקאות, אלא סמכות: מי רשאי למנות את מי, מה בעל חנות יכול להאציל, ומה קורה להרשאות שניתנו על ידי מישהו שהוסר אחר כך.",
          "טעות במודל הזה מוקדם יקרה, כי הוא נושא את כל הפיצ׳רים שמעליו.",
        ],
      },
    },
    {
      stage: "build",
      heading: {
        en: "Layers that hold under a team",
        he: "שכבות שמחזיקות תחת צוות",
      },
      body: {
        en: [
          "Strict separation between the service layer and the domain was what made parallel work possible at all. It is a lesson that transferred directly into how I structured Applytide's backend years later.",
        ],
        he: [
          "הפרדה קפדנית בין שכבת השירות לדומיין היא מה שאפשר עבודה מקבילית בכלל. זה לקח שעבר ישירות לאופן שבו בניתי את השרת של Applytide שנים אחר כך.",
        ],
      },
    },
  ],
  rebuild: {
    en: [
      "Resolve specification ambiguity in writing before implementation starts. Every integration problem on this project traces back to a sentence two people read differently.",
      "Build the permission model first and test it hardest. It was underneath everything else and got the least dedicated attention.",
    ],
    he: [
      "לפתור עמימות באפיון בכתב לפני שהמימוש מתחיל. כל בעיית אינטגרציה בפרויקט הזה מתחקה חזרה למשפט ששני אנשים קראו אחרת.",
      "לבנות את מודל ההרשאות ראשון ולבדוק אותו הכי חזק. הוא היה מתחת לכל השאר וקיבל את תשומת הלב הייעודית הפחותה ביותר.",
    ],
  },
};
