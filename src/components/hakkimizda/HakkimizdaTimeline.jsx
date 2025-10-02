"use client";
import { Rajdhani } from "next/font/google";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function HakkimizdaTimeline() {
  const ctx = (typeof useI18n === "function" ? useI18n() : null) || { lang: "tr" };
  const lang = (ctx.lang || "tr").toLowerCase();

  const content = {
    tr: {
      heading: "Kısa Tarihçe",
      steps: [
        { y: "2012", t: "Kuruluş", d: "Optimus Prime, güç çözümlerinde faaliyet göstermek üzere kuruldu." },
        { y: "2016", t: "Ürün Yelpazesi", d: "Endüstriyel motor ve jeneratör uygulamalarında genişleme." },
        { y: "2020", t: "İhracat", d: "25+ ülkeye ihracat ve bölgesel servis ağı." },
        { y: "2024", t: "Ar-Ge", d: "Yakıt verimliliği ve emisyon odaklı yeni platformlar." },
      ],
    },
    en: {
      heading: "Brief History",
      steps: [
        { y: "2012", t: "Foundation", d: "Optimus Prime was founded to operate in power solutions." },
        { y: "2016", t: "Product Range", d: "Expansion in industrial engines and generator applications." },
        { y: "2020", t: "Export", d: "Export to 25+ countries and establishment of regional service network." },
        { y: "2024", t: "R&D", d: "New platforms focusing on fuel efficiency and emissions." },
      ],
    },
  }[lang];

  return (
    <section className="relative bg-[#F5F7FA]">
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10 py-14">
        <h3
          className={`${rajdhani.className} text-2xl md:text-3xl font-extrabold text-[#00138B] uppercase tracking-wide`}
        >
          {content.heading}
        </h3>
        <div className="mt-8 relative">
          {/* timeline çizgisi */}
          <div className="absolute left-4 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2BA84A] to-[#00138B]" />

          <ul className="space-y-8">
            {content.steps.map((s, i) => (
              <li
                key={i}
                className="relative pl-12 bg-white rounded-xl shadow-[0_6px_20px_rgba(0,0,0,.06)] p-5 border border-gray-100"
              >
                {/* nokta */}
                <span className="absolute left-2.5 top-6 inline-block w-4 h-4 rounded-full bg-[#2BA84A] ring-4 ring-[#EAFBF0]" />
                <div className="text-sm font-semibold text-gray-500">{s.y}</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">{s.t}</div>
                <p className="mt-1 text-gray-700">{s.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}