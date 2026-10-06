"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cx } from "@/lib/utils";

/*
 * A CSS 3D staircase. The floor plane is tipped back and turned (rotateX/rotateZ on the scene), so
 * translateZ is "up". Steps climb along +x; each block shows its top, its front (+y) and its riser (-x).
 */
const STEP = 56; // run of each step (x)
const DEPTH = 100; // width of the stair (y)
const CUBE = 16;
const STEPS = [
  { label: "Idea", height: 28 },
  { label: "Design", height: 58 },
  { label: "Build", height: 88 },
  { label: "Launch", height: 118 },
];
/** Unscaled width the scene is designed for; the stair is scaled to fit its box. */
const DESIGN_WIDTH = 340;

const spot = (i: number) => ({ x: i * STEP + STEP / 2 - CUBE / 2, y: DEPTH / 2 - CUBE / 2, z: STEPS[i].height });

/** "From idea to launch, step by step": a small cube hops up a 3D staircase to Launch, on a loop. */
export function ProcessStairs({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const [hopper] = q(".stairs_hopper");
      const [shadow] = q(".stairs_shadow");
      const [scene] = q(".stairs_scene");
      const tops = q(".stairs_top");

      // Keep the stair at the same proportion of its box at any size.
      const fit = () => root.style.setProperty("--fit", String(root.clientWidth / DESIGN_WIDTH));
      fit();
      const resize = new ResizeObserver(fit);
      resize.observe(root);

      const last = STEPS.length - 1;
      if (prefersReducedMotion()) {
        gsap.set([hopper, shadow], { ...spot(last), opacity: 1 });
        return () => resize.disconnect();
      }

      // The whole stair sways a little so the 3D reads.
      const sway = gsap.fromTo(scene, { "--yaw": "-52deg" }, { "--yaw": "-36deg", duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 });

      const hop = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      const start = spot(0);
      hop
        .set([hopper, shadow], { x: start.x, y: start.y })
        .set(shadow, { z: start.z + 0.5, opacity: 0, scale: 0.4 })
        .fromTo(hopper, { z: start.z + 90, opacity: 0, rotation: 0 }, { z: start.z, opacity: 1, duration: 0.7, ease: "bounce.out" })
        .to(shadow, { opacity: 1, scale: 1, duration: 0.7, ease: "power2.in" }, "<")
        .call(() => land(0));
      for (let i = 1; i <= last; i++) {
        const from = spot(i - 1), to = spot(i);
        const peak = Math.max(from.z, to.z) + 34;
        hop
          .to([hopper, shadow], { x: to.x, y: to.y, duration: 0.55, ease: "power1.inOut" }, "+=0.35")
          .to(hopper, { keyframes: [{ z: peak, duration: 0.3, ease: "power2.out" }, { z: to.z, duration: 0.25, ease: "power2.in" }] }, "<")
          .to(shadow, { scale: 0.55, opacity: 0.5, duration: 0.3, ease: "power2.out" }, "<")
          .set(shadow, { z: to.z + 0.5 }, "<0.28")
          .to(shadow, { scale: 1, opacity: 1, duration: 0.25, ease: "power2.in" }, "<")
          .call(() => land(i));
      }
      // At the top: a spin, then lift off and start again from Idea.
      hop
        .to(hopper, { rotation: 360, duration: 0.7, ease: "power2.inOut" }, "+=0.2")
        .to(hopper, { z: spot(last).z + 70, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.5")
        .to(shadow, { opacity: 0, scale: 0.4, duration: 0.5 }, "<");

      function land(i: number) {
        gsap.fromTo(tops[i], { "--flash": 1 }, { "--flash": 0, duration: 0.8, ease: "power2.out" });
      }

      // Only run while the card is on screen.
      const toggle = ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: ({ isActive }) => [sway, hop].forEach((tween) => (isActive ? tween.resume() : tween.pause())),
      });

      return () => {
        resize.disconnect();
        toggle.kill();
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cx("process-stairs", className)} aria-hidden="true">
      <div className="stairs_fit">
        <div className="stairs_scene" style={{ width: STEPS.length * STEP, height: DEPTH, left: (-STEPS.length * STEP) / 2, top: -DEPTH / 2 }}>
          {STEPS.map((step, i) => (
            <div
              key={step.label}
              className={cx("stairs_block", i === STEPS.length - 1 && "is-last")}
              style={{ left: i * STEP, width: STEP, "--h": `${step.height}px` } as CSSProperties}
            >
              <div className="stairs_riser" />
              <div className="stairs_front" />
              <div className="stairs_top">
                <span className="stairs_label">{step.label}</span>
              </div>
            </div>
          ))}
          <div className="stairs_shadow" />
          <div className="stairs_hopper">
            {/* All four sides, so the cube stays solid while it spins. */}
            <i className="stairs_cube-face is-back" />
            <i className="stairs_cube-face is-right" />
            <i className="stairs_cube-face is-left" />
            <i className="stairs_cube-face is-front" />
            <i className="stairs_cube-face is-top" />
          </div>
        </div>
      </div>
    </div>
  );
}
