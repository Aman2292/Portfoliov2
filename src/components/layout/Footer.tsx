import { Fragment } from "react";
import { brand, footer, socials } from "@/content/site";
import { externalProps } from "@/lib/utils";
import { Newsletter } from "./Newsletter";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="padding-global is-tiny">
        <div className="footer_wrap">
          <div className="footer_component">
            <div className="footer_main">
              <div className="footer_links-groups">
                <div className="footer_group">
                  <div className="footer_link-label">{footer.pagesLabel}</div>
                  <div className="footer_lists">
                    {footer.pageColumns.map((column, i) => (
                      <div key={i} className="footer_links-list">
                        {column.map((link) => (
                          <a key={link.label} href={link.href} className="footer_link">
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="footer_secondary">
                <div className="footer_social">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="footer_social-link w-inline-block"
                      aria-label={social.label}
                      {...externalProps(social.href)}
                    >
                      <img src={social.icon} alt="" className="footer_social-icon" />
                    </a>
                  ))}
                </div>
                <Newsletter />
              </div>
            </div>

            <div className="footer_legal-links">
              <div className="footer_legal-wrap">
                <div className="footer_copyright">
                  © {year} {brand.name}
                </div>
                {footer.credits.map((credit) => (
                  <Fragment key={credit.linkLabel}>
                    <div className="footer_legal-divider" />
                    <div className="footer_copyright">
                      {credit.label}{" "}
                      <a href={credit.href} className="footer_template-link" {...externalProps(credit.href)}>
                        {credit.linkLabel}
                      </a>
                    </div>
                  </Fragment>
                ))}
              </div>
              <div className="footer_template-links">
                {footer.bottomLinks.map((link) => (
                  <a key={link.label} href={link.href} className="footer_template-link">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer_brand" aria-hidden="true">
            {brand.name}
            <span className="footer_mark">{brand.mark}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
