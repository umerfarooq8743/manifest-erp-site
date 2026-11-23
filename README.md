# Manifest ERP — Product Website

> **Every shipment, accounted for.**

The marketing and product-showcase website for **Manifest ERP**, the multi-company ERP for customs-clearing agents and freight forwarders. It is a separate project from the ERP itself: a fully static Next.js site with no database, no backend and no CMS. All content lives in typed data files, and inquiry forms hand off to WhatsApp.

Product content is taken from the ERP's own documentation (`DOCUMENTATION.md` / `AUDIT_REPORT.md`) and source code (roles, customs stages, report catalogue). Nothing is invented: no customers, testimonials, statistics, prices or certifications.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (all routes prerender as static) |
| `npm start` | Serve the production build |
| `npm run typecheck` | Strict TypeScript check |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm test` | Unit tests (Node's built-in test runner) |
| `npm run check` | typecheck + lint + tests |
| `npm run qa` | End-to-end browser QA against a running server (see [QA](#quality-assurance)) |
| `npm run icons` | Regenerate the SVG icon sprite after adding an icon |

Requires Node.js 20.9 or newer (developed on Node 24).

---

## Tech stack

- **Next.js 16** (App Router, Turbopack, Cache Components) — every page is statically prerendered
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS 4** — design tokens in `src/app/globals.css`
- **Framer Motion** for interactive motion (menus, tabs, accordion, lightbox, workflow tour) — reduced-motion aware, lightweight `LazyMotion` feature set
- **CSS animations** for the intro splash, scroll reveals and chart growth (no JavaScript cost)
- **Lucide** icons served from one generated SVG sprite; **Geist** / **Geist Mono** fonts (self-hosted via `next/font`)
- **Playwright Core** (dev only) for screenshot and end-to-end QA scripts

This is the *website* stack. The ERP application itself is React 18 + Vite, Node.js/Express, Prisma and PostgreSQL — the site's Technology section says so explicitly.

---

## Routes

| Route | Content |
|---|---|
| `/` | Full product overview: hero, problem → solution, interactive workflow, 16-screen product tour, dashboard, capabilities, modules, role journeys, reports, benefits, industries, security, comparison, scenario, trust section, FAQ, CTA |
| `/features` | All 18 capabilities with business benefits, dashboard, reports, comparison |
| `/modules` | All 16 modules with capabilities, value and a product preview each |
| `/solutions` | Industries served, role journeys, challenges, three illustrative scenarios |
| `/workflow` | Interactive 12-step tour, the documented 17-step flow, 14 customs stages, file statuses |
| `/security` | Security controls, request flow, multi-tenancy diagram, technology |
| `/about` | Why Manifest ERP exists, product principles, technology |
| `/contact` | Contact methods (when configured) and four WhatsApp inquiry forms |
| `/privacy`, `/terms` | Plain-language legal pages for the website |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image` | Generated SEO assets |

`/contact?inquiry=demo|general|product|partnership#inquiry` preselects a form.

---

## Editing content

All copy is in `src/data/` — components only render it.

| File | Controls |
|---|---|
| `site.ts` | **Brand**: name, tagline, descriptions, production URL, logo paths, legal name, social links, legal "last updated" date |
| `contact.ts` | **Contact details** (see below) |
| `navigation.ts` | Header and footer links, primary CTA, sitemap routes |
| `marketing.ts` | Hero copy, pillars, problems, solution-hub nodes, benefits, industries, market context, comparison, "realities" trust section |
| `features.ts` | The 18 capabilities (title, description, business benefit, icon, linked module) |
| `modules.ts` | The 16 modules |
| `workflows.ts` | 12 presentation steps, the documented 17 steps, 14 customs stages, file statuses |
| `roles.ts` | Role journeys and the Supervisor/Employee presets note |
| `reports.ts` | Report categories and examples (deliberately no hard-coded total) |
| `security.ts` | Security controls, request flow, ERP and website technology |
| `faqs.ts` | FAQ (also emitted as FAQPage structured data on the home page) |
| `scenarios.ts` | Illustrative scenarios — clearly labelled, not case studies |
| `testimonials.ts` | **Empty on purpose** — see below |
| `showcase.ts` | The 16 product-tour screens (titles and captions) |
| `demo.ts` | Fictional sample data used inside the mockups |

Icons are referenced by name (e.g. `"folder-kanban"`); an unknown name is a type error. They come from one cached sprite, `public/icons/sprite.svg`. To add a Lucide icon, add `"kebab-name": "LucideComponentName"` to `scripts/build-icons.mjs` and run `npm run icons`, which regenerates the sprite and `src/components/ui/icon-names.ts`.

`npm test` includes content checks: every feature links to a real module, all 17 documented steps are covered, there are 14 customs stages, 16 modules and 16 screens, and no unsupported claims ("100% secure", "trusted by", certifications…) appear.

### Testimonials

`src/data/testimonials.ts` is an empty list. While it is empty the site shows the **"Built for the realities of clearing & forwarding"** section instead. Add a testimonial only when the customer has approved the exact quote, name, role and company in writing; the section then switches to testimonials automatically.

---

## Contact details and WhatsApp

Verified contact details were not available, so **every contact value is empty**. Empty methods are hidden everywhere (contact page, footer, structured data) and forms show a clear "online inquiries aren't connected yet" notice instead of building a broken link.

Set them as environment variables (recommended — see `.env.example`) or edit the fallbacks in `src/data/contact.ts`:

| Variable | Format | Used for |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | International, digits only — e.g. `923001234567` | All four inquiry forms; WhatsApp card on the contact page |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `sales@yourdomain.com` | Contact page, footer, Organization structured data |
| `NEXT_PUBLIC_CONTACT_PHONE` | As displayed, e.g. `+92 21 0000 0000` | Contact page, footer, structured data |
| `NEXT_PUBLIC_BUSINESS_HOURS` | Free text | Shown under the phone number |
| `NEXT_PUBLIC_SITE_URL` | `https://www.yourdomain.com` | Canonical URLs, Open Graph, sitemap (auto-detected on Vercel) |

These are read at **build time** — redeploy after changing them.

**How the forms work** (`src/lib/inquiry.ts`, unit-tested): fields are validated in the browser; errors are announced and focus moves to the first invalid field. A valid submission opens `https://wa.me/<number>?text=…` with a professionally formatted, URL-encoded message (inquiry type, name, company, contact details, interests, message). The visitor reviews and sends it in WhatsApp. Nothing is stored or sent by the website, and the site never claims it was.

---

## Intro splash

An animated logo intro (`src/components/layout/splash.tsx`, styles in `src/app/splash.css`): the manifest sheet draws itself, fills with the brand gradient, the corner folds and the "M" is written, while twelve workflow stages light up around a ring; the wordmark and tagline follow.

- Shown on the **first page view of a browser session** (any page), for about 2.6 s. Clicking it or pressing **Esc** skips it.
- Add **`?splash`** to any URL to replay it (handy for demos), e.g. `https://yourdomain.com/?splash`.
- Never shown to visitors who ask their device for reduced motion.
- Turn it off entirely with `introSplash: false` in `src/data/site.ts`.
- On the home page, the hero's entrance animation waits for the splash to leave.

Trade-off: Lighthouse always loads pages as a first-time visitor, so it sees the intro and reports slower speed metrics with the splash on.

## Branding

- Logo: the product's own mark, as inline SVG in `src/components/ui/logo.tsx` and as files in `public/logos/manifest-mark.svg`, `src/app/icon.svg` (favicon), `src/app/apple-icon.png` and `public/icons/` (web manifest).
- Colours, type scale and the light/dark palettes: CSS variables at the top of `src/app/globals.css`. The mockup palette (`--m-*`) mirrors the ERP app's design tokens.
- Chart colours (`--c1`–`--c3`) were validated for colour-vision deficiency and contrast in both themes; re-validate if you change them.
- The share image is generated from code in `src/app/opengraph-image.tsx`.

Theme: Light / Dark / System, stored in `localStorage` under `manifest-theme` and applied by an inline script before first paint (no flash).

---

## Product mockups and screenshots

No real screenshots were available, so the 16 product screens are **coded mockups** (`src/components/mockups/`), built from the documentation with fictional data from `src/data/demo.ts`. They share one app shell (the ERP's real sidebar structure), scale with CSS container units (designed on a 1280 px canvas), follow the site theme, and are always labelled *"Illustrative preview · sample data"*.

- The hero dashboard is server-rendered; every other mockup loads on demand as it nears the viewport (one shared chunk) to keep pages fast.
- On phones, mockups zoom into the working area (sidebar hidden); the product-tour lightbox shows the full screen.

**Replacing mockups with real screenshots:** add images under `public/screenshots/` and render them with `next/image` in place of `<ProductMockup …/>` / `<LazyProductMockup …/>` (hero: `components/sections/hero.tsx`; tour: `components/sections/product-tour.tsx`; dashboard, reports and modules sections). Keep the browser frame classes from `screen-labels.ts`, give each image meaningful `alt` text, and make sure screenshots contain no real customer or financial data.

---

## SEO

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter cards (`src/lib/seo.ts`)
- JSON-LD: Organization, WebSite, SoftwareApplication (no ratings, prices or addresses), BreadcrumbList per page, FAQPage on the home page
- `sitemap.xml`, `robots.txt`, web manifest, generated share image
- Semantic landmarks, one `h1` per page, skip link

---

## Deploying to Vercel

1. Push the project to a Git repository and import it in Vercel (framework preset: **Next.js**; no build settings to change).
2. Add the environment variables above (at least `NEXT_PUBLIC_WHATSAPP_NUMBER`, plus `NEXT_PUBLIC_SITE_URL` once a custom domain is attached).
3. Deploy. Every route is static, so no server, database or paid service is needed.

Any static host that runs `next build` works as well.

---

## Quality assurance

```bash
npm run build && npx next start -p 3220          # terminal 1
BASE_URL=http://localhost:3220 npm run qa        # terminal 2
```

`scripts/qa.mjs` drives a local Chrome (`CHROME_PATH` to override) and checks every route for: HTTP status, console errors, horizontal overflow at 390/768/1024/1440/1920 px in both themes, pre-paint theme, one `h1`, title/description/canonical/Open Graph, valid JSON-LD, safe `target="_blank"` links, image `alt`, duplicate ids, unlabelled buttons/links/fields; plus the mobile menu, theme switching and persistence, FAQ, workflow tabs (incl. keyboard), product tour and lightbox, role tabs, skip link, form validation and WhatsApp behaviour. With a test build (`NEXT_PUBLIC_WHATSAPP_NUMBER=… npm run build`), run it with `EXPECT_WHATSAPP=<number>` to verify the redirect URL and message.

Other helpers: `scripts/screenshot.mjs` (chunked full-page screenshots), `scripts/state-shots.mjs` (menu, lightbox and form states), `scripts/splash-shots.mjs` (splash frames at fixed animation times), `scripts/trace.mjs` (CPU-throttled performance trace), `scripts/dom-budget.mjs` (DOM size per section).

### Results (23 Nov 2026, local production build)

- TypeScript strict: no errors · ESLint: no warnings · Unit tests: 20 / 20
- Production build: 19 static routes
- End-to-end QA: **408 / 408** checks — including scroll reveals, sprite icons and the intro splash (first visit, Esc, once per session, `?splash`, reduced motion). Separately, 266 / 266 with a test WhatsApp number, after which the site was rebuilt without it.
- Lighthouse — Accessibility 100, Best Practices 100, SEO 100 on every page measured (desktop and mobile).
- Lighthouse Performance, home page, **before the splash was added**: desktop 99–100; mobile 68–75. After the performance pass (sprite icons, CSS-only reveals and charts) the home page HTML went from 589 KB to 497 KB and the initial DOM from 3,005 to 2,481 nodes. With the splash on, Lighthouse measures the intro as part of the load, so scores drop (one run: desktop 77, mobile 55 — on a heavily loaded machine whose CPU benchmark was about half its normal value, so treat these as rough). Measure on the deployed site, with and without `introSplash`, before deciding.

## Known limitations

- **Contact details are not configured** — forms show a notice until `NEXT_PUBLIC_WHATSAPP_NUMBER` is set.
- Product visuals are illustrative mockups, not screenshots of the live application.
- Mobile Lighthouse performance is below 90 on the home page, and lower with the intro splash on (see above). Turning the splash off and trimming home-page sections are the main remaining levers.
- Privacy Policy and Terms describe how this website works; have them reviewed by counsel before relying on them.
- The production domain, legal entity name and social profiles are placeholders in `src/data/site.ts` until confirmed.
