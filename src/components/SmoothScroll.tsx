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

  // Smooth-scroll links that point at a section of the current page ("#contact", or "/#about" while on "/"),
  // offset by the fixed navbar. A bare "#" is treated as a placeholder link. Links to other pages are left
  // to Next. Runs in the capture phase so preventDefault() lands before next/link's click handler.
  useEffect(() => {
    if (!lenis) return;
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      const rawHref = link?.getAttribute("href");
      if (!link || !rawHref) return;
      if (rawHref === "#") {
        event.preventDefault();
        return;
      }
      const url = new URL(rawHref, window.location.href);
      if (!url.hash || url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const target = url.hash === "#top" ? 0 : document.querySelector<HTMLElement>(url.hash);
      if (target === null) return;
      event.preventDefault();
      // Links inside the menu fire while scrolling is paused. Resume first: start() resets any
      // in-flight scroll, so calling it after scrollTo (as the menu's close does) would cut it short.
      lenis.start();
      const navHeight = document.querySelector(".navbar")?.getBoundingClientRect().height ?? 0;
      lenis.scrollTo(target, { offset: target === 0 ? 0 : -navHeight });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lenis]);

  return null;
}
