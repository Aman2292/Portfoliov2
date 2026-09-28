"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { menu, navLinks, socials } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { RollingLink } from "@/components/ui/RollingLink";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { externalProps } from "@/lib/utils";

export function Menu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const wasOpen = useRef(false);
  const lenis = useLenis();

  useGSAP(
    () => {
      timeline.current = gsap
        .timeline({ paused: true, defaults: { ease: EASE_OUT } })
        .set(".menu, .menu_bg-blur", { display: "block" })
        .fromTo(".menu_bg-blur", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0)
        .fromTo(".menu_in", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9 }, 0)
        .fromTo("[data-menu-item]", { y: "-2rem", opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06 }, 0.2)
        .fromTo(".menu_close", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.35);
    },
    { scope: rootRef },
  );

  useEffect(() => {
    const tl = timeline.current;
    if (!tl) return;
    if (open) {
      wasOpen.current = true;
      lenis?.stop();
      tl.timeScale(1).play();
      // Wait until the timeline has made the panel visible before moving focus into it.
      const focusFirstLink = gsap.delayedCall(0.1, () =>
        rootRef.current?.querySelector<HTMLElement>(".menu_link")?.focus({ preventScroll: true }),
      );
      const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKeyDown);
      return () => {
        focusFirstLink.kill();
        window.removeEventListener("keydown", onKeyDown);
      };
    }
    // Only undo what opening did, so we don't restart scrolling the preloader has paused.
    if (!wasOpen.current) return;
    wasOpen.current = false;
    tl.timeScale(1.6).reverse();
    lenis?.start();
    if (rootRef.current?.querySelector(".menu")?.contains(document.activeElement)) {
      toggleRef.current?.focus({ preventScroll: true });
    }
  }, [open, lenis]);

  const close = () => setOpen(false);
  // Any link inside the panel closes it; SmoothScroll then handles the in-page scroll.
  const closeOnLinkClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as Element).closest("a")) close();
  };

  return (
    <div className="menu_component" ref={rootRef}>
      <button
        ref={toggleRef}
        type="button"
        className="hamburger"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(true)}
      >
        <span className="hamburger_line _1" />
        <span className="hamburger_line _2" />
      </button>

      <div className="menu" id="site-menu" role="dialog" aria-modal="true" aria-label="Menu" onClick={closeOnLinkClick}>
        <div className="menu_in">
          <div className="menu_content">
            <div className="menu_links" data-menu-item>
              {navLinks.map((link) => (
                <RollingLink key={link.href} href={link.href} label={link.label} variant="menu" />
              ))}
            </div>

            <div className="menu_actions">
              <div className="menu_social-wrap" data-menu-item>
                <div className="menu_buttons">
                  {menu.buttons.map((button) => (
                    <Button key={button.label} href={button.href}>
                      {button.label}
                    </Button>
                  ))}
                </div>
                <div className="menu_social">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="menu_social-link w-inline-block"
                      aria-label={social.label}
                      {...externalProps(social.href)}
                    >
                      <img src={social.icon} alt="" className="menu_social-icon" />
                    </a>
                  ))}
                </div>
              </div>

              <a href={menu.contactCard.href} className="menu_contact w-inline-block" data-menu-item>
                <Image src={menu.contactCard.image} alt="" className="menu_contact-img" sizes="(max-width: 991px) 100vw, 50vw" />
                <div className="menu-contact-link">
                  <div className="menu_contact-text">{menu.contactCard.label}</div>
                  <img src="/icons/arrow-up-right.svg" alt="" className="menu_contact-arrow" />
                </div>
              </a>

              <div className="menu_legal" data-menu-item>
                {menu.bottomLinks.map((link) => (
                  <a key={link.label} href={link.href} className="menu_legal-link w-inline-block" {...externalProps(link.href)}>
                    <div className="menu_legal-text">{link.label}</div>
                    <div className="menu_legal-line grey" />
                  </a>
                ))}
              </div>
            </div>

            <button type="button" className="menu_close" aria-label="Close menu" onClick={close}>
              <img src="/icons/close.svg" alt="" className="menu_close-icon" />
            </button>
          </div>
        </div>
      </div>
      <div className="menu_bg-blur" aria-hidden="true" onClick={close} />
    </div>
  );
}
