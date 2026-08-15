import type { Project } from "@/lib/types";

export const arc: Project = {
  slug: "arc",
  title: "Arc",
  oneLiner: {
    en: "An internal learning platform for a national programming education organisation.",
    he: "פלטפורמת למידה פנימית לארגון חינוך תכנות ארצי.",
  },
  hook: {
    en: "Six instructors were solving the same problem six different ways. I built the seventh one — once.",
    he: "שישה מנחים פתרו את אותה בעיה בשש דרכים שונות. בניתי את השביעית — פעם אחת.",
  },
  tier: "flagship",
  stages: ["signal", "frame", "plan", "build", "prove", "field"],
  domain: ["product", "education", "platform"],
  role: {
    en: "Founder · Product & delivery · Build",
    he: "מייסד · מוצר ואספקה · בנייה",
  },
  team: {
    en: "Built with instructors and program coordinators at Nitzanim",
    he: "נבנה יחד עם מנחים ורכזי תוכניות בניצנים",
  },
  started: "2023-01",
  status: "internal",
  metrics: [
    {
      label: { en: "Students reached", he: "תלמידים" },
      value: { en: "650+", he: "‎650+" },
      note: { en: "Across cohorts taught", he: "לאורך המחזורים שלימדתי" },
    },
    {
      label: { en: "Programs using it", he: "תוכניות שמשתמשות" },
      value: { en: "Large-scale", he: "רחבות היקף" },
      note: { en: "Organisation-wide", he: "ברמת הארגון" },
    },
    {
      label: { en: "Run time", he: "זמן פעילות" },
      value: { en: "3 yrs", he: "3 שנים" },
      note: { en: "Still in use", he: "עדיין בשימוש" },
    },
  ],
  stack: [
    "Product discovery",
    "Requirements",
    "Gantt planning",
    "Curriculum systems",
    "Workflow QA",
  ],
  sections: [
    {
      stage: "signal",
      heading: {
        en: "Nobody asked for a platform",
        he: "אף אחד לא ביקש פלטפורמה",
      },
      body: {
        en: [
          "I was hired to teach Python, not to build software. The signal did not arrive as a request — it arrived as a pattern I could not stop noticing.",
          "Every instructor in the program was maintaining their own version of the same material. One kept exercises in a personal Drive folder. Another rebuilt slides each cohort because finding last year's was slower than starting over. A third had a genuinely excellent set of worked examples that nobody else knew existed. When a new instructor joined, their first two weeks were archaeology.",
          "The cost was invisible because it was distributed. No single person was losing enough time to escalate it, so nobody did. That is the shape of most real problems: not a fire, but a tax.",
          "I had assumed the fix was a shared folder. That assumption was wrong, and finding out why it was wrong is what turned this into a product rather than a cleanup task. Shared folders had been tried. They decayed within a cohort, because nothing in a folder tells you which version is current, who owns it, or whether it survived contact with a classroom.",
        ],
        he: [
          "נשכרתי ללמד פייתון, לא לבנות תוכנה. האיתות לא הגיע כבקשה — הוא הגיע כדפוס שלא הצלחתי להפסיק לשים לב אליו.",
          "כל מנחה בתוכנית תחזק גרסה משלו לאותו חומר. אחד שמר תרגילים בתיקיית דרייב אישית. אחר בנה מחדש מצגות בכל מחזור, כי למצוא את של השנה שעברה היה איטי יותר מלהתחיל מאפס. לשלישי היה סט מצוין באמת של דוגמאות פתורות שאף אחד אחר לא ידע שקיים. כשמנחה חדש הצטרף, השבועיים הראשונים שלו היו ארכיאולוגיה.",
          "המחיר היה בלתי נראה כי הוא היה מבוזר. אף אדם בודד לא איבד מספיק זמן כדי להסלים את זה, אז אף אחד לא הסלים. זו הצורה של רוב הבעיות האמיתיות: לא שרפה, אלא מס.",
          "הנחתי שהפתרון הוא תיקייה משותפת. ההנחה הזו הייתה שגויה, והבנת הסיבה לכך היא מה שהפך את זה למוצר במקום למשימת ניקיון. תיקיות משותפות כבר נוסו. הן התפוררו תוך מחזור אחד, כי שום דבר בתיקייה לא אומר לך איזו גרסה עדכנית, מי אחראי עליה, או אם היא שרדה מפגש עם כיתה.",
        ],
      },
    },
    {
      stage: "frame",
      heading: { en: "What I refused to build", he: "מה סירבתי לבנות" },
      body: {
        en: [
          "The tempting scope was an LMS. Grading, attendance, student accounts, dashboards for management. That version dies in month four, because it competes with tools the organisation already pays for and because it requires permission from people who have no reason to grant it yet.",
          "So the non-goals came first, and they were aggressive. No student-facing accounts. No grading. No attendance. No integration with anything. Arc would serve exactly one user — the instructor standing in front of a class tomorrow morning — and it would be judged on one question: did it save them the archaeology.",
          "The real constraints were also worth separating from the assumed ones. Assumed: that this needed organisational sign-off before it could be useful. Real: that instructors would not adopt anything requiring more than one session of effort to learn, and that content had to remain editable by non-technical people, because the people who write the best exercises are teachers, not engineers.",
          "Definition of done for the first pass: a new instructor can run a session they did not write, without calling anyone.",
        ],
        he: [
          "ההיקף המפתה היה מערכת ניהול למידה מלאה. ציונים, נוכחות, חשבונות לתלמידים, דשבורדים להנהלה. הגרסה הזו מתה בחודש הרביעי, כי היא מתחרה בכלים שהארגון כבר משלם עליהם, וכי היא דורשת אישור מאנשים שאין להם עדיין שום סיבה לתת אותו.",
          "אז הלא־מטרות הגיעו קודם, והן היו אגרסיביות. בלי חשבונות לתלמידים. בלי ציונים. בלי נוכחות. בלי אינטגרציה לשום דבר. Arc ישרת בדיוק משתמש אחד — המנחה שעומד מול כיתה מחר בבוקר — וייבחן לפי שאלה אחת: האם הוא חסך לו את הארכיאולוגיה.",
          "גם את האילוצים האמיתיים היה שווה להפריד מהמשוערים. משוער: שזה צריך אישור ארגוני לפני שיוכל להיות שימושי. אמיתי: שמנחים לא יאמצו שום דבר שדורש יותר ממפגש אחד של מאמץ כדי ללמוד, ושהתוכן חייב להישאר ניתן לעריכה על ידי אנשים לא טכניים — כי מי שכותב את התרגילים הכי טובים הם מורים, לא מהנדסים.",
          "הגדרת ׳גמור׳ לסבב הראשון: מנחה חדש יכול להעביר מפגש שהוא לא כתב, בלי להתקשר לאף אחד.",
        ],
      },
    },
    {
      stage: "plan",
      heading: {
        en: "Riskiest assumption first",
        he: "ההנחה המסוכנת ביותר קודם",
      },
      body: {
        en: [
          "The biggest unknown was never technical. It was whether instructors would contribute material to a shared system rather than hoard it in their own folders — a behaviour question, not a build question.",
          "So the plan inverted the obvious order. Instead of building the platform and then seeding it with content, I seeded content first, manually, for a single course, and watched whether other instructors reached for it. That test cost days rather than months, and it was the only result that could have killed the project cleanly.",
          "Once that came back positive, the sequencing was ordinary: structure the content model, build the smallest thing that made the model usable, onboard one cohort, then widen. I ran it against a Gantt plan with real slack in it, because a teaching organisation has hard immovable dates and a slipped week is a slipped cohort, not a slipped sprint.",
          "I also planned the handoff from day one. Every piece of content had a named owner. A platform that only I can maintain would have been a worse outcome than the folders.",
        ],
        he: [
          "הנעלם הגדול ביותר מעולם לא היה טכני. הוא היה האם מנחים יתרמו חומר למערכת משותפת במקום לאגור אותו בתיקיות שלהם — שאלה התנהגותית, לא שאלת בנייה.",
          "אז התוכנית הפכה את הסדר המתבקש. במקום לבנות את הפלטפורמה ואז למלא אותה בתוכן, מילאתי תוכן קודם, ידנית, לקורס אחד, והסתכלתי אם מנחים אחרים יושיטו אליו יד. הבדיקה הזו עלתה ימים ולא חודשים, והיא הייתה התוצאה היחידה שיכלה להרוג את הפרויקט בצורה נקייה.",
          "כשזה חזר חיובי, התזמון היה רגיל: לבנות את מודל התוכן, לבנות את הדבר הקטן ביותר שהופך את המודל לשמיש, להטמיע מחזור אחד, ואז להרחיב. הרצתי את זה מול תוכנית גאנט עם מרווח אמיתי, כי לארגון הוראה יש תאריכים קשיחים שלא זזים, ושבוע שנדחה הוא מחזור שנדחה, לא ספרינט שנדחה.",
          "תכננתי גם את ההעברה מהיום הראשון. לכל פיסת תוכן היה אחראי בשם. פלטפורמה שרק אני יכול לתחזק הייתה תוצאה גרועה יותר מהתיקיות.",
        ],
      },
    },
    {
      stage: "build",
      heading: { en: "Boring on purpose", he: "משעמם בכוונה" },
      body: {
        en: [
          "Arc is not technically ambitious, and that was a decision rather than a limitation. The interesting problems here were structural, not computational: how do you model a curriculum so that a lesson can be reordered, forked for a different cohort, and still trace back to a canonical version.",
          "The core abstraction ended up being the session rather than the course. Courses change every cohort; sessions are stable units that get recombined. Modelling it the other way round — the intuitive way, course-first — would have made every cohort a fork, which is exactly the failure mode the shared folders had.",
          "Everything else followed from keeping the instructor as the only user. Editing had to work for someone who has never opened a terminal. Content had to be readable even if the platform were gone tomorrow, so nothing was stored in a format that could only be recovered through the app.",
        ],
        he: [
          "Arc אינו שאפתני טכנית, וזו הייתה החלטה ולא מגבלה. הבעיות המעניינות כאן היו מבניות, לא חישוביות: איך ממדלים תוכנית לימודים כך שאפשר לשנות סדר של שיעור, לפצל אותו למחזור אחר, ועדיין לעקוב חזרה לגרסה הקנונית.",
          "ההפשטה המרכזית התבררה כמפגש ולא כקורס. קורסים משתנים בכל מחזור; מפגשים הם יחידות יציבות שמורכבות מחדש. מידול בכיוון ההפוך — הדרך האינטואיטיבית, קורס קודם — היה הופך כל מחזור לפיצול, וזה בדיוק מצב הכשל שהיה לתיקיות המשותפות.",
          "כל השאר נבע מלשמור על המנחה כמשתמש היחיד. עריכה הייתה חייבת לעבוד למי שמעולם לא פתח טרמינל. תוכן היה חייב להיות קריא גם אם הפלטפורמה תיעלם מחר, אז שום דבר לא נשמר בפורמט שניתן לשחזור רק דרך האפליקציה.",
        ],
      },
    },
    {
      stage: "prove",
      heading: {
        en: "One instructor, one unfamiliar session",
        he: "מנחה אחד, מפגש אחד לא מוכר",
      },
      body: {
        en: [
          "The test was not a test suite. It was: hand an instructor a session they had never seen, an hour before they had to teach it, and see whether they needed help.",
          "That single workflow surfaced more defects than any amount of unit testing would have. The material was correct; the surrounding context was missing. Instructors did not need better exercises, they needed to know which exercise was current, what students had already covered, and where the previous instructor had gotten stuck.",
          "The disconfirming metric I set in advance was simple and slightly uncomfortable: if instructors still messaged me to find materials, Arc had failed regardless of how much content it held. That kept the target on the workflow rather than on the library.",
        ],
        he: [
          "הבדיקה לא הייתה חבילת טסטים. היא הייתה: לתת למנחה מפגש שהוא מעולם לא ראה, שעה לפני שהוא צריך ללמד אותו, ולראות אם הוא צריך עזרה.",
          "התהליך הבודד הזה חשף יותר תקלות מכל כמות של בדיקות יחידה. החומר היה נכון; ההקשר סביבו היה חסר. מנחים לא היו צריכים תרגילים טובים יותר, הם היו צריכים לדעת איזה תרגיל עדכני, מה התלמידים כבר כיסו, ואיפה המנחה הקודם נתקע.",
          "המדד המפריך שקבעתי מראש היה פשוט וקצת לא נוח: אם מנחים עדיין מתכתבים איתי כדי למצוא חומרים, Arc נכשל — לא משנה כמה תוכן הוא מכיל. זה שמר את המטרה על התהליך ולא על הספרייה.",
        ],
      },
    },
    {
      stage: "field",
      heading: {
        en: "What three years of classrooms changed",
        he: "מה שלוש שנים של כיתות שינו",
      },
      body: {
        en: [
          "Arc has been in continuous use across the organisation's programs since. Roughly none of what it does today was in the original spec, and that is the point.",
          "The changes did not come from a roadmap. They came from instructors telling me what broke at 8:40 in the morning, and from me treating those messages as unfiled bug reports. The largest single improvement — session state, so an instructor can see exactly where the previous session stopped — came from a complaint I initially dismissed as a documentation problem.",
          "That is the loop closing. The friction the field reports becomes the next signal, and the whole thing starts again.",
        ],
        he: [
          "Arc נמצא בשימוש רציף בתוכניות הארגון מאז. בערך כלום ממה שהוא עושה היום לא היה באפיון המקורי, וזו בדיוק הנקודה.",
          "השינויים לא הגיעו ממפת דרכים. הם הגיעו ממנחים שסיפרו לי מה נשבר ב־8:40 בבוקר, ומכך שהתייחסתי להודעות האלה כדיווחי באג שלא הוגשו. השיפור הבודד הגדול ביותר — מצב מפגש, כדי שמנחה יראה בדיוק איפה המפגש הקודם נעצר — הגיע מתלונה שבהתחלה פטרתי כבעיית תיעוד.",
          "זו הלולאה שנסגרת. החיכוך שהשטח מדווח עליו הופך לאיתות הבא, והכול מתחיל מחדש.",
        ],
      },
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2023",
      title: {
        en: "Serve instructors only. No student accounts, no grading.",
        he: "לשרת מנחים בלבד. בלי חשבונות לתלמידים, בלי ציונים.",
      },
      why: {
        en: "Student-facing scope would have required organisational approval, competed with existing tooling, and delayed the first useful version by months. Instructors were the ones paying the tax.",
        he: "היקף שפונה לתלמידים היה דורש אישור ארגוני, מתחרה בכלים קיימים, ומעכב את הגרסה השימושית הראשונה בחודשים. המנחים הם אלה ששילמו את המס.",
      },
      tradeoff: {
        en: "Gave up the more impressive product story and any direct student-outcome metrics, in exchange for shipping something adopted within one cohort.",
        he: "ויתרתי על סיפור מוצר מרשים יותר ועל כל מדד ישיר של תוצאות תלמידים, בתמורה לשליחת משהו שאומץ תוך מחזור אחד.",
      },
      revisit: {
        en: "If instructor adoption plateaus and the organisation asks for student outcome data it cannot otherwise get.",
        he: "אם אימוץ המנחים יגיע לרמה קבועה והארגון יבקש נתוני תוצאות תלמידים שאין לו דרך אחרת להשיג.",
      },
    },
    {
      id: "D-02",
      date: "2023",
      title: {
        en: "Model the session as the atomic unit, not the course.",
        he: "למדל את המפגש כיחידה האטומית, לא את הקורס.",
      },
      why: {
        en: "Courses are re-cut every cohort; sessions are stable and get recombined. Course-first modelling makes every cohort a fork, which is exactly how the shared-folder approach decayed.",
        he: "קורסים נחתכים מחדש בכל מחזור; מפגשים יציבים ומורכבים מחדש. מידול שמתחיל מקורס הופך כל מחזור לפיצול, וכך בדיוק התפוררה גישת התיקיות המשותפות.",
      },
      tradeoff: {
        en: "Course-level views became a composition problem rather than a stored entity, so anything that reads naturally at course level costs more to build.",
        he: "תצוגות ברמת קורס הפכו לבעיית הרכבה במקום לישות שמורה, ולכן כל דבר שנקרא באופן טבעי ברמת הקורס יקר יותר לבנייה.",
      },
      revisit: {
        en: "If cohorts stop recombining sessions and courses start behaving as stable units.",
        he: "אם מחזורים יפסיקו להרכיב מחדש מפגשים וקורסים יתחילו להתנהג כיחידות יציבות.",
      },
    },
    {
      id: "D-03",
      date: "2023",
      title: {
        en: "Test the behaviour before building the system.",
        he: "לבדוק את ההתנהגות לפני בניית המערכת.",
      },
      why: {
        en: "The project's real risk was whether instructors would share material at all. Building first would have spent months to learn something a manual test answered in days.",
        he: "הסיכון האמיתי של הפרויקט היה האם מנחים בכלל ישתפו חומר. בנייה קודם הייתה מבזבזת חודשים כדי ללמוד משהו שבדיקה ידנית ענתה עליו בימים.",
      },
      tradeoff: {
        en: "Weeks of unglamorous manual content preparation with nothing to show, and a real chance the answer would have ended the project.",
        he: "שבועות של הכנת תוכן ידנית ולא זוהרת בלי שום דבר להראות, וסיכוי אמיתי שהתשובה הייתה מסיימת את הפרויקט.",
      },
      revisit: {
        en: "Never. This is the step I would keep in every project.",
        he: "אף פעם. זה השלב שהייתי שומר בכל פרויקט.",
      },
    },
    {
      id: "D-04",
      date: "2024",
      title: {
        en: "Keep content readable outside the platform.",
        he: "לשמור על התוכן קריא גם מחוץ לפלטפורמה.",
      },
      why: {
        en: "A tool used by a teaching organisation must not hold curriculum hostage. If Arc disappeared, three years of material had to survive it.",
        he: "כלי שמשמש ארגון הוראה לא יכול להחזיק תוכנית לימודים כבת ערובה. אם Arc ייעלם, שלוש שנים של חומר חייבות לשרוד אותו.",
      },
      tradeoff: {
        en: "Ruled out several richer interactive content formats that would only have existed inside the app.",
        he: "פסל כמה פורמטים אינטראקטיביים עשירים יותר שהיו קיימים רק בתוך האפליקציה.",
      },
      revisit: {
        en: "If interactive content becomes a genuine pedagogical requirement rather than a nice-to-have.",
        he: "אם תוכן אינטראקטיבי יהפוך לדרישה פדגוגית אמיתית ולא לתוספת נחמדה.",
      },
    },
  ],
  rebuild: {
    en: [
      "Instrument adoption from day one. I have three years of qualitative evidence and far less quantitative evidence than I should have, because I did not decide what to measure until the tool was already in use.",
      "Write the instructor onboarding path before the content model. The content model was right; the first-run experience was retrofitted, and it showed.",
      "Give every piece of content an explicit review date. Curriculum rots quietly, and nothing in the original design made staleness visible.",
    ],
    he: [
      "למדוד אימוץ מהיום הראשון. יש לי שלוש שנים של ראיות איכותניות והרבה פחות ראיות כמותיות ממה שהיה צריך, כי לא החלטתי מה למדוד עד שהכלי כבר היה בשימוש.",
      "לכתוב את מסלול ההטמעה של המנחה לפני מודל התוכן. מודל התוכן היה נכון; חוויית ההרצה הראשונה הודבקה בדיעבד, וזה ניכר.",
      "לתת לכל פיסת תוכן תאריך בדיקה מפורש. תוכנית לימודים מתיישנת בשקט, ושום דבר בעיצוב המקורי לא הפך את ההתיישנות לגלויה.",
    ],
  },
};
