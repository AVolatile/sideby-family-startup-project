"use client";
import { useState } from "react";
import { useDemo } from "@/lib/DemoProvider";
import { formatTime, dateLabel } from "@/data/family";
import { Avatar } from "./Shared";
import { Icon } from "@/components/ui/Icon";
import { Badge, EmptyState } from "@/components/ui/Primitives";
import { PlanForm } from "./PlanForm";
import type { MemberId } from "@/types/family";
export function Rides() {
  const { state, activeId, update } = useDemo();
  const active = state.members.find((m) => m.id === activeId)!;
  const parent = active.role === "parent";
  const [adding, setAdding] = useState(false);
  const [tab, setTab] = useState("upcoming");
  const rides = state.rides.filter(
    (r) =>
      (parent || r.member === activeId) &&
      (tab === "upcoming" ? r.status !== "complete" : r.status === "complete"),
  );
  function assign(id: string, driver: MemberId | null) {
    update(
      (s) => ({
        ...s,
        rides: s.rides.map((r) =>
          r.id === id
            ? { ...r, driver, status: driver ? "confirmed" : "requested" }
            : r,
        ),
        notifications: [
          {
            id: crypto.randomUUID(),
            title: driver ? "The ride’s sorted." : "A ride needs a driver.",
            detail: driver
              ? `${state.members.find((m) => m.id === driver)!.name} is driving.`
              : "The pickup is open again.",
            time: "Just now",
            read: false,
            href: "/app/rides",
          },
          ...s.notifications,
        ],
      }),
      driver
        ? "Driver confirmed. Everyone has the plan."
        : "Ride reopened for another driver.",
    );
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE NEXT HANDOFF, HANDLED.</span>
          <h1>
            {parent
              ? "A ride. A time. A clear plan."
              : "Your way there. And back."}
          </h1>
          <p>Ask for a ride, sort the driver, skip the last-minute guessing.</p>
        </div>
        <button className="button button-small" onClick={() => setAdding(true)}>
          <Icon name="plus" size={18} />
          Request ride
        </button>
      </div>
      <div className="segmented">
        <button
          aria-pressed={tab === "upcoming"}
          onClick={() => setTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          aria-pressed={tab === "complete"}
          onClick={() => setTab("complete")}
        >
          Arrived
        </button>
      </div>
      <div className="ride-grid">
        {rides.map((r) => (
          <article
            className={`ride-card ${r.status === "requested" ? "ride-open" : ""}`}
            key={r.id}
          >
            <div className="ride-card-top">
              <Avatar id={r.member} label />
              <Badge tone={r.status === "requested" ? "warm" : "positive"}>
                {r.status === "requested"
                  ? "Needs a driver"
                  : r.status === "complete"
                    ? "Arrived"
                    : "Ride confirmed"}
              </Badge>
            </div>
            <h2>{r.title}</h2>
            <div className="ride-time">
              <Icon name="clock" />
              {dateLabel(r.date)} · {formatTime(r.time)}
            </div>
            <div className="ride-route">
              <div>
                <span className="route-dot" />
                <span>
                  <small>PICKUP</small>
                  <strong>{r.from}</strong>
                </span>
              </div>
              <div>
                <span className="route-dot route-destination" />
                <span>
                  <small>DESTINATION</small>
                  <strong>{r.to}</strong>
                </span>
              </div>
            </div>
            <p className="ride-note">{r.note}</p>
            <div className="ride-driver">
              {r.driver ? (
                <>
                  <Avatar id={r.driver} />
                  <div>
                    <strong>
                      {state.members.find((m) => m.id === r.driver)!.name}’s
                      driving
                    </strong>
                    <small>
                      {r.status === "complete"
                        ? "Trip complete."
                        : "The handoff is on the calendar."}
                    </small>
                  </div>
                  <Icon name="check" />
                </>
              ) : (
                <>
                  <Icon name="ride" />
                  <span>Who can pick this one up?</span>
                </>
              )}
            </div>
            {parent && r.status !== "complete" && (
              <div className="ride-controls">
                <div className="form-field">
                  <label htmlFor={`driver-${r.id}`}>Assign driver</label>
                  <select
                    id={`driver-${r.id}`}
                    value={r.driver ?? ""}
                    onChange={(e) =>
                      assign(r.id, (e.target.value || null) as MemberId | null)
                    }
                  >
                    <option value="">Still open</option>
                    {state.members
                      .filter((m) => m.role === "parent")
                      .map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                  </select>
                </div>
                {!r.driver && (
                  <button
                    className="button button-small"
                    onClick={() => assign(r.id, activeId)}
                  >
                    I can drive
                  </button>
                )}
                {r.driver && (
                  <button
                    className="button button-small button-secondary"
                    onClick={() =>
                      update(
                        (s) => ({
                          ...s,
                          rides: s.rides.map((ride) =>
                            ride.id === r.id
                              ? { ...ride, status: "complete" }
                              : ride,
                          ),
                        }),
                        "Ride marked complete. Thanks for the handoff.",
                      )
                    }
                  >
                    Mark arrived
                  </button>
                )}
              </div>
            )}
            {!parent && r.status === "requested" && (
              <p className="quiet-caption">
                Your family can claim this ride. You’ll see the driver here.
              </p>
            )}
          </article>
        ))}
      </div>
      {!rides.length && (
        <EmptyState
          icon="ride"
          title={
            tab === "complete"
              ? "The finished rides go here."
              : "No rides to sort."
          }
        >
          {tab === "complete"
            ? "Mark a confirmed ride as arrived to finish the handoff."
            : "If your next plan needs a lift, request one here."}
        </EmptyState>
      )}
      {adding && <PlanForm kind="ride" onClose={() => setAdding(false)} />}
    </>
  );
}
