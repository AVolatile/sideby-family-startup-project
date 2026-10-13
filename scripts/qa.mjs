import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const origin = process.env.QA_ORIGIN || "http://127.0.0.1:3000";
const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440];
const routes = [
  "/",
  "/how-it-works",
  "/for-parents",
  "/for-teens",
  "/features",
  "/safety",
  "/pricing",
  "/resources",
  "/about",
  "/login",
  "/signup",
  "/app",
  "/app/today",
  "/app/calendar",
  "/app/responsibilities",
  "/app/check-ins",
  "/app/rides",
  "/app/goals",
  "/app/permissions",
  "/app/updates",
  "/app/milestones",
  "/app/info",
  "/app/notifications",
  "/app/profiles",
  "/campaign",
  "/brand",
  "/case-study",
  "/resources/the-sunday-ten",
  "/resources/check-ins-without-hovering",
  "/resources/a-first-solo-plan",
];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 960 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
page.setDefaultTimeout(6000);
page.setDefaultNavigationTimeout(10000);
const report = {
  routes: [],
  responsive: [],
  accessibility: [],
  interactions: [],
  links: [],
  console: [],
  screenshots: [],
};
page.on("response", (response) => {
  if (response.status() >= 400)
    report.console.push(`HTTP ${response.status()}: ${response.url()}`);
});
page.on("pageerror", (error) => report.console.push(String(error)));
page.on("console", (msg) => {
  if (msg.type() === "error") report.console.push(msg.text());
});
await fs.mkdir("portfolio-assets/screenshots", { recursive: true });
for (const route of routes) {
  console.log(`CHECK ${route}`);
  const response = await page.goto(origin + route, {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);
  const title = await page.title();
  report.routes.push({
    route,
    status: response.status(),
    title,
    h1: await page.locator("h1").count(),
  });
  const links = await page
    .locator("a[href]")
    .evaluateAll((nodes) =>
      nodes.map((n) => n.getAttribute("href")).filter((h) => h.startsWith("/")),
    );
  report.links.push(...links);
  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 960 });
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    const layout = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth,
      viewport: innerWidth,
      overflow: [...document.querySelectorAll("body *")]
        .filter((e) => {
          const r = e.getBoundingClientRect();
          return (
            r.width > 0 &&
            (r.right > innerWidth + 2 || r.left < -2) &&
            getComputedStyle(e).position !== "fixed"
          );
        })
        .slice(0, 12)
        .map((e) => ({ tag: e.tagName, class: e.className })),
    }));
    report.responsive.push({
      route,
      width,
      overflow: layout.document > width + 1,
      ...(layout.document > width + 1 ? { detail: layout } : {}),
    });
  }
  if (
    [
      "/",
      "/app/today",
      "/campaign",
      "/brand",
      "/case-study",
      "/signup",
      "/safety",
      "/app/calendar",
      "/app/permissions",
      "/app/check-ins",
    ].includes(route)
  ) {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 960 });
      await page.evaluate(
        () =>
          new Promise((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(resolve)),
          ),
      );
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      report.accessibility.push({
        route,
        width,
        violations: results.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes
            .map((n) => ({ target: n.target, summary: n.failureSummary }))
            .slice(0, 12),
        })),
      });
    }
    const file = `portfolio-assets/screenshots/${route === "/" ? "homepage" : route.replaceAll("/", "-").slice(1)}-desktop.png`;
    await page.setViewportSize({ width: 1440, height: 960 });
    await page.screenshot({ path: file, fullPage: true });
    report.screenshots.push(file);
  }
}
await fs.writeFile(
  "portfolio-assets/QA-REPORT.json",
  JSON.stringify(report, null, 2),
);
async function flow(name, fn) {
  try {
    await fn();
    report.interactions.push({ name, passed: true });
    console.log(`PASS ${name}`);
  } catch (error) {
    report.interactions.push({ name, passed: false, error: String(error) });
    console.log(`FAIL ${name}: ${error.message}`);
  }
}
await page.setViewportSize({ width: 390, height: 844 });
await flow(
  "Teen persona and permission request → parent approval",
  async () => {
    await page.goto(origin + "/login?role=teen");
    await page
      .getByRole("button", { name: "Explore teen view", exact: true })
      .click();
    await page.waitForURL(/\/app\/today\/?$/);
    await page
      .getByRole("heading", { name: "Your day. Your move, Ellie." })
      .waitFor();
    await page
      .getByRole("link", { name: "Make a request", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Request permission", exact: true })
      .click();
    await page
      .getByLabel("What’s the plan?", { exact: true })
      .fill("Saturday photo walk");
    await page
      .getByLabel("The details: who, where, and your plan")
      .fill("River trail with Ava. Home by 4. Mara can drive there.");
    await page
      .getByRole("button", { name: "Share request", exact: true })
      .click();
    await page.getByRole("heading", { name: "Saturday photo walk" }).waitFor();
    await page.getByLabel("Demo profile").selectOption("mara");
    const card = page.locator(".permission-card").filter({
      has: page.getByRole("heading", { name: "Saturday photo walk" }),
    });
    await card
      .getByRole("button", { name: "Review the plan", exact: true })
      .click();
    await page
      .getByLabel("Shared expectations (optional)")
      .fill("Check in when you leave. Home by 4.");
    await page
      .getByRole("button", { name: "Share the response", exact: true })
      .click();
    await card.getByText("Agreed", { exact: true }).waitFor();
  },
);
await flow("Ride request → caregiver assignment → arrived", async () => {
  await page.getByLabel("Demo profile").selectOption("ellie");
  await page
    .locator(".bottom-nav")
    .getByRole("link", { name: "Rides", exact: true })
    .click();
  await page.getByRole("button", { name: "Request ride", exact: true }).click();
  await page
    .getByLabel("What’s the plan?", { exact: true })
    .fill("Photo walk pickup");
  await page
    .getByLabel("Pickup place", { exact: true })
    .fill("River trail entrance");
  await page.getByLabel("Destination", { exact: true }).fill("Home");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Request ride", exact: true })
    .click();
  await page.getByLabel("Demo profile").selectOption("dan");
  const card = page
    .locator(".ride-card")
    .filter({ has: page.getByRole("heading", { name: "Photo walk pickup" }) });
  await card.getByRole("button", { name: "I can drive", exact: true }).click();
  await card.getByText("Ride confirmed", { exact: true }).waitFor();
  await card.getByRole("button", { name: "Mark arrived", exact: true }).click();
  await page.getByRole("button", { name: "Arrived", exact: true }).click();
  await page.getByRole("heading", { name: "Photo walk pickup" }).waitFor();
});
await flow("Voluntary check-in and undo", async () => {
  await page.getByLabel("Demo profile").selectOption("ellie");
  await page
    .locator(".bottom-nav")
    .getByRole("link", { name: "Check in", exact: true })
    .click();
  await page.getByRole("button", { name: "I’m here", exact: true }).click();
  await page
    .getByLabel("Add a little context")
    .fill("At the river trail entrance.");
  await page
    .getByRole("button", { name: "Send check-in", exact: true })
    .click();
  await page
    .getByText("At the river trail entrance.", { exact: true })
    .waitFor();
  await page
    .getByRole("button", { name: "Undo my last check-in", exact: true })
    .click();
  if (
    await page
      .getByText("At the river trail entrance.", { exact: true })
      .count()
  )
    throw Error("Check-in still visible after undo");
});
await flow("Responsibility completion and parent acknowledgment", async () => {
  await page.getByRole("button", { name: "More", exact: true }).click();
  await page
    .locator(".mobile-more")
    .getByRole("link", { name: "Responsibilities", exact: true })
    .click();
  await page
    .getByRole("checkbox", { name: "Complete Reset the kitchen", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Taken care of", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Reset the kitchen", exact: true })
    .waitFor();
  await page.getByLabel("Demo profile").selectOption("mara");
  const card = page.locator(".responsibility-card").filter({
    has: page.getByRole("heading", {
      name: "Reset the kitchen",
      exact: true,
    }),
  });
  await card.getByRole("button", { name: "Say thanks", exact: true }).click();
  await card
    .getByRole("button", { name: "Acknowledged", exact: true })
    .waitFor();
});
await flow("Calendar creation, filtering, and event details", async () => {
  await page
    .locator(".bottom-nav")
    .getByRole("link", { name: "Calendar", exact: true })
    .click();
  await page.getByRole("button", { name: "Add event", exact: true }).click();
  await page
    .getByLabel("What’s the plan?", { exact: true })
    .fill("Family photo walk");
  await page
    .getByRole("button", { name: "Add to the plan", exact: true })
    .click();
  await page.getByRole("button", { name: "Day", exact: true }).click();
  await page.getByRole("button", { name: /Family photo walk/ }).click();
  await page
    .getByRole("dialog")
    .getByRole("heading", { name: "Family photo walk" })
    .waitFor();
  await page.getByRole("button", { name: "Got the plan", exact: true }).click();
  await page.getByRole("button", { name: "Leo", exact: true }).click();
  if (await page.getByRole("button", { name: /Family photo walk/ }).count())
    throw Error("Member filter did not apply");
});
await flow("Goal progress updates", async () => {
  await page.getByRole("button", { name: "More", exact: true }).click();
  await page
    .locator(".mobile-more")
    .getByRole("link", { name: "Goals", exact: true })
    .click();
  await page.getByLabel("Demo profile").selectOption("ellie");
  const goal = page.locator(".goal-card").filter({
    has: page.getByRole("heading", { name: "My first solo drive" }),
  });
  await goal
    .getByRole("checkbox", { name: "Practice parking at the gym" })
    .check();
  if (
    (await goal.getByRole("progressbar").getAttribute("aria-valuenow")) !== "75"
  )
    throw Error("Expected 75% progress");
});
await flow(
  "Dialog focus containment, Escape, and focus restoration",
  async () => {
    const trigger = page.getByRole("button", { name: "Add goal", exact: true });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor();
    for (let i = 0; i < 16; i++) {
      await page.keyboard.press("Tab");
      if (
        !(await page.evaluate(
          () => document.activeElement?.closest("dialog") !== null,
        ))
      )
        throw Error("Focus escaped dialog");
    }
    await page.keyboard.press("Escape");
    if (await dialog.count()) throw Error("Escape did not close dialog");
    if (!(await trigger.evaluate((e) => e === document.activeElement)))
      throw Error("Focus not restored");
  },
);
await flow("Three-step onboarding with validation", async () => {
  await page.goto(origin + "/signup");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByText("Give your demo household a name with at least 2 characters.")
    .waitFor();
  await page.getByLabel("Demo household name").fill("The Parkers");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Shared schedules").check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByRole("heading", { name: "A first plan for The Parkers." })
    .waitFor();
  await page
    .getByRole("button", { name: "Explore parent view", exact: true })
    .click();
  await page.waitForURL(/\/app\/today\/?$/);
});
await flow(
  "Campaign format, audience, and lifecycle preview switching",
  async () => {
    await page.goto(origin + "/campaign");
    await page.getByRole("button", { name: "Teens", exact: true }).click();
    if ((await page.locator(".social-creative").count()) !== 3)
      throw Error("Expected 3 teen campaigns");
    await page.getByLabel("Format", { exact: true }).selectOption("story");
    if (!(await page.locator(".social-story").count()))
      throw Error("Story format not applied");
    await page.getByRole("button", { name: /Permission request/ }).click();
    if (
      !String(await page.locator("iframe").getAttribute("src")).endsWith(
        "permission.html",
      )
    )
      throw Error("Email preview did not update");
  },
);
const uniqueLinks = [...new Set(report.links)];
report.links = [];
for (const href of uniqueLinks) {
  const response = await context.request.get(origin + href);
  report.links.push({ href, status: response.status() });
}
for (const [route, name] of [
  ["/app/today", "parent-today"],
  ["/login?role=teen", "teen-today"],
  ["/app/calendar", "calendar"],
  ["/app/check-ins", "check-ins"],
  ["/app/permissions", "permissions"],
  ["/app/rides", "rides"],
]) {
  await page.goto(origin + route, { waitUntil: "networkidle" });
  if (name === "teen-today") {
    await page
      .getByRole("button", { name: "Explore teen view", exact: true })
      .click();
    await page.waitForURL(/\/app\/today\/?$/);
  }
  await page.evaluate(() => document.fonts.ready);
  const file = `portfolio-assets/screenshots/${name}-mobile.png`;
  await page.screenshot({ path: file, fullPage: true });
  report.screenshots.push(file);
}
report.console = [...new Set(report.console)];
await fs.writeFile(
  "portfolio-assets/QA-REPORT.json",
  JSON.stringify(report, null, 2),
);
const issues = {
  routes: report.routes.filter((r) => r.status !== 200 || r.h1 !== 1),
  overflow: report.responsive.filter((r) => r.overflow),
  accessibility: report.accessibility.filter((r) => r.violations.length),
  interactions: report.interactions.filter((r) => !r.passed),
  links: report.links.filter((r) => r.status !== 200),
  console: report.console,
};
console.log(
  JSON.stringify(
    {
      summary: {
        routes: report.routes.length,
        responsiveChecks: report.responsive.length,
        axeChecks: report.accessibility.length,
        flows: report.interactions.length,
        links: report.links.length,
        screenshots: report.screenshots.length,
      },
      issues: {
        routes: issues.routes,
        overflow: issues.overflow.map((x) => ({
          route: x.route,
          width: x.width,
          document: x.detail.document,
        })),
        accessibility: issues.accessibility.map((x) => ({
          route: x.route,
          width: x.width,
          violations: x.violations.map((v) => ({
            id: v.id,
            targets: v.nodes.map((n) => n.target),
          })),
        })),
        interactions: issues.interactions,
        links: issues.links,
        console: issues.console,
      },
    },
    null,
    2,
  ),
);
await browser.close();
if (Object.values(issues).some((v) => v.length)) process.exitCode = 1;
