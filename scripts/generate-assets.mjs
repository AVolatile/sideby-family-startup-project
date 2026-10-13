import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
const source = await fs.readFile("src/data/content.ts", "utf8");
const { campaigns, emails } = await import(
  `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText).toString("base64")}`
);
const palette = {
  paper: "#faf7f0",
  plum: "#422b48",
  coral: "#e75536",
  lilac: "#ded1f0",
  butter: "#f5df91",
  sky: "#c5dce8",
  ink: "#241927",
};
const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const mark = (x, y, size, color = palette.ink) =>
  `<g transform="translate(${x} ${y}) scale(${size / 48})" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round"><path d="M11 9v17c0 8 5 13 13 13M37 39V22c0-8-5-13-13-13"/></g>`;
const text = (copy, x, y, size, fill = palette.ink, weight = 800) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" letter-spacing="${weight === 800 ? -size * 0.045 : 0}">${esc(copy)}</text>`;
const lines = (copy, x, y, size, fill = palette.ink) =>
  copy
    .split("\n")
    .map((line, i) => text(line, x, y + i * size * 1.1, size, fill))
    .join("");
const logo = (x, y, size = 70, light = false) =>
  mark(x, y - size * 0.65, size * 0.82, light ? palette.paper : palette.ink) +
  text(
    "sideby.",
    x + size * 0.86,
    y + size * 0.17,
    size,
    light ? palette.paper : palette.ink,
  );
const pathMotif = (x, y, size, color) =>
  `<g transform="translate(${x} ${y}) scale(${size / 400})" fill="none" stroke="${color}" stroke-width="48" stroke-linecap="round"><path d="M-30 80h190c120 0 120 160 0 160H20M430 310H240c-120 0-120-160 0-160h140"/></g>`;
const svg = (w, h, bg, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title><style>@font-face{font-family:Manrope;src:url('/fonts/manrope-extra-bold.ttf')}text{font-family:Manrope,Arial,sans-serif}</style><rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>`;
const write = async (file, body) => {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, body);
};
const card = (x, y, w, title, detail) =>
  `<g transform="translate(${x} ${y})"><rect width="${w}" height="170" rx="25" fill="${palette.paper}"/><circle cx="60" cy="62" r="27" fill="${palette.lilac}"/>${mark(42, 44, 36)}${text(title, 110, 75, 28)}${text(detail, 110, 118, 15, palette.plum, 600)}<path d="m${w - 67} 74 14 14 26-32" fill="none" stroke="${palette.plum}" stroke-width="5" stroke-linecap="round"/></g>`;
const details = [
  "Today has a plan.",
  "My first solo drive.",
  "Ellie’s at practice.",
  "Dan’s driving.",
  "Friday movie night.",
  "Kitchen? Taken care of.",
  "The week, together.",
  "A next step of my own.",
];
for (const c of campaigns) {
  for (const [format, h] of [
    ["square", 1080],
    ["portrait", 1350],
    ["story", 1920],
  ]) {
    const light = c.color === "plum";
    const ink = light ? palette.paper : palette.ink;
    const maxCharacters = Math.max(
      ...c.title.split("\n").map((line) => line.length),
    );
    const size = Math.min(
      format === "story" ? 126 : 108,
      Math.floor(900 / (maxCharacters * 0.59)),
    );
    const headingY = format === "story" ? 420 : 310;
    const cardY = format === "story" ? 1080 : format === "portrait" ? 850 : 715;
    const body =
      pathMotif(720, 400, 620, light ? "#ffffff12" : "#30233110") +
      logo(72, 100, 66, light) +
      text(c.audience.toUpperCase(), 75, headingY - 65, 19, ink, 600) +
      lines(c.title, 72, headingY, size, ink) +
      card(
        72,
        cardY,
        936,
        details[Number(c.id) - 1],
        "ROOM TO GROW. A PLAN TO GO.",
      ) +
      text("A LITTLE STRUCTURE. A LOT OF ROOM.", 75, h - 75, 17, ink, 600);
    await write(
      `public/campaign/social-${c.id}-${format}.svg`,
      svg(1080, h, palette[c.color], body, c.title.replace("\n", " ")),
    );
  }
}
const posters = [
  ["“Who’s picking\nme up?”", "A ride home. Already sorted.", "lilac"],
  ["“Can I stay\nuntil 10:30?”", "Ask. Talk. Make a plan.", "butter"],
  ["“I’m here.”", "A little update. A lot less back-and-forth.", "coral"],
  ["“Practice\nmoved.”", "The plan changed. Everyone knows.", "sky"],
];
for (const [i, [title, copy, color]] of posters.entries()) {
  const body =
    logo(80, 115, 75) +
    text("EVERY FAMILY HAS THIS CONVERSATION.", 82, 280, 19, palette.ink, 600) +
    lines(title, 75, 470, 108) +
    mark(80, 1050, 72) +
    text(copy, 80, 1190, 32) +
    text("ROOM TO GROW. A PLAN TO GO.", 82, 1390, 20, palette.ink, 600);
  await write(
    `public/campaign/poster-${i + 1}.svg`,
    svg(1000, 1500, palette[color], body, title.replace("\n", " ")),
  );
}
function phone(x, y, w, screen) {
  const scale = w / 280;
  const content = {
    today: [
      "Your day. Your move.",
      "Basketball practice",
      "A ride home",
      "Taco Tuesday",
    ],
    "check-ins": [
      "A little update.",
      "I’m here",
      "Heading home",
      "Plans changed",
    ],
    rides: [
      "Your way home.",
      "Home from practice",
      "Dan’s driving",
      "South entrance · 5:30",
    ],
    responsibilities: [
      "You’ve got this.",
      "Reset the kitchen",
      "History outline",
      "Practice bag",
    ],
    permissions: [
      "Let’s make a plan.",
      "Friday movie night",
      "Home by 10:30",
      "A ride, arranged",
    ],
    goals: [
      "Your next chapter.",
      "My first solo drive",
      "Practice the route",
      "Book the driving test",
    ],
  }[screen];
  return `<g transform="translate(${x} ${y}) scale(${scale})"><rect width="280" height="570" rx="38" fill="${palette.paper}" stroke="${palette.plum}" stroke-width="7"/><rect x="108" y="12" width="64" height="14" rx="7" fill="${palette.plum}"/>${text("9:41", 25, 27, 9)}${mark(22, 51, 23)}${text("The Bennetts", 52, 69, 11)}<circle cx="244" cy="61" r="14" fill="${palette.coral}"/>${text("EB", 236, 64, 8)}${text("TUESDAY, OCTOBER 13", 22, 106, 8, palette.plum, 600)}${text(content[0], 22, 145, screen === "permissions" ? 22 : 23)}<rect x="22" y="171" width="236" height="64" rx="10" fill="${palette.butter}"/>${text("A little structure. A lot of room.", 34, 198, 10)}${text("Shared by choice. Just enough context.", 34, 215, 8, palette.plum, 600)}${content
    .slice(1)
    .map(
      (t, i) =>
        `<rect x="22" y="${262 + i * 72}" width="236" height="61" rx="10" fill="${[palette.lilac, palette.sky, palette.butter][i]}"/>${text(t, 38, 288 + i * 72, 12)}${text(["Ellie · 3:30 pm", "Dan · 5:30 pm", "The family · 6:30 pm"][i], 38, 307 + i * 72, 8, palette.plum, 600)}`,
    )
    .join(
      "",
    )}<path d="M10 505H270" stroke="#dfd9d3"/>${text("Today", 30, 535, 9)}${text("Calendar", 88, 535, 9)}${text("Check in", 158, 535, 9)}${text("More", 224, 535, 9)}</g>`;
}
const store = [
  ["today", "A plan for\nthe whole day.", "coral"],
  ["check-ins", "A little update.\nYour choice.", "lilac"],
  ["rides", "Your way home.\nAlready sorted.", "butter"],
  ["responsibilities", "A place for\n“I’ve got it.”", "sky"],
  ["permissions", "Ask. Talk.\nMake a plan.", "lilac"],
  ["goals", "Your next\nchapter.", "butter"],
];
for (const [i, [screen, title, color]] of store.entries()) {
  const body =
    logo(95, 140, 90) +
    lines(title, 95, 440, 130) +
    phone(215, 950, 860, screen) +
    text("ROOM TO GROW. A PLAN TO GO.", 95, 815, 22, palette.ink, 600);
  await write(
    `public/campaign/app-store-${i + 1}.svg`,
    svg(1290, 2796, palette[color], body, `${screen} app discovery creative`),
  );
}
for (const [w, h, color, title] of [
  [300, 250, "butter", "More “I’ve got it.”\nLess reminding."],
  [728, 90, "lilac", "A ride home. Already sorted."],
  [160, 600, "coral", "Your plans.\nYour move."],
  [970, 250, "coral", "Out the door.\nOn the same page."],
]) {
  let body;
  if (w === 728)
    body =
      logo(18, 40, 26) +
      text(title, 174, 51, 27) +
      `<rect x="586" y="27" width="123" height="37" rx="7" fill="${palette.plum}"/>` +
      text("Explore Sideby", 600, 50, 12, palette.paper, 600);
  else if (w === 160)
    body =
      logo(16, 44, 25) +
      lines(title, 15, 175, 22) +
      pathMotif(10, 270, 190, palette.plum) +
      text("Room to grow.", 15, 480, 12, palette.ink, 600) +
      text("A plan to go.", 15, 500, 12, palette.ink, 600) +
      `<rect x="15" y="530" width="130" height="42" rx="7" fill="${palette.plum}"/>` +
      text("Explore Sideby", 31, 556, 13, palette.paper, 600);
  else if (w === 970)
    body =
      logo(35, 53, 34) +
      lines(title, 35, 135, 49) +
      pathMotif(500, -30, 460, palette.plum) +
      `<rect x="756" y="171" width="179" height="44" rx="8" fill="${palette.plum}"/>` +
      text("Explore the demo", 775, 198, 16, palette.paper, 600);
  else
    body =
      logo(24, 43, 31) +
      lines(title, 24, 119, 24) +
      text(
        "A little structure. A lot of room.",
        24,
        178,
        10,
        palette.ink,
        600,
      ) +
      `<rect x="24" y="199" width="141" height="32" rx="6" fill="${palette.plum}"/>` +
      text("Explore Sideby →", 37, 220, 12, palette.paper, 600);
  await write(
    `public/campaign/display-${w}x${h}.svg`,
    svg(w, h, palette[color], body, title.replace("\n", " ")),
  );
}
await write(
  "public/brand/symbol.svg",
  svg(
    256,
    256,
    palette.paper,
    mark(38, 38, 180, palette.plum),
    "Sideby paired path symbol",
  ),
);
await write(
  "public/brand/app-icon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>Sideby app icon</title><rect width="512" height="512" rx="120" fill="${palette.plum}"/>${mark(110, 110, 292, palette.paper)}</svg>`,
);
await write(
  "public/brand/favicon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="${palette.plum}"/>${mark(8, 8, 32, palette.paper)}</svg>`,
);
await write(
  "public/brand/wordmark.svg",
  svg(760, 240, palette.paper, logo(30, 140, 120), "Sideby wordmark"),
);
await write(
  "public/brand/paired-path.svg",
  svg(
    800,
    680,
    palette.paper,
    pathMotif(0, 0, 800, palette.coral),
    "Sideby paired path motif",
  ),
);
await write(
  "public/brand/color-system.svg",
  svg(
    1200,
    700,
    palette.paper,
    text("A little structure. A lot of color.", 50, 95, 56) +
      Object.entries(palette)
        .filter(([c]) => c !== "ink")
        .map(
          ([c, hex], i) =>
            `<rect x="${50 + i * 184}" y="160" width="170" height="350" rx="18" fill="${hex}" stroke="#30233120"/>${text(c[0].toUpperCase() + c.slice(1), 50 + i * 184, 560, 25)}${text(hex.toUpperCase(), 50 + i * 184, 595, 18, palette.plum, 600)}`,
        )
        .join(""),
    "Sideby color system",
  ),
);
await write(
  "public/brand/coordination-illustration.svg",
  svg(
    1200,
    800,
    palette.butter,
    pathMotif(20, 210, 1200, palette.coral) +
      `<g transform="translate(200 225) rotate(6)"><circle cx="55" cy="0" r="45" fill="${palette.paper}" stroke="${palette.plum}" stroke-width="5"/><rect y="60" width="110" height="245" rx="55" fill="${palette.plum}"/></g><g transform="translate(535 385) rotate(-8)"><circle cx="45" cy="0" r="38" fill="${palette.paper}" stroke="${palette.plum}" stroke-width="5"/><rect y="52" width="90" height="190" rx="45" fill="${palette.lilac}"/></g><g transform="translate(870 135) rotate(10)"><circle cx="45" cy="0" r="38" fill="${palette.paper}" stroke="${palette.plum}" stroke-width="5"/><rect y="52" width="90" height="190" rx="45" fill="${palette.sky}"/></g>` +
      card(
        600,
        590,
        540,
        "A shared plan.",
        "A LITTLE STRUCTURE. A LOT OF ROOM.",
      ),
    "Sideby abstract coordination illustration",
  ),
);
const iconSource = await fs.readFile("src/data/icons.ts", "utf8");
const { iconPaths } = await import(
  `data:text/javascript;base64,${Buffer.from(ts.transpileModule(iconSource, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText).toString("base64")}`
);
const names = [
  "calendar",
  "ride",
  "pin",
  "flag",
  "key",
  "check",
  "family",
  "message",
  "shield",
  "path",
];
await write(
  "public/brand/sideby-icons.svg",
  svg(
    1000,
    500,
    palette.paper,
    names
      .map(
        (name, i) =>
          `<g transform="translate(${70 + (i % 5) * 190} ${60 + Math.floor(i / 5) * 235})"><svg width="65" height="65" viewBox="0 0 24 24" fill="none" stroke="${palette.plum}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="${iconPaths[name]}"/></svg>${text(name, 0, 105, 18, palette.plum, 600)}</g>`,
      )
      .join(""),
    "Sideby core icon system",
  ),
);
await write(
  "public/brand/design-tokens.json",
  JSON.stringify(
    {
      colors: palette,
      fonts: { display: "Manrope 800", body: "DM Sans 400 / 600" },
      spacing: [4, 8, 12, 16, 24, 32, 48, 64],
      radius: { small: 10, medium: 20, large: 32 },
      touchTarget: { minimum: 44, primary: 48 },
      motion: {
        duration: "180–300ms",
        easing: "ease",
        reducedMotion: "remove decorative transitions",
      },
    },
    null,
    2,
  ),
);
for (const e of emails) {
  const message = esc(e.body);
  const body = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(e.subject)}</title><style>@media(max-width:480px){.pad{padding:28px 22px!important}.headline{font-size:34px!important}}</style></head><body style="margin:0;padding:24px 8px;background:#ece7df;font-family:Arial,sans-serif;color:#302331"><div style="display:none;max-height:0;overflow:hidden">${esc(e.subject)} · A little structure. A lot of room.</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#faf7f0;border-radius:16px;overflow:hidden"><tr><td class="pad" style="padding:36px 40px 25px"><a href="/" style="font-size:35px;font-weight:bold;letter-spacing:-2px;text-decoration:none;color:#422b48">sideby<span style="color:#e75536">.</span></a></td></tr><tr><td class="pad" style="padding:30px 40px;background:#ded1f0"><p style="font-size:10px;letter-spacing:1px;font-weight:bold;text-transform:uppercase;margin:0 0 18px">${esc(e.eyebrow)}</p><h1 class="headline" style="font-size:44px;line-height:1.08;letter-spacing:-1.5px;margin:0;font-weight:bold">${esc(e.title)}</h1></td></tr><tr><td class="pad" style="padding:32px 40px"><p style="font-size:16px;line-height:1.8;margin:0 0 26px">${message}</p><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#422b48;border-radius:8px"><a href="${e.href}" style="display:inline-block;padding:16px 24px;font-size:14px;font-weight:bold;color:#faf7f0;text-decoration:none">${esc(e.cta)} &rarr;</a></td></tr></table><p style="font-size:12px;line-height:1.8;margin:28px 0 0">A little structure. A lot of room.<br>The Sideby concept team</p></td></tr><tr><td class="pad" style="padding:25px 40px;border-top:1px solid #dfd9d3"><p style="font-size:10px;line-height:1.8;color:#6d626c;margin:0">Fictional lifecycle email · Sideby concept by Anthony Volatile.<br>This is a visual preview. No email was sent, no subscription exists, and no real family information is included.</p></td></tr></table></td></tr></table></body></html>`;
  await write(`public/emails/${e.slug}.html`, body);
}
await write(
  "portfolio-assets/ASSET-INVENTORY.md",
  `# Sideby asset inventory\n\nGenerated by \`npm run assets\`.\n\n- 24 paid social SVGs: eight concepts × square (1080×1080), portrait (1080×1350), story (1080×1920).\n- Four 1000×1500 poster SVGs.\n- Six 1290×2796 app discovery SVGs with vector product excerpts.\n- Four display SVGs: 300×250, 728×90, 160×600, 970×250.\n- Five responsive HTML emails, not sent.\n- Symbol, wordmark, app icon, favicon, paired path motif, palette, icon sheet, illustration, and JSON tokens.\n- Original generated photograph and optimized WebP.\n\nSVG typography uses Manrope with Arial fallback. Website previews load the local font; for external editing, install the bundled font or outline text before delivery. PNG copies are generated during browser export. App discovery vector excerpts are presentation assets; the live product is the source of interaction behavior.\n`,
);
console.log(
  "Generated 38 campaign SVGs, brand assets, tokens, and five HTML emails.",
);
