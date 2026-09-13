# Arc: three portals, one learning platform

Source review: 13 September 2026. Development revision: `5549bf960754130c6dfe06b0b7bab1fb6a756d7f`.

This portfolio explorer organizes Arc's capabilities into admin, instructor and student workspaces. It is a purpose-built, read-only React presentation with fictional people and work. It is not a running Arc client, a pixel-for-pixel replica, or a connection to the production platform.

## How to explore

- Start at `/work/arc`, then enter a portal.
- Use the grouped navigation or search within that portal. Each view has a direct address.
- Follow a classroom, learner or submitted version into its detail view.
- Change the student theme or inspect an activity's formats. These controls change local presentation only.
- Expand the capability explanation or engineering notes for detail.
- Original screenshots and chaptered recordings show the actual application separately.

The [capability map](./capability-map.json) lists every explorer destination and its source references. Those references identify files in the team's private Arc repository; they do not publish its source code.

## What was reviewed

The review used the current route files, controllers, domain services, presenters, templates, browser-side editors, configuration and relevant tests. Separate portal audits indexed the surrounding source and traced the capabilities represented in each explorer view. A structural inventory is not a claim that every line in the repository was manually read or that every route was tested at runtime.

The older `/documentation` hub was useful orientation. Its reports are not authoritative for current counts: older task-type, theme and analytics summaries have been superseded by the current source.

### Administration and management

The admin workspace covers classroom and instructor management, system-user permissions and scope, import review, duplicate-account reconciliation, content packs, reusable curriculum building, teaching coverage, questionnaires and their response analysis, submitted work, six admin BI views, scoped reporting, school management, security/API visibility, integration boundaries, QA/demo tools and documentation.

Key sources include `AdminNavigationViewModel`, `AdminClassroomController`, `AdminSystemUsersController`, `MergePlanner`, `MergeExecutor`, `SmartDraftGeneratorService`, `ContentPackDraftPublishingService`, `QuestionnaireAnswersAnalyticsService`, `AdminAnalyticsV2Controller`, `LearningFrictionLensPresenter` and `BusinessImpactServiceV3`.

Important distinctions retained in the explorer:

- Admin BI and the independently permissioned analytics portal are different workspaces. Analytics Overview, Grading and Progress are not additional unrestricted admin BI tabs.
- Scope and permission are separate. The default school-manager role does not include full student detail.
- Inventory totals and period-dependent activity have different denominators.
- The Business Impact peer comparison requires at least five eligible peer instructors, each with at least three instruction hours and ten meaningful submissions. The selected scope also needs at least three instruction hours and ten meaningful submissions. Operational indices and opportunity-hour estimates are not measured financial return.
- The current VRI validation payload uses a fixed engagement-stability factor of 0.8. It is a modeled assumption, not an observed stability outcome.
- The current Business Impact adapter does not forward every filter offered elsewhere in the shared analytics interface.
- Import preview is separate from commit. A merge plan is separate from transactional execution.
- Smart Build ranks existing content; it does not generate new pedagogy. Teaching coverage warnings are advisory preparation checks.
- Reusable copies, linked mirrors and draft snapshots have different lifecycle behavior.

### Instructor

The instructor workspace centers on the classroom: lesson context, separately released tasks and solutions, learner progress, submissions and published reviews. The explorer also covers the grade matrix, insights, audience-specific materials, personal code files, presentation, help requests, questionnaires, board sharing and peer review.

Six live session families have distinct sample boards: Quiz Battle, Live Cloud, Class Heatmap, Debate, Escape Room and Branching Scenario. They are read-only examples; the portfolio does not start sessions or send student answers.

Key sources include `InstructorClassroomController`, `InstructorTaskPanelService`, `InstructorReviewService`, `InstructorGradeMatrixViewModel`, `InstructorStatisticsPanelService`, `InstructorSandboxService` and the session-specific controllers.

Important distinctions:

- A draft is not a submitted version. A draft review is not published feedback.
- Empty work cannot receive a grade/rubric result in the guarded workflow; feedback and revision requests have their own rules.
- Lesson master files and an instructor's personal files are different. Restoring lesson materials preserves the personal workspace.
- Curriculum authoring belongs to the relevant content permission, not every instructor account.
- Optional AI feedback refinement and external runtimes are product integrations, not services exercised by this portfolio demo.

### Student

The student explorer includes the five source-defined visual themes and all 21 canonical task kinds. Each activity has a distinct visual example, its participation model, available variants and a source-grounded explanation.

The catalogue covers writing, tables, drawing, vision boards, image cards, questionnaires, files, programming, external activities, Arc Gaming, recording, sorting/ranking, matching, flowcharts, session reflections and the six shared-session activity families.

Programming uses the current code-reading, fill-the-blanks and free-code formats. `session_finale` remains wired in the current handler catalogue despite an older removal migration.

Key sources include the task-handler registry, the individual task handlers, the task-editor templates and JavaScript, student lesson/submission services and theme configuration.

The explorer's “Backpack” is a portfolio grouping of real lesson/task resources and library capabilities; it does not imply that the original app has a native route by that name. The portfolio themes interpret the original visual directions. Screenshots document the original theme implementations.

## Fictional example and ownership

The navigable demo uses Northstar Learning, two schools, three classrooms and 66 fictional learners. Named learner tables show a six-person sample, not the entire population. A shared Python classroom and Jordan's revised study-planner activity connect instructor feedback to the student experience. Other activity examples illustrate the wider catalogue.

These numbers are separate from the owner's statement that Arc and Browser Coder together serve 3,000+ students, instructors and managers. Tomer co-developed both products with one coworker and continues to support and expand them. The portfolio does not present its sample counts as production analytics.

## Capture boundaries

Original recordings use an isolated copy of the actual application and synthetic records. The captured runtime is pinned at `43dfaf6e0a548f9e382a96744aad12a8611aad43`; the development delta to this audit contains delivery, CI, documentation and browser-wait changes, with no change to the reviewed product UI/domain implementation. Capture manifests record their own dates and revisions.

No production accounts, private student records or platform credentials are embedded in the portfolio. The explorer has no backend mutations, external code execution or provider calls. Local theme preferences, filters and view selections are presentation state.

Screenshots are original UI captures exported to WebP. Videos use real compositor frames, edited with framing, chapter titles, pacing and captions. No fabricated chart overlays or replacement UI text are inserted into original screenshots or recordings. The explicit fictional demo panels are a different artifact from these original-app captures.

The September 13 additions include 15 original screenshots and a 45.5-second, seven-chapter BI film. The new reporting cohort uses three schools, five classrooms, five instructors and 66 fictional learners. Its 892 submission versions comprise 800 submitted versions and 92 drafts. It is separate from both the navigable explorer's three-class cohort and the earlier fictional instructor/student capture accounts. The 30-day peer-comparison view and seven-day eligibility-gate view are separately loaded original views; the film does not imply a continuous filmed filter change. The [capture manifest](./capture-manifest.json) records provenance, edits, dimensions and asset hashes.

Existing original-app captures include five student themes, diagram and matching work, revision readback, an instructor-controlled two-student quiz and curriculum-building/coverage review. Built-in polling was exercised for the recorded live session; WebSocket delivery and external service execution were not claimed from that recording.

## Presentation decisions

The landing page presents three clear entry points. Grouped navigation and direct links avoid forcing a linear tour through a large platform. Detailed explanations sit below the visual workspace and use native disclosures. This follows the principles of [progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/) and the [W3C disclosure-navigation pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/): make the common journey visible while keeping deeper detail available.

Mobile layouts use a collapsible section directory, scrolling tables where a genuine comparison needs columns, touch-sized navigation and responsive graphics. Student theme choice persists locally; reduced-motion settings are respected. Routes and native directory links remain usable without JavaScript, while filtering and theme controls require it.
