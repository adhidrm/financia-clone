import Image from "next/image";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/sites/financia/SiteHeader";
import { SiteFooter } from "@/components/sites/financia/SiteFooter";
import {
  ABOUT_ARTICLE,
  FAILURE_REASONS,
  SURVEY_ITEMS,
  WHATSAPP,
} from "@/components/sites/financia/data";

export const metadata: Metadata = {
  title: "Tentang Kami - FINANCIA",
  description:
    "PT Garda Finansial Utama (Financia) adalah agensi penagihan hutang komersial yang praktis, efisien dan aman.",
};

// Source (financia.proximalab.fyi) is the 2022 Astra/Elementor design: Poppins 700,
// letter-spacing normal, #3A3A3A headings, 15px/27.86 #4B4F58 body.
const HEADING = "font-bold text-[#3A3A3A]";
const BODY = "text-[15px] leading-[27.86px] text-[#4B4F58] text-justify";
const CTA =
  "inline-block rounded-[25px_0] bg-[#FFD600] font-bold text-white uppercase";

export default function TentangKami() {
  return (
    <>
      <SiteHeader active="/tentang-kami/" />
      <main>
        {/* yellow page-title band */}
        <section className="bg-[#FFD600] pt-[100px]">
          <div className="mx-auto max-w-[1200px] px-[20px] text-center md:px-0">
            <h2 className={`${HEADING} text-[30px] leading-[39px] md:text-[60px] md:leading-[78px]`}>Tentang Kami</h2>
            <div className="mt-[30px] flex h-[84px] items-start justify-center">
              <span className="block h-[25px] w-[3px] bg-[#222529]" />
            </div>
          </div>
        </section>

        {/* logo + tagline */}
        <section className="pb-[100px]">
          <div className="mx-auto max-w-[1140px] px-[20px] pt-[15px] text-center md:px-0">
            <Image
              src="/sites/financia/logos/financia-logo-full.png"
              alt="FINANCIA"
              width={800}
              height={330}
              className="mx-auto h-auto w-full max-w-[538px]"
              priority
            />
            <h1 className={`${HEADING} mt-[30px] text-[19px] leading-[26.6px]`}>
              Agensi Penagihan Hutang Terdepan &amp; Terpercaya
            </h1>
          </div>
        </section>

        {/* article: two columns */}
        <section>
          <div className="mx-auto grid max-w-[1200px] gap-[40px] px-[20px] md:grid-cols-2 md:gap-0 md:px-0">
            <div className="md:px-[50px]">
              <h2 className={`${HEADING} text-[30px] leading-[39px] md:text-[60px] md:leading-[78px]`}>{ABOUT_ARTICLE[0].heading}</h2>
              {ABOUT_ARTICLE[0].paragraphs.map((p, i) => (
                <p key={i} className={`${BODY} mt-[20px]`}>
                  {p}
                </p>
              ))}
            </div>
            <div className="md:px-[50px] md:pt-[60px]">
              {ABOUT_ARTICLE[1].paragraphs.map((p, i) => (
                <p key={i} className={`${BODY} mb-[20px]`}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band over photo */}
        <section className="relative isolate mt-[80px] overflow-hidden px-[20px] py-[150px] text-center">
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: "url('/sites/financia/bg/pexels-pixabay-327540.jpg')" }}
          />
          <div className="absolute inset-0 -z-10 bg-black/50" />
          <div className="mx-auto max-w-[1200px]">
            <h2 className={`${HEADING} text-[24px] leading-[1.15] text-white md:text-[41px] md:leading-[53.3px]`}>
              FINANCIA, AGENSI PENAGIHAN HUTANG
              <br />
              TERDEPAN DAN TERPERCAYA DI INDONESIA
            </h2>
            <p className="mx-auto mt-[30px] max-w-[1000px] text-[15px] leading-[24px] font-normal text-white md:text-[19px] md:leading-[35.29px]">
              Simpan waktu dan usaha Anda untuk mengelola bisnis, biar kami yang urus penagihan hutang komersial untuk Anda!
            </p>
            <a href={WHATSAPP} className={`${CTA} mt-[30px] px-[24px] py-[12px] text-[20px] leading-[20px]`}>
              HUBUNGI KAMI
            </a>
          </div>
        </section>

        {/* survey */}
        <section className="py-[100px]">
          <div className="mx-auto grid max-w-[1200px] items-start gap-[40px] px-[20px] md:grid-cols-2 md:gap-[60px] md:px-0">
            <Image
              src="/sites/financia/img/tentang-survey.jpg"
              alt=""
              width={640}
              height={427}
              className="h-auto w-full max-w-[570px]"
            />
            <div>
              <h2 className={`${HEADING} text-[24px] leading-[31px] md:text-[60px] md:leading-[78px]`}>
                Tahukah Anda ? Data survei menunjukkan bahwa:
              </h2>
              <CheckList items={SURVEY_ITEMS} className="mt-[30px]" />
            </div>
          </div>
        </section>

        {/* reasons intro on blue */}
        <section className="bg-[#0046BE] py-[45px]">
          <div className="mx-auto max-w-[1140px] px-[20px] text-center md:px-0">
            <h2 className={`${HEADING} text-[24px] leading-[31px] text-white md:text-[60px] md:leading-[78px]`}>
              Alasan mengapa banyak perusahaan gagal menagih utang?
            </h2>
            <p className="mt-[30px] text-left text-[15px] leading-[27.86px] text-white">
              Hutang adalah bagian dari perjanjian atau kontrak yang semestinya harus dipenuhi. Meskipun demikian, sekalipun
              pihak yang berutang atau debitor sudah berada dalam keadaan tidak membayar utang yang telah jatuh waktu
              (default), nyatanya banyak perusahaan selaku pemilik tagihan/piutang (accounts receivable) atau kreditor
              terkendala dalam melakukan penagihan. Mengapa demikian?
            </p>
          </div>
        </section>

        {/* reasons list + photo */}
        <section className="py-[100px]">
          <div className="mx-auto grid max-w-[1200px] items-start gap-[40px] px-[20px] md:grid-cols-2 md:gap-[60px] md:px-0">
            <CheckList items={FAILURE_REASONS} className="md:pt-[60px]" />
            <Image
              src="/sites/financia/img/tentang-reasons.jpg"
              alt=""
              width={640}
              height={959}
              className="h-auto w-full max-w-[382px] md:ml-[15px]"
            />
          </div>
        </section>

        {/* GRATIS banner */}
        <section className="bg-[#0046BE] px-[20px] py-[50px] text-center">
          <h5 className={`${HEADING} text-[24px] leading-[31px] text-white md:text-[31px] md:leading-[31px]`}>
            &ldquo;GRATIS, Jika Hutang Belum Dibayar!&rdquo;
          </h5>
          <a href={WHATSAPP} className={`${CTA} mt-[30px] px-[24px] py-[12px] text-[15px] leading-[15px]`}>
            HUBUNGI FINANCIA
          </a>
          <div className="mx-auto mt-[40px] h-px max-w-[1110px] bg-white/30" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item, i) => (
        <li key={i} className="mb-[8px] flex gap-[10px] text-[15px] leading-[27.86px] text-[#4B4F58]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 512 512"
            fill="currentColor"
            aria-hidden="true"
            className="mt-[5px] shrink-0"
          >
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm113 175L234 318a20 20 0 0 1-28 0l-56-56a20 20 0 1 1 28-28l42 42 121-121a20 20 0 1 1 28 28z" />
          </svg>
          <span className="pl-[5px]">{item}</span>
        </li>
      ))}
    </ul>
  );
}
