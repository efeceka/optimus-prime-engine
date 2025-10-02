"use client";
import { Rajdhani } from "next/font/google";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Stats() {
  const ctx = (typeof useI18n === "function" ? useI18n() : null) || { lang: "tr" };
  const L = (ctx.lang || "tr").toLowerCase();

  const dict = {
    tr: [
      { value: "2018", label: "Kuruluş" },
      { value: "15+", label: "Ürün Çeşidi" },
      { value: "100+", label: "Müşterilerimiz" },
      { value: "5+", label: "Ülke" },
    ],
    en: [
      { value: "2018", label: "Founded" },
      { value: "15+", label: "Product Types" },
      { value: "100+", label: "Clients" },
      { value: "5+", label: "Countries" },
    ],
  };

  const stats = dict[L];

  return (
    <section className="relative w-full bg-[#0A0F1A] text-white">
      {/* Low-poly arka plan */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.12]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon points="0,0 30,0 15,20" fill="#2BA84A" />
        <polygon points="100,0 70,0 90,18" fill="#00138B" />
        <polygon points="100,100 65,100 88,72" fill="#2BA84A" />
        <polygon points="0,100 28,100 8,78" fill="#00138B" />
      </svg>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
          {stats.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <span
                className={`${rajdhani.className} text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.06em] text-white`}
              >
                {item.value}
              </span>
              <span className="mt-2 text-sm md:text-base text-white/80 tracking-[0.08em] uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}