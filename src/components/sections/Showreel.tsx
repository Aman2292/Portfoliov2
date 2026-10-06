"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { showreelSection as showreel } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Sticky showreel: the card grows from a small frame to full screen as you scroll, pushing the side
 * headings out of view (phones use a smaller starting frame). Clicking opens the video in a modal dialog.
 */
export function Showreel() {
  const ref = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 992px)", motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
        const root = ref.current;
        const { desktop, motion } = context.conditions as { desktop: boolean; motion: boolean };
        if (!root || !motion) return;
        const q = gsap.utils.selector(root);
        const frame = desktop
          ? { from: { width: "10vw", height: "6.5vh" }, to: { width: "100vw", height: "100vh", padding: "1.5rem" }, radius: "2rem" }
          : { from: { width: "22vw", height: "5svh" }, to: { width: "100vw", height: "100svh", padding: "0.75rem" }, radius: "1.5rem" };
        gsap
          .timeline({
            defaults: { ease: "none", duration: 1 },
            scrollTrigger: { trigger: q(".showreel_wrap")[0], start: "top top", end: "bottom bottom", scrub: true },
          })
          .fromTo(q(".showreel_lightbox"), { ...frame.from, padding: 0 }, frame.to, 0)
          .fromTo(q(".showreel_img-wrap"), { borderRadius: "0.75rem" }, { borderRadius: frame.radius }, 0)
          .fromTo(q(".showreel_img"), { scale: 1.25 }, { scale: 1 }, 0)
          .fromTo(q(".showreel_play-wrapper"), { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.65)
          .to({}, { duration: 0.15 }); // hold the full-screen frame for a moment before scrolling on
      });
    },
    { scope: ref },
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (playing && !dialog.open) {
      dialog.showModal();
      // Keep focus out of the (cross-origin) iframe so Escape still reaches the dialog.
      closeRef.current?.focus();
      lenis?.stop();
    } else if (!playing && dialog.open) {
      dialog.close();
    }
  }, [playing, lenis]);

  const open = (event: MouseEvent) => {
    event.preventDefault();
    setPlaying(true);
  };

  return (
    <section id="showreel" className="section_showreel" ref={ref}>
      <div className="showreel_wrap">
        <div className="showreel_scroll-note">{showreel.note}</div>
        <div className="showreel_sticky">
          <a
            href={showreel.videoPageUrl}
            className="showreel_lightbox w-inline-block"
            aria-haspopup="dialog"
            aria-label={showreel.playLabel}
            onClick={open}
          >
            <h2 className="showreel_heading _1" aria-hidden="true">
              {showreel.leftHeading}
            </h2>
            <div className="showreel_img-wrap">
              <Image src={showreel.photo.src} alt={showreel.photo.alt} className="showreel_img" sizes="100vw" />
              <div className="showreel_play-wrapper">
                <h2 className="showreel_play-text">{showreel.playLabel}</h2>
                <div className="showreel_play-icon-wrap">
                  <img src="/icons/play.svg" alt="" className="showreel_play-icon" />
                </div>
              </div>
            </div>
            <h2 className="showreel_heading _2" aria-hidden="true">
              {showreel.rightHeading}
            </h2>
          </a>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="video-modal"
        aria-label={showreel.rightHeading}
        onClose={() => {
          setPlaying(false);
          lenis?.start();
        }}
        // Clicks on the dialog itself (not the video) land on the backdrop area.
        onClick={(event) => event.target === event.currentTarget && setPlaying(false)}
      >
        <button ref={closeRef} type="button" className="menu_close" aria-label="Close video" onClick={() => setPlaying(false)}>
          <img src="/icons/close.svg" alt="" className="menu_close-icon" />
        </button>
        {playing && (
          <div className="video-modal_frame">
            <iframe
              src={showreel.videoEmbedUrl}
              title={showreel.rightHeading}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            />
          </div>
        )}
      </dialog>
    </section>
  );
}
