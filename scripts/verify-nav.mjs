import path from "node:path";
import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const root = path.resolve("docs/preview");
const toUrl = (f) => "file:///" + path.join(root, f).replace(/\\/g, "/");

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"],
  defaultViewport: { width: 1440, height: 1000 }, protocolTimeout: 120000,
});
const p = await browser.newPage();
const steps = [];
const errs = [];
p.on("pageerror", (e) => errs.push(e.message.slice(0, 90)));

async function open(file, label) {
  await p.goto(toUrl(file), { waitUntil: "load", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 500));
  const info = await p.evaluate(() => ({ h1: document.querySelector("h1,h2")?.textContent?.trim().slice(0, 40), url: location.pathname.split("/preview/")[1] }));
  steps.push({ label, ...info });
  return info;
}

await open("index.html", "home");

// click the "Tentang Kami" nav link
await p.evaluate(() => {
  const a = [...document.querySelectorAll("header a")].find((x) => x.textContent.trim() === "Tentang Kami");
  a.click();
});
await new Promise((r) => setTimeout(r, 900));
steps.push({ label: "nav->tentang", ...(await p.evaluate(() => ({ h1: document.querySelector("h1")?.textContent?.trim().slice(0, 40), url: location.pathname.split("/preview/")[1] }))) });

// click Hubungi Kami in footer
await p.evaluate(() => {
  const a = [...document.querySelectorAll("footer a")].find((x) => x.textContent.trim() === "Hubungi Kami");
  a.click();
});
await new Promise((r) => setTimeout(r, 900));
steps.push({ label: "footer->hubungi", ...(await p.evaluate(() => ({ h1: document.querySelector("h1")?.textContent?.trim().slice(0, 40), url: location.pathname.split("/preview/")[1] }))) });

// click Home
await p.evaluate(() => {
  const a = [...document.querySelectorAll("header a")].find((x) => x.textContent.trim() === "Home");
  a.click();
});
await new Promise((r) => setTimeout(r, 900));
steps.push({ label: "nav->home", ...(await p.evaluate(() => ({ h1: document.querySelector("h1")?.textContent?.trim().slice(0, 40), url: location.pathname.split("/preview/")[1] }))) });

console.log(JSON.stringify({ steps, errs: errs.slice(0, 4) }, null, 1));
await browser.close();
process.exit(0);
