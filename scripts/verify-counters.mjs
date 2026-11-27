import path from "node:path";
import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const root = path.resolve("docs/preview");
const url = (f) => "file:///" + path.join(root, f).replace(/\\/g, "/");

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files"],
  defaultViewport: { width: 1440, height: 1000 }, protocolTimeout: 120000,
});
const p = await browser.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(e.message.slice(0, 90)));

await p.goto(url("index.html"), { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 600));

const read = () => p.evaluate(() => [...document.querySelectorAll("[data-count-to]")].map((e) => e.textContent));

const atTop = await read();

// scroll the counters into view and sample over time
await p.evaluate(() => {
  const el = document.querySelector("[data-count-to]");
  el.scrollIntoView({ block: "center" });
});
const samples = [];
for (const ms of [150, 700, 1500, 2600]) {
  await new Promise((r) => setTimeout(r, ms === 150 ? 150 : ms - samples.at(-1).t));
  samples.push({ t: ms, v: await read() });
}

// reload at the counter position: value must already be final (SSR/no-JS path)
await p.goto(url("index.html"), { waitUntil: "load", timeout: 60000 });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; document.querySelector("[data-count-to]").scrollIntoView({ block: "center" }); });
await new Promise((r) => setTimeout(r, 150));
await p.reload({ waitUntil: "load" });
await new Promise((r) => setTimeout(r, 2500));
const afterReload = await read();

// no-JS check
await p.setJavaScriptEnabled(false);
await p.goto(url("index.html"), { waitUntil: "load", timeout: 60000 });
const noJs = await read();
await p.setJavaScriptEnabled(true);

await p.screenshot({ path: "docs/design-references/financia/fx-counters.png", fullPage: false, clip: { x: 0, y: 0, width: 1440, height: 1000 } });
console.log(JSON.stringify({ atTop, samples, afterReload, noJs, errs }, null, 1));
await browser.close();
process.exit(0);
