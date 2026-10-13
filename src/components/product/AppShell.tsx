"use client";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "./Shared";
import { productNav } from "@/data/content";
import { useDemo } from "@/lib/DemoProvider";
import type { MemberId } from "@/types/family";
export function AppShell({ children }: { children: ReactNode }) {
  const { state, activeId, setActiveId } = useDemo();
  const active = state.members.find((m) => m.id === activeId)!;
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const [more, setMore] = useState(false);
  const unread = state.notifications.filter((n) => !n.read).length;
  return (
    <div className={`app-shell role-${active.role}`}>
      <aside className="app-sidebar">
        <Logo />
        <div className="household-label">
          <span className="eyebrow">YOUR SHARED SPACE</span>
          <strong>The Bennetts</strong>
          <span>Four people. Our kind of rhythm.</span>
        </div>
        <nav aria-label="Product navigation">
          {productNav.map((item) => (
            <Link
              key={item.slug}
              href={`/app/${item.slug}`}
              aria-current={
                pathname === `/app/${item.slug}` ||
                (item.slug === "today" && pathname === "/app")
                  ? "page"
                  : undefined
              }
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {item.slug === "notifications" && unread > 0 && (
                <span className="nav-count">{unread}</span>
              )}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <Icon name="shield" />
          <p>
            Shared by choice.
            <br />A little room for everyone.
          </p>
        </div>
        <Link href="/" className="back-to-site">
          <Icon name="logout" size={18} />
          Back to the website
        </Link>
      </aside>
      <div className="app-main">
        <header className="app-header">
          <div className="app-header-family">
            <Logo compact />
            <span>
              The Bennetts<small>Family demo</small>
            </span>
          </div>
          <div className="demo-role-control">
            <span className="demo-label">DEMO VIEW</span>
            <label className="sr-only" htmlFor="demo-persona">
              Demo profile
            </label>
            <select
              id="demo-persona"
              value={activeId}
              onChange={(e) => {
                setActiveId(e.target.value as MemberId);
                setMore(false);
              }}
            >
              {state.members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} · {m.role === "parent" ? "Parent" : "Teen"}
                </option>
              ))}
            </select>
            <Avatar id={activeId} size="small" />
          </div>
          <Link
            href="/app/notifications"
            className="icon-button notification-button"
            aria-label={`Notifications, ${unread} unread`}
          >
            <Icon name="bell" />
            {unread > 0 && <span className="notification-dot" />}
          </Link>
        </header>
        <div className="demo-banner">
          <span>
            <Icon name="info" size={15} />
            Fictional family · Tuesday, Oct 13, 2026
          </span>
          <span>Changes last until reload.</span>
        </div>
        <main className="product-content" id="main-content">
          {children}
        </main>
      </div>
      <nav className="bottom-nav" aria-label="Mobile product navigation">
        {[
          { slug: "today", label: "Today", icon: "sun" },
          { slug: "calendar", label: "Calendar", icon: "calendar" },
          { slug: "check-ins", label: "Check in", icon: "pin" },
          { slug: "rides", label: "Rides", icon: "ride" },
        ].map((item) => (
          <Link
            key={item.slug}
            href={`/app/${item.slug}`}
            aria-current={
              pathname === `/app/${item.slug}` ||
              (pathname === "/app" && item.slug === "today")
                ? "page"
                : undefined
            }
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </Link>
        ))}
        <button
          aria-expanded={more}
          aria-controls="more-navigation"
          onClick={() => setMore(!more)}
        >
          <Icon name={more ? "close" : "more"} />
          <span>More</span>
        </button>
      </nav>
      {more && (
        <div className="mobile-more" id="more-navigation">
          <div className="mobile-more-heading">
            <h2>More room for your plans.</h2>
            <button
              className="icon-button"
              aria-label="Close more navigation"
              onClick={() => setMore(false)}
            >
              <Icon name="close" />
            </button>
          </div>
          <nav aria-label="More product pages">
            {productNav
              .filter(
                (n) =>
                  !["today", "calendar", "check-ins", "rides"].includes(n.slug),
              )
              .map((n) => (
                <Link
                  key={n.slug}
                  href={`/app/${n.slug}`}
                  onClick={() => setMore(false)}
                >
                  <Icon name={n.icon} />
                  {n.label}
                  <Icon name="chevron" size={16} />
                </Link>
              ))}
            <Link href="/" onClick={() => setMore(false)}>
              <Icon name="logout" />
              Back to the website
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
