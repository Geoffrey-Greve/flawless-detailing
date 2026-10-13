"use client";

import { useCallback, useEffect, useState } from "react";
import Img from "@/components/shared/Img";
import Icon from "@/components/shared/Icon";
import { gallery, galleryCats, type GalleryCat } from "@/lib/data/inner";

/** Filterable photo grid with a keyboard-friendly lightbox. */
export default function Gallery() {
  const [cat, setCat] = useState<GalleryCat | "All">("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = cat === "All" ? gallery : gallery.filter((g) => g.cat === cat);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const current = open !== null ? items[open] : null;

  return (
    <>
      <div className="ip-filters" role="group" aria-label="Filter photos">
        {(["All", ...galleryCats] as const).map((c) => (
          <button
            type="button"
            key={c}
            className={c === cat ? "on" : undefined}
            aria-pressed={c === cat}
            onClick={() => {
              setCat(c);
              setOpen(null);
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="ip-gal">
        {items.map((g, i) => (
          <button type="button" className="ip-gal-item" key={g.file} onClick={() => setOpen(i)} aria-label={`Open photo: ${g.label}`}>
            <Img file={g.file} alt={g.label} sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw" />
            <span>
              <small>{g.cat}</small>
              {g.label}
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div className="ip-lb" role="dialog" aria-modal="true" aria-label={current.label} onClick={close}>
          <button type="button" className="ip-lb-btn x" aria-label="Close" onClick={close}>
            <Icon name="close" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="ip-lb-btn p"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            <Icon name="prev" strokeWidth={2} />
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <Img file={current.file} alt={current.label} sizes="90vw" />
            <figcaption>
              {current.label} <small>{open! + 1} / {items.length}</small>
            </figcaption>
          </figure>
          <button
            type="button"
            className="ip-lb-btn n"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            <Icon name="next" strokeWidth={2} />
          </button>
        </div>
      )}
    </>
  );
}
