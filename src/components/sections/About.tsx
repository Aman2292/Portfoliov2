import { about, brand } from "@/content/site";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

export function About() {
  return (
    <section id="about" className="section_home-about">
      <div className="padding-section-medium" />
      <div className="padding-global is-tiny tablet-bigger">
        <div className="home-about_component">
          <div className="home-about_video-wrap" data-reveal>
            <BackgroundVideo className="home-about_video" src={about.video.src} poster={about.video.poster} lazy data-parallax="scale" />
            <div className="home-about_quote-wrap">
              <blockquote className="home-about_quote">{about.quote}</blockquote>
              <div className="home-about_quote-author">
                <div className="home-about_author">{about.author}</div>
                <div className="home-about_title">{about.role}</div>
              </div>
            </div>
            <img src={brand.logoLight} loading="lazy" alt={brand.name} width={142} height={37} className="home-about_logo" />
          </div>

          <div className="home-about_content-wrap">
            <div className="home-about_content">
              <Label>{about.label}</Label>
              <div className="spacer-medium is-tablet-smaller" />
              <h2 className="heading-style-h4" data-reveal>
                {about.heading}
              </h2>
              <div className="spacer-medium is-tablet-smaller" />
              <div className="home-about_text-wrap" data-reveal>
                <div className="text-color-grey-500">
                  <p>{about.text}</p>
                </div>
              </div>
              <div className="spacer-large is-tablet-smaller" />
              <div className="fade-in" data-reveal>
                <Button href={about.cta.href} variant="black">
                  {about.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="padding-section-medium" />
    </section>
  );
}
