"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-nav"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      <nav
        className={`primary-nav${isOpen ? " is-open" : ""}`}
        id="primary-nav"
        aria-label="Main navigation"
      >
        <Link href="/services" onClick={closeMenu}>Solutions</Link>
        <Link href="/#standard" onClick={closeMenu}>Our standard</Link>
        <Link href="/#before-after" onClick={closeMenu}>Before &amp; after</Link>
        <Link href="/#protocol" onClick={closeMenu}>Operational framework</Link>
        <Link href="/#pricing" onClick={closeMenu}>Pricing</Link>
        <Link href="/about" onClick={closeMenu}>About</Link>
        <Link className="button button-small button-dark nav-cta" href="/#quote" onClick={closeMenu}>
          Get a quote <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </>
  );
}
