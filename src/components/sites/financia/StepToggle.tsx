"use client";

import { useState } from "react";

type Step = { title: string; body: string; highlight?: string };

/** Splits a body around an optional highlighted phrase so the source's red
 *  "Hubungi Kami" span survives without shipping raw HTML. */
function Body({ body, highlight }: { body: string; highlight?: string }) {
  if (!highlight || !body.includes(highlight)) {
    return <p className="text-[15px] leading-[27.86px] text-[#4B4F58]">{body}</p>;
  }
  const [before, ...rest] = body.split(highlight);
  return (
    <p className="text-[15px] leading-[27.86px] text-[#4B4F58]">
      {before}
      <strong className="font-bold text-red-600">{highlight}</strong>
      {rest.join(highlight)}
    </p>
  );
}

export function StepToggle({ items }: { items: Step[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => {
        const open = active === i;
        return (
          <div key={item.title}>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setActive(open ? null : i)}
              className="flex w-full items-start gap-[15px] p-[15px] text-left text-[15px] font-bold text-[#4B4F58] transition-colors hover:text-[#3A3A3A]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className={`mt-[5px] shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
              >
                <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <span className="text-[15px] leading-[15px]">{item.title}</span>
            </button>
            <div
              className={`overflow-hidden px-[15px] transition-all duration-300 ${
                open ? "max-h-[600px] pb-[15px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <Body body={item.body} highlight={item.highlight} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

