import Image from "next/image";
import { faq } from "@/content/site";
import { Label } from "@/components/ui/Label";
import { FaqList } from "./FaqList";

export function Faq() {
  return (
    <section id="faq" className="section_faq">
      <div className="padding-section-medium" />
      <div className="padding-global">
        <div className="container-medium">
          <div className="faq_component">
            <div className="faq_content">
              <div className="faq_head">
                <Label>{faq.label}</Label>
                <div className="spacer-small" />
                <h2 className="heading-style-h1" data-reveal>
                  {faq.heading}
                </h2>
                <div className="spacer-small hide-mobile-landscape" />
                <p className="heading-style-h6 font-size-smaller hide-mobile-landscape" data-reveal>
                  {faq.subheading}
                </p>
              </div>
              <div className="spacer-large" />
              <FaqList items={faq.items} />
            </div>
            <div className="faq_img-wrap" data-reveal>
              <Image src={faq.photo.src} alt={faq.photo.alt} className="faq_img" sizes="(max-width: 991px) 100vw, 45vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
