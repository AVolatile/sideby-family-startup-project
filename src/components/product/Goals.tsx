"use client";
import { useState } from "react";
import { useDemo } from "@/lib/DemoProvider";
import { Avatar } from "./Shared";
import { Icon } from "@/components/ui/Icon";
import { PlanForm } from "./PlanForm";
import { EmptyState } from "@/components/ui/Primitives";
export function Goals() {
  const { state, activeId, update } = useDemo();
  const active = state.members.find((m) => m.id === activeId)!;
  const [adding, setAdding] = useState(false);
  const goals = state.goals.filter(
    (g) => active.role === "parent" || g.member === activeId,
  );
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR NEXT CHAPTER</span>
          <h1>
            {active.role === "teen"
              ? "Something you want. Steps you own."
              : "Big things start with a next step."}
          </h1>
          <p>Personal goals, useful support, and progress you can see.</p>
        </div>
        <button className="button button-small" onClick={() => setAdding(true)}>
          <Icon name="plus" size={18} />
          Add goal
        </button>
      </div>
      <div className="goal-grid">
        {goals.map((g, i) => {
          const complete = g.steps.filter((s) => s.done).length;
          const progress = Math.round((complete / g.steps.length) * 100);
          return (
            <article className="goal-card" key={g.id}>
              <div
                className={`goal-cover bg-${["lilac", "butter", "sky"][i % 3]}`}
              >
                <div className="card-eyebrow">
                  <Avatar id={g.member} label size="small" />
                  <Icon
                    name={i === 0 ? "path" : i === 1 ? "flag" : "spark"}
                    size={28}
                  />
                </div>
                <h2>{g.title}</h2>
                <span>Working toward {g.target}</span>
                <div
                  className="progress-track"
                  role="progressbar"
                  aria-label={`${g.title} progress`}
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <span style={{ width: `${progress}%` }} />
                </div>
                <div className="goal-progress">
                  <strong>
                    {complete} of {g.steps.length} steps
                  </strong>
                  <span>{progress}%</span>
                </div>
              </div>
              <div className="goal-steps">
                {g.steps.map((step, index) => (
                  <label key={index} className={step.done ? "step-done" : ""}>
                    <input
                      type="checkbox"
                      checked={step.done}
                      onChange={() =>
                        update(
                          (s) => ({
                            ...s,
                            goals: s.goals.map((goal) =>
                              goal.id === g.id
                                ? {
                                    ...goal,
                                    steps: goal.steps.map((st, j) =>
                                      j === index
                                        ? { ...st, done: !st.done }
                                        : st,
                                    ),
                                  }
                                : goal,
                            ),
                          }),
                          step.done
                            ? "Step reopened. Take it at your pace."
                            : "One real step forward. Nice work.",
                        )
                      }
                      disabled={active.role === "teen" && g.member !== activeId}
                    />
                    <span>{step.title}</span>
                    {step.done && <Icon name="check" size={16} />}
                  </label>
                ))}
              </div>
              <div className="goal-support">
                <Avatar id={g.supporter} size="small" />
                <span>
                  A little support from{" "}
                  {state.members.find((m) => m.id === g.supporter)!.name}
                </span>
              </div>
            </article>
          );
        })}
      </div>
      {!goals.length && (
        <EmptyState icon="flag" title="What’s next for you?">
          Add a goal and give it a first step. You choose what matters.
        </EmptyState>
      )}
      {adding && <PlanForm kind="goal" onClose={() => setAdding(false)} />}
    </>
  );
}
