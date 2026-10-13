"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-reveal for the sections. Adds `.js` to <html> and tags the listed
 * elements with `.rv` (hidden + shifted), then adds `.in` as they scroll into
 * view. Content stays fully visible when JS is off or reduced motion is set
 * (the stylesheet handles the latter).
 */
const SELECTOR =
  ".head,.card,.tile2,.cmpc,.tile.wy,.step,.thumbs .th,.ba2,.score,.theme,.about>*,.quote>*,.hv-card,.hv-trust-item,.hv-svc-col,.hv-strip-img,.hv-slider,.hv-alt,.hv-why-item,.hv-themes,.hv-score,.hv-about>*,.hv-form,.hv-info,.ip-card,.ip-step,.ip-svc,.ip-opt,.ip-split>*,.ip-area,.ip-cta,.ip-faq,.ip-theme,.ip-score,.ip-quote,.ip-facts,.ip-vs,.ip-follow,.ip-tagline";

export default function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));

    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("rv", "in"));
      return;
    }

    els.forEach((e) => {
      e.classList.add("rv");
      const index = e.parentElement ? Array.from(e.parentElement.children).indexOf(e) : 0;
      e.style.setProperty("--d", `${(index % 4) * 0.08}s`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add("in");
            io.unobserve(x.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((e) => io.observe(e));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
