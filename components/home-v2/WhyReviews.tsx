import Link from "next/link";
import Icon from "@/components/shared/Icon";
import { homeThemes, homeWhy } from "@/lib/data/content";
import { site } from "@/lib/site";

/** "Why choose us" row + the customer-reviews summary band. */
export default function WhyReviews() {
  return (
    <>
      <section className="hv-sec" id="why">
        <div className="hw">
          <div className="hv-eyebrow">Why choose Flawless Detailing</div>
          <h2 className="hv-h2">Experience. Craftsmanship. Personal service.</h2>
          <div className="hv-why">
            {homeWhy.map((w) => (
              <div className="hv-why-item" key={w.title}>
                <span className="hv-ic hv-ic-lg">
                  <Icon name={w.icon} strokeWidth={1.6} />
                </span>
                <b>{w.title}</b>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hv-sec hv-sec-tight" id="reviews">
        <div className="hw hv-rev">
          <div>
            <div className="hv-eyebrow">Customer reviews</div>
            <h2 className="hv-h2">What customers value.</h2>
            {/* TODO(client): replace the themes with real, attributed quotes. */}
            <div className="hv-themes">
              <span className="hv-themes-label">Customer feedback themes</span>
              <div className="hv-themes-row">
                {homeThemes.map((t) => (
                  <div className="hv-theme" key={t.text}>
                    <span className="hv-ic">
                      <Icon name={t.icon} strokeWidth={1.7} />
                    </span>
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hv-score">
            <div className="hv-score-line">
              <b>{site.rating}/5</b>
              <span className="hv-stars" aria-hidden="true">
                ★★★★★
              </span>
            </div>
            <small>Customer-reported rating · verification pending.</small>
            <Link className="hbtn o wide" href="/reviews">
              Read Customer Reviews <Icon name="arrow" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
