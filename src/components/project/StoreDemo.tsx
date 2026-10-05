"use client";

import { useState } from "react";
import type { ProjectPage } from "@/content/site";
import { MacDesktop, MacMockup } from "@/components/ui/MacMockup";
import { PhoneLockScreen, PhoneMockup } from "@/components/ui/PhoneMockup";
import { EASE_OUT, gsap } from "@/lib/gsap";
import { DeviceDialog, OpenFullscreen, type DialogAnimation } from "./DeviceDialog";
import { ShopifyPreview } from "./ShopifyPreview";

/**
 * Full screen: the theme preview rises in, its toolbar drops into place, a loading bar sweeps across
 * (as in Shopify's admin) and the storefront fades up.
 */
const openStore: DialogAnimation = (dialog) => {
  const q = gsap.utils.selector(dialog);
  return gsap
    .timeline()
    .fromTo(q(".device-full_bg"), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
    .fromTo(q(".device-full_head, .device-full_close"), { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.08 }, 0.3)
    .fromTo(q(".device-full_store"), { y: "6vh", scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.9, ease: EASE_OUT, clearProps: "transform" }, 0.1)
    .fromTo(
      q(".shopify-preview_bar > :not(.shopify-preview_progress)"),
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out", clearProps: "transform" },
      0.45,
    )
    .fromTo(q(".shopify-preview_progress"), { opacity: 1, scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0.55)
    .to(q(".shopify-preview_progress"), { opacity: 0, duration: 0.3 })
    .fromTo(q(".shopify-preview_canvas"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: EASE_OUT, clearProps: "transform" }, "<");
};

/** ...and on close it sinks away. */
const closeStore: DialogAnimation = (dialog) => {
  const q = gsap.utils.selector(dialog);
  return gsap
    .timeline()
    .to(q("[data-chrome]"), { opacity: 0, duration: 0.25 }, 0)
    .to(q(".device-full_store"), { y: "4vh", scale: 0.97, opacity: 0, duration: 0.5, ease: "power2.in" }, 0)
    .to(q(".device-full_bg"), { opacity: 0, duration: 0.45, ease: "power2.inOut" }, 0.2);
};

/**
 * A Shopify store as a MacBook and an iPhone on their home screens, with a Shopify notification that
 * the store is live. Clicking them opens the theme preview full screen, to browse the storefront's
 * pages on desktop and mobile.
 */
export function StoreDemo({
  pages,
  domain,
  title,
  description,
  url,
}: {
  pages: ProjectPage[];
  domain: string;
  title: string;
  description: string;
  url?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="store-demo">
      <div className="store-demo_device">
        <MacMockup className="store-demo_mac">
          <MacDesktop domain={domain} message={description} sizes="(max-width: 991px) 85vw, 950px" preload />
        </MacMockup>
        <PhoneMockup className="store-demo_phone">
          <PhoneLockScreen app="Shopify" message={`${title} is live at ${domain}.`} sizes="(max-width: 767px) 25vw, 240px" preload />
        </PhoneMockup>
        <OpenFullscreen label={`Explore the ${title} store`} onClick={() => setOpen(true)}>
          <span className="if-hover">Click</span>
          <span className="if-touch">Tap</span> to explore the store
        </OpenFullscreen>
      </div>

      <DeviceDialog
        open={open}
        onClose={() => setOpen(false)}
        label={`${title} store, full screen`}
        title={title}
        meta={domain}
        enter={openStore}
        leave={closeStore}
        className="is-store"
      >
        <ShopifyPreview pages={pages} domain={domain} title={title} url={url} className="device-full_store" />
      </DeviceDialog>
    </div>
  );
}
