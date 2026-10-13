import type { Metadata } from "next";
import PageHero from "@/components/inner/PageHero";
import { AreaBand, CtaBand, FaqJsonLd, SectionHead } from "@/components/inner/Bits";
import Faq from "@/components/inner/Faq";
import { CeramicSection, PaintCorrectionSection, ServiceGrid } from "@/components/inner/ServicesSections";
import { faqServices } from "@/lib/data/inner";

export const metadata: Metadata = {
  title: "Auto Detailing Services in Thornton, CO | Paint Correction & Ceramic Coating | Flawless Detailing",
  description:
    "Paint correction, ceramic and graphene coatings, interior and exterior detailing, window tinting, dent removal and more, in Thornton, CO and across the Denver metro.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="hv">
      <PageHero
        crumb="Services"
        eyebrow="Auto detailing in Thornton, CO"
        title={
          <>
            Everything your car needs. <em>Done properly.</em>
          </>
        }
        text="Paint correction and ceramic coatings first, then everything else your vehicle needs, at our studio or at your door."
        image="polish-a.jpg"
        position="70% center"
      />
      <PaintCorrectionSection />
      <CeramicSection />
      <ServiceGrid />
      <AreaBand />
      <section className="hv-sec">
        <div className="hw">
          <SectionHead eyebrow="Questions" title="Good to" accent="know." />
          <Faq items={faqServices} />
        </div>
      </section>
      <CtaBand />
      <FaqJsonLd items={faqServices} />
    </div>
  );
}
