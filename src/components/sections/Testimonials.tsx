import Image from "next/image";
import { Fragment } from "react";
import { testimonials } from "@/content/site";
import { Label } from "@/components/ui/Label";
import { Odometer } from "@/components/ui/Odometer";

function Stars() {
  return (
    <div className="testimonials_stars" role="img" aria-label="Rated 5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <img key={i} src="/icons/star.svg" alt="" width={66} height={64} loading="lazy" className="testimonials_star" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const { stats, featured, cards, numbers } = testimonials;

  return (
    <section id="testimonials" className="section_testimonials">
      <div className="padding-section-medium" />
      <div className="padding-global">
        <div className="container-medium">
          <div className="testimonials_component">
            <div className="testimonials_main">
              <div className="testimonials_head">
                <div>
                  <Label>{testimonials.label}</Label>
                  <div className="spacer-medium" />
                  <div className="testimonials_heading">
                    <h2 className="heading-style-h3" data-reveal>
                      {testimonials.heading}
                    </h2>
                  </div>
                </div>
                <div className="spacer-xlarge is-tablet-medium hide-mobile-portrait" />
                <div className="testimonials_data" data-reveal>
                  <div className="testimonials_data-head">
                    <div className="testimonials_data-head-text">{stats.title}</div>
                    <div className="line" data-line />
                  </div>
                  <div className="testimonials_data-items">
                    {stats.items.map((stat) => (
                      <div key={stat.label} className="testimonials_data-item">
                        <div>
                          <div className="testimonials_data-number">{stat.value}%</div>
                          <div className="testimonials_data-label">{stat.label}</div>
                        </div>
                        <div className="testimonials_data-bar">
                          <div className="testimonials_data-bar-in" style={{ width: `${stat.value}%` }} data-bar />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="testimonials_items">
                <div className="testimonials_cover is-featured" data-reveal>
                  <Image
                    src={featured.photo.src}
                    alt={featured.photo.alt}
                    className="testimonials_img"
                    sizes="(max-width: 479px) 100vw, (max-width: 991px) 50vw, 35vw"
                    data-parallax="scale"
                  />
                  <div className="testimonials_blur" />
                  <div className="testimonials_main-wrap">
                    <div className="testimonials_text-wrap">
                      <Stars />
                      <blockquote className="testimonials_main-quote">{featured.quote}</blockquote>
                    </div>
                    <div className="testimonials_author-wrap">
                      <div className="testimonials_author-main">{featured.author}</div>
                      <div className="testimonials_title-main">{featured.role}</div>
                    </div>
                  </div>
                </div>

                {cards.map((card) => (
                  <div key={card.author} className="testimonials_card" data-reveal>
                    <div className="testimonials_wrap">
                      <Stars />
                      <blockquote className="testimonials_quote">{card.quote}</blockquote>
                    </div>
                    <div className="testimonials_author-infos">
                      <Image src={card.avatar} alt="" className="testimonials_author-pic" sizes="40px" />
                      <div className="testimonials_author-wrap">
                        <div className="testimonials_author">{card.author}</div>
                        <div className="testimonials_title">
                          {card.role} <strong>{card.company}</strong>®
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="padding-section-large" />
            <div className="testimonials_numbers">
              <div className="testimonials_numbers-main">
                {numbers.map((number) => (
                  <div key={number.label} className="number_block">
                    <Odometer prefix={number.prefix} value={number.value} suffix={number.suffix} />
                    <p className="number_desc">{number.label}</p>
                  </div>
                ))}
              </div>
              <div className="spacer-large" />
              <div className="testimonials_infos">
                <div className="line" data-line />
                <div className="spacer-small" />
                <p className="testimonials_legal-text">
                  {testimonials.footnotes.map((note, i) => (
                    <Fragment key={i}>
                      {i > 0 && <br />}
                      {note}
                    </Fragment>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="padding-section-medium" />
    </section>
  );
}
