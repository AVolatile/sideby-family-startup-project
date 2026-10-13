import Link from "next/link";
import Image from "next/image";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { PhonePreview } from "@/components/marketing/PhonePreview";
import { DemoPreview } from "@/components/marketing/DemoPreview";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { BrandPath, Symbol } from "@/components/brand/Logo";
import { ButtonLink, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
export default function Home() {
  return (
    <MarketingShell>
      <section className="home-hero section-wrap">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="kicker-line" />A LITTLE STRUCTURE. A LOT OF ROOM.
          </div>
          <h1>
            Room to grow.
            <br />A plan to <span className="underlined">go.</span>
          </h1>
          <p>
            School. Practice. The first solo trip.
            <br className="desktop-only" /> Sideby helps your family sort the
            everyday—
            <br className="desktop-only" />
            and make space for what’s next.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/signup">Start your family</ButtonLink>
            <Link href="/how-it-works" className="text-link">
              See how it works <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="hero-proof">
            <span className="paired-avatars">
              <span className="avatar bg-lilac">MB</span>
              <span className="avatar bg-coral">EB</span>
            </span>
            <span>
              Built for both sides of growing up.
              <small>Parents get context. Teens get a say.</small>
            </span>
          </div>
        </div>
        <div className="hero-composition">
          <BrandPath />
          <div className="photo-frame">
            <Image
              src="/images/after-practice.webp"
              alt="A teen carrying a basketball walks with her dad after practice."
              width={900}
              height={600}
              priority
            />
            <span className="photo-caption">BIG PLANS. EVERYDAY MOMENTS.</span>
          </div>
          <PhonePreview className="hero-phone" />
          <div className="floating-update">
            <span className="avatar bg-butter">DB</span>
            <div>
              <strong>Ride home? Sorted.</strong>
              <small>Dan’s driving · 5:30 pm</small>
            </div>
            <span className="check-bubble">
              <Icon name="check" size={15} />
            </span>
          </div>
          <span className="hero-handnote">
            a little more
            <br />
            “I’ve got this.”
            <svg viewBox="0 0 80 50" aria-hidden="true">
              <path
                d="M3 4c35 0 65 15 60 39m-12-9 12 9 10-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>
        </div>
      </section>
      <div
        className="brand-ticker"
        aria-label="Plan together. Take your own steps."
      >
        <span>Plan together.</span>
        <Symbol />
        <span>Take your own steps.</span>
        <Symbol />
        <span>Keep each other in the know.</span>
        <Symbol />
      </div>
      <section className="problem-section section-wrap">
        <div>
          <span className="eyebrow">
            The family group chat can only do so much.
          </span>
          <h2>
            A whole day.
            <br />A thousand little threads.
          </h2>
          <p>
            Who’s picking up? Was that Friday or Saturday? Can I go? The details
            are small. Keeping track of all of them isn’t.
          </p>
          <p>Give your family a shared plan—and everyone a little more room.</p>
        </div>
        <div className="message-collage">
          <div className="message-card bg-lilac">
            who’s picking me up?<span>Ellie · 4:48 pm</span>
          </div>
          <div className="message-card bg-butter">
            Wait, practice moved?<span>Dan · 4:50 pm</span>
          </div>
          <div className="message-card bg-coral">
            I put it somewhere…<span>Mara · 4:51 pm</span>
          </div>
          <div className="resolved-card">
            <Icon name="ride" />
            <div>
              <strong>Pickup is at 5:30.</strong>
              <span>Dan’s got it. South entrance.</span>
            </div>
            <Icon name="check" />
          </div>
        </div>
      </section>
      <section className="feature-story section-wrap">
        <SectionHeading
          eyebrow="The everyday, with a little less back-and-forth."
          title="A plan you can all be part of."
        >
          From the ride after practice to the Friday-night ask. The right
          detail, in the right place.
        </SectionHeading>
        <div className="story-grid">
          <Link href="/app/rides" className="story-card story-rides bg-lilac">
            <span className="eyebrow">01 / THE HANDOFFS</span>
            <h3>
              Who’s driving?
              <br />
              Already answered.
            </h3>
            <p>
              Request a ride. Claim a pickup.
              <br />
              Keep the next handoff clear.
            </p>
            <div className="ride-visual">
              <Icon name="ride" size={42} />
              <div>
                <strong>Practice → Home</strong>
                <span>5:30 pm · Dan’s driving</span>
              </div>
              <span className="avatar bg-butter">DB</span>
            </div>
            <span className="story-link">
              Sort the rides <Icon name="arrow" />
            </span>
          </Link>
          <Link
            href="/app/check-ins"
            className="story-card story-checkins bg-butter"
          >
            <span className="eyebrow">02 / THE LITTLE UPDATES</span>
            <h3>
              “I’m here.”
              <br />
              That’s enough.
            </h3>
            <p>
              A check-in they choose to send.
              <br />A useful update for everyone else.
            </p>
            <div className="checkin-visual">
              <span className="avatar bg-coral">EB</span>
              <strong>Made it to practice.</strong>
              <Icon name="check" />
              <small>Shared by Ellie · 3:32 pm</small>
            </div>
            <span className="story-link">
              See check-ins <Icon name="arrow" />
            </span>
          </Link>
          <Link
            href="/app/permissions"
            className="story-card story-permissions bg-sky"
          >
            <span className="eyebrow">03 / THE BIGGER CONVERSATIONS</span>
            <h3>
              A little context.
              <br />A better “yes.”
            </h3>
            <p>
              Put the plan on the table.
              <br />
              Agree on the details together.
            </p>
            <div className="permission-visual">
              <Icon name="key" />
              <div>
                <strong>Friday movie night</strong>
                <span>Home by 10:30 · ride arranged</span>
              </div>
              <span className="badge">Agreed</span>
            </div>
            <span className="story-link">
              Make an agreement <Icon name="arrow" />
            </span>
          </Link>
        </div>
      </section>
      <section className="independence-section">
        <div className="section-wrap independence-inner">
          <div className="independence-art">
            <span className="eyebrow">ELLIE’S NEXT CHAPTER</span>
            <h3>
              My first
              <br />
              solo drive.
            </h3>
            <div className="path-steps">
              <div>
                <span>
                  <Icon name="check" />
                </span>
                Road rules? Got them.
              </div>
              <div>
                <span>
                  <Icon name="check" />
                </span>
                The school route? Practiced.
              </div>
              <div className="current">
                <span>03</span>Next up: parking at the gym.
              </div>
              <div>
                <span>04</span>A first drive of my own.
              </div>
            </div>
            <span className="art-caption">
              Her goal. A little support from Dan.
            </span>
          </div>
          <div>
            <span className="eyebrow">GROWING INDEPENDENCE</span>
            <h2>
              More room.
              <br />
              One real step at a time.
            </h2>
            <p>
              Owning a schedule. Getting to practice. Making the first solo
              plan. Independence happens in the everyday.
            </p>
            <p>
              Set goals together, choose useful support, and let the agreements
              grow as they do.
            </p>
            <ButtonLink href="/for-teens" secondary>
              Meet their side of Sideby
            </ButtonLink>
          </div>
        </div>
      </section>
      <DemoPreview />
      <section className="trust-section section-wrap">
        <div className="trust-symbol">
          <Symbol />
        </div>
        <div>
          <span className="eyebrow">TRUST IS THE STARTING POINT.</span>
          <h2>
            Enough context.
            <br />
            Room for privacy.
          </h2>
          <p>
            No live map. No quiet tracking. Teens choose when to check in, and
            families agree on what’s helpful to share.
          </p>
          <Link href="/safety" className="text-link">
            Our approach to trust <Icon name="arrow" />
          </Link>
        </div>
        <div className="trust-list">
          {[
            ["pin", "Check-ins they send"],
            ["key", "Expectations you agree on"],
            ["heart", "Support that leaves space"],
          ].map(([i, t]) => (
            <div key={i}>
              <Icon name={i} />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>
      <FinalCTA />
    </MarketingShell>
  );
}
