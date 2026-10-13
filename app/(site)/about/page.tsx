import type { Metadata } from "next";
import PageHero from "@/components/inner/PageHero";
import { AreaBand, CardGrid, CtaBand, SectionHead } from "@/components/inner/Bits";
import { AboutStory, TaglineBand } from "@/components/inner/MoreSections";
import { aboutValues } from "@/lib/data/inner";

export const metadata: Metadata = {
  title: "About Chris & Flawless Detailing | Thornton, CO Auto Detailer",
  description:
    "The story behind Flawless Detailing: Chris, a one-vehicle-at-a-time approach and careful detailing in Thornton, CO since 2018.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="hv">
      <PageHero
        crumb="About"
        eyebrow="About Flawless Detailing"
        title={
          <>
            Personal care. <em>From Chris.</em>
          </>
        }
        text="Based in Thornton since 2018, Chris treats every vehicle like his own."
        image="interior-clean.jpg"
        position="center"
      />
      <AboutStory />
      <section className="hv-sec">
        <div className="hw">
          <SectionHead eyebrow="How we work" title="What you can" accent="expect." />
          <CardGrid items={aboutValues} cols={4} />
        </div>
      </section>
      <TaglineBand />
      <AreaBand />
      <CtaBand />
    </div>
  );
}
