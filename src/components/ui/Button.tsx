import type { ReactNode } from "react";
import { cx, externalProps } from "@/lib/utils";

type Variant = "grey" | "black" | "white" | "small";

const VARIANT_CLASS: Record<Variant, string | undefined> = {
  grey: undefined,
  black: "is-black",
  white: "is-white",
  small: "is-small",
};

/** Pill button with the rolling/blurred label and pulsing accent dot. */
export function Button({ href, variant = "grey", children }: { href: string; variant?: Variant; children: ReactNode }) {
  return (
    <a href={href} className={cx("button-secondary w-inline-block", VARIANT_CLASS[variant])} {...externalProps(href)}>
      <div className="button_texts">
        <div className="button_text _1">{children}</div>
        <div className="button_text _2" aria-hidden="true">
          {children}
        </div>
      </div>
      <div className="button-line_space" />
      <div className="button-line_dot">
        <div className="button_dot" />
        <div className="button_dot-scale" />
      </div>
    </a>
  );
}

/** Glassy call-to-action with drifting gradient blobs (pricing cards). */
export function GradientButton({ href, light, children }: { href: string; light?: boolean; children: ReactNode }) {
  const balls = (
    <>
      <div className="button-grad_ball ball-1" />
      <div className="button-grad_ball gradient__ball--2" />
    </>
  );
  return (
    <a href={href} className={cx("button-gradient w-inline-block", light && "is-light")} {...externalProps(href)}>
      <div className="button-grad_inner">
        <div className="button-grad_gradient">{balls}</div>
        <div className="button-grad_text">{children}</div>
      </div>
      <div className="button-grad_glow">{balls}</div>
    </a>
  );
}
