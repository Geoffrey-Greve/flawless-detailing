import Link from "next/link";
import Img from "@/components/shared/Img";
import Icon from "@/components/shared/Icon";
import { SectionHead } from "@/components/inner/Bits";
import { aboutFacts, aboutStory, craftVsWash, reviewQuotes, reviewThemesLong } from "@/lib/data/inner";
import { site } from "@/lib/site";

/* ----------------------------- Why us ----------------------------- */

export function CraftVsWash() {
  return (
    <section className="hv-sec">
      <div className="hw">
        <SectionHead eyebrow="Not a car wash" title="Craft over" accent="car wash." text="Why a careful, paint-focused process gives a different result." />
        <div className="ip-vs" role="table" aria-label="Flawless Detailing compared with a typical car wash">
          <div className="ip-vs-row head" role="row">
            <span role="columnheader" />
            <span role="columnheader" className="us">Flawless Detailing</span>
            <span role="columnheader">A typical car wash</span>
          </div>
          {craftVsWash.map((r) => (
            <div className="ip-vs-row" role="row" key={r.label}>
              <b role="rowheader">{r.label}</b>
              <span role="cell" className="us">
                <Icon name="check" strokeWidth={2.4} />
                {r.us}
              </span>
              <span role="cell">{r.them}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Reviews ----------------------------- */

export function RatingSummary() {
  return (
    <section className="hv-sec hv-sec-tight">
      <div className="hw ip-rating">
        <div className="ip-score">
          <div className="hv-eyebrow">Customer reputation</div>
          <div className="ip-score-line">
            <b>{site.rating}/5</b>
            <span className="hv-stars" aria-hidden="true">
              ★★★★★
            </span>
          </div>
          <small>Customer-reported rating · verification pending.</small>
          <div className="hv-actions">
            <a className="hbtn p" href={site.social.facebook} target="_blank" rel="noopener noreferrer">
              Read reviews on Facebook <Icon name="arrow" strokeWidth={2.2} />
            </a>
            <Link className="hbtn o" href="/contact">
              Get a Free Quote
            </Link>
          </div>
        </div>
        <div className="ip-themes">
          <span className="ip-themes-label">What customers mention</span>
          {reviewThemesLong.map((t) => (
            <div className="ip-theme" key={t.title}>
              <span className="hv-ic">
                <Icon name={t.icon} strokeWidth={1.7} />
              </span>
              <div>
                <b>{t.title}</b>
                <p>{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Renders nothing until real, attributed quotes are added to lib/data/inner.ts. */
export function ReviewQuotes() {
  if (reviewQuotes.length === 0) return null;
  return (
    <section className="hv-sec">
      <div className="hw">
        <SectionHead eyebrow="In their words" title="What customers" accent="say." />
        <div className="ip-quotes">
          {reviewQuotes.map((q) => (
            <figure className="ip-quote" key={q.name + q.text.slice(0, 12)}>
              <span className="hv-stars" aria-hidden="true">
                ★★★★★
              </span>
              <blockquote>“{q.text}”</blockquote>
              <figcaption>
                <b>{q.name}</b>
                {q.vehicle ? <small>{q.vehicle}</small> : null}
                <small>{q.source}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- About ----------------------------- */

export function AboutStory() {
  return (
    <section className="hv-sec">
      <div className="hw">
        <div className="ip-split rev">
          <div className="ip-split-img">
            {/* TODO(client): replace with a real photo of Chris at work. */}
            <Img file="salon-a.jpg" alt="Detailer working inside a car interior" sizes="(max-width: 1000px) 100vw, 50vw" />
          </div>
          <div>
            <div className="hv-eyebrow">Our story</div>
            <h2 className="hv-h2">
              Built one vehicle <em>at a time.</em>
            </h2>
            {aboutStory.map((p) => (
              <p className="ip-lead" key={p}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="ip-facts">
          {aboutFacts.map((f) => (
            <div className="ip-fact" key={f.title}>
              <span className="hv-ic hv-ic-lg">
                <Icon name={f.icon} strokeWidth={1.6} />
              </span>
              <div>
                <b>{f.title}</b>
                <small>{f.text}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TaglineBand() {
  return (
    <section className="hv-sec">
      <div className="hw">
        <p className="ip-tagline">
          Don’t get caught riding dirty. <em>Keep it Flawless.</em>
        </p>
      </div>
    </section>
  );
}

/* ----------------------------- Results ----------------------------- */

export function FollowBand() {
  return (
    <section className="hv-sec">
      <div className="hw">
        <div className="ip-follow">
          <div>
            <div className="hv-eyebrow">More of our work</div>
            <h2 className="hv-h2">
              Follow along <em>on social.</em>
            </h2>
            <p>New projects and finished vehicles show up on Instagram and Facebook first.</p>
          </div>
          <div className="hv-actions">
            <a className="hbtn o" href={site.social.instagram} target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" strokeWidth={1.9} /> Instagram
            </a>
            <a className="hbtn o" href={site.social.facebook} target="_blank" rel="noopener noreferrer">
              <Icon name="facebook" strokeWidth={1.9} /> Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
