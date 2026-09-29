"use client";

import { useState } from "react";
import type { ProjectPage } from "@/content/site";
import { BrowserWindow } from "@/components/ui/BrowserWindow";
import { MacDesktop, MacMockup } from "@/components/ui/MacMockup";
import { ScreenScroll } from "@/components/ui/ScreenScroll";
import { EASE_OUT, gsap } from "@/lib/gsap";
import { cx } from "@/lib/utils";
import { DeviceDialog, OpenFullscreen, type DialogAnimation } from "./DeviceDialog";

/**
 * Full screen: the MacBook rises in closed, then the lid swings open and the screen wakes up.
 * Once open the lid goes flat (it only needs 3D while it moves): Chrome won't wheel-scroll the
 * page inside a preserve-3d element.
 */
const openLid: DialogAnimation = (dialog) => {
  const q = gsap.utils.selector(dialog);
  return gsap
    .timeline({
      onComplete: () => {
        gsap.set(q(".device-full_mac, .mac_lid, .mac_screen"), { clearProps: "transform,filter" });
        gsap.set(q(".mac_lid"), { transformStyle: "flat" });
      },
    })
    .fromTo(q(".device-full_bg"), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
    .fromTo(q(".device-full_head, .device-full_close"), { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.08 }, 0.3)
    .fromTo(q(".device-full_mac"), { y: "8vh", opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: EASE_OUT }, 0.1)
    .fromTo(q(".mac_lid"), { rotateX: -89 }, { rotateX: 0, duration: 1.7, ease: "power3.inOut" }, 0.6)
    .fromTo(q(".mac_screen"), { filter: "brightness(0)" }, { filter: "brightness(1)", duration: 0.9, ease: "power2.out" }, "-=0.35")
    .fromTo(q(".device-full_hint"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.4");
};

/** ...and on close the screen goes dark, the lid shuts and it all fades away. */
const closeLid: DialogAnimation = (dialog) => {
  const q = gsap.utils.selector(dialog);
  return gsap
    .timeline()
    .set(q(".mac_lid"), { transformStyle: "preserve-3d" }, 0)
    .to(q("[data-chrome]"), { opacity: 0, duration: 0.25 }, 0)
    .to(q(".mac_screen"), { filter: "brightness(0)", duration: 0.35, ease: "power2.in" }, 0)
    .to(q(".mac_lid"), { rotateX: -89, duration: 0.8, ease: "power3.in" }, 0.1)
    .to(q(".device-full_mac"), { y: "6vh", opacity: 0, duration: 0.4, ease: "power2.in" }, 0.75)
    .to(q(".device-full_bg"), { opacity: 0, duration: 0.45, ease: "power2.inOut" }, 0.75);
};

/** Safari tabs for switching between the site's pages (none for a single page). */
function PageTabs({ pages, active, onSelect, label }: { pages: ProjectPage[]; active: number; onSelect: (index: number) => void; label: string }) {
  if (pages.length < 2) return null;
  return (
    <div className="browser_tabs" role="tablist" aria-label={label}>
      {pages.map((p, i) => (
        <button
          key={p.label}
          type="button"
          role="tab"
          aria-selected={i === active}
          className={cx("browser_tab", i === active && "is-active")}
          onClick={() => onSelect(i)}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

/**
 * The website on a big MacBook, open on a macOS desktop with a notification about the site. Clicking
 * it opens the MacBook full screen, where the lid swings open onto the real page in Safari: scroll
 * inside it and switch pages with the tabs.
 */
export function MacDemo({ pages, domain, title, description }: { pages: ProjectPage[]; domain: string; title: string; description: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const page = pages[active];

  return (
    <div className="mac-demo">
      <div className="mac-demo_device">
        <MacMockup>
          <MacDesktop domain={domain} message={description} />
        </MacMockup>
        <OpenFullscreen label={`Explore the ${title} website`} onClick={() => setOpen(true)}>
          <span className="if-hover">Click</span>
          <span className="if-touch">Tap</span> to explore the site
        </OpenFullscreen>
      </div>

      <DeviceDialog
        open={open}
        onClose={() => setOpen(false)}
        label={`${title} website, full screen`}
        title={title}
        meta={domain}
        enter={openLid}
        leave={closeLid}
        className="is-mac"
      >
        <div className="device-full_stage">
          <MacMockup className="device-full_mac">
            <BrowserWindow domain={domain} tabs={<PageTabs pages={pages} active={active} onSelect={setActive} label={`${title} pages`} />} className="is-fullscreen">
              <ScreenScroll key={active} shot={page.desktop} label={`${title} — ${page.label}`} sizes="(max-width: 991px) 95vw, 82vw" />
            </BrowserWindow>
          </MacMockup>
        </div>
        <p className="device-full_hint" data-chrome>
          Scroll inside the screen{pages.length > 1 && " · switch pages with the tabs"}
        </p>
      </DeviceDialog>
    </div>
  );
}
