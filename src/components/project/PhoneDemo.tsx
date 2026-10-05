"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { AppleLogo } from "@/components/ui/AppleLogo";
import { PhoneLockScreen, PhoneMockup } from "@/components/ui/PhoneMockup";
import { ScreenScroll } from "@/components/ui/ScreenScroll";
import { EASE_OUT, gsap } from "@/lib/gsap";
import { cx } from "@/lib/utils";
import { DeviceDialog, flipVars, OpenFullscreen, type DialogAnimation } from "./DeviceDialog";

const pad = (n: number) => String(n).padStart(2, "0");

const SCREEN_SIZES = "(max-width: 767px) 80vw, 460px";

/** Horizontal swipes (touch or mouse drag) of 50px or more. */
function useSwipe(onSwipe: (step: 1 | -1) => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  return {
    onPointerDown: (event: PointerEvent) => (start.current = { x: event.clientX, y: event.clientY }),
    onPointerUp: (event: PointerEvent) => {
      const from = start.current;
      start.current = null;
      if (!from) return;
      const dx = event.clientX - from.x;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(event.clientY - from.y)) onSwipe(dx < 0 ? 1 : -1);
    },
    onPointerCancel: () => (start.current = null),
  };
}

/** A phone booting up: the app on screen fades to black, the Apple logo shows, then the app launches. */
function bootUp(phone: Element) {
  const q = gsap.utils.selector(phone);
  const [boot] = q(".phone-boot");
  return (
    gsap
      .timeline()
      .set(boot, { display: "grid" }, 0)
      .fromTo(boot, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.in", immediateRender: false }, 0)
      .fromTo(q(".phone-boot_logo"), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 0.7)
      .to(q(".phone-boot_logo"), { opacity: 0, duration: 0.45, ease: "power2.in" }, "+=1.1")
      .to(boot, { opacity: 0, duration: 0.5 }, "+=0.2")
      // Launch the wrapper, not the track: GSAP would fold the track's CSS `translate` (the current screen) into its transform.
      .fromTo(q(".phone-demo_screens"), { scale: 1.12, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: EASE_OUT, immediateRender: false }, "<")
      .set(boot, { display: "none" })
  );
}

/**
 * The app on a big iPhone that leans towards the cursor, showing its lock screen. Clicking it grows
 * the phone to full screen, where it boots up (Apple logo on black, then the app launches); then
 * each screen scrolls, and a corner panel, swipes or the arrow keys switch between them.
 */
export function PhoneDemo({ screens, title, description }: { screens: StaticImageData[]; title: string; description: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const device = useRef<HTMLDivElement>(null);
  const count = screens.length;
  const go = (next: number) => setIndex((next + count) % count);
  const swipe = useSwipe((step) => count > 1 && go(index + step));

  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    const el = stage.current;
    if (!el || event.pointerType !== "mouse") return;
    const box = el.getBoundingClientRect();
    el.style.setProperty("--ry", `${((event.clientX - box.left) / box.width - 0.5) * 14}deg`);
    el.style.setProperty("--rx", `${((event.clientY - box.top) / box.height - 0.5) * -10}deg`);
  };
  const untilt = () => {
    stage.current?.style.setProperty("--ry", "0deg");
    stage.current?.style.setProperty("--rx", "0deg");
  };

  // Arrow keys switch screens in the full-screen view (the dialog sits inside this element).
  const onKeyDown = (event: KeyboardEvent) => {
    if (!open) return;
    if (event.key === "ArrowRight") go(index + 1);
    if (event.key === "ArrowLeft") go(index - 1);
  };

  // Full screen: the phone grows out of the one on the page while its lock screen goes dark, boots up
  // and launches the app, then the screen picker appears. On close it locks and shrinks back.
  const enter: DialogAnimation = (dialog) => {
    const q = gsap.utils.selector(dialog);
    const [phone] = q(".device-full_phone");
    const [lock] = q(".device-full_lock");
    gsap.set(lock, { autoAlpha: 1 }); // start out looking like the page's phone
    const boot = bootUp(phone);
    const timeline = gsap
      .timeline()
      .set(device.current, { autoAlpha: 0 }, 0)
      .fromTo(q(".device-full_bg"), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
      .fromTo(phone, flipVars(phone, device.current!), { x: 0, y: 0, scale: 1, duration: 1, ease: EASE_OUT, clearProps: "transform" }, 0)
      .fromTo(q(".device-full_head, .device-full_close"), { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.08 }, 0.4)
      .add(boot, 0)
      .set(lock, { autoAlpha: 0 }, 0.45); // behind the black boot screen
    if (count > 1) timeline.fromTo(q(".device-full_panel"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, boot.duration() - 0.6);
    return timeline;
  };
  const leave: DialogAnimation = (dialog) => {
    const q = gsap.utils.selector(dialog);
    const [phone] = q(".device-full_phone");
    return (
      gsap
        .timeline()
        .to(q("[data-chrome]"), { opacity: 0, duration: 0.25 }, 0)
        // Lock the phone (clearing the boot screen if it's closed mid-boot) so it lands matching the page's phone.
        .to(q(".phone-boot"), { opacity: 0, duration: 0.3 }, 0)
        .to(q(".device-full_lock"), { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 0)
        .to(phone, { ...flipVars(phone, device.current!), duration: 0.75, ease: "power3.inOut" }, 0)
        .to(q(".device-full_bg"), { opacity: 0, duration: 0.55, ease: "power2.inOut" }, 0.15)
        .set(device.current, { clearProps: "opacity,visibility" })
    );
  };

  return (
    <div className="phone-demo" onKeyDown={onKeyDown}>
      <div className="phone-demo_stage" ref={stage} onPointerMove={tilt} onPointerLeave={untilt}>
        <div className="phone-demo_device" ref={device}>
          <PhoneMockup className="phone-demo_phone">
            <PhoneLockScreen app={title} message={description} sizes={SCREEN_SIZES} preload />
          </PhoneMockup>
          <OpenFullscreen label={`Explore the ${title} app`} onClick={() => setOpen(true)}>
            <span className="if-hover">Click</span>
            <span className="if-touch">Tap</span> to explore the app
          </OpenFullscreen>
        </div>
      </div>

      <DeviceDialog
        open={open}
        onClose={() => {
          setOpen(false);
          gsap.set(device.current, { clearProps: "opacity,visibility" });
        }}
        label={`${title} app screens, full screen`}
        title={title}
        meta="App preview"
        enter={enter}
        leave={leave}
        className="is-phone"
      >
        <div className="device-full_stage">
          <PhoneMockup className="device-full_phone">
            <div className="phone-demo_screens">
              <div className="phone-demo_track" style={{ translate: `${index * -100}% 0` }} {...swipe}>
                {screens.map((screen, i) => (
                  <div key={i} className="phone-demo_slide" aria-hidden={i !== index} inert={i !== index}>
                    <ScreenScroll shot={screen} label={`${title} — screen ${i + 1} of ${count}`} sizes={SCREEN_SIZES} hint={false} />
                  </div>
                ))}
              </div>
            </div>
            <PhoneLockScreen app={title} message={description} sizes={SCREEN_SIZES} className="device-full_lock" />
            <div className="phone-boot" aria-hidden="true">
              <AppleLogo className="phone-boot_logo" />
            </div>
          </PhoneMockup>
        </div>
        {count > 1 && (
          <div className="device-full_panel" data-chrome>
            <div className="device-full_panel-head">
              <span className="phone-demo_count" aria-live="polite">
                {pad(index + 1)} <span>/ {pad(count)}</span>
              </span>
              <div className="device-full_arrows">
                <button type="button" className="demo-arrow is-prev" aria-label="Previous screen" onClick={() => go(index - 1)}>
                  <Arrow />
                </button>
                <button type="button" className="demo-arrow is-next" aria-label="Next screen" onClick={() => go(index + 1)}>
                  <Arrow />
                </button>
              </div>
            </div>
            <ScreenThumbs screens={screens} index={index} onSelect={go} />
          </div>
        )}
      </DeviceDialog>
    </div>
  );
}

/** Thumbnail strip for picking a screen; keeps the current one in view when the strip scrolls. */
function ScreenThumbs({ screens, index, onSelect }: { screens: StaticImageData[]; index: number; onSelect: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = ref.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !thumb || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2, behavior: "smooth" });
  }, [index]);

  return (
    <div className="phone-demo_thumbs device-full_thumbs" ref={ref} role="tablist" aria-label="App screens" data-lenis-prevent>
      {screens.map((screen, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`Screen ${i + 1}`}
          className={cx("phone-demo_thumb", i === index && "is-active")}
          onClick={() => onSelect(i)}
        >
          <Image src={screen} alt="" sizes="72px" />
        </button>
      ))}
    </div>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
