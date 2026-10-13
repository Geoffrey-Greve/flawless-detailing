import type { Metadata } from "next";
import PageHero from "@/components/inner/PageHero";
import { CardGrid, CtaBand, SectionHead } from "@/components/inner/Bits";
import { RatingSummary, ReviewQuotes } from "@/components/inner/MoreSections";
import { homeWhy } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Customer Reviews | Flawless Detailing Thornton, CO",
  description:
    "What Thornton and Denver-metro drivers say about Chris and Flawless Detailing: clear communication, careful paint correction and beautiful ceramic finishes.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <div className="hv">
      <PageHero
        crumb="Reviews"
        eyebrow="Customer reviews"
        title={
          <>
            What customers <em>value.</em>
          </>
        }
        text="Drivers across Thornton and the Denver metro call out Chris's communication and the quality of his paint correction and ceramic work."
        image="grille-polish.jpg"
        position="60% center"
      />
      <RatingSummary />
      <ReviewQuotes />
      <section className="hv-sec">
        <div className="hw">
          <SectionHead eyebrow="Why customers choose us" title="Experience. Craftsmanship." accent="Personal service." />
          <CardGrid items={homeWhy} cols={4} />
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
