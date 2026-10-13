import Image from "next/image";
import Link from "next/link";
import { Logo, Symbol, BrandPath } from "./Logo";
import { Icon, iconNames } from "@/components/ui/Icon";
import { ButtonLink, SectionHeading, Badge } from "@/components/ui/Primitives";
import { PhonePreview } from "@/components/marketing/PhonePreview";
const colors = [
  ["Paper", "#FAF7F0", "paper", "The canvas · calm by default"],
  ["Aubergine", "#422B48", "plum", "Anchors · type, actions, trust"],
  ["Vermilion", "#E75536", "coral", "Energy · campaign, movement"],
  ["Lilac", "#DED1F0", "lilac", "Possibility · teen expression"],
  ["Butter", "#F5DF91", "butter", "Warmth · shared moments"],
  ["Sky", "#C5DCE8", "sky", "Context · rides, agreements"],
];
export function BrandSystem() {
  return (
    <>
      <section className="studio-hero section-wrap">
        <div className="studio-index">
          <span className="eyebrow">SIDEBY / THE BRAND SYSTEM</span>
          <span>STRATEGY → IDENTITY → EVERYDAY</span>
        </div>
        <h1>
          On their side.
          <br />
          Alongside yours.
        </h1>
        <p>
          A consumer identity that gives growing independence a recognizable
          shape. Created by Anthony Volatile / Volatile Solutions.
        </p>
        <div className="studio-hero-actions">
          <ButtonLink href="/brand/sideby-brand-kit.zip" secondary>
            Download the brand kit
          </ButtonLink>
          <Link className="text-link" href="/case-study">
            Read the design thinking <Icon name="arrow" />
          </Link>
        </div>
        <div className="identity-board">
          <div className="identity-wordmark bg-coral">
            <Logo />
            <span>A LITTLE STRUCTURE. A LOT OF ROOM.</span>
          </div>
          <div className="identity-symbol bg-lilac">
            <Symbol />
            <span>THE PAIRED PATH</span>
          </div>
          <div className="identity-icon bg-paper">
            <div className="app-icon bg-plum">
              <Symbol />
            </div>
            <span>SIDEBY / APP ICON</span>
          </div>
        </div>
      </section>
      <section className="brand-strategy section-wrap">
        <div className="section-number">01 / STRATEGY</div>
        <div>
          <h2>
            Room to grow.
            <br />A plan to go.
          </h2>
          <p>
            Sideby helps families coordinate the everyday while teens take more
            ownership of their lives. The name puts “side by side” in motion:
            close enough to support, with space to move separately.
          </p>
          <div className="strategy-pillars">
            {[
              [
                "Useful context",
                "Make the handoff clear. Let the rest breathe.",
              ],
              ["Mutual trust", "Expectations are shared conversations."],
              ["Growing room", "Support changes as people change."],
            ].map(([t, b]) => (
              <div key={t}>
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="brand-logo-section section-wrap">
        <SectionHeading
          eyebrow="02 / IDENTITY"
          title="Two paths. Room between them."
        >
          The symbol pairs two rounded paths moving in different directions. The
          shared rhythm makes a family; the open center leaves space for each
          person.
        </SectionHeading>
        <div className="logo-specimen">
          <div className="symbol-construction">
            <svg
              viewBox="0 0 200 200"
              aria-label="Paired path construction on a grid"
            >
              <defs>
                <pattern
                  id="grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M20 0H0V20"
                    fill="none"
                    stroke="#30233120"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#grid)" />
              <g transform="translate(35,35) scale(2.7)">
                <path
                  d="M11 9v17c0 8 5 13 13 13M37 39V22c0-8-5-13-13-13"
                  fill="none"
                  stroke="#422b48"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </g>
            </svg>
            <span>Rounded ends · balanced stroke · open center</span>
          </div>
          <div className="wordmark-spec">
            <Logo />
            <p>
              Lowercase, closely spaced, and approachable. The vermilion period
              gives the wordmark a confident stopping point.
            </p>
            <div className="logo-usage">
              <span>Clear space ≥ symbol stroke</span>
              <span>Minimum symbol: 24 px</span>
              <span>Minimum wordmark: 96 px</span>
            </div>
          </div>
        </div>
      </section>
      <section className="color-system section-wrap">
        <SectionHeading
          eyebrow="03 / COLOR"
          title="Warmth with a point of view."
        >
          A restrained foundation with expressive accents. Aubergine anchors the
          UI; vermilion gives the brand its voice.
        </SectionHeading>
        <div className="swatch-grid">
          {colors.map(([name, hex, color, note]) => (
            <article key={name}>
              <div className={`swatch bg-${color}`}>
                <span>{hex}</span>
                <Icon name="spark" size={33} />
              </div>
              <h3>{name}</h3>
              <p>{note}</p>
            </article>
          ))}
        </div>
        <div className="contrast-rules">
          <Icon name="eye" />
          <p>
            <strong>Color is never the only cue.</strong> Pair member colors
            with names and initials. Use aubergine on paper, lilac, butter, and
            sky. Use deep ink #241927 on vermilion. White text belongs on
            aubergine; small action text uses darker vermilion #A7331D.
          </p>
        </div>
      </section>
      <section className="type-section bg-plum">
        <div className="section-wrap">
          <div className="type-header">
            <div>
              <span className="eyebrow">04 / TYPOGRAPHY</span>
              <h2>
                Human in the headline.
                <br />
                Clear in the details.
              </h2>
            </div>
            <div>
              <span>DISPLAY / MANROPE 800</span>
              <span>INTERFACE / DM SANS 400 & 600</span>
            </div>
          </div>
          <div className="type-specimen">
            <span>Aa</span>
            <div>
              <h3>Room to grow.</h3>
              <p>Tuesday has a plan. You have a part.</p>
              <small>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz · 0123456789
              </small>
            </div>
          </div>
          <div className="type-scale">
            {[
              ["Display", "80 / 84", "A plan to go."],
              ["Heading", "52 / 58", "Your next chapter."],
              ["Section", "32 / 38", "The week, together."],
              ["Body", "16 / 26", "Keep the useful details close."],
              ["Label", "11 / 18", "SHARED BY CHOICE."],
            ].map(([n, s, t]) => (
              <div key={n}>
                <span>
                  {n}
                  <small>{s} px</small>
                </span>
                <p className={`type-${n.toLowerCase()}`}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="icon-system section-wrap">
        <SectionHeading
          eyebrow="05 / ICONOGRAPHY"
          title="One stroke. Plenty of meaning."
        >
          Ten core categories, drawn on a 24 px grid with 1.65 px strokes and
          rounded joins. Quiet enough for product, strong enough for a campaign.
        </SectionHeading>
        <div className="icon-gallery">
          {iconNames.map((name, i) => (
            <div key={name}>
              <Icon name={name} size={34} />
              <span>
                {
                  [
                    "Calendar",
                    "Ride",
                    "Check-in",
                    "Goal",
                    "Permission",
                    "Responsibility",
                    "Family",
                    "Update",
                    "Trust",
                    "Milestone",
                  ][i]
                }
              </span>
            </div>
          ))}
        </div>
        <a href="/brand/sideby-icons.svg" className="text-link" download>
          Download the icon sheet <Icon name="download" size={18} />
        </a>
      </section>
      <section className="art-direction section-wrap">
        <SectionHeading
          eyebrow="06 / ART DIRECTION"
          title="Real moments. A shared rhythm."
        />
        <div className="art-direction-grid">
          <article>
            <div className="illustration-specimen bg-butter">
              <BrandPath />
              <span className="illustration-person person-one" />
              <span className="illustration-person person-two" />
              <span className="illustration-person person-three" />
              <span className="illustration-note">
                <Icon name="calendar" />A shared plan.
              </span>
            </div>
            <h3>Paths, people, possibility.</h3>
            <p>
              The paired-path motif expands into rounded routes, modular people,
              and paper-like notes. Flat color, generous space, and a little
              intentional asymmetry.
            </p>
            <a
              href="/brand/coordination-illustration.svg"
              className="text-link"
              download
            >
              Download the illustration <Icon name="download" size={18} />
            </a>
          </article>
          <article>
            <Image
              src="/images/after-practice.webp"
              alt="Original generated editorial image of a teen and her dad after practice."
              width={900}
              height={600}
            />
            <h3>Between the big moments.</h3>
            <p>
              Candid, naturally lit, and slightly textured. Shoot the walk after
              practice, the bus-stop goodbye, the kitchen handoff. People doing
              life, with no performance for the camera.
            </p>
            <span className="asset-note">
              Original AI-generated concept photography · fictional people
            </span>
          </article>
        </div>
      </section>
      <section className="brand-ui section-wrap">
        <SectionHeading
          eyebrow="07 / THE BRAND IN PRODUCT"
          title="Expressive outside. Useful inside."
        >
          Shared tokens keep a campaign and a permission request recognizably
          Sideby. Product surfaces stay calm; brand color marks a useful moment.
        </SectionHeading>
        <div className="ui-specimen-grid">
          <div className="ui-primitives">
            <span className="eyebrow">ACTIONS & FEEDBACK</span>
            <div className="ui-button-row">
              <ButtonLink href="/app">Primary action</ButtonLink>
              <ButtonLink href="/app" secondary>
                Secondary
              </ButtonLink>
            </div>
            <div className="brand-field-example">
              <span>Pickup place</span>
              <div>
                Westfield gym · south entrance <Icon name="pin" size={18} />
              </div>
              <small>A clear place makes the handoff easier.</small>
            </div>
            <div className="ui-badge-row">
              <Badge tone="positive">Ride confirmed</Badge>
              <Badge tone="warm">Let’s review</Badge>
              <Badge>Shared by Ellie</Badge>
            </div>
            <div className="brand-notification">
              <span className="quick-icon bg-lilac">
                <Icon name="ride" />
              </span>
              <div>
                <strong>Pickup changed. Dan’s driving.</strong>
                <small>5:30 pm · south entrance</small>
              </div>
              <Icon name="check" size={17} />
            </div>
            <div className="token-table">
              <div>
                <span>Spacing</span>
                <code>4 / 8 / 12 / 16 / 24 / 32 / 48 / 64</code>
              </div>
              <div>
                <span>Radius</span>
                <code>10 px / 20 px / 32 px</code>
              </div>
              <div>
                <span>Touch target</span>
                <code>44 px minimum · 48 px primary</code>
              </div>
              <div>
                <span>Motion</span>
                <code>180–300 ms · ease · reduced-motion aware</code>
              </div>
            </div>
          </div>
          <div className="role-expression bg-lilac">
            <span className="eyebrow">TEEN / OWNERSHIP FIRST</span>
            <PhonePreview persona="teen" screen="goals" />
          </div>
        </div>
        <div className="role-guidelines">
          <article>
            <h3>Parent: a clear shared picture.</h3>
            <p>
              Paper surfaces, readable handoffs, household scope. Review,
              assign, support, acknowledge.
            </p>
          </article>
          <article>
            <h3>Teen: a space of their own.</h3>
            <p>
              Personal schedule, chosen goals, voluntary updates. Request, plan,
              check in, take the next step.
            </p>
          </article>
          <article>
            <h3>Motion: show what changed.</h3>
            <p>
              A quiet completion, a progress shift, a brief status message. No
              bouncing rewards or attention-grabbing loops.
            </p>
          </article>
        </div>
      </section>
      <section className="brand-voice bg-butter">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="08 / VERBAL IDENTITY"
            title="Clear. Warm. Room for a response."
          >
            Lead with the useful detail. Respect the person reading it. A little
            personality goes further than a parenting cliché.
          </SectionHeading>
          <div className="voice-grid">
            {[
              [
                "Parent",
                "“See what’s happening. Know where to help.”",
                "Context without hovering.",
              ],
              [
                "Teen",
                "“Your plans. Your move.”",
                "Ownership without fake slang.",
              ],
              [
                "Notification",
                "“A ride home. Already sorted.”",
                "Human language with a next step.",
              ],
              [
                "Permission",
                "“Ask. Talk. Make a plan.”",
                "A conversation, not a command.",
              ],
            ].map(([label, copy, note]) => (
              <article key={label}>
                <span className="eyebrow">{label}</span>
                <h3>{copy}</h3>
                <p>{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="brand-standards section-wrap">
        <SectionHeading
          eyebrow="09 / QUALITY RULES"
          title="The details earn the trust."
        />
        <div className="standards-grid">
          <article>
            <Icon name="eye" />
            <h3>Readable by design.</h3>
            <p>
              WCAG AA contrast targets, visible focus, semantic headings, clear
              labels, and status conveyed with words as well as color.
            </p>
          </article>
          <article>
            <Icon name="shield" />
            <h3>Shared by choice.</h3>
            <p>
              No covert location collection. Explain who sees an update before
              it’s shared. Keep sensitive real data out of the demo.
            </p>
          </article>
          <article>
            <Icon name="path" />
            <h3>Room to adapt.</h3>
            <p>
              Layout at 320 px and up. Reduced motion. Keyboard-operable
              controls. Native dialogs that contain focus and return it when
              closed.
            </p>
          </article>
        </div>
        <div className="studio-next">
          <h3>See the system out in the world.</h3>
          <ButtonLink href="/campaign">Open the campaign studio</ButtonLink>
        </div>
      </section>
    </>
  );
}
