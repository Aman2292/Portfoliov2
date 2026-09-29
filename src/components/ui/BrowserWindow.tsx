import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

/** Safari-style window: traffic lights, optional tabs and an address bar. Scales with its own width. */
export function BrowserWindow({
  domain,
  tabs,
  className,
  children,
}: {
  domain: string;
  tabs?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("browser", className)}>
      <div className="browser_bar">
        <span className="browser_lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {tabs}
        <span className="browser_url">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <rect x="3.5" y="7" width="9" height="7" rx="1.6" fill="currentColor" />
          </svg>
          {domain}
        </span>
      </div>
      <div className="browser_view">{children}</div>
    </div>
  );
}
