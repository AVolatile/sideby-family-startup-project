"use client";
import { useState } from "react";
import { useDemo } from "@/lib/DemoProvider";
import { formatTime } from "@/data/family";
import { Avatar, MemberFilter } from "./Shared";
import { Icon } from "@/components/ui/Icon";
import { Badge, EmptyState } from "@/components/ui/Primitives";
import { Modal } from "@/components/ui/Modal";
import type { MemberId } from "@/types/family";
const options = [
  ["pin", "I’m here"],
  ["arrow", "Heading home"],
  ["message", "Plans changed"],
  ["clock", "Running late"],
  ["ride", "Need a pickup"],
  ["family", "I’m home"],
];
export function CheckIns() {
  const { state, activeId, update } = useDemo();
  const active = state.members.find((m) => m.id === activeId)!;
  const [filter, setFilter] = useState<MemberId | "all">("all");
  const [selected, setSelected] = useState("");
  const [note, setNote] = useState("");
  const [lastId, setLastId] = useState("");
  function send() {
    const id = crypto.randomUUID();
    update(
      (s) => ({
        ...s,
        checkIns: [
          {
            id,
            member: activeId,
            message: selected,
            time: "16:10",
            note: note.trim(),
          },
          ...s.checkIns,
        ],
        notifications: [
          {
            id: `n-${id}`,
            title: `${active.name} checked in: ${selected}`,
            detail: note.trim() || "A little update, shared by choice.",
            time: "Just now",
            read: false,
            href: "/app/check-ins",
          },
          ...s.notifications,
        ],
      }),
      "Check-in shared with your family.",
    );
    setLastId(id);
    setSelected("");
    setNote("");
  }
  const checkIns = state.checkIns.filter(
    (c) => filter === "all" || c.member === filter,
  );
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">A LITTLE UPDATE GOES A LONG WAY.</span>
          <h1>
            {active.role === "teen"
              ? "Share a moment. Keep your space."
              : "In the know, without hovering."}
          </h1>
          <p>
            {active.role === "teen"
              ? "You choose when to send. Your family sees what you share."
              : "Voluntary updates from the people you care about."}
          </p>
        </div>
      </div>
      <div className="checkin-layout">
        <section className="checkin-compose">
          <div className="privacy-note bg-lilac">
            <Icon name="shield" size={30} />
            <h2>Your update. Your choice.</h2>
            <p>
              No GPS access. No background tracking. Check-ins share your words
              with your household.
            </p>
          </div>
          <h2>What would you like to share?</h2>
          <div className="checkin-actions">
            {options.map(([icon, label]) => (
              <button
                key={label}
                onClick={() => {
                  setSelected(label);
                  setNote("");
                }}
              >
                <span
                  className={`quick-icon bg-${icon === "pin" || icon === "family" ? "coral" : "butter"}`}
                >
                  <Icon name={icon} size={25} />
                </span>
                <strong>{label}</strong>
                <Icon name="arrow" size={18} />
              </button>
            ))}
          </div>
          {lastId && (
            <button
              className="text-button"
              onClick={() => {
                update(
                  (s) => ({
                    ...s,
                    checkIns: s.checkIns.filter((c) => c.id !== lastId),
                    notifications: s.notifications.filter(
                      (n) => n.id !== `n-${lastId}`,
                    ),
                  }),
                  "Check-in removed from this demo.",
                );
                setLastId("");
              }}
            >
              Undo my last check-in
            </button>
          )}
          <p className="quiet-caption">
            Need immediate help? Contact a trusted adult or local emergency
            services directly. Sideby is a coordination concept.
          </p>
        </section>
        <section className="product-panel">
          <div className="panel-heading">
            <h2>Shared moments</h2>
            <Badge>Family</Badge>
          </div>
          <MemberFilter value={filter} onChange={setFilter} />
          <div className="checkin-feed">
            {checkIns.map((c) => (
              <article key={c.id}>
                <Avatar id={c.member} />
                <div>
                  <div className="feed-heading">
                    <strong>
                      {state.members.find((m) => m.id === c.member)!.name}
                    </strong>
                    <small>{formatTime(c.time)}</small>
                  </div>
                  <h3>{c.message}</h3>
                  {c.note && <p>{c.note}</p>}
                  <span className="shared-status">
                    <Icon name="check" size={14} />
                    Shared by{" "}
                    {state.members.find((m) => m.id === c.member)!.name}
                  </span>
                </div>
              </article>
            ))}
          </div>
          {!checkIns.length && (
            <EmptyState icon="pin" title="No updates shared yet.">
              A check-in will appear here when this person chooses to send one.
            </EmptyState>
          )}
        </section>
      </div>
      {selected && (
        <Modal title={selected} onClose={() => setSelected("")}>
          <div className="checkin-recipient">
            <Avatar id={activeId} />
            <p>
              Sending as <strong>{active.name}</strong>.<br />
              Visible to the Bennett household.
            </p>
          </div>
          <div className="form-field">
            <label htmlFor="checkin-note">
              Add a little context <span>(optional)</span>
            </label>
            <textarea
              id="checkin-note"
              value={note}
              maxLength={280}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Practice ends at 5:30. See you at the south entrance."
              rows={3}
            />
          </div>
          <div className="privacy-inline">
            <Icon name="shield" size={18} />
            <span>Your words are shared. Your location isn’t collected.</span>
          </div>
          <button className="button full-width" onClick={send}>
            Send check-in <Icon name="arrow" size={18} />
          </button>
        </Modal>
      )}
    </>
  );
}
