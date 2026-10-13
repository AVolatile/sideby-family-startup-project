# Sideby validation

Validated against the **static production export**, using local Google Chrome and Playwright. The scenario is fictional and fixed to October 13, 2026.

| Check | Result |
| --- | --- |
| TypeScript strict check | Pass |
| ESLint: TypeScript, React, hooks, JSX accessibility | Pass, zero errors/warnings |
| Next.js production static export | Pass |
| Public/product/editorial routes | 30 / 30, HTTP 200, one H1 per route |
| Responsive layout | 240 / 240, no document overflow |
| Widths | 320, 375, 390, 430, 768, 1024, 1280, 1440 px |
| Automated WCAG A/AA smoke scans | 20 / 20, no detected violations |
| End-to-end flows | 9 / 9 |
| Internal route/download links | 59 / 59, HTTP 200 |
| Browser console / page exceptions | None |
| Artwork text boundaries | 46 / 46 SVGs at native sizes |
| Standalone email responsive layout | 15 / 15 checks: five emails at 320, 390, and 600 px |
| npm dependency audit | Zero known advisories, including development dependencies |

## Verified flows

1. Teen persona → permission request → parent review and approval with conditions.
2. Teen ride request → caregiver claims the ride → marks arrival.
3. Voluntary check-in with context → undo removes it and its notification.
4. Teen responsibility completion → parent acknowledgment.
5. Event creation → day view → detail dialog → person filter.
6. Goal step completion updates the accessible progress value.
7. Dialog Tab focus containment, Escape dismissal, and trigger focus restoration.
8. Three-step onboarding, empty-name validation, priorities, recap, parent entry.
9. Campaign audience/format filters and lifecycle email preview switching.

## Accessibility coverage

Axe scans `/`, `/app/today`, `/app/calendar`, `/app/check-ins`, `/app/permissions`, `/signup`, `/safety`, `/campaign`, `/brand`, and `/case-study` at 390 and 1440 px. Checks include contrast, accessible names, labels, headings, landmarks, and semantics. Dialog keyboard behavior is exercised separately. Person filters expose pressed state; progress has an accessible value; status feedback uses a live region.

## Visual review

Reviewed marketing hero, desktop Today, mobile parent and teen Today, the portfolio highlight, poster, display, and app discovery exports. Exported artwork is measured for text outside its frame. Mobile portfolio frames use 390 × 844; full page copies remain available for layout review. Photography and brand illustration have been inspected separately.

## Practical limits

- Automated scans are accessibility smoke checks, not certification or a substitute for assistive-technology user testing.
- Browser QA used Chrome. Safari, Firefox, physical devices, and user studies remain useful next validation targets.
- This is a static frontend demo. Role controls express product behavior, not enforceable backend authorization.
- Repeat selections are concepts; no recurring-event engine, native push, real email delivery, accounts, GPS, medical storage, or payment processing is implemented.
- The execution host used Node 20.15.1 successfully. The project recommends Node 20.19+ or 22.13+ to match tooling engine ranges.
- Next.js emits an informational notice about the absent Next-specific ESLint plugin. Direct TypeScript/React/hooks/accessibility plugins are used intentionally to keep the dependency audit clean; lint and type checks passed.

## Evidence and reproduction

`portfolio-assets/QA-REPORT.json` contains route, responsive, axe, flow, link, console, and screenshot results. `ARTWORK-QA.json` records all 46 export checks. `EMAIL-QA.json` records standalone email-width checks. `portfolio-assets/screenshots/` and `portfolio-assets/emails/` hold visual evidence.

```sh
npm ci
npm run assets
npm run typecheck
npm run lint
npm run build
npm run preview
QA_ORIGIN=http://127.0.0.1:4173 npm run qa
QA_ORIGIN=http://127.0.0.1:4173 node scripts/export-assets.mjs
QA_ORIGIN=http://127.0.0.1:4173 node scripts/capture-portfolio.mjs
```

The browser scripts use a locally installed Google Chrome. Build and preview require no remote services.
