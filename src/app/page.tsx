import { AmbientBackground } from "@/components/site/ambient-background";
import { Navbar } from "@/components/site/navbar";
import { ScrollThread } from "@/components/site/scroll-thread";
import { Hero } from "@/components/site/hero";
import { Logos } from "@/components/site/logos";
import { ValueProp } from "@/components/site/value-prop";
import { ShowcaseScroll } from "@/components/site/showcase-scroll";
import { ServicesPipeline } from "@/components/site/services-pipeline";
import { AreasCarousel } from "@/components/site/areas-carousel";
import { Process } from "@/components/site/process";
import { Testimonials } from "@/components/site/testimonials";
import { CTA } from "@/components/site/cta";
import { Diagnostico } from "@/components/site/diagnostico";
import { Footer } from "@/components/ui/footer-section";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <div className="relative">
        <ScrollThread />
        <main className="relative">
        <Hero />
        <Logos />
        <ValueProp />
        <ShowcaseScroll />
        <ServicesPipeline />
        <AreasCarousel />
        <Process />
        <Testimonials />
        <CTA />
        <Diagnostico />
        </main>
        <Footer />
      </div>
    </>
  );
}
