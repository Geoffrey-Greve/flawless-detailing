import Link from "next/link";
import type { ReactNode } from "react";
import Img from "@/components/shared/Img";
import Icon from "@/components/shared/Icon";
import { site } from "@/lib/site";

/** Banner at the top of every inner page, in the same style as the home hero. */
export default function PageHero({
  crumb,
  eyebrow,
  title,
  text,
  image,
  position = "center",
  showCtas = true,
}: {
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  text: string;
  image: string;
  position?: string;
  showCtas?: boolean;
}) {
  return (
    <section className="ip-hero">
      <Img
        className="ip-hero-img"
        file={image}
        alt=""
        priority
        style={{ objectPosition: position }}
        sizes="(max-width: 1000px) 100vw, 60vw"
      />
      <div className="hw">
        <div className="ip-hero-copy">
          <nav className="ip-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{crumb}</span>
          </nav>
          <div className="hv-eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p>{text}</p>
          {showCtas && (
            <div className="hv-actions">
              <Link className="hbtn p" href="/contact">
                Get a Free Quote <Icon name="arrow" strokeWidth={2.2} />
              </Link>
              <Link className="hbtn o" href={site.phoneHref}>
                <Icon name="phone" strokeWidth={2} /> Call Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
