# Tomer Naydnov — Fold / Flow

A bilingual portfolio for a software engineer, technical product builder and programming instructor. Warm paper, cobalt, editorial typography and a code-built folding sculpture give the work a distinct identity while keeping navigation familiar.

## Design and routes

- `/en` and `/he`: introduction, interactive Fold / Flow exhibit, selected work, approach and background.
- `/[locale]/work`: four selected projects and a compact earlier-work index.
- `/[locale]/work/[slug]`: project context, ownership, status, a concise snapshot, and optional narrative/technical detail. Trading System remains in earlier work and has a complete case page.
- `/[locale]/about`: experience, education, teaching, approach and fit.
- `/[locale]/contact`: email, email copying, CV and external profiles.
- `/[locale]/system`: permanent redirect to About for older links.

English and Hebrew have separate font families and real RTL layouts. The header, footer, case studies, project illustrations, social previews, favicon and not-found pages share the same visual system. Essential content uses server-rendered HTML and ordinary links.

## The exhibit

`src/components/fold/FoldScene.tsx` creates a connected three-panel sculpture from geometry. Materials, geometric surface marks, environmental lighting and shadows are produced in code. The site does not load generated artwork, stock imagery, HDR photographs or external 3D models for its visual design.

The single unfold button is a native HTML control. The visible explanation stays outside the canvas. Rendering stops when the sculpture settles or leaves view; reduced-motion preferences select immediate state changes. A CSS-built paper silhouette covers loading, unavailable WebGL and context loss.

`FoldHome.tsx` remains a server component; only the contained exhibit is interactive. The renderer loads separately from the information layer. Project-cover artwork is original HTML/CSS and is labeled as illustration. The social-preview image is rendered from code using `next/og`.

## Content boundaries

Project content lives in `src/content/`. Ownership and lifecycle are explicit:

- Arc is co-developed with another engineer; its public portal and inspected development work are distinguished.
- Applytide is a solo-created, archived job-search platform with public source.
- Eventa is a solo-created, discontinued event-connection product with public source.
- License Plate Recognition is a five-person capstone; Tomer's contribution covers motion detection, data, training and fine-tuning.
- Trading System is a university team contribution, retained with the earlier work.

The private, git-ignored `TRUTH_SOURCE.md` is the factual ledger. `npm run truth:check` runs before every production build. Arc illustrations use fictional material; private learner records, credentials and operational data do not belong in this repository.

`public/Tomer Naydnov.pdf` is the owner's supplied CV and is served unchanged. Canonical metadata, language alternates and the sitemap use `https://tomer-naydnov.com`.

## Development

The application uses Next.js 15, React 19, TypeScript, Tailwind CSS 4, Three.js and React Three Fiber. Next/font serves Fraunces and Manrope for English, Heebo and Rubik for Hebrew, and JetBrains Mono for code. Analytics are enabled when running on Vercel.

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run truth:check
npm run lint
npx tsc --noEmit
npm run build
npx playwright install chromium
npm run test:e2e
npm audit
```

Playwright covers public routes in both languages and desktop/mobile widths, mobile-menu keyboard behavior, locale preservation, real WebGL readiness and context-loss fallback, folding, reduced motion, reading without JavaScript, email copying, case disclosures, CV delivery, social images and not-found behavior.

Tests normally start or reuse a local development server. Set `PLAYWRIGHT_SERVER_COMMAND` to `npm run start -- --hostname 127.0.0.1` to test an existing production build. Screenshots and traces from failures are stored in ignored test-output directories. Browser emulation validates layout and behavior; it is not a physical-device performance benchmark.
