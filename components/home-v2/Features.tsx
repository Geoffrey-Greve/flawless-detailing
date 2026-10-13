import Link from "next/link";
import Img from "@/components/shared/Img";
import Icon from "@/components/shared/Icon";
import { homeFeatures } from "@/lib/data/content";

/** The two signature services: paint correction and ceramic coatings. */
export default function Features() {
  return (
    <section className="hv-sec hv-sec-tight" id="services">
      <div className="hw hv-cards">
        {homeFeatures.map((f) => (
          <article className="hv-card" key={f.eyebrow}>
            <Img
              file={f.image}
              alt={f.alt}
              style={{ objectPosition: f.position }}
              sizes="(max-width: 1000px) 100vw, 50vw"
            />
            <div className="hv-card-copy">
              <div className="hv-eyebrow">{f.eyebrow}</div>
              <h2 className="hv-h3">
                {f.title} <em>{f.accent}</em>
              </h2>
              <p>{f.text}</p>
              <Link className="hbtn p" href={f.href}>
                {f.cta} <Icon name="arrow" strokeWidth={2.2} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
