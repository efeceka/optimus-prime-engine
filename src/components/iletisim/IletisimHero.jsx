"use client";
import Image from "next/image";
import { Rajdhani } from "next/font/google";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["600", "700"] });

export default function IletisimHero() {
  const ctx = (typeof useI18n === "function" ? useI18n() : null) || { lang: "tr" };
  const lang = (ctx.lang || "tr").toLowerCase();

  const T = {
    tr: {
      title: "İLETİŞİM",
      desc: "Projeniz için doğru güç çözümünü birlikte planlayalım. Aşağıdaki kanallardan bize ulaşın.",
    },
    en: {
      title: "CONTACT",
      desc: "Let's plan the right power solution for your project together. Reach us through the channels below.",
    },
  }[lang];

  return (
    <section className="relative w-full h-[60vh] min-h-[480px] overflow-hidden">
      <Image
        src="/images/iletisim.webp"
        alt="Optimus Prime İletişim"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.35))]" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-10 h-full flex items-end pb-12">
        <div>
          <h1
            className={`${rajdhani.className} text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.06em]
              drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]`}
          >
            {T.title}
          </h1>
          <div className="mt-3 h-[3px] w-28 bg-gradient-to-r from-[#2BA84A] via-[#2BA84A]/80 to-[#00138B] rounded-full" />
          <p
            className="mt-4 max-w-2xl text-white/95 text-base md:text-lg leading-relaxed
              drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
          >
            {T.desc}
          </p>
        </div>
      </div>
    </section>
  );
}