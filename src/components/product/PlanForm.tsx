"use client";
import { useState, type FormEvent } from "react";
import { useDemo } from "@/lib/DemoProvider";
import { Modal } from "@/components/ui/Modal";
import { DEMO_DATE } from "@/data/family";
import type { Category, MemberId, Notification } from "@/types/family";
export type FormKind =
  "event" | "responsibility" | "ride" | "permission" | "update" | "goal";
const titles: Record<FormKind, string> = {
  event: "Add a plan",
  responsibility: "Give it a place",
  ride: "Request a ride",
  permission: "Put your plan on the table",
  update: "A note for everyone",
  goal: "Something to work toward",
};
export function PlanForm({
  kind,
  onClose,
}: {
  kind: FormKind;
  onClose: () => void;
}) {
  const { state, activeId, update } = useDemo();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const active = state.members.find((m) => m.id === activeId)!;
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const v = (key: string) => String(f.get(key) ?? "").trim();
    const err: Record<string, string> = {};
    if (v("title").length < 3)
      err.title = "Give this plan a name of at least 3 characters.";
    if (kind === "event" && v("end") <= v("time"))
      err.end = "Choose an end time after the start time.";
    if (
      ["event", "permission", "goal", "ride"].includes(kind) &&
      v("date") < DEMO_DATE
    )
      err.date = "Choose October 13, 2026 or a later demo date.";
    if (kind === "ride") {
      if (v("from").length < 3)
        err.from = "Add a pickup place with at least 3 characters.";
      if (v("to").length < 3)
        err.to = "Add a destination with at least 3 characters.";
    }
    if (["permission", "update"].includes(kind) && v("note").length < 10)
      err.note = "Add a little context—at least 10 characters.";
    if (kind === "goal" && v("step").length < 3)
      err.step = "Add a first step with at least 3 characters.";
    if (["event", "permission", "goal", "ride"].includes(kind) && !v("date"))
      err.date = "Choose a date for this plan.";
    if (["event", "responsibility", "ride"].includes(kind) && !v("time"))
      err.time = "Choose a time for this plan.";
    if (kind === "event" && !v("end")) err.end = "Choose an end time.";
    setErrors(err);
    if (Object.keys(err).length) {
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    const id = crypto.randomUUID();
    const member = (
      active.role === "teen" ? activeId : v("member") || activeId
    ) as MemberId;
    const note = v("note");
    const title = v("title");
    const notification: Notification = {
      id: `n-${id}`,
      title:
        kind === "permission"
          ? `${active.name} has a plan to discuss`
          : kind === "ride"
            ? "A ride needs a driver"
            : kind === "update"
              ? `${active.name} posted an update`
              : "A new plan is on the calendar",
      detail: title,
      time: "Just now",
      read: false,
      href: `/app/${kind === "permission" ? "permissions" : kind === "ride" ? "rides" : kind === "update" ? "updates" : "calendar"}`,
    };
    update(
      (s) => {
        if (kind === "event")
          return {
            ...s,
            events: [
              ...s.events,
              {
                id,
                title,
                date: v("date"),
                time: v("time"),
                end: v("end"),
                member,
                category: v("category") as Category,
                location: v("location") || "To be agreed",
                repeat: v("repeat"),
                note,
              },
            ],
            notifications: [notification, ...s.notifications],
          };
        if (kind === "responsibility")
          return {
            ...s,
            responsibilities: [
              ...s.responsibilities,
              {
                id,
                title,
                member,
                due: v("time"),
                category: v("category"),
                repeat: v("repeat"),
                done: false,
                acknowledged: false,
                note,
                streak: 0,
              },
            ],
          };
        if (kind === "ride")
          return {
            ...s,
            rides: [
              ...s.rides,
              {
                id,
                title,
                member,
                date: v("date"),
                from: v("from"),
                to: v("to"),
                time: v("time"),
                driver: null,
                status: "requested",
                note,
              },
            ],
            notifications: [notification, ...s.notifications],
          };
        if (kind === "permission")
          return {
            ...s,
            permissions: [
              {
                id,
                title,
                member,
                date: v("date"),
                detail: note,
                condition: "",
                status: "pending",
              },
              ...s.permissions,
            ],
            notifications: [notification, ...s.notifications],
          };
        if (kind === "update")
          return {
            ...s,
            updates: [
              {
                id,
                title,
                member,
                message: note,
                time: "Just now",
                acknowledgedBy: [activeId],
              },
              ...s.updates,
            ],
            notifications: [notification, ...s.notifications],
          };
        return {
          ...s,
          goals: [
            ...s.goals,
            {
              id,
              title,
              member,
              target: v("date"),
              supporter: v("supporter") as MemberId,
              steps: [{ title: v("step"), done: false }],
            },
          ],
        };
      },
      kind === "permission"
        ? "Request shared. There’s room for a conversation."
        : kind === "ride"
          ? "Ride requested. Your family can pick it up."
          : kind === "update"
            ? "Update shared with the Bennett family."
            : "Added to your shared space.",
    );
    onClose();
  }
  function field(
    name: string,
    label: string,
    props: {
      type?: string;
      required?: boolean;
      defaultValue?: string;
      placeholder?: string;
    } = {},
  ) {
    return (
      <div className="form-field">
        <label htmlFor={`plan-${name}`}>{label}</label>
        <input
          id={`plan-${name}`}
          name={name}
          maxLength={name === "title" ? 80 : 160}
          {...props}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `error-${name}` : undefined}
        />
        {errors[name] && (
          <span className="field-error" id={`error-${name}`}>
            {errors[name]}
          </span>
        )}
      </div>
    );
  }
  return (
    <Modal title={titles[kind]} onClose={onClose}>
      <p className="form-intro">
        {kind === "permission"
          ? "The details help your family talk it through."
          : kind === "ride"
            ? "Say where, when, and what would help."
            : kind === "goal"
              ? "Choose your goal. Start with one useful step."
              : "Give everyone just enough context."}
      </p>
      <form onSubmit={submit} noValidate>
        {field(
          "title",
          kind === "update"
            ? "Subject"
            : kind === "goal"
              ? "Your goal"
              : "What’s the plan?",
          {
            required: true,
            placeholder:
              kind === "permission"
                ? "e.g. Friday movie night"
                : kind === "ride"
                  ? "e.g. Home after rehearsal"
                  : undefined,
          },
        )}
        {active.role === "parent" && kind !== "update" && (
          <div className="form-field">
            <label htmlFor="plan-member">Who is it for?</label>
            <select
              id="plan-member"
              name="member"
              defaultValue={
                kind === "permission" || kind === "goal" ? "ellie" : activeId
              }
            >
              {state.members
                .filter((m) => kind !== "permission" || m.role === "teen")
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        {["event", "permission", "goal", "ride"].includes(kind) &&
          field("date", kind === "goal" ? "Target date" : "Date", {
            type: "date",
            required: true,
            defaultValue: DEMO_DATE,
          })}
        {["event", "responsibility", "ride"].includes(kind) && (
          <div className={kind === "event" ? "form-row" : ""}>
            {field(
              "time",
              kind === "responsibility"
                ? "Due time"
                : kind === "ride"
                  ? "Pickup time"
                  : "Start time",
              { type: "time", required: true, defaultValue: "17:30" },
            )}
            {kind === "event" &&
              field("end", "End time", {
                type: "time",
                required: true,
                defaultValue: "18:30",
              })}
          </div>
        )}
        {kind === "event" &&
          field("location", "Where?", { placeholder: "e.g. Westfield gym" })}
        {kind === "ride" && (
          <>
            {field("from", "Pickup place", { required: true })}
            {field("to", "Destination", {
              required: true,
              defaultValue: "Home",
            })}
          </>
        )}
        {["event", "responsibility"].includes(kind) && (
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="plan-category">Category</label>
              <select id="plan-category" name="category">
                {(kind === "event"
                  ? ["school", "work", "sports", "appointment", "family"]
                  : ["household", "school", "personal", "pet care", "errands"]
                ).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="plan-repeat">Repeat</label>
              <select id="plan-repeat" name="repeat">
                <option>Once</option>
                <option>Every weekday</option>
                <option>Weekly</option>
              </select>
            </div>
          </div>
        )}
        {kind === "goal" && (
          <>
            {field("step", "First step", { required: true })}
            <div className="form-field">
              <label htmlFor="plan-supporter">Who can support you?</label>
              <select id="plan-supporter" name="supporter">
                {state.members
                  .filter((m) => m.id !== activeId)
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
              </select>
            </div>
          </>
        )}
        <div className="form-field">
          <label htmlFor="plan-note">
            {kind === "permission"
              ? "The details: who, where, and your plan"
              : kind === "update"
                ? "Your update"
                : "Anything else to know?"}
            {!["permission", "update"].includes(kind) && (
              <span> (optional)</span>
            )}
          </label>
          <textarea
            id="plan-note"
            name="note"
            rows={3}
            maxLength={500}
            required={["permission", "update"].includes(kind)}
            aria-invalid={!!errors.note}
            aria-describedby={errors.note ? "error-note" : undefined}
          />
          {errors.note && (
            <span className="field-error" id="error-note">
              {errors.note}
            </span>
          )}
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="button">
            {kind === "permission"
              ? "Share request"
              : kind === "ride"
                ? "Request ride"
                : kind === "update"
                  ? "Share update"
                  : "Add to the plan"}
          </button>
        </div>
        <p className="quiet-caption">
          Fictional demo · nothing is sent outside this browser.
        </p>
      </form>
    </Modal>
  );
}
