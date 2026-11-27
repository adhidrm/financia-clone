import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ROOT = path.resolve("docs/preview");

const PAGES = [
  { file: "index.html", label: "home" },
  { file: "tentang-kami/index.html", label: "tentang" },
  { file: "hubungi-kami/index.html", label: "hubungi" },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files"],
  defaultViewport: { width: 1440, height: 1000 },
  protocolTimeout: 180000,
});

const report = { pages: [], links: [] };

for (const p of PAGES) {
  const page = await browser.newPage();
  const errors = [];
  page.on("requestfailed", (r) => {
    const u = r.url();
    if (u.startsWith("file://")) errors.push("FAIL " + u);
  });
  page.on("pageerror", (e) => errors.push("JS " + e.message.slice(0, 100)));

  const url = "file:///" + path.join(ROOT, p.file).replace(/\\/g, "/");
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 250) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 2500));

  const info = await page.evaluate(() => ({
    H: document.body.scrollHeight,
    broken: [...document.images].filter((i) => !i.naturalWidth).map((i) => i.getAttribute("src")),
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
    h1: document.querySelector("h1")?.textContent?.trim() || null,
    h2: document.querySelector("h2")?.textContent?.trim() || null,
    fonts: [...new Set([...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family))],
    hrefs: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).filter((h) => !/^https?:/.test(h)),
  }));

  // internal links must resolve to an existing file
  const dir = path.dirname(path.join(ROOT, p.file));
  const missing = [];
  for (const h of info.hrefs) {
    if (h.startsWith("#")) continue;
    const [target, hash] = h.split("#");
    if (!target) continue;
    const resolved = path.resolve(dir, target);
    if (!fs.existsSync(resolved)) missing.push(h);
    r_hash: void hash;
  }

  // accordions must still toggle offline
  const before = await page.evaluate(() => document.querySelectorAll('button[aria-expanded="true"]').length);
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("button[aria-expanded]")].find((x) => x.getAttribute("aria-label") !== "Menu");
    if (b) b.click();
  });
  await new Promise((r) => setTimeout(r, 300));
  const after = await page.evaluate(() => document.querySelectorAll('button[aria-expanded="true"]').length);

  // freeze the scroll-reveal so the reference capture shows every section
  await page.addStyleTag({ content: "main > section{animation:none!important;opacity:1!important;transform:none!important}" });
  await page.screenshot({ path: `docs/design-references/financia/offline-${p.label}.png`, fullPage: true });
  report.pages.push({ label: p.label, H: info.H, broken: info.broken.length, missingLinks: missing, overflowX: info.overflowX, fonts: info.fonts, accordion: `${before}->${after}`, brokenSrc: info.broken.slice(0,4), errors: errors.slice(0, 5) });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 1));





