import { partners } from "@/content/site";
import { Label } from "@/components/ui/Label";

export function Partners() {
  return (
    <section id="partners" className="section_brands">
      <div className="padding-section-medium" />
      <div className="padding-global">
        <div className="container-medium">
          <div className="head-grid">
            <Label>{partners.label}</Label>
            <div className="brands_heading" data-reveal>
              <h3 className="heading-style-h4">{partners.heading}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer-xlarge" />

      {/* Three identical rows scroll left forever; the copies are hidden from assistive tech. */}
      <div className="brands_list-wrapper" data-reveal>
        {[0, 1, 2].map((copy) => (
          <div key={copy} className="brands_list" aria-hidden={copy > 0 || undefined}>
            {partners.items.map((partner, i) => (
              <div key={i} className="brands_item-block">
                <div className="brands_item-logo-wrap">
                  <img src={partner.logo} alt={copy ? "" : partner.name} loading="lazy" className="brands_item-logo" />
                </div>
                <div className="brands_item-texts">
                  <h4 className="brands_item-name">{partner.name}</h4>
                  <p className="brands_item-desc">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="padding-section-medium" />
    </section>
  );
}
