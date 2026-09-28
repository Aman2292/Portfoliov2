"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { hero } from "@/content/site";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";

/** Glass contact card: hovering (or tapping) swaps the name/title for email, phone and booking links. */
export function HeroContactCard() {
  const { contact } = hero;
  const ref = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const pointerType = useRef("mouse");
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      timeline.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.5, ease: EASE_OUT } })
        .to(".home-header_contact-texts", { height: 0, opacity: 0 })
        .fromTo(".home-header_infos", { height: 0, opacity: 0 }, { height: "auto", opacity: 1 }, "<0.1");
    },
    { scope: ref },
  );

  useEffect(() => {
    if (open) timeline.current?.play();
    else timeline.current?.reverse();
    if (!open) return;
    // Tapping anywhere else closes the card (the toggle itself is collapsed while it's open).
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const isMouse = (event: PointerEvent) => event.pointerType === "mouse";

  // Mouse users already get hover; touch taps and keyboard presses (detail === 0) toggle.
  const onClick = (event: MouseEvent) => {
    if ((event.target as Element).closest("a")) return;
    if (pointerType.current !== "mouse" || event.detail === 0) setOpen((value) => !value);
  };

  return (
    <div
      ref={ref}
      className="home-header_contact"
      onPointerDown={(event) => (pointerType.current = event.pointerType)}
      onPointerEnter={(event) => isMouse(event) && setOpen(true)}
      onPointerLeave={(event) => isMouse(event) && setOpen(false)}
      onClick={onClick}
      onKeyDown={(event) => event.key === "Escape" && setOpen(false)}
      // Close when keyboard focus moves elsewhere; taps outside are handled by the document listener above.
      onBlur={(event) => event.relatedTarget && !event.currentTarget.contains(event.relatedTarget) && setOpen(false)}
    >
      <Image src={contact.photo.src} alt={contact.photo.alt} className="home-header_contact-pic" sizes="72px" />
      <div className="home-header_contact-infos">
        <button type="button" className="home-header_contact-texts" aria-expanded={open} aria-controls="hero-contact-details">
          <span className="home-header_contact-cta">{contact.cta}</span>
          <span className="home-header_contact-text">{contact.role}</span>
        </button>
        <div className="home-header_infos" id="hero-contact-details" inert={!open}>
          <div className="home-header_infos-in">
            {contact.details.map((detail, i) => (
              <div key={detail.label} className={i === 0 ? "home-header_info first" : "home-header_info"}>
                <div className="home-header_contact-text">{detail.label}</div>
                <a href={detail.href} className="home-header_contact-link">
                  {detail.value}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="home-header_contact-dot-wrap" aria-hidden="true">
          <div className="home-header_contact-dot" />
          <div className="home-header_contact-dot-scale" />
        </div>
      </div>
    </div>
  );
}
