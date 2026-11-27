"use client";

import { useState } from "react";

export function Toggle({
  items,
  className = "",
}: {
  items: { title: string; body: string }[];
  className?: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className={className}>
      {items.map((item, i) => {
        const open = active === i;
        return (
          <div key={item.title} className="border-b border-[#D5D8DC]">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setActive(open ? null : i)}
              className="flex w-full items-start gap-[8px] p-[15px] text-left text-[15px] font-bold leading-[15px] text-[#4B4F58]"
            >
              <Caret open={open} />
              <span>{item.title}</span>
            </button>
            <div
              className={`overflow-hidden px-[15px] text-[15px] leading-[27.8571px] text-[#4B4F58] transition-all ${
                open ? "max-h-[600px] pb-[15px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p>{item.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Caret({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`mt-[2px] shrink-0 text-[#4B4F58] transition-transform ${open ? "rotate-[270deg]" : ""}`}
    >
      <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
