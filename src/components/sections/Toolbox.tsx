import { aboutPage } from "@/content/site";
import { Label } from "@/components/ui/Label";

/** Endless strip of the tools you work with (uses the template's partner-logo marquee styles). */
export function Toolbox() {
  const { toolbox } = aboutPage;
  return (
    <section className="section_brands">
      <div className="padding-global is-tiny">
        <div className="line" data-line />
      </div>
      <div className="padding-section-small" />
      <div className="padding-global">
        <div className="container-medium">
          <div className="head-grid">
            <Label>{toolbox.label}</Label>
            <div className="brands_heading" data-reveal>
              <h2 className="heading-style-h4">{toolbox.heading}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer-xlarge" />

      {/* Three identical rows scroll left forever; the copies are hidden from assistive tech. */}
      <div className="brands_list-wrapper" data-reveal>
        {[0, 1, 2].map((copy) => (
          <ul key={copy} className="brands_list toolbox_list" aria-hidden={copy > 0 || undefined}>
            {toolbox.items.map((tool) => (
              <li key={tool.name} className="brands_item-block">
                <div className="brands_item-logo-wrap">
                  <span className="toolbox_name">{tool.name}</span>
                </div>
                <div className="brands_item-texts">
                  <p className="brands_item-desc">{tool.note}</p>
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="padding-section-medium" />
    </section>
  );
}
