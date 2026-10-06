/**
 * All copy, links and media for the site live here.
 * Swap these values to personalise the portfolio — components read from this file only.
 *
 * Links: "/applications" opens a page, "#contact" scrolls to a section on the current page,
 * "/#work" scrolls to a home-page section from anywhere, and "#" alone is a placeholder that does nothing.
 *
 * Still to personalise: brand.email, the LinkedIn/X links, your photo (portrait.webp is a lettermark
 * placeholder and people/aman.webp its small round version), the projects list, the toolbox and the
 * journey milestones (those are sample entries).
 *
 * The line drawings in assets/images (services, journey, trail, people...) are original artwork made
 * for this site in the blueprint palette; swap any of them for real photos of your work.
 */
import type { StaticImageData } from "next/image";

import portrait from "@/assets/images/portrait.webp";
import avatar from "@/assets/images/people/aman.webp";
import menuContact from "@/assets/images/menu-contact.webp";
import appsPlate from "@/assets/images/services/apps.webp";
import websitesPlate from "@/assets/images/services/websites.webp";
import shopifyPlate from "@/assets/images/services/shopify.webp";
import showreel from "@/assets/images/showreel.webp";
import lumen from "@/assets/images/lumen.webp";
import drift from "@/assets/images/drift.webp";
import journeyRoute from "@/assets/images/journey-route.webp";
import personJM from "@/assets/images/people/jm.webp";
import personSK from "@/assets/images/people/sk.webp";
import personRP from "@/assets/images/people/rp.webp";
import personLT from "@/assets/images/people/lt.webp";
import personNV from "@/assets/images/people/nv.webp";
import personDA from "@/assets/images/people/da.webp";
import personEC from "@/assets/images/people/ec.webp";
import personPH from "@/assets/images/people/ph.webp";
import solenceHome from "@/assets/images/sites/solence-home.webp";
import orbitHome from "@/assets/images/sites/orbit-home.webp";
import carloDesktop from "@/assets/images/sites/carlo-desktop.webp";
import carloMobile from "@/assets/images/sites/carlo-mobile.webp";
import maisonDesktop from "@/assets/images/sites/maison-desktop.webp";
import maisonMobile from "@/assets/images/sites/maison-mobile.webp";
import terraDesktop from "@/assets/images/sites/terra-desktop.webp";
import terraMobile from "@/assets/images/sites/terra-mobile.webp";
import velithDashboard from "@/assets/images/sites/velith-dashboard.webp";
import bronxHome from "@/assets/images/apps/bronx-home.webp";
import bronxProduct from "@/assets/images/apps/bronx-product.webp";
import antraSummary from "@/assets/images/apps/antra-summary.webp";
import antraWorkout from "@/assets/images/apps/antra-workout.webp";
import milestoneCode from "@/assets/images/journey/code.webp";
import milestoneWebsite from "@/assets/images/journey/website.webp";
import milestoneClient from "@/assets/images/journey/client.webp";
import milestoneStore from "@/assets/images/journey/store.webp";
import milestoneApp from "@/assets/images/journey/app.webp";
import milestoneNext from "@/assets/images/journey/next.webp";
import reactLogo from "@/assets/images/stack/react.svg";
import nextLogo from "@/assets/images/stack/nextdotjs.svg";
import figmaLogo from "@/assets/images/stack/figma.svg";
import shopifyLogo from "@/assets/images/stack/shopify.svg";
import javascriptLogo from "@/assets/images/stack/javascript.svg";
import typescriptLogo from "@/assets/images/stack/typescript.svg";
import nodeLogo from "@/assets/images/stack/nodedotjs.svg";
import gitLogo from "@/assets/images/stack/git.svg";

export type Link = { label: string; href: string };
export type Photo = { src: StaticImageData; alt: string };

const CURRENT_YEAR = new Date().getFullYear();

/* ---------------------------------------------------------------------------
 * You
 * ------------------------------------------------------------------------- */

export const brand = {
  /** Your name — used as the logo, the big hero heading, the footer and page titles. */
  name: "Aman",
  role: "Developer",
  tagline: "Developer Portfolio",
  /** Where every "Get in touch" button sends people. */
  email: "hello@example.com",
  github: "https://github.com/Aman2292",
  linkedin: "https://www.linkedin.com/",
};

export const meta = {
  title: `${brand.name} — ${brand.tagline}`,
  description: `Portfolio of ${brand.name}, a developer building mobile apps, websites and Shopify stores.`,
};

export const socials: (Link & { icon: string })[] = [
  { label: "GitHub", href: brand.github, icon: "/icons/github.svg" },
  { label: "LinkedIn", href: brand.linkedin, icon: "/icons/linkedin.svg" },
  { label: "X", href: "https://x.com", icon: "/icons/x.svg" },
];

/* ---------------------------------------------------------------------------
 * Work: each category gets its own page (/applications, /websites, ...) and a tab in the navbar.
 * Add a project by appending to `projects` with the matching `category` slug.
 * ------------------------------------------------------------------------- */

export const categories = [
  {
    slug: "applications",
    label: "Applications",
    description: "Mobile apps for iOS and Android that I've designed and built — from the first prototype to launch.",
    cover: appsPlate,
  },
  {
    slug: "websites",
    label: "Websites",
    description: "Fast, responsive websites and web apps — landing pages, business sites, dashboards and portfolios.",
    cover: websitesPlate,
  },
  {
    slug: "shopify",
    label: "Shopify",
    description: "Shopify stores, custom themes and storefront work that help brands sell online.",
    cover: shopifyPlate,
  },
  {
    slug: "personal-projects",
    label: "Personal Projects",
    description: "Experiments and side projects — the things I build to learn something new.",
    cover: lumen,
  },
] as const;

export type Category = (typeof categories)[number];
export type CategorySlug = Category["slug"];

export type ProjectPage = {
  /** Tab / page-picker label, e.g. "Home" or "Product page". */
  label: string;
  /** Full-page desktop screenshot (1440px wide works well). */
  desktop: StaticImageData;
  /** Full-page mobile screenshot (390px wide at 2x) — used by the Shopify mobile preview. */
  mobile?: StaticImageData;
};

export type Project = {
  title: string;
  category: CategorySlug;
  /**
   * How the project is shown (cards and its own page):
   *  - `screens` → iPhone (mobile apps): portrait screenshots, ideally 1320 × 2868 straight off an iPhone Pro Max
   *  - `pages`   → MacBook for websites, Shopify-style preview for Shopify stores: full-page screenshots
   *  - `image`   → a plain photo, for anything else
   */
  screens?: StaticImageData[];
  pages?: ProjectPage[];
  image?: StaticImageData;
  /** Live site, App Store page or repo (optional) — shown as a button on the project page. */
  url?: string;
  /** Shown in the browser address bar of website/store previews. */
  domain?: string;
  description: string;
  overview?: string;
  role?: string;
  tags: string[];
  year: string;
  /** Tints the project's cards and page. */
  color?: string;
};

// Sample projects — replace with your own work. Each gets a page at /<category>/<title>.
export const projects: Project[] = [
  {
    title: "Bronx",
    category: "applications",
    screens: [bronxHome, bronxProduct],
    description: "A mobile shopping app for a fashion label.",
    overview: "Fast browsing, a clean product page and a checkout designed for thumbs — built for iOS and Android from one codebase.",
    role: "Design & development",
    tags: ["iOS", "Android"],
    year: "2025",
  },
  {
    title: "Antra",
    category: "applications",
    screens: [antraSummary, antraWorkout],
    description: "A fitness companion that makes daily activity easy to read.",
    overview: "Activity rings, weekly trends and workout summaries in a calm dark interface, synced with Apple Health.",
    role: "Design & development",
    tags: ["iOS", "Health"],
    year: "2024",
    color: "#1c1c1e",
  },
  {
    title: "Velith",
    category: "websites",
    pages: [{ label: "Dashboard", desktop: velithDashboard }],
    domain: "app.velith.com",
    description: "A web app for managing bookings and clients.",
    overview: "A responsive dashboard with scheduling, client profiles and payments in one place — built for small studios.",
    role: "Front-end development",
    tags: ["Web app"],
    year: "2025",
    color: "#1b2a3a",
  },
  {
    title: "Solence",
    category: "websites",
    pages: [{ label: "Home", desktop: solenceHome }],
    domain: "solence.co",
    description: "A calm, editorial website for a clean skincare brand.",
    overview: "Soft colours, serif headlines and product rituals told through photography — designed to feel as gentle as the products.",
    role: "Design & development",
    tags: ["Landing page"],
    year: "2025",
    color: "#a4583c",
  },
  {
    title: "Orbit",
    category: "websites",
    pages: [{ label: "Home", desktop: orbitHome }],
    domain: "orbit.studio",
    description: "A dark, cinematic site for an independent creative studio.",
    overview: "Full-bleed visuals, a violet accent and case-study cards that let the work do the talking.",
    role: "Development",
    tags: ["Portfolio"],
    year: "2024",
    color: "#3a1b2a",
  },
  {
    title: "Carlo",
    category: "shopify",
    pages: [{ label: "Home page", desktop: carloDesktop, mobile: carloMobile }],
    domain: "carlo.myshopify.com",
    description: "A Shopify store for a fine jewellery brand.",
    overview: "Custom theme sections, product storytelling and a quick path to checkout on every device.",
    role: "Theme development",
    tags: ["Custom theme"],
    year: "2025",
  },
  {
    title: "Maison",
    category: "shopify",
    pages: [{ label: "Home page", desktop: maisonDesktop, mobile: maisonMobile }],
    domain: "maison.myshopify.com",
    description: "A Shopify storefront for a clothing label.",
    overview: "Seasonal collections, lookbook-style merchandising and a newsletter that drives repeat visits.",
    role: "Store setup & design",
    tags: ["Storefront"],
    year: "2025",
    color: "#2b2b2b",
  },
  {
    title: "Terra",
    category: "shopify",
    pages: [{ label: "Home page", desktop: terraDesktop, mobile: terraMobile }],
    domain: "terra.myshopify.com",
    description: "A Shopify store for mindful home goods.",
    overview: "Collection tiles, a story-led homepage and plastic-free shipping messaging throughout.",
    role: "Store setup",
    tags: ["Store setup"],
    year: "2024",
    color: "#3f4a2c",
  },
  {
    title: "Lumen",
    category: "personal-projects",
    image: lumen,
    description: "An experiment with light, motion and WebGL.",
    tags: ["Experiment"],
    year: "2025",
    color: "#1b2a3a",
  },
  {
    title: "Drift",
    category: "personal-projects",
    image: drift,
    description: "A small side project to learn something new.",
    tags: ["Side project"],
    year: "2024",
  },
];

export const projectsIn = (slug: CategorySlug) => projects.filter((project) => project.category === slug);

/** App screenshots for a category's home card (up to three, from its mobile projects); empty means use the cover photo. */
export const showcaseScreens = (slug: CategorySlug) => projectsIn(slug).flatMap((project) => project.screens ?? []).slice(0, 3);

/* ---------------------------------------------------------------------------
 * Navigation
 * ------------------------------------------------------------------------- */

export const navLinks: Link[] = [
  ...categories.map((category) => ({ label: category.label, href: `/${category.slug}` })),
  { label: "About me", href: "/about" },
  { label: "Journey", href: "/journey" },
];

export const menu = {
  links: [{ label: "Home", href: "/" }, ...navLinks, { label: "Contact", href: "#contact" }],
  buttons: [
    { label: "My journey", href: "/journey" },
    { label: "Get in touch", href: "#contact" },
  ],
  contactCard: { label: "Contact", href: "#contact", image: menuContact },
  bottomLinks: [
    { label: "Email me", href: `mailto:${brand.email}` },
    { label: "GitHub", href: brand.github },
  ],
};

/* ---------------------------------------------------------------------------
 * Home page
 * ------------------------------------------------------------------------- */

export const hero = {
  title: "Design",
  subtitle: "& Build",
  scrollNote: "Scroll to explore —",
  services: categories.map((category) => category.label),
  label: `Hi, I'm ${brand.name}`,
  subhead: "I design and build",
  rotatingWords: ["Applications.", "Websites.", "Shopify stores."],
  contact: {
    photo: { src: avatar, alt: "" } satisfies Photo,
    cta: "Contact me",
    role: "Let's build something together",
    details: [
      { label: "Email", value: brand.email, href: `mailto:${brand.email}` },
      { label: "GitHub", value: brand.github.replace("https://", ""), href: brand.github },
      { label: "LinkedIn", value: "Connect with me", href: brand.linkedin },
    ],
  },
};

export const work = {
  heading: ["Selected", "Work."],
  label: "Projects",
  text: "A selection of apps, websites and Shopify stores I've designed and built — plus a few personal experiments.",
  year: `©${String(CURRENT_YEAR).slice(2)}`,
  hoverLabel: "View work",
};

export const whyUs = {
  label: "Why work with me",
  heading: "I help founders and businesses turn ideas into polished products — with clarity and care.",
  team: {
    heading: "Great people I've worked with",
    outerRing: [personJM, personSK, personRP, personLT],
    innerRing: [personNV, personDA, personEC],
  },
  chat: {
    label: "Real-time collaboration",
    incoming: { avatar: personPH, messages: ["Hey!", "The website looks awesome", "Can we update the homepage banner?"] },
    reply: { avatar, messages: ["Hi Philip!", "Sure, I'll have it updated today"] },
  },
  process: { title: "From idea to launch, step by step", cta: { label: "Start a project", href: "#contact" } },
};

export const about = {
  quote: "“Good software feels effortless — and that takes a lot of care behind the scenes.”",
  author: brand.name,
  role: brand.role,
  label: "About me",
  heading: "I turn ideas into fast, polished apps, websites and online stores.",
  text: "From mobile apps to Shopify storefronts, I care about clean code, smooth interactions and the small details that make a product feel effortless.",
  buttons: [
    { label: "More about me", href: "/about" },
    { label: "My journey", href: "/journey" },
  ],
};

export const services = {
  title: "What I do",
  items: [
    {
      title: "Applications",
      tags: ["iOS", "Android", "Cross-platform", "App Store launch", "Prototypes"],
      photo: { src: appsPlate, alt: "Line drawing of a phone app wireframe with its 390 by 844 dimensions." },
      text: "iOS and Android apps with smooth, native-feeling UX, clean architecture and a focus on performance.",
    },
    {
      title: "Websites",
      tags: ["Landing pages", "Business sites", "Web apps", "Portfolios", "Animations"],
      photo: { src: websitesPlate, alt: "Line drawing of a website wireframe in a browser window." },
      text: "Responsive websites and web apps with thoughtful motion — built to load fast and make a great first impression.",
    },
    {
      title: "Shopify",
      tags: ["Store setup", "Custom themes", "Liquid", "Integrations", "Speed"],
      photo: { src: shopifyPlate, alt: "Line drawing of a shopping bag on a yellow grid." },
      text: "Shopify stores built and customised end to end — themes, sections and integrations that help brands sell.",
    },
  ] satisfies { title: string; tags: string[]; photo: Photo; text: string }[],
  cta: { label: "Get in touch", href: "#contact" },
};

export const showreelSection = {
  note: "Keep scrolling",
  leftHeading: `©${CURRENT_YEAR}`,
  rightHeading: "Showreel",
  playLabel: "Play showreel",
  photo: { src: showreel, alt: "Blueprint drawing of a phone, a website and a shopping bag, titled Design & Build." } satisfies Photo,
  /** Any embeddable video URL (YouTube, Vimeo...) — swap in your own reel. */
  videoEmbedUrl: "https://www.youtube.com/embed/p1CLeATYZUQ?autoplay=1&rel=0",
  videoPageUrl: "https://www.youtube.com/watch?v=p1CLeATYZUQ",
};

/** Home page "Latest projects": the newest entries from `projects`, most recent year first. */
export const latestProjects = {
  label: "Latest",
  heading: "Latest projects",
  count: 3,
  cta: { label: "View all work", href: "/#work" },
};

/* ---------------------------------------------------------------------------
 * Category pages
 * ------------------------------------------------------------------------- */

export const categoryPage = {
  label: "Projects",
  hoverLabel: "View project",
  empty: "New projects coming soon.",
  moreLabel: "More work",
};

/** The iPhone's lock screen and the MacBook's desktop show one of these, a new one every minute, in shuffled order. */
export const screenQuotes = [
  { text: "The journey of a thousand miles begins with one step.", by: "Lao Tzu" },
  { text: "Not all those who wander are lost.", by: "J.R.R. Tolkien" },
  { text: "Life is what happens to you while you're busy making other plans.", by: "John Lennon" },
  { text: "Hope is the thing with feathers.", by: "Emily Dickinson" },
  { text: "Nothing in life is to be feared, it is only to be understood.", by: "Marie Curie" },
  { text: "The unexamined life is not worth living.", by: "Socrates" },
  { text: "Try again. Fail again. Fail better.", by: "Samuel Beckett" },
  { text: "We are what we repeatedly do.", by: "Will Durant" },
  { text: "Tell me, what is it you plan to do with your one wild and precious life?", by: "Mary Oliver" },
  { text: "Imagination is more important than knowledge.", by: "Albert Einstein" },
  { text: "Well done is better than well said.", by: "Benjamin Franklin" },
  { text: "Hold fast to dreams.", by: "Langston Hughes" },
  { text: "Do. Or do not. There is no try.", by: "Yoda" },
  { text: "The only thing we have to fear is fear itself.", by: "Franklin D. Roosevelt" },
  { text: "Have no fear of perfection — you'll never reach it.", by: "Salvador Dalí" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", by: "Chinese proverb" },
  { text: "Slow and steady wins the race.", by: "Aesop" },
  { text: "The cure for anything is salt water: sweat, tears or the sea.", by: "Isak Dinesen" },
  { text: "I think, therefore I am.", by: "René Descartes" },
  { text: "Whoever is happy will make others happy too.", by: "Anne Frank" },
  { text: "The sun is new each day.", by: "Heraclitus" },
  { text: "You can't use up creativity. The more you use, the more you have.", by: "Maya Angelou" },
  { text: "Adventure is worthwhile in itself.", by: "Amelia Earhart" },
  { text: "It is not the mountain we conquer, but ourselves.", by: "Edmund Hillary" },
  { text: "Less, but better.", by: "Dieter Rams" },
  { text: "Design is thinking made visual.", by: "Saul Bass" },
  { text: "Simple can be harder than complex.", by: "Steve Jobs" },
  { text: "The details are not the details. They make the design.", by: "Charles Eames" },
  { text: "Talk is cheap. Show me the code.", by: "Linus Torvalds" },
  { text: "The best way to predict the future is to invent it.", by: "Alan Kay" },
  { text: "Make it work, make it right, make it fast.", by: "Kent Beck" },
  { text: "The only way to do great work is to love what you do.", by: "Steve Jobs" },
];

/* ---------------------------------------------------------------------------
 * About page (/about)
 * ------------------------------------------------------------------------- */

export const aboutPage = {
  heading: "About me.",
  label: `Hi, I'm ${brand.name}`,
  intro: "A developer building mobile apps, websites and Shopify stores.",
  portrait: { src: portrait, alt: `Lettermark for ${brand.name}` } satisfies Photo,
  lead: "I build digital products that look good, feel fast and are easy to use.",
  bio: [
    "I enjoy turning ideas into real products — whether that's an app people use every day, a website that makes a great first impression or a Shopify store that sells.",
    "I care about clean, maintainable code, smooth interactions and the small details that make something feel effortless. Between client projects I'm usually building something of my own and learning new tools.",
  ],
  details: [
    { label: "Focus", value: "Apps · Websites · Shopify" },
    { label: "Currently", value: "Open to new projects" },
    { label: "Email", value: brand.email, href: `mailto:${brand.email}` },
  ],
  buttons: [
    { label: "My journey", href: "/journey" },
    { label: "Get in touch", href: "#contact" },
  ],
  toolbox: {
    label: "Toolbox",
    heading: "Tools and technologies I use to bring ideas to life.",
    // Edit to match your stack.
    items: [
      { name: "JavaScript", note: "Language" },
      { name: "TypeScript", note: "Language" },
      { name: "React", note: "UI library" },
      { name: "Next.js", note: "Web framework" },
      { name: "React Native", note: "Mobile apps" },
      { name: "Node.js", note: "Backend" },
      { name: "Shopify", note: "E-commerce" },
      { name: "Liquid", note: "Shopify themes" },
      { name: "Figma", note: "Design" },
      { name: "Git", note: "Version control" },
    ],
  },
  journeyTeaser: {
    label: "Journey",
    heading: "How I got here — from my first line of code to today.",
    cta: "Explore my journey",
    href: "/journey",
    image: journeyRoute,
  },
};

/* ---------------------------------------------------------------------------
 * Journey page (/journey)
 * ------------------------------------------------------------------------- */

export type Milestone = {
  year: string;
  title: string;
  place: string;
  description: string;
  tags: string[];
  image: StaticImageData;
};

const MILESTONE_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.";

export const journey = {
  heading: "Journey.",
  label: "My story so far",
  intro: "The milestones, projects and lessons that shaped how I build today.",
  scrollNote: "Keep scrolling to travel through time —",
  // Sample milestones — replace them with your real story (oldest first).
  milestones: [
    { year: "2019", title: "Wrote my first line of code", place: "Self-taught", description: MILESTONE_TEXT, tags: ["HTML", "CSS"], image: milestoneCode },
    { year: "2020", title: "Built my first website", place: "Side project", description: MILESTONE_TEXT, tags: ["JavaScript"], image: milestoneWebsite },
    { year: "2021", title: "Landed my first client", place: "Freelance", description: MILESTONE_TEXT, tags: ["Websites"], image: milestoneClient },
    { year: "2022", title: "Launched my first Shopify store", place: "Freelance", description: MILESTONE_TEXT, tags: ["Shopify", "Liquid"], image: milestoneStore },
    { year: "2024", title: "Shipped my first app", place: "Freelance", description: MILESTONE_TEXT, tags: ["Applications"], image: milestoneApp },
    { year: "Now", title: "Building what's next", place: "Open to new projects", description: MILESTONE_TEXT, tags: ["Apps", "Websites", "Shopify"], image: milestoneNext },
  ] satisfies Milestone[],
  stats: {
    label: "In numbers",
    items: [
      { value: String(CURRENT_YEAR - 2019), suffix: "+", label: "Years building for the web" },
      { value: String(projects.length), suffix: "", label: "Projects in this portfolio" },
      { value: String(projectsIn("shopify").length), suffix: "", label: "Shopify stores launched" },
    ],
  },
};

/* ---------------------------------------------------------------------------
 * Contact section + footer (every page)
 * ------------------------------------------------------------------------- */

export const cta = {
  heading: "Let's build something together.",
  button: { label: "Get in touch", href: `mailto:${brand.email}` },
  note: "Move your mouse —",
  /** Tech-stack logos that follow the cursor over the section (tiles in assets/images/stack). */
  trail: [reactLogo, nextLogo, figmaLogo, shopifyLogo, javascriptLogo, typescriptLogo, nodeLogo, gitLogo],
};

export const footer = {
  pagesLabel: "Pages",
  pageColumns: [
    [
      { label: "Home", href: "/" },
      { label: "About me", href: "/about" },
      { label: "Journey", href: "/journey" },
    ],
    navLinks.slice(0, 2),
    navLinks.slice(2, 4),
    [{ label: "Contact", href: "#contact" }],
  ],
  contact: { label: "Say hello", email: brand.email },
  credits: [
    { label: "Built with", linkLabel: "Next.js", href: "https://nextjs.org" },
    { label: "Design by", linkLabel: "Template Supply", href: "https://www.template.supply/" },
  ],
  bottomLinks: [{ label: "Back to top", href: "#top" }],
};
