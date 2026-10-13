"use client";

import { useRef } from "react";
import Icon from "@/components/shared/Icon";

const DURATION = 420;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * One accordion row. Built on native <details> (so it still works with JS off
 * and stays keyboard accessible); with JS the open/close is animated by
 * sliding the answer's height and fading it, instead of snapping.
 */
function Item({ q, a }: { q: string; a: string }) {
  const details = useRef<HTMLDetailsElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const running = useRef<Animation | null>(null);

  function onToggle(e: React.MouseEvent) {
    e.preventDefault();
    const d = details.current;
    const b = body.current;
    if (!d || !b) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      d.open = !d.open;
      d.dataset.state = d.open ? "open" : "closed";
      return;
    }

    // Interrupt whatever is still animating and continue from the current height.
    const startHeight = running.current ? b.getBoundingClientRect().height : null;
    running.current?.cancel();
    running.current = null;

    const opening = d.dataset.state !== "open";
    d.dataset.state = opening ? "open" : "closed"; // drives the icon + colour right away

    if (opening) {
      d.open = true; // render the answer so it can be measured
      const target = b.scrollHeight;
      const anim = b.animate(
        [
          { height: `${startHeight ?? 0}px`, opacity: startHeight ? 0.6 : 0 },
          { height: `${target}px`, opacity: 1 },
        ],
        { duration: DURATION, easing: EASING }
      );
      running.current = anim;
      anim.onfinish = () => {
        running.current = null;
      };
      anim.oncancel = () => {
        running.current = null;
      };
    } else {
      const from = startHeight ?? b.getBoundingClientRect().height;
      const anim = b.animate(
        [
          { height: `${from}px`, opacity: 1 },
          { height: "0px", opacity: 0 },
        ],
        { duration: DURATION, easing: EASING, fill: "forwards" }
      );
      running.current = anim;
      anim.onfinish = () => {
        d.open = false;
        anim.cancel(); // drop the "forwards" fill now that the row is really closed
        running.current = null;
      };
    }
  }

  return (
    <details ref={details} data-state="closed">
      <summary onClick={onToggle}>
        <span>{q}</span>
        <Icon name="plus" strokeWidth={2} />
      </summary>
      <div className="ip-faq-body" ref={body}>
        <p>{a}</p>
      </div>
    </details>
  );
}

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="ip-faq">
      {items.map((f) => (
        <Item key={f.q} q={f.q} a={f.a} />
      ))}
    </div>
  );
}
