"use client";
import { Rajdhani } from "next/font/google";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function HakkimizdaIstatistikler() {
  const ctx = (typeof useI18n === "function" ? useI18n() : null) || { lang: "tr" };
  const lang = (ctx.lang || "tr").toLowerCase();

  const items = {
    tr: [
      { k: "Ürün Yelpazesi", v: "50+" },
      { k: "Güç Seçenekleri", v: "10kW-390kW" },
      { k: "Aktif Bölge", v: "5+" },
      { k: "Deneyim", v: "10+ Yıl" },
    ],
    en: [
      { k: "Product Range", v: "50+" },
      { k: "Power Options", v: "10kW-390kW" },
      { k: "Active Regions", v: "5+" },
      { k: "Experience", v: "10+ Years" },
    ],
  }[lang];

  return (
    <section className="max-w-[1240px] mx-auto px-6 lg:px-10 py-14">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-[0_10px_28px_rgba(0,0,0,.08)] p-6 text-center"
          >
            {/* hafif low-poly köşe dokusu */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 20,0 0,20" fill="#2BA84A" />
              <polygon points="100,100 80,100 100,80" fill="#00138B" />
            </svg>

            <div
              className={`${rajdhani.className} relative text-[#00138B] text-2xl md:text-3xl font-bold tracking-wide`}
            >
              {it.v}
            </div>
            <div className="relative text-gray-600 text-sm mt-1">{it.k}</div>
            <div className="relative mt-4 h-[3px] w-16 mx-auto bg-gradient-to-r from-[#2BA84A] via-[#2BA84A]/60 to-[#00138B] rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
}