"use client";
import { useState } from "react";
import type { Role } from "@/types/family";
import { PhonePreview } from "./PhonePreview";
import { ButtonLink } from "@/components/ui/Primitives";
export function DemoPreview() {
  const [role, setRole] = useState<Role>("teen");
  return (
    <section className="test-drive section-wrap">
      <div>
        <span className="eyebrow">Same family. Different point of view.</span>
        <h2>It’s their space, too.</h2>
        <p>
          Parents get the context. Teens get the controls. A shared plan works
          better when everyone has a part in it.
        </p>
        <div className="segmented">
          <button
            aria-pressed={role === "parent"}
            onClick={() => setRole("parent")}
          >
            Parent view
          </button>
          <button
            aria-pressed={role === "teen"}
            onClick={() => setRole("teen")}
          >
            Teen view
          </button>
        </div>
        <div className="test-drive-copy">
          <h3>
            {role === "teen"
              ? "Know the plan. Own your part."
              : "See what’s happening. Know where to help."}
          </h3>
          <p>
            {role === "teen"
              ? "Your schedule, a ride when you need it, and goals you choose. Send an update when it matters and make room for what’s next."
              : "Today’s handoffs, the ride still waiting for a driver, and the Friday plan worth a conversation. Enough context to be useful."}
          </p>
        </div>
        <ButtonLink href={`/login?role=${role}`}>
          Take the demo for a spin
        </ButtonLink>
        <small className="demo-disclaimer">
          Interactive demo · fictional Bennett family
        </small>
      </div>
      <div
        className={`test-drive-stage bg-${role === "teen" ? "lilac" : "butter"}`}
      >
        <span className="stage-sticker">
          {role === "teen" ? "I’ve got this." : "We’ve got a plan."}
        </span>
        <PhonePreview persona={role} />
      </div>
    </section>
  );
}
