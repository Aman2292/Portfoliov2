import type { ReactNode } from "react";

/** Small mono section label with the accent dot. */
export function Label({ children, light }: { children: ReactNode; light?: boolean }) {
  const text = <h2 className="text-style-label">{children}</h2>;
  return (
    <div className="label_wrap" data-reveal>
      <div className="label_dot" />
      {light ? <div className="text-color-white">{text}</div> : text}
    </div>
  );
}
