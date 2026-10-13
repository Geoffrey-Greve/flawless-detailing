import type { Metadata } from "next";
import PageHero from "@/components/inner/PageHero";
import Compare from "@/components/home-v2/Compare";
import Gallery from "@/components/inner/Gallery";
import { CtaBand, SectionHead } from "@/components/inner/Bits";
import { FollowBand } from "@/components/inner/MoreSections";
import { resultsCompare } from "@/lib/data/inner";

export const metadata: Metadata = {
  title: "Before & After Gallery | Paint Correction Results in Thornton, CO | Flawless Detailing",
  description:
    "See paint correction, ceramic coating and detailing results from Flawless Detailing in Thornton, CO. Drag the slider to compare before and after.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  return (
    <div className="hv">
      <PageHero
        crumb="Before & After"
        eyebrow="Before and after gallery"
        title={
          <>
            Results you <em>can see.</em>
          </>
        }
        text="Paint, lenses and interiors, before and after. Drag the slider to compare."
        image="glossy-black.jpg"
        position="center 45%"
      />
      <Compare pairs={resultsCompare} variant="strip" />
      <section className="hv-sec">
        <div className="hw">
          <SectionHead
            eyebrow="Our work"
            title="Photo"
            accent="gallery."
            text="Browse by service. Sample photos shown while real client photos are being added."
          />
          <Gallery />
        </div>
      </section>
      <FollowBand />
      <CtaBand />
    </div>
  );
}
