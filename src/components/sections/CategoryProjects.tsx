import { categories, categoryPage, projectsIn, type Category } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectMedia } from "@/components/ui/ProjectMedia";
import { SmartLink } from "@/components/ui/SmartLink";
import { projectPath } from "@/lib/projects";
import { WorkCursor } from "./WorkCursor";

/** A category page (Applications, Websites, ...): heading, project grid and links to the other categories. */
export function CategoryProjects({ category }: { category: Category }) {
  const items = projectsIn(category.slug);
  const others = categories.filter((c) => c.slug !== category.slug);

  return (
    <section className="section_work-list">
      <PageHeader
        heading={`${category.label}.`}
        label={categoryPage.label}
        text={category.description}
        aside={
          <div className="heading-style-h2 text-weight-medium" aria-label={`${items.length} projects`}>
            ({String(items.length).padStart(2, "0")})
          </div>
        }
      />
      <div className="spacer-huge" />

      <div className="padding-global is-tiny">
        {items.length === 0 ? (
          <p className="category_empty heading-style-h6">{categoryPage.empty}</p>
        ) : (
          <>
            <WorkCursor label={categoryPage.hoverLabel} />
            <div role="list" className="work-list_list-v2">
              {items.map((project, i) => (
                <div key={project.title} role="listitem" className="work-list_block-v2" data-reveal>
                  <SmartLink
                    href={projectPath(project)}
                    className="work-list_image-wrap-v2"
                    aria-label={`View ${project.title}`}
                    data-work-hover
                  >
                    <ProjectMedia
                      project={project}
                      imageClassName="work-list_image-v2"
                      sizes="(max-width: 991px) 100vw, 50vw"
                      preload={i < 2}
                    />
                    <div className="work-list_name-v2">
                      <div className="work-list_dot" />
                      <div className="work-list_title">{project.tags.join(" · ")}</div>
                    </div>
                  </SmartLink>
                  <div className="work-list_infos-v2" style={project.color ? { backgroundColor: project.color } : undefined}>
                    <div className="work-list_texts">
                      <h2 className="work-list_title-2">{project.title}</h2>
                      <p className="work-list_about text-color-white-50">{project.description}</p>
                    </div>
                    <div className="work-list_about text-color-white-50">{project.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="spacer-huge" />
      <div className="padding-global">
        <div className="container-medium">
          <div className="category_more">
            <Label>{categoryPage.moreLabel}</Label>
            <div className="category_more-links" data-reveal>
              {others.map((other) => (
                <Button key={other.slug} href={`/${other.slug}`} variant="black">
                  {other.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="padding-section-medium" />
    </section>
  );
}
