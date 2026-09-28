"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SPAWN_DISTANCE = 100;

/**
 * Drops a cycling image at the cursor every 100px of movement over the parent section,
 * gliding it from the previous point and fading it out (a port of the template's GSAP trail).
 */
export function MouseTrail({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const layer = ref.current;
      const section = layer?.closest("section");
      if (!layer || !section || images.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        images.forEach((src) => (new window.Image().src = src));

        let index = 0;
        let last: { x: number; y: number } | null = null;

        const onMove = (event: MouseEvent) => {
          const point = { x: event.pageX, y: event.pageY };
          if (!last) {
            last = point;
            return;
          }
          if (Math.abs(point.x - last.x) < SPAWN_DISTANCE && Math.abs(point.y - last.y) < SPAWN_DISTANCE) return;
          const from = last;
          last = point;

          const holder = document.createElement("div");
          holder.className = "interaction_img_wrap";
          const img = document.createElement("img");
          img.className = "interaction_img";
          img.alt = "";
          img.src = images[index++ % images.length];
          holder.append(img);
          layer.append(holder);

          // The layer is fixed, so convert page coordinates to viewport coordinates.
          const scrollY = window.scrollY;
          gsap
            .timeline({ onComplete: () => holder.remove() })
            .fromTo(holder, { opacity: 0 }, { opacity: 1, duration: 0.2 })
            .fromTo(holder, { x: from.x, y: from.y - scrollY }, { x: point.x, y: point.y - scrollY, duration: 0.5 }, "<")
            .to(img, { opacity: 0, scale: 0.6, duration: 0.2 });
        };
        const onLeave = () => (last = null);

        section.addEventListener("mousemove", onMove);
        section.addEventListener("mouseleave", onLeave);
        return () => {
          section.removeEventListener("mousemove", onMove);
          section.removeEventListener("mouseleave", onLeave);
          layer.replaceChildren();
        };
      });
    },
    { scope: ref },
  );

  return <div ref={ref} className="interaction_visual_wrap" aria-hidden="true" />;
}
