import { About } from "@/components/sections/About";
import { Cta } from "@/components/sections/Cta";
import { Hero } from "@/components/sections/Hero";
import { LatestProjects } from "@/components/sections/LatestProjects";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { Showreel } from "@/components/sections/Showreel";
import { WhyUs } from "@/components/sections/WhyUs";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <WhyUs />
      <About />
      <Services />
      <Showreel />
      <LatestProjects />
      <Cta />
    </>
  );
}
