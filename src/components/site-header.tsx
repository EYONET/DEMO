import Link from "next/link";
import MobileNavigation from "@/components/mobile-navigation";
import { getPublicHomeCopy } from "@/lib/site-content";

export default async function SiteHeader() {
  const homeCopy = await getPublicHomeCopy();

  return (
    <>
      <div className="crown-ticker">
        <div className="container crown-ticker-inner">
          <span>Aurora, Denver, and more areas · ZIP-code confirmation required</span>
          <Link href="/#quote">Request an estimate <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <header className="site-header crown-header">
        <div className="container nav-wrap">
          <Link className="brand crown-brand" href="/" aria-label="Crown Cleaning Solutions home">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 40 40" fill="none">
                <path d="m5 12 9 7 6-13 6 13 9-7-3 20H8L5 12Z" fill="currentColor" />
                <path d="M10 27h20" stroke="#0b1a30" strokeWidth="2" />
              </svg>
            </span>
            <span>Crown <span className="brand-light">Cleaning Solutions</span></span>
          </Link>
          <MobileNavigation showBeforeAfter={homeCopy.beforeAfterEnabled} />
        </div>
      </header>
    </>
  );
}
