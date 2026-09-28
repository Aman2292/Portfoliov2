"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1 }}>
      <ScrollSync />
      {children}
    </ReactLenis>
  );
}

function ScrollSync() {
  const lenis = useLenis(ScrollTrigger.update);

  // Smooth-scroll in-page anchors, offset by the fixed navbar. A bare "#" is treated as a placeholder link.
  useEffect(() => {
    if (!lenis) return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href^='#']");
      const hash = link?.getAttribute("href");
      if (!hash) return;
      event.preventDefault();
      if (hash === "#") return;
      const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
      if (target === null) return;
      // Links inside the menu fire while scrolling is paused. Resume first: start() resets any
      // in-flight scroll, so calling it after scrollTo (as the menu's close does) would cut it short.
      lenis.start();
      const navHeight = document.querySelector(".navbar")?.getBoundingClientRect().height ?? 0;
      lenis.scrollTo(target, { offset: target === 0 ? 0 : -navHeight });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}
