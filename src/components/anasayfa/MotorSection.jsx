"use client";
import Image from "next/image";
import Link from "next/link";
import { Rajdhani } from "next/font/google";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const IMAGES = [
  "/images/home/motors/motor1.jpg",
  "/images/home/motors/motor2.jpg",
  "/images/home/motors/motor3.png",
];

// TR için I/İ dönüşümünü koruyarak uppercase
function preserveTRUpper(str, lang) {
  if (!str) return "";
  const isTR = (lang || "tr").toLowerCase() === "tr";
  if (!isTR) return str.toUpperCase();
  return str.replace(/i/g, "İ").replace(/ı/g, "I").toUpperCase();
}

export default function MotorSec() {
  // i18n — provider yoksa çökmesin
  const ctx = (typeof useI18n === "function" ? useI18n() : null) || { lang: "tr" };
  const L = (ctx.lang || "tr").toLowerCase();

  const dict = {
    tr: {
      heading: "Motorlarımız",
      sub: "İhtiyaçlarınıza göre üç sınıfta motor çözümleri.",
      cards: [
        {
          size: "10 - 39 kW",
          img: IMAGES[0],
          title: "Küçük Ölçek Motorlar",
          desc:
            "Küçük ve orta ölçekli uygulamalar için ideal olan 10 ila 39 kW jeneratör motorlarımız, güvenilirlik, düşük yakıt tüketimi ve yüksek verimlilik sunar.",
        },
        {
          size: "43 - 110 kW",
          img: IMAGES[1],
          title: "Orta Ölçek Motorlar",
          desc:
            "Orta ölçekli endüstriyel ve ticari kullanım için tasarlanmış 43 ila 110 kW jeneratör motorları; yüksek performans ve dayanıklılığı bir araya getirir.",
        },
        {
          size: "120 - 390 kW",
          img: IMAGES[2],
          title: "Büyük Ölçek Motorlar",
          desc:
            "Büyük ölçekli sanayi tesisleri ve projeler için ideal; güçlü performans ve uzun ömür sunar.",
        },
      ],
      cta: "Keşfet",
      foot: "Seçenekler ve stok durumu için bizimle iletişime geçin.",
    },
    en: {
      heading: "Our Engines",
      sub: "Three ranges tailored to your needs.",
      cards: [
        {
          size: "10 - 39 kW",
          img: IMAGES[0],
          title: "Small Scale Engines",
          desc:
            "Ideal for small and medium applications, our 10–39 kW generator engines offer reliability, low fuel consumption and high efficiency.",
        },
        {
          size: "43 - 110 kW",
          img: IMAGES[1],
          title: "Medium Scale Engines",
          desc:
            "Designed for mid-scale industrial and commercial use, 43–110 kW generator engines combine high performance with durability.",
        },
        {
          size: "120 - 390 kW",
          img: IMAGES[2],
          title: "Large Scale Engines",
          desc:
            "Perfect for large industrial plants and projects; delivers strong performance and long service life.",
        },
      ],
      cta: "Explore",
      foot: "Contact us for options and availability.",
    },
  }[L];

  // simetrik chamfer
  const polyClip = "polygon(3% 0, 100% 0, 100% 97%, 97% 100%, 0 100%, 0 3%)";
  const chipClip = "polygon(8% 0%, 100% 0%, 100% 75%, 92% 100%, 0% 100%, 0% 25%)";

  // başlığı TR’de doğru büyüt
  const headingUP = preserveTRUpper(dict.heading, L);

  return (
    <section className="relative w-full bg-[#0A0F1A]">
      {/* LOW-POLY SVG KATMANI */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00138B" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#2BA84A" stopOpacity="0.10" />
          </linearGradient>
        </defs>
        <polygon points="0,0 100,0 100,100 0,100" fill="url(#g1)" />
        <polygon points="0,0 45,0 18,22" fill="#2BA84A18" />
        <polygon points="100,0 58,0 82,20" fill="#2BA84A10" />
        <polygon points="100,100 62,100 90,72" fill="#00138B1A" />
        <polygon points="0,100 28,100 10,80" fill="#00138B12" />
      </svg>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        {/* Başlık */}
        <div className="text-center mb-10 lg:mb-14">
          <h2
            className={`${rajdhani.className} text-3xl lg:text-4xl font-bold tracking-[0.08em] text-white`}
            style={{ textTransform: "none" }}
          >
            {headingUP}
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-24 bg-gradient-to-r from-[#2BA84A] via-white/60 to-[#00138B] rounded-full" />
          <p className="mt-4 text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
            {dict.sub}
          </p>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {dict.cards.map((it, i) => (
            <article
              key={i}
              className="group relative rounded-2xl h-full flex flex-col overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/5 bg-white/5 backdrop-blur-sm"
              style={{ clipPath: polyClip }}
            >
              {/* Üst polygon şerit */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#2BA84A] via-white/70 to-[#00138B] opacity-90" />

              {/* Görsel */}
              <div className="relative w-full">
                <div
                  className="relative w-full bg-black/10"
                  style={{ aspectRatio: "16/9", clipPath: polyClip }}
                >
                  <Image
                    src={it.img}
                    alt={it.title}
                    fill
                    className="object-contain p-4"
                    sizes="(min-width:1024px) 420px, (min-width:640px) 50vw, 100vw"
                    priority={i === 0}
                  />
                </div>

                {/* Rozet */}
                <div className="absolute top-5 left-5">
                  <span
                    className={`${rajdhani.className} inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-white uppercase`}
                    style={{ background: "#00138Bcc", clipPath: chipClip }}
                  >
                    <span
                      className="h-1.5 w-3 -ml-1"
                      style={{
                        clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                        background: "#2BA84A",
                      }}
                    />
                    {it.size}
                  </span>
                </div>
              </div>

              {/* Metin */}
              <div className="px-4 md:px-5 pt-5 pb-6 text-center flex-1 flex flex-col">
                <h3
                  className={`${rajdhani.className} text-white font-bold uppercase tracking-[0.06em] text-lg md:text-xl`}
                >
                  {it.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-300 md:min-h-[96px]">
                  {it.desc}
                </p>

                {/* CTA */}
                <div className="mt-auto pt-5">
                  <Link
                    href="/urunler"
                    className={`${rajdhani.className} relative inline-flex items-center gap-2 px-6 py-2 text-sm font-semibold uppercase tracking-[0.06em] text-black transition`}
                  >
                    <span
                      className="absolute inset-0"
                      style={{
                        clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                        background: "linear-gradient(90deg, #ffffff, #A7F3D0)",
                      }}
                    />
                    <span className="relative">{dict.cta}</span>
                    <span
                      aria-hidden
                      className="relative h-2 w-3"
                      style={{
                        clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                        background: "#00138B",
                      }}
                    />
                  </Link>
                </div>
              </div>

              {/* Alt parıltı efekti */}
              <div className="pointer-events-none absolute inset-x-6 bottom-3 h-10 rounded-full blur-2xl bg-gradient-to-r from-[#2BA84A33] via-white/20 to-[#00138B33] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </article>
          ))}
        </div>

        {/* alt bilgi */}
        <div className="mt-10 text-center text-xs text-gray-400">{dict.foot}</div>
      </div>
    </section>
  );
}