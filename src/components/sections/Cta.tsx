import { cta } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { NoteMarquee } from "@/components/ui/NoteMarquee";
import { MouseTrail } from "./MouseTrail";

export function Cta() {
  return (
    <section id="contact" className="section_cta">
      <div className="padding-global is-tiny">
        <div className="cta_component">
          <div className="padding-section-medium" />
          <div className="padding-global">
            <div className="cta_content">
              <div className="text-align-center" data-reveal>
                <div className="text-color-white">
                  <h2 className="heading-style-h1 font-weight-medium">{cta.heading}</h2>
                </div>
              </div>
              <div className="spacer-large" />
              <div className="fade-in" data-reveal>
                <Button href={cta.button.href} variant="white">
                  {cta.button.label}
                </Button>
              </div>
            </div>
          </div>
          <div className="padding-section-medium" />
          <MouseTrail images={cta.trail.map((image) => image.src)} />
          <div className="cta_note">
            <NoteMarquee text={cta.note} />
          </div>
        </div>
      </div>
    </section>
  );
}
