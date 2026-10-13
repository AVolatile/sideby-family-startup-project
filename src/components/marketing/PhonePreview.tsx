import { Icon } from "@/components/ui/Icon";
import { Symbol } from "@/components/brand/Logo";
import type { Role } from "@/types/family";
export function PhonePreview({
  persona: role = "teen",
  screen = "today",
  className = "",
}: {
  persona?: Role;
  screen?: string;
  className?: string;
}) {
  return (
    <div
      className={`phone ${className}`}
      aria-label={`${role} ${screen} product preview`}
    >
      <div className="phone-status">
        <span>9:41</span>
        <span className="phone-island" />
        <span>▰</span>
      </div>
      <div className="phone-top">
        <Symbol />
        <span>The Bennetts</span>
        <span className={`avatar bg-${role === "teen" ? "coral" : "lilac"}`}>
          {role === "teen" ? "EB" : "MB"}
        </span>
      </div>
      <div className="phone-body">
        <span className="eyebrow">Tuesday, October 13</span>
        <h3>
          {screen === "today"
            ? role === "teen"
              ? "Your day. Your move."
              : "A good day, together."
            : screen === "check-ins"
              ? "A little update."
              : screen === "rides"
                ? "Your way home."
                : screen === "permissions"
                  ? "Let’s make a plan."
                  : screen === "goals"
                    ? "What’s next for you."
                    : screen === "responsibilities"
                      ? "You’ve got this."
                      : "The week, sorted."}
        </h3>
        {screen === "today" || screen === "calendar" ? (
          <>
            <div className="mini-note">
              <Icon name="sun" />
              <span>
                A little later, all together.
                <small>Dinner’s at 6:30 tonight.</small>
              </span>
            </div>
            <div className="mini-section-label">
              {role === "teen" ? "YOUR AFTERNOON" : "COMING UP"}
              <span>3 plans</span>
            </div>
            <MiniEvent
              time="3:30"
              title="Basketball practice"
              subtitle="Ellie · Westfield gym"
              color="coral"
              icon="flag"
            />
            <MiniEvent
              time="5:30"
              title="A ride home"
              subtitle="Dan’s driving · south entrance"
              color="lilac"
              icon="ride"
            />
            <MiniEvent
              time="6:30"
              title="Taco Tuesday"
              subtitle="Everyone · home"
              color="butter"
              icon="family"
            />
            <div className="mini-checkin">
              <span className="mini-icon">
                <Icon name="pin" />
              </span>
              <div>
                <strong>
                  {role === "teen"
                    ? "Made it to practice?"
                    : "Ellie’s at practice."}
                </strong>
                <small>
                  {role === "teen"
                    ? "One tap. Everyone’s in the know."
                    : "Shared by Ellie at 3:32 pm"}
                </small>
              </div>
              <Icon name="arrow" size={17} />
            </div>
            <div className="mini-section-label">A LITTLE RESPONSIBILITY</div>
            <div className="mini-task">
              <span className="task-circle" />
              Reset the kitchen<small>8 pm</small>
            </div>
          </>
        ) : screen === "check-ins" ? (
          <>
            <div className="mini-note">
              <Icon name="shield" />
              <span>
                Shared on your terms.
                <small>No live location. Just your update.</small>
              </span>
            </div>
            <div className="mini-check-grid">
              {["I’m here", "Heading home", "Plans changed", "Need a ride"].map(
                (s, i) => (
                  <div key={s}>
                    <Icon name={["pin", "arrow", "message", "ride"][i]} />
                    <strong>{s}</strong>
                  </div>
                ),
              )}
            </div>
            <div className="mini-section-label">LAST SHARED</div>
            <MiniEvent
              time="3:32"
              title="At practice"
              subtitle="Coach says we’ll finish at 5:30."
              color="coral"
              icon="check"
            />
          </>
        ) : screen === "rides" ? (
          <>
            <div className="mini-ride">
              <span className="eyebrow">TODAY · 5:30 PM</span>
              <Icon name="ride" size={52} />
              <h4>Home from practice</h4>
              <p>Westfield gym → Home</p>
              <div className="mini-driver">
                <span className="avatar bg-butter">DB</span>
                <span>
                  Dan’s driving<small>South entrance. Gray car.</small>
                </span>
                <Icon name="check" />
              </div>
            </div>
            <div className="mini-note">
              <Icon name="clock" />
              <span>
                Tomorrow’s shift<small>Ride requested · 7:00 pm</small>
              </span>
            </div>
          </>
        ) : screen === "permissions" ? (
          <>
            <div className="mini-permission">
              <span className="badge">FRIDAY PLANS</span>
              <h4>Movie night?</h4>
              <p>
                Cedar Cinema with Ava & Jules.
                <br />
                Home by 10:30.
              </p>
              <div className="mini-agreement">
                <Icon name="key" />
                <span>Let’s agree on the ride home.</span>
              </div>
              <div className="mini-button">
                Talk it through <Icon name="arrow" size={16} />
              </div>
            </div>
            <div className="mini-note">
              <Icon name="check" />
              <span>
                Bike to the river trail<small>Approved · Saturday</small>
              </span>
            </div>
          </>
        ) : screen === "goals" ? (
          <>
            <div className="mini-goal">
              <Icon name="path" size={40} />
              <h4>My first solo drive</h4>
              <p>A familiar route. A new kind of freedom.</p>
              <div className="progress-track">
                <span style={{ width: "50%" }} />
              </div>
              <small>2 of 4 steps · supported by Dan</small>
            </div>
            {[
              "Road rules course",
              "Practice the school route",
              "Parking at the gym",
            ].map((s, i) => (
              <div className="mini-task" key={s}>
                <span className={`task-circle ${i < 2 ? "checked" : ""}`}>
                  {i < 2 && <Icon name="check" size={12} />}
                </span>
                {s}
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="mini-note">
              <Icon name="spark" />
              <span>
                A place for “I’ve got it.”
                <small>A few things you’re taking care of.</small>
              </span>
            </div>
            {[
              "Reset the kitchen",
              "Submit history outline",
              "Pack my practice bag",
            ].map((s, i) => (
              <div className="mini-task" key={s}>
                <span className={`task-circle ${i === 2 ? "checked" : ""}`}>
                  {i === 2 && <Icon name="check" size={12} />}
                </span>
                {s}
              </div>
            ))}
          </>
        )}
      </div>
      <div className="phone-bottom">
        {["sun", "calendar", "pin", "more"].map((icon, i) => (
          <span key={icon} className={i === 0 ? "active" : ""}>
            <Icon name={icon} size={20} />
            <small>{["Today", "Calendar", "Check in", "More"][i]}</small>
          </span>
        ))}
      </div>
    </div>
  );
}
function MiniEvent({
  time,
  title,
  subtitle,
  color,
  icon,
}: {
  time: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
}) {
  return (
    <div className="mini-event">
      <span className="mini-time">
        {time}
        <small>pm</small>
      </span>
      <span className={`mini-icon bg-${color}`}>
        <Icon name={icon} />
      </span>
      <div>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </div>
    </div>
  );
}
