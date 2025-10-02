"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Rajdhani } from "next/font/google";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Veri
const DATA = [
  { img: "/images/home/insaat.webp",  title: { tr: "Şantiyeler ve İnşaat Alanları", en: "Construction Sites" } },
  { img: "/images/home/fabrika.webp", title: { tr: "Sanayi ve Fabrikalar",        en: "Industry & Factories" } },
  { img: "/images/home/gemi.webp",    title: { tr: "Denizcilik ve Gemi Endüstrisi", en: "Marine & Shipbuilding" } },
  { img: "/images/home/enerji.webp",  title: { tr: "Enerji Santralleri",           en: "Power Plants" } },
  { img: "/images/home/altyapi.webp", title: { tr: "Altyapı & Kamu Hizmetleri",    en: "Infrastructure & Public Utilities" } },
  { img: "/images/home/etkinlik.webp",title: { tr: "Etkinlikler & Organizasyonlar", en: "Events & Organizations" } },
  { img: "/images/home/saglik.webp",  title: { tr: "Sağlık",                       en: "Healthcare" } },
  { img: "/images/home/tarim.webp",   title: { tr: "Tarım ve Hayvancılık",         en: "Agriculture and Livestock" } },
];

export default function UseAreas() {
  const ctx = (typeof useI18n === "function" ? useI18n() : null) || { lang: "tr" };
  const lang = (ctx.lang || "tr").toLowerCase(); // "tr" | "en"

  const T = useMemo(
    () =>
      ({
        tr: { heading: "Kullanım Alanları", prev: "Önceki", next: "Sonraki" },
        en: { heading: "Use Cases",         prev: "Previous", next: "Next"   },
      }[lang]),
    [lang]
  );

  const [start, setStart] = useState(0);
  const [visible, setVisible] = useState(3);

  // Breakpoint hesaplama (client)
  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(max-width: 639px)").matches) setVisible(1);
      else if (window.matchMedia("(max-width: 1023px)").matches) setVisible(2);
      else setVisible(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Otomatik kaydırma
  const maxStart = Math.max(DATA.length - visible, 0);
  const goNext = () => setStart((s) => (s >= maxStart ? 0 : s + 1));
  const goPrev = () => setStart((s) => (s <= 0 ? maxStart : s - 1));

  useEffect(() => {
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [maxStart, visible]);

  const t = (obj) => obj?.[lang] ?? obj?.tr ?? obj?.en ?? "";

  // clipPath’ler
  const cardClip = "polygon(3% 0, 100% 0, 100% 97%, 97% 100%, 0 100%, 0 3%)";
  const btnClip  = "polygon(18% 0, 100% 0, 82% 100%, 0 100%)";

  return (
    <section id="kullanim-alanlari" className="relative w-full bg-[#0A0F1A]">
      {/* LOW-POLY arka plan */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full"
           viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="ua-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#00138B" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2BA84A" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <polygon points="0,0 100,0 100,100 0,100" fill="url(#ua-g)" />
        <polygon points="0,0 35,0 16,18"  fill="#2BA84A18" />
        <polygon points="100,0 65,0 84,18" fill="#2BA84A12" />
        <polygon points="100,100 60,100 88,76" fill="#00138B18" />
        <polygon points="0,100 30,100 8,80"   fill="#00138B12" />
      </svg>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        {/* Başlık */}
        <div className="text-center mb-10 lg:mb-12">
          <h2 className={`${rajdhani.className} text-3xl lg:text-4xl font-bold uppercase tracking-[0.08em] text-white`}>
            {T.heading}
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-28 bg-gradient-to-r from-[#2BA84A] via-white/70 to-[#00138B] rounded-full" />
        </div>

        {/* Masaüstü oklar */}
        <button
          onClick={goPrev}
          aria-label={T.prev}
          className="hidden sm:grid absolute left-2 lg:left-6 top-1/2 -translate-y-2/3 place-items-center w-11 h-11 text-white/90 hover:text-white transition z-10"
          style={{ clipPath: btnClip, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={goNext}
          aria-label={T.next}
          className="hidden sm:grid absolute right-2 lg:right-6 top-1/2 -translate-y-2/3 place-items-center w-11 h-11 text-white/90 hover:text-white transition z-10"
          style={{ clipPath: btnClip, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out will-change-transform touch-pan-y"
            style={{ transform: `translateX(-${(start * 100) / visible}%)` }}
          >
            {DATA.map((it, i) => (
              <article
                key={`${t(it.title)}-${i}`}
                className="flex-shrink-0 px-2"
                style={{ flexBasis: `${100 / visible}%`, maxWidth: `${100 / visible}%` }}
              >
                <div
                  className="relative overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,.35)] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm"
                  style={{ borderRadius: 14, clipPath: cardClip }}
                >
                  <div className="relative w-full bg-black/10 p-2 md:p-3">
                    <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
                      <Image
                        src={it.img}
                        alt={t(it.title)}
                        fill
                        draggable={false}
                        className="object-cover rounded-md"
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        priority={i === 0}
                      />

                      {/* Alt şerit/başlık */}
                      <div
                        className={`${rajdhani.className} absolute left-2 right-2 bottom-2 text-center text-white uppercase tracking-[0.08em] text-[12px] md:text-[13px] font-semibold py-2`}
                        style={{
                          clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
                          background:
                            "linear-gradient(90deg, rgba(16,44,140,.95), rgba(255,255,255,.35))",
                        }}
                      >
                        {t(it.title)}
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-6 bottom-3 h-10 rounded-full blur-2xl bg-gradient-to-r from-[#2BA84A33] via-white/20 to-[#00138B33] opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Mobil oklar */}
        <div className="mt-6 flex sm:hidden justify-center gap-4">
          <button
            onClick={goPrev}
            aria-label={T.prev}
            className="grid place-items-center w-10 h-10 text-white/90"
            style={{ clipPath: btnClip, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label={T.next}
            className="grid place-items-center w-10 h-10 text-white/90"
            style={{ clipPath: btnClip, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}