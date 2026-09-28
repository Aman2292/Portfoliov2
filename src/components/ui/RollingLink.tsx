import type { MouseEventHandler } from "react";

// Spelled out in full (not built from a prefix) so the class names stay searchable.
const CLASSES = {
  navbar: { link: "navbar_link", texts: "navbar_link-texts", text: "navbar_link-text", dot: "navbar_link-dot" },
  menu: { link: "menu_link", texts: "menu_link-texts", text: "menu_link-text", dot: "menu_link-dot" },
};

/** Link whose label rolls up to a duplicate on hover (navbar + menu links). */
export function RollingLink({
  href,
  label,
  variant,
  dot = true,
  onClick,
}: {
  href: string;
  label: string;
  variant: keyof typeof CLASSES;
  dot?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const c = CLASSES[variant];
  return (
    <a href={href} className={`${c.link} w-inline-block`} onClick={onClick}>
      <div className={c.texts}>
        <div className={`${c.text} _1`}>{label}</div>
        <div className={`${c.text} _2`} aria-hidden="true">
          {label}
        </div>
      </div>
      {dot && <div className={c.dot} />}
    </a>
  );
}
