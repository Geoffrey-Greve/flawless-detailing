import Icon from "@/components/shared/Icon";
import QuoteForm from "@/components/home-v2/QuoteForm";
import { mapEmbedUrl, site } from "@/lib/site";

export default function Contact() {
  const { address } = site;
  return (
    <section className="hv-sec" id="contact">
      <div className="hw">
        <div className="hv-eyebrow">Get in touch</div>
        <h2 className="hv-h2">Get your free quote.</h2>

        <div className="hv-contact">
          <QuoteForm />
          <aside className="hv-info">
            <a className="hv-info-row" href={site.phoneHref}>
              <Icon name="phone" strokeWidth={1.8} />
              <span>{site.phoneDisplay}</span>
            </a>
            <a className="hv-info-row" href={`mailto:${site.email}`}>
              <Icon name="mail" strokeWidth={1.8} />
              <span>{site.email}</span>
            </a>
            <div className="hv-info-row">
              <Icon name="pin" strokeWidth={1.8} />
              <span>
                {address.street}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </span>
            </div>
            <iframe
              className="hv-map"
              title="Flawless Detailing location in Thornton, CO"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedUrl}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
