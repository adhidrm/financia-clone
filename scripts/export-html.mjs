/**
 * Snapshot the cloned routes into a self-contained static HTML folder that
 * works from file:// with no server and no Node.
 *
 *   node scripts/export-html.mjs [baseUrl] [outDir]
 *   node scripts/export-html.mjs http://localhost:3100 docs/preview
 */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = (process.argv[2] || "http://localhost:3100").replace(/\/$/, "");
const OUT = process.argv[3] || "docs/preview";

/** route -> output file relative to OUT. depth drives relative link rewriting. */
const PAGES = [
  { route: "/", file: "index.html", depth: 0, title: "Jum'at - Beranda" },
  { route: "/tentang-kami/", file: "tentang-kami/index.html", depth: 1, title: "Tentang Kami" },
  { route: "/hubungi-kami/", file: "hubungi-kami/index.html", depth: 1, title: "Hubungi Kami" },
];

const up = (depth) => (depth === 0 ? "" : "../".repeat(depth));

/** Count-up replay for the static snapshot, matching the React Counter. */
const COUNTER_JS = `
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nodes = [].slice.call(document.querySelectorAll('[data-count-to]'));
  if (!nodes.length) return;
  function render(el, n) { el.textContent = n + (el.getAttribute('data-count-suffix') || ''); }
  function run(el) {
    var target = Number(el.getAttribute('data-count-to')) || 0;
    if (reduce || !('IntersectionObserver' in window)) { render(el, target); return; }
    var started = false;
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting || started) return;
      started = true;
      io.disconnect();
      var t0 = performance.now();
      (function tick(t) {
        var p = Math.min((t - t0) / 2000, 1);
        render(el, Math.round(target * p));
        if (p < 1) requestAnimationFrame(tick);
      })(performance.now());
    }, { threshold: 0.2 });
    io.observe(el);
  }
  nodes.forEach(run);
})();`;

/** Rewrite an internal href for file:// use. */
function rewriteHref(rawHref, depth) {
  const p = up(depth);
  const [pathPart, hash] = rawHref.split("#");
  const norm = pathPart.replace(/\/+$/, "") || "/";
  const suffix = hash ? `#${hash}` : "";
  if (norm === "/") return `${p}index.html${suffix}`;
  if (norm === "/tentang-kami") return `${p}tentang-kami/index.html${suffix}`;
  if (norm === "/hubungi-kami") return `${p}hubungi-kami/index.html${suffix}`;
  return rawHref;
}

function emptyDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  for (const entry of fs.readdirSync(dir)) {
    try {
      fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
    } catch {
      /* a locked file; it will be overwritten where it matters */
    }
  }
}

emptyDir(OUT);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files"],
  defaultViewport: { width: 1440, height: 1000 },
  protocolTimeout: 180000,
});

const fontFiles = new Set();

for (const page of PAGES) {
  const tab = await browser.newPage();
  await tab.goto(`${BASE}${page.route}`, { waitUntil: "networkidle2", timeout: 120000 });
  await tab.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 70));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 1200));
  // let the scroll-triggered counters finish (2000ms animation) before snapshotting
  await new Promise((r) => setTimeout(r, 2200));

  // Collect every CSS rule the page actually uses.
  const css = await tab.evaluate(() => {
    const out = [];
    for (const sheet of document.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of rules) out.push(rule.cssText);
    }
    return out.join("\n");
  });

  // Markup without the React runtime.
  const html = await tab.evaluate(() => {
    document.querySelectorAll("nextjs-portal, script, link[rel=stylesheet], link[rel=preload], link[rel=prefetch]").forEach((n) => n.remove());
    document.querySelectorAll("[data-nextjs-toast], [data-nextjs-scroll-focus-boundary]").forEach((n) => n.remove());
    return "<!doctype html>\n" + document.documentElement.outerHTML;
  });
  await tab.close();

  // --- rewrite CSS -------------------------------------------------------
  let cssOut = css
    .replace(/url\(\s*["']?\/_next\/static\/media\//g, `url("${up(page.depth)}fonts/`)
    .replace(/url\(\s*["']?\.\.\/media\//g, `url("${up(page.depth)}fonts/`)
    .replace(/url\(\s*["']?\/__nextjs_font\//g, `url("${up(page.depth)}fonts/`)
    .replace(/@font-face\s*{[^}]*__nextjs-[^}]*}/g, "");

  // --- rewrite markup ----------------------------------------------------
  let out = html
    // next/image serves local files through /_next/image; use the raw asset
    .replace(/(<img[^>]*?)srcset="[^"]*"/g, "$1")
    .replace(/(<img[^>]*?)sizes="[^"]*"/g, "$1")
    .replace(/src="\/_next\/image\?url=([^"&]+)[^"]*"/g, (_m, u) => `src="${decodeURIComponent(u)}"`)
    // The Google Maps embed DOES render from file:// (verified in Chrome: the
    // frame navigates to google.com/maps/embed and paints tiles). Keep it.
    // Do not swap it for a caption div again — that is what left the footer
    // map as an empty blue box in the exported HTML.
    // assets resolved against the page folder
    .replace(/src="\/sites\//g, `src="${up(page.depth)}sites/`)
    .replace(/href="\/sites\//g, `href="${up(page.depth)}sites/`)
    .replace(/url\((['"]?)\/sites\//g, (_m, q) => `url(${q}${up(page.depth)}sites/`)
    .replace(/<link rel="icon"[^>]*>/g, "");

  // internal route links
  out = out.replace(/href="(\/(?:tentang-kami|hubungi-kami)?\/?(?:#[^"]*)?)"/g, (_m, href) => `href="${rewriteHref(href, page.depth)}"`);

  // --- interaction shim (no React) --------------------------------------
  const shim = `
(function () {
  function togglePanel(btn, open) {
    var panel = btn.nextElementSibling;
    if (!panel) return;
    panel.classList.toggle('max-h-0', !open);
    panel.classList.toggle('opacity-0', !open);
    panel.classList.toggle('max-h-\\\\[600px\\\\]', open);
    panel.classList.toggle('pb-\\\\[15px\\\\]', open);
    panel.classList.toggle('opacity-100', open);
    var caret = btn.querySelector('svg');
    if (caret) caret.classList.toggle('rotate-90', open);
    btn.setAttribute('aria-expanded', String(open));
  }
  document.querySelectorAll('button[aria-expanded]').forEach(function (btn) {
    if (btn.getAttribute('aria-label') === 'Menu') return;
    btn.addEventListener('click', function () {
      togglePanel(btn, btn.getAttribute('aria-expanded') !== 'true');
    });
  });
  var menuBtn = document.querySelector('button[aria-label="Menu"]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var open = menu.hasAttribute('hidden');
      if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }
})();`;

  out = out.replace("</body>", `  <script>${shim}</script>\n</body>`);
  out = out.replace("</head>", `  <link rel="stylesheet" href="styles.css">\n</head>`);

  // counters: React owns the number, so the snapshot can catch 0 mid-animation.
  // Re-render them from the data attributes and replay the count-up on view.
  out = out.replace(/<span[^>]*data-counter="(\d+)"[^>]*data-counter-suffix="([^"]*)"[^>]*>[\s\S]*?<\/span>/g, (_m, value, suffix) => {
    return `<span data-count-to="${value}" data-count-suffix="${suffix}">${value}${suffix}</span>`;
  });
  out = out.replace("</body>", "  <script>\n" + COUNTER_JS + "\n  </script>\n</body>");

  const target = path.join(OUT, page.file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, out);
  fs.writeFileSync(path.join(path.dirname(target), "styles.css"), cssOut);

  // remember font files referenced by the CSS
  for (const m of cssOut.matchAll(/url\(\s*["']?[^"')]*fonts\/([^"')]+)["']?\s*\)/g)) fontFiles.add(m[1]);

  console.log(`wrote ${page.file}  html ${(out.length / 1024).toFixed(0)}kB  css ${(cssOut.length / 1024).toFixed(0)}kB`);
}

// --- copy assets ---------------------------------------------------------
fs.cpSync("public/sites", path.join(OUT, "sites"), { recursive: true });
fs.mkdirSync(path.join(OUT, "fonts"), { recursive: true });
await Promise.all(
  [...fontFiles].map(async (name) => {
    try {
      const res = await fetch(`${BASE}/_next/static/media/${name}`);
      if (!res.ok) return;
      fs.writeFileSync(path.join(OUT, "fonts", name), Buffer.from(await res.arrayBuffer()));
    } catch {
      /* fall back to the system stack */
    }
  }),
);

await browser.close();

const count = fs.readdirSync(OUT, { recursive: true }).length;
console.log(`\nexported -> ${OUT} (${count} files)`);
