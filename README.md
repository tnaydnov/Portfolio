# Tomer Naydnov - Personal portfolio

An English-only portfolio for a software engineer, EdTech project leader and content developer. The homepage introduces Tomer with a dimensional, animated personal portrait and direct access to his work, background, CV and contact details.

## Routes

- `/`: a personal welcome, layered portrait, current EdTech projects and a short approach.
- `/work`: four compact selected projects and an earlier-engineering index.
- `/work/[slug]`: project ownership, lifecycle, snapshot, interactive examples and optional technical detail.
- `/about`: current responsibilities, experience, education and approach.
- `/contact`: email, copy-email action, CV and external profiles.
- `/system`: permanent redirect to About.

The previous `/en` and `/he` URL prefixes permanently redirect to the equivalent English route and preserve query strings. There is no locale selector, translation layer, alternate language content or language-prefixed canonical URL. The sitemap, metadata, social preview, icon and not-found pages use the same English identity.

## The personal welcome

`src/components/welcome/WelcomeHome.tsx` introduces Tomer through a mist-and-teal technical composition. A modest greeting, role descriptions and immediate Work/About links sit beside his personal portrait; the portrait follows the greeting on small screens. `HomeDetails.tsx` connects his current role to Arc and Browser Coder, then shows his approach and a contact invitation.

`LivingPortrait.tsx` animates custom artwork based on the photo Tomer supplied. This is a **2.5D layered portrait**, not a rigged or rotatable 3D model. A shared portrait supplies the body and hand; an aligned eye layer supplies a blink. An SVG filter keys the white studio background. The Web Animations API provides a brief welcome wave, while CSS adds occasional blinking and subtle breathing. Real CSS perspective separates the portrait, backdrop and floating panels; mouse movement shifts the view through a small, eased angle.

The greeting wave plays once after the portrait loads and enters view. Visitors can replay it or pause animation. Reduced-motion preferences show a composed still portrait; the greeting button still returns a text hello. Animation pauses offscreen and in hidden tabs. Timers, observers and animations are cleaned up on unmount. There is no audio or camera/microphone access.

The introduction and all navigation/content are server-rendered and remain useful without JavaScript or a loaded portrait. Homepage artwork is served as optimized local WebP; the social preview uses a pre-sized PNG. [Asset provenance and generation prompts](public/images/README.md) are included. Product-cover SVGs remain code-native. All routes and shared chrome use the same cool mist, deep ink and teal tokens, with contained dark product graphics.

## Content and demonstrations

Content lives in `src/content/` as plain English strings and arrays. Ownership and lifecycle remain explicit:

- Arc is co-developed with another engineer. The public portal and inspected development work are distinguished.
- Browser Coder is a shared educational coding environment; Tomer contributes to embedding, debugging, execution feedback, graphics and reliability.
- Applytide is a solo-created, archived job-search platform with public source.
- Eventa is a solo-created, discontinued event-connection product with public source.
- License Plate Recognition is a five-person capstone; Tomer's part covers motion detection, data, training and fine-tuning.
- Trading System is an earlier university team contribution with a complete case page.

`PlayableCase.tsx` provides three bounded, illustrative examples: Arc preserves a source lesson while creating a classroom release and requesting a revision to student work (without changing the reusable curriculum); Applytide captures a fictional opportunity into a record and history; Eventa previews an introduction between fictional guests. These use local resettable state, without network requests or submissions.

The private, ignored `TRUTH_SOURCE.md` is the factual ledger. The September 2026 refresh uses the supplied Arc and Browser Coder product demos, authenticated repository audits and the owner’s current-role correction. LinkedIn blocked public access; its current text was not verified. `npm run truth:check` runs before production builds and rejects known blocked claims and Hebrew script in publication sources. Historical language-support facts about the original products remain in their English technical descriptions.

`public/Tomer Naydnov.pdf` is the refreshed one-page CV. `scripts/generate_cv.py` reproduces its layout from verified portfolio facts. Canonical metadata and the sitemap use `https://tomer-naydnov.com`.

## Development

Next.js 15, React 19, TypeScript and Tailwind CSS 4. Next/font serves Space Grotesk, Manrope and JetBrains Mono. Vercel enables analytics.

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

Playwright covers all public pages at 320, 390, 768, 1366 and 2560px; personal identity and immediate navigation; portrait loading, greeting replay and pause/resume; reduced motion; image failure; site-wide theme consistency and mouse-depth pause behavior; native touch scrolling; no-JavaScript navigation; the three product examples; menu focus; disclosures; clipboard; legacy redirects; metadata, CV and social images.

Tests start or reuse a server on port 3000. Set `PLAYWRIGHT_SERVER_COMMAND` to `npm run start -- --hostname 127.0.0.1` to test a production build. Temporary screenshots and traces stay in ignored QA/test-output directories. Browser emulation validates layout and behavior; it is not a physical-device performance benchmark.
