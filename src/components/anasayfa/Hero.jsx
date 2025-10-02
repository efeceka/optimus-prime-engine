"use client";
import Link from "next/link";
import Image from "next/image";
import { Rajdhani } from "next/font/google";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HERO_IMG = "/images/home/hero.jpg";

export default function Hero() {
  const ctx = useI18n?.();                 // context yoksa da çökmesin
  const rawLang = ctx?.lang ?? "TR";
  const LANG = typeof rawLang === "string" ? rawLang.toUpperCase() : "TR";

  const content = {
    TR: {
      chip: "Premium Motor Parçaları",
      title: "OPTİMUS PRİME\nDİZEL MOTORLAR",
      desc:
        "Ağır hizmet motorları için orijinal ve uyumlu çözümler. Hızlı tedarik, güvenilir kalite, rekabetçi fiyat.",
      ctaProducts: "ÜRÜNLERİ İNCELE",
      ctaContact: "İLETİŞİM",
      footer: "Güvenilir Jeneratör Çözümleri",
    },
    EN: {
      chip: "Premium Engine Parts",
      title: "OPTIMUS PRIME\nDIESEL ENGINES",
      desc:
        "Original and compatible solutions for heavy-duty engines. Fast supply, reliable quality, competitive prices.",
      ctaProducts: "VIEW PRODUCTS",
      ctaContact: "CONTACT",
      footer: "Reliable Generator Solutions",
    },
  };

  const t = content[LANG] || content.TR;   // güvenli fallback

  return (
    <section
      className="relative w-full h-[100dvh] min-h-[580px] md:h-screen overflow-hidden"
      aria-label="Hero"
    >
      <Image src={HERO_IMG} alt="Optimus Prime – Endüstriyel motor çözümleri" fill priority sizes="100vw" className="object-cover" />
      <div
        className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-black/0"
        style={{ WebkitMaskImage: "linear-gradient(to top, black 60%, transparent 100%)", maskImage: "linear-gradient(to top, black 60%, transparent 100%)" }}
      />

      <div className="relative z-10 h-full">
        <div className="max-w-[1440px] mx-auto h-full px-6 lg:px-10">
          <div className="h-full w-full grid content-center">
            <div className="absolute top-6 left-6 hidden sm:flex">
              <span className={`${rajdhani.className} inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] tracking-[0.08em] text-white/90 backdrop-blur border border-white/20 font-semibold`}>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {t.chip}
              </span>
            </div>

            <div className="text-center md:text-left max-w-3xl md:max-w-2xl">
              <h1
                className={`${rajdhani.className} text-white font-bold tracking-[0.06em] text-3xl md:text-5xl lg:text-6xl leading-snug whitespace-pre-line`}
                style={{ textShadow: "0 0 4px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,.9), 0 6px 18px rgba(0,0,0,.85)" }}
              >
                {t.title}
              </h1>
              <p className="mt-3 text-white/95 text-sm md:text-base lg:text-lg" style={{ textShadow: "0 0 3px rgba(0,0,0,1), 0 2px 6px rgba(0,0,0,.9)" }}>
                {t.desc}
              </p>
            </div>

            <div className="mt-6 md:mt-8 flex justify-center md:justify-start">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur px-3 py-3 md:px-4 md:py-4 mt-7">
                <Link href="/urunler" className={`${rajdhani.className} inline-flex items-center gap-3 rounded-lg border border-white/0 bg-white px-4 py-2 text-black text-sm md:text-base font-semibold hover:opacity-90 transition tracking-[0.06em]`}>
                  {t.ctaProducts}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
                <Link href="/iletisim" className={`${rajdhani.className} inline-flex items-center gap-2 rounded-lg border border-white/40 bg-transparent px-4 py-2 text-white text-sm md:text-base font-semibold hover:bg-white/15 transition tracking-[0.06em]`}>
                  {t.ctaContact}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
          <p className={`${rajdhani.className} text-[12px] md:text-sm text-white/80 tracking-[0.08em]`}>
            {t.footer}
          </p>
        </div>
      </div>
    </section>
  );
}