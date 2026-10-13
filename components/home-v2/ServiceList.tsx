import Icon from "@/components/shared/Icon";
import Img from "@/components/shared/Img";
import { homeServiceColumns, homeStrip } from "@/lib/data/content";

/** All 12 secondary services in three columns, followed by a photo strip. */
export default function ServiceList() {
  return (
    <section className="hv-sec" id="services-list">
      <div className="hw">
        <div className="hv-eyebrow">Complete auto detailing services</div>
        <h2 className="hv-h2">
          More than a detail. <em>A higher standard.</em>
        </h2>

        <div className="hv-svc">
          {homeServiceColumns.map((col, i) => (
            <div className="hv-svc-col" key={i}>
              {col.map((s) => (
                <div className="hv-svc-item" key={s.name}>
                  <span className="hv-ic hv-ic-lg">
                    <Icon name={s.icon} strokeWidth={1.6} />
                  </span>
                  <div>
                    <b>{s.name}</b>
                    <small>{s.text}</small>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="hv-strip">
          {homeStrip.map((p) => (
            <div className="hv-strip-img" key={p.file}>
              <Img file={p.file} alt={p.alt} style={{ objectPosition: p.position }} sizes="(max-width: 760px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
