import type { Project } from "@/lib/types";

export const arc: Project = {
  slug: "arc",
  title: "Arc",
  oneLiner:
    "An internal learning platform for a national programming education organisation.",
  hook: "Six instructors were solving the same problem six different ways. I built the seventh one — once.",
  tier: "flagship",
  stages: ["signal", "frame", "plan", "build", "prove", "field"],
  domain: ["product", "education", "platform"],
  role: "Founder · Product & delivery · Build",
  team: "Built with instructors and program coordinators at Nitzanim",
  started: "2023-01",
  status: "internal",
  metrics: [
    { label: "Students reached", value: "650+", note: "Across cohorts taught" },
    { label: "Programs using it", value: "Large-scale", note: "Organisation-wide" },
    { label: "Run time", value: "3 yrs", note: "Still in use" },
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
      heading: "Nobody asked for a platform",
      body: [
        "I was hired to teach Python, not to build software. The signal did not arrive as a request — it arrived as a pattern I could not stop noticing.",
        "Every instructor in the program was maintaining their own version of the same material. One kept exercises in a personal Drive folder. Another rebuilt slides each cohort because finding last year's was slower than starting over. A third had a genuinely excellent set of worked examples that nobody else knew existed. When a new instructor joined, their first two weeks were archaeology.",
        "The cost was invisible because it was distributed. No single person was losing enough time to escalate it, so nobody did. That is the shape of most real problems: not a fire, but a tax.",
        "I had assumed the fix was a shared folder. That assumption was wrong, and finding out why it was wrong is what turned this into a product rather than a cleanup task. Shared folders had been tried. They decayed within a cohort, because nothing in a folder tells you which version is current, who owns it, or whether it survived contact with a classroom.",
      ],
    },
    {
      stage: "frame",
      heading: "What I refused to build",
      body: [
        "The tempting scope was an LMS. Grading, attendance, student accounts, dashboards for management. That version dies in month four, because it competes with tools the organisation already pays for and because it requires permission from people who have no reason to grant it yet.",
        "So the non-goals came first, and they were aggressive. No student-facing accounts. No grading. No attendance. No integration with anything. Arc would serve exactly one user — the instructor standing in front of a class tomorrow morning — and it would be judged on one question: did it save them the archaeology.",
        "The real constraints were also worth separating from the assumed ones. Assumed: that this needed organisational sign-off before it could be useful. Real: that instructors would not adopt anything requiring more than one session of effort to learn, and that content had to remain editable by non-technical people, because the people who write the best exercises are teachers, not engineers.",
        "Definition of done for the first pass: a new instructor can run a session they did not write, without calling anyone.",
      ],
    },
    {
      stage: "plan",
      heading: "Riskiest assumption first",
      body: [
        "The biggest unknown was never technical. It was whether instructors would contribute material to a shared system rather than hoard it in their own folders — a behaviour question, not a build question.",
        "So the plan inverted the obvious order. Instead of building the platform and then seeding it with content, I seeded content first, manually, for a single course, and watched whether other instructors reached for it. That test cost days rather than months, and it was the only result that could have killed the project cleanly.",
        "Once that came back positive, the sequencing was ordinary: structure the content model, build the smallest thing that made the model usable, onboard one cohort, then widen. I ran it against a Gantt plan with real slack in it, because a teaching organisation has hard immovable dates and a slipped week is a slipped cohort, not a slipped sprint.",
        "I also planned the handoff from day one. Every piece of content had a named owner. A platform that only I can maintain would have been a worse outcome than the folders.",
      ],
    },
    {
      stage: "build",
      heading: "Boring on purpose",
      body: [
        "Arc is not technically ambitious, and that was a decision rather than a limitation. The interesting problems here were structural, not computational: how do you model a curriculum so that a lesson can be reordered, forked for a different cohort, and still trace back to a canonical version.",
        "The core abstraction ended up being the session rather than the course. Courses change every cohort; sessions are stable units that get recombined. Modelling it the other way round — the intuitive way, course-first — would have made every cohort a fork, which is exactly the failure mode the shared folders had.",
        "Everything else followed from keeping the instructor as the only user. Editing had to work for someone who has never opened a terminal. Content had to be readable even if the platform were gone tomorrow, so nothing was stored in a format that could only be recovered through the app.",
      ],
    },
    {
      stage: "prove",
      heading: "One instructor, one unfamiliar session",
      body: [
        "The test was not a test suite. It was: hand an instructor a session they had never seen, an hour before they had to teach it, and see whether they needed help.",
        "That single workflow surfaced more defects than any amount of unit testing would have. The material was correct; the surrounding context was missing. Instructors did not need better exercises, they needed to know which exercise was current, what students had already covered, and where the previous instructor had gotten stuck.",
        "The disconfirming metric I set in advance was simple and slightly uncomfortable: if instructors still messaged me to find materials, Arc had failed regardless of how much content it held. That kept the target on the workflow rather than on the library.",
      ],
    },
    {
      stage: "field",
      heading: "What three years of classrooms changed",
      body: [
        "Arc has been in continuous use across the organisation's programs since. Roughly none of what it does today was in the original spec, and that is the point.",
        "The changes did not come from a roadmap. They came from instructors telling me what broke at 8:40 in the morning, and from me treating those messages as unfiled bug reports. The largest single improvement — session state, so an instructor can see exactly where the previous session stopped — came from a complaint I initially dismissed as a documentation problem.",
        "That is the loop closing. The friction the field reports becomes the next signal, and the whole thing starts again.",
      ],
    },
  ],
  decisions: [
    {
      id: "D-01",
      date: "2023",
      title: "Serve instructors only. No student accounts, no grading.",
      why: "Student-facing scope would have required organisational approval, competed with existing tooling, and delayed the first useful version by months. Instructors were the ones paying the tax.",
      tradeoff:
        "Gave up the more impressive product story and any direct student-outcome metrics, in exchange for shipping something adopted within one cohort.",
      revisit:
        "If instructor adoption plateaus and the organisation asks for student outcome data it cannot otherwise get.",
    },
    {
      id: "D-02",
      date: "2023",
      title: "Model the session as the atomic unit, not the course.",
      why: "Courses are re-cut every cohort; sessions are stable and get recombined. Course-first modelling makes every cohort a fork, which is exactly how the shared-folder approach decayed.",
      tradeoff:
        "Course-level views became a composition problem rather than a stored entity, so anything that reads naturally at course level costs more to build.",
      revisit:
        "If cohorts stop recombining sessions and courses start behaving as stable units.",
    },
    {
      id: "D-03",
      date: "2023",
      title: "Test the behaviour before building the system.",
      why: "The project's real risk was whether instructors would share material at all. Building first would have spent months to learn something a manual test answered in days.",
      tradeoff:
        "Weeks of unglamorous manual content preparation with nothing to show, and a real chance the answer would have ended the project.",
      revisit: "Never. This is the step I would keep in every project.",
    },
    {
      id: "D-04",
      date: "2024",
      title: "Keep content readable outside the platform.",
      why: "A tool used by a teaching organisation must not hold curriculum hostage. If Arc disappeared, three years of material had to survive it.",
      tradeoff:
        "Ruled out several richer interactive content formats that would only have existed inside the app.",
      revisit:
        "If interactive content becomes a genuine pedagogical requirement rather than a nice-to-have.",
    },
  ],
  rebuild: [
    "Instrument adoption from day one. I have three years of qualitative evidence and far less quantitative evidence than I should have, because I did not decide what to measure until the tool was already in use.",
    "Write the instructor onboarding path before the content model. The content model was right; the first-run experience was retrofitted, and it showed.",
    "Give every piece of content an explicit review date. Curriculum rots quietly, and nothing in the original design made staleness visible.",
  ],
};
