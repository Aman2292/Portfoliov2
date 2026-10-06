import Link from "next/link";
import { brand } from "@/content/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { Menu } from "./Menu";
import { NavLinks } from "./NavLinks";

export function Navbar() {
  return (
    <nav className="navbar" aria-label="Main">
      <div className="padding-global is-small">
        <div className="navbar_component">
          <div className="navbar_content">
            <div className="navbar_brand">
              <Link href="/" className="navbar_logo-wrap w-inline-block" aria-label={`${brand.name} — home`}>
                <Wordmark className="navbar_wordmark" />
              </Link>
              <div className="navbar_creative">
                <svg className="navbar_mark" viewBox="0 0 22 22" aria-hidden="true">
                  <rect x="3" y="3" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.25" />
                  {[3, 19].flatMap((x) => [3, 19].map((y) => <rect key={`${x}-${y}`} x={x - 2} y={y - 2} width="4" height="4" className="is-handle" stroke="currentColor" strokeWidth="1.25" />))}
                  <rect className="is-accent" x="8" y="8" width="6" height="6" />
                </svg>
                <div className="navbar_creative-text">{brand.tagline}</div>
              </div>
            </div>

            <div className="navbar_links-menu">
              <NavLinks />
              <Menu />
            </div>
          </div>
          <div className="navbar_line" />
        </div>
      </div>
    </nav>
  );
}
