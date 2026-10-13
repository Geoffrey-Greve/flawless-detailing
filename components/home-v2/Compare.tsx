"use client";

import { useState, type CSSProperties } from "react";
import Img from "@/components/shared/Img";
import { homeCompare } from "@/lib/data/content";

type Pair = { before: string; after: string; label: string; position: string };

/**
 * Before/after slider.
 *  - variant "side": the home layout, two alternates beside the slider.
 *  - variant "strip": the results page, a labelled thumbnail strip under a taller slider.
 * Every pair stays mounted so switching is instant; only the active pair is visible.
 */
export default function Compare({
  pairs = homeCompare as unknown as Pair[],
  variant = "side",
  head = true,
}: {
  pairs?: readonly Pair[];
  variant?: "side" | "strip";
  head?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const others = pairs.map((c, i) => ({ c, i })).filter(({ i }) => i !== active);

  const pick = (i: number) => {
    setActive(i);
    setPos(50);
  };

  return (
    <section className="hv-sec" id="results">
      <div className="hw">
        {head && (
          <div className="hv-ba-head">
            <div>
              <div className="hv-eyebrow">Before and after</div>
              <h2 className="hv-h2">See the difference.</h2>
            </div>
            <p className="hv-note">Illustrative comparison — client photos pending.</p>
          </div>
        )}

        <div className={`hv-ba${variant === "strip" ? " is-strip" : ""}`}>
          {/* TODO(client): swap the generated pairs for Chris's real before/after photos. */}
          <div className="hv-slider" style={{ "--p": `${pos}%` } as CSSProperties}>
            {pairs.map((c, i) => (
              <div className={`hv-pair${i === active ? " on" : ""}`} key={c.after} aria-hidden={i !== active}>
                <Img
                  className="after"
                  file={c.after}
                  alt={i === active ? `${c.label}, after` : ""}
                  style={{ objectPosition: c.position }}
                  priority={i === 0}
                  sizes="(max-width: 1000px) 100vw, 66vw"
                />
                <Img
                  className="before"
                  file={c.before}
                  alt={i === active ? `${c.label}, before` : ""}
                  style={{ objectPosition: c.position }}
                  priority={i === 0}
                  sizes="(max-width: 1000px) 100vw, 66vw"
                />
              </div>
            ))}
            <span className="hv-tag l">Before</span>
            <span className="hv-tag r">After</span>
            {variant === "strip" && <span className="hv-caption">{pairs[active].label}</span>}
            <div className="hv-handle" aria-hidden="true">
              <i>‹ ›</i>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Before and after comparison"
            />
          </div>

          {variant === "side" && (
            <div className="hv-ba-side">
              {others.map(({ c, i }) => (
                <button type="button" key={c.after} className="hv-alt" aria-label={`Preview: ${c.label}`} onClick={() => pick(i)}>
                  <Img file={c.after} alt={c.label} style={{ objectPosition: c.position }} sizes="(max-width: 1000px) 50vw, 24vw" />
                </button>
              ))}
            </div>
          )}
        </div>

        {variant === "strip" && (
          <div className="hv-thumbs" role="group" aria-label="Choose a before and after example">
            {pairs.map((c, i) => (
              <button
                type="button"
                key={c.after}
                className={`hv-th${i === active ? " on" : ""}`}
                aria-pressed={i === active}
                aria-label={`Show: ${c.label}`}
                onClick={() => pick(i)}
              >
                <Img file={c.after} alt="" style={{ objectPosition: c.position }} sizes="(max-width: 760px) 40vw, 16vw" />
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
