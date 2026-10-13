"use client";
import Link from "next/link";
import { useState } from "react";
import { useDemo } from "@/lib/DemoProvider";
import {
  DEMO_DATE,
  DEMO_DATE_LABEL,
  formatTime,
  dateLabel,
} from "@/data/family";
import { Avatar, MemberFilter } from "./Shared";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Primitives";
import { EventDetail } from "./Calendar";
import type { FamilyEvent, MemberId } from "@/types/family";
export function Today() {
  const { state, activeId, update } = useDemo();
  const active = state.members.find((m) => m.id === activeId)!;
  const parent = active.role === "parent";
  const [filter, setFilter] = useState<MemberId | "all">("all");
  const [detail, setDetail] = useState<FamilyEvent | null>(null);
  const events = state.events
    .filter(
      (e) =>
        e.date === DEMO_DATE &&
        (parent
          ? filter === "all" || filter === e.member
          : e.member === activeId || e.category === "family"),
    )
    .sort((a, b) => a.time.localeCompare(b.time));
  const responsibilities = state.responsibilities.filter(
    (t) => !t.done && (parent || t.member === activeId),
  );
  const rides = state.rides.filter((r) => parent || r.member === activeId);
  const note = state.updates[0];
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">{DEMO_DATE_LABEL}</span>
          <h1>
            {parent
              ? "A good day, together."
              : `Your day. Your move, ${active.name}.`}
          </h1>
          <p>
            {parent
              ? "A few moving parts. A shared plan."
              : "Your plans, your part, and a little room to go."}
          </p>
        </div>
        <Link
          href="/app/calendar"
          className="button button-small button-secondary"
        >
          <Icon name="plus" size={18} />
          Add a plan
        </Link>
      </div>
      <div className="today-grid">
        <div className="today-primary">
          <div className="family-note bg-butter">
            <Icon name="sun" size={30} />
            <div>
              <span className="eyebrow">A NOTE FOR EVERYONE</span>
              <h2>{note.title}</h2>
              <p>{note.message}</p>
            </div>
            <Link
              href="/app/updates"
              className="icon-button"
              aria-label="Read family updates"
            >
              <Icon name="arrow" />
            </Link>
          </div>
          <div className="quick-actions">
            {(parent
              ? [
                  ["ride", "Sort a ride", "rides"],
                  ["key", "Review a request", "permissions"],
                  ["message", "Post an update", "updates"],
                ]
              : [
                  ["pin", "Send a check-in", "check-ins"],
                  ["ride", "Request a ride", "rides"],
                  ["key", "Make a request", "permissions"],
                ]
            ).map(([icon, label, slug]) => (
              <Link href={`/app/${slug}`} key={slug}>
                <span
                  className={`quick-icon bg-${slug === "rides" ? "lilac" : slug === "permissions" ? "sky" : "coral"}`}
                >
                  <Icon name={icon} />
                </span>
                <span>{label}</span>
                <Icon name="chevron" size={16} />
              </Link>
            ))}
          </div>
          <section className="timeline-section">
            <div className="panel-heading">
              <h2>{parent ? "The family timeline" : "Your timeline"}</h2>
              <Badge>Today</Badge>
            </div>
            {parent && <MemberFilter value={filter} onChange={setFilter} />}
            <div className="timeline">
              {events.length ? (
                events.map((event) => (
                  <button
                    className={`timeline-item ${event.time < "15:00" ? "past" : ""}`}
                    key={event.id}
                    onClick={() => setDetail(event)}
                  >
                    <span className="timeline-time">
                      {formatTime(event.time)}
                    </span>
                    <span className="timeline-dot" />
                    <span className="timeline-card">
                      <span
                        className={`event-icon bg-${state.members.find((m) => m.id === event.member)!.color}`}
                      >
                        <Icon
                          name={
                            event.category === "sports"
                              ? "flag"
                              : event.category === "family"
                                ? "family"
                                : event.category === "work"
                                  ? "clock"
                                  : "calendar"
                          }
                        />
                      </span>
                      <span className="timeline-info">
                        <strong>{event.title}</strong>
                        <span>{event.location}</span>
                        <small>
                          {
                            state.members.find((m) => m.id === event.member)!
                              .name
                          }{" "}
                          · {formatTime(event.time)}–{formatTime(event.end)}
                        </small>
                      </span>
                      <Icon name="chevron" size={18} />
                    </span>
                  </button>
                ))
              ) : (
                <p className="inline-empty">
                  No plans for this person today. A little breathing room.
                </p>
              )}
            </div>
          </section>
        </div>
        <aside className="today-secondary">
          <section className="product-panel checkin-panel">
            <div className="panel-heading">
              <h2>In the know</h2>
              <Link href="/app/check-ins" className="text-link">
                See all <Icon name="arrow" size={16} />
              </Link>
            </div>
            {state.members
              .filter((m) => m.role === "teen")
              .map((m) => {
                const last = state.checkIns.find((c) => c.member === m.id);
                return (
                  <div className="person-status" key={m.id}>
                    <Avatar id={m.id} />
                    <div>
                      <strong>{m.name}</strong>
                      <span>{last?.message ?? "No check-in shared yet"}</span>
                      <small>
                        {last
                          ? `Shared at ${formatTime(last.time)}`
                          : "Their next update is up to them."}
                      </small>
                    </div>
                    <Icon name="check" size={18} />
                  </div>
                );
              })}
            <p className="quiet-caption">
              <Icon name="shield" size={14} />
              Voluntary updates. No live tracking.
            </p>
          </section>
          <section className="product-panel">
            <div className="panel-heading">
              <h2>{parent ? "The next handoff" : "Your next ride"}</h2>
              <Icon name="ride" />
            </div>
            {rides.slice(0, 2).map((ride) => (
              <Link className="today-ride" href="/app/rides" key={ride.id}>
                <span className="eyebrow">
                  {dateLabel(ride.date)} · {formatTime(ride.time)}
                </span>
                <strong>{ride.title}</strong>
                <span>
                  {ride.driver ? (
                    <>
                      <Avatar id={ride.driver} size="small" />{" "}
                      {state.members.find((m) => m.id === ride.driver)!.name}’s
                      driving
                    </>
                  ) : (
                    <Badge tone="warm">Needs a driver</Badge>
                  )}
                </span>
              </Link>
            ))}
          </section>
          <section className="product-panel">
            <div className="panel-heading">
              <h2>A little responsibility</h2>
              <Link
                href="/app/responsibilities"
                aria-label="See responsibilities"
              >
                <Icon name="arrow" size={19} />
              </Link>
            </div>
            {responsibilities.slice(0, 3).map((t) => (
              <label
                className="responsibility-mini"
                key={t.id}
                htmlFor={`today-${t.id}`}
              >
                <input
                  id={`today-${t.id}`}
                  type="checkbox"
                  checked={t.done}
                  onChange={() =>
                    update(
                      (s) => ({
                        ...s,
                        responsibilities: s.responsibilities.map((r) =>
                          r.id === t.id ? { ...r, done: !r.done } : r,
                        ),
                      }),
                      "Marked complete. Your family’s in the know.",
                    )
                  }
                  disabled={!parent && t.member !== activeId}
                />
                <span>
                  <strong>{t.title}</strong>
                  <small>
                    {state.members.find((m) => m.id === t.member)!.name} ·{" "}
                    {formatTime(t.due)}
                  </small>
                </span>
              </label>
            ))}
          </section>
          <div className="today-signoff">
            <Icon name="path" size={30} />
            <p>
              Small plans.
              <br />
              Bigger independence.
            </p>
            <Link href="/app/milestones">
              See what’s growing <Icon name="arrow" size={17} />
            </Link>
          </div>
        </aside>
      </div>
      {detail && <EventDetail event={detail} onClose={() => setDetail(null)} />}
    </>
  );
}
