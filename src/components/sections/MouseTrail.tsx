"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SPAWN_DISTANCE = 100;

/**
 * Drops a cycling logo tile at the cursor (or finger) every 100px of movement over the parent section: it flips in
 * at a slight random angle, glides from the previous point and shrinks away.
 */
export function MouseTrail({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const layer = ref.current;
      const section = layer?.closest("section");
      if (!layer || !section || images.length === 0) return;

      const mm = gsap.matchMedia();
      // Mouse movement on desktops; a finger dragging (or scrolling) across the section on touch screens.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        images.forEach((src) => (new window.Image().src = src));

        let index = 0;
        let last: { x: number; y: number } | null = null;

        const onMove = (event: MouseEvent | TouchEvent) => {
          const source = "touches" in event ? event.touches[0] : event;
          if (!source) return;
          const point = { x: source.pageX, y: source.pageY };
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
          const tilt = gsap.utils.random(-14, 14);
          gsap
            .timeline({ onComplete: () => holder.remove() })
            .fromTo(holder, { opacity: 0 }, { opacity: 1, duration: 0.2 })
            .fromTo(holder, { x: from.x, y: from.y - scrollY }, { x: point.x, y: point.y - scrollY, duration: 0.5 }, "<")
            .fromTo(
              img,
              { rotationY: -70, rotation: tilt - 18, scale: 0.6, transformPerspective: 600 },
              { rotationY: 0, rotation: tilt, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
              "<",
            )
            .to(img, { opacity: 0, scale: 0.5, rotation: tilt + 10, duration: 0.25 });
        };
        const onLeave = () => (last = null);

        section.addEventListener("mousemove", onMove);
        section.addEventListener("mouseleave", onLeave);
        section.addEventListener("touchmove", onMove, { passive: true });
        section.addEventListener("touchend", onLeave);
        return () => {
          section.removeEventListener("mousemove", onMove);
          section.removeEventListener("mouseleave", onLeave);
          section.removeEventListener("touchmove", onMove);
          section.removeEventListener("touchend", onLeave);
          layer.replaceChildren();
        };
      });
    },
    { scope: ref },
  );

  return <div ref={ref} className="interaction_visual_wrap" aria-hidden="true" />;
}
