"use client";

import { useRef } from "react";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";

/** Pill that trails the cursor and expands into a label while hovering a project (desktop pointers only). */
export function WorkCursor({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 992px) and (hover: hover) and (pointer: fine)", () => {
        const pill = ref.current?.querySelector<HTMLElement>(".hover_pill");
        const textWrap = pill?.querySelector(".hover_text-wrap");
        const text = pill?.querySelector(".hover_text");
        if (!pill || !textWrap || !text) return;

        const xTo = gsap.quickTo(pill, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(pill, "y", { duration: 0.5, ease: "power3" });
        const hover = gsap
          .timeline({ paused: true, defaults: { ease: EASE_OUT } })
          .to(pill, { opacity: 1, duration: 0.3 })
          .to(textWrap, { width: "auto", duration: 0.6 }, 0)
          .to(text, { opacity: 1, duration: 0.3 }, 0.15);

        const onMove = (event: PointerEvent) => {
          xTo(event.clientX);
          yTo(event.clientY);
        };
        const show = () => hover.play();
        const hide = () => hover.reverse();
        const blocks = document.querySelectorAll("[data-work-hover]");

        window.addEventListener("pointermove", onMove);
        blocks.forEach((block) => {
          block.addEventListener("pointerenter", show);
          block.addEventListener("pointerleave", hide);
        });
        return () => {
          window.removeEventListener("pointermove", onMove);
          blocks.forEach((block) => {
            block.removeEventListener("pointerenter", show);
            block.removeEventListener("pointerleave", hide);
          });
        };
      });
    },
    { scope: ref },
  );

  return (
    <div className="hover_wrap" ref={ref} aria-hidden="true">
      <div className="hover_pill">
        <div className="hover_text-wrap">
          <div className="hover_text">{label}</div>
        </div>
      </div>
    </div>
  );
}
