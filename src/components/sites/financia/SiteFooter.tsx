import Image from "next/image";
import Link from "next/link";
import { CONTACT, NAV, WHATSAPP } from "./data";

const CONTACT_ICONS = {
  pin: (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 21l9-18 2 8 8 2z" />
    </svg>
  ),
  mail: (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 5h13v3h3l4 4v7H9v-3H2zM4 7v9h3V7zm11 3v9h5v-6h-4v-2z" />
    </svg>
  ),
  clock: (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l4 3" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
} as const;

export function SiteFooter() {
  return (
    <footer className="bg-[#0046BE] pt-[50px] text-white">
      <div className="mx-auto max-w-[1140px] px-[20px] pb-[30px] md:px-[10px]">
        <div className="grid gap-[40px] md:grid-cols-[292px_335px_1fr]">
          <div className="px-[10px]">
            <Image
              src="/sites/financia/logos/financia-logo.png"
              alt="FINANCIA"
              width={300}
              height={124}
              className="h-auto w-full max-w-[237px]"
            />
            <p className="mt-[20px] text-justify text-[13.68px] leading-[25.4057px] md:text-[15px] md:leading-[27.8571px]">
              PT Garda Finansial Utama (&ldquo;<strong>Financia</strong>&rdquo;) adalah perusahaan yang menyediakan jasa
              penagihan utang komersial yang praktis, efisien dan aman bagi Anda.
            </p>
          </div>

          <div className="px-[10px]">
            <h5 className="text-[18.24px] font-bold leading-[21.888px] md:text-[24px] md:leading-[28.8px]">Menu</h5>
            <ul className="mt-[20px]">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-[6px] py-[15px] text-[13.68px] font-bold leading-[15px] text-white md:text-[15px]"
                  >
                    {item.label}
                    {item.children ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M1 2.5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-[10px]">
            <h5 className="text-[18.24px] font-bold leading-[21.888px] md:text-[24px] md:leading-[28.8px]">
              Lokasi Kami :
            </h5>
            <div className="mt-[20px] h-[199px] w-full max-w-[489px] overflow-hidden">
              <iframe
                title="Sudirman Park, Unit A 3 BB. Jl. K.H. Mas Mansyur Kav. 35, Karet Tengsin."
                src="https://maps.google.com/maps?q=Sudirman%20Park%2C%20Unit%20A%203%20BB.%20Jl.%20K.H.%20Mas%20Mansyur%20Kav.%2035%2C%20Karet%20Tengsin.&t=m&z=10&output=embed&iwloc=near"
                loading="lazy"
                className="h-full w-full border-0"
              />
            </div>
            <div className="mt-[60px] text-center md:text-left">
              <a
                href={WHATSAPP}
                className="inline-block rounded-[25px_0] bg-[#FFD600] px-[40px] py-[15px] text-[15px] font-bold uppercase leading-none text-white"
              >
                HUBUNGI KAMI
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="py-[50px]">
        <div className="mx-auto grid max-w-[1140px] gap-[40px] px-[20px] text-center md:grid-cols-3 md:px-[10px] md:text-left">
          {CONTACT.map((c) => (
            <div key={c.title} className="flex items-start justify-center gap-[15px] md:justify-start">
              <div className="mt-[2px] shrink-0">{CONTACT_ICONS[c.icon]}</div>
              <div>
                <h6 className="text-[18.24px] font-bold leading-[22.8px] md:text-[18px] md:leading-[22.5px]">{c.title}</h6>
                {c.lines.map((line) => (
                  <p key={line} className="text-[13.68px] leading-[25.4057px] md:text-[15px] md:leading-[27.8571px]">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1140px] flex-col gap-[6px] px-[20px] py-[6px] text-center text-[10px] leading-[18.5714px] md:flex-row md:justify-between md:px-[10px] md:text-left">
        <p>Powered by Financia.co.id</p>
        <p>Copyright © 2020-2022. All rights reserved</p>
      </div>
    </footer>
  );
}
