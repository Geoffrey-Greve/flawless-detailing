"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Img from "@/components/shared/Img";
import { navLinks } from "@/lib/data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // /why-us and /reviews are not in the header (the design has five items),
  // so they highlight nothing.
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <header className={`hdr${scrolled ? " scrolled" : ""}${open ? " menu-open" : ""}`}>
      <div className="hw hdr-in">
        <Link className="hdr-logo" href="/" aria-label="Flawless Detailing, home">
          <Img file="logo.png" alt="Flawless Detailing" width={441} height={367} sizes="120px" priority />
        </Link>

        <nav className={`hdr-links${open ? " open" : ""}`} aria-label="Primary">
          {navLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.key}
                href={l.href}
                className={active ? "active" : undefined}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link className="hbtn p hdr-cta" href="/contact">
          Get a Free Quote
        </Link>

        <button
          className="hdr-burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <i />
          <i />
        </button>
      </div>
    </header>
  );
}
