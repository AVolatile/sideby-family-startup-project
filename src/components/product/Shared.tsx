"use client";
import { useDemo } from "@/lib/DemoProvider";
import type { MemberId } from "@/types/family";
import { Icon } from "@/components/ui/Icon";
export function Avatar({
  id,
  size = "normal",
  label = false,
}: {
  id: MemberId;
  size?: string;
  label?: boolean;
}) {
  const { state } = useDemo();
  const person = state.members.find((m) => m.id === id)!;
  return (
    <span className={`avatar-group ${label ? "with-label" : ""}`}>
      <span
        className={`avatar bg-${person.color} avatar-${size}`}
        aria-label={label ? undefined : person.name}
      >
        {person.initials}
      </span>
      {label && <span>{person.name}</span>}
    </span>
  );
}
export function MemberFilter({
  value,
  onChange,
}: {
  value: MemberId | "all";
  onChange: (id: MemberId | "all") => void;
}) {
  const { state } = useDemo();
  return (
    <div className="member-filter" aria-label="Filter by family member">
      <button
        className={`filter-chip ${value === "all" ? "selected" : ""}`}
        aria-pressed={value === "all"}
        onClick={() => onChange("all")}
      >
        <Icon name="family" size={18} />
        Everyone
      </button>
      {state.members.map((m) => (
        <button
          key={m.id}
          className={`filter-chip ${value === m.id ? "selected" : ""}`}
          aria-pressed={value === m.id}
          onClick={() => onChange(m.id)}
        >
          <span aria-hidden="true">
            <Avatar id={m.id} size="small" />
          </span>
          {m.name}
        </button>
      ))}
    </div>
  );
}
