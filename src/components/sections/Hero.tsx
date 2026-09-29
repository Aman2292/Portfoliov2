import { hero } from "@/content/site";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { NoteMarquee } from "@/components/ui/NoteMarquee";
import { HeroContactCard } from "./HeroContactCard";

export function Hero() {
  // The first word is repeated at the end so the loop can snap back seamlessly.
  const words = [...hero.rotatingWords, hero.rotatingWords[0]];

  return (
    <section id="top" className="section_home-header">
      <div className="padding-section-small is-mobile-medium" />
      <div className="padding-global">
        <div className="home-header_headings">
          <h1 className="home-header_heading" data-intro>
            {hero.title}
          </h1>
          <h2 className="home-header_heading" data-intro>
            {hero.subtitle}
          </h2>
        </div>
      </div>
      <div className="spacer-small" />

      <div className="home-header_component" data-intro>
        <div className="home-header_content">
          <BackgroundVideo className="home-header_video" src={hero.video.src} poster={hero.video.poster}>
            <NoteMarquee text={hero.scrollNote} />
          </BackgroundVideo>

          <div className="home-header_services">
            {hero.services.map((service) => (
              <div key={service} className="home-header_service">
                <div className="home-header_service-text">{service}</div>
                <div className="home-header_service-line" />
              </div>
            ))}
          </div>

          <div className="home-header_bottom">
            <div className="home-header_subheading">
              <div className="home-header_label">
                {hero.label}
              </div>
              <div className="spacer-xsmall" />
              <h3 className="home-header_subhead">{hero.subhead}</h3>
              <div className="home-header_words-wrap">
                <div className="home-header_words" data-rotating-words>
                  {words.map((word, i) => (
                    <div
                      key={i}
                      className="home-header_word"
                      style={i > 0 ? { position: "absolute", top: `${i * 100}%` } : undefined}
                      aria-hidden={i === words.length - 1 || undefined}
                    >
                      <div className="home-header_subhead">{word}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <HeroContactCard />
          </div>
        </div>
      </div>
    </section>
  );
}
