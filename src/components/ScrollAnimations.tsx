"use client";

import { usePathname } from "next/navigation";
import { HERO_WORD_EVENT } from "@/components/sections/HeroBlueprint";
import { EASE_IN_OUT, EASE_OUT, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const all = (selector: string) => gsap.utils.toArray<HTMLElement>(selector);

/**
 * Recreates the template's Webflow scroll interactions from data attributes in the markup:
 *
 *   data-reveal            fades up into place when scrolled into view
 *   data-line              dotted rule draws in from the left
 *   data-parallax="scale"  media settles from 1.2x to 1x while crossing the viewport
 *   data-work-card         project card tilts up and grows to full size as it scrolls in
 *   data-spin              icon rotates with scroll progress through its section
 *   data-odometer          digit column rolls up to its final value
 *   data-rotating-words    hero words cycle on a loop (announcing each one to the hero blueprint)
 *   data-chat              chat bubbles (data-chat-step) flip in one after another
 *   data-tilt              card leans toward the pointer in 3D (mouse/trackpad only; flat on touch screens)
 *
 * The markup is always rendered in its final state; these only run with motion allowed,
 * so no-JS and reduced-motion visitors simply see the finished layout.
 */
export function ScrollAnimations() {
  // Lives in the root layout, so rebuild everything whenever a new page is shown.
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        reveals();
        lines();
        parallax();
        workCards();
        spinners();
        odometers();
        rotatingWords();
        chats();
      });
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => tilts());

      // Font swaps can shift layout after triggers are measured.
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}

function reveals() {
  const targets = all("[data-reveal]");
  if (!targets.length) return;
  gsap.set(targets, { y: "0.5rem", opacity: 0 });
  ScrollTrigger.batch(targets, {
    start: "top 90%",
    once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 1, ease: EASE_OUT, stagger: 0.1, overwrite: true }),
  });
}

function lines() {
  all("[data-line]").forEach((line) =>
    gsap.from(line, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.6,
      ease: EASE_IN_OUT,
      scrollTrigger: { trigger: line, start: "top 95%", once: true },
    }),
  );
}

function parallax() {
  all("[data-parallax='scale']").forEach((media) =>
    gsap.fromTo(
      media,
      { scale: 1.2 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: media.parentElement ?? media, start: "top bottom", end: "bottom top", scrub: true },
      },
    ),
  );
}

function workCards() {
  all("[data-work-card]").forEach((card) =>
    // Tilts back in 3D (the parent .work-list_block sets the perspective) and straightens up by mid-screen.
    gsap.fromTo(
      card,
      { rotateX: 25, scale: 0.9 },
      { rotateX: 0, scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "center center", scrub: true } },
    ),
  );
}

function spinners() {
  all("[data-spin]").forEach((icon) =>
    gsap.to(icon, {
      rotation: 360,
      ease: "none",
      scrollTrigger: { trigger: icon.closest("section") ?? icon, start: "top bottom", end: "bottom top", scrub: true },
    }),
  );
}


function odometers() {
  all(".number_wrap").forEach((counter) => {
    const columns = counter.querySelectorAll("[data-odometer]");
    if (!columns.length) return;
    // Columns sit on their final digit in CSS; start them back at the first digit and roll up.
    gsap.fromTo(
      columns,
      { y: 0, yPercent: 0 },
      {
        y: 0,
        yPercent: -100,
        duration: 2.2,
        ease: EASE_IN_OUT,
        stagger: 0.15,
        scrollTrigger: { trigger: counter, start: "top 90%", once: true },
      },
    );
  });
}

function rotatingWords() {
  all("[data-rotating-words]").forEach((list) => {
    // The last child repeats the first, so jumping back to 0 after it is invisible.
    const steps = list.children.length - 1;
    const loop = gsap.timeline({ repeat: -1 });
    // Tell the hero blueprint which word is arriving, so its selection can move with it.
    const announce = (index: number) => list.dispatchEvent(new CustomEvent(HERO_WORD_EVENT, { detail: index, bubbles: true }));
    for (let i = 1; i <= steps; i++) {
      loop.to(list, { yPercent: -100 * i, duration: 0.9, ease: EASE_IN_OUT }, "+=1.6").call(announce, [i % steps], "<");
    }
    loop.set(list, { yPercent: 0 });
  });
}

function chats() {
  // Bubbles flip up and pop in from their tail corner. Only transform/opacity animate, so their space is
  // reserved from the start and nothing below the chat ever reflows.
  const pop = { scale: 0, rotationX: -80, transformPerspective: 500, opacity: 0, duration: 0.6, ease: "back.out(1.6)" };
  all("[data-chat]").forEach((chat) => {
    const timeline = gsap.timeline({ scrollTrigger: { trigger: chat, start: "top 75%", once: true } });
    chat.querySelectorAll(".home-grid_chat-group").forEach((group) => {
      // A reply's avatar shows up before its first message.
      const avatar = group.querySelector("[data-chat-step='avatar']");
      if (avatar) timeline.from(avatar, pop, "+=0.5");
      group.querySelectorAll("[data-chat-step='message']").forEach((message) => timeline.from(message, pop, "+=0.45"));
    });
  });
}

function tilts() {
  const max = 7; // degrees at the card's edge
  const cleanups = all("[data-tilt]").map((card) => {
    gsap.set(card, { transformPerspective: 1200 });
    const tiltX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
    const tiltY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
    const move = (event: PointerEvent) => {
      const box = card.getBoundingClientRect();
      tiltY(((event.clientX - box.left) / box.width - 0.5) * 2 * max);
      tiltX(-((event.clientY - box.top) / box.height - 0.5) * 2 * max);
    };
    const leave = () => {
      tiltX(0);
      tiltY(0);
    };
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
    };
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}
