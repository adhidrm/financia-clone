import Image from "next/image";
import { SiteHeader } from "@/components/sites/financia/SiteHeader";
import { SiteFooter } from "@/components/sites/financia/SiteFooter";
import { Counter } from "@/components/sites/financia/Counter";
import { Toggle } from "@/components/sites/financia/Toggle";
import {
  ABOUT_COLUMNS,
  CLIENT_ROWS,
  DEBT_TYPES,
  FAQ,
  METRICS,
  STEPS,
  WHATSAPP,
  WHY,
} from "@/components/sites/financia/data";

export default function Home() {
  return (
    <>
      <SiteHeader active="/" />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <FreeBanner />
        <DebtTypes />
        <Clients />
        <CtaBanner />
        <WhyFinancia />
        <Metrics />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}

const BTN =
  "inline-block rounded-[25px_0] bg-[#FFD600] px-[40px] py-[15px] text-[15px] font-bold uppercase leading-none text-white";

function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <>
      <h2
        id={id}
        className="text-center text-[20px] font-bold leading-[26px] text-[#3A3A3A] md:text-[60px] md:leading-[78px]"
      >
        {children}
      </h2>
      <div className="mt-[20px] h-px w-full bg-[#F1F1F1]" />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-[20px] pb-[100px] pt-[170px] text-center md:px-0 md:pb-[263px] md:pt-[263px]">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/sites/financia/bg/pexels-pixabay-327540.jpg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-[#E8E8E8]/70" />
      <div className="mx-auto max-w-[1200px]">
        <h1 className="text-[19px] font-bold leading-[26.6px] text-[#3A3A3A]">
          JASA PENAGIH HUTANG TERDEPAN DAN TERPERCAYA DI INDONESIA
        </h1>
        <h2 className="mx-auto mt-[70px] max-w-[980px] text-[32px] font-bold leading-[41.6px] text-[#3A3A3A] md:text-[47px] md:leading-[61.1px]">
          Selamat Datang di Website Resmi Financia
        </h2>
        <p className="mx-auto mt-[20px] text-[13.68px] leading-[25.4057px] text-[#4B4F58] md:text-[15px] md:leading-[27.8571px]">
          Simpan waktu dan usaha Anda untuk mengelola bisnis, biar kami yang urus penagihan hutang komersial untuk Anda!
        </p>
        <a href="#tentang" className={`${BTN} mt-[44px]`}>
          Pelajari lebih lanjut Tentang Financia
        </a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="mx-auto max-w-[1140px] px-[20px] md:px-[10px]">
      <div className="pt-[60px]">
        <SectionTitle id="tentang">Tentang Kami</SectionTitle>
      </div>

      <div className="mt-[24px] text-center">
        <Image
          src="/sites/financia/logos/financia-logo.png"
          alt="FINANCIA"
          width={768}
          height={317}
          className="mx-auto h-auto w-full max-w-[392px]"
        />
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] pb-[30px] pt-0 md:grid-cols-2">
        {ABOUT_COLUMNS.map((col) => (
          <div key={col.heading} className="px-0 md:px-[50px]">
            <p className="text-[13.68px] font-bold leading-[25.4057px] text-[#4B4F58] md:text-[15px] md:leading-[27.8571px]">
              {col.heading}
            </p>
            {col.paragraphs.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="mt-[24px] text-justify text-[13.68px] leading-[25.4057px] text-[#4B4F58] md:text-[15px] md:leading-[27.8571px]"
              >
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="pb-[30px] text-center">
        <a href="https://financia.co.id/tentang-kami/" className={BTN}>
          Ketahui lebih dalam soal Financia
        </a>
      </div>
    </section>
  );
}

const STEP_ICONS = {
  edit: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M11 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" />
    </svg>
  ),
  mail: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  ),
  money: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M2 16h20v4H2z" />
      <path d="M12 3v3" />
      <path d="M8.5 9.5a3.5 3.5 0 0 1 7 0" />
      <path d="M9 13h6" />
      <path d="M9 16a3 3 0 0 0 6 0" />
    </svg>
  ),
} as const;

function HowItWorks() {
  return (
    <section id="cara-kerja" className="relative isolate overflow-hidden pb-[50px] pt-[100px]">
      <div className="absolute inset-0 -z-10 bg-white" />
      <div className="absolute inset-0 -z-10 bg-[#E8E8E8]/50" />
      <div className="mx-auto max-w-[1200px] px-[10px]">
        <SectionTitle>Cara Kerja Kami</SectionTitle>
        <p className="mx-auto mt-[25px] max-w-[980px] text-center text-[13.68px] leading-[25.4057px] text-[#4B4F58] md:text-[15px] md:leading-[27.8571px]">
          Financia Menerapkan Strategi Komprehensif Agar Proses Penagihan Hutang Komersial Lebih Efektif &amp; Memberikan Tingkat Keberhasilan Tinggi
        </p>

        <div className="mx-auto max-w-[780px]">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center gap-[15px] pt-[100px] text-center md:flex-row md:items-start md:text-left"
            >
              <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full border-[3px] border-[#69727D] text-[#69727D]">
                {STEP_ICONS[step.icon]}
              </div>
              <div className="md:w-[689px]">
                <h6 className="text-[24px] font-bold leading-[25px] text-[#3A3A3A] md:text-[18px]">
                  {step.title}
                  {step.subtitle ? (
                    <>
                      <br />
                      {step.subtitle}
                    </>
                  ) : null}
                </h6>
                <p className="mt-[5px] text-[13.68px] leading-[25.4057px] text-[#4B4F58] md:text-justify md:text-[15px] md:leading-[27.8571px]">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FreeBanner() {
  return (
    <section className="bg-[#0046BE] px-[10px] pb-[70px] pt-[50px] text-center">
      <h5 className="mx-auto max-w-[1120px] text-[31px] font-bold leading-[37.2px] text-white">
        &ldquo;GRATIS, Jika Hutang Belum Dibayar!&rdquo;
      </h5>
      <a href={WHATSAPP} className={`${BTN} mt-[20px]`}>
        HUBUNGI FINANCIA
      </a>
    </section>
  );
}

function IconList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className="flex text-[13.68px] leading-[25.4057px] text-[#4B4F58] md:text-[15px] md:leading-[27.8571px]">
          <span className="flex w-[18px] shrink-0 justify-center pt-[7px]">
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="text-[#4B4F58]" fill="currentColor">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </span>
          <span className="pl-[5px]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DebtTypes() {
  return (
    <section id="jenis-utang" className="mx-auto max-w-[1140px] px-[20px] md:px-0">
      <div className="pt-[50px] md:pt-[100px]">
        <SectionTitle>Jenis Hutang</SectionTitle>
      </div>

      <div className="grid gap-x-[20px] pb-[100px] pt-[26px] md:grid-cols-2">
        <div>
          <p className="text-[13.68px] leading-[25.4057px] text-[#4B4F58] md:text-[15px] md:leading-[27.8571px]">
            {DEBT_TYPES.intro}
          </p>
          <IconList items={DEBT_TYPES.items} className="mt-[44px]" />
        </div>
        <div>
          <p className="mt-[50px] text-[13.68px] leading-[25.4057px] text-[#4B4F58] md:mt-0 md:text-[15px] md:leading-[27.8571px]">
            {DEBT_TYPES.industriesIntro}
          </p>
          <IconList items={DEBT_TYPES.industries} className="mt-[95px]" />
        </div>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section id="klien-mitra" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-white" />
      <div className="absolute inset-0 -z-10 bg-[#E8E8E8]/50" />
      <div className="mx-auto max-w-[1140px] px-[20px] md:px-[10px]">
        <div className="pt-[50px] md:pt-[100px]">
          <SectionTitle>Klien/Mitra</SectionTitle>
        </div>

        {/* source hides the entire logo grid on mobile */}
        <div className="hidden pb-[100px] pt-[50px] md:block">
          {CLIENT_ROWS.map((row, ri) => (
            <div
              key={ri}
              className="mx-auto grid max-w-[1200px] grid-cols-2 items-center justify-items-center py-[50px] md:grid-cols-4"
            >
              {row.cells.map((cell, ci) => (
                <div key={ci} className="flex h-full w-full items-center justify-center">
                  {cell.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cell.src}
                      alt=""
                      width={cell.w}
                      height={cell.h}
                      style={{ width: cell.w, height: cell.h }}
                      className="max-w-full object-contain"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="relative isolate overflow-hidden py-[150px] text-center">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/sites/financia/bg/pexels-pixabay-327540.jpg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-black/50" />
      <h2 className="px-[10px] text-[18px] font-bold leading-[23.4px] text-white md:text-[41px] md:leading-[53.3px]">
        FINANCIA, AGENSI JASA PENAGIH HUTANG TERDEPAN DAN TERPERCAYA DI INDONESIA
      </h2>
      <p className="mt-[20px] px-[10px] text-[11px] font-bold leading-[20.4286px] text-white md:text-[19px] md:leading-[35.2857px]">
        Simpan waktu dan usaha Anda untuk mengelola bisnis, biar kami yang urus penagihan utang komersial untuk Anda!
      </p>
      <a href={WHATSAPP} className={`${BTN} mt-[51px]`}>
        HUBUNGI KAMI
      </a>
    </section>
  );
}

function WhyFinancia() {
  return (
    <section className="mx-auto max-w-[1140px] px-[20px] md:px-0">
      <div className="grid items-center lg:grid-cols-[447px_1fr]">
        <Image
          src="/sites/financia/logos/financia-logo.png"
          alt="FINANCIA"
          width={768}
          height={317}
          className="mx-auto h-auto w-full max-w-[447px]"
        />
        <div className="text-center md:px-[100px] md:py-[100px] md:text-left">
          <h2 className="text-[20px] font-bold leading-[26px] text-[#3A3A3A] md:text-[60px] md:leading-[78px]">
            Kenapa
            <br />
            Financia?
          </h2>
          <Toggle className="mt-[20px] text-left" items={WHY.map((w) => ({ title: w.title, body: w.body }))} />
          <a href={WHATSAPP} className={`${BTN} mt-[25px]`}>
            HUBUNGI KAMI
          </a>
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  return (
    <section className="relative isolate overflow-hidden py-[70px] text-center md:py-[100px]">
      <div className="absolute inset-0 -z-10 bg-white" />
      <div className="absolute inset-0 -z-10 bg-[#E8E8E8]/50" />
      <h4 className="text-center text-[22.8px] font-bold leading-[27.36px] text-[#3A3A3A] md:text-[45px] md:leading-[54px]">
        Tolak Ukur Financia...
      </h4>
      <div className="mt-[70px] grid md:grid-cols-3">
        {METRICS.map((m) => (
          <div key={m.title} className="relative isolate overflow-hidden px-[20px] py-[40px] text-left md:px-[70px] md:py-[70px]">
            <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url('${m.bg}')` }} />
            <div className="absolute inset-0 -z-10 bg-white/80" />
            <div className="font-josefin text-center text-[70px] font-semibold leading-[70px] text-[#4B4F58] md:text-[100px] md:leading-[100px]">
              <Counter value={m.value} suffix={m.suffix} />
            </div>
            <p className="mt-[5px] text-[19px] leading-[28.5px] text-[#4B4F58]">{m.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-[1140px] px-[20px] md:px-0">
      <div className="grid items-start pb-[100px] lg:grid-cols-[433px_1fr]">
        <div className="pt-[100px]">
          <Image
            src="/sites/financia/img/faq.jpg"
            alt="jasa penagih hutang"
            width={684}
            height={1024}
            className="h-[340px] w-full object-cover lg:h-[433px] lg:w-[433px]"
          />
        </div>
        <div className="text-center md:px-[100px] md:py-[100px] md:text-left">
          <h2 className="text-[20px] font-bold leading-[26px] text-[#3A3A3A] md:text-[60px] md:leading-[78px]">FAQ</h2>
          <p className="mt-[14px] text-[13.68px] font-bold leading-[25.4057px] text-[#4B4F58] md:text-[15px] md:leading-[27.8571px]">
            Pertanyaan yang Sering Diajukan (FAQ)
          </p>
          <Toggle className="mt-[45px] text-left" items={FAQ.map((f) => ({ title: f.q, body: f.a }))} />
        </div>
      </div>
    </section>
  );
}
