import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { ProgressiveBlur } from "@/components/layout/ProgressiveBlur";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { About } from "@/components/sections/About";
import { Blog } from "@/components/sections/Blog";
import { Cta } from "@/components/sections/Cta";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Pricing } from "@/components/sections/Pricing";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { Showreel } from "@/components/sections/Showreel";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";

export default function Home() {
  return (
    <>
      <Preloader />
      <div className="page-wrapper">
        <Navbar />
        <ProgressiveBlur />
        <main className="main-wrapper">
          <Hero />
          <Partners />
          <SelectedWork />
          <WhyUs />
          <About />
          <Services />
          <Showreel />
          <Testimonials />
          <Pricing />
          <Faq />
          <Blog />
          <Cta />
        </main>
        <Footer />
      </div>
      <ScrollAnimations />
    </>
  );
}
