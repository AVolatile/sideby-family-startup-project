"use client";
import { useState } from "react";
import { useDemo } from "@/lib/DemoProvider";
import { dateLabel } from "@/data/family";
import { Avatar } from "./Shared";
import { Icon } from "@/components/ui/Icon";
import { Badge, EmptyState } from "@/components/ui/Primitives";
import { Modal } from "@/components/ui/Modal";
import { PlanForm } from "./PlanForm";
import type { Permission, PermissionStatus } from "@/types/family";
const statusLabels: Record<PermissionStatus, string> = {
  pending: "Let’s review",
  approved: "Agreed",
  discussion: "Let’s talk",
  declined: "Not this time",
};
export function Permissions() {
  const { state, activeId, update } = useDemo();
  const active = state.members.find((m) => m.id === activeId)!;
  const parent = active.role === "parent";
  const [tab, setTab] = useState("all");
  const [adding, setAdding] = useState(false);
  const [review, setReview] = useState<Permission | null>(null);
  const [condition, setCondition] = useState("");
  const [decision, setDecision] = useState<PermissionStatus>("approved");
  const [error, setError] = useState("");
  const permissions = state.permissions.filter(
    (p) =>
      (parent || p.member === activeId) && (tab === "all" || p.status === tab),
  );
  function save() {
    if (decision !== "approved" && condition.trim().length < 5) {
      setError(
        "Add a short explanation so the next conversation has a starting point.",
      );
      return;
    }
    if (!review) return;
    update(
      (s) => ({
        ...s,
        permissions: s.permissions.map((p) =>
          p.id === review.id
            ? { ...p, status: decision, condition: condition.trim() }
            : p,
        ),
        notifications: [
          {
            id: crypto.randomUUID(),
            title:
              decision === "approved"
                ? `${review.title} is approved.`
                : decision === "discussion"
                  ? `Let’s talk about ${review.title.toLowerCase()}.`
                  : `An update on ${review.title.toLowerCase()}.`,
            detail: condition.trim() || "Your family has agreed on the plan.",
            time: "Just now",
            read: false,
            href: "/app/permissions",
          },
          ...s.notifications,
        ],
      }),
      decision === "approved"
        ? "Agreement shared. The plan is clear."
        : "Response shared, with room for a conversation.",
    );
    setReview(null);
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">ASK. TALK. MAKE A PLAN.</span>
          <h1>
            {parent
              ? "A little context. A better conversation."
              : "Put your plans on the table."}
          </h1>
          <p>
            {parent
              ? "Read the details, agree on expectations, and leave room to talk."
              : "Say what you want to do. Include the details that help your family say yes."}
          </p>
        </div>
        <button className="button button-small" onClick={() => setAdding(true)}>
          <Icon name="plus" size={18} />
          {parent ? "Add demo request" : "Request permission"}
        </button>
      </div>
      <div className="permission-intro bg-sky">
        <Icon name="key" size={32} />
        <div>
          <strong>Clear expectations work both ways.</strong>
          <p>
            A request starts a conversation. An agreement says what everyone can
            count on.
          </p>
        </div>
      </div>
      <div className="segmented">
        <button aria-pressed={tab === "all"} onClick={() => setTab("all")}>
          All plans
        </button>
        <button
          aria-pressed={tab === "pending"}
          onClick={() => setTab("pending")}
        >
          To discuss
        </button>
        <button
          aria-pressed={tab === "approved"}
          onClick={() => setTab("approved")}
        >
          Agreed
        </button>
      </div>
      <div className="permission-grid">
        {permissions.map((p) => (
          <article
            className={`permission-card permission-${p.status}`}
            key={p.id}
          >
            <div className="card-eyebrow">
              <Avatar id={p.member} label size="small" />
              <Badge
                tone={
                  p.status === "approved"
                    ? "positive"
                    : p.status === "pending"
                      ? "warm"
                      : "neutral"
                }
              >
                {statusLabels[p.status]}
              </Badge>
            </div>
            <span className="eyebrow permission-date">{dateLabel(p.date)}</span>
            <h2>{p.title}</h2>
            <p>{p.detail}</p>
            {p.condition && (
              <div className="agreement">
                <Icon name={p.status === "approved" ? "check" : "message"} />
                <div>
                  <strong>
                    {p.status === "approved"
                      ? "What we agreed"
                      : "A note for the conversation"}
                  </strong>
                  <p>{p.condition}</p>
                </div>
              </div>
            )}
            {parent && (
              <button
                className="button button-secondary button-small"
                onClick={() => {
                  setReview(p);
                  setCondition(p.condition);
                  setDecision(p.status === "pending" ? "approved" : p.status);
                  setError("");
                }}
              >
                {p.status === "pending"
                  ? "Review the plan"
                  : "Update agreement"}
                <Icon name="arrow" size={18} />
              </button>
            )}
            {!parent && p.status === "pending" && (
              <p className="quiet-caption">
                Your family has the details. There’s room to talk it through.
              </p>
            )}
          </article>
        ))}
      </div>
      {!permissions.length && (
        <EmptyState title="No plans in this view." icon="key">
          Your next request can start here.
        </EmptyState>
      )}
      {adding && (
        <PlanForm kind="permission" onClose={() => setAdding(false)} />
      )}{" "}
      {review && (
        <Modal title={review.title} onClose={() => setReview(null)}>
          <p className="form-intro">{review.detail}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            <fieldset className="decision-options">
              <legend>How would you like to respond?</legend>
              {(
                ["approved", "discussion", "declined"] as PermissionStatus[]
              ).map((s) => (
                <label key={s}>
                  <input
                    type="radio"
                    name="decision"
                    value={s}
                    checked={decision === s}
                    onChange={() => {
                      setDecision(s);
                      setError("");
                    }}
                  />
                  {s === "approved"
                    ? "Agree to the plan"
                    : s === "discussion"
                      ? "Let’s talk it through"
                      : "Not this time"}
                </label>
              ))}
            </fieldset>
            <div className="form-field">
              <label htmlFor="agreement-note">
                {decision === "approved"
                  ? "Shared expectations (optional)"
                  : "What would you like them to know?"}
              </label>
              <textarea
                id="agreement-note"
                rows={3}
                maxLength={500}
                value={condition}
                onChange={(e) => {
                  setCondition(e.target.value);
                  setError("");
                }}
                placeholder={
                  decision === "approved"
                    ? "e.g. Home by 10:30. Check in when you leave."
                    : "A useful explanation, in your own words."
                }
                aria-invalid={!!error}
                aria-describedby={error ? "agreement-error" : undefined}
              />
              {error && (
                <span className="field-error" id="agreement-error">
                  {error}
                </span>
              )}
            </div>
            <button className="button full-width" type="submit">
              Share the response <Icon name="arrow" size={18} />
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
