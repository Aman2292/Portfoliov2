import Image from "next/image";
import { services } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/utils";

export function Services() {
  const count = String(services.items.length).padStart(2, "0");

  return (
    <section id="services" className="section_home-services">
      <div className="padding-global is-tiny">
        <div className="home-services_component">
          <div className="padding-section-small" />
          <div className="padding-global">
            <div className="container-medium">
              <div className="head-grid">
                <div className="text-color-white">
                  <h2 className="text-weight-medium">{services.title}</h2>
                </div>
                <div className="home-services_head">
                  <div className="home-services_icons" aria-hidden="true">
                    {[0, 1, 2, 3].map((i) => (
                      <img key={i} src="/icons/cross-white.svg" alt="" width={12} height={12} loading="lazy" className="home-services_icon" data-spin />
                    ))}
                  </div>
                  <div className="text-color-white">
                    <div className="heading-style-h2 text-weight-medium">({count})</div>
                  </div>
                </div>
              </div>
              <div className="spacer-xlarge is-mobile-medium" />

              <div className="head-grid">
                <div className="home-services_content is-grid-col-2">
                  {/* Each item sticks below the navbar so the list stacks up like cards on desktop */}
                  <div className="home-services_items">
                    {services.items.map((service, i) => (
                      <div key={service.title} className={cx("home-services_item", i === services.items.length - 1 && "padding-small")}>
                        <div className="line is-darker" data-line />
                        <div className="home-services_item-in">
                          <div className="home-services_examples">
                            <div className="home-services_item-head">
                              <div className="home-services_number">
                                <div>{i + 1}</div>
                              </div>
                              <h2 className="home-services_title">{service.title}</h2>
                            </div>
                            <div className="home-services_services">
                              {service.tags.map((tag) => (
                                <div key={tag} className="home-services_service">
                                  {tag}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="home-services_desc is-grid-col-2">
                            <div className="home-services_img-wrap">
                              <Image
                                src={service.photo.src}
                                alt={service.photo.alt}
                                className="home-services_img"
                                sizes="(max-width: 479px) 100vw, (max-width: 767px) 35vw, 25vw"
                                data-parallax="scale"
                              />
                            </div>
                            <div className="home-services_text-wrap">
                              <p className="text-color-grey-300">{service.text}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button href={services.cta.href}>{services.cta.label}</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="padding-section-small" />
        </div>
      </div>
    </section>
  );
}
