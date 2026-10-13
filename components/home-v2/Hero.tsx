import Link from "next/link";
import Img from "@/components/shared/Img";
import Icon from "@/components/shared/Icon";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="hv-hero">
      <Img
        className="hv-hero-img"
        file="bay-bentley.jpg"
        alt="Black luxury car in a dark detailing bay"
        priority
        sizes="(max-width: 760px) 100vw, 70vw"
      />
      <div className="hw">
        <div className="hv-hero-copy">
          <div className="hv-eyebrow">Car detailing in Thornton, CO</div>
          <h1>
            Bring back the
            <br /> depth. <em>Keep the gloss.</em>
          </h1>
          <p>
            Paint correction, ceramic coatings and complete auto detailing to bring out the best in
            your vehicle and keep it looking its best.
          </p>
          <div className="hv-actions">
            <Link className="hbtn p" href="/contact">
              Get a Free Quote <Icon name="arrow" strokeWidth={2.2} />
            </Link>
            <Link className="hbtn o" href={site.phoneHref}>
              <Icon name="phone" strokeWidth={2} /> Call Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
