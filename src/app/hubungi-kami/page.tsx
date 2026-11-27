import Image from "next/image";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/sites/financia/SiteHeader";
import { SiteFooter } from "@/components/sites/financia/SiteFooter";
import { StepToggle } from "@/components/sites/financia/StepToggle";
import { CONTACT_STEPS, WHATSAPP } from "@/components/sites/financia/data";

export const metadata: Metadata = {
  title: "Hubungi Kami - FINANCIA",
  description:
    "Hubungi Financia untuk konsultasi awal gratis mengenai penagihan hutang komersial Anda.",
};

// Same 2022 Astra/Elementor type system as /tentang-kami/: Poppins 700, #3A3A3A,
// 15px/27.86 #4B4F58 body.
const HEADING = "font-bold text-[#3A3A3A]";
const CTA = "inline-block rounded-[25px_0] bg-[#FFD600] font-bold text-white uppercase";

export default function HubungiKami() {
  return (
    <>
      <SiteHeader active="/hubungi-kami/" />
      <main>
        {/* yellow page-title band */}
        <section className="bg-[#FFD600] pt-[100px]">
          <div className="mx-auto max-w-[1200px] px-[20px] text-center md:px-0">
            <h1 className={`${HEADING} text-[36px] leading-[50px] md:text-[59px] md:leading-[82.6px]`}>Hubungi Kami</h1>
            <div className="mt-[30px] flex h-[59px] items-start justify-center">
              <span className="block h-[25px] w-[3px] bg-[#222529]" />
            </div>
          </div>
        </section>

        {/* photo + steps */}
        <section>
          <div className="mx-auto grid max-w-[1200px] items-start gap-[40px] px-[20px] pb-[42px] md:grid-cols-2 md:gap-[60px] md:px-0">
            <div className="md:pl-[45px] md:pt-[125px]">
              <Image
                src="/sites/financia/img/hubungi-handshake.jpg"
                alt=""
                width={1024}
                height={682}
                className="h-auto w-full max-w-[498px]"
                priority
              />
            </div>
            <div className="md:pt-[100px]">
              <h2 className={`${HEADING} max-w-[411px] text-[28px] leading-[36.4px] md:text-[39px] md:leading-[50.7px]`}>
                Iya saya mau pakai Financia, bagaimana caranya?
              </h2>
              <p className="mt-[30px] max-w-[411px] text-[15px] leading-[27.86px] text-[#4B4F58]">
                Berikut langkah-langkah sederhana yang dapat diikuti:
              </p>
              <div className="mt-[15px] max-w-[411px]">
                <StepToggle items={CONTACT_STEPS} />
              </div>
              <div className="mt-[15px] max-w-[411px] text-center">
                <a href={WHATSAPP} className={`${CTA} px-[24px] py-[12px] text-[20px] leading-[20px]`}>
                  HUBUNGI KAMI
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
