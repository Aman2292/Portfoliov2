import type { CSSProperties } from "react";

/** Stacked backdrop-filter layers that softly blur content as it scrolls off the bottom edge. */
export function ProgressiveBlur() {
  return (
    <div className="progressive-blur_wrap" style={{ "--blur": "1rem", "--ratio": 2 } as CSSProperties} aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className={`progressive-blur_panel is-${i + 1}`} />
      ))}
    </div>
  );
}
