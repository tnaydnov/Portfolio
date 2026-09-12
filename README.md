# Tomer Naydnov - Personal portfolio

An English-only portfolio for a software engineer, product builder and programming instructor. The homepage introduces Tomer through a sculptural typographic title, with direct access to his work, background, CV and contact details.

## Routes

- `/`: a personal title card, introduction, background and selected project links.
- `/work`: selected projects and an earlier-work index.
- `/work/[slug]`: project ownership, lifecycle, snapshot, interactive examples and optional technical detail.
- `/about`: experience, education, teaching, approach and fit.
- `/contact`: email, copy-email action, CV and external profiles.
- `/system`: permanent redirect to About.

The previous `/en` and `/he` URL prefixes permanently redirect to the equivalent English route and preserve query strings. There is no locale selector, translation layer, alternate language content or language-prefixed canonical URL. The sitemap, metadata, social preview, icon and not-found pages use the same English identity.

## The title card

`src/components/identity/IdentityScene.tsx` constructs a two-line sculptural wordmark from font outlines, extruded geometry, shaped metallic reflections and a procedural studio lighting environment. The silver lettering and midnight-blue setting form a static composition; the homepage has no interaction instructions or animation controls.

The accessible name, introduction and links are server-rendered HTML. The scene loads separately; an SVG using the same outlines provides the first paint and fallback for unsupported WebGL or context loss. Rendering is on demand: it draws the finished title, redraws on resize, and remains idle otherwise. The brief crossfade respects reduced motion, and ordinary touch scrolling and pinch zoom remain available. Scene resources are disposed on unmount.

The letter outlines are derived from Space Grotesk Bold by Florian Karsten and included directly in `wordmark.ts`. The [SIL Open Font License](public/licenses/space-grotesk-OFL.txt) is included; the scene fetches no font or model. Geometry and reflections use Three.js [ExtrudeGeometry](https://threejs.org/docs/pages/ExtrudeGeometry.html) and [PMREMGenerator](https://threejs.org/docs/pages/PMREMGenerator.html).

The site fetches no generated pictures, stock images, external 3D models or HDR photographs for its visual design. Product-cover SVGs and the social preview are also built in code.

## Content and demonstrations

Content lives in `src/content/` as plain English strings and arrays. Ownership and lifecycle remain explicit:

- Arc is co-developed with another engineer. The public portal and inspected development work are distinguished.
- Applytide is a solo-created, archived job-search platform with public source.
- Eventa is a solo-created, discontinued event-connection product with public source.
- License Plate Recognition is a five-person capstone; Tomer's part covers motion detection, data, training and fine-tuning.
- Trading System is an earlier university team contribution with a complete case page.

`PlayableCase.tsx` provides three bounded, illustrative examples: Arc preserves a source lesson while creating a classroom release and a feedback-led next draft; Applytide captures a fictional opportunity into a record and history; Eventa previews an introduction between fictional guests. These use local resettable state, without network requests or submissions.

The private, ignored `TRUTH_SOURCE.md` is the factual ledger. `npm run truth:check` runs before production builds and rejects known blocked claims and Hebrew script in publication sources. Historical language-support facts about the original products remain in their English technical descriptions.

`public/Tomer Naydnov.pdf` is the supplied CV, served unchanged. Canonical metadata and the sitemap use `https://tomer-naydnov.com`.

## Development

Next.js 15, React 19, TypeScript, Tailwind CSS 4, Three.js and React Three Fiber. Next/font serves Space Grotesk, Manrope and JetBrains Mono. Vercel enables analytics.

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

Playwright covers all public pages at 320, 390, 768, 1366 and 2560px; personal identity and immediate navigation; native touch scrolling; renderer idling and resize; reduced motion; WebGL failure and context loss; no-JavaScript navigation; the three product examples; menu focus; disclosures; clipboard; legacy redirects; metadata, CV and social images.

Tests start or reuse a server on port 3000. Set `PLAYWRIGHT_SERVER_COMMAND` to `npm run start -- --hostname 127.0.0.1` to test a production build. Temporary screenshots and traces stay in ignored QA/test-output directories. Browser emulation validates layout and behavior; it is not a physical-device performance benchmark.
