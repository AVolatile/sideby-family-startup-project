"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { initialFamily } from "@/data/family";
import type { DemoState, MemberId } from "@/types/family";
type DemoContextValue = {
  state: DemoState;
  activeId: MemberId;
  setActiveId: (id: MemberId) => void;
  update: (fn: (previous: DemoState) => DemoState, message?: string) => void;
  notify: (message: string) => void;
  reset: () => void;
};
const DemoContext = createContext<DemoContextValue | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(initialFamily);
  const [activeId, setActiveId] = useState<MemberId>("mara");
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notify = useCallback((message: string) => {
    setToast(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 4500);
  }, []);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const update = useCallback(
    (fn: (previous: DemoState) => DemoState, message?: string) => {
      setState((previous) => {
        const next = fn(previous);
        const completed = next.responsibilities.find(
          (task) =>
            task.done &&
            previous.responsibilities.some(
              (old) => old.id === task.id && !old.done,
            ),
        );
        if (completed) {
          const member = next.members.find((m) => m.id === completed.member)!;
          return {
            ...next,
            notifications: [
              {
                id: crypto.randomUUID(),
                title: `${completed.title}? Taken care of.`,
                detail: `${member.name} completed the responsibility.`,
                time: "Just now",
                read: false,
                href: "/app/responsibilities",
              },
              ...next.notifications,
            ],
          };
        }
        return next;
      });
      if (message) notify(message);
    },
    [notify],
  );
  function reset() {
    setState(structuredClone(initialFamily));
    setActiveId("mara");
    notify("The Bennett demo has been reset.");
  }
  return (
    <DemoContext.Provider
      value={{ state, activeId, setActiveId, update, notify, reset }}
    >
      {children}
      <div
        className={`toast ${toast ? "is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </DemoContext.Provider>
  );
}
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("useDemo must be used within DemoProvider");
  return value;
}
