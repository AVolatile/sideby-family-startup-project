"use client";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
export function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <>
      <section className="editorial-hero section-wrap">
        <span className="eyebrow">ONE HOUSEHOLD. A SIMPLE START.</span>
        <h1>
          Choose a little structure.
          <br />
          Keep plenty of room.
        </h1>
        <p>
          Illustrative pricing for the Sideby concept. No checkout, charges, or
          real subscription.
        </p>
        <div className="segmented">
          <button aria-pressed={!annual} onClick={() => setAnnual(false)}>
            Monthly
          </button>
          <button aria-pressed={annual} onClick={() => setAnnual(true)}>
            Yearly · save 20%
          </button>
        </div>
      </section>
      <section className="pricing-grid section-wrap">
        <article className="price-card">
          <span className="eyebrow">STARTER</span>
          <h2>A shared start.</h2>
          <div className="price">
            $0<span>/ household</span>
          </div>
          <p>Start with the day-to-day plan.</p>
          <ButtonLink href="/signup" secondary>
            Explore Starter
          </ButtonLink>
          <ul>
            {[
              "Up to 4 household members",
              "Today and family calendar",
              "Shared responsibilities",
              "Voluntary check-ins",
              "Family updates",
            ].map((t) => (
              <li key={t}>
                <Icon name="check" size={19} />
                {t}
              </li>
            ))}
          </ul>
        </article>
        <article className="price-card price-plus">
          <span className="plan-ribbon">MORE ROOM TO GROW</span>
          <span className="eyebrow">SIDEBY PLUS</span>
          <h2>The next chapter.</h2>
          <div className="price">
            ${annual ? "6.40" : "8"}
            <span>/ month per household</span>
          </div>
          <small>
            {annual
              ? "$76.80 billed yearly · concept pricing"
              : "Billed monthly · concept pricing"}
          </small>
          <p>Keep the handoffs and growing plans together.</p>
          <ButtonLink href="/signup">Explore Plus</ButtonLink>
          <ul>
            {[
              "Everything in Starter",
              "Up to 8 household members",
              "Ride requests and driver coordination",
              "Permission requests and shared agreements",
              "Goals and independence milestones",
              "Weekly family snapshot concept",
            ].map((t) => (
              <li key={t}>
                <Icon name="check" size={19} />
                {t}
              </li>
            ))}
          </ul>
        </article>
      </section>
      <section className="faq-section section-wrap">
        <h2>A few good questions.</h2>
        {[
          [
            "Is this a real subscription?",
            "No. Sideby is a self-initiated concept project. Both plans open the same complete frontend demo. No payment information is requested.",
          ],
          [
            "Do teens need their own account?",
            "In a launched product, each person would have their own age-appropriate profile and consent flow. This demo uses an obvious profile switcher to explore the four fictional family members.",
          ],
          [
            "Does Sideby track location?",
            "This concept uses voluntary written check-ins. It does not access GPS or collect background location history.",
          ],
          [
            "What happens to demo changes?",
            "They stay in memory while you explore the site and reset on page reload. No backend receives the data.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <Icon name="plus" />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
