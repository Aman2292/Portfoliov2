import Image from "next/image";
import { work } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { WorkCursor } from "./WorkCursor";

export function SelectedWork() {
  return (
    <section id="work" className="section_work-list">
      <div className="padding-global is-tiny">
        <div className="line" data-line />
      </div>
      <div className="padding-section-small" />
      <div className="padding-global">
        <div className="work-list_component">
          <div className="container-medium">
            <div className="work-list_head">
              <div className="work-list_heading-wrap">
                <h2 className="heading-style-display" data-reveal>
                  {work.heading[0]}
                  <br />
                  {work.heading[1]}
                </h2>
                <div className="work-list_number" data-reveal>
                  <div>{work.projects.length}</div>
                </div>
              </div>
              <div className="work-list_head-texts is-justify-center">
                <h2 className="text-style-label hide-tablet" data-reveal>
                  {work.label}
                </h2>
                <div className="text-size-grey-400" data-reveal>
                  <p className="text-size-small">{work.text}</p>
                </div>
              </div>
              <h2 className="heading-style-display hide-tablet is-justify-end" data-reveal aria-hidden="true">
                {work.year}
              </h2>
            </div>
          </div>
          <div className="spacer-huge" />

          <WorkCursor label={work.hoverLabel} />
          <div className="work-list_wrapper-v1">
            <div role="list" className="work-list_list">
              {work.projects.map((project, i) => (
                <div key={project.title} role="listitem" className="work-list_item">
                  <div className="work-list_block" data-work-hover>
                    <a href={project.href} className="work-list_link w-inline-block" aria-label={`View ${project.title}`} data-work-card>
                      <Image
                        src={project.image}
                        alt=""
                        className="work-list_img"
                        sizes="(max-width: 991px) 100vw, 60vw"
                        preload={i === 0}
                      />
                      <div className="work-list_name">
                        <div className="work-list_dot" />
                        <h3 className="work-list_title">{project.title}</h3>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="spacer-large" />
          <div className="fade-in" data-reveal>
            <Button href={work.cta.href} variant="black">
              {work.cta.label}
            </Button>
          </div>
        </div>
      </div>
      <div className="padding-section-medium" />
    </section>
  );
}
