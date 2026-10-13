import Link from "next/link";
import Image from "next/image";
import { PhonePreview } from "./PhonePreview";
import { ButtonLink, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
import { BrandPath, Symbol } from "@/components/brand/Logo";
import { articles, productNav } from "@/data/content";
import { FinalCTA } from "./FinalCTA";
export function HowItWorks() {
  return (
    <>
      <section className="editorial-hero section-wrap">
        <span className="eyebrow">HOW SIDEBY WORKS</span>
        <h1>
          Start with your people.
          <br />
          Make room for the plan.
        </h1>
        <p>
          You don’t need to organize your whole life. Start with the next thing
          your family needs to sort.
        </p>
        <ButtonLink href="/signup">Try a shared start</ButtonLink>
      </section>
      <section className="how-steps section-wrap">
        {[
          {
            number: "01",
            title: "Bring everyone into the conversation.",
            body: "Choose what would actually help. A ride after practice? A place for school plans? A simpler check-in? Give both parents and teens a voice from the beginning.",
            icon: "family",
            color: "lilac",
          },
          {
            number: "02",
            title: "Put the everyday in its place.",
            body: "Add a school day, a work shift, or a family dinner. Sort the pickup and give each responsibility an owner. A plan is useful when everyone knows their part.",
            icon: "calendar",
            color: "butter",
          },
          {
            number: "03",
            title: "Hand over the next step.",
            body: "Let teens add their own plans, request rides, and choose their goals. Agree on expectations, try them out, then revisit what support still makes sense.",
            icon: "path",
            color: "coral",
          },
        ].map((s) => (
          <article className="how-step" key={s.number}>
            <div className={`how-step-art bg-${s.color}`}>
              <span>{s.number}</span>
              <Icon name={s.icon} size={90} />
            </div>
            <div>
              <span className="eyebrow">STEP {s.number}</span>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="wide-product-stage bg-lilac">
        <div>
          <span className="eyebrow">
            FROM “WHAT’S THE PLAN?” TO “I’VE GOT IT.”
          </span>
          <h2>
            Same household.
            <br />A part for everyone.
          </h2>
          <p>A role-aware demo lets you see both sides.</p>
          <ButtonLink href="/login">Explore the product</ButtonLink>
        </div>
        <div className="double-phones">
          <PhonePreview persona="parent" />
          <PhonePreview persona="teen" />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
export function AudiencePage({ teen = false }: { teen?: boolean }) {
  const features = teen
    ? [
        [
          "calendar",
          "Plans you can own.",
          "Keep school, work, practice, and the things you want to do in your own view.",
        ],
        [
          "ride",
          "Ask for what you need.",
          "Request a ride with the details already there. No guessing who’s picking you up.",
        ],
        [
          "key",
          "A request with a real plan.",
          "Say who, where, and when. Get a clear response—and space to talk.",
        ],
        [
          "flag",
          "What’s next is yours.",
          "Choose a goal, make the steps, and ask for useful support.",
        ],
      ]
    : [
        [
          "calendar",
          "The day, with the handoffs.",
          "See everyone’s shared plans and the gaps that still need a little help.",
        ],
        [
          "ride",
          "Fewer pickup mysteries.",
          "A place, a time, and a driver. Claim a ride so the family has the same plan.",
        ],
        [
          "pin",
          "Useful context, freely shared.",
          "Read the check-ins your teen chooses to send. Skip the constant location map.",
        ],
        [
          "path",
          "Support that can step back.",
          "Set expectations together, then revisit them as the familiar gets easier.",
        ],
      ];
  return (
    <>
      <section className={`audience-hero ${teen ? "bg-lilac" : "bg-butter"}`}>
        <div className="section-wrap audience-inner">
          <div>
            <span className="eyebrow">
              {teen
                ? "FOR TEENS · YOUR SIDE OF SIDEBY"
                : "FOR PARENTS · ENOUGH CONTEXT TO HELP"}
            </span>
            <h1>
              {teen ? (
                <>
                  Your plans.
                  <br />
                  Your move.
                </>
              ) : (
                <>
                  A little less
                  <br />
                  figuring it all out.
                </>
              )}
            </h1>
            <p>
              {teen
                ? "You know what you want to do. Sideby gives your plans a place, your requests some context, and your next step a little room."
                : "The schedule, the pickups, the “can I go?” conversations. Share the organizing so you can spend less time holding every detail."}
            </p>
            <ButtonLink href={teen ? "/login?role=teen" : "/login?role=parent"}>
              Try the {teen ? "teen" : "parent"} view
            </ButtonLink>
            <small className="demo-disclaimer">
              Fictional demo · no sign-in needed
            </small>
          </div>
          <div className="audience-phone-stage">
            <BrandPath />
            <PhonePreview persona={teen ? "teen" : "parent"} />
            <span className="stage-sticker">
              {teen ? "Let me take it from here." : "We’ve got a plan."}
            </span>
          </div>
        </div>
      </section>
      <section className="audience-features section-wrap">
        <SectionHeading
          eyebrow={
            teen
              ? "LESS REPEATING YOURSELF. MORE DOING YOUR THING."
              : "SHARED PLANS. SHARED RESPONSIBILITY."
          }
          title={
            teen
              ? "Useful, on your terms."
              : "A clearer picture of the everyday."
          }
        />
        <div className="audience-feature-grid">
          {features.map(([icon, title, body], i) => (
            <article key={icon}>
              <span className={`quick-icon bg-${i % 2 ? "lilac" : "butter"}`}>
                <Icon name={icon} />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="audience-statement bg-plum">
        <span className="eyebrow">
          {teen ? "YOUR SPACE MATTERS." : "TRUST NEEDS ROOM TO GROW."}
        </span>
        <h2>
          {teen ? (
            <>
              You’re a person.
              <br />
              Not a pin on a map.
            </>
          ) : (
            <>
              Be there for the next step.
              <br />
              Leave room for them to take it.
            </>
          )}
        </h2>
        <p>
          {teen
            ? "You decide when to send a check-in. No background location collection. Expectations should be a conversation you’re part of."
            : "An update can be helpful without becoming a watchful eye. Agree on the moments to share and the support that makes sense."}
        </p>
        <Link href="/safety" className="text-link">
          Our trust approach <Icon name="arrow" />
        </Link>
      </section>
      <section className="section-wrap audience-next">
        <div>
          <span className="eyebrow">TRY ONE REAL NEXT STEP</span>
          <h2>{teen ? "Ask. Plan. Go." : "Start with a better Tuesday."}</h2>
          <p>
            {teen
              ? "Open the demo as Ellie. Make a movie-night request, arrange a ride, or tick off the next step toward a solo drive."
              : "Open the demo as Mara. Review a request, claim Wednesday’s ride, or give a responsibility a clear owner."}
          </p>
          <ButtonLink href={teen ? "/login?role=teen" : "/login?role=parent"}>
            Step inside the demo
          </ButtonLink>
        </div>
        <PhonePreview
          persona={teen ? "teen" : "parent"}
          screen={teen ? "permissions" : "rides"}
        />
      </section>
    </>
  );
}
export function SafetyPage() {
  return (
    <>
      <section className="safety-hero section-wrap">
        <div className="safety-mark">
          <Symbol />
        </div>
        <span className="eyebrow">OUR APPROACH TO TRUST & PRIVACY</span>
        <h1>
          Enough context.
          <br />
          Room for privacy.
        </h1>
        <p>
          A shared plan should make family life clearer. It should also respect
          the person growing into their own life.
        </p>
      </section>
      <section className="trust-principles section-wrap">
        {[
          [
            "01",
            "Choose what to share.",
            "Check-ins are sent by the person checking in. This demo does not request GPS permission, read device location, or collect a background location history.",
            "pin",
          ],
          [
            "02",
            "Agree, then revisit.",
            "Families set expectations together. As familiar plans get easier, revisit which updates are useful. The agreement should be visible to the person it affects.",
            "key",
          ],
          [
            "03",
            "Make the handoffs clear.",
            "A pickup time, a driver, and a shared note can reduce confusion. Sideby is a coordination tool; it cannot guarantee arrival or personal safety.",
            "ride",
          ],
          [
            "04",
            "Keep important context handy.",
            "The demo shows fictional household contacts and sample instructions. There is no medical-record system, emergency-response service, or certified secure vault.",
            "shield",
          ],
        ].map(([n, t, b, i]) => (
          <article key={n}>
            <span className="principle-number">{n}</span>
            <div>
              <h2>{t}</h2>
              <p>{b}</p>
            </div>
            <Icon name={i} size={32} />
          </article>
        ))}
      </section>
      <section className="privacy-facts bg-lilac">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="WHAT THIS CONCEPT ACTUALLY DOES"
            title="Plain language. Clear boundaries."
          />
          <div className="privacy-facts-grid">
            <div>
              <h3>Stays in your browser</h3>
              <p>
                Demo changes live in React memory and reset on reload. No
                accounts are created, and no demo form entries are sent to a
                backend.
              </p>
            </div>
            <div>
              <h3>No hidden data collection</h3>
              <p>
                No analytics, ad trackers, location requests, or device sensors.
                Fonts and project imagery are hosted with the site.
              </p>
            </div>
            <div>
              <h3>A demo, clearly labeled</h3>
              <p>
                Every household member, contact, and plan is fictional. Pricing
                is a concept. No safety outcomes or legal certifications are
                claimed.
              </p>
            </div>
          </div>
          <p className="privacy-footnote">
            The hosting service receives ordinary page requests. A production
            product would require authentication, enforceable access controls,
            data retention design, consent flows, and a reviewed privacy policy.
          </p>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
export function FeaturesPage() {
  return (
    <>
      <section className="editorial-hero section-wrap">
        <span className="eyebrow">A PLACE FOR THE EVERYDAY</span>
        <h1>
          Small details.
          <br />A shared picture.
        </h1>
        <p>
          Each part of Sideby serves a real family moment. Explore the working
          frontend demo.
        </p>
      </section>
      <section className="feature-directory section-wrap">
        {productNav.map((n, i) => (
          <Link href={`/app/${n.slug}`} key={n.slug}>
            <span
              className={`quick-icon bg-${["lilac", "butter", "sky", "coral"][i % 4]}`}
            >
              <Icon name={n.icon} />
            </span>
            <div>
              <h2>{n.label}</h2>
              <p>
                {
                  [
                    "The day’s plans, responsibilities, and handoffs.",
                    "Day, week, and month views of everyone’s plans.",
                    "A place for household, school, and personal contributions.",
                    "Voluntary updates, shared by the person sending them.",
                    "Requests, pickup details, and a clear driver.",
                    "Personal ambitions, broken into useful steps.",
                    "Requests, agreements, and room for discussion.",
                    "Useful household notes with a simple acknowledgment.",
                    "Visible agreements that evolve with independence.",
                    "Fictional household contacts and sample instructions.",
                    "The useful updates, with read and unread states.",
                    "Meet the household and edit fictional profiles.",
                  ][i]
                }
              </p>
            </div>
            <Icon name="arrow" />
          </Link>
        ))}
      </section>
      <FinalCTA />
    </>
  );
}
export function ResourcesPage() {
  return (
    <>
      <section className="editorial-hero section-wrap">
        <span className="eyebrow">NOTES FOR THE EVERYDAY</span>
        <h1>
          A little perspective.
          <br />
          Something to try.
        </h1>
        <p>
          Practical ideas for shared plans, better conversations, and growing
          independence. Editorial content for the Sideby concept.
        </p>
      </section>
      <section className="resource-grid section-wrap">
        {articles.map((a, i) => (
          <Link
            key={a.slug}
            href={`/resources/${a.slug}`}
            className="resource-card"
          >
            <div className={`resource-art bg-${a.color}`}>
              <Icon name={["calendar", "message", "path"][i]} size={86} />
              <span>FIELD NOTES / 0{i + 1}</span>
            </div>
            <span className="eyebrow">
              {a.tag} · {a.read}
            </span>
            <h2>{a.title}</h2>
            <p>{a.description}</p>
            <span className="text-link">
              Read the note <Icon name="arrow" size={18} />
            </span>
          </Link>
        ))}
      </section>
      <FinalCTA />
    </>
  );
}
export function AboutPage() {
  return (
    <>
      <section className="editorial-hero section-wrap">
        <span className="eyebrow">WHY SIDEBY EXISTS</span>
        <h1>
          Growing up changes
          <br />
          the shape of a family.
        </h1>
        <p>
          The plans get bigger. The schedules get fuller. The support needs to
          change, too.
        </p>
      </section>
      <section className="about-photo section-wrap">
        <Image
          src="/images/after-practice.webp"
          width={1200}
          height={800}
          alt="An ordinary after-practice conversation between a teen and her dad."
        />
        <div>
          <span className="eyebrow">ROOM TO GROW. A PLAN TO GO.</span>
          <h2>
            On their side.
            <br />
            Alongside yours.
          </h2>
          <p>
            Sideby is a fictional consumer startup exploring a practical
            question: what if family coordination helped teenagers take more
            ownership, instead of making parents better at watching?
          </p>
          <p>
            The answer begins with shared context, chosen check-ins, and
            agreements that can change. Not every detail needs a notification.
            Not every plan needs supervision.
          </p>
          <p>
            Created by Anthony Volatile / Volatile Solutions as a self-initiated
            portfolio project spanning brand strategy, product design, frontend
            development, campaigns, and lifecycle creative.
          </p>
          <ButtonLink href="/case-study" secondary>
            Behind the concept
          </ButtonLink>
        </div>
      </section>
      <div className="about-principles section-wrap">
        {[
          [
            "Make context useful.",
            "Give each detail a purpose, an owner, and a clear next step.",
          ],
          [
            "Respect both perspectives.",
            "Parents need clarity. Teens need ownership. Design for both.",
          ],
          [
            "Let support evolve.",
            "A good agreement makes room for a different one next month.",
          ],
        ].map(([t, b]) => (
          <article key={t}>
            <Icon name="path" />
            <h3>{t}</h3>
            <p>{b}</p>
          </article>
        ))}
      </div>
      <FinalCTA />
    </>
  );
}
