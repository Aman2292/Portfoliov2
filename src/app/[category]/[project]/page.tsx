import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/site";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { Cta } from "@/components/sections/Cta";
import { findProject, projectSlug } from "@/lib/projects";

// Only projects listed in site.ts have pages; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ category: project.category, project: projectSlug(project) }));
}

export async function generateMetadata({ params }: PageProps<"/[category]/[project]">): Promise<Metadata> {
  const { category, project: slug } = await params;
  const project = findProject(category, slug);
  return project ? { title: project.title, description: project.description } : {};
}

export default async function ProjectPage({ params }: PageProps<"/[category]/[project]">) {
  const { category, project: slug } = await params;
  const project = findProject(category, slug);
  if (!project) notFound();

  return (
    <>
      <ProjectDetail project={project} />
      <Cta />
    </>
  );
}
