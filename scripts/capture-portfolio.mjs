import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const origin = process.env.QA_ORIGIN || "http://127.0.0.1:4173";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
for (const [route, name, persona] of [
  ["today", "parent-today", "mara"],
  ["today", "teen-today", "ellie"],
  ["calendar", "calendar", "mara"],
  ["check-ins", "check-ins", "ellie"],
  ["permissions", "permissions", "ellie"],
  ["rides", "rides", "mara"],
]) {
  await page.goto(`${origin}/app/${route}`, { waitUntil: "networkidle" });
  await page.getByLabel("Demo profile").selectOption(persona);
  await page.evaluate(() => document.fonts.ready);
  const file = `portfolio-assets/screenshots/${name}-mobile.png`;
  await fs.copyFile(file, file.replace(".png", "-full.png"));
  await page.screenshot({ path: file });
}
await fs.mkdir("portfolio-assets/emails", { recursive: true });
const checks = [];
for (const slug of ["welcome", "invite", "weekly", "permission", "tomorrow"]) {
  for (const width of [320, 390, 600]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(`${origin}/emails/${slug}.html`, {
      waitUntil: "networkidle",
    });
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    checks.push({ slug, width, scrollWidth, passed: scrollWidth <= width });
    if (width === 390)
      await page.screenshot({
        path: `portfolio-assets/emails/${slug}-mobile.png`,
        fullPage: true,
      });
  }
}
await fs.writeFile(
  "portfolio-assets/EMAIL-QA.json",
  JSON.stringify(checks, null, 2),
);
await browser.close();
console.log(
  `Captured mobile portfolio frames; ${checks.length} email responsive checks, ${checks.filter((x) => !x.passed).length} failures.`,
);
if (checks.some((x) => !x.passed)) process.exitCode = 1;
