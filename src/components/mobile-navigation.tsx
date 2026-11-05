"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileNavigation({
  showBeforeAfter,
}: {
  showBeforeAfter: boolean;
}) {
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
        <details className="nav-dropdown">
          <summary>Solutions</summary>
          <div className="nav-dropdown-menu">
            <Link href="/services" onClick={closeMenu}>All cleaning services</Link>
            <Link href="/light-and-deep-cleaning" onClick={closeMenu}>Light &amp; Deep Cleaning</Link>
          </div>
        </details>
        {showBeforeAfter && <Link href="/#before-after" onClick={closeMenu}>Before &amp; after</Link>}
        <Link href="/#protocol" onClick={closeMenu}>How It Works</Link>
        <details className="nav-dropdown">
          <summary>About</summary>
          <div className="nav-dropdown-menu">
            <Link href="/about" onClick={closeMenu}>About Crown</Link>
            <Link href="/about#service-area-heading" onClick={closeMenu}>Areas We Serve</Link>
          </div>
        </details>
        <Link href="/#testimonials" onClick={closeMenu}>Customer Feedback</Link>
        <Link className="button button-small button-dark nav-cta" href="/#quote" onClick={closeMenu}>
          Get a quote <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </>
  );
}
