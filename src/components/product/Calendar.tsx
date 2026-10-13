"use client";
import { useState } from "react";
import { useDemo } from "@/lib/DemoProvider";
import { DEMO_DATE, formatTime, dateLabel } from "@/data/family";
import type { FamilyEvent, MemberId } from "@/types/family";
import { Avatar, MemberFilter } from "./Shared";
import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/ui/Icon";
import { Badge, EmptyState } from "@/components/ui/Primitives";
import { PlanForm } from "./PlanForm";
export function Calendar() {
  const { state, activeId } = useDemo();
  const [filter, setFilter] = useState<MemberId | "all">("all");
  const [view, setView] = useState("week");
  const [date, setDate] = useState(DEMO_DATE);
  const [adding, setAdding] = useState(false);
  const [detail, setDetail] = useState<FamilyEvent | null>(null);
  const active = state.members.find((m) => m.id === activeId)!;
  const events = state.events.filter(
    (e) => filter === "all" || e.member === filter,
  );
  const start = new Date(`${date}T12:00:00`);
  const weekStart = new Date(start);
  weekStart.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const dates = Array.from(
    { length: view === "month" ? 35 : view === "week" ? 7 : 1 },
    (_, i) => {
      const d = new Date(
        view === "month"
          ? new Date(
              start.getFullYear(),
              start.getMonth(),
              1 -
                ((new Date(start.getFullYear(), start.getMonth(), 1).getDay() +
                  6) %
                  7),
            )
          : view === "week"
            ? weekStart
            : start,
      );
      d.setDate(d.getDate() + i);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    },
  );
  function shift(direction: number) {
    const d = new Date(start);
    if (view === "month") d.setMonth(d.getMonth() + direction);
    else d.setDate(d.getDate() + direction * (view === "week" ? 7 : 1));
    setDate(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    );
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">ALL THE MOVING PARTS</span>
          <h1>The week, together.</h1>
          <p>
            {active.role === "teen"
              ? "Add your plans. See where your days meet."
              : "Everyone’s plans. Enough room to see the handoffs."}
          </p>
        </div>
        <button className="button button-small" onClick={() => setAdding(true)}>
          <Icon name="plus" size={18} />
          Add event
        </button>
      </div>
      <MemberFilter value={filter} onChange={setFilter} />
      <div className="calendar-toolbar">
        <div className="calendar-date">
          <button
            className="icon-button"
            aria-label={`Previous ${view}`}
            onClick={() => shift(-1)}
          >
            <Icon name="chevron" className="rotate" />
          </button>
          <h2>
            {start.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            className="icon-button"
            aria-label={`Next ${view}`}
            onClick={() => shift(1)}
          >
            <Icon name="chevron" />
          </button>
          <button className="text-button" onClick={() => setDate(DEMO_DATE)}>
            Today
          </button>
        </div>
        <div className="segmented" aria-label="Calendar view">
          {["day", "week", "month"].map((v) => (
            <button
              key={v}
              aria-pressed={v === view}
              onClick={() => setView(v)}
            >
              {v[0].toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className={`calendar-grid calendar-${view}`}>
        {dates.map((d) => {
          const dayEvents = events
            .filter((e) => e.date === d)
            .sort((a, b) => a.time.localeCompare(b.time));
          return (
            <section
              className={`calendar-day ${d === DEMO_DATE ? "is-today" : ""}`}
              key={d}
            >
              <div className="calendar-day-heading">
                <span>
                  {new Date(`${d}T12:00:00`).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>
                <strong>{Number(d.slice(-2))}</strong>
                {d === DEMO_DATE && <small>Today</small>}
              </div>
              <div className="calendar-day-events">
                {dayEvents.map((event) => (
                  <button
                    className={`calendar-event bg-${state.members.find((m) => m.id === event.member)!.color}`}
                    key={event.id}
                    onClick={() => setDetail(event)}
                  >
                    <small>{formatTime(event.time)}</small>
                    <strong>{event.title}</strong>
                    <span>
                      {state.members.find((m) => m.id === event.member)!.name} ·{" "}
                      {event.category}
                    </span>
                    {view === "day" && <p>{event.location}</p>}
                  </button>
                ))}
                {!dayEvents.length && view !== "month" && (
                  <span className="calendar-open">Room to breathe.</span>
                )}
              </div>
            </section>
          );
        })}
      </div>
      {!events.length && (
        <EmptyState title="No plans here yet." icon="calendar">
          Add a plan to give your week a starting point.
        </EmptyState>
      )}
      <div className="calendar-key">
        {["school", "work", "sports", "appointment", "family"].map((c) => (
          <span key={c}>
            <Icon
              name={
                c === "sports" ? "flag" : c === "work" ? "clock" : "calendar"
              }
              size={15}
            />
            {c}
          </span>
        ))}
        <span>
          <Icon name="info" size={15} />
          Color identifies the person; labels identify the activity.
        </span>
      </div>
      {adding && (
        <PlanForm kind="event" onClose={() => setAdding(false)} />
      )}{" "}
      {detail && <EventDetail event={detail} onClose={() => setDetail(null)} />}
    </>
  );
}
export function EventDetail({
  event,
  onClose,
}: {
  event: FamilyEvent;
  onClose: () => void;
}) {
  const { state } = useDemo();
  const ride = state.rides.find(
    (r) =>
      r.member === event.member &&
      r.from.includes(event.location.split(" · ")[0]),
  );
  return (
    <Modal title={event.title} onClose={onClose}>
      <div className="detail-person">
        <Avatar id={event.member} label />
        <Badge>{event.category}</Badge>
      </div>
      <dl className="detail-list">
        <div>
          <dt>When</dt>
          <dd>
            {dateLabel(event.date)} · {formatTime(event.time)}–
            {formatTime(event.end)}
          </dd>
        </div>
        <div>
          <dt>Where</dt>
          <dd>{event.location}</dd>
        </div>
        <div>
          <dt>Repeats</dt>
          <dd>{event.repeat}</dd>
        </div>
        <div>
          <dt>What to know</dt>
          <dd>{event.note || "No extra notes. The plan is here."}</dd>
        </div>
        {ride && (
          <div>
            <dt>The ride</dt>
            <dd>
              {ride.driver
                ? `${state.members.find((m) => m.id === ride.driver)!.name} is driving at ${formatTime(ride.time)}.`
                : "A driver is still needed."}
            </dd>
          </div>
        )}
      </dl>
      <button className="button" onClick={onClose}>
        Got the plan
      </button>
    </Modal>
  );
}
