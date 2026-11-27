import { Josefin_Sans, Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jasa Penagih Hutang - FINANCIA",
  description:
    "Apakah Anda mencari jasa penagih hutang? Kami adalah agensi penagihan hutang terdepan dan terpercaya di Indonesia. Hubungi kami sekarang!",
  openGraph: {
    title: "Jasa Penagih Hutang - FINANCIA",
    description:
      "Apakah Anda mencari jasa penagih hutang? Kami adalah agensi penagihan hutang terdepan dan terpercaya di Indonesia. Hubungi kami sekarang!",
    siteName: "FINANCIA - Jasa Penagihan Utang",
    type: "website",
    url: "https://financia.co.id/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${josefin.variable} antialiased`}
    >
      <body className="min-h-screen bg-white font-sans text-[#4B4F58]">
        {children}
      </body>
    </html>
  );
}
