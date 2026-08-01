import type { LS, LSA } from "./i18n";

/** Every string of site chrome. Content prose lives with the content. */
export const ui = {
  nav: {
    work: { en: "Work", he: "עבודה" },
    system: { en: "How I work", he: "איך אני עובד" },
    about: { en: "About", he: "אודות" },
    contact: { en: "Contact", he: "יצירת קשר" },
    colophon: { en: "Colophon", he: "על האתר" },
  } satisfies Record<string, LS>,

  common: {
    skipToContent: { en: "Skip to content", he: "דילוג לתוכן" },
    openMenu: { en: "Open menu", he: "פתיחת תפריט" },
    closeMenu: { en: "Close menu", he: "סגירת תפריט" },
    toInk: { en: "Switch to ink theme", he: "מעבר לערכת דיו" },
    toPaper: { en: "Switch to paper theme", he: "מעבר לערכת נייר" },
    paper: { en: "Paper", he: "נייר" },
    ink: { en: "Ink", he: "דיו" },
    stage: { en: "Stage", he: "שלב" },
    thesis: { en: "Thesis", he: "התזה" },
    evidence: { en: "Evidence", he: "ראיות" },
    method: { en: "Method", he: "שיטה" },
    position: { en: "Position", he: "עמדה" },
    theLoop: { en: "The loop", he: "הלולאה" },
    allWork: { en: "All work", he: "כל העבודות" },
    readCase: { en: "Read the case", he: "לקריאת המקרה" },
    source: { en: "Source", he: "קוד מקור" },
    nextCase: { en: "Next case", he: "המקרה הבא" },
    role: { en: "Role", he: "תפקיד" },
    span: { en: "Span", he: "תקופה" },
    status: { en: "Status", he: "סטטוס" },
    team: { en: "Team", he: "צוות" },
    solo: { en: "Solo", he: "לבד" },
    now: { en: "now", he: "היום" },
    interactive: { en: "Interactive", he: "אינטראקטיבי" },
    selected: { en: "Selected", he: "נבחר" },
    downloadCv: { en: "Download CV", he: "הורדת קורות חיים" },
    cvPdf: { en: "CV (PDF)", he: "קורות חיים (PDF)" },
    site: { en: "Site", he: "אתר" },
    elsewhere: { en: "Elsewhere", he: "במקומות אחרים" },
    currently: { en: "Currently", he: "כרגע" },
    architecture: { en: "Architecture", he: "ארכיטקטורה" },
    decisionLog: { en: "Decision log", he: "יומן החלטות" },
    tradeoff: { en: "Tradeoff", he: "פשרה" },
    why: { en: "Why", he: "למה" },
    revisitIf: { en: "Revisit if", he: "לבחון מחדש אם" },
    entries: { en: "entries", he: "רשומות" },
    fromTheField: { en: "From the field", he: "מהשטח" },
    whatChanged: { en: "What changed", he: "מה השתנה" },
    rebuildToday: {
      en: "If I rebuilt it today",
      he: "אילו הייתי בונה את זה היום",
    },
    caseSingular: { en: "case", he: "מקרה" },
    casePlural: { en: "cases", he: "מקרים" },
    atThisStage: { en: "at this stage", he: "בשלב הזה" },
    all: { en: "All", he: "הכול" },
    backTo01: { en: "back to 01 — Signal", he: "חזרה ל־01 — איתות" },
    performanceBudget: { en: "Performance budget", he: "תקציב ביצועים" },
  } satisfies Record<string, LS>,

  home: {
    heroWord: { en: "מִכְלוֹל", he: "מִכְלוֹל" },
    heroPron: { en: "/mikhlol/ · noun", he: "/מִכְלוֹל/ · שם עצם" },
    heroDefinition: {
      en: "the whole formed by the combination of all its parts.",
      he: "השלם הנוצר מצירוף כל חלקיו.",
    },
    heroStatementLead: {
      en: "That’s the job. Not the code, not the plan —",
      he: "זו העבודה. לא הקוד, לא התוכנית —",
    },
    heroStatementBold: { en: "the combination.", he: "הצירוף." },
    heroStatementRest: {
      en: "I find the need, define the shape, plan the path, build the thing, prove it works, and fix what the field says is wrong.",
      he: "אני מוצא את הצורך, מגדיר את הצורה, מתכנן את הדרך, בונה את הדבר, מוכיח שהוא עובד, ומתקן את מה שהשטח אומר שלא בסדר.",
    },
    seeTheLoop: { en: "See the loop", he: "לראות את הלולאה" },
    theEvidence: { en: "The evidence", he: "הראיות" },
    skipTheLoop: { en: "Skip the loop ↓", he: "דילוג על הלולאה ↓" },
    loopHeading: {
      en: "Six stages. Most people own two of them.",
      he: "שישה שלבים. רוב האנשים אחראים על שניים מהם.",
    },
    loopIntro: {
      en: "Industrial Engineering calls this a value stream. It is the same six steps every time, and the value is in owning all of them — including the last one, which is where projects become products.",
      he: "בהנדסת תעשייה וניהול קוראים לזה שרשרת ערך. אלה אותם שישה שלבים בכל פעם, והערך הוא באחריות על כולם — כולל האחרון, שבו פרויקטים הופכים למוצרים.",
    },
    evidenceHeading: {
      en: "Three products. Every claim above is one of these.",
      he: "שלושה מוצרים. כל טענה למעלה נשענת על אחד מהם.",
    },
    evidenceIntro: {
      en: "Each carries a decision log — what I chose, what I gave up for it, and the condition that would make me change my mind.",
      he: "לכל אחד יש יומן החלטות — מה בחרתי, על מה ויתרתי בשבילו, ומה יגרום לי לשנות את דעתי.",
    },
    positionQuoteLead: {
      en: "Software Engineering gave me the build. Industrial Engineering gave me the system.",
      he: "הנדסת תוכנה נתנה לי את הבנייה. הנדסת תעשייה וניהול נתנה לי את המערכת.",
    },
    positionQuoteAccent: {
      en: "The value is the combination.",
      he: "הערך הוא הצירוף.",
    },
    positionBody: {
      en: [
        "A completed Software Engineering degree and a Master’s in Industrial Engineering and Management in progress point in one direction: software is the tool, systems are the subject.",
      ],
      he: [
        "תואר שהושלם בהנדסת תוכנה ותואר שני בתהליך בהנדסת תעשייה וניהול מצביעים לאותו כיוון: תוכנה היא הכלי, מערכות הן הנושא.",
      ],
    } satisfies LSA,
    seeHowIWork: { en: "See how I work →", he: "איך אני עובד ←" },
    classroomLabel: { en: "The classroom", he: "הכיתה" },
    classroomHeading: {
      en: "I learned requirements in front of a room of high-school students.",
      he: "למדתי אפיון דרישות מול כיתה של תלמידי תיכון.",
    },
    classroomBody: {
      en: [
        "Since 2023, I have taught programming and developed the syllabuses, lesson plans, exercises and instructor guides underneath it. It is the most useful professional training I have had, and not for the reason people assume.",
        "Teaching is requirements engineering with a thirty-second feedback loop. You explain something, and a room full of people immediately shows you which part of your explanation was carrying an assumption. You cannot argue with it, defer it to next sprint, or blame the audience. You find the broken sentence and you fix it.",
      ],
      he: [
        "מאז 2023 אני מלמד תכנות ומפתח את הסילבוסים, מערכי השיעור, התרגילים והמדריכים למנחים שמתחתיו. זו ההכשרה המקצועית הכי שימושית שעברתי, ולא מהסיבה שמניחים.",
        "הוראה היא אפיון דרישות עם לולאת משוב של שלושים שניות. אתה מסביר משהו, וכיתה שלמה מראה לך מיד איזה חלק בהסבר נשען על הנחה סמויה. אי אפשר להתווכח עם זה, לדחות לספרינט הבא, או להאשים את הקהל. מוצאים את המשפט השבור ומתקנים אותו.",
      ],
    } satisfies LSA,
    classroomRule: {
      en: "If you cannot explain the requirement clearly to a high-school student, the requirement is not finished.",
      he: "אם אי אפשר להסביר את הדרישה בבירור לתלמיד תיכון, הדרישה עוד לא גמורה.",
    },
  },

  work: {
    title: { en: "Work", he: "עבודה" },
    intro: {
      en: "Filter by the part of delivery you want to inspect. Each record keeps its technology, dates, evidence status, source and rebuild notes visible.",
      he: "סינון לפי חלק המסירה שתרצו לבחון. בכל רשומה הטכנולוגיה, התאריכים, מצב הראיות, המקור והערות הבנייה מחדש נשארים גלויים.",
    },
    filterNote: {
      en: "Choose a delivery stage to narrow the project record.",
      he: "בחרו שלב מסירה כדי לצמצם את תיעוד הפרויקטים.",
    },
    empty: {
      en: "No project record is tagged with this stage yet.",
      he: "אין עדיין תיעוד פרויקט שמסומן בשלב הזה.",
    },
    repsTitle: { en: "The reps", he: "החזרות" },
    repsSpan: { en: "2022 — 2023 · University", he: "2022 — 2023 · אוניברסיטה" },
    repsHeading: {
      en: "Where I learned the craft.",
      he: "כאן למדתי את המלאכה.",
    },
    repsIntro: {
      en: "Coursework, kept at coursework weight. Knowing the difference between a rep and a product is most of the point.",
      he: "עבודות קורס, במשקל של עבודות קורס. לדעת את ההבדל בין חזרת אימון למוצר — זה רוב העניין.",
    },
    colProject: { en: "Project", he: "פרויקט" },
    colSpan: { en: "Span", he: "תקופה" },
    colStack: { en: "Stack", he: "טכנולוגיות" },
    colTaught: { en: "What it taught", he: "מה זה לימד" },
  },

  system: {
    title: { en: "System", he: "שיטה" },
    intro: {
      en: "Six repeatable stages I use to turn ambiguous needs into working systems. The projects link back to them as an index of decisions and artifacts — not as doctrine.",
      he: "שישה שלבים חוזרים שבהם אני הופך צרכים עמומים למערכות עובדות. הפרויקטים מקושרים אליהם כאינדקס של החלטות ותוצרים — לא כדוקטרינה.",
    },
    sixStages: { en: "The six stages", he: "ששת השלבים" },
    produces: { en: "What this stage produces", he: "מה השלב הזה מייצר" },
    peopleTitle: { en: "Working with people", he: "עבודה עם אנשים" },
    peopleHeading: {
      en: "I often find the broken requirement in the translation.",
      he: "לעיתים קרובות אני מוצא את הדרישה השבורה דווקא בתרגום.",
    },
    peopleBody: {
      en: [
        "When a client and a developer disagree, I look for the word in the specification that means two different things to them. My job in that room is to find it.",
        "I write the requirement in plain language and read it back to the people who will live with the result. It catches mismatches before they harden into implementation.",
      ],
      he: [
        "כשלקוח ומפתח לא מסכימים, אני מחפש את המילה באפיון שאומרת לכל אחד מהם משהו אחר. התפקיד שלי בחדר הוא למצוא אותה.",
        "אני כותב את הדרישה בשפה פשוטה ומקריא אותה בחזרה לאנשים שיחיו עם התוצאה. כך פערים מתגלים לפני שהם מתקבעים במימוש.",
      ],
    } satisfies LSA,
    nextTitle: { en: "Where to look next", he: "לאן להמשיך" },
    nextEvidence: { en: "The evidence", he: "הראיות" },
    nextEvidenceBody: {
      en: "Case studies filtered by stage, with decision records where documented and a rebuild list for each.",
      he: "מקרי בוחן מסוננים לפי שלב, עם תיעוד החלטות כאשר הוא קיים ורשימת בנייה מחדש לכל אחד.",
    },
    nextThesis: { en: "The thesis", he: "התזה" },
    nextThesisBody: {
      en: "Why a software engineer is studying Industrial Engineering and Management.",
      he: "למה מהנדס תוכנה לומד הנדסת תעשייה וניהול.",
    },
  },

  about: {
    title: { en: "About", he: "אודות" },
    lede: {
      en: "I am a software engineer studying the other half of the problem.",
      he: "אני מהנדס תוכנה שלומד את החצי השני של הבעיה.",
    },
    thesisLabel: { en: "The thesis", he: "התזה" },
    thesisBody: {
      en: [
        "I finished a Software Engineering degree and then enrolled in a Master’s in Industrial Engineering and Management. People read that as a pivot away from engineering. It is the opposite.",
        "Industrial Engineering is the discipline of designing, measuring and improving systems and processes. It is the formal version of the thing I kept running into at work: the code was rarely the bottleneck. The bottleneck was an undefined requirement, a handoff nobody owned, or a workaround that had quietly become policy. I had been solving those problems by instinct; now I am learning the formal tools behind them.",
        "So the two disciplines point in one direction. **Software is the tool. Systems are the subject.** Being able to write the code is what stops the systems thinking from becoming a slide deck; understanding the system is what stops the code from being beautifully built and pointed at the wrong problem.",
        "In practice this means I am not looking for a role where I only write tickets, and not one where I only close them. The work I am good at is the whole loop — finding the need, framing it, sequencing it, building it, proving it, and then sitting with the people who use it while they tell me what I got wrong.",
      ],
      he: [
        "סיימתי תואר בהנדסת תוכנה ואז נרשמתי לתואר שני בהנדסת תעשייה וניהול. אנשים קוראים את זה כפנייה החוצה מהנדסה. זה בדיוק ההפך.",
        "הנדסת תעשייה היא הדיסציפלינה של תכנון, מדידה ושיפור של מערכות ותהליכים. זו הגרסה הפורמלית של הדבר שנתקלתי בו שוב ושוב בעבודה: הקוד כמעט אף פעם לא היה צוואר הבקבוק. צוואר הבקבוק היה דרישה לא מוגדרת, העברת אחריות שאף אחד לא לקח עליה בעלות, או עקיפה שהפכה בשקט לנוהל. פתרתי את הבעיות האלה באינטואיציה; עכשיו אני לומד את הכלים הפורמליים שמאחוריהן.",
        "אז שתי הדיסציפלינות מצביעות לאותו כיוון. **תוכנה היא הכלי. מערכות הן הנושא.** היכולת לכתוב את הקוד היא מה שמונע מחשיבה מערכתית להפוך למצגת; הבנת המערכת היא מה שמונע מהקוד להיבנות יפה ולהיות מכוון לבעיה הלא נכונה.",
        "בפועל זה אומר שאני לא מחפש תפקיד שבו אני רק כותב משימות, ולא כזה שבו אני רק סוגר אותן. העבודה שאני טוב בה היא הלולאה כולה — למצוא את הצורך, למסגר אותו, לתזמן אותו, לבנות אותו, להוכיח אותו, ואז לשבת עם האנשים שמשתמשים בו בזמן שהם מספרים לי מה פספסתי.",
      ],
    } satisfies LSA,
    teachingLabel: { en: "What teaching taught me", he: "מה ההוראה לימדה אותי" },
    wantLabel: { en: "What I want next", he: "מה אני מחפש עכשיו" },
    wantBody: {
      en: [
        "A technical product role, on a small team, where the distance between noticing a problem and shipping something about it is short. I want to own outcomes rather than tickets, and I want to be close enough to the users that the feedback arrives directly rather than through a summary.",
        "I am comfortable being the person who writes the spec and then has to implement it. I think that combination is rarer than it should be, and it is the entire reason this site is organised the way it is.",
      ],
      he: [
        "תפקיד מוצר טכני, בצוות קטן, שבו המרחק בין לשים לב לבעיה לבין לשלוח משהו בנוגע אליה הוא קצר. אני רוצה להיות אחראי על תוצאות ולא על משימות, ואני רוצה להיות מספיק קרוב למשתמשים כדי שהמשוב יגיע ישירות ולא דרך סיכום.",
        "נוח לי להיות האדם שכותב את האפיון ואז צריך לממש אותו. אני חושב שהצירוף הזה נדיר יותר משהוא צריך להיות, וזו כל הסיבה שהאתר הזה מסודר כפי שהוא מסודר.",
      ],
    } satisfies LSA,
    getInTouch: { en: "Get in touch →", he: "ליצירת קשר ←" },
    numbersTitle: { en: "By the numbers", he: "במספרים" },
    trackTitle: { en: "Track", he: "מסלול" },
    current: { en: "Current", he: "נוכחי" },
    howIWork: { en: "How I work →", he: "איך אני עובד ←" },
  },

  contact: {
    title: { en: "Contact", he: "יצירת קשר" },
    lede: {
      en: "If you are hiring for a role that spans the whole loop, I would like to hear about it.",
      he: "אם אתם מגייסים לתפקיד שמשתרע על הלולאה כולה, אשמח לשמוע עליו.",
    },
    based: { en: "Based", he: "מיקום" },
    basedValue: {
      en: "Israel · UTC+2/+3\nSunday to Thursday",
      he: "ישראל · UTC+2/+3\nראשון עד חמישי",
    },
    lookingFor: { en: "Looking for", he: "מחפש" },
    lookingForValue: {
      en: "Technical product roles on small teams. Discovery through delivery, with the iteration after it.",
      he: "תפקידי מוצר טכני בצוותים קטנים. מגילוי ועד אספקה, כולל האיטרציה שאחריה.",
    },
    cv: { en: "CV", he: "קורות חיים" },
    downloadPdf: { en: "Download PDF ↓", he: "הורדת PDF ↓" },
    briefTitle: { en: "The brief", he: "הבריף" },
    briefHeading: {
      en: "The job description I would write, if I were writing it.",
      he: "תיאור המשרה שהייתי כותב, אילו אני הייתי כותב אותו.",
    },
    briefIntro: {
      en: "Most candidates read a role spec and try to match it. I find it more useful to publish mine, so we can both see the gap early rather than four weeks into a process.",
      he: "רוב המועמדים קוראים אפיון תפקיד ומנסים להתאים את עצמם אליו. לי יותר שימושי לפרסם את שלי, כדי ששנינו נראה את הפער מוקדם ולא אחרי ארבעה שבועות בתהליך.",
    },
    footerNote: {
      en: "Currently open to technical product roles where the job is the whole loop — discovery through delivery, and the iteration after it.",
      he: "פתוח כרגע לתפקידי מוצר טכני שבהם העבודה היא הלולאה כולה — מגילוי ועד אספקה, והאיטרציה שאחריה.",
    },
  },

  colophon: {
    title: { en: "Colophon", he: "על האתר" },
    lede: {
      en: "This site is a case study too: the same attention to evidence, tradeoffs and what should be removed.",
      he: "גם האתר הזה הוא מקרה בוחן: אותה תשומת לב לראיות, לפשרות ולמה שצריך להסיר.",
    },
    intro: {
      en: "A portfolio that argues for engineering judgement should be willing to show its own. So here is how this one was built, what it costs to load, and what I would change.",
      he: "פורטפוליו שטוען לשיקול דעת הנדסי צריך להיות מוכן להראות את שלו. אז הנה איך זה נבנה, כמה זה עולה לטעון, ומה הייתי משנה.",
    },
    budgetTitle: { en: "Budget", he: "תקציב" },
    budgetIntro: {
      en: "Targets set before the build, and the measured result. Published because a budget you do not report is a wish.",
      he: "יעדים שנקבעו לפני הבנייה, והתוצאה שנמדדה. מפורסם כי תקציב שלא מדווחים עליו הוא משאלה.",
    },
    rulesTitle: { en: "Rules", he: "כללים" },
    measured: { en: "Measured", he: "נמדד" },
    target: { en: "Target", he: "יעד" },
    route: { en: "Route", he: "נתיב" },
    firstLoad: { en: "First-load JS", he: "JS בטעינה ראשונה" },
  },

  notFound: {
    label: { en: "No route", he: "אין נתיב" },
    title: { en: "Nothing here.", he: "אין כאן כלום." },
    body: {
      en: "This page does not exist, which is a small failure at the Prove stage. The work is where you probably meant to go.",
      he: "הדף הזה לא קיים, וזה כשל קטן בשלב ההוכחה. כנראה התכוונתם להגיע לעבודות.",
    },
    cta: { en: "See the work →", he: "לעבודות ←" },
    home: { en: "Home", he: "דף הבית" },
  },
} as const;

export type UI = typeof ui;
