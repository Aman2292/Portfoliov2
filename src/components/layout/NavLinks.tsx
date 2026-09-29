"use client";

import { usePathname } from "next/navigation";
import { navLinks } from "@/content/site";
import { RollingLink } from "@/components/ui/RollingLink";

/** Category tabs; the page being viewed keeps its accent dot. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="navbar_links">
      {navLinks.map((link) => (
        <RollingLink key={link.href} href={link.href} label={link.label} variant="navbar" current={pathname === link.href} />
      ))}
    </div>
  );
}
