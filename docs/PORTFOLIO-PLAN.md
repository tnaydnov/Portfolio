# Portfolio v2 — Design & Build Plan
**Tomer Naydnov · "מכלול" — the whole, not the parts**

---

## 0. TL;DR

| | |
|---|---|
| **Positioning** | Not "developer". Not "product manager". **The person who closes the loop** — need → requirement → plan → build → prove → field feedback → repeat. |
| **Concept** | **"The Loop"** — the site *is* a delivery system diagram. Navigation is by **stage of delivery**, not by technology. |
| **Visual language** | Technical Editorial. Blueprint/drafting aesthetic + cinematic film grading. One hot signal color. Bilingual EN/HE with real RTL. |
| **Flagship story** | **Arc** (Nitzanim internal learning platform) — currently invisible on your site. It is your single best מכלול proof. |
| **Core stack** | Next.js 15 · React 19 · TS · Tailwind v4 · GSAP+ScrollTrigger · Motion · Lenis · @xyflow/react · MDX |
| **Hard rule** | Every claim on the site is backed by a named artifact, a date, and a tradeoff you accepted. |

---

## 1. Reading your profile

### What you actually are
Two degrees that most people read as unrelated — **B.Sc. Software Engineering** and **M.Sc. Industrial Engineering & Management** — are actually one thesis: *software is the tool, systems are the subject.* Industrial Engineering is literally the discipline of designing, measuring, and optimizing processes. You picked it deliberately after a CS degree. That is not a career pivot; it's a **completion**.

### The evidence you already have (and mostly aren't showing)
| Signal | Evidence | Currently on site? |
|---|---|---|
| Founded a product from a noticed need | **Arc** — internal learning platform, adopted across large-scale programs | ❌ Not mentioned |
| Stakeholder / requirements work | Clients + educational stakeholders, deliverable definition, expectation alignment | ❌ |
| Planning discipline | Gantt plans, initiative → task decomposition, execution support | ❌ |
| Real engineering depth | **Applytide** — 6 services, 20 DB models, 14 API routers, Chrome extension w/ 3-stage extraction pipeline, TOTP 2FA, LLM budget controls, EN/HE + RTL | ⚠️ Not listed at all |
| Product/UX judgement | **Eventa** — QR onboarding, matching, privacy & accessibility iterations | ❌ |
| Scale of human impact | 650+ students trained; 3 years of field iteration | ⚠️ Buried in a timeline |
| Craft reps | LPR (YOLO+OCR+microservices), Trading System, HRIS, Kanban, D&D, Coalition Race | ✅ Over-weighted |

**Diagnosis:** your current site shows the *weakest* half of your profile (2022 university coursework) at full volume, and the *strongest* half (Arc, Applytide, Eventa, the delivery process itself) at zero volume. That inversion is the single biggest problem — bigger than any visual issue.

### The positioning sentence
> **I find the need, define the shape, plan the path, build the thing, prove it works, and then fix what the field tells me is wrong.**
> Software Engineering gave me the build. Industrial Engineering gave me the system. The value is the combination.

---

## 2. Diagnosis of the current portfolio

Honest audit of `Portfolio-1` as it stands:

**Structural**
- Frames you as *"Software Engineering graduate seeking entry-level opportunities"* → immediately caps you at junior dev. This contradicts your entire goal.
- Homepage's four pillars are Backend / Full-Stack / Automation / Problem Solving — all execution, zero ownership. This actively hides your differentiator.
- Projects are indexed by **technology**, which invites the reader to evaluate you as a coder.
- Case study page (`/projects/[slug]`) has hardcoded placeholder bullets ("Designed microservices and message flows") on *every* project. This is a credibility leak — a careful reader will notice.
- Archived 2022 university assignments (D&D, Set, Coalition Race) get the same visual weight as real products.

**Visual**
- Glassmorphism + purple/teal gradient + dark-mode-with-one-accent is the single most saturated portfolio look on the internet right now. It reads as "template", regardless of effort.
- `animate-bounce` on contact icons, `animate-pulse` on decorative blobs, floating `<Portfolio />` code text — these are the specific tells that read as junior.
- No motion system. Animations are decorative, not communicative.

**Technical**
- `globals.css` has the `:root` block and `.card`/`.chip`/`.btn-primary` primitives duplicated verbatim; `@tailwind` directives are mixed with Tailwind v4's `@import "tailwindcss"`.
- `/projects/[slug]` types `params` as a plain object — Next.js 15 makes `params` a Promise. This is likely already erroring or will on build.
- No `sitemap`, `robots`, per-page metadata, or OG images.

**Verdict:** rebuild, don't refactor. Keep the repo, the deploy pipeline, and the media assets. Replace everything else.

---

## 3. What the research says (condensed)

**Already cliché in 2026 — avoid:**
glassmorphism · saturated purple/teal gradients · dark mode + single neon accent · hero video with text overlay · 3D tilt-on-scroll cards · infinite-scroll homepages · "floating code snippet" decoration.

**Still fresh and worth using:**
scroll-driven narrative (GSAP ScrollTrigger / native `animation-timeline`) · motion that *communicates* rather than decorates · restrained depth & parallax · editorial long-form case studies · light/paper-based palettes (rare in dev portfolios, therefore differentiating) · View Transitions between routes.

**What makes a portfolio read junior** (each one is a thing your v2 must invert):
| Junior | Senior |
|---|---|
| No constraints shown | "We couldn't rewrite X, so we did Y — here's the cost we accepted" |
| Outcomes are visual | Outcomes are measured |
| 2 paragraphs + a screenshot | Problem → research → iterations → tradeoffs → outcome → what I'd redo |
| Only wins shown | "We tried A. It failed because B. We pivoted to C." |
| Everything is solo ("I built") | Named collaborators and what each brought |
| Undated work | "Q2 2024, 3-month engagement" / "Ongoing since 2023" |
| Final output only | One wireframe / one iteration / the messy middle |
| About = resume prose | About = a thesis about how you think |

**Structural references worth studying:**
- [maggieappleton.com](https://maggieappleton.com) — non-linear "digital garden"; separates Essays / Patterns / Notes by depth. Great model for a *frameworks* section.
- [danmall.com](https://www.danmall.com) — leads with frameworks and testimonials, not projects. Positions as thinker, not executor.
- [Codrops case studies](https://tympanus.net/codrops/tag/case-study/) — titles emphasise the *challenge*, not the gloss ("Making Serverless Infrastructure Tangible"). Best template for your write-ups.
- [brittanychiang.com](https://brittanychiang.com) — every project carries a hard number.
- [bruno-simon.com](https://bruno-simon.com), [lusion.co](https://lusion.co) — reference for *motion quality bar only*. Do not copy the metaphor; a 3D driving game says "WebGL specialist", which is not your pitch.

---

## 4. The concept

Three concepts were developed. One is recommended.

### ▸ Concept A — **"The Loop"** ★ RECOMMENDED

The homepage is not a page. It is a **living value-stream diagram of how you deliver** — and you scroll *through* it.

Six stations, drawn from your own vocabulary:

```
        ┌──────────────────────────────────────────────────────┐
        │                                                      │
   ①  SIGNAL ──▶ ②  FRAME ──▶ ③  PLAN ──▶ ④  BUILD ──▶ ⑤  PROVE ──▶ ⑥  FIELD
   notice a       define the    decompose,   implement    test the     ship, listen,
   real need      shape &       sequence,                 workflow     measure, learn
                  constraints   own the                   not just
                                critical path             the code
        │                                                      │
        └──────────────────  feedback closes the loop  ◀───────┘
```

**The mechanic.** A pinned horizontal scroll section. A glowing **carrier token** — representing a real project — travels along an SVG path through the six stations. At each station the carrier *transforms* (a need becomes a spec, a spec becomes a task graph, a task graph becomes a running service). At each station, a single sentence in your voice + one piece of hard evidence from a real project.

**The payoff.** After the sixth station the line curves back to the first. The visitor's takeaway is not "he knows Python." It's **"this person owns the whole thing, and he has a method."** That is exactly the מכלול, made visible in fifteen seconds of scrolling.

**Why this and not something flashier**
- Industrial Engineering's foundational tool is the **value stream map**. Your homepage would literally be your discipline. Nobody else's portfolio can honestly do this.
- It's *unusual* but *instantly legible* — unlike a 3D game, which is impressive but says nothing about product thinking.
- It gives you a navigation primitive nobody has: **filter the work by delivery stage instead of by tech stack.** Click `FRAME` → see every case where you did requirements work. That single interaction reframes you from coder to product owner.
- It's honest. If a claim has no evidence behind it, the station looks empty — which forces the content to be real.

### ▸ Concept B — "Control Room"
Dark mission-ops console; live telemetry, situation board, project health cards. Very cinematic, very buildable.
**Rejected as primary** because dashboard-portfolios are becoming common, and telemetry implies *operating* systems rather than *creating* them. **But borrow its visual language** — instrumentation labels, monospace readouts, measured numbers.

### ▸ Concept C — "Systems Garden"
Maggie-Appleton-style interlinked essays, frameworks, and patterns. Maximum intellectual credibility, minimum cinematics.
**Rejected as primary** because it doesn't meet your "cinematic" requirement and takes months of writing to feel populated. **But borrow its depth layer** — the `/system` page below is Concept C compressed into one page.

### ✅ Final: **A as the spine, B as the skin, C as the substrate.**

---

## 5. Information architecture

```
/                    The Loop        thesis · the six stations · 3 featured proofs · CTA
/work                Evidence        filterable by STAGE (default) or by domain — never by tech alone
/work/[slug]         Case study      long-form, MDX, with Decision Log + artifacts
/system              How I work      the loop explained · the artifacts I produce · downloadable templates
/about               The thesis      why two degrees are one story · the human · the numbers
/notes               Field notes     (optional, phase 3) short posts on delivery, EdTech, AI tooling
/contact             Direct          email · LinkedIn · GitHub · CV (EN + HE) · availability
```

### Critical IA decisions

**1. Filter by stage, not by stack.**
`/work` opens with the six stations as filter chips. `Signal · Frame · Plan · Build · Prove · Field`. Secondary filter: `Product · Platform · Applied AI · Education`. Tech tags exist but are tertiary, shown inside the card, never as the primary axis.

**2. Three tiers of work, visually unequal.**

| Tier | Items | Treatment |
|---|---|---|
| **Flagships** (full case studies) | **Arc**, **Applytide**, **Eventa** | Full-bleed hero, 1500–2500 words, decision log, diagrams, artifacts |
| **Systems** (medium) | License Plate Recognition, Trading System | One screen each: problem, architecture, one hard decision, outcome |
| **The Reps** (ledger) | HRIS, Kanban, D&D, Set, Coalition Race | A compact dated table. Header: *"Where I learned the craft — 2022–2024, university."* Honest, framed, and out of the way. |

The Reps table is not a weakness — labelling it correctly is a **maturity signal**. It says "I know the difference between coursework and product."

**3. Arc is item #1.** You founded it, from a need you personally identified, and it's used across large-scale programs. It is the only project you have that demonstrates all six stations. It must lead. If you can't screenshot it (internal tool), use anonymised diagrams, redacted UI, and the process artifacts — that's often *more* compelling.

**4. Bilingual EN/HE with full RTL.** You built this in Applytide. Doing it on your own site is a live demonstration, not a claim — and it matters for the Israeli market. Language toggle in the header; `next-intl`; `dir="rtl"` handled properly with logical CSS properties.

---

## 6. Signature interactions (the cinematic layer)

Seven specific, buildable mechanics. Each one is designed to *carry meaning*, not just look expensive.

### 6.1 Hero — "The Definition"
Cold open on near-black. Type self-sets, letter by letter, in a technical-editorial layout:

```
מִכְלוֹל
/mikhlol/ · noun

the whole formed by
the combination of all its parts.
```

Then, beneath it, in your voice: *"That's the job. Not the code, not the plan — the combination."*

Behind it: a **self-drawing schematic** of the six-station loop rendered in SVG with `stroke-dashoffset` animation, at 6% opacity, over a slow-moving shader grid. No blobs, no orbs, no particles.

*Why:* it is personal, bilingual, memorable, and states your thesis in three seconds. No other portfolio on earth opens this way.
*Build:* GSAP SplitText (free as of 2025) + `stroke-dashoffset` timeline + one fragment shader. Fully static-renderable; shader mounts after LCP.

### 6.2 The Loop — pinned horizontal scroll
`ScrollTrigger.create({ pin: true, scrub: 1 })` driving `x` translation across six full-height stations, with a carrier token animated along an SVG path via `MotionPathPlugin`.

Per station: `STAGE ID` (mono) · one sentence · one artifact thumbnail · one hard number · a `→ see 4 cases` link.
A persistent progress rail at the bottom shows position in the loop. **Escape hatch:** a "skip the loop" link and full keyboard/anchor navigation — pinned scroll must never trap a user.

*Reduced motion:* collapses to a clean vertical stacked list. No horizontal scroll, no pinning, no carrier.

### 6.3 Decision Log (every case study) — **the highest-value component**
A chronological ledger, styled like Architecture Decision Records:

```
D-03 · 2025-03 · APPLYTIDE
Chose a 3-stage extraction cascade (JSON-LD → DOM → LLM)
over LLM-only parsing.

WHY        LLM-only cost ~$0.004/job and hallucinated salary fields.
           ~60% of job boards ship valid JobPosting JSON-LD for free.
TRADEOFF   3× the code paths and 3 failure modes to maintain,
           in exchange for lower cost and higher precision on the majority path.
REVISIT IF LLM cost drops below X, or JSON-LD coverage falls below Y.
```

*Why:* the research is unambiguous — **explicit tradeoffs are the #1 separator between junior and senior portfolios.** Almost nobody does this. It is cheap to build and enormously credible. Three to five entries per flagship case study.

### 6.4 Constraint Dial
A small interactive widget in each case study. Four sliders: `Time · Scope · Team · Budget`. As the visitor drags them, the panel reveals **which decision you would have made under those conditions** and which one you actually made, and why the real constraints pointed there.

*Why:* it turns "I made good decisions" into an experience the reader participates in. It proves you think in constraint space, which is the core of both product work and industrial engineering.

### 6.5 Live architecture diagram
`@xyflow/react` rendering the *actual* Applytide topology — nginx → web / api / email-service → postgres / redis / worker. Nodes are clickable; each opens a short "why this exists and what I'd remove" note. Same treatment for the LPR microservices and for Arc (anonymised).

*Why:* a static PNG says "I drew a diagram." An interactive, annotated one says "I own this system and I can defend every box in it."

### 6.6 Field Feedback panel
For Arc especially. Real quotes from instructors and coordinators, each paired with **what changed as a result**.

```
"Students kept losing track of which exercise was current."   →  Added a session-state indicator; support pings dropped noticeably.
```

*Why:* it is the only thing on the site that proves you *close* the loop rather than just running it once. Nothing else demonstrates the FIELD station.

### 6.7 The Reps ledger
A dense, dated, monospace table for the 2022–2024 university work. Hover reveals a one-line "what this taught me." No cards, no hero images, no featured badges.

*Why:* correctly weighted work is itself a signal of judgement.

---

## 7. Visual & motion language

**Direction: "Technical Editorial."**
Swiss engineering documentation × cinematic colour grading. Precise, high-contrast, generous whitespace, instrumentation everywhere (IDs, timestamps, measurements in mono), and one hot signal colour that appears only where something *matters*.

### 7.1 Two themes — both first-class

**`blueprint` (default, dark)**
```css
--ink:        #07080A;   /* page */
--surface:    #0E1013;   /* panels */
--surface-2:  #14171C;
--rule:       rgba(255,255,255,0.09);
--text:       #ECEBE8;
--text-muted: #8A8F98;
--signal:     #FF4D17;   /* hot orange — CTAs, active state, key numbers ONLY */
--trace:      #5B7FA6;   /* desaturated blueprint blue — diagram strokes */
--ok:         #7FB069;
```

**`draft` (light)**
```css
--ink:        #F3F1EC;   /* drafting paper, warm */
--surface:    #FFFFFF;
--rule:       rgba(20,22,26,0.12);
--text:       #14161A;
--text-muted: #5C6169;
--signal:     #E23D06;
--trace:      #3E5F80;
```

A **paper/light default is itself a differentiator** — the overwhelming majority of engineer portfolios are dark. Consider shipping `draft` as default and `blueprint` as the toggle. Deliberately not purple, not teal, not a gradient.

### 7.2 Typography
| Role | Primary | Alternative |
|---|---|---|
| Display | **Bricolage Grotesque** (variable width + weight — engineered but human) | Unbounded |
| Body | **Inter Tight** | Geist |
| Instrumentation | **Geist Mono** | JetBrains Mono |
| Hebrew | **Heebo** | Rubik / Ploni |

Rules: display at 2 sizes only (hero, section). Mono for every label, ID, date, and metric — this single choice creates the "instrument" feel. Body max-width `68ch`. Optical sizing on. Tabular numerals for all metrics.

### 7.3 Texture (the "cinematic" part)
- **Film grain** — a fixed, low-opacity (2–3%) tiled noise PNG or CSS-generated overlay across the whole page. This one detail does more for "cinematic" than any 3D scene.
- **Vignette** — subtle radial darkening on the hero only.
- **Halation** — a faint warm glow behind `--signal` elements (`box-shadow: 0 0 40px -10px var(--signal)`).
- **Rules over shadows** — 1px hairlines and grid registration marks instead of drop shadows. Zero `backdrop-filter`. Zero glass.
- **Registration marks** — small corner crosshairs and section IDs (`§02 / THE LOOP`) in the margins, like a technical drawing.

### 7.4 Motion system
```ts
export const ease = {
  out:   [0.16, 1, 0.30, 1],   // expo-out — default reveal
  inOut: [0.65, 0, 0.35, 1],   // transforms
  soft:  [0.33, 1, 0.68, 1],   // micro
} as const;

export const dur = { micro: 0.18, base: 0.45, reveal: 0.8, cinema: 1.4 };
```
Principles:
1. **Nothing bounces.** Confident, decelerating, slightly slow. Weight = seriousness.
2. **Stagger everything** — 40–60ms between siblings.
3. **Motion must inform.** If an animation doesn't tell the reader something (sequence, hierarchy, causality), cut it.
4. **One cinematic moment per page, maximum.** The hero, or the loop, or the architecture reveal — not all three.
5. **Route transitions** via the View Transitions API — signal colour sweep, 300ms.
6. **`prefers-reduced-motion: reduce` is a first-class layout**, not a degraded one. Pinning off, parallax off, opacity fades only, no horizontal scroll.

---

## 8. Content plan — the part that actually decides success

Design is ~30% of the outcome here. **Content is 70%.** Budget real time for this.

### 8.1 Case study template (use verbatim)

```markdown
# <Title>
<One line: what it is, for whom.>

META      Role · Timeframe (dated!) · Team · Status
NUMBERS   3–5 hard metrics, tabular

## 01 · SIGNAL — What was actually broken
The trigger. Who was hurting, how you noticed, what it cost them.
Include what you assumed at the start that turned out to be wrong.

## 02 · FRAME — Constraints and definition of done
Non-negotiables, stakeholders, what you explicitly chose NOT to solve.
The "not doing" list is the most senior paragraph in any case study.

## 03 · PLAN — How you sequenced it
The decomposition. The critical path. What you did first and why.
Artifact: the actual Gantt / task graph / roadmap. Redact if needed.

## 04 · BUILD — The system
Architecture diagram (interactive). Stack, with justification per choice.
2–3 genuinely hard problems and how you solved them.

## 05 · PROVE — How you knew it worked
Test strategy, QA workflow, what you instrumented, what you measured.

## 06 · FIELD — What reality said
Feedback quotes → the change each one caused. Failures included.

## DECISION LOG
D-01 … D-05 — decision, why, tradeoff accepted, revisit condition.

## IF I REBUILT IT TODAY
3 bullets. Non-negotiable — this is the maturity signal.
```

### 8.2 Per-project angles

**Arc — flagship.** *"I noticed instructors were solving the same problem in six different ways. So I built the seventh one — once."*
Lead the SIGNAL station. Emphasise: identifying the field need, coordinating with instructors and teams, testing workflows, iterating on feedback, adoption across large-scale programs. Get numbers: instructors onboarded, programs using it, hours saved, students touched.

**Applytide — technical depth.** *"A job search is a pipeline with terrible instrumentation. I built the instrumentation."*
Lead the BUILD and PROVE stations. Best raw material: the 3-stage extraction cascade (a genuine cost/precision tradeoff), LLM daily budget controls with Redis-backed tracking (cost engineering — very rare in a junior portfolio), 2FA + session revocation + ban system (security thinking), EN/HE with full RTL (i18n discipline), 20-model schema, 6-container topology. Note the collaborator (`tomernay`) — cross-functional credit is a senior signal.

**Eventa — product judgement.** *"Weddings put 150 strangers in a room and give them no way to meet."*
Lead the SIGNAL and FIELD stations. Emphasise the user journey definition, QR onboarding iterations, and specifically the **privacy and accessibility** decisions — those are product-maturity signals, and they're already in your CV.

**LPR & Trading System — medium.** One screen each. LPR: YOLOv11 + OCR + microservices, real-time constraints, why microservices over a monolith. Trading System: a large team project — say so, and say what *you* owned.

**The Reps.** One table. Done.

### 8.3 `/system` page — your differentiator page
Nobody applying for technical product roles has this page. It contains:
1. **The loop, explained** — 6 stations, ~150 words each, in your own words.
2. **Artifacts I produce** — requirements docs, Gantt plans, instructor guides, QA/workflow checklists, decision logs, syllabi. Show real (redacted) examples.
3. **Templates you'll give away** — 2–3 downloadable: a requirements one-pager, a decision-log template, a workflow-QA checklist.
4. **How I work with people** — how you align expectations with non-technical stakeholders. Comes straight from the Nitzanim work.

Giving away your templates is counter-intuitive and extremely effective: it proves you *systematise* delivery rather than merely execute it.

### 8.4 `/about`
Not a resume. A thesis in ~400 words: *why* a software engineer chose Industrial Engineering & Management; what teaching 650+ students taught you about requirements ("if you can't explain the requirement to a 16-year-old, the requirement isn't finished"); what you want next, stated plainly. One good photograph. Numbers block. CV in EN and HE.

---

## 9. Technical architecture

> **As built (2026-08-01).** Phases 1–6 are implemented. Three deliberate deviations from the plan below, each made to hold the §10 budget:
> 1. **No GSAP, no `motion`.** Both were installed, then removed. The site needed exactly three effects — scroll reveal, a pinned horizontal track, and a keyed fade. Those are ~60 lines of `IntersectionObserver`, a rAF scroll handler writing a CSS custom property, and a CSS keyframe. Shipping two animation libraries for that cost **~74 kB gz on the homepage** (202 → 152 kB) and ~108 kB on case studies (238 → 130 kB). The libraries were the wrong tool at this scale.
> 2. **Typed TS content instead of MDX.** The case-study format is a strict schema (stage sections, decision log, metrics, architecture graph, constraint dial). Typed content files make that schema enforced at compile time and let each block be a first-class component. MDX would have made it prose with escape hatches.
> 3. **No i18n in v1.** English ships complete; Hebrew is still Phase 7, per the plan's own risk mitigation. The Hebrew hero word is hard-coded with a proper `lang`/`dir`.

### 9.1 Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 15.5.22** App Router, React 19, TS strict | RSC keeps client JS at 128 kB on content routes |
| Styling | **Tailwind CSS v4** `@theme inline` + CSS custom props | Two first-class themes from one token set |
| Motion | **None (custom, ~60 lines)** | `IntersectionObserver` reveal + rAF scroll handler + CSS keyframes. See deviation 1 above |
| Smooth scroll | **`lenis`** | ~4 kB, never mounted under `prefers-reduced-motion` |
| Diagrams | **`@xyflow/react`** v12 | Interactive architecture graphs, orthogonal routing, MIT |
| 3D / shaders | **None** | An SVG schematic + CSS grain delivers the cinematic register at 0 kB |
| Content | **Typed TS modules** under `src/content` | See deviation 2 above |
| Fonts | `next/font` — Bricolage Grotesque, Inter Tight, JetBrains Mono, Heebo | Zero CLS, Hebrew subset for the hero |
| OG images | `next/og` (Satori) | Generated at build |
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` | Web Vitals |

```bash
npm i lenis @xyflow/react @vercel/analytics @vercel/speed-insights
```

### 9.1b Measured first-load JS (production build)

| Route | First load |
|---|---|
| `/` | **152 kB** |
| `/work` | **152 kB** |
| `/work/[slug]` | **130 kB** |
| `/about`, `/system`, `/contact`, `/budget` | **128 kB** |

Budget was < 180 kB per route. Met on every route with headroom.

### 9.2 Structure

```
src/
  app/
    [locale]/
      layout.tsx                # fonts, theme, Lenis, grain, i18n provider
      page.tsx                  # The Loop
      work/page.tsx             # stage-filtered index
      work/[slug]/page.tsx      # MDX case study
      system/page.tsx
      about/page.tsx
      contact/page.tsx
    api/og/route.tsx
    sitemap.ts · robots.ts
  components/
    loop/        Stage.tsx · Carrier.tsx · LoopRail.tsx · LoopMobile.tsx
    case/        DecisionLog.tsx · ConstraintDial.tsx · ArchitectureGraph.tsx
                 FieldFeedback.tsx · MetricBlock.tsx · ArtifactFigure.tsx
    motion/      Reveal.tsx · SplitHeading.tsx · Marquee.tsx · useReducedMotion.ts
    chrome/      Header.tsx · Footer.tsx · ThemeToggle.tsx · LocaleToggle.tsx
                 Grain.tsx · RegistrationMarks.tsx
  content/
    work/        arc.mdx · applytide.mdx · eventa.mdx · lpr.mdx · trading-system.mdx
    system/      loop.mdx · artifacts.mdx
  lib/
    stages.ts    # the six stations — single source of truth
    projects.ts  # typed registry: tier, stages[], metrics[], dates, collaborators
    motion.ts    # ease + duration tokens
    theme.ts
  styles/
    globals.css  # @theme tokens, base, utilities — rewritten from scratch
```

### 9.3 Data model (replaces `src/data/projects.ts`)

```ts
export type Stage = 'signal' | 'frame' | 'plan' | 'build' | 'prove' | 'field';
export type Tier  = 'flagship' | 'system' | 'rep';

export interface Metric { label: string; value: string; note?: string }

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  tier: Tier;
  stages: Stage[];               // drives the /work filter and the Loop links
  domain: ('product'|'platform'|'applied-ai'|'education')[];
  role: string;
  team?: string;                 // credit collaborators
  started: string;               // 'YYYY-MM' — always dated
  ended?: string;                // omit ⇒ ongoing
  status: 'live' | 'archived' | 'internal';
  metrics: Metric[];
  stack: string[];               // tertiary, never the primary axis
  links?: { repo?: string; live?: string; caseStudy?: boolean };
  media?: { poster: string; video?: string; alt: string };
}
```

### 9.4 Fixes to carry over from v1
- `params` is a `Promise` in Next.js 15 → `const { slug } = await params;`
- Rewrite `globals.css` from zero — the current file has duplicated `:root` blocks and mixes `@import "tailwindcss"` with legacy `@tailwind` directives.
- Delete the hardcoded placeholder "What I did" bullets — real content only.
- Add `sitemap.ts`, `robots.ts`, per-route `generateMetadata`, and a real `favicon`/`apple-icon`.
- Keep `public/images` + `public/videos`; re-encode demo videos to AV1/WebM with poster frames.

---

## 10. Performance & accessibility budget

Publish this **on the site** (a small footer link). A stated, met budget is itself a product-engineering artifact.

| Metric | Target |
|---|---|
| LCP (mobile, 4G) | **< 1.8s** |
| CLS | **< 0.02** |
| INP | **< 150ms** |
| First-load JS (route) | **< 180KB gz** — homepage may reach 240KB with GSAP |
| Lighthouse a11y | **100** |
| Contrast | AA minimum, AAA for body |

Guardrails:
- WebGL/shader background loaded via `next/dynamic({ ssr: false })`, mounted **after** LCP, with reserved height.
- `prefers-reduced-motion` honoured at the layout level, not per-animation.
- Every pinned/horizontal section keyboard-navigable with a skip link.
- All decorative motion `aria-hidden`. All video with poster + captions where speech exists.
- Full RTL correctness via logical properties (`margin-inline`, `padding-block`) — no `left`/`right`.
- Grain overlay via CSS, not a large PNG.

---

## 11. Build roadmap

| Phase | Scope | Exit criteria |
|---|---|---|
| **0 · Content** | Write Arc, Applytide, Eventa case studies against the §8.1 template. Collect real metrics. Gather artifacts and quotes. | 3 MDX files, ~2000 words each, every claim dated and evidenced |
| **1 · Foundation** | New `globals.css` + `@theme` tokens, both themes, fonts, grain, header/footer, `lib/stages.ts`, `lib/projects.ts`, motion tokens, reduced-motion hook, i18n scaffold | Static shell deploys; Lighthouse 100/100 with no motion |
| **2 · The Loop** | Hero (definition + self-drawing schematic), pinned horizontal loop, carrier, rail, mobile/reduced-motion fallback | Homepage complete on desktop + mobile + reduced motion |
| **3 · Evidence** | `/work` with stage filtering, three tiers, Reps ledger, project cards | Filtering works; tiers visually distinct |
| **4 · Case studies** | MDX pipeline, `DecisionLog`, `MetricBlock`, `ArtifactFigure`, `FieldFeedback`, `ArchitectureGraph` (xyflow) | Three flagships live end-to-end |
| **5 · Depth** | `/system`, `/about`, `/contact`, downloadable templates, CV EN+HE | Every route real, zero placeholder text |
| **6 · Polish** | `ConstraintDial`, View Transitions, OG images, sitemap/robots, analytics, bundle audit, budget page | §10 budget met and published |
| **7 · Optional** | `/notes`, Hebrew translation pass, one bespoke shader moment | — |

**Sequencing rule:** do **not** start Phase 2 before Phase 0 is done. A cinematic shell wrapped around thin content is the most expensive way to look junior.

---

## 12. What you need to gather (your homework)

This is the critical path. Nothing else can be finished without it.

**Numbers** (real, defensible — approximate is fine, invented is fatal)
- Arc: instructors onboarded · programs using it · students reached · time saved per instructor per week · adoption timeline
- Nitzanim: students taught (650+?) · courses built · syllabi authored · cohorts run
- Applytide: users? · extraction accuracy per stage · LLM cost per job before/after the cascade · uptime
- Eventa: events run · guests onboarded · onboarding completion rate

**Artifacts** (photograph or redact — do not skip)
- A real Gantt plan · a requirements doc · an instructor guide page · a QA/workflow checklist · an early wireframe or sketch for Arc or Eventa

**Quotes** — 3–5 from instructors, coordinators, or clients, each with *what changed because of it*. Ask them; people say yes.

**Failure stories** — 2–3 things that didn't work and what you changed. Non-optional. This is what makes the rest believable.

**Media** — screen recordings of Arc (redacted), Applytide, Eventa. 10–20s loops, no audio, high bitrate.

**Photo** — one good portrait, natural light, neutral background.

---

## 13. Risks

| Risk | Mitigation |
|---|---|
| **Thin content behind a cinematic shell** — the #1 failure mode | Phase 0 gate. No Loop until three case studies are written. |
| Arc is internal and can't be shown | Anonymise UI, use process artifacts and diagrams. A well-told internal product beats a screenshottable side project. |
| GSAP licence assumption | Verify the current licence terms at install. Fallback: `motion` + native `animation-timeline` + `split-type`. |
| Pinned horizontal scroll breaks on mobile / hurts a11y | Ship the vertical fallback **first**, then layer the pin on desktop only. |
| Over-building the 3D layer | Hard cap: one shader background. No R3F scene in v1. |
| Bilingual scope creep | Ship EN complete first. Hebrew as Phase 7, with the toggle hidden until ready. |
| Perfectionism stalling launch | Ship after Phase 5. Phases 6–7 are iterations on a live site. |

---

## 14. The one-sentence test

When someone lands on the site and leaves after 20 seconds, they should be able to say:

> **"That's the guy who owns the whole thing — from noticing the problem to fixing it after launch. And he's got a method."**

Not *"nice animations."* Not *"knows Python."*
Every decision in this plan is subordinate to that sentence.

---

*Plan generated 2026-08-01. Sources: CV, github.com/tnaydnov (10 repos, Applytide README architecture), existing Portfolio-1 codebase, and research across Codrops, Awwwards, NN/g, GSAP, Motion, Lenis, xyflow, and Next.js documentation. LinkedIn could not be fetched (login wall) — worth a manual pass to catch anything the CV omits.*
