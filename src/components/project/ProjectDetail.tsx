import Image from "next/image";
import type { CSSProperties } from "react";
import { categories, type Project } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { ProjectMedia } from "@/components/ui/ProjectMedia";
import { SmartLink } from "@/components/ui/SmartLink";
import { deviceFor, domainFor, nextProject, projectPath } from "@/lib/projects";
import { MacDemo } from "./MacDemo";
import { Arrow, PhoneDemo } from "./PhoneDemo";
import { StoreDemo } from "./StoreDemo";

/** The interactive device for a project: iPhone for apps, MacBook for websites, MacBook + iPhone for Shopify stores. */
function ProjectDemo({ project }: { project: Project }) {
  switch (deviceFor(project)) {
    case "phone":
      return <PhoneDemo screens={project.screens!} title={project.title} description={project.description} />;
    case "mac":
      return <MacDemo pages={project.pages!} domain={domainFor(project)} title={project.title} description={project.description} />;
    case "shopify":
      return <StoreDemo pages={project.pages!} domain={domainFor(project)} title={project.title} description={project.description} url={project.url} />;
    default:
      return project.image ? (
        <div className="project_photo">
          <Image src={project.image} alt={`${project.title} preview`} fill sizes="100vw" preload className="project_photo-img" />
        </div>
      ) : null;
  }
}

export function ProjectDetail({ project }: { project: Project }) {
  const category = categories.find((c) => c.slug === project.category)!;
  const next = nextProject(project);
  const facts = [
    { label: "Category", value: category.label },
    { label: "Year", value: project.year },
    project.role && { label: "Role", value: project.role },
    { label: "Platform", value: project.tags.join(" · ") },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  return (
    <section className="section_project" style={{ "--showcase": project.color ?? "#632f1b" } as CSSProperties}>
      <div className="padding-section-small is-mobile-medium" />
      <div className="padding-global">
        <div className="container-medium">
          <SmartLink href={`/${category.slug}`} className="project_back">
            <Arrow /> {category.label}
          </SmartLink>
          <div className="category_head">
            <h1 className="heading-style-display category_heading" data-reveal>
              {project.title}.
            </h1>
            <div className="category_meta" data-reveal>
              <div className="work-list_head-texts">
                <div className="text-style-label">
                  {category.label} · {project.year}
                </div>
                <p className="text-size-small text-size-grey-400">{project.description}</p>
              </div>
              {project.url && (
                <Button href={project.url} variant="black">
                  Visit live
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="spacer-large" />

      <div className="padding-global is-tiny">
        <div className={`project_stage is-${deviceFor(project)}`}>
          <ProjectDemo project={project} />
        </div>
      </div>

      <div className="padding-section-small" />
      <div className="padding-global">
        <div className="container-medium">
          <div className="project_info">
            <div>
              <Label>Overview</Label>
              <div className="spacer-medium" />
              <p className="heading-style-h5 project_overview" data-reveal>
                {project.overview ?? project.description}
              </p>
            </div>
            <dl className="project_facts" data-reveal>
              {facts.map((fact) => (
                <div key={fact.label} className="project_fact">
                  <dt className="text-style-label">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {next !== project && (
        <>
          <div className="padding-section-small" />
          <div className="padding-global is-tiny">
            <SmartLink href={projectPath(next)} className="project_next" data-reveal>
              <div className="project_next-text">
                <span className="text-style-label">Next project</span>
                <span className="project_next-title">
                  {next.title} <Arrow />
                </span>
                <span className="text-size-small">{next.description}</span>
              </div>
              <div className="project_next-media">
                <ProjectMedia project={next} imageClassName="project_next-img" sizes="(max-width: 767px) 100vw, 50vw" />
              </div>
            </SmartLink>
          </div>
        </>
      )}
      <div className="padding-section-medium" />
    </section>
  );
}
