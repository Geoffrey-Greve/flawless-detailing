import type { Metadata } from "next";
import PageHero from "@/components/inner/PageHero";
import Contact from "@/components/home-v2/Contact";
import { FaqJsonLd, ProcessSteps, SectionHead } from "@/components/inner/Bits";
import Faq from "@/components/inner/Faq";
import { faqContact, nextSteps } from "@/lib/data/inner";

export const metadata: Metadata = {
  title: "Free Quote | Contact Flawless Detailing in Thornton, CO",
  description:
    "Request a free detailing quote or call Flawless Detailing in Thornton, CO. Mobile service available across the Denver metro.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="hv">
      <PageHero
        crumb="Contact"
        eyebrow="Get in touch"
        title={
          <>
            Let’s talk about <em>your car.</em>
          </>
        }
        text="Tell us about your vehicle and what you want done. Prefer to talk? Call or message any time."
        image="droplets-hood.jpg"
        position="center"
        showCtas={false}
      />
      <Contact />
      <section className="hv-sec">
        <div className="hw">
          <SectionHead eyebrow="What happens next" title="Simple" accent="and clear." />
          <ProcessSteps items={nextSteps} />
        </div>
      </section>
      <section className="hv-sec">
        <div className="hw">
          <SectionHead eyebrow="Questions" title="Quick" accent="answers." />
          <Faq items={faqContact} />
        </div>
      </section>
      <FaqJsonLd items={faqContact} />
    </div>
  );
}
