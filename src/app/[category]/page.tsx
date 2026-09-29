import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/content/site";
import { CategoryProjects } from "@/components/sections/CategoryProjects";
import { Cta } from "@/components/sections/Cta";

// Only the categories defined in site.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

function findCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/[category]">): Promise<Metadata> {
  const category = findCategory((await params).category);
  return category ? { title: category.label, description: category.description } : {};
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const category = findCategory((await params).category);
  if (!category) notFound();

  return (
    <>
      <CategoryProjects category={category} />
      <Cta />
    </>
  );
}
