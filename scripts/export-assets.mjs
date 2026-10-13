import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const origin = process.env.QA_ORIGIN || "http://127.0.0.1:4173";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 960 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const checks = [];
for (const folder of ["brand", "campaign"]) {
  for (const file of await fs.readdir(`public/${folder}`)) {
    if (!file.endsWith(".svg")) continue;
    const source = await fs.readFile(`public/${folder}/${file}`, "utf8");
    const width = Number(source.match(/\bwidth="(\d+)"/)[1]);
    const height = Number(source.match(/\bheight="(\d+)"/)[1]);
    await page.setViewportSize({ width, height });
    await page.goto(`${origin}/${folder}/${file}`, {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() =>
      [...document.querySelectorAll("text")]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return (
            rect.left < -0.5 ||
            rect.right > innerWidth + 0.5 ||
            rect.top < -0.5 ||
            rect.bottom > innerHeight + 0.5
          );
        })
        .map((element) => element.textContent),
    );
    checks.push({ file, width, height, overflow });
    const output = `public/${folder}/${file.replace(".svg", ".png")}`;
    await page.screenshot({ path: output });
  }
}
await page.setViewportSize({ width: 1280, height: 960 });
await page.goto(origin + "/case-study", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
// Recompose actual DOM presentation elements at the requested portfolio dimensions.
await page.evaluate(() => {
  const source = document.querySelector(".case-cover");
  document.body.innerHTML = "";
  document.body.append(source);
  const style = document.createElement("style");
  style.textContent =
    ".case-cover{box-sizing:border-box;width:1280px;height:960px;min-height:960px;padding:90px 66px;background:#faf7f0;grid-template-columns:1fr 1.12fr;text-align:left;gap:20px}.case-cover-copy h2{font-size:76px;margin:45px 0 30px}.case-cover-copy .logo{font-size:47px}.case-cover-copy .logo svg{width:50px;height:50px}.case-cover-copy>span{font-size:12px}.case-cover-phones{transform:scale(1);height:auto;gap:22px}.case-cover-phones .phone:first-child{transform:rotate(-8deg);margin-bottom:160px}.case-cover-phones .phone:last-child{transform:rotate(6deg);margin-top:95px}.case-cover>.brand-path{width:880px;left:660px;bottom:100px;color:#ded1f0;transform:rotate(-25deg)}.portfolio-hook{position:absolute;bottom:90px;left:66px;background:#e75536;padding:32px;border-radius:16px;transform:rotate(-4deg);font:800 30px/1.1 Manrope;letter-spacing:-1.4px}.portfolio-credit{position:absolute;bottom:30px;left:66px;font:10px DM Sans;letter-spacing:.4px}";
  document.head.append(style);
  const hook = document.createElement("div");
  hook.className = "portfolio-hook";
  hook.innerHTML = "Out the door.<br>On the same page.";
  source.append(hook);
  const credit = document.createElement("span");
  credit.className = "portfolio-credit";
  credit.textContent =
    "SIDEBY · CONSUMER FAMILY TECH CONCEPT · ANTHONY VOLATILE / VOLATILE SOLUTIONS";
  source.append(credit);
});
await page.screenshot({ path: "portfolio-assets/portfolio-highlight.png" });
await fs.copyFile(
  "portfolio-assets/portfolio-highlight.png",
  "public/brand/og.png",
);
await browser.close();
await fs.writeFile(
  "portfolio-assets/ARTWORK-QA.json",
  JSON.stringify(checks, null, 2),
);
if (checks.some((check) => check.overflow.length)) {
  console.log(
    JSON.stringify(
      checks.filter((check) => check.overflow.length),
      null,
      2,
    ),
  );
  process.exitCode = 1;
}
console.log(
  "Exported native-size brand/campaign PNGs and 1280 × 960 portfolio highlight.",
);
