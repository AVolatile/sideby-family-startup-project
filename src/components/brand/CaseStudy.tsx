import Image from "next/image";
import { PhonePreview } from "@/components/marketing/PhonePreview";
import { Logo, Symbol, BrandPath } from "./Logo";
import { ButtonLink, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
export function CaseStudy() {
  return (
    <>
      <section className="case-hero section-wrap">
        <div className="studio-index">
          <span className="eyebrow">ANTHONY VOLATILE / VOLATILE SOLUTIONS</span>
          <span>SELF-INITIATED CONCEPT · 2026</span>
        </div>
        <h1>Sideby.</h1>
        <p className="case-subtitle">
          Family coordination.
          <br />
          Growing independence.
          <br />
          One coherent consumer brand.
        </p>
        <div className="case-disciplines">
          {[
            "Brand strategy",
            "Product design",
            "Consumer UX",
            "Frontend development",
            "Campaign creative",
            "Lifecycle design",
          ].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </section>
      <section className="case-cover bg-coral">
        <div className="case-cover-copy">
          <Logo />
          <h2>
            Room to grow.
            <br />A plan to go.
          </h2>
          <span>A LITTLE STRUCTURE. A LOT OF ROOM.</span>
        </div>
        <div className="case-cover-phones">
          <PhonePreview persona="parent" />
          <PhonePreview persona="teen" screen="permissions" />
        </div>
        <BrandPath />
      </section>
      <section className="case-overview section-wrap">
        <div className="section-number">01 / OVERVIEW</div>
        <div>
          <h2>
            A family product with
            <br />
            two equal perspectives.
          </h2>
          <p>
            Sideby is a fictional consumer startup for families navigating the
            transition into teenage independence. It brings schedules,
            transportation, responsibilities, check-ins, and shared agreements
            into a role-aware product.
          </p>
          <p>
            The scope extends beyond the interface: an original identity,
            marketing site, mobile product, campaign system, lifecycle creative,
            and an exportable brand kit demonstrate how one consumer idea can
            live across touchpoints.
          </p>
          <div className="case-facts">
            <div>
              <span>Role</span>
              <strong>Strategy, design & implementation</strong>
            </div>
            <div>
              <span>Audience</span>
              <strong>Parents, caregivers & teens</strong>
            </div>
            <div>
              <span>Deliverable</span>
              <strong>Working frontend + brand ecosystem</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>Independent portfolio concept</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="case-problem bg-plum">
        <div className="section-wrap">
          <span className="eyebrow">02 / THE PROBLEM & OPPORTUNITY</span>
          <h2>
            The details are small.
            <br />
            Holding all of them isn’t.
          </h2>
          <div className="case-problem-grid">
            <p>
              Family logistics scatter across texts, school calendars, sports
              apps, sticky notes, and memory. The same questions get repeated,
              and responsibility for remembering often lands on one person.
            </p>
            <p>
              The opportunity is to help teens take ownership while making the
              shared plan easier to understand. More organization alone isn’t
              enough; the product needs to change who can act, not just who can
              see.
            </p>
          </div>
          <div className="case-fragments">
            {[
              "“Who’s driving?”",
              "“Can I go?”",
              "“Practice moved.”",
              "“I’m here.”",
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="case-strategy section-wrap">
        <SectionHeading
          eyebrow="03 / PRODUCT STRATEGY"
          title="Trust is a design decision."
        >
          The strongest product constraint was also the clearest differentiator:
          useful family context without constant surveillance.
        </SectionHeading>
        <div className="case-strategy-grid">
          {[
            [
              "01",
              "Shared context",
              "A timeline, assigned rides, and clear responsibilities give logistics a home. Each detail has a practical purpose.",
            ],
            [
              "02",
              "Teen ownership",
              "Personal schedules and goals, voluntary check-ins, and requests with context give teens controls of their own.",
            ],
            [
              "03",
              "Visible agreements",
              "Permission responses include shared expectations. Independence milestones can be revisited by either side.",
            ],
          ].map(([n, t, b]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{b}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="case-brand section-wrap">
        <div>
          <span className="eyebrow">04 / BRAND STRATEGY</span>
          <h2>
            Close enough to support.
            <br />
            Space to move.
          </h2>
          <p>
            The name Sideby compresses “side by side” into a warm, contemporary
            wordmark. A paired-path symbol makes support and separate direction
            visible without relying on a house, heart, or location pin.
          </p>
          <p>
            Paper and aubergine create a calm product foundation. Vermilion,
            lilac, butter, and sky give campaign work an expressive range.
            Manrope’s rounded geometry creates a bold voice; DM Sans keeps the
            details clear.
          </p>
          <ButtonLink href="/brand" secondary>
            Explore the identity
          </ButtonLink>
        </div>
        <div className="case-brand-board">
          <div className="bg-lilac">
            <Symbol />
          </div>
          <div className="bg-coral">
            <Logo />
          </div>
          <div className="bg-butter">
            <span>
              Room
              <br />
              to grow.
            </span>
          </div>
          <div className="bg-plum">
            <span>
              A plan
              <br />
              to go.
            </span>
          </div>
        </div>
      </section>
      <section className="case-role-section bg-lilac">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="05 / PARENT & TEEN EXPERIENCES"
            title="A shared family. A different center of gravity."
          />
          <div className="case-role-grid">
            <article>
              <PhonePreview persona="parent" />
              <h3>Parent: know where to help.</h3>
              <p>
                The household timeline prioritizes handoffs, open ride requests,
                and plans to discuss. Parents can assign drivers, review
                permissions, acknowledge contributions, and coordinate
                responsibilities.
              </p>
            </article>
            <article>
              <PhonePreview persona="teen" />
              <h3>Teen: own the next step.</h3>
              <p>
                The teen view centers personal plans and responsibilities. Teens
                send their own check-ins, request rides and permissions, track
                their chosen goals, and revisit shared independence agreements.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="case-product section-wrap">
        <SectionHeading
          eyebrow="06 / THE PRODUCT"
          title="Every screen has a real family moment."
        >
          A central Today experience connects the modules. Shared local state
          makes requests, decisions, completed tasks, and notifications travel
          through the demo.
        </SectionHeading>
        <div className="case-module-grid">
          {[
            [
              "sun",
              "Today",
              "The family timeline, dinner note, next ride, voluntary status updates, and due responsibilities.",
            ],
            [
              "calendar",
              "Calendar",
              "Day, week, and month views; person filters; event details; categories; repeat labels; event creation.",
            ],
            [
              "ride",
              "Rides",
              "A pickup place, destination, time, and driver. Parents claim or assign a ride and finish the handoff.",
            ],
            [
              "pin",
              "Check-ins",
              "Six useful messages, optional context, a visible recipient explanation, and an undo for the last update.",
            ],
            [
              "key",
              "Permissions",
              "A request with context, parent review, shared conditions, discussion, or a respectful decline.",
            ],
            [
              "check",
              "Responsibilities",
              "Household, school, personal, pet care, and errands; completion, acknowledgment, and consistency context.",
            ],
            [
              "flag",
              "Goals",
              "Chosen goals with steps, progress, target dates, and a supporter. Completion updates the progress immediately.",
            ],
            [
              "path",
              "Milestones",
              "Independence as shared agreements rather than scores. Either perspective can revisit the plan.",
            ],
            [
              "message",
              "Family context",
              "Lightweight updates and acknowledgment, sample important information, readable notifications, and fictional profiles.",
            ],
          ].map(([i, t, b]) => (
            <article key={t}>
              <Icon name={i} />
              <h3>{t}</h3>
              <p>{b}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="case-mobile section-wrap">
        <div>
          <span className="eyebrow">07 / MOBILE UX & ACCESSIBILITY</span>
          <h2>
            A product that belongs
            <br />
            in the day.
          </h2>
          <p>
            The web app is designed for narrow screens first, with a five-item
            bottom navigation and a More panel for secondary modules. Desktop
            gets a sidebar, wider calendar, and split Today layout.
          </p>
          <p>
            Native dialogs contain focus and restore it on close. Forms use
            clear labels and field errors. Person names accompany color, status
            messages are announced, and reduced-motion preferences remove
            decorative transitions.
          </p>
          <div className="case-size-list">
            {["320", "375", "390", "430", "768", "1024", "1280", "1440"].map(
              (s) => (
                <span key={s}>{s} px</span>
              ),
            )}
          </div>
          <span className="asset-note">
            The validation report documents the measured responsive and
            accessibility results.
          </span>
        </div>
        <Image
          src="/images/after-practice.webp"
          width={700}
          height={650}
          alt="An everyday conversation after basketball practice, the brand’s photography direction."
        />
      </section>
      <section className="case-privacy bg-butter">
        <div className="section-wrap">
          <Icon name="shield" size={42} />
          <h2>
            Respect is built into
            <br />
            the interaction.
          </h2>
          <p>
            Check-ins explain what is shared and who sees it. No GPS API,
            background tracking, or analytics is used. The demo holds fictional
            data in memory, makes no real accounts, sends no messages, and does
            not store real medical information.
          </p>
          <p>
            The product makes no guarantees about safety, emergency response,
            certifications, customer outcomes, or legal compliance. A production
            version would need real authorization, consent, privacy engineering,
            and user research.
          </p>
        </div>
      </section>
      <section className="case-campaign section-wrap">
        <SectionHeading
          eyebrow="08 / CAMPAIGN & LIFECYCLE"
          title="One idea, across a whole launch."
        >
          The identity doesn’t stop at the app. Familiar family messages become
          acquisition hooks, app discovery stories, and useful lifecycle
          moments.
        </SectionHeading>
        <div className="case-campaign-wall">
          <div className="bg-coral">
            <Logo />
            <h3>
              Out the door.
              <br />
              On the same page.
            </h3>
          </div>
          <div className="bg-lilac">
            <Logo />
            <h3>
              Your plans.
              <br />
              Your move.
            </h3>
          </div>
          <div className="bg-butter">
            <Logo />
            <h3>“I’m here.”</h3>
            <p>A little update. A lot less back-and-forth.</p>
          </div>
        </div>
        <div className="case-campaign-detail">
          <div>
            <h3>Acquisition with a point of view.</h3>
            <p>
              Eight campaign concepts in square, portrait, and story formats;
              four posters; six app discovery creatives; and four display sizes.
              Editable assets make the system reusable.
            </p>
          </div>
          <div>
            <h3>Useful after the first click.</h3>
            <p>
              Five HTML lifecycle emails cover welcome, teen invitation, the
              weekly snapshot, a permission request, and tomorrow’s schedule.
              Notification copy stays concise and contextual.
            </p>
          </div>
        </div>
        <ButtonLink href="/campaign" secondary>
          See the campaign system
        </ButtonLink>
      </section>
      <section className="case-build section-wrap">
        <SectionHeading
          eyebrow="09 / DESIGN SYSTEM & BUILD"
          title="A coherent system, not a stack of mockups."
        />
        <div className="case-build-grid">
          <div>
            <h3>The implementation</h3>
            <p>
              Next.js 15, React 19, and TypeScript with a static export. CSS
              tokens drive color, spacing, radius, type, and motion. Locally
              hosted fonts and optimized WebP imagery avoid third-party runtime
              requests.
            </p>
            <p>
              A single React context holds the demo state. Typed models
              centralize members, events, responsibilities, rides, requests,
              check-ins, goals, updates, milestones, and notifications.
            </p>
          </div>
          <div>
            <h3>The reusable pieces</h3>
            <p>
              MarketingShell, AppShell, Logo, Icon, PhonePreview, Avatar,
              MemberFilter, Modal, PlanForm, Badge, EmptyState, shared buttons,
              and module-specific cards keep responsibilities separated.
            </p>
            <p>
              Public and product routes are statically generated. A campaign
              asset generator produces editable SVGs and responsive HTML emails.
              Automated browser QA checks routes, flows, layout, keyboard
              behavior, and accessibility.
            </p>
          </div>
        </div>
        <div className="case-learning">
          <h3>The key tradeoff</h3>
          <p>
            A static local demo makes the portfolio fast, portable, and safe to
            explore without real family data. It demonstrates the product
            behavior and design intent, while keeping authentication, messaging,
            and sensitive storage outside the concept’s scope.
          </p>
        </div>
      </section>
      <section className="case-next section-wrap">
        <span className="eyebrow">10 / WHAT SHOULD HAPPEN NEXT</span>
        <h2>
          Test the conversations,
          <br />
          not just the screens.
        </h2>
        <p>
          The next useful step is paired parent-and-teen research: does each
          person understand what’s shared, feel ownership of the plan, and know
          how to change an agreement? Those findings should shape any production
          build.
        </p>
        <div className="studio-hero-actions">
          <ButtonLink href="/app">Try the product</ButtonLink>
          <ButtonLink href="/brand" secondary>
            Explore the brand
          </ButtonLink>
          <a
            download
            href="/campaign/sideby-campaign-kit.zip"
            className="text-link"
          >
            Download campaign assets <Icon name="download" />
          </a>
        </div>
      </section>
      <aside className="concept-disclaimer section-wrap">
        <strong>Concept disclaimer</strong>
        <p>
          This is a self-initiated concept project created to demonstrate
          consumer brand strategy, family-tech product design, mobile UX,
          frontend development, campaign systems, and lifecycle creative.
        </p>
        <p>
          Sideby is fictional. Household data, pricing, product scenarios, and
          campaign placements are illustrative. No customers, funding, results,
          ratings, endorsements, or compliance certifications are claimed.
        </p>
      </aside>
    </>
  );
}
