import { projects, projectsIn, type Project } from "@/content/site";

export type Device = "phone" | "mac" | "shopify" | "photo";

/** URL-safe name made from the title: "Personal Site" → "personal-site". */
export const projectSlug = (project: Project) =>
  project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const projectPath = (project: Project) => `/${project.category}/${projectSlug(project)}`;

export const findProject = (category: string, slug: string) =>
  projects.find((project) => project.category === category && projectSlug(project) === slug);

/** Apps show on an iPhone, websites on a MacBook, Shopify stores in a theme-preview window. */
export function deviceFor(project: Project): Device {
  if (project.screens?.length) return "phone";
  if (project.pages?.length) return project.category === "shopify" ? "shopify" : "mac";
  return "photo";
}

export function domainFor(project: Project) {
  if (project.domain) return project.domain;
  if (project.url) return new URL(project.url).host;
  return `${projectSlug(project)}.com`;
}

/** The following project in the same category, wrapping round to the first. */
export function nextProject(project: Project) {
  const siblings = projectsIn(project.category);
  return siblings[(siblings.indexOf(project) + 1) % siblings.length];
}
