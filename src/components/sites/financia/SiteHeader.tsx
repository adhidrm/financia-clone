"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV, WHATSAPP_CONSULT, type SiteRoute } from "./data";

export function SiteHeader({ active }: { active?: SiteRoute }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="relative z-[99]">
      <div className="mx-auto flex h-[108px] max-w-[1170px] items-center justify-between px-[10px] md:h-[106px]">
        <Link href="/" className="flex h-full items-center">
          <Image
            src="/sites/financia/logos/financia-logo-small.png"
            alt="FINANCIA"
            width={300}
            height={254}
            className="h-[88px] w-[104px] object-contain md:h-[86px] md:w-[102px]"
            priority
          />
        </Link>

        <nav className="hidden items-center lg:flex">
          {NAV.map((item) => {
            const isActive = item.active != null && item.active === active;

            if (item.variant === "teal") {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="ml-[15px] bg-[#09AEB8] px-[15px] py-[15px] text-[14px] font-bold uppercase leading-none text-white hover:text-white"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  aria-current={item.active != null && item.active === active ? "page" : undefined}
                  className={`flex items-center gap-[6px] px-[15px] py-[15px] text-[14px] font-bold leading-none ${
                    isActive ? "text-[#FFD600]" : "text-[#3A3A3A]"
                  }`}
                >
                  {item.label}
                  {item.children ? <Caret /> : null}
                </Link>
                {item.children ? (
                  <div className="invisible absolute left-0 top-full w-[220px] bg-white opacity-0 shadow-sm transition group-hover:visible group-hover:opacity-100">
                    {item.children.map((c) =>
                      c.external ? (
                        <a
                          key={c.label}
                          href={c.href}
                          className="block px-[35px] py-[15px] text-[14px] font-bold text-[#3A3A3A] hover:text-[#FFD600]"
                        >
                          {c.label}
                        </a>
                      ) : (
                        <Link
                          key={c.label}
                          href={c.href}
                          className="block px-[35px] py-[15px] text-[14px] font-bold text-[#3A3A3A] hover:text-[#FFD600]"
                        >
                          {c.label}
                        </Link>
                      ),
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <a
          href={WHATSAPP_CONSULT}
          className="ml-[15px] hidden rounded-[25px_2px] bg-[#FFD600] px-[20px] py-[15px] text-[15px] font-bold uppercase leading-none text-black lg:block"
        >
          Konsultasi
        </a>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-[22px] leading-none text-[#494C4F] lg:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div
        data-mobile-menu
        hidden={!open}
        className="absolute right-[10px] top-[108px] w-[160px] bg-white py-[10px] shadow-md lg:hidden"
      >
          {NAV.flatMap((item) => [
            <Link
              key={item.label}
              href={item.href}
              className="block px-[15px] py-[10px] text-[16px] leading-[1.86] text-[#3A3A3A]"
            >
              {item.label}
            </Link>,
            ...(item.children ?? []).map((c) =>
              c.external ? (
                <a
                  key={c.label}
                  href={c.href}
                  className="block px-[30px] py-[10px] text-[16px] leading-[1.86] text-[#3A3A3A]"
                >
                  {c.label}
                </a>
              ) : (
                <Link
                  key={c.label}
                  href={c.href}
                  className="block px-[30px] py-[10px] text-[16px] leading-[1.86] text-[#3A3A3A]"
                >
                  {c.label}
                </Link>
              ),
            ),
          ])}
      </div>
    </header>
  );
}

function Caret() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1 2.5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
