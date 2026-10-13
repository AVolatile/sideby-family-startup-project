"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Primitives";
const nav = [
  ["How it works", "/how-it-works"],
  ["For parents", "/for-parents"],
  ["For teens", "/for-teens"],
  ["Our approach", "/safety"],
  ["Pricing", "/pricing"],
  ["Resources", "/resources"],
];
export function MarketingShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = usePathname().replace(/\/$/, "") || "/";
  return (
    <>
      <header className="marketing-header">
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={path === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link className="login-link" href="/login">
              Log in
            </Link>
            <ButtonLink href="/signup">Start your family</ButtonLink>
            <button
              className="icon-button mobile-menu-button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-marketing-nav"
              onClick={() => setOpen(!open)}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-marketing-nav"
            className="mobile-marketing-nav"
            aria-label="Mobile navigation"
          >
            {[
              ...nav,
              ["Log in", "/login"],
              ["Start your family", "/signup"],
            ].map(([label, href]) => (
              <Link href={href} key={href} onClick={() => setOpen(false)}>
                {label}
                <Icon name="arrow" />
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main id="main-content">{children}</main>
      <footer className="marketing-footer">
        <div className="footer-main">
          <div>
            <Logo />
            <p>
              A little structure.
              <br />A lot of room.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span className="eyebrow">Find your footing</span>
              {[
                ["How it works", "/how-it-works"],
                ["Features", "/features"],
                ["For parents", "/for-parents"],
                ["For teens", "/for-teens"],
                ["Try the demo", "/app"],
              ].map(([l, h]) => (
                <Link href={h} key={h}>
                  {l}
                </Link>
              ))}
            </div>
            <div>
              <span className="eyebrow">Get to know us</span>
              {[
                ["Our approach", "/safety"],
                ["Pricing", "/pricing"],
                ["Resources", "/resources"],
                ["About Sideby", "/about"],
              ].map(([l, h]) => (
                <Link href={h} key={h}>
                  {l}
                </Link>
              ))}
            </div>
            <div>
              <span className="eyebrow">Behind the concept</span>
              {[
                ["Brand system", "/brand"],
                ["Campaign studio", "/campaign"],
                ["Case study", "/case-study"],
              ].map(([l, h]) => (
                <Link href={h} key={h}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © 2026 Sideby · A concept by Anthony Volatile / Volatile Solutions
          </span>
          <span>Fictional brand. Real design thinking.</span>
        </div>
      </footer>
    </>
  );
}
