/**
 * All copy, links and media for the site live here.
 * Swap these values to personalise the portfolio — components read from this file only.
 *
 * Links that start with "#" scroll to a section on the page ("#" alone is a placeholder that does nothing).
 */
import type { StaticImageData } from "next/image";

import contactPortrait from "@/assets/images/contact-portrait.webp";
import menuContact from "@/assets/images/menu-contact.png";
import bronx from "@/assets/images/work/bronx.webp";
import nexora from "@/assets/images/work/nexora.webp";
import carlo from "@/assets/images/work/carlo.webp";
import member1 from "@/assets/images/team/member-1.webp";
import member2 from "@/assets/images/team/member-2.webp";
import member3 from "@/assets/images/team/member-3.webp";
import member4 from "@/assets/images/team/member-4.webp";
import member5 from "@/assets/images/team/member-5.webp";
import member6 from "@/assets/images/team/member-6.webp";
import member7 from "@/assets/images/team/member-7.webp";
import avatarClient from "@/assets/images/team/avatar-client.webp";
import glass from "@/assets/images/glass.webp";
import webDesign from "@/assets/images/services/web-design.jpg";
import branding from "@/assets/images/services/branding.webp";
import contentImg from "@/assets/images/services/content.jpg";
import socialMedia from "@/assets/images/services/social-media.jpg";
import showreel from "@/assets/images/showreel.png";
import harold from "@/assets/images/testimonials/harold.jpg";
import naomi from "@/assets/images/testimonials/naomi.webp";
import faqImage from "@/assets/images/faq.jpg";
import blogDesign from "@/assets/images/blog/intentional-design.webp";
import blogRestraint from "@/assets/images/blog/visual-restraint.webp";
import blogNature from "@/assets/images/blog/raw-nature.webp";
import trail1 from "@/assets/images/trail/trail-1.webp";
import trail2 from "@/assets/images/trail/trail-2.webp";
import trail3 from "@/assets/images/trail/trail-3.webp";
import trail4 from "@/assets/images/trail/trail-4.webp";
import trail5 from "@/assets/images/trail/trail-5.webp";

export type Link = { label: string; href: string };
export type Photo = { src: StaticImageData; alt: string };

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.";

export const brand = {
  name: "Alture",
  mark: "®",
  tagline: "Creative Studio",
  logoDark: "/brand/logo-dark.svg",
  logoLight: "/brand/logo-light.svg",
  email: "mark@alture.design",
};

export const meta = {
  title: "Alture® — Creative Studio",
  description: "A bold creative studio crafting strategic, unforgettable and timeless brands, websites and content.",
};

export const socials: (Link & { icon: string })[] = [
  { label: "Instagram", href: "https://instagram.com", icon: "/icons/instagram.svg" },
  { label: "X", href: "https://x.com", icon: "/icons/x.svg" },
  { label: "Dribbble", href: "https://dribbble.com", icon: "/icons/dribbble.svg" },
];

export const work = {
  heading: ["Selected", "Work."],
  label: "Projects",
  text: LOREM,
  year: "©25",
  hoverLabel: "View work",
  projects: [
    { title: "Bronx", href: "#", image: bronx },
    { title: "Nexora", href: "#", image: nexora },
    { title: "Carlo", href: "#", image: carlo },
  ],
  cta: { label: "View all projects", href: "#" },
};

export const navLinks: (Link & { badge?: number })[] = [
  { label: "Home", href: "#top" },
  { label: "Studio", href: "#about" },
  { label: "Work", href: "#work", badge: work.projects.length },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const menu = {
  buttons: [
    { label: "View work", href: "#work" },
    { label: "Get in touch", href: "#contact" },
  ],
  contactCard: { label: "Contact", href: "#contact", image: menuContact },
  bottomLinks: [
    { label: "Email me", href: `mailto:${brand.email}` },
    { label: "Book a call", href: "https://calendly.com" },
  ],
};

export const hero = {
  title: brand.name,
  subtitle: "Studio",
  video: { src: "/videos/hero.mp4", poster: "/videos/hero-poster.jpg" },
  scrollNote: "Scroll to reveal —",
  services: ["Web design", "Branding", "Content", "Social media"],
  label: `We are ${brand.name}`,
  subhead: "Not just a studio, we are",
  rotatingWords: ["Strategic.", "Unforgettable.", "Timeless."],
  contact: {
    photo: { src: contactPortrait, alt: "A man in a black turtle neck sweater." } satisfies Photo,
    cta: "Contact Mark",
    role: "Business director at Alture®",
    details: [
      { label: "Email", value: brand.email, href: `mailto:${brand.email}` },
      { label: "Phone", value: "+1-202-555-0102", href: "tel:+1-202-555-0102" },
      { label: "Schedule a call", value: "Calendly", href: "https://calendly.com" },
    ],
  },
};

export const partners = {
  label: "Partners",
  heading: "We collaborate with forward-thinking brands to build lasting creative impact.",
  items: Array.from({ length: 8 }, (_, i) => ({
    logo: `/partners/logo-${i + 1}.svg`,
    name: "Loreipsum",
    description: "Lorem ipsum dolor sit amet, consectetur.",
  })),
};

export const whyUs = {
  label: "Why work with us",
  heading: "We help ambitious brands make their mark—with clarity and precision.",
  team: {
    heading: "A strong team of experts",
    outerRing: [member1, member2, member3, member4],
    innerRing: [member5, member6, member7],
  },
  chat: {
    label: "Real-time collaboration",
    incoming: { avatar: avatarClient, messages: ["Hey!", "The website looks awesome", "Can we update the homepage banner?"] },
    reply: { avatar: member3, messages: ["Hi Philip!", "Sure, we'll have our team on it"] },
  },
  pricing: { title: "Transparent pricing model", image: glass, cta: { label: "View pricing", href: "#pricing" } },
};

export const about = {
  video: { src: "/videos/about.mp4", poster: "/videos/about-poster.jpg" },
  quote:
    "“Great work doesn’t happen by accident. It comes from listening closely, challenging ideas, and obsessing over the details — that’s what we do every day.”",
  author: "Otto Silva",
  role: "Co-founder of Alture®",
  label: "About us",
  heading: "We’re a hands-on digital agency building thoughtful solutions for ambitious brands.",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra.",
  cta: { label: "More about us", href: "#services" },
};

export const services = {
  title: "Services",
  items: [
    {
      title: "Web design",
      tags: ["Website", "Wireframe", "Landing page", "Dashboard", "Product"],
      photo: { src: webDesign, alt: "A flat screen tv sitting on top of a wooden table." },
      text: LOREM,
    },
    {
      title: "Branding",
      tags: ["Logo", "Packaging", "Mockup", "Deck", "Visual identity", "Guidelines"],
      photo: { src: branding, alt: "A young man wearing a grey hooded jacket." },
      text: LOREM,
    },
    {
      title: "Content",
      tags: ["UX writing", "Social content", "Campaign", "Deck", "Advertising"],
      photo: { src: contentImg, alt: "A close up of a person typing on a laptop." },
      text: LOREM,
    },
    {
      title: "Social media",
      tags: ["Strategy", "Growth", "Campaign", "Posts", "Design", "Content"],
      photo: { src: socialMedia, alt: "A man and a woman standing next to each other." },
      text: LOREM,
    },
  ] satisfies { title: string; tags: string[]; photo: Photo; text: string }[],
  cta: { label: "Get in touch", href: "#contact" },
};

export const showreelSection = {
  note: "Keep scrolling",
  leftHeading: "©2025",
  rightHeading: "Showreel",
  playLabel: "Play showreel",
  photo: { src: showreel, alt: "A man standing in the middle of a dark room." } satisfies Photo,
  /** Any embeddable video URL (YouTube, Vimeo...). */
  videoEmbedUrl: "https://www.youtube.com/embed/p1CLeATYZUQ?autoplay=1&rel=0",
  videoPageUrl: "https://www.youtube.com/watch?v=p1CLeATYZUQ",
};

export const testimonials = {
  label: "Testimonials",
  heading: "What our clients are saying",
  stats: {
    title: "Some data about our clients",
    items: [
      { value: 92, label: "of our clients return for a second project" },
      { value: 87, label: "reported a stronger brand perception" },
      { value: 74, label: "saw increased engagement on digital" },
    ],
  },
  featured: {
    photo: { src: harold, alt: "A man wearing a brown coat and a brown hat." } satisfies Photo,
    quote: "“Working with Alture felt less like hiring a design agency and more like gaining a strategic partner forever.”",
    author: "Harold Mercer",
    role: "Investor at Solence®",
  },
  cards: [
    {
      quote: "“Fast, thoughtful, and deeply collaborative. Alture felt like part of our team from day one.”",
      author: "Naomi Voss",
      role: "Creative Director at",
      company: "Antra",
      avatar: naomi,
    },
    {
      quote:
        "“Alture’s work was minimal in form but rich in intention. They helped us express our brand with clarity and confidence.”",
      author: "Mark Williams",
      role: "Head of Brand at",
      company: "Velith",
      avatar: avatarClient,
    },
  ],
  /** Rolling counters. `value` is the digits that roll; prefix/suffix stay static. */
  numbers: [
    { prefix: "$", value: "43", suffix: "M", label: "Revenue influenced by our work" },
    { prefix: "", value: "87", suffix: "K", label: "Leads generated for our clients" },
    { prefix: "", value: "268", suffix: "", label: "Brands we've partnered with" },
  ],
  footnotes: [
    "1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    "2 - Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo.",
  ],
};

export const pricing = {
  label: "2 slots available",
  heading: "Pricing",
  plans: [
    {
      badge: "Affordable",
      name: "Standard",
      price: "3450",
      period: "/project",
      features: [
        ["Fast design & dev", ", built for scale"],
        ["Dedicated ", "creative team"],
        ["Average 2–3 day", " turnaround"],
        ["Ongoing ", "design-to-build support"],
        ["Fast design & dev", ", built for scale"],
      ],
      term: "2-4 weeks sprint",
      cta: { label: "Learn more", href: "#contact" },
      guarantee: "7-day money-back guarantee",
      light: false,
    },
    {
      badge: "Popular",
      name: "Pro",
      price: "6850",
      period: "/monthly",
      features: [
        ["Unlimited tasks", ", one at time"],
        ["Slack ", "channel and message"],
        ["Average 24h", " turnaround"],
        ["Ongoing ", "design-to-build support"],
        ["Branding and dev", " sprints"],
      ],
      term: "Monthly retainer",
      cta: { label: "Learn more", href: "#contact" },
      guarantee: "7-day money-back guarantee",
      light: true,
    },
  ],
  note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum.",
};

const FAQ_ANSWER =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra rutrum purus vel egestas. Phasellus ut nulla ut odio blandit pretium. Proin sit amet turpis posuere, vehicula est non, aliquet mauris.";

export const faq = {
  label: "FAQ",
  heading: "Answered questions.",
  subheading: "Everything you might want to know—up front.",
  photo: { src: faqImage, alt: "A woman in a black top with her arms crossed." } satisfies Photo,
  items: [
    { question: "What type of clients do you usually work with?", answer: FAQ_ANSWER },
    { question: "How long does a typical project take?", answer: FAQ_ANSWER },
    { question: "Do you offer ongoing support after a project ends?", answer: FAQ_ANSWER },
    { question: "How do I get started or request a proposal?", answer: FAQ_ANSWER },
  ],
};

export const blog = {
  label: "Blog",
  heading: "Latest articles",
  cta: { label: "View all", href: "#" },
  posts: [
    { title: "Nurturing brands through intentional design", date: "June 29, 2025", href: "#", image: blogDesign },
    { title: "The power of restraint in visual storytelling", date: "June 30, 2025", href: "#", image: blogRestraint },
    { title: "Balancing elegance and raw nature in brand expression", date: "July 1, 2025", href: "#", image: blogNature },
  ],
};

export const cta = {
  heading: `Start your project with ${brand.name}®`,
  button: { label: "Get in touch", href: `mailto:${brand.email}` },
  note: "Move your mouse —",
  /** Images that follow the cursor over the section. */
  trail: [trail1, trail2, trail3, trail4, trail5],
};

export const footer = {
  pagesLabel: "Pages",
  pageColumns: [
    [
      { label: "Home", href: "#top" },
      { label: "Studio", href: "#about" },
      { label: "Work", href: "#work" },
    ],
    [
      { label: "Services", href: "#services" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Pricing", href: "#pricing" },
    ],
    [
      { label: "FAQ", href: "#faq" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
  ],
  newsletter: {
    label: "Join the newsletter",
    placeholder: "Email*",
    button: "Subscribe",
    success: "Your submission has been received!",
    error: "Oops! Something went wrong while submitting the form.",
    /**
     * POST endpoint that accepts form data with an `email` field (e.g. Formspree, Buttondown, your own API).
     * Leave empty to open the visitor's mail app addressed to `brand.email` instead.
     */
    endpoint: "",
  },
  credits: [
    { label: "Built with", linkLabel: "Next.js", href: "https://nextjs.org" },
    { label: "Design by", linkLabel: "Template Supply", href: "https://www.template.supply/" },
  ],
  bottomLinks: [{ label: "Back to top", href: "#top" }],
};
