"use client";
import Image from "next/image";
import { Rajdhani } from "next/font/google";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function HakkimizdaIntro() {
  const ctx = (typeof useI18n === "function" ? useI18n() : null) || { lang: "tr" };
  const lang = (ctx.lang || "tr").toLowerCase();

  const T = {
    tr: {
      heading: "Gücün Arkasındaki Mühendislik",
      p1: "Optimus Prime; endüstriyel motorlar, jeneratör uygulamaları ve özel güç çözümlerinde yüksek performans & düşük tüketimi bir araya getirir. Ar-Ge’den üretime, satış sonrası desteğe kadar tüm süreçlerimiz kalite güvencesi altında yürütülür.",
      p2: "İş ortaklarımızla birlikte, farklı sektörlerin ihtiyaçlarına uygun, ölçeklenebilir ve sürdürülebilir çözümler geliştiriyoruz.",
    },
    en: {
      heading: "Engineering Behind the Power",
      p1: "Optimus Prime combines high performance & low consumption in industrial engines, generator applications, and custom power solutions. From R&D to production and after-sales support, all our processes are carried out under quality assurance.",
      p2: "Together with our partners, we develop scalable and sustainable solutions tailored to the needs of different industries.",
    },
  }[lang];

  return (
    <section className="max-w-[1240px] mx-auto px-6 lg:px-10 py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <h2
            className={`${rajdhani.className} text-2xl md:text-3xl font-extrabold text-[#00138B] uppercase tracking-[0.05em]`}
          >
            {T.heading}
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">{T.p1}</p>
          <p className="mt-4 text-gray-700 leading-relaxed">{T.p2}</p>
        </div>
        <div className="md:col-span-5">
          <div className="rounded-xl overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,.12)]">
            <Image
              src="/images/home/about.jpg"
              alt="Optimus Prime üretim"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}