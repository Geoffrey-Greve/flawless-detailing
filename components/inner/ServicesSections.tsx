import Link from "next/link";
import Img from "@/components/shared/Img";
import Icon from "@/components/shared/Icon";
import { CardGrid, ProcessSteps, SectionHead } from "@/components/inner/Bits";
import { ceramicDetail, paintCorrection, paintProcess, servicesFull } from "@/lib/data/inner";

function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="ip-ticks">
      {items.map((t) => (
        <li key={t}>
          <Icon name="check" strokeWidth={2.4} />
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Paint correction in depth: what it fixes + how we do it. */
export function PaintCorrectionSection() {
  const pc = paintCorrection;
  return (
    <section className="hv-sec" id="paint-correction">
      <div className="hw">
        <div className="ip-split">
          <div className="ip-split-img">
            <Img file={pc.image} alt={pc.alt} sizes="(max-width: 1000px) 100vw, 50vw" />
          </div>
          <div>
            <div className="hv-eyebrow">{pc.eyebrow}</div>
            <h2 className="hv-h2">
              {pc.title} <em>{pc.accent}</em>
            </h2>
            {pc.text.map((p) => (
              <p className="ip-lead" key={p}>
                {p}
              </p>
            ))}
            <h3 className="ip-sub">{pc.fixesTitle}</h3>
            <Ticks items={pc.fixes} />
            <div className="hv-actions ip-mt">
              <Link className="hbtn p" href="/contact">
                Get a Free Quote <Icon name="arrow" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>

        <div className="ip-below">
          <h3 className="ip-sub">How we correct paint</h3>
          <ProcessSteps items={paintProcess} />
        </div>
      </div>
    </section>
  );
}

/** Ceramic coatings in depth: benefits + nano-ceramic vs graphene. */
export function CeramicSection() {
  const c = ceramicDetail;
  return (
    <section className="hv-sec" id="ceramic">
      <div className="hw">
        <div className="ip-split rev">
          <div className="ip-split-img">
            <Img file={c.image} alt={c.alt} sizes="(max-width: 1000px) 100vw, 50vw" />
          </div>
          <div>
            <div className="hv-eyebrow">{c.eyebrow}</div>
            <h2 className="hv-h2">
              {c.title} <em>{c.accent}</em>
            </h2>
            <p className="ip-lead">{c.text}</p>
            <p className="ip-note">{c.note}</p>
          </div>
        </div>

        <div className="ip-below">
          <CardGrid items={c.benefits} cols={4} />
        </div>

        <div className="ip-below">
          <SectionHead
            eyebrow="Choose your protection"
            title="Nano-ceramic"
            accent="or graphene."
            text="Both bond to your paint for long-term protection. Chris will recommend the right one for your vehicle and how you drive it."
          />
          <div className="ip-opts">
            {c.options.map((o) => (
              <article className={`ip-opt${o.featured ? " feat" : ""}`} key={o.title}>
                <div className="hv-eyebrow">{o.tag}</div>
                <h3>{o.title}</h3>
                <Ticks items={o.points} />
                <Link className={`hbtn ${o.featured ? "p" : "o"}`} href="/contact">
                  {o.cta} <Icon name="arrow" strokeWidth={2.2} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Every service, as a card grid. */
export function ServiceGrid() {
  return (
    <section className="hv-sec" id="all-services">
      <div className="hw">
        <SectionHead
          eyebrow="Complete auto detailing services"
          title="More than a detail."
          accent="A higher standard."
          text="Everything your vehicle needs, from paint correction to interior care."
        />
        <div className="ip-sgrid">
          {servicesFull.map((s) => (
            <Link className="ip-svc" href="/contact" key={s.name}>
              <span className="hv-ic hv-ic-lg">
                <Icon name={s.icon} strokeWidth={1.6} />
              </span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <span className="ip-go">
                Get a quote <Icon name="arrow" strokeWidth={2.2} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
