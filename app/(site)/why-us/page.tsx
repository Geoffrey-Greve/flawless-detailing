import type { Metadata } from "next";
import PageHero from "@/components/inner/PageHero";
import { AreaBand, CardGrid, CtaBand, ProcessSteps, SectionHead } from "@/components/inner/Bits";
import { CraftVsWash } from "@/components/inner/MoreSections";
import { steps } from "@/lib/data/content";
import { pillars } from "@/lib/data/inner";

export const metadata: Metadata = {
  title: "Why Choose Flawless Detailing | Mobile Auto Detailing in Thornton, CO",
  description:
    "Detailing since 2018, mobile service across the Denver metro, premium products and an owner who is on every job. See why drivers choose Flawless Detailing.",
  alternates: { canonical: "/why-us" },
};

export default function WhyUsPage() {
  return (
    <div className="hv">
      <PageHero
        crumb="Why Us"
        eyebrow="Why choose Flawless Detailing"
        title={
          <>
            Experience. Craftsmanship. <em>Personal service.</em>
          </>
        }
        text="Since 2018, with mobile service, premium products and clear communication from first message to final walk-around."
        image="bay-bentley.jpg"
        position="55% center"
      />

      <section className="hv-sec">
        <div className="hw">
          <SectionHead eyebrow="What you get" title="Six reasons" accent="drivers choose us." />
          <CardGrid items={pillars} cols={3} />
        </div>
      </section>

      <CraftVsWash />

      <section className="hv-sec">
        <div className="hw">
          <SectionHead eyebrow="How it works" title="Four steps." accent="One finish." />
          <ProcessSteps items={steps} />
        </div>
      </section>

      <AreaBand />
      <CtaBand />
    </div>
  );
}
