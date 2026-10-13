"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useDemo } from "@/lib/DemoProvider";
import { Avatar } from "./Shared";
import { Icon } from "@/components/ui/Icon";
import { Badge, EmptyState } from "@/components/ui/Primitives";
import { Modal } from "@/components/ui/Modal";
import { PlanForm } from "./PlanForm";
import type { Member } from "@/types/family";
export function Updates() {
  const { state, activeId, update } = useDemo();
  const [adding, setAdding] = useState(false);
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">JUST THE USEFUL STUFF.</span>
          <h1>A note for everyone.</h1>
          <p>A changed plan, a dinner update, a little heads-up.</p>
        </div>
        <button className="button button-small" onClick={() => setAdding(true)}>
          <Icon name="plus" size={18} />
          Share update
        </button>
      </div>
      <div className="updates-list">
        {state.updates.map((u) => (
          <article className="update-card" key={u.id}>
            <div className="update-author">
              <Avatar id={u.member} />
              <span>
                <strong>
                  {state.members.find((m) => m.id === u.member)!.name}
                </strong>
                <small>{u.time}</small>
              </span>
              <Badge>Family update</Badge>
            </div>
            <h2>{u.title}</h2>
            <p>{u.message}</p>
            <div className="update-footer">
              <button
                className={`acknowledge-button ${u.acknowledgedBy.includes(activeId) ? "acknowledged" : ""}`}
                aria-pressed={u.acknowledgedBy.includes(activeId)}
                onClick={() =>
                  update(
                    (s) => ({
                      ...s,
                      updates: s.updates.map((up) =>
                        up.id === u.id
                          ? {
                              ...up,
                              acknowledgedBy: up.acknowledgedBy.includes(
                                activeId,
                              )
                                ? up.acknowledgedBy.filter(
                                    (id) => id !== activeId,
                                  )
                                : [...up.acknowledgedBy, activeId],
                            }
                          : up,
                      ),
                    }),
                    u.acknowledgedBy.includes(activeId)
                      ? "Acknowledgment removed."
                      : "Got it. Your family can see you’re in the know.",
                  )
                }
              >
                <Icon name="check" size={17} />
                {u.acknowledgedBy.includes(activeId) ? "Got it" : "Acknowledge"}
              </button>
              <span className="acknowledged-members">
                {u.acknowledgedBy.map((id) => (
                  <Avatar id={id} key={id} size="small" />
                ))}
                <small>{u.acknowledgedBy.length} in the know</small>
              </span>
            </div>
          </article>
        ))}
      </div>
      {adding && <PlanForm kind="update" onClose={() => setAdding(false)} />}
    </>
  );
}
export function Milestones() {
  const { state, activeId, update } = useDemo();
  const parent =
    state.members.find((m) => m.id === activeId)!.role === "parent";
  const [review, setReview] = useState<string | null>(null);
  const milestone = state.milestones.find((m) => m.id === review);
  const [agreement, setAgreement] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">AGREEMENTS THAT GROW WITH YOU.</span>
          <h1>More room, one real step at a time.</h1>
          <p>Choose what to own. Agree on the support. Revisit it together.</p>
        </div>
      </div>
      <div className="milestone-philosophy bg-lilac">
        <Icon name="path" size={48} />
        <div>
          <h2>Independence isn’t a score.</h2>
          <p>
            These are family conversations made visible. Every person grows at
            their own pace.
          </p>
        </div>
      </div>
      {state.members
        .filter((m) => m.role === "teen" && (parent || m.id === activeId))
        .map((member) => (
          <section className="milestone-person" key={member.id}>
            <div className="panel-heading">
              <h2>
                <Avatar id={member.id} /> {member.name}’s next chapter
              </h2>
              <Badge>Shared agreements</Badge>
            </div>
            <div className="milestone-list">
              {state.milestones
                .filter((m) => m.member === member.id)
                .map((m, i) => (
                  <article
                    className={`milestone-card milestone-${m.status}`}
                    key={m.id}
                  >
                    <span className="milestone-number">
                      {m.status === "established" ? (
                        <Icon name="check" />
                      ) : (
                        String(i + 1).padStart(2, "0")
                      )}
                    </span>
                    <div>
                      <div className="card-eyebrow">
                        <Badge
                          tone={
                            m.status === "established" ? "positive" : "neutral"
                          }
                        >
                          {m.status === "established"
                            ? "Part of my routine"
                            : m.status === "in-progress"
                              ? "Trying it out"
                              : "Up next"}
                        </Badge>
                      </div>
                      <h3>{m.title}</h3>
                      <p>{m.description}</p>
                      <blockquote>{m.agreement}</blockquote>
                      <button
                        className="text-link text-button"
                        onClick={() => {
                          setReview(m.id);
                          setAgreement(m.agreement);
                          setError("");
                        }}
                      >
                        Revisit together <Icon name="arrow" size={17} />
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}
      {milestone && (
        <Modal title="Revisit the agreement" onClose={() => setReview(null)}>
          <p className="form-intro">
            {milestone.title}. Talk it through together before changing the
            shared plan.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (agreement.trim().length < 10) {
                setError(
                  "Add at least 10 characters so the agreement is clear.",
                );
                return;
              }
              const f = new FormData(e.currentTarget);
              update(
                (s) => ({
                  ...s,
                  milestones: s.milestones.map((m) =>
                    m.id === milestone.id
                      ? {
                          ...m,
                          agreement: agreement.trim(),
                          status: String(f.get("status")) as typeof m.status,
                        }
                      : m,
                  ),
                }),
                "Agreement updated. Keep the conversation going.",
              );
              setReview(null);
            }}
          >
            <div className="form-field">
              <label htmlFor="milestone-status">
                Where does this feel right now?
              </label>
              <select
                id="milestone-status"
                name="status"
                defaultValue={milestone.status}
              >
                <option value="next">Up next</option>
                <option value="in-progress">Trying it out</option>
                <option value="established">Part of my routine</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="milestone-agreement">Our shared agreement</label>
              <textarea
                id="milestone-agreement"
                rows={4}
                value={agreement}
                maxLength={500}
                onChange={(e) => setAgreement(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? "milestone-error" : undefined}
              />
              {error && (
                <span className="field-error" id="milestone-error">
                  {error}
                </span>
              )}
            </div>
            <button className="button full-width">Save our agreement</button>
          </form>
        </Modal>
      )}
    </>
  );
}
export function ImportantInfo() {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">A FEW DETAILS WORTH HAVING HANDY.</span>
          <h1>When you need a little backup.</h1>
          <p>Shared household information for the Bennett demo.</p>
        </div>
        <Badge>Fictional information</Badge>
      </div>
      <div className="info-notice">
        <Icon name="shield" />
        <p>
          This concept uses fictional contacts and sample notes. Don’t add real
          medical or sensitive information. Sideby does not provide emergency
          response.
        </p>
      </div>
      <div className="important-grid">
        <section className="product-panel">
          <Icon name="family" size={30} />
          <h2>People to reach</h2>
          <dl className="detail-list">
            <div>
              <dt>Mara · parent</dt>
              <dd>(202) 555-0142</dd>
            </div>
            <div>
              <dt>Dan · parent</dt>
              <dd>(202) 555-0187</dd>
            </div>
            <div>
              <dt>Ruth · grandmother</dt>
              <dd>(202) 555-0123 · backup pickup contact</dd>
            </div>
            <div>
              <dt>Westfield school office</dt>
              <dd>(202) 555-0164 · weekdays 8 am–4 pm</dd>
            </div>
          </dl>
        </section>
        <section className="product-panel bg-butter">
          <Icon name="pin" size={30} />
          <h2>Our meeting place</h2>
          <p>
            If we need to leave home and regroup, meet at the neighborhood
            library’s front steps.
          </p>
          <h3>Our shared plan</h3>
          <ol>
            <li>Get to a safe place first.</li>
            <li>Call a parent or trusted adult.</li>
            <li>
              If immediate help is needed, contact local emergency services
              directly.
            </li>
          </ol>
          <p className="quiet-caption">
            An illustrative household plan. Discuss an appropriate plan for your
            own circumstances.
          </p>
        </section>
        <section className="product-panel">
          <Icon name="heart" size={30} />
          <h2>Care details</h2>
          <dl className="detail-list">
            <div>
              <dt>Allergies</dt>
              <dd>No real health information stored. Sample field only.</dd>
            </div>
            <div>
              <dt>Preferred clinic</dt>
              <dd>Example Community Clinic · fictional</dd>
            </div>
            <div>
              <dt>Household note</dt>
              <dd>
                Pepper’s leash is by the back door. Ruth has the spare key.
              </dd>
            </div>
          </dl>
        </section>
        <section className="product-panel">
          <Icon name="shield" size={30} />
          <h2>Who can see this?</h2>
          <p>
            Everyone in this fictional household can read these sample notes.
            There’s no secure vault or medical storage behind this demo.
          </p>
          <Link href="/safety" className="text-link">
            Read our trust approach <Icon name="arrow" size={18} />
          </Link>
        </section>
      </div>
    </>
  );
}
export function Notifications() {
  const { state, update } = useDemo();
  const [unreadOnly, setUnreadOnly] = useState(false);
  const notifications = state.notifications.filter(
    (n) => !unreadOnly || !n.read,
  );
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">JUST ENOUGH TO STAY IN THE KNOW.</span>
          <h1>A few useful updates.</h1>
          <p>
            Changes to the plan, requests to discuss, and small things handled.
          </p>
        </div>
        <button
          className="button button-small button-secondary"
          disabled={state.notifications.every((n) => n.read)}
          onClick={() =>
            update(
              (s) => ({
                ...s,
                notifications: s.notifications.map((n) => ({
                  ...n,
                  read: true,
                })),
              }),
              "All caught up.",
            )
          }
        >
          Mark all read
        </button>
      </div>
      <div className="segmented">
        <button aria-pressed={!unreadOnly} onClick={() => setUnreadOnly(false)}>
          All updates
        </button>
        <button aria-pressed={unreadOnly} onClick={() => setUnreadOnly(true)}>
          Unread
        </button>
      </div>
      <div className="notifications-list">
        {notifications.map((n) => (
          <article
            className={`notification-item ${n.read ? "is-read" : ""}`}
            key={n.id}
          >
            <span className="notification-icon bg-lilac">
              <Icon
                name={
                  n.href.includes("permissions")
                    ? "key"
                    : n.href.includes("rides")
                      ? "ride"
                      : n.href.includes("check-ins")
                        ? "pin"
                        : "bell"
                }
              />
            </span>
            <Link
              href={n.href}
              onClick={() =>
                update((s) => ({
                  ...s,
                  notifications: s.notifications.map((no) =>
                    no.id === n.id ? { ...no, read: true } : no,
                  ),
                }))
              }
            >
              <strong>{n.title}</strong>
              <p>{n.detail}</p>
              <small>
                {n.time}
                {!n.read ? " · Unread" : ""}
              </small>
            </Link>
            <button
              className="icon-button"
              aria-label={`${n.read ? "Mark unread" : "Mark read"}: ${n.title}`}
              onClick={() =>
                update((s) => ({
                  ...s,
                  notifications: s.notifications.map((no) =>
                    no.id === n.id ? { ...no, read: !no.read } : no,
                  ),
                }))
              }
            >
              <Icon name={n.read ? "eye" : "check"} />
            </button>
          </article>
        ))}
      </div>
      {!notifications.length && (
        <EmptyState icon="bell" title="All caught up.">
          When the plan changes, the useful updates will be here.
        </EmptyState>
      )}
      <p className="quiet-caption">
        Demo notifications stay in this browser. No push messages or emails are
        sent.
      </p>
    </>
  );
}
export function Profiles() {
  const { state, activeId, update, reset } = useDemo();
  const [editing, setEditing] = useState<Member | null>(null);
  const [error, setError] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const parent =
    state.members.find((m) => m.id === activeId)!.role === "parent";
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name")).trim();
    if (name.length < 2) {
      setError("Add a name with at least 2 characters.");
      return;
    }
    update(
      (s) => ({
        ...s,
        members: s.members.map((m) =>
          m.id === editing?.id
            ? {
                ...m,
                name,
                fullName: `${name} Bennett`,
                initials: `${name[0]}B`,
                detail: String(f.get("detail")).trim(),
              }
            : m,
        ),
      }),
      "Demo profile updated.",
    );
    setEditing(null);
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">FOUR PEOPLE. OUR KIND OF RHYTHM.</span>
          <h1>Meet the Bennetts.</h1>
          <p>A fictional household, with a part for everyone.</p>
        </div>
        <Badge>Family demo</Badge>
      </div>
      <div className="profile-grid">
        {state.members.map((m) => (
          <article className="profile-card" key={m.id}>
            <div className={`profile-cover bg-${m.color}`}>
              <Avatar id={m.id} size="large" />
              <Badge>
                {m.role === "parent" ? "Parent / caregiver" : "Teen"}
                {m.id === activeId ? " · You" : ""}
              </Badge>
            </div>
            <h2>{m.fullName}</h2>
            <p>{m.detail}</p>
            <dl>
              <div>
                <dt>Plans this week</dt>
                <dd>{state.events.filter((e) => e.member === m.id).length}</dd>
              </div>
              <div>
                <dt>Responsibilities</dt>
                <dd>
                  {
                    state.responsibilities.filter((t) => t.member === m.id)
                      .length
                  }
                </dd>
              </div>
            </dl>
            {(parent || m.id === activeId) && (
              <button
                className="button button-secondary button-small"
                onClick={() => {
                  setEditing(m);
                  setError("");
                }}
              >
                <Icon name="edit" size={16} />
                Edit demo profile
              </button>
            )}
          </article>
        ))}
      </div>
      <section className="product-panel family-settings">
        <div>
          <h2>Our shared expectations</h2>
          <p>
            Check-ins are voluntary. Permission requests are conversations.
            Everyone sees the household’s shared plans. Teen goals and
            responsibilities have their own home.
          </p>
        </div>
        <div>
          <h3>Demo controls</h3>
          <p>
            Profiles can be switched from the header. All changes reset when you
            reload.
          </p>
          <button className="text-button" onClick={() => setConfirmReset(true)}>
            Reset the Bennett demo
          </button>
        </div>
      </section>
      {editing && (
        <Modal
          title={`A little about ${editing.name}`}
          onClose={() => setEditing(null)}
        >
          <form onSubmit={save} noValidate>
            <div className="form-field">
              <label htmlFor="profile-name">First name</label>
              <input
                id="profile-name"
                name="name"
                maxLength={40}
                defaultValue={editing.name}
                aria-invalid={!!error}
                aria-describedby={error ? "profile-error" : undefined}
              />
              {error && (
                <span className="field-error" id="profile-error">
                  {error}
                </span>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="profile-detail">A little about you</label>
              <textarea
                id="profile-detail"
                name="detail"
                defaultValue={editing.detail}
                maxLength={180}
                rows={3}
              />
            </div>
            <p className="quiet-caption">
              Use fictional details only. Nothing is saved to a server.
            </p>
            <button className="button full-width" type="submit">
              Save demo profile
            </button>
          </form>
        </Modal>
      )}
      {confirmReset && (
        <Modal
          title="A fresh start for the demo?"
          onClose={() => setConfirmReset(false)}
        >
          <p className="form-intro">
            This restores the original Bennett plans and removes the changes
            made in this session.
          </p>
          <div className="form-actions">
            <button
              className="button button-secondary"
              onClick={() => setConfirmReset(false)}
            >
              Keep my changes
            </button>
            <button
              className="button"
              onClick={() => {
                reset();
                setConfirmReset(false);
              }}
            >
              Reset demo
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
