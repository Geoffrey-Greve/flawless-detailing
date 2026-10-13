import Link from "next/link";
import { site } from "@/lib/site";

/** Sticky Call / Free Quote bar. Only displayed on small screens (see globals.css). */
export default function MobileBar() {
  return (
    <div className="mobile">
      <Link href={site.phoneHref}>Call</Link>
      <Link href="/contact">Free Quote</Link>
    </div>
  );
}
