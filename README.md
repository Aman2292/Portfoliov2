# Portfolio

Personal developer portfolio built with **Next.js 16** (App Router, TypeScript), based on the *Alture* Webflow template.
Smooth scrolling comes from [Lenis](https://lenis.darkroom.engineering/); animations use [GSAP](https://gsap.com/) + ScrollTrigger.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint
```

## Pages

| Route | What's on it |
| --- | --- |
| `/` | Hero, selected work (one card per category), about teaser, what I do, contact |
| `/applications`, `/websites`, `/shopify`, `/personal-projects` | Project grid for that category (one route per entry in `categories`) |
| `/about` | Bio and portrait, toolbox strip, journey teaser |
| `/journey` | Interactive timeline — pinned sideways scroll on desktop, vertical on phones — plus stats |

## Making it yours

Everything you'll want to change lives in **`src/content/site.ts`**:

- `brand` — your name (used as the logo), role, email, GitHub/LinkedIn links
- `projects` — add a project with `category: "applications" | "websites" | "shopify" | "personal-projects"`; it shows up on that page, in the counts, and gets its own page at `/<category>/<title>`. How it's demoed depends on what you give it:
  - `screens: [...]` — **mobile apps** on an iPhone Pro Max: portrait screenshots, ideally 1320 × 2868 straight off the phone. On the project page visitors swipe between screens.
  - `pages: [{ label, desktop, mobile? }]` — **websites** open on a MacBook (scroll the site inside the screen, tabs for each page); **Shopify stores** open in a theme-preview window with a desktop/mobile toggle. Use full-page screenshots: desktop ~1440px wide, mobile ~390px wide at 2× (Chrome DevTools → device toolbar → "Capture full size screenshot" does both).
  - `image` — anything else is shown as a photo.
  - `url` adds a "Visit live" / "View store" button; `domain` is what the address bar shows.
- `aboutPage` — bio, quick facts and the toolbox
- `journey.milestones` — your timeline, oldest first (the current entries are samples)
- `hero`, `about`, `services`, `cta`, `footer` — the rest of the copy

| Media | Where |
| --- | --- |
| Photos (optimised by `next/image`) | `src/assets/images/` (imported in `site.ts`) — replace `contact-portrait.webp` with your photo |
| Icons | `public/icons/` |
| Background videos | `public/videos/` |
| Favicon / home-screen icon | `src/app/icon.png`, `src/app/apple-icon.png` |

Links: `/journey` opens a page, `#contact` scrolls to a section on the current page, `/#work` scrolls to a home-page section from anywhere, and a bare `#` is a placeholder that does nothing.

## How it's put together

```
src/
  app/                 root layout (navbar, footer, preloader), pages, fonts, icons
  content/site.ts      all site content
  components/
    layout/            Navbar, NavLinks, Menu, Preloader, Footer, ProgressiveBlur
    sections/          page sections (+ client islands such as JourneyTimeline, HeroContactCard, MouseTrail)
    ui/                Button, Label, PageHeader, RollingLink, SmartLink, Wordmark, Odometer, BackgroundVideo…
    SmoothScroll.tsx   Lenis + GSAP ticker, smooth in-page anchor scrolling
    ScrollAnimations.tsx  scroll effects driven by data-* attributes (re-run on every page)
  styles/
    webflow.css        the template's stylesheet (trimmed to the classes used here)
    custom.css         hovers, marquees, pages added for the portfolio, journey timeline
```

Sections are server components; only interactive pieces are client components.
Scroll effects are declared in markup with attributes such as `data-reveal` (fade up), `data-line` (rule draws in) and `data-parallax="scale"` — see the top of `ScrollAnimations.tsx` for the full list.
Everything renders in its final state without JavaScript, and animations are skipped for visitors who prefer reduced motion.
