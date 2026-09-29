"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Wordmark } from "@/components/ui/Wordmark";
import { EASE_IN_OUT, EASE_OUT, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";

/**
 * Intro curtain: the logo fades in, then the curtain lifts (dragging its striped edge along)
 * and hands over to the hero intro ([data-intro] elements). It is rendered visible on the server
 * so the page never flashes before the animation; a CSS failsafe hides it if JS never runs.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const lenis = useLenis();

  // Hold the page still while the curtain is down.
  useEffect(() => {
    if (!lenis || done) return;
    lenis.stop();
    return () => lenis.start();
  }, [lenis, done]);

  useGSAP(
    () => {
      const curtain = ref.current;
      if (!curtain) return;
      curtain.style.animation = "none";

      if (prefersReducedMotion()) {
        gsap.set(curtain, { display: "none" });
        setDone(true);
        markIntroDone();
        return;
      }

      const timeline = gsap
        .timeline({ onComplete: () => setDone(true) })
        .from(".brand_logo", { yPercent: 60, opacity: 0, duration: 0.8, ease: EASE_OUT })
        .to(".brand_logo", { yPercent: -60, opacity: 0, duration: 0.5, ease: "expo.in" }, "+=0.2")
        .to(curtain, { height: 0, y: "-20vh", duration: 1.1, ease: EASE_IN_OUT }, "-=0.15")
        .set(curtain, { display: "none" })
        .call(markIntroDone);
      // Only the home hero has intro elements.
      const intro = document.querySelectorAll("[data-intro]");
      if (intro.length) timeline.from(intro, { y: "3rem", opacity: 0, duration: 1.2, stagger: 0.1, ease: EASE_OUT }, "-=0.55");
    },
    { scope: ref },
  );

  return (
    <div className="brand_wrap" ref={ref} aria-hidden="true">
      <Wordmark className="brand_logo" />
      <img src="/brand/curtain-lines.png" alt="" className="brand_lines" />
    </div>
  );
}
