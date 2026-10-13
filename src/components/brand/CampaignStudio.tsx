"use client";
import { useState } from "react";
import Image from "next/image";
import { campaigns, emails } from "@/data/content";
import { Logo, BrandPath } from "./Logo";
import { PhonePreview } from "@/components/marketing/PhonePreview";
import { ButtonLink, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
const ooh = [
  ["“Who’s picking\nme up?”", "A ride home. Already sorted.", "lilac"],
  ["“Can I stay\nuntil 10:30?”", "Ask. Talk. Make a plan.", "butter"],
  ["“I’m here.”", "A little update. A lot less back-and-forth.", "coral"],
  ["“Practice\nmoved.”", "The plan changed. Everyone knows.", "sky"],
];
export function CampaignStudio() {
  const [format, setFormat] = useState("square");
  const [email, setEmail] = useState("welcome");
  const [audience, setAudience] = useState("all");
  const filtered = campaigns.filter(
    (c) =>
      audience === "all" ||
      (audience === "teen"
        ? ["02", "05", "08"].includes(c.id)
        : ["01", "03", "04", "06", "07"].includes(c.id)),
  );
  return (
    <>
      <section className="studio-hero section-wrap">
        <div className="studio-index">
          <span className="eyebrow">SIDEBY / CAMPAIGN STUDIO</span>
          <span>FROM FIRST IMPRESSION TO DAILY RHYTHM</span>
        </div>
        <h1>
          Everyday words.
          <br />A bigger conversation.
        </h1>
        <p>
          A launch system for both sides of growing up. Eight campaign concepts
          carried through social, out-of-home, app discovery, display, and
          lifecycle.
        </p>
        <ButtonLink href="/campaign/sideby-campaign-kit.zip" secondary>
          Download the campaign kit
        </ButtonLink>
        <div className="campaign-launch-board bg-coral">
          <Logo />
          <h2>
            Out the door.
            <br />
            On the same page.
          </h2>
          <BrandPath />
          <div className="launch-board-note">
            <Icon name="ride" />
            <span>
              <strong>A ride home. Already sorted.</strong>
              <small>5:30 pm · Dan’s driving</small>
            </span>
            <Icon name="check" />
          </div>
          <span className="launch-board-footer">
            ROOM TO GROW. A PLAN TO GO.
          </span>
        </div>
      </section>
      <nav
        className="studio-jump-nav section-wrap"
        aria-label="Campaign sections"
      >
        {[
          ["Social", "social"],
          ["Posters & OOH", "ooh"],
          ["App discovery", "app-store"],
          ["Display", "display"],
          ["Lifecycle", "lifecycle"],
          ["Notifications", "push"],
        ].map(([l, h]) => (
          <a key={h} href={`#${h}`}>
            {l}
            <Icon name="arrow" size={14} />
          </a>
        ))}
      </nav>
      <section className="social-section section-wrap" id="social">
        <SectionHeading
          eyebrow="01 / PAID SOCIAL"
          title="Eight ideas. One unmistakable voice."
        >
          Each concept answers a different family moment. Flexible compositions
          preserve hierarchy across square, portrait, and story formats.
        </SectionHeading>
        <div className="campaign-controls">
          <div className="segmented" aria-label="Audience filter">
            {[
              ["all", "All audiences"],
              ["parent", "Parents"],
              ["teen", "Teens"],
            ].map(([v, l]) => (
              <button
                key={v}
                aria-pressed={audience === v}
                onClick={() => setAudience(v)}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="format-select">
            <label htmlFor="campaign-format">Format</label>
            <select
              id="campaign-format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="square">1080 × 1080 · square</option>
              <option value="portrait">1080 × 1350 · portrait</option>
              <option value="story">1080 × 1920 · story</option>
            </select>
          </div>
        </div>
        <div className={`social-gallery social-${format}`}>
          {filtered.map((c) => (
            <article key={c.id}>
              <div className={`social-creative bg-${c.color}`}>
                <Logo light={c.color === "plum"} />
                <span className="eyebrow">{c.audience}</span>
                <h3>
                  {c.title.split("\n").map((t, i) => (
                    <span key={i}>
                      {t}
                      <br />
                    </span>
                  ))}
                </h3>
                <div className="social-ui">
                  <Icon
                    name={
                      c.ui === "rides"
                        ? "ride"
                        : c.ui === "permissions"
                          ? "key"
                          : c.ui === "goals" || c.ui === "milestones"
                            ? "path"
                            : c.ui === "check-ins"
                              ? "pin"
                              : c.ui === "calendar"
                                ? "calendar"
                                : "check"
                    }
                    size={28}
                  />
                  <span>
                    <strong>
                      {
                        [
                          "Today has a plan.",
                          "My first solo drive.",
                          "Ellie’s at practice.",
                          "Dan’s driving.",
                          "Friday movie night.",
                          "Kitchen? Taken care of.",
                          "The week, together.",
                          "A next step of my own.",
                        ][Number(c.id) - 1]
                      }
                    </strong>
                    <small>ROOM TO GROW. A PLAN TO GO.</small>
                  </span>
                  <Icon name="check" size={17} />
                </div>
                <span className="social-footer">
                  A LITTLE STRUCTURE. A LOT OF ROOM.
                </span>
              </div>
              <div className="creative-caption">
                <span>
                  {c.id} / {c.note}
                </span>
                <a
                  href={`/campaign/social-${c.id}-${format}.svg`}
                  download
                  aria-label={`Download ${c.audience} ${format} artwork`}
                >
                  <Icon name="download" size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="ooh-section bg-plum" id="ooh">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="02 / POSTERS & OUT-OF-HOME"
            title="The messages you already know."
          >
            Turn a familiar family text into a bold public statement. One hook,
            one useful answer, and room for the brand.
          </SectionHeading>
          <div className="poster-wall">
            {ooh.map(([title, copy, color], i) => (
              <article className={`poster bg-${color}`} key={title}>
                <Logo />
                <span className="eyebrow">
                  EVERY FAMILY HAS THIS CONVERSATION.
                </span>
                <h3>
                  {title.split("\n").map((t, j) => (
                    <span key={j}>
                      {t}
                      <br />
                    </span>
                  ))}
                </h3>
                <div className="poster-copy">
                  <Icon
                    name={["ride", "key", "pin", "calendar"][i]}
                    size={29}
                  />
                  <p>{copy}</p>
                </div>
                <span className="poster-footer">
                  ROOM TO GROW. A PLAN TO GO.
                </span>
                <a
                  href={`/campaign/poster-${i + 1}.svg`}
                  className="poster-download"
                  download
                  aria-label={`Download poster ${i + 1}`}
                >
                  <Icon name="download" size={18} />
                </a>
              </article>
            ))}
          </div>
          <div className="billboard-scene">
            <div className="billboard bg-butter">
              <div>
                <Logo />
                <h3>
                  Four people.
                  <br />
                  One Tuesday.
                </h3>
                <p>The everyday, with a little less back-and-forth.</p>
              </div>
              <BrandPath />
              <span>
                ROOM TO GROW.
                <br />A PLAN TO GO.
              </span>
            </div>
            <span className="scene-caption">
              ILLUSTRATIVE OOH PLACEMENT · FICTIONAL CAMPAIGN
            </span>
          </div>
        </div>
      </section>
      <section className="appstore-section section-wrap" id="app-store">
        <SectionHeading
          eyebrow="03 / APP DISCOVERY"
          title="The first scroll should tell the story."
        >
          Six screenshot concepts, framed with useful benefits and actual
          product language. No invented ratings or store rankings.
        </SectionHeading>
        <div className="appstore-gallery">
          {[
            ["today", "A plan for\nthe whole day.", "coral"],
            ["check-ins", "A little update.\nYour choice.", "lilac"],
            ["rides", "Your way home.\nAlready sorted.", "butter"],
            ["responsibilities", "A place for\n“I’ve got it.”", "sky"],
            ["permissions", "Ask. Talk.\nMake a plan.", "lilac"],
            ["goals", "Your next\nchapter.", "butter"],
          ].map(([screen, title, color], i) => (
            <article className={`appstore-creative bg-${color}`} key={screen}>
              <Logo />
              <h3>
                {title.split("\n").map((t, j) => (
                  <span key={j}>
                    {t}
                    <br />
                  </span>
                ))}
              </h3>
              <PhonePreview screen={screen} />
              <a
                href={`/campaign/app-store-${i + 1}.svg`}
                download
                className="appstore-download"
                aria-label={`Download ${screen} app discovery artwork`}
              >
                <Icon name="download" size={16} />
              </a>
            </article>
          ))}
        </div>
        <p className="asset-note">
          1290 × 2796 editable artwork · fictional store campaign · responsive
          web product
        </p>
      </section>
      <section className="display-section section-wrap" id="display">
        <SectionHeading
          eyebrow="04 / DISPLAY"
          title="A strong idea fits the space."
        >
          The same message adapts to four common placements. Type, paired paths,
          and one useful action—without a miniature webpage.
        </SectionHeading>
        <div className="display-gallery">
          <div className="display-wide">
            <Image
              src="/campaign/display-970x250.svg"
              width={970}
              height={250}
              alt="970 by 250 display ad: Out the door. On the same page."
            />
            <Image
              src="/campaign/display-728x90.svg"
              width={728}
              height={90}
              alt="728 by 90 display ad: A ride home. Already sorted."
            />
          </div>
          <div className="display-square">
            <Image
              src="/campaign/display-300x250.svg"
              width={300}
              height={250}
              alt="300 by 250 display ad: More I’ve got it. Less reminding."
            />
          </div>
          <div className="display-skyscraper">
            <Image
              src="/campaign/display-160x600.svg"
              width={160}
              height={600}
              alt="160 by 600 display ad: Your plans. Your move."
            />
          </div>
        </div>
        <div className="display-downloads">
          {["300x250", "728x90", "160x600", "970x250"].map((s) => (
            <a key={s} href={`/campaign/display-${s}.svg`} download>
              {s.replace("x", " × ")} <Icon name="download" size={16} />
            </a>
          ))}
        </div>
      </section>
      <section className="lifecycle-section bg-lilac" id="lifecycle">
        <div className="section-wrap">
          <SectionHeading
            eyebrow="05 / EMAIL & LIFECYCLE"
            title="Useful from the first hello."
          >
            Five responsive HTML emails help a family start, share, and keep the
            next plan clear. These are previews; nothing is sent.
          </SectionHeading>
          <div className="email-preview-layout">
            <div className="email-selector">
              {emails.map((e, i) => (
                <button
                  key={e.slug}
                  aria-pressed={email === e.slug}
                  onClick={() => setEmail(e.slug)}
                >
                  <span>0{i + 1}</span>
                  <div>
                    <strong>{e.eyebrow}</strong>
                    <small>{e.subject}</small>
                  </div>
                  <Icon name="arrow" size={17} />
                </button>
              ))}
              <a href={`/emails/${email}.html`} download className="text-link">
                Download this HTML email <Icon name="download" size={18} />
              </a>
              <p className="asset-note">
                600 px email body · inline styles · table layout · system fonts
                · readable on mobile
              </p>
            </div>
            <div className="email-frame">
              <div className="email-chrome">
                <span />
                <span />
                <span />
                <small>
                  Subject: {emails.find((e) => e.slug === email)?.subject}
                </small>
              </div>
              <iframe
                key={email}
                title={`${emails.find((e) => e.slug === email)?.eyebrow} email preview`}
                src={`/emails/${email}.html`}
                loading="lazy"
                sandbox=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="push-section section-wrap" id="push">
        <SectionHeading
          eyebrow="06 / NOTIFICATION VOICE"
          title="Say the useful thing. Then give them space."
        >
          A useful detail, a human sentence, and somewhere to go next. Group
          routine reminders; don’t create pressure to keep checking.
        </SectionHeading>
        <div className="push-gallery">
          {[
            [
              "pin",
              "Ellie’s at practice.",
              "“Coach says we’ll finish at 5:30.”",
            ],
            [
              "ride",
              "Pickup changed. Dan’s driving.",
              "5:30 pm · south entrance",
            ],
            [
              "key",
              "Friday movie night is approved.",
              "Home by 10:30. Your ride is arranged.",
            ],
            ["check", "Kitchen? Taken care of.", "Ellie completed the reset."],
            [
              "calendar",
              "Tomorrow has one open handoff.",
              "June Coffee · ride home at 7 pm",
            ],
            [
              "message",
              "Dinner’s at 6:30.",
              "Mara shared a note for everyone.",
            ],
          ].map(([icon, t, b]) => (
            <article className="push-preview" key={t}>
              <div>
                <span className="app-icon-small">
                  <Icon name={icon} size={15} />
                </span>
                <span>SIDEBY</span>
                <small>now</small>
              </div>
              <strong>{t}</strong>
              <p>{b}</p>
            </article>
          ))}
        </div>
        <div className="notification-guidelines">
          <div>
            <h3>Send with a reason.</h3>
            <p>
              Prioritize changed pickups, direct responses, and volunteered
              check-ins. Let families decide which routine updates they want.
            </p>
          </div>
          <div>
            <h3>Leave room to miss a ping.</h3>
            <p>
              No alarmist countdowns, guilt, streak pressure, or claims that a
              notification confirms safety. Keep details available in the shared
              plan.
            </p>
          </div>
        </div>
      </section>
      <div className="studio-next section-wrap">
        <h3>See how the whole system came together.</h3>
        <ButtonLink href="/case-study">Read the case study</ButtonLink>
      </div>
    </>
  );
}
