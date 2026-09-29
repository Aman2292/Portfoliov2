"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { cx } from "@/lib/utils";

/**
 * A full-page screenshot you can scroll inside a device screen (wheel, trackpad, touch or arrow keys).
 * `data-lenis-prevent` keeps the page's smooth scrolling from hijacking it.
 */
export function ScreenScroll({ shot, label, sizes, hint = true }: { shot: StaticImageData; label: string; sizes: string; hint?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  return (
    <div className="screen-scroll">
      <div
        className="screen-scroll_area"
        data-lenis-prevent
        tabIndex={0}
        aria-label={`${label} (scrollable)`}
        onScroll={(event) => !scrolled && event.currentTarget.scrollTop > 8 && setScrolled(true)}
      >
        <Image src={shot} alt={label} sizes={sizes} className="screen-scroll_img" draggable={false} />
      </div>
      {hint && (
        <span className={cx("screen-scroll_hint", scrolled && "is-hidden")} aria-hidden="true">
          <span className="screen-scroll_wheel" />
          Scroll
        </span>
      )}
    </div>
  );
}
