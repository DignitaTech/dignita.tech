import { ScrollThread } from "@/components/site/scroll-thread";
import { Hero } from "@/components/site/hero";
import { Logos, ClientLogos } from "@/components/site/logos";
import { ValueProp } from "@/components/site/value-prop";
import { ShowcaseScroll } from "@/components/site/showcase-scroll";
import { ServicesPipeline } from "@/components/site/services-pipeline";
import { AreasCarousel } from "@/components/site/areas-carousel";
import { Process } from "@/components/site/process";
import { CTA } from "@/components/site/cta";
import { EcosystemBridge } from "@/components/site/ecosystem-bridge";
import { Diagnostico } from "@/components/site/diagnostico";

export default function Home() {
  return (
    <div className="relative">
      <ScrollThread />
      <main className="relative">
        <Hero />
        <Logos />
        <ValueProp />
        <ShowcaseScroll />
        <ClientLogos />
        <ServicesPipeline />
        <AreasCarousel />
        <Process />
        <CTA />
        <EcosystemBridge />
        <Diagnostico />
      </main>
    </div>
  );
}
