import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/utils";

/**
 * A Pro Max–style iPhone drawn in CSS (titanium frame, thin bezel, Dynamic Island, side buttons).
 * All sizes are relative to the phone's own width, so it stays crisp at any size.
 * Pass `screen` for a still screenshot (portrait, e.g. 1320 × 2868) or `children` for custom screen content.
 */
export function PhoneMockup({
  screen,
  alt = "",
  sizes = "",
  className,
  children,
}: {
  screen?: StaticImageData;
  alt?: string;
  sizes?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cx("phone", className)}>
      <span className="phone_btn is-action" />
      <span className="phone_btn is-volume-up" />
      <span className="phone_btn is-volume-down" />
      <span className="phone_btn is-power" />
      <span className="phone_btn is-camera" />
      <div className="phone_frame">
        <div className="phone_bezel">
          <div className="phone_screen">
            {children ?? (screen && <Image src={screen} alt={alt} fill sizes={sizes} className="phone_screen-img" />)}
            <span className="phone_island" />
            <span className="phone_glare" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * iOS status bar for web content shown on the phone (app screenshots already include their own).
 * The lock screen shows the time big instead (`clock={false}`).
 */
export function PhoneStatusBar({ className, clock = true }: { className?: string; clock?: boolean }) {
  return (
    <div className={cx("phone_statusbar", className)} aria-hidden="true">
      <span>{clock && "9:41"}</span>
      <span className="phone_statusbar-icons">
        <svg viewBox="0 0 19 12">
          <rect x="0" y="8" width="3.2" height="4" rx="1" />
          <rect x="5" y="5.5" width="3.2" height="6.5" rx="1" />
          <rect x="10" y="3" width="3.2" height="9" rx="1" />
          <rect x="15" y="0" width="3.2" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 17 12">
          <path d="M8.5 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.2C13.9 1.5 11.3.5 8.5.5S3.1 1.5 1 3.5l1.2 1.2C3.9 3.1 6.1 2.2 8.5 2.2Zm0 3.4c1.5 0 2.9.6 4 1.6l1.2-1.2c-1.4-1.3-3.2-2.1-5.2-2.1s-3.8.8-5.2 2.1l1.2 1.2c1.1-1 2.5-1.6 4-1.6Zm0 3.4c.6 0 1.2.2 1.6.6L8.5 11.2 6.9 9.6c.4-.4 1-.6 1.6-.6Z" />
        </svg>
        <svg viewBox="0 0 28 13">
          <rect x=".5" y=".5" width="24" height="12" rx="3.8" fill="none" stroke="currentColor" opacity=".4" />
          <rect x="2" y="2" width="21" height="9" rx="2.5" />
          <path d="M26 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" opacity=".4" />
        </svg>
      </span>
    </div>
  );
}

/** iOS lock screen on a wallpaper in the project colour: the clock and a notification from the app. */
export function PhoneLockScreen({ app, message, className }: { app: string; message: string; className?: string }) {
  return (
    <div className={cx("lock os-wallpaper", className)} aria-hidden="true">
      <PhoneStatusBar className="is-light" clock={false} />
      <div className="lock_clock">
        <span className="lock_date">Tuesday 9 September</span>
        <span className="lock_time">9:41</span>
      </div>
      <div className="lock_note">
        <span className="app-icon">{app.charAt(0)}</span>
        <span className="lock_note-text">
          <span className="lock_note-head">
            <b>{app}</b>
            <span>now</span>
          </span>
          <span>{message}</span>
        </span>
      </div>
      <span className="lock_btn is-left">
        <svg viewBox="0 0 24 24">
          <path d="M8 3h8v3l-2 4v11h-4V10L8 6V3Z" />
        </svg>
      </span>
      <span className="lock_btn is-right">
        <svg viewBox="0 0 24 24">
          <path d="M9 5h6l1.5 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2.5L9 5Zm3 4.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
        </svg>
      </span>
      <span className="lock_home" />
    </div>
  );
}

// Back-to-front paint order for 1–3 phones: [screen index, placement]
const LAYOUTS = {
  1: [[0, "front"]],
  2: [
    [1, "back"],
    [0, "front"],
  ],
  3: [
    [1, "left"],
    [2, "right"],
    [0, "front"],
  ],
} as const;

/** One to three phones arranged on a backdrop tinted with the project colour. */
export function PhoneShowcase({
  screens,
  alt,
  sizes,
  color,
}: {
  screens: StaticImageData[];
  alt: string;
  sizes: string;
  color?: string;
}) {
  const count = Math.min(screens.length, 3) as 1 | 2 | 3;
  if (!count) return null;
  return (
    <div className="device-stage phone-showcase" style={color ? ({ "--showcase": color } as CSSProperties) : undefined}>
      {LAYOUTS[count].map(([index, placement]) => (
        <PhoneMockup
          key={index}
          screen={screens[index]}
          alt={index === 0 ? alt : ""}
          sizes={sizes}
          className={`phone-showcase_item is-${placement}`}
        />
      ))}
    </div>
  );
}
