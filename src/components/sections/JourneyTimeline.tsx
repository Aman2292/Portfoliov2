"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import { useLenis } from "lenis/react";
import type { Milestone } from "@/content/site";
import { NoteMarquee } from "@/components/ui/NoteMarquee";
import { cx } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Journey timeline.
 *  - Desktop (with motion): the section pins and scrolling moves the milestones sideways. The active card
 *    lights up, a giant background year rolls to match, the progress bar fills, and the year ticks jump
 *    straight to a milestone. Cards tilt towards the cursor.
 *  - Phones/tablets: a vertical timeline whose line draws in as you scroll, lighting each milestone's dot.
 *  - No JS / reduced motion: the same vertical list, fully visible.
 */
export function JourneyTimeline({ milestones, note }: { milestones: Milestone[]; note: string }) {
  const ref = useRef<HTMLElement>(null);
  const scroller = useRef<gsap.core.Tween | null>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();

  useGSAP(
    () => {
      const root = ref.current;
      const track = root?.querySelector<HTMLElement>(".journey_track");
      const pin = root?.querySelector<HTMLElement>(".journey_pin");
      if (!root || !track || !pin) return;
      const cards = gsap.utils.toArray<HTMLElement>(".journey_card", root);

      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 992px)", motion: "(prefers-reduced-motion: no-preference)" },
        (context) => {
          const { desktop, motion } = context.conditions as { desktop: boolean; motion: boolean };
          if (!motion) return;

          if (desktop) {
            root.classList.add("is-horizontal");
            const distance = () => track.scrollWidth - window.innerWidth;
            const scrollTrigger = { trigger: pin, start: "top top", end: () => `+=${distance()}`, invalidateOnRefresh: true };

            scroller.current = gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: { ...scrollTrigger, pin: true, scrub: 1, anticipatePin: 1 },
            });
            gsap.fromTo(".journey_progress-fill", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { ...scrollTrigger, scrub: true } });

            // The card crossing the middle of the screen is the active one.
            cards.forEach((card, i) =>
              ScrollTrigger.create({
                trigger: card,
                containerAnimation: scroller.current!,
                start: "left 55%",
                end: "right 45%",
                onToggle: (self) => self.isActive && setActive(i),
              }),
            );

            return () => {
              scroller.current = null;
              root.classList.remove("is-horizontal");
            };
          }

          gsap.fromTo(
            ".journey_axis-fill",
            { scaleY: 0 },
            { scaleY: 1, ease: "none", scrollTrigger: { trigger: track, start: "top 60%", end: "bottom 60%", scrub: true } },
          );
          cards.forEach((card, i) =>
            ScrollTrigger.create({
              trigger: card,
              start: "top 60%",
              end: "bottom 60%",
              onToggle: (self) => self.isActive && setActive(i),
            }),
          );
        },
      );
    },
    { scope: ref },
  );

  // Jump to a milestone from the year ticks.
  const goTo = (index: number) => {
    const trigger = scroller.current?.scrollTrigger;
    const card = ref.current?.querySelectorAll<HTMLElement>(".journey_card")[index];
    if (!card) return;
    if (!trigger) {
      lenis?.scrollTo(card, { offset: -120 });
      return;
    }
    const target = trigger.start + card.offsetLeft + card.offsetWidth / 2 - window.innerWidth / 2;
    lenis?.scrollTo(gsap.utils.clamp(trigger.start, trigger.end, target));
  };

  // Cards lean towards the cursor.
  const tilt = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const inner = event.currentTarget.querySelector(".journey_card-inner");
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    gsap.to(inner, { rotateY: x * 10, rotateX: -y * 10, duration: 0.6, ease: "power3.out", overwrite: "auto" });
  };
  const untilt = (event: PointerEvent<HTMLElement>) =>
    gsap.to(event.currentTarget.querySelector(".journey_card-inner"), { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });

  const current = milestones[active];

  return (
    <section className="section_journey" ref={ref}>
      <div className="journey_pin">
        <div className="padding-global journey_topbar">
          <div className="journey_counter" aria-hidden="true">
            <span key={active} className="journey_counter-current">
              {pad(active + 1)}
            </span>
            <span className="journey_counter-total"> / {pad(milestones.length)}</span>
          </div>
          <div className="journey_progress">
            <div className="journey_progress-bar">
              <div className="journey_progress-fill" />
            </div>
            <div className="journey_ticks">
              {milestones.map((milestone, i) => (
                <button
                  key={i}
                  type="button"
                  className={cx("journey_tick", i === active && "is-active")}
                  style={{ left: `${(i / Math.max(milestones.length - 1, 1)) * 100}%` }}
                  aria-label={`Go to ${milestone.year}: ${milestone.title}`}
                  onClick={() => goTo(i)}
                >
                  <span className="journey_tick-dot" />
                  <span className="journey_tick-label">{milestone.year}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="journey_note">
            <NoteMarquee text={note} />
          </div>
        </div>

        <div className="journey_stage">
          <div className="journey_bg-year" aria-hidden="true">
            <span key={current.year} className="journey_bg-year-text">
              {current.year}
            </span>
          </div>

          <div className="padding-global journey_track-wrap">
            <div className="journey_rail">
              <div className="journey_axis" aria-hidden="true">
                <div className="journey_axis-fill" />
              </div>
              <ol className="journey_track">
                {milestones.map((milestone, i) => (
                  <li
                    key={i}
                    className={cx("journey_card", i === active && "is-active", i < active && "is-past")}
                    onPointerMove={tilt}
                    onPointerLeave={untilt}
                  >
                    <span className="journey_card-dot" aria-hidden="true" />
                    <article className="journey_card-inner">
                      <div className="journey_card-media">
                        <Image src={milestone.image} alt="" className="journey_card-img" sizes="(max-width: 991px) 90vw, 30rem" />
                        <span className="journey_card-year">{milestone.year}</span>
                      </div>
                      <div className="journey_card-body">
                        <div className="text-style-label journey_card-place">{milestone.place}</div>
                        <h3 className="heading-style-h5">{milestone.title}</h3>
                        <p className="text-size-small text-color-grey-500">{milestone.description}</p>
                        <div className="journey_card-tags">
                          {milestone.tags.map((tag) => (
                            <span key={tag} className="journey_tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
