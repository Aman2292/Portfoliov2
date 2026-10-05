"use client";

import { useState, useSyncExternalStore } from "react";
import type { ProjectPage } from "@/content/site";
import { BrowserWindow } from "@/components/ui/BrowserWindow";
import { PhoneMockup, PhoneStatusBar } from "@/components/ui/PhoneMockup";
import { ScreenScroll } from "@/components/ui/ScreenScroll";
import { cx, externalProps } from "@/lib/utils";

type Device = "desktop" | "mobile";

const PHONE = "(max-width: 767px)";
const subscribePhone = (onChange: () => void) => {
  const query = window.matchMedia(PHONE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/**
 * A Shopify theme-preview style viewer: a dark top bar with the store, a page picker and a
 * desktop/mobile toggle, over a canvas showing the storefront in a browser or on an iPhone.
 */
export function ShopifyPreview({
  pages,
  domain,
  title,
  url,
  className,
}: {
  pages: ProjectPage[];
  domain: string;
  title: string;
  url?: string;
  className?: string;
}) {
  // Phones start on the mobile preview until the visitor picks a size.
  const onPhone = useSyncExternalStore(subscribePhone, () => window.matchMedia(PHONE).matches, () => false);
  const [picked, setDevice] = useState<Device | null>(null);
  const device = picked ?? (onPhone ? "mobile" : "desktop");
  const [active, setActive] = useState(0);
  const page = pages[active];

  return (
    <div className={cx("shopify-preview", className)}>
      <div className="shopify-preview_bar">
        <div className="shopify-preview_store">
          <span className="shopify-preview_icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M6 8h12l-1 12H7L6 8Z" fill="currentColor" />
              <path d="M9 8V7a3 3 0 0 1 6 0v1" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </span>
          <span className="shopify-preview_name">
            <b>{title}</b>
            <span>Theme preview</span>
          </span>
        </div>

        {pages.length > 1 ? (
          <label className="shopify-preview_page">
            <span className="sr-only">Page</span>
            <select value={active} onChange={(event) => setActive(Number(event.target.value))}>
              {pages.map((p, i) => (
                <option key={p.label} value={i}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <span className="shopify-preview_page">{page.label}</span>
        )}

        <div className="shopify-preview_devices" role="group" aria-label="Preview size">
          {(["desktop", "mobile"] as const).map((d) => (
            <button key={d} type="button" aria-pressed={device === d} aria-label={d === "desktop" ? "Desktop" : "Mobile"} onClick={() => setDevice(d)}>
              {d === "desktop" ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="7" y="2.5" width="10" height="19" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M11 18.5h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {url ? (
          <a href={url} className="shopify-preview_live" {...externalProps(url)}>
            View store
          </a>
        ) : (
          <span className="shopify-preview_live is-static">{domain}</span>
        )}
        {/* Loading bar, swept across as the preview opens (see StoreDemo). */}
        <span className="shopify-preview_progress" aria-hidden="true" />
      </div>

      <div className={cx("shopify-preview_canvas", `is-${device}`)}>
        {device === "desktop" ? (
          <BrowserWindow domain={domain} className="shopify-preview_desktop">
            <ScreenScroll key={`d${active}`} shot={page.desktop} label={`${title} — ${page.label}, desktop`} sizes="(max-width: 991px) 95vw, 1200px" />
          </BrowserWindow>
        ) : (
          <PhoneMockup className="shopify-preview_phone">
            <PhoneStatusBar />
            <div className="phone_viewport">
              <ScreenScroll key={`m${active}`} shot={page.mobile ?? page.desktop} label={`${title} — ${page.label}, mobile`} sizes="420px" />
            </div>
          </PhoneMockup>
        )}
      </div>
    </div>
  );
}
