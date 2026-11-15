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
            <details className="nav-subdropdown">
              <summary>All Services</summary>
              <div className="nav-submenu">
                <Link href="/services/car-detailing" onClick={closeMenu}>Car Detailing</Link>
                <Link href="/services/carpet-cleaning" onClick={closeMenu}>Carpet Cleaning</Link>
                <Link href="/services/upholstery-cleaning" onClick={closeMenu}>Upholstery Cleaning</Link>
                <Link href="/services/move-in-move-out-cleaning" onClick={closeMenu}>Move-in / Move-out Cleaning</Link>
                <Link href="/services/residential-deep-cleaning" onClick={closeMenu}>Residential Deep Cleaning</Link>
                <Link href="/services/post-construction-cleaning" onClick={closeMenu}>Post-Construction Cleaning</Link>
              </div>
            </details>
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
