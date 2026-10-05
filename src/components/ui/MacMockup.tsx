import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import wallpaper from "@/assets/images/mac-wallpaper.webp";
import { cx } from "@/lib/utils";
import { AppleLogo } from "./AppleLogo";
import { BrowserWindow } from "./BrowserWindow";
import { MinuteQuote } from "./MinuteQuote";
import { PhoneMockup } from "./PhoneMockup";

/**
 * A MacBook Pro drawn in CSS: black-bezel lid with the notch, hinge and aluminium base. Scales with its width.
 * The lid has a front (screen) and back (aluminium + logo) face so it can swing open in 3D (see MacDemo).
 */
export function MacMockup({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx("mac", className)}>
      <div className="mac_lid">
        <div className="mac_lid-front">
          <div className="mac_screen">
            {/* The menu bar strip keeps the notch clear of the window, as on a real notched MacBook. */}
            <div className="mac_menubar" />
            <div className="mac_display">{children}</div>
          </div>
          <span className="mac_notch" />
        </div>
        <div className="mac_lid-back" aria-hidden="true">
          <AppleLogo className="mac_lid-logo" />
        </div>
      </div>
      <div className="mac_base">
        <span className="mac_scoop" />
      </div>
    </div>
  );
}

// Dock apps, drawn as simple glyphs over gradient tiles (the tiles are styled per app in CSS).
const DOCK: Record<string, ReactNode> = {
  finder: (
    <path d="M8.5 8.5v2.5m7-2.5v2.5M7 15c3 2.5 7 2.5 10 0" fill="none" stroke="#0b2a52" strokeWidth="1.8" strokeLinecap="round" />
  ),
  safari: (
    <>
      <circle cx="12" cy="12" r="8.5" fill="#1e8cff" />
      <path d="m12 12 4.5-4.5-3.3 5.7L12 12Z" fill="#ff3b30" />
      <path d="m12 12-4.5 4.5 3.3-5.7L12 12Z" fill="#fff" />
    </>
  ),
  messages: <path d="M12 5c-4.4 0-8 2.9-8 6.4 0 2 1.1 3.7 2.9 4.9L6 19.5l3.4-1.7c.8.2 1.7.3 2.6.3 4.4 0 8-2.9 8-6.4S16.4 5 12 5Z" fill="#fff" />,
  mail: (
    <>
      <rect x="4" y="7" width="16" height="11" rx="1.6" fill="#fff" />
      <path d="m4.6 7.8 7.4 5.4 7.4-5.4" fill="none" stroke="#1a7cf5" strokeWidth="1.4" />
    </>
  ),
  music: <path d="M16 4.5v10.2a2.6 2.6 0 1 1-1.8-2.5V8.1l-5.4 1.3v7.3a2.6 2.6 0 1 1-1.8-2.5V6.6L16 4.5Z" fill="#fff" />,
  notes: <path d="M6 12.5h12M6 16h12" stroke="#c7c7cc" strokeWidth="1.2" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="2.2 1.9" />
      <circle cx="12" cy="12" r="2.6" fill="none" stroke="#fff" strokeWidth="1.8" />
    </>
  ),
};

function DockIcon({ app, className }: { app: keyof typeof DOCK; className?: string }) {
  return (
    <span className={cx("dock-icon", `is-${app}`, className)}>
      <svg viewBox="0 0 24 24">{DOCK[app]}</svg>
    </span>
  );
}

/**
 * macOS desktop on a misty valley wallpaper: menu bar, calendar and quote widgets, a Safari
 * notification about the site and the Dock, on Apple-style frosted glass. `sizes` is for the wallpaper,
 * as wide as the screen; `preload` it when the MacBook is the first thing on the page.
 */
export function MacDesktop({ domain, message, sizes, preload }: { domain: string; message: string; sizes: string; preload?: boolean }) {
  return (
    <div className="desktop" aria-hidden="true">
      <Image src={wallpaper} alt="" fill sizes={sizes} preload={preload} className="desktop_wallpaper" />
      <div className="desktop_menubar">
        <span className="desktop_menus">
          <AppleLogo className="desktop_apple" />
          <b>Safari</b>
          {["File", "Edit", "View", "History", "Bookmarks", "Window", "Help"].map((menu) => (
            <span key={menu}>{menu}</span>
          ))}
        </span>
        <span className="desktop_menus">
          <svg viewBox="0 0 17 12">
            <path d="M8.5 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.2C13.9 1.5 11.3.5 8.5.5S3.1 1.5 1 3.5l1.2 1.2C3.9 3.1 6.1 2.2 8.5 2.2Zm0 3.4c1.5 0 2.9.6 4 1.6l1.2-1.2c-1.4-1.3-3.2-2.1-5.2-2.1s-3.8.8-5.2 2.1l1.2 1.2c1.1-1 2.5-1.6 4-1.6Zm0 3.4c.6 0 1.2.2 1.6.6L8.5 11.2 6.9 9.6c.4-.4 1-.6 1.6-.6Z" />
          </svg>
          <svg viewBox="0 0 28 13">
            <rect x=".5" y=".5" width="24" height="12" rx="3.8" fill="none" stroke="currentColor" opacity=".5" />
            <rect x="2" y="2" width="21" height="9" rx="2.5" />
            <path d="M26 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" opacity=".5" />
          </svg>
          <span>Tue 9 Sep&nbsp;&nbsp;9:41</span>
        </span>
      </div>
      <div className="desktop_widgets">
        <div className="desktop_cal glass">
          <span className="desktop_cal-day">Tuesday</span>
          <span className="desktop_cal-date">9</span>
          <span className="desktop_cal-weather">
            <svg viewBox="0 0 24 24">
              <circle cx="15" cy="8.5" r="3.4" />
              <path d="M7.2 20h9.6a3.6 3.6 0 0 0 .3-7.2 5.2 5.2 0 0 0-9.9 1.4A2.9 2.9 0 0 0 7.2 20Z" />
            </svg>
            24° Partly cloudy
          </span>
        </div>
        <MinuteQuote className="desktop_quote" />
      </div>
      <div className="desktop_note glass">
        <DockIcon app="safari" />
        <span className="desktop_note-text">
          <span className="desktop_note-head">
            <b>{domain}</b>
            <span>now</span>
          </span>
          <span>{message}</span>
        </span>
      </div>
      <div className="desktop_dock glass">
        {(Object.keys(DOCK) as (keyof typeof DOCK)[]).map((app) => (
          <DockIcon key={app} app={app} className={app === "safari" ? "is-running" : undefined} />
        ))}
      </div>
    </div>
  );
}

const tint = (color?: string) => (color ? ({ "--showcase": color } as CSSProperties) : undefined);

/** Card visual for a website: the site open in Safari on a MacBook. */
export function MacShowcase({ shot, domain, alt, sizes, color }: { shot: StaticImageData; domain: string; alt: string; sizes: string; color?: string }) {
  return (
    <div className="device-stage mac-showcase" style={tint(color)}>
      <MacMockup className="mac-showcase_mac">
        <BrowserWindow domain={domain} className="is-fullscreen">
          <Image src={shot} alt={alt} fill sizes={sizes} className="browser_shot" />
        </BrowserWindow>
      </MacMockup>
    </div>
  );
}

/** Card visual for a Shopify store: desktop storefront in a browser, with the mobile store on an iPhone. */
export function StoreShowcase({
  desktop,
  mobile,
  domain,
  alt,
  sizes,
  color,
}: {
  desktop: StaticImageData;
  mobile?: StaticImageData;
  domain: string;
  alt: string;
  sizes: string;
  color?: string;
}) {
  return (
    <div className="device-stage store-showcase" style={tint(color)}>
      <BrowserWindow domain={domain} className="store-showcase_window">
        <Image src={desktop} alt={alt} fill sizes={sizes} className="browser_shot" />
      </BrowserWindow>
      {mobile && <PhoneMockup screen={mobile} sizes="(max-width: 991px) 25vw, 10vw" className="store-showcase_phone" />}
    </div>
  );
}
