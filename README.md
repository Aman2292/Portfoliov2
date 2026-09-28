# Portfolio

A one-page portfolio built with **Next.js 16** (App Router, TypeScript), ported from the *Alture* Webflow template.
Smooth scrolling comes from [Lenis](https://lenis.darkroom.engineering/), and the Webflow interactions are rebuilt with [GSAP](https://gsap.com/) + ScrollTrigger.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint
```

## Making it yours

Almost everything you'll want to change lives in **`src/content/site.ts`**: names, copy, links, social profiles, projects, services, testimonials, pricing, FAQ, blog posts and the CTA email.

| What | Where |
| --- | --- |
| Text, links, section data | `src/content/site.ts` |
| Photos (optimised by `next/image`) | `src/assets/images/` (imported in `site.ts`) |
| Logos, icons, partner logos | `public/brand/`, `public/icons/`, `public/partners/` |
| Background videos | `public/videos/` |
| Favicon / home-screen icon | `src/app/icon.png`, `src/app/apple-icon.png` |
| Page title & description | `meta` in `src/content/site.ts` |

Links starting with `#` scroll to a section on the page (`#work`, `#about`, `#contact`…). A bare `#` is a placeholder that does nothing — replace those with real URLs (case studies, articles, Behance, GitHub…).

The footer newsletter posts to `footer.newsletter.endpoint` (e.g. a Formspree/Buttondown URL). If you leave it empty, submitting opens the visitor's mail app addressed to `brand.email`.

## How it's put together

```
src/
  app/                 layout (fonts, metadata), page (section order), icons, fonts/
  content/site.ts      all site content
  components/
    layout/            Navbar, Menu, Preloader, Footer, Newsletter, ProgressiveBlur
    sections/          one file per page section (+ small client islands like FaqList, Showreel)
    ui/                Button, Label, RollingLink, Odometer, BackgroundVideo, NoteMarquee
    SmoothScroll.tsx   Lenis + GSAP ticker, in-page anchor scrolling
    ScrollAnimations.tsx  scroll effects driven by data-* attributes
  styles/
    webflow.css        the template's stylesheet (trimmed to the classes used here)
    custom.css         hover states, marquees, accordion, preloader and other additions
```

Sections are server components; only interactive pieces are client components.
Scroll effects are declared in markup with attributes such as `data-reveal` (fade up), `data-line` (rule draws in) and `data-parallax="scale"` — see the comment at the top of `ScrollAnimations.tsx` for the full list.
Everything renders in its final state without JavaScript, and animations are skipped for visitors who prefer reduced motion.
