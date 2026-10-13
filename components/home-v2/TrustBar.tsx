import Icon from "@/components/shared/Icon";
import { homeTrust } from "@/lib/data/content";
import { site } from "@/lib/site";

export default function TrustBar() {
  return (
    <section className="hv-trust" aria-label="Why drivers trust Flawless Detailing">
      <div className="hw hv-trust-in">
        {homeTrust.map((t) => (
          <div className="hv-trust-item" key={t.title}>
            <span className="hv-ic">
              <Icon name={t.icon} strokeWidth={1.7} />
            </span>
            <div>
              <b>{t.title}</b>
              <small>{t.text}</small>
            </div>
          </div>
        ))}
        <div className="hv-trust-item">
          <span className="hv-ic">
            <Icon name="sparkle" strokeWidth={1.7} />
          </span>
          <div>
            <b>{site.rating}/5</b>
            <span className="hv-stars" aria-hidden="true">
              ★★★★★
            </span>
            <small>Customer reputation</small>
          </div>
        </div>
      </div>
    </section>
  );
}
