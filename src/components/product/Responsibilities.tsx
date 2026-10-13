"use client";
import { useState } from "react";
import { useDemo } from "@/lib/DemoProvider";
import { formatTime } from "@/data/family";
import { Avatar, MemberFilter } from "./Shared";
import { Icon } from "@/components/ui/Icon";
import { Badge, EmptyState } from "@/components/ui/Primitives";
import { PlanForm } from "./PlanForm";
import type { MemberId } from "@/types/family";
export function Responsibilities() {
  const { state, activeId, update } = useDemo();
  const active = state.members.find((m) => m.id === activeId)!;
  const parent = active.role === "parent";
  const [filter, setFilter] = useState<MemberId | "all">("all");
  const [tab, setTab] = useState("open");
  const [adding, setAdding] = useState(false);
  const tasks = state.responsibilities.filter(
    (t) =>
      (parent
        ? filter === "all" || filter === t.member
        : t.member === activeId) && (tab === "open" ? !t.done : t.done),
  );
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">A PLACE FOR “I’VE GOT IT.”</span>
          <h1>
            {parent ? "Everyone has a part." : "Your part. On your terms."}
          </h1>
          <p>Household, school, and the things you handle for yourself.</p>
        </div>
        <button className="button button-small" onClick={() => setAdding(true)}>
          <Icon name="plus" size={18} />
          {parent ? "Add responsibility" : "Add my responsibility"}
        </button>
      </div>
      <div className="responsibility-summary bg-lilac">
        <Icon name="check" size={34} />
        <div>
          <h2>
            {
              state.responsibilities.filter(
                (t) => t.done && (parent || t.member === activeId),
              ).length
            }{" "}
            things taken care of.
          </h2>
          <p>Real contributions. No points or leaderboards.</p>
        </div>
      </div>
      <div className="section-controls">
        {parent && <MemberFilter value={filter} onChange={setFilter} />}
        <div className="segmented">
          <button aria-pressed={tab === "open"} onClick={() => setTab("open")}>
            To do
          </button>
          <button aria-pressed={tab === "done"} onClick={() => setTab("done")}>
            Taken care of
          </button>
        </div>
      </div>
      <div className="responsibility-list">
        {tasks.map((t) => (
          <article
            className={`responsibility-card ${t.done ? "is-done" : ""}`}
            key={t.id}
          >
            <label className="task-toggle">
              <input
                type="checkbox"
                aria-label={`Complete ${t.title}`}
                checked={t.done}
                onChange={() =>
                  update(
                    (s) => ({
                      ...s,
                      responsibilities: s.responsibilities.map((r) =>
                        r.id === t.id
                          ? { ...r, done: !r.done, acknowledged: false }
                          : r,
                      ),
                    }),
                    t.done
                      ? "Moved back to your list."
                      : "Taken care of. Your family can see the update.",
                  )
                }
              />
            </label>
            <div className="responsibility-info">
              <div className="card-eyebrow">
                <Badge>{t.category}</Badge>
                <span>{t.done ? "Completed" : `Due ${formatTime(t.due)}`}</span>
              </div>
              <h2>{t.title}</h2>
              <p>{t.note}</p>
              <div className="card-meta">
                <Avatar id={t.member} label size="small" />
                <span>
                  <Icon name="clock" size={14} />
                  {t.repeat}
                </span>
                {t.streak > 0 && (
                  <span>
                    <Icon name="path" size={14} />
                    {t.streak} weeks of consistency
                  </span>
                )}
              </div>
            </div>
            {parent && t.done && (
              <button
                className="button button-small button-secondary"
                disabled={t.acknowledged}
                onClick={() =>
                  update(
                    (s) => ({
                      ...s,
                      responsibilities: s.responsibilities.map((r) =>
                        r.id === t.id ? { ...r, acknowledged: true } : r,
                      ),
                    }),
                    "A little appreciation goes a long way.",
                  )
                }
              >
                {t.acknowledged ? "Acknowledged" : "Say thanks"}
              </button>
            )}
            {!parent && t.acknowledged && (
              <Badge tone="positive">Family acknowledged</Badge>
            )}
          </article>
        ))}
      </div>
      {!tasks.length && (
        <EmptyState
          icon="check"
          title={
            tab === "open"
              ? "A little breathing room."
              : "Your contributions go here."
          }
        >
          {tab === "open"
            ? "Your list is clear. Add something you want to take care of."
            : "Complete a responsibility and it will appear here."}
        </EmptyState>
      )}
      {adding && (
        <PlanForm kind="responsibility" onClose={() => setAdding(false)} />
      )}
    </>
  );
}
