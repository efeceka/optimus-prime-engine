"use client";
import { Rajdhani } from "next/font/google";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function HakkimizdaMisyonVizyon() {
  const ctx = (typeof useI18n === "function" ? useI18n() : null) || { lang: "tr" };
  const lang = (ctx.lang || "tr").toLowerCase();

  const content = {
    tr: {
      missionTitle: "Misyon",
      missionText:
        "Müşterilerimize dayanıklı, verimli ve çevre dostu güç çözümleri sunmak; satış öncesi ve sonrası uçtan uca destekle kesintisiz işletme sürekliliği sağlamak.",
      visionTitle: "Vizyon",
      visionText:
        "Bölgesel liderlikten küresel ölçekte referans marka olmaya uzanan yolda; inovasyon, kalite ve sürdürülebilirlikten ödün vermeden büyümek.",
    },
    en: {
      missionTitle: "Mission",
      missionText:
        "To provide our customers with durable, efficient and eco-friendly power solutions; ensuring uninterrupted business continuity with end-to-end support before and after sales.",
      visionTitle: "Vision",
      visionText:
        "From regional leadership to becoming a global reference brand; growing without compromising on innovation, quality, and sustainability.",
    },
  }[lang];

  return (
    <section className="relative bg-[#0A0F1A]">
      {/* low-poly arka plan */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="0,0 22,0 0,22" fill="#2BA84A" />
        <polygon points="100,0 80,0 100,20" fill="#00138B" />
        <polygon points="0,100 20,100 0,80" fill="#00138B" />
        <polygon points="100,100 80,100 100,80" fill="#2BA84A" />
      </svg>

      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Misyon */}
          <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-7 text-white shadow-[0_10px_28px_rgba(0,0,0,.4)] overflow-hidden">
            {/* köşe aksanı */}
            <div className="pointer-events-none absolute -top-6 -right-6 w-20 h-20 rotate-45 bg-gradient-to-br from-[#2BA84A]/15 to-[#00138B]/20" />
            <h3
              className={`${rajdhani.className} text-2xl font-bold uppercase tracking-wide`}
            >
              {content.missionTitle}
            </h3>
            <p className="mt-4 text-white/90 leading-relaxed text-sm md:text-base">
              {content.missionText}
            </p>
          </div>

          {/* Vizyon */}
          <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-7 text-white shadow-[0_10px_28px_rgba(0,0,0,.4)] overflow-hidden">
            <div className="pointer-events-none absolute -top-6 -right-6 w-20 h-20 rotate-45 bg-gradient-to-br from-[#00138B]/20 to-[#2BA84A]/15" />
            <h3
              className={`${rajdhani.className} text-2xl font-bold uppercase tracking-wide`}
            >
              {content.visionTitle}
            </h3>
            <p className="mt-4 text-white/90 leading-relaxed text-sm md:text-base">
              {content.visionText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}