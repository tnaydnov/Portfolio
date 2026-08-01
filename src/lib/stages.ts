import type { LS, LSA } from "./i18n";

export type StageId =
  | "signal"
  | "frame"
  | "plan"
  | "build"
  | "prove"
  | "field";

export interface Stage {
  id: StageId;
  index: string;
  name: LS;
  /** Short imperative shown under the station name. */
  kicker: LS;
  /** The claim, in first person. One sentence. */
  line: LS;
  /** Long-form explanation for /system. */
  detail: LSA;
  /** Concrete artifacts produced at this stage. */
  artifacts: LSA;
}

export const STAGES: Stage[] = [
  {
    id: "signal",
    index: "01",
    name: { en: "Signal", he: "איתות" },
    kicker: { en: "Notice the real need", he: "לזהות את הצורך האמיתי" },
    line: {
      en: "Most work starts from a request. The good work starts one level earlier — from the thing people keep working around.",
      he: "רוב העבודה מתחילה מבקשה. העבודה הטובה מתחילה רמה אחת קודם — מהדבר שאנשים כל הזמן עוקפים.",
    },
    detail: {
      en: [
        "A request is already a solution in disguise. Someone has diagnosed their own problem and handed you the prescription. My first job is to put the prescription down and go find the symptom.",
        "In practice that means watching how work actually gets done rather than how it is described. The signal is almost always a workaround: a spreadsheet that exists because a system does not, six instructors solving the same problem six different ways, a step everyone quietly repeats because the tool forgot it.",
        "This stage ends when I can state the problem in one sentence that the people living with it would recognise as their own.",
      ],
      he: [
        "בקשה היא כבר פתרון בתחפושת. מישהו אבחן את הבעיה של עצמו והגיש לך מרשם. התפקיד הראשון שלי הוא להניח את המרשם בצד וללכת לחפש את הסימפטום.",
        "בפועל זה אומר להסתכל איך העבודה באמת נעשית, ולא איך היא מתוארת. האיתות הוא כמעט תמיד עקיפה: גיליון אלקטרוני שקיים כי מערכת לא קיימת, שישה מנחים שפותרים את אותה בעיה בשש דרכים שונות, שלב שכולם חוזרים עליו בשקט כי הכלי שכח אותו.",
        "השלב הזה נגמר כשאני יכול לנסח את הבעיה במשפט אחד שהאנשים שחיים איתה יזהו כשלהם.",
      ],
    },
    artifacts: {
      en: [
        "Problem statement (one sentence, in the user's words)",
        "Workaround inventory",
        "Stakeholder map",
      ],
      he: [
        "הגדרת בעיה (משפט אחד, במילים של המשתמש)",
        "מיפוי עקיפות קיימות",
        "מפת בעלי עניין",
      ],
    },
  },
  {
    id: "frame",
    index: "02",
    name: { en: "Frame", he: "מסגור" },
    kicker: {
      en: "Define the shape and the constraints",
      he: "להגדיר את הצורה ואת האילוצים",
    },
    line: {
      en: "Scope is decided by what you refuse to build. I write the “not doing” list before the requirements.",
      he: "היקף נקבע לפי מה שמסרבים לבנות. אני כותב את רשימת ה״לא עושים״ לפני הדרישות.",
    },
    detail: {
      en: [
        "Framing is where most projects are actually won or lost, and it happens before a line of code exists. The output is not a feature list — it is a boundary.",
        "I write three things: what done looks like, what is explicitly out of scope for this pass, and which constraints are real versus which are habits. That third distinction matters more than it sounds. Teams routinely treat preferences as physics.",
        "I run this with the people who will live with the result, not just the people paying for it. Aligning expectations here is cheaper than renegotiating them in the build.",
      ],
      he: [
        "מסגור הוא המקום שבו רוב הפרויקטים באמת נקבעים, וזה קורה לפני ששורת קוד אחת קיימת. התוצר הוא לא רשימת פיצ׳רים — הוא גבול.",
        "אני כותב שלושה דברים: איך נראה ׳גמור׳, מה מפורשות מחוץ להיקף בסבב הזה, ואילו אילוצים אמיתיים לעומת אילו הם הרגלים. ההבחנה השלישית חשובה יותר משהיא נשמעת. צוותים מתייחסים דרך קבע להעדפות כאילו הן חוקי טבע.",
        "אני עושה את זה עם האנשים שיחיו עם התוצאה, לא רק עם מי שמשלם עליה. יישור ציפיות כאן זול יותר ממשא ומתן מחדש עליהן באמצע הבנייה.",
      ],
    },
    artifacts: {
      en: [
        "Requirements one-pager",
        "Explicit non-goals list",
        "Definition of done, agreed with stakeholders",
      ],
      he: [
        "דף דרישות אחד",
        "רשימת לא־מטרות מפורשת",
        "הגדרת ׳גמור׳, מוסכמת עם בעלי העניין",
      ],
    },
  },
  {
    id: "plan",
    index: "03",
    name: { en: "Plan", he: "תכנון" },
    kicker: {
      en: "Sequence it, own the critical path",
      he: "לתזמן, להיות אחראי לנתיב הקריטי",
    },
    line: {
      en: "A plan is not a list of tasks. It is an argument about what must happen first, and what can safely go wrong.",
      he: "תוכנית היא לא רשימת משימות. היא טענה לגבי מה חייב לקרות ראשון, ומה מותר שישתבש.",
    },
    detail: {
      en: [
        "Decomposition is the part of my Industrial Engineering training that pays off daily. Any initiative can be broken into tasks; the skill is finding the ordering where risk is retired earliest and rework is cheapest.",
        "I build the timeline as a dependency graph before it becomes a Gantt chart, so the critical path is visible rather than implied. Then I put the riskiest unknown first, because a plan whose biggest assumption is tested in week eight is not a plan.",
        "I also plan for the handoff. Work that only I can continue is not finished work.",
      ],
      he: [
        "פירוק לגורמים הוא החלק מההכשרה בהנדסת תעשייה שמשתלם כל יום. כל יוזמה אפשר לפרק למשימות; המיומנות היא למצוא את הסדר שבו הסיכון מוסר הכי מוקדם והעבודה החוזרת הכי זולה.",
        "אני בונה את לוח הזמנים כגרף תלויות לפני שהוא הופך לגאנט, כדי שהנתיב הקריטי יהיה גלוי ולא משתמע. ואז אני שם את הנעלם המסוכן ביותר ראשון, כי תוכנית שההנחה הגדולה שלה נבדקת בשבוע השמיני היא לא תוכנית.",
        "אני גם מתכנן את ההעברה. עבודה שרק אני יכול להמשיך היא לא עבודה גמורה.",
      ],
    },
    artifacts: {
      en: [
        "Dependency graph and critical path",
        "Gantt plan with real slack",
        "Task breakdown with owners",
      ],
      he: [
        "גרף תלויות ונתיב קריטי",
        "תוכנית גאנט עם מרווח אמיתי",
        "פירוק משימות עם אחראים",
      ],
    },
  },
  {
    id: "build",
    index: "04",
    name: { en: "Build", he: "בנייה" },
    kicker: {
      en: "Make the thing, defend every box",
      he: "לבנות את הדבר, להגן על כל קופסה",
    },
    line: {
      en: "I build it myself. Not because I have to, but because the person who writes the plan should feel the cost of it.",
      he: "אני בונה את זה בעצמי. לא כי אני חייב, אלא כי מי שכותב את התוכנית צריך להרגיש את המחיר שלה.",
    },
    detail: {
      en: [
        "Software Engineering is the half of my training that keeps the other half honest. When you have to implement your own spec, you stop writing specs that are pleasant to read and impossible to ship.",
        "My bias is toward boring, legible architecture with a small number of well-defended exceptions. Every service in a diagram of mine should have an answer to two questions: why does this exist, and what would it take to delete it.",
        "I keep a decision log as I go rather than reconstructing one afterwards, because the reasoning is only accurate while the alternatives are still live.",
      ],
      he: [
        "הנדסת תוכנה היא החצי בהכשרה שלי ששומר על החצי השני כן. כשאתה צריך לממש את האפיון של עצמך, אתה מפסיק לכתוב אפיונים שנעים לקרוא ואי אפשר לשלוח.",
        "הנטייה שלי היא לארכיטקטורה משעממת וקריאה, עם מספר קטן של חריגות מוגנות היטב. לכל שירות בדיאגרמה שלי צריכה להיות תשובה לשתי שאלות: למה זה קיים, ומה יידרש כדי למחוק את זה.",
        "אני מנהל יומן החלטות תוך כדי ולא משחזר אותו בדיעבד, כי ההנמקה מדויקת רק כל עוד החלופות עדיין חיות.",
      ],
    },
    artifacts: {
      en: [
        "System architecture diagram",
        "Decision log (ADR-style)",
        "Working software, deployed",
      ],
      he: [
        "דיאגרמת ארכיטקטורה",
        "יומן החלטות (בסגנון ADR)",
        "תוכנה עובדת, בפריסה",
      ],
    },
  },
  {
    id: "prove",
    index: "05",
    name: { en: "Prove", he: "הוכחה" },
    kicker: {
      en: "Test the workflow, not just the code",
      he: "לבדוק את התהליך, לא רק את הקוד",
    },
    line: {
      en: "Passing tests prove the code does what I said. They do not prove the workflow survives a real person on a bad day.",
      he: "בדיקות שעוברות מוכיחות שהקוד עושה מה שאמרתי. הן לא מוכיחות שהתהליך שורד אדם אמיתי ביום גרוע.",
    },
    detail: {
      en: [
        "Unit tests are table stakes. What I actually care about is whether the end-to-end path holds when a user does something reasonable that I did not anticipate.",
        "So I test at the level of the job to be done: can a new instructor complete their first session without help, can a user recover from a failed upload, does the thing degrade gracefully when the network does.",
        "I also decide, before launch, what number would tell me this worked — and what number would tell me it did not. Choosing the disconfirming metric in advance is the only way to avoid grading your own homework later.",
      ],
      he: [
        "בדיקות יחידה הן תנאי סף. מה שבאמת מעניין אותי הוא אם המסלול מקצה לקצה מחזיק כשמשתמש עושה משהו סביר שלא צפיתי.",
        "אז אני בודק ברמת המשימה שצריך לבצע: האם מנחה חדש יכול להעביר את המפגש הראשון שלו בלי עזרה, האם משתמש יכול להתאושש מהעלאה שנכשלה, האם הדבר מתדרדר בחן כשהרשת מתדרדרת.",
        "אני גם מחליט, לפני ההשקה, איזה מספר יגיד לי שזה עבד — ואיזה מספר יגיד לי שלא. בחירת המדד המפריך מראש היא הדרך היחידה להימנע מלבדוק את המבחן של עצמך אחר כך.",
      ],
    },
    artifacts: {
      en: [
        "Workflow QA checklist",
        "Success and failure metrics, chosen before launch",
        "Instrumentation on the critical path",
      ],
      he: [
        "רשימת תיוג לבדיקת תהליך",
        "מדדי הצלחה וכישלון, שנבחרו לפני ההשקה",
        "מדידה על הנתיב הקריטי",
      ],
    },
  },
  {
    id: "field",
    index: "06",
    name: { en: "Field", he: "שטח" },
    kicker: { en: "Ship, listen, change it", he: "לשלוח, להקשיב, לשנות" },
    line: {
      en: "The field always disagrees with the plan. The job is to be there when it does, and to change the thing rather than the story.",
      he: "השטח תמיד חולק על התוכנית. העבודה היא להיות שם כשזה קורה, ולשנות את הדבר במקום את הסיפור.",
    },
    detail: {
      en: [
        "This is the stage most portfolios skip, and it is the one that separates a project from a product. Launch is where you start learning, not where you stop.",
        "I keep a direct line to the people using the thing — instructors, coordinators, users — and I treat their complaints as unfiled bug reports rather than as noise. Every piece of feedback gets traced to either a change or an explicit decision not to change.",
        "Then the loop closes: the friction the field reports becomes the next signal, and it starts again.",
      ],
      he: [
        "זה השלב שרוב הפורטפוליו מדלגים עליו, והוא זה שמפריד בין פרויקט למוצר. השקה היא המקום שבו מתחילים ללמוד, לא המקום שבו מפסיקים.",
        "אני שומר קו ישיר לאנשים שמשתמשים בדבר — מנחים, רכזים, משתמשים — ומתייחס לתלונות שלהם כדיווחי באג שלא הוגשו, ולא כרעש. כל פיסת משוב מקבלת מעקב או לשינוי, או להחלטה מפורשת לא לשנות.",
        "ואז הלולאה נסגרת: החיכוך שהשטח מדווח עליו הופך לאיתות הבא, וזה מתחיל מחדש.",
      ],
    },
    artifacts: {
      en: [
        "Feedback log, each entry traced to a change",
        "Post-launch iteration list",
        "Retrospective: what I would rebuild",
      ],
      he: [
        "יומן משוב, כל רשומה עם מעקב לשינוי",
        "רשימת איטרציות אחרי השקה",
        "רטרוספקטיבה: מה הייתי בונה מחדש",
      ],
    },
  },
];

export const STAGE_BY_ID = Object.fromEntries(
  STAGES.map((s) => [s.id, s]),
) as Record<StageId, Stage>;
