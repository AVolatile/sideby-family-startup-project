# Sideby

**Room to grow. A plan to go.**

A self-initiated family coordination and teen independence concept by **Anthony Volatile / Volatile Solutions**. Sideby combines a complete consumer identity, marketing website, responsive product demo, campaign system, lifecycle creative, and portfolio case study.

Private hosted preview: https://sideby-anthony-volatile.lushshore129.chatgpt.site

## The idea

Family logistics are fragmented across group texts, school calendars, sports apps, sticky notes, and memory. Sideby gives the practical details a shared home while teenagers take ownership of more of their schedule, responsibilities, and plans.

The audience is parents, caregivers, and teenagers moving toward greater independence. The product prioritizes trust, voluntary communication, visible expectations, and support that changes over time. It is neither a financial product nor a continuous location-tracking service.

## Brand strategy

The name compresses **side by side**: support without crowding. The paired-path symbol moves in two directions with an open center. The lowercase Manrope wordmark and vermilion period are approachable and confident.

Paper and aubergine ground the product. Vermilion, lilac, butter, and sky give campaigns and teen-facing moments expressive range. Manrope 800 and 600 serve display and headings; DM Sans 400 and 600 serve functional copy. Fonts are hosted locally, with their OFL licenses in `public/fonts/`.

Original abstract illustrations extend the paired paths into routes, people, and notes. Photography uses everyday, naturally lit, candid moments. The one original generated photograph depicts fictional people and is clearly identified in the brand system and asset provenance.

## Product

The fictional Bennett household includes Mara and Dan (parents), Ellie (16), and Leo (14). The scenario is anchored to **Tuesday, October 13, 2026**, rather than implying live status.

- Today: shared or personal timeline, next rides, check-ins, household note, due responsibilities, quick actions.
- Calendar: day/week/month, date navigation, member filters, labeled categories, repeat concepts, event creation, details, related transportation.
- Responsibilities: household/school/personal/pet/errands, assigned people, due times, recurrence labels, completion, acknowledgment, consistency context.
- Check-ins: six voluntary status choices, optional note, clear recipient disclosure, last-check-in undo, family feed, member filter.
- Rides: request, date/time, pickup/destination, notes, claim/assign driver, mark arrived, upcoming/completed views.
- Permissions: request context, approved/discussion/declined decisions, shared conditions, human explanations, local notification.
- Goals: personal steps, progress, target dates, supporter, goal creation.
- Updates: shared notes, posting, acknowledgment.
- Milestones: collaborative independence agreements, progress state, agreement editing.
- Important info: fictional contacts, sample meeting point and care fields, clear concept boundaries.
- Notifications: read/unread, contextual links, new activity, mark all read.
- Profiles: household members, relevant roles, fictional profile editing, demo reset.

Parent views emphasize household logistics and review actions. Teen views emphasize personal plans, responsibilities, goals, and requests. Both can share voluntary updates and revisit independence agreements.

## Route map

| Public | Product |
| --- | --- |
| `/` | `/app`, `/app/today` |
| `/how-it-works` | `/app/calendar` |
| `/for-parents`, `/for-teens` | `/app/responsibilities` |
| `/features`, `/safety`, `/pricing` | `/app/check-ins` |
| `/resources` | `/app/rides` |
| `/resources/the-sunday-ten` | `/app/goals` |
| `/resources/check-ins-without-hovering` | `/app/permissions` |
| `/resources/a-first-solo-plan` | `/app/updates` |
| `/about` | `/app/milestones` |
| `/login`, `/signup` | `/app/info` |
| `/brand`, `/campaign`, `/case-study` | `/app/notifications`, `/app/profiles` |

Unknown routes render a designed 404 page.

## Architecture

Next.js 15 App Router, React 19, TypeScript, standard CSS, no backend. Static export produces `out/`; hosting requires no Node server. There is no animation framework, UI component package, database, analytics SDK, or auth provider.

```text
src/
  app/             Public, resource, studio, and product routes
  components/
    brand/         Identity, brand presentation, campaign studio, case study
    marketing/     Public shell, product previews, content, onboarding
    product/       App shell and individual product modules
    ui/            Icons, buttons, badges, empty states, native dialog
  data/            Typed household scenario and editorial/campaign content
  lib/             Shared local demo context
  styles/          Tokens, marketing, product, studio responsive styles
  types/           Domain models
public/
  brand/           SVG identity, tokens, downloadable kit, social metadata
  campaign/        38 editable campaign SVGs, PNG exports, downloadable kit
  emails/          Five standalone responsive HTML email templates
  fonts/           Locally hosted fonts and licenses
  images/          Optimized original concept photography
portfolio-assets/  QA report, screenshots, export guide, original photograph
scripts/           Asset generation, QA, export, static preview
```

`DemoProvider` holds the entire fictional family state in React memory. `PlanForm` shares validation and creation flows across six plan types. Native `Modal` uses `dialog.showModal()` to contain focus; completion feedback uses an accessible live status region. `Icon` uses one editable stroke system. `PhonePreview` is a presentation component; live product modules provide actual behavior.

## Demo behavior

Switch among all four fictional members in the header. Login offers parent or teen entry; signup is a three-step concept onboarding with field validation and a recap. No account, password, subscription, invitation, or real message is created. Onboarding priorities are shown in the recap; the product opens the Bennett sample household.

Changes persist across internal navigation and **reset on reload**. New check-ins and notifications use a visibly fictional demo scenario. Repeat controls illustrate recurrence; they do not generate a series. Optional goals and notes stay in local state. Prices are illustrative; both plans open the same demo. Email, push, and app discovery artwork are concept deliverables, not a messaging service or a native app listing.

## Accessibility and responsive behavior

Semantic landmarks and headings, skip link, keyboard-operable native controls, visible focus, labeled forms, field-specific errors, native modal focus containment and restoration, Escape dismissal, live status feedback, non-color status labels, member names/initials, and reduced-motion rules.

Layouts cover 320, 375, 390, 430, 768, 1024, 1280, and 1440 px. Mobile product navigation exposes four core tasks and a More panel. Desktop uses a sidebar, split Today layout, and wider calendar. See `portfolio-assets/QA-REPORT.json` and `VALIDATION.md` for measured checks and limitations. Automated checks are a smoke test, not an accessibility certification.

## Privacy

No GPS API, background tracking, device sensors, analytics, or third-party runtime font/image requests. Demo form entries are not sent to a backend. All family members and contacts are fictional. Do not enter real personal, child, medical, or emergency information. Ordinary page requests are received by the hosting service.

A production release would require real authentication/authorization, consent, retention policies, private information design, security review, privacy/legal review, and paired parent/teen user research. This project claims no certification, compliance status, safety guarantee, emergency response, customer results, or real integrations.

## Development

Recommended: Node **20.19+** or **22.13+**, npm.

```sh
npm ci
npm run dev
```

The development server runs at http://127.0.0.1:3000.

```sh
npm run assets
npm run typecheck
npm run lint
npm run build
node scripts/preview.mjs
```

The static production preview runs at http://127.0.0.1:4173. Because this is a static export, `next start` is not the production serving method; serve `out/` with any static host.

```sh
QA_ORIGIN=http://127.0.0.1:4173 npm run qa
QA_ORIGIN=http://127.0.0.1:4173 node scripts/export-assets.mjs
```

QA uses installed Google Chrome. To use a Playwright-managed browser, change the launch channel in the scripts and install the corresponding browser. It checks all 30 routes at eight widths, representative routes with axe at desktop/mobile, cross-role product flows, dialog keyboard behavior, console errors, and internal links. Portfolio screenshots and a machine-readable report are written locally.

`postcss` is overridden to a patched version. Lint uses direct TypeScript, React, hooks, and JSX accessibility plugins to avoid an unpatched indirect dependency chain.

## Deployment

`next.config.ts` uses `output: 'export'`, trailing slashes, and unoptimized images because all images are already sized and hosted locally. Publish `out/` to a static host. `.openai/hosting.json` contains the private Sites identity and static output directory; no credentials are stored in source. Change `metadataBase` in `src/app/layout.tsx` if hosting moves.

## Portfolio usage

See `portfolio-assets/EXPORT-GUIDE.md`. The recommended 1280×960 highlight combines the identity, parent and teen mobile UI, and a campaign hook. Downloadable brand and campaign kits are linked from their studio pages. Original SVGs remain editable; PNG exports and screenshots support portfolio presentation. Install the supplied fonts or outline type when editing SVG assets externally.

## Disclaimer

This is a self-initiated concept project created to demonstrate consumer brand strategy, family-tech product design, mobile UX, frontend development, campaign systems, and lifecycle creative. Sideby is fictional. No real users, customers, funding, revenue, results, partnerships, ratings, or certifications are claimed.
