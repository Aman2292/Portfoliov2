import type { ReactNode } from "react";
import { cx } from "@/lib/utils";
import { SmartLink } from "./SmartLink";

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
    <SmartLink href={href} className={cx("button-secondary w-inline-block", VARIANT_CLASS[variant])}>
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
    </SmartLink>
  );
}
