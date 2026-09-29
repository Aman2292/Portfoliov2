import Image from "next/image";
import { projectsIn, showcaseScreens, type Category, type Project } from "@/content/site";
import { deviceFor, domainFor } from "@/lib/projects";
import { MacShowcase, StoreShowcase } from "./MacMockup";
import { PhoneShowcase } from "./PhoneMockup";

/**
 * A project's card visual: apps on iPhones, websites on a MacBook, Shopify stores as desktop + mobile,
 * anything else as its photo.
 */
export function ProjectMedia({
  project,
  imageClassName,
  sizes,
  preload,
}: {
  project: Project;
  imageClassName: string;
  /** `sizes` for the card as a whole; device screens are derived from it. */
  sizes: string;
  preload?: boolean;
}) {
  const alt = `${project.title} preview`;
  const color = project.color ?? "#632f1b";
  switch (deviceFor(project)) {
    case "phone":
      return <PhoneShowcase screens={project.screens!} alt={alt} sizes="(max-width: 991px) 45vw, 20vw" color={color} />;
    case "mac":
      return <MacShowcase shot={project.pages![0].desktop} domain={domainFor(project)} alt={alt} sizes={sizes} color={color} />;
    case "shopify": {
      const page = project.pages![0];
      return <StoreShowcase desktop={page.desktop} mobile={page.mobile} domain={domainFor(project)} alt={alt} sizes={sizes} color={color} />;
    }
    default:
      return project.image ? <Image src={project.image} alt="" className={imageClassName} sizes={sizes} preload={preload} /> : null;
  }
}

/** Home "Selected Work" card: the category's devices when it has any, otherwise its cover photo. */
export function CategoryMedia({ category, sizes, preload }: { category: Category; sizes: string; preload?: boolean }) {
  const screens = showcaseScreens(category.slug);
  if (screens.length) {
    return <PhoneShowcase screens={screens} alt={`${category.label} app screens`} sizes="(max-width: 991px) 30vw, 14vw" />;
  }
  const featured = projectsIn(category.slug).find((project) => deviceFor(project) !== "photo");
  if (featured) return <ProjectMedia project={featured} imageClassName="work-list_img" sizes={sizes} preload={preload} />;
  return <Image src={category.cover} alt="" className="work-list_img" sizes={sizes} preload={preload} />;
}
