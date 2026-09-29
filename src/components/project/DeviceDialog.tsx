"use client";

import { useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { useLenis } from "lenis/react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cx } from "@/lib/utils";

/** Builds a dialog's entrance or exit animation, given the open dialog. */
export type DialogAnimation = (dialog: HTMLDialogElement) => gsap.core.Timeline;

/**
 * Full-screen view of a project's device over a backdrop in the project colour. Plays the device's
 * `enter` animation on open and its `leave` animation before closing (close button or Escape), and
 * pauses the page's smooth scrolling meanwhile. Children only render while it's open.
 */
export function DeviceDialog({
  open,
  onClose,
  label,
  title,
  meta,
  enter,
  leave,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  title: string;
  meta: string;
  enter: DialogAnimation;
  leave: DialogAnimation;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);
  const lenis = useLenis();
  const { contextSafe } = useGSAP({ scope: ref });

  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog || dialog.open) return;
    dialog.showModal();
    lenis?.stop();
    if (!prefersReducedMotion()) contextSafe(() => (animation.current = enter(dialog)))();
  }, [open, lenis, enter, contextSafe]);

  // Leaving the page with the dialog open (e.g. the back button) must not leave scrolling paused.
  useEffect(() => {
    const dialog = ref.current;
    return () => {
      if (dialog?.open) lenis?.start();
    };
  }, [lenis]);

  const close = () => {
    const dialog = ref.current;
    if (!dialog?.open || closing.current) return;
    animation.current?.kill();
    if (prefersReducedMotion()) return dialog.close();
    closing.current = true;
    contextSafe(() => {
      animation.current = leave(dialog).eventCallback("onComplete", () => dialog.close());
    })();
  };

  return (
    <dialog
      ref={ref}
      className={cx("device-full", className)}
      aria-label={label}
      // Focusable, so clicks on empty space keep focus (and arrow keys) inside the dialog.
      tabIndex={-1}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={() => {
        animation.current?.kill();
        closing.current = false;
        lenis?.start();
        onClose();
      }}
    >
      <div className="device-full_bg" />
      <div className="device-full_head" data-chrome>
        <span className="device-full_title">{title}</span>
        <span className="text-style-label">{meta}</span>
      </div>
      <button type="button" className="menu_close device-full_close" aria-label="Close full screen" onClick={close} data-chrome>
        <img src="/icons/close.svg" alt="" className="menu_close-icon" />
      </button>
      {open && children}
    </dialog>
  );
}

/** Invisible button laid over a device on the page that opens it full screen. Its pill shows on hover (always on touch screens). */
export function OpenFullscreen({ label, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button type="button" className="device-open" aria-label={label} aria-haspopup="dialog" {...props}>
      <span className="device-open_pill" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M4 9V4h5m6 0h5v5m0 6v5h-5m-6 0H4v-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {children}
      </span>
    </button>
  );
}

/** x / y / scale that put `el` (ignoring any transform GSAP has already given it) exactly over `target`. */
export function flipVars(el: Element, target: Element) {
  const get = gsap.getProperty(el);
  const scale = Number(get("scale"));
  const from = el.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  // Undo el's own translate and scale (around its centre) to find where the layout puts it.
  const centerX = from.left + from.width / 2 - Number(get("x"));
  const centerY = from.top + from.height / 2 - Number(get("y"));
  return {
    x: to.left + to.width / 2 - centerX,
    y: to.top + to.height / 2 - centerY,
    scale: to.height / (from.height / scale),
  };
}
