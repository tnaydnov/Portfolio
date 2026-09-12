# Tomer Naydnov — Project Select

A bilingual portfolio for a software engineer, technical product builder and programming instructor. A full-scene project selector turns three products into interactive 3D environments. Dark surfaces, mint/coral/lilac accents and large typography connect the homepage with the work, case and profile pages.

## Design and routes

- `/en` and `/he`: identity, three interactive product worlds, direct case links and a persistent project selector. A `?project=` URL preserves selection through reload, back navigation and language changes.
- `/[locale]/work`: four selected projects and a compact earlier-work index.
- `/[locale]/work/[slug]`: project context, ownership, status, a concise snapshot, and optional narrative/technical detail. Trading System remains in earlier work and has a complete case page.
- `/[locale]/about`: experience, education, teaching, approach and fit.
- `/[locale]/contact`: email, email copying, CV and external profiles.
- `/[locale]/system`: permanent redirect to About for older links.

English and Hebrew have separate font families and real RTL layouts. The header, footer, case studies, project illustrations, social previews, favicon and not-found pages share the same visual system. Essential content uses server-rendered HTML and ordinary links.

## The experience

`src/components/experience/ProjectScene.tsx` builds the entire scene from Three.js geometry, materials, lights and canvas-drawn lettering. Arc becomes a connected classroom environment; Applytide an opportunity pipeline; Eventa a circular guest network. No generated pictures, stock images, HDR photographs or external models are fetched.

`ProjectExperience.tsx` keeps identity, controls, lifecycle, explanations and real links in server-rendered HTML. The renderer loads separately. Selecting a project slides the next environment into view; one optional action illustrates its workflow. Rendering stops when movement settles, the page is hidden or the scene leaves view. OS reduced motion and a saved motion preference are supported. Original SVG art covers loading, unsupported WebGL and context loss. The selector appears first on phones.

Case pages include bounded product demonstrations in `PlayableCase.tsx`: Arc preserves a source lesson while producing a classroom release and a feedback-led next draft; Applytide captures a fictional opportunity into a structured record/history; Eventa previews an introduction between fictional guests. They use local, resettable state and make no network requests or submissions.

Project-cover SVGs and the social-preview image are also built in code. Decorative models and demos are labeled as illustrations; project facts remain separate and explicit.

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

The application uses Next.js 15, React 19, TypeScript, Tailwind CSS 4, Three.js and React Three Fiber. Next/font serves Space Grotesk and Manrope for English, Heebo and Rubik for Hebrew, and JetBrains Mono for code. Analytics are enabled when running on Vercel.

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

Playwright covers public routes in both languages and desktop/mobile widths, mobile-menu keyboard behavior, locale preservation, real WebGL readiness and context-loss fallback, project switching, selection persistence, reduced motion, the three product demonstrations, reading without JavaScript, email copying, case disclosures, CV delivery, social images and not-found behavior.

Tests normally start or reuse a local development server. Set `PLAYWRIGHT_SERVER_COMMAND` to `npm run start -- --hostname 127.0.0.1` to test an existing production build. Screenshots and traces from failures are stored in ignored test-output directories. Browser emulation validates layout and behavior; it is not a physical-device performance benchmark.
