import Image from "next/image";
import { aboutPage } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { SmartLink } from "@/components/ui/SmartLink";

/** About page: heading, portrait, bio and quick facts. */
export function AboutIntro() {
  return (
    <section className="section_about-intro">
      <PageHeader heading={aboutPage.heading} label={aboutPage.label} text={aboutPage.intro} />
      <div className="spacer-huge" />
      <div className="padding-global">
        <div className="container-medium">
          <div className="about-page_grid">
            <div className="about-page_portrait" data-reveal>
              <Image
                src={aboutPage.portrait.src}
                alt={aboutPage.portrait.alt}
                className="about-page_portrait-img"
                sizes="(max-width: 991px) 100vw, 40vw"
                preload
                data-parallax="scale"
              />
            </div>

            <div className="about-page_content">
              <h2 className="heading-style-h4" data-reveal>
                {aboutPage.lead}
              </h2>
              <div className="spacer-medium" />
              <div className="about-page_bio" data-reveal>
                {aboutPage.bio.map((paragraph, i) => (
                  <p key={i} className="text-color-grey-500">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="spacer-large" />
              <dl className="about-page_details" data-reveal>
                {aboutPage.details.map((detail) => (
                  <div key={detail.label} className="about-page_detail">
                    <dt className="text-style-label">{detail.label}</dt>
                    <dd className="about-page_detail-value">
                      {detail.href ? <SmartLink href={detail.href}>{detail.value}</SmartLink> : detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="spacer-large" />
              <div className="button-row" data-reveal>
                {aboutPage.buttons.map((button, i) => (
                  <Button key={button.href} href={button.href} variant={i === 0 ? "black" : "grey"}>
                    {button.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="padding-section-medium" />
    </section>
  );
}
