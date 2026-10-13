import Link from "next/link";
import Img from "@/components/shared/Img";
import Icon from "@/components/shared/Icon";
import { footerLinks } from "@/lib/data/content";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="hw ftr-in">
        <Link className="ftr-logo" href="/" aria-label="Flawless Detailing, home">
          <Img file="logo.png" alt="Flawless Detailing" width={441} height={367} sizes="120px" />
        </Link>

        <nav className="ftr-links" aria-label="Footer">
          {footerLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ftr-social">
          <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Icon name="facebook" strokeWidth={1.9} />
          </a>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Icon name="instagram" strokeWidth={1.9} />
          </a>
        </div>

        <div className="ftr-tag">
          <span>Don’t get caught riding dirty.</span>
          <em>keep it Flawless!</em>
        </div>
      </div>
    </footer>
  );
}
