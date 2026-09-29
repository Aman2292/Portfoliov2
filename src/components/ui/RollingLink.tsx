import { SmartLink } from "./SmartLink";

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
  current,
}: {
  href: string;
  label: string;
  variant: keyof typeof CLASSES;
  dot?: boolean;
  /** Marks the link as the page being viewed (keeps the accent dot visible). */
  current?: boolean;
}) {
  const c = CLASSES[variant];
  return (
    <SmartLink href={href} className={`${c.link} w-inline-block`} aria-current={current ? "page" : undefined}>
      <div className={c.texts}>
        <div className={`${c.text} _1`}>{label}</div>
        <div className={`${c.text} _2`} aria-hidden="true">
          {label}
        </div>
      </div>
      {dot && <div className={c.dot} />}
    </SmartLink>
  );
}
