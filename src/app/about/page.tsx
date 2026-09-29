import type { Metadata } from "next";
import { aboutPage } from "@/content/site";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { Cta } from "@/components/sections/Cta";
import { JourneyTeaser } from "@/components/sections/JourneyTeaser";
import { Toolbox } from "@/components/sections/Toolbox";

export const metadata: Metadata = { title: "About me", description: aboutPage.intro };

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <Toolbox />
      <JourneyTeaser />
      <Cta />
    </>
  );
}
