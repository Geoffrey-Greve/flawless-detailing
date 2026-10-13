import Link from "next/link";
import type { ReactNode } from "react";
import Img from "@/components/shared/Img";
import Icon, { type IconName } from "@/components/shared/Icon";
import { areas } from "@/lib/data/inner";
import { site } from "@/lib/site";

/** Eyebrow + heading (+ optional intro) used at the top of each section. */
export function SectionHead({
  eyebrow,
  title,
  accent,
  text,
}: {
  eyebrow: string;
  title: ReactNode;
  accent?: string;
  text?: string;
}) {
  return (
    <div className="ip-head">
      <div className="hv-eyebrow">{eyebrow}</div>
      <h2 className="hv-h2">
        {title}
        {accent ? <> <em>{accent}</em></> : null}
      </h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

/** Generic grid of icon cards (pillars, values, review themes, benefits). */
export function CardGrid({
  items,
  cols = 3,
}: {
  items: { icon: IconName; title: string; text: string }[];
  cols?: 2 | 3 | 4;
}) {
  return (
    <div className={`ip-cards c${cols}`}>
      {items.map((it) => (
        <div className="ip-card" key={it.title}>
          <span className="hv-ic hv-ic-lg">
            <Icon name={it.icon} strokeWidth={1.6} />
          </span>
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </div>
      ))}
    </div>
  );
}

/** Numbered steps (process, "what happens next"). */
export function ProcessSteps({
  items,
}: {
  items: { n: string; icon: IconName; title: string; text: string }[];
}) {
  return (
    <ol className={`ip-steps s${items.length}`}>
      {items.map((s) => (
        <li className="ip-step" key={s.n}>
          <div className="ip-step-top">
            <b>{s.n}</b>
            <span className="hv-ic">
              <Icon name={s.icon} strokeWidth={1.6} />
            </span>
          </div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Where we work: chips + a line about mobile service. */
export function AreaBand() {
  return (
    <section className="hv-sec">
      <div className="hw">
        <div className="ip-area">
          <div>
            <div className="hv-eyebrow">Service area</div>
            <h2 className="hv-h2">
              At the studio, or <em>at your door.</em>
            </h2>
            <p>
              Work happens at our Thornton studio, or we bring premium detailing and coatings to your
              home or office across the Denver metro area.
            </p>
          </div>
          <ul className="ip-chips">
            {areas.map((a) => (
              <li key={a}>
                <Icon name="pin" strokeWidth={1.8} />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Closing call to action used at the bottom of most inner pages. */
export function CtaBand() {
  return (
    <section className="hv-sec">
      <div className="hw">
        <div className="ip-cta">
          <Img className="ip-cta-img" file="cta-night.jpg" alt="" sizes="(max-width: 1000px) 100vw, 55vw" />
          <div className="ip-cta-copy">
            <div className="hv-eyebrow">Book today</div>
            <h2 className="hv-h2">
              Ready to make it <em>Flawless?</em>
            </h2>
            <p>Tell us about your vehicle and we will recommend the right service.</p>
          </div>
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
