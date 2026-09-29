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
                <img src="/brand/barcode.svg" alt="" width={183} height={86} className="navbar_barcode" />
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
