"use client";
import Link from "next/link";
import Image from "next/image";
import { Rajdhani } from "next/font/google";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HERO_IMG = "/images/home/hero.jpg";

export default function Hero() {
  return (
    <section
      className="relative w-full h-[100dvh] min-h-[580px] md:h-screen overflow-hidden"
      aria-label="Hero"
    >
      {/* Arka plan görseli */}
      <Image
        src={HERO_IMG}
        alt="Optimus Prime – Endüstriyel motor çözümleri"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Alt mask */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-black/0"
        style={{
          WebkitMaskImage: "linear-gradient(to top, black 60%, transparent 100%)",
          maskImage: "linear-gradient(to top, black 60%, transparent 100%)",
        }}
      />

      {/* İçerik */}
      <div className="relative z-10 h-full">
        <div className="max-w-[1440px] mx-auto h-full px-6 lg:px-10">
          <div className="h-full w-full grid content-center">
            {/* Chip */}
            <div className="absolute top-6 left-6 hidden sm:flex">
              <span
                className={`${rajdhani.className} inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] tracking-[0.08em] text-white/90 backdrop-blur border border-white/20 uppercase font-semibold`}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Premium Engine Parts
              </span>
            </div>

            {/* Başlık + açıklama */}
            <div className="text-center md:text-left max-w-3xl md:max-w-2xl">
              <h1
                className={`${rajdhani.className} text-white font-bold uppercase tracking-[0.06em] text-3xl md:text-5xl lg:text-6xl leading-snug`}
                style={{
                  textShadow:
                    "0 0 4px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,.9), 0 6px 18px rgba(0,0,0,.85)",
                }}
              >
                Optimus Prime <br /> Dizel Motorlar
              </h1>

              <p
                className="mt-3 text-white/95 text-sm md:text-base lg:text-lg"
                style={{
                  textShadow: "0 0 3px rgba(0,0,0,1), 0 2px 6px rgba(0,0,0,.9)",
                }}
              >
                Ağır hizmet motorları için orijinal ve uyumlu çözümler. Hızlı
                tedarik, güvenilir kalite, rekabetçi fiyat.
              </p>
            </div>

           {/* CTA kartı */}
        <div className="mt-6 md:mt-8 flex justify-center md:justify-start">
        <div className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur px-3 py-3 md:px-4 md:py-4 mt-7">
            <Link
            href="/urunler"
            className={`${rajdhani.className} inline-flex items-center gap-3 rounded-lg border border-white/0 bg-white px-4 py-2 text-black text-sm md:text-base font-semibold hover:opacity-90 transition uppercase tracking-[0.06em]`}
            >
            Ürünleri İncele
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
            </Link>

            <Link
            href="/iletisim"
            className={`${rajdhani.className} inline-flex items-center gap-2 rounded-lg border border-white/40 bg-transparent px-4 py-2 text-white text-sm md:text-base font-semibold hover:bg-white/15 transition uppercase tracking-[0.06em]`}
            >
            İLETİŞİM
            </Link>
        </div>
        </div>
          </div>
        </div>

        {/* alt destek metni */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
          <p className={`${rajdhani.className} text-[12px] md:text-sm text-white/80 uppercase tracking-[0.08em]`}>
            Güvenilir Jeneratör Çözümleri
          </p>
        </div>
      </div>
    </section>
  );
}