import type { LS, LSA } from "./i18n";

/** Every string of site chrome. Content prose lives with the content. */
export const ui = {
  nav: {
    work: { en: "Work", he: "עבודה" },
    system: { en: "System", he: "שיטה" },
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
        "Two degrees that read as unrelated are one argument: software is the tool, systems are the subject. I did not move away from engineering — I went and got the half that makes engineering land.",
      ],
      he: [
        "שני תארים שנראים לא קשורים הם טענה אחת: תוכנה היא הכלי, מערכות הן הנושא. לא התרחקתי מהנדסה — הלכתי להשלים את החצי שגורם להנדסה לנחות במקום הנכון.",
      ],
    } satisfies LSA,
    seeHowIWork: { en: "See how I work →", he: "איך אני עובד ←" },
    classroomLabel: { en: "The classroom", he: "הכיתה" },
    classroomHeading: {
      en: "I learned requirements in front of a room of sixteen-year-olds.",
      he: "למדתי אפיון דרישות מול כיתה של בני שש־עשרה.",
    },
    classroomBody: {
      en: [
        "Three years of teaching programming, several hundred students, plus the syllabuses, lesson plans, exercises and instructor guides underneath. It is the most useful professional training I have had, and not for the reason people assume.",
        "Teaching is requirements engineering with a thirty-second feedback loop. You explain something, and a room full of people immediately shows you which part of your explanation was carrying an assumption. You cannot argue with it, defer it to next sprint, or blame the audience. You find the broken sentence and you fix it.",
      ],
      he: [
        "שלוש שנים של הוראת תכנות, כמה מאות תלמידים, ומתחת לזה סילבוסים, מערכי שיעור, תרגילים ומדריכים למנחים. זו ההכשרה המקצועית הכי שימושית שעברתי, ולא מהסיבה שמניחים.",
        "הוראה היא אפיון דרישות עם לולאת משוב של שלושים שניות. אתה מסביר משהו, וכיתה שלמה מראה לך מיד איזה חלק בהסבר נשען על הנחה סמויה. אי אפשר להתווכח עם זה, לדחות לספרינט הבא, או להאשים את הקהל. מוצאים את המשפט השבור ומתקנים אותו.",
      ],
    } satisfies LSA,
    classroomRule: {
      en: "If you cannot explain the requirement to a sixteen-year-old, the requirement is not finished.",
      he: "אם אי אפשר להסביר את הדרישה לנער בן שש־עשרה, הדרישה עוד לא גמורה.",
    },
  },

  work: {
    title: { en: "Work", he: "עבודה" },
    intro: {
      en: "Filter by what I actually did, not by what it was written in. Every case study carries dates, a decision log, and a list of what I would rebuild.",
      he: "סינון לפי מה שבאמת עשיתי, לא לפי מה שזה נכתב בו. לכל מקרה יש תאריכים, יומן החלטות, ורשימה של מה שהייתי בונה מחדש.",
    },
    filterNote: {
      en: "Filtered by stage of delivery, not by technology — because the stack is the least interesting thing about any of these.",
      he: "מסונן לפי שלב באספקה, לא לפי טכנולוגיה — כי הסטאק הוא הדבר הכי פחות מעניין בכל אחד מהם.",
    },
    empty: {
      en: "Nothing at this stage yet. That is the honest answer rather than a padded one.",
      he: "אין עדיין כלום בשלב הזה. זו התשובה הכנה, לא תשובה מרופדת.",
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
      en: "Delivery is not a talent, it is a process — and a process can be written down, taught, and improved. This is mine. It is the same six stages every time, and it is the reason the work on this site looks consistent despite spanning education, infrastructure and consumer product.",
      he: "אספקה היא לא כישרון, היא תהליך — ותהליך אפשר לכתוב, ללמד ולשפר. זה שלי. אלה אותם שישה שלבים בכל פעם, וזו הסיבה שהעבודות באתר הזה נראות עקביות למרות שהן משתרעות על חינוך, תשתיות ומוצר צרכני.",
    },
    sixStages: { en: "The six stages", he: "ששת השלבים" },
    produces: { en: "What this stage produces", he: "מה השלב הזה מייצר" },
    peopleTitle: { en: "Working with people", he: "עבודה עם אנשים" },
    peopleHeading: {
      en: "Most requirements fail as translation, not as analysis.",
      he: "רוב הדרישות נכשלות בתרגום, לא בניתוח.",
    },
    peopleBody: {
      en: [
        "When a client and a developer disagree, it is almost never because one of them is wrong. It is because a word in the spec means two different things and nobody has noticed yet. My job in that room is to find the word.",
        "So I write things down, in plain language, and read them back to the people who will live with the result. It is unglamorous and it prevents most of the expensive failures.",
      ],
      he: [
        "כשלקוח ומפתח לא מסכימים, זה כמעט אף פעם לא כי אחד מהם טועה. זה כי מילה אחת באפיון אומרת שני דברים שונים ואף אחד עוד לא שם לב. התפקיד שלי בחדר הזה הוא למצוא את המילה.",
        "אז אני כותב דברים, בשפה פשוטה, ומקריא אותם בחזרה לאנשים שיחיו עם התוצאה. זה לא זוהר, וזה מונע את רוב הכישלונות היקרים.",
      ],
    } satisfies LSA,
    nextTitle: { en: "Where to look next", he: "לאן להמשיך" },
    nextEvidence: { en: "The evidence", he: "הראיות" },
    nextEvidenceBody: {
      en: "Case studies filtered by stage, each with a decision log and a rebuild list.",
      he: "מקרי בוחן מסוננים לפי שלב, כל אחד עם יומן החלטות ורשימת בנייה מחדש.",
    },
    nextThesis: { en: "The thesis", he: "התזה" },
    nextThesisBody: {
      en: "Why a software engineer went and got an Industrial Engineering degree.",
      he: "למה מהנדס תוכנה הלך ללמוד הנדסת תעשייה וניהול.",
    },
  },

  about: {
    title: { en: "About", he: "אודות" },
    lede: {
      en: "I am a software engineer who went and got the other half of the problem.",
      he: "אני מהנדס תוכנה שהלך להשלים את החצי השני של הבעיה.",
    },
    thesisLabel: { en: "The thesis", he: "התזה" },
    thesisBody: {
      en: [
        "I finished a Software Engineering degree and then enrolled in a Master’s in Industrial Engineering and Management. People read that as a pivot away from engineering. It is the opposite.",
        "Industrial Engineering is the discipline of designing, measuring and improving systems and processes. It is the formal version of the thing I kept running into at work: the code was rarely the bottleneck. The bottleneck was an undefined requirement, a handoff nobody owned, or a workaround that had quietly become policy. I had been solving those problems by instinct. I went and learned to do it properly.",
        "So the two degrees are one argument. **Software is the tool. Systems are the subject.** Being able to write the code is what stops the systems thinking from becoming a slide deck; understanding the system is what stops the code from being beautifully built and pointed at the wrong problem.",
        "In practice this means I am not looking for a role where I only write tickets, and not one where I only close them. The work I am good at is the whole loop — finding the need, framing it, sequencing it, building it, proving it, and then sitting with the people who use it while they tell me what I got wrong.",
      ],
      he: [
        "סיימתי תואר בהנדסת תוכנה ואז נרשמתי לתואר שני בהנדסת תעשייה וניהול. אנשים קוראים את זה כפנייה החוצה מהנדסה. זה בדיוק ההפך.",
        "הנדסת תעשייה היא הדיסציפלינה של תכנון, מדידה ושיפור של מערכות ותהליכים. זו הגרסה הפורמלית של הדבר שנתקלתי בו שוב ושוב בעבודה: הקוד כמעט אף פעם לא היה צוואר הבקבוק. צוואר הבקבוק היה דרישה לא מוגדרת, העברת אחריות שאף אחד לא לקח עליה בעלות, או עקיפה שהפכה בשקט לנוהל. פתרתי את הבעיות האלה באינטואיציה. הלכתי ללמוד לעשות את זה כמו שצריך.",
        "אז שני התארים הם טענה אחת. **תוכנה היא הכלי. מערכות הן הנושא.** היכולת לכתוב את הקוד היא מה שמונע מחשיבה מערכתית להפוך למצגת; הבנת המערכת היא מה שמונע מהקוד להיבנות יפה ולהיות מכוון לבעיה הלא נכונה.",
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
      en: "Israel · GMT+3\nSunday to Thursday",
      he: "ישראל · GMT+3\nראשון עד חמישי",
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
      en: "This site is the seventh case study. Same six stages, same decision log, same published tradeoffs.",
      he: "האתר הזה הוא מקרה הבוחן השביעי. אותם שישה שלבים, אותו יומן החלטות, אותן פשרות מפורסמות.",
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
