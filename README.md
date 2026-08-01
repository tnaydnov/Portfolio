# Tomer Naydnov — portfolio

A bilingual, evidence-led portfolio for a software engineer and technical product builder. The site treats each project as a record: what shipped, what can be inspected, what remains internal, and what changed in the field.

## Design direction

- Real project material appears before process language.
- Eventa, Applytide, and Arc have distinct visual records rather than interchangeable cards.
- Public repositories and internal-only evidence are labelled explicitly.
- The six-stage delivery method is a compact index that connects back to concrete work.
- English and Hebrew are first-class routes with LTR/RTL layouts.

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS 4 with a custom editorial design system
- Vercel Analytics and Speed Insights

## Local development

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run build
npm run start
```

## Content structure

- `src/content/work/` — project facts, proof records, decisions, and case-study copy
- `src/content/home.ts` — bilingual homepage narrative
- `src/lib/stages.ts` — the delivery-stage model
- `src/lib/ui.ts` — shared bilingual interface copy
- `public/images/` and `public/videos/` — project evidence and media

Project claims should be traceable to a public artifact or clearly marked as internal. Quantities, dates, education status, and product status should not be inferred from marketing copy.
