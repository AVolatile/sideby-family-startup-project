"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDemo } from "@/lib/DemoProvider";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/product/Shared";
import { BrandPath } from "@/components/brand/Logo";
import { PhonePreview } from "./PhonePreview";
import type { Role } from "@/types/family";
export function AuthExperience({ signup = false }: { signup?: boolean }) {
  const router = useRouter();
  const { setActiveId } = useDemo();
  const [role, setRole] = useState<Role>("parent");
  const [step, setStep] = useState(0);
  const [rhythm, setRhythm] = useState<string[]>(["Rides & handoffs"]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("role") === "teen")
      setRole("teen");
  }, []);
  function enter() {
    setActiveId(role === "teen" ? "ellie" : "mara");
    router.push("/app/today");
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    if (signup && step === 0) {
      if (name.trim().length < 2) {
        setError("Give your demo household a name with at least 2 characters.");
        return;
      }
      setError("");
      setStep(1);
    } else if (signup && step === 1) {
      if (!rhythm.length) {
        setError("Choose at least one thing you’d like to sort.");
        return;
      }
      setError("");
      setStep(2);
    } else enter();
  }
  return (
    <section className="auth-layout">
      <div className="auth-panel">
        <span className="eyebrow">
          {signup ? "A SHARED START" : "WELCOME TO THE BENNETT DEMO"}
        </span>
        <h1>
          {signup
            ? step === 0
              ? "Make room for your people."
              : step === 1
                ? "What needs a little less back-and-forth?"
                : "Your shared space starts with a conversation."
            : "Step into their Tuesday."}
        </h1>
        <p>
          {signup
            ? step === 0
              ? "Walk through the concept onboarding. Use a fictional household name."
              : step === 1
                ? "A useful starting point beats organizing everything at once."
                : "We’ll open the complete Bennett demo so you can explore a believable family day."
            : "Choose a point of view. No account, email, or password needed."}
        </p>
        {signup && (
          <ol className="onboarding-steps" aria-label="Onboarding progress">
            {["Your people", "Your rhythm", "Your plan"].map((s, i) => (
              <li
                key={s}
                className={i === step ? "current" : i < step ? "complete" : ""}
                aria-current={i === step ? "step" : undefined}
              >
                <span>
                  {i < step ? <Icon name="check" size={14} /> : i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        )}
        <form onSubmit={submit} noValidate>
          {signup && step === 0 && (
            <div className="form-field">
              <label htmlFor="household-name">Demo household name</label>
              <input
                id="household-name"
                value={name}
                maxLength={50}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="e.g. The Parkers"
                aria-invalid={!!error}
                aria-describedby={error ? "auth-error" : undefined}
              />
            </div>
          )}
          {(!signup || step === 0) && (
            <fieldset className="persona-options">
              <legend>Your point of view</legend>
              {(["parent", "teen"] as Role[]).map((r) => (
                <label className={role === r ? "selected" : ""} key={r}>
                  <input
                    type="radio"
                    name="persona"
                    value={r}
                    checked={role === r}
                    onChange={() => setRole(r)}
                  />
                  <Avatar id={r === "parent" ? "mara" : "ellie"} />
                  <span>
                    <strong>
                      {r === "parent" ? "Parent / caregiver" : "Teen"}
                    </strong>
                    <small>
                      {r === "parent"
                        ? "Shared logistics. Useful context."
                        : "Your schedule. Your next step."}
                    </small>
                  </span>
                  <Icon name="check" />
                </label>
              ))}
            </fieldset>
          )}
          {signup && step === 1 && (
            <fieldset className="rhythm-options">
              <legend className="sr-only">Choose your priorities</legend>
              {[
                "Rides & handoffs",
                "Shared schedules",
                "Responsibilities",
                "Permission conversations",
                "Personal goals",
                "Useful check-ins",
              ].map((r) => (
                <label key={r} className={rhythm.includes(r) ? "selected" : ""}>
                  <input
                    type="checkbox"
                    checked={rhythm.includes(r)}
                    onChange={() => {
                      setRhythm((prev) =>
                        prev.includes(r)
                          ? prev.filter((v) => v !== r)
                          : [...prev, r],
                      );
                      setError("");
                    }}
                  />
                  {r}
                </label>
              ))}
            </fieldset>
          )}
          {signup && step === 2 && (
            <div className="onboarding-recap bg-lilac">
              <Icon name="family" size={30} />
              <h2>A first plan for {name.trim()}.</h2>
              <p>
                Start with {rhythm.map((r) => r.toLowerCase()).join(", ")}. Give
                each person a say in what they share and what they want to own.
              </p>
              <span>
                Previewing as{" "}
                {role === "teen" ? "Ellie · teen" : "Mara · parent"} in the
                Bennett sample household.
              </span>
            </div>
          )}
          {error && (
            <span className="field-error" id="auth-error" role="alert">
              {error}
            </span>
          )}
          <div className="form-actions">
            {signup && step > 0 && (
              <button
                type="button"
                className="button button-secondary"
                onClick={() => {
                  setStep(step - 1);
                  setError("");
                }}
              >
                Back
              </button>
            )}
            <button type="submit" className="button full-width">
              {signup && step < 2 ? "Continue" : `Explore ${role} view`}
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </form>
        <p className="auth-footnote">
          Concept demo. No account is created. Your onboarding choices stay in
          this browser session; the sample household remains the Bennetts.
        </p>
        <Link href={signup ? "/login" : "/signup"} className="text-link">
          {signup ? "Skip to the demo" : "Try the onboarding"}
          <Icon name="arrow" size={17} />
        </Link>
      </div>
      <div className="auth-art bg-lilac">
        <BrandPath />
        <span className="eyebrow">A LITTLE STRUCTURE. A LOT OF ROOM.</span>
        <h2>
          Room to grow.
          <br />A plan to go.
        </h2>
        <PhonePreview persona={role} />
      </div>
    </section>
  );
}
