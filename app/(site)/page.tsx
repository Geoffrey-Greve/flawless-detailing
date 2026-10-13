import Hero from "@/components/home-v2/Hero";
import TrustBar from "@/components/home-v2/TrustBar";
import Features from "@/components/home-v2/Features";
import ServiceList from "@/components/home-v2/ServiceList";
import Compare from "@/components/home-v2/Compare";
import WhyReviews from "@/components/home-v2/WhyReviews";
import About from "@/components/home-v2/About";
import Contact from "@/components/home-v2/Contact";

/** Home page, built from the approved home design (v2). */
export default function HomePage() {
  return (
    <div className="hv">
      <Hero />
      <TrustBar />
      <Features />
      <ServiceList />
      <Compare />
      <WhyReviews />
      <About />
      <Contact />
    </div>
  );
}
