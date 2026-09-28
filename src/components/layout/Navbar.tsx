import { brand, navLinks } from "@/content/site";
import { RollingLink } from "@/components/ui/RollingLink";
import { Menu } from "./Menu";

export function Navbar() {
  return (
    <nav className="navbar" aria-label="Main">
      <div className="padding-global is-small">
        <div className="navbar_component">
          <div className="navbar_content">
            <div className="navbar_brand">
              <a href="#top" className="navbar_logo-wrap w-inline-block" aria-label={`${brand.name} — back to top`}>
                <img src={brand.logoDark} alt="" width={142} height={37} className="navbar_logo" />
              </a>
              <div className="navbar_creative">
                <img src="/brand/barcode.svg" alt="" width={183} height={86} className="navbar_barcode" />
                <div className="navbar_creative-text">{brand.tagline}</div>
              </div>
            </div>

            <div className="navbar_links-menu">
              <div className="navbar_links">
                {navLinks.map((link) =>
                  link.badge ? (
                    <div key={link.href} className="navbar_works-link">
                      <RollingLink href={link.href} label={link.label} variant="navbar" dot={false} />
                      <div className="navbar_works-number-wrap" aria-hidden="true">
                        <div className="navbar_works-number">{link.badge}</div>
                      </div>
                    </div>
                  ) : (
                    <RollingLink key={link.href} href={link.href} label={link.label} variant="navbar" />
                  ),
                )}
              </div>
              <Menu />
            </div>
          </div>
          <div className="navbar_line" />
        </div>
      </div>
    </nav>
  );
}
