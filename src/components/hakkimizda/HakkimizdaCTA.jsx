"use client";
import Link from "next/link";
import { Rajdhani } from "next/font/google";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function HakkimizdaCTA() {
  const ctx = (typeof useI18n === "function" ? useI18n() : null) || { lang: "tr" };
  const lang = (ctx.lang || "tr").toLowerCase();

  const T = {
    tr: {
      title: "BİRLİKTE DAHA GÜÇLÜYÜZ",
      desc:
        "Projeniz için doğru çözümü birlikte tasarlayalım. Satış ve servis ekibimizle her zaman yanınızdayız.",
      cta: "İLETİŞİME GEÇ",
    },
    en: {
      title: "STRONGER TOGETHER",
      desc:
        "Let’s design the right solution for your project together. Our sales and service teams are always by your side.",
      cta: "CONTACT US",
    },
  }[lang];

  return (
    <section className="relative overflow-hidden">
      {/* Low-poly arka plan dokusu */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="0,0 20,0 0,20" fill="#2BA84A" />
        <polygon points="100,0 80,0 100,20" fill="#00138B" />
        <polygon points="0,100 20,100 0,80" fill="#00138B" />
        <polygon points="100,100 80,100 100,80" fill="#2BA84A" />
      </svg>

      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10 py-14">
        <div className="rounded-2xl bg-white border border-gray-200 shadow-[0_12px_28px_rgba(0,0,0,.08)] p-8 md:p-10 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h4
              className={`${rajdhani.className} text-xl font-extrabold text-[#00138B] tracking-[0.05em]`}
              // uppercase yerine metinleri sözlükte büyük harf verdik
            >
              {T.title}
            </h4>
            <p className="mt-2 text-gray-700">{T.desc}</p>
          </div>

          <div className="md:justify-self-end">
            <Link
              href="/iletisim"
              className={`${rajdhani.className} inline-flex items-center justify-center px-6 py-3 font-semibold text-white tracking-[0.06em] transition`}
              style={{
                background:
                  "linear-gradient(90deg,#2BA84A 0%,#A7F3D0 50%,#00138B 100%)",
                clipPath: "polygon(12% 0, 100% 0, 88% 100%, 0 100%)",
                boxShadow: "0 6px 16px rgba(0,0,0,.25)",
              }}
            >
              {T.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}