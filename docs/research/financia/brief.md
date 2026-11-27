# Financia clone — page brief

Sources:
- <https://financia.co.id/> (homepage; WordPress/Elementor + Astra)
- <https://financia.proximalab.fyi/tentang-kami/> and `/hubungi-kami/` (staging mirror, newer design)

Deliverables:
- Next.js App Router clone: `/`, `/tentang-kami/`, `/hubungi-kami/`
- Offline static build: [`docs/preview/index.html`](../../preview/index.html) (open with a browser, no Node)

## Route map

| Source | Local | Owner |
| --- | --- | --- |
| financia.co.id `/` | `/` | [`src/app/page.tsx`](../../../src/app/page.tsx), [`data.ts`](../../../src/components/sites/financia/data.ts) |
| proximalab `/tentang-kami/` | `/tentang-kami/` | [`src/app/tentang-kami/page.tsx`](../../../src/app/tentang-kami/page.tsx) |
| proximalab `/hubungi-kami/` | `/hubungi-kami/` | [`src/app/hubungi-kami/page.tsx`](../../../src/app/hubungi-kami/page.tsx) |
| shared chrome | all routes | [`SiteHeader.tsx`](../../../src/components/sites/financia/SiteHeader.tsx), [`SiteFooter.tsx`](../../../src/components/sites/financia/SiteFooter.tsx) |
| `/biaya-komisi` (nav submenu) | out of scope, links to financia.co.id | `data.ts` |

Static output: `docs/preview/index.html`, `docs/preview/tentang-kami/index.html`, `docs/preview/hubungi-kami/index.html`, each with its own `styles.css` and shared `sites/` + `fonts/` assets.

## Design tokens

Homepage (financia.co.id):
- Poppins 700 headings, `#3A3A3A`; body `#4B4F58` 15px/27.86.
- Blue `#0046BE`, yellow `#FFD600`, teal `#09AEB8` header CTA.
- Button `border-radius: 25px 0 25px 0`, padding `15px 40px`.

Staging pages (proximalab) — same design system as the homepage, not a newer one:
- Poppins **700** headings, letter-spacing normal, colour `#3A3A3A` (60px/78px section titles, 41px/53.3 photo bands).
- Body `#4B4F58` 15px/27.86, justified in article columns.
- Yellow `#FFD600` page-title band (100px top pad) with a 3×25px vertical rule under the title.
- Buttons `25px 0` radius, `#FFD600`, white 700 text (20px in content CTAs, 15px in bands).
- Header `Hubungi Kami` is a teal `#09AEB8` block with white uppercase text; in-page anchors
  (`Cara Kerja Kami`, `Jenis Utang`, `Klien/Mitra`) render yellow on the homepage.
- Footer identical structure to the homepage clone.

## Section order

`/` (unchanged from the first pass): header → hero → Tentang Kami → Cara Kerja Kami → GRATIS banner → Jenis Hutang → Klien/Mitra → CTA banner → Kenapa Financia? → Tolak Ukur → FAQ → footer.

`/tentang-kami/`: yellow title band → logo + "Agensi Penagihan Hutang Terdepan & Terpercaya" → two-column article ("Apa itu Financia?") → photo CTA band → "Tahukah Anda?" survey with check list → blue "Alasan mengapa…" intro → check list + photo → GRATIS banner → footer.

`/hubungi-kami/`: yellow title band → photo + "Iya saya mau pakai Financia, bagaimana caranya?" with a 3-step accordion (Pertama/Kedua/Ketiga) + CTA → footer.

## Interactions

- Accordions: one panel open at a time, caret rotates. The exported HTML keeps this with ~30 lines of vanilla JS.
- Counters animate 0 → 100% / 155+ / 125 over 2000ms on scroll into view; the export waits for them to settle, so the static page shows final values.
- Mobile ≤ lg: hamburger reveals a dropdown nav.
- All header/footer/nav links resolve between the three cloned routes.

## Added effect layer (not in the source)

The source only declares `transition: 0.3s` on buttons — no entrance or scroll motion. These are deliberate additions, kept CSS-only so the static export retains them, with a safe static fallback:

| Effect | Trigger | Implementation |
| --- | --- | --- |
| CTA lift + shadow + brighten | hover | `main a[href*="whatsapp"]:hover` |
| CTA settle | press | `:active` |
| Nav/footer link tint to yellow | hover | `header a:hover`, `footer a:hover` |
| Image scale 1.02 | hover | `main img:hover` |
| Section fade-up | scroll into view | `animation-timeline: view()` (no JS) |
| Smooth anchor scroll | click | `html { scroll-behavior: smooth }` |
| Focus ring | keyboard | `:focus-visible` |

Guards: everything is wrapped in `@media (prefers-reduced-motion: no-preference)`; unsupported browsers ignore `animation-timeline` and render instantly at the end state; `@media print` forces all sections visible; `main > section:first-child` is excluded from the scroll reveal so the page never opens blank.

Verified offline: hover produces `translateY(-2px)` + shadow; sections move from 0 to 1 opacity on entry; 0 broken images; 0 dead internal links; no horizontal overflow.

## Known gaps (deliberate, not pixel-perfect)


- Shared header/footer now match the source: teal `Hubungi Kami` block, yellow active state on
  the current page and its homepage anchors, Poppins 700 throughout. Both staging pages use the
  homepage's 2022 type system.
- `financia.co.id/` now 307-redirects to `/home/` and serves a Cloudflare challenge to plain
  requests; `financia.proximalab.fyi/` returned a PHP fatal error (memory) on one probe. Header
  and type evidence came from `financia.proximalab.fyi/tentang-kami/` + `/hubungi-kami/` plus
  the cached captures in `raw/`.
- Staging pages are reproduced at correct structure, copy, type and colour, not to the pixel: section heights land within roughly ±10–15% of source (e.g. `/hubungi-kami/` 1557px vs 1665px).
- Google Maps is an `<iframe>` in Next and is replaced by a text caption in the static export (it cannot load from `file://`).
- `/biaya-komisi`, `/tentang-kami` legacy links and the WhatsApp CTAs beyond the cloned routes still go to the live sites.
- Accordion bodies are collapsed in the static export, matching a fresh page load.
