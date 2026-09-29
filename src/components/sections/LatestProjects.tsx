import { categories, latestProjects, projects } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { ProjectMedia } from "@/components/ui/ProjectMedia";
import { SmartLink } from "@/components/ui/SmartLink";
import { projectPath } from "@/lib/projects";

/** Home page: the newest projects (the template's blog list layout). */
export function LatestProjects() {
  const latest = [...projects].sort((a, b) => Number(b.year) - Number(a.year)).slice(0, latestProjects.count);

  return (
    <section id="latest" className="section_blog-list">
      <div className="padding-section-large" />
      <div className="padding-global">
        <div className="container-large">
          <div className="blog-list_component">
            <div className="blog-list_head">
              <div className="blog-list_label-wrap">
                <Label>{latestProjects.label}</Label>
              </div>
              <div className="brands_heading">
                <h2 className="heading-style-h3" data-reveal>
                  {latestProjects.heading}
                </h2>
              </div>
              <div className="blog-list_button" data-reveal>
                <Button href={latestProjects.cta.href} variant="black">
                  {latestProjects.cta.label}
                </Button>
              </div>
            </div>
            <div className="spacer-large" />

            <div role="list" className="blog-list_list">
              {latest.map((project) => {
                const category = categories.find((c) => c.slug === project.category)!;
                return (
                  <div key={project.title} role="listitem" className="blog-list_item">
                    <SmartLink href={projectPath(project)} className="blog-list_block w-inline-block">
                      <div className="blog-list_img-wrap">
                        <ProjectMedia
                          project={project}
                          imageClassName="blog-list_img"
                          sizes="(max-width: 479px) 100vw, 33vw"
                        />
                      </div>
                      <div className="blog-list_texts">
                        <p className="blog-list_date">
                          {category.label} · {project.year}
                        </p>
                        <h3 className="heading-style-h6">{project.title}</h3>
                        <p className="text-size-small text-color-grey-500">{project.description}</p>
                      </div>
                    </SmartLink>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="padding-section-medium" />
    </section>
  );
}
