"use client";
import Image from "next/image";
import { Rajdhani } from "next/font/google";
import Numbers from "@/components/anasayfa/Numbers";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// clipPath tanımları
const chipClip = "polygon(10% 0, 100% 0, 90% 100%, 0 100%)";
const bandClip = "polygon(6% 0, 100% 0, 94% 100%, 0 100%)";
const cardClip = "polygon(3% 0, 100% 0, 100% 97%, 97% 100%, 0 100%, 0 3%)";

export default function Showcase() {
  // i18n (provider yoksa da çökmesin)
  const ctx = (typeof useI18n === "function" ? useI18n() : null) || { lang: "tr" };
  const L = (ctx.lang || "tr").toLowerCase();

  const dict = {
    tr: {
      chipMain: "ÜRETİM · TEDARİK · SERVİS",
      heading: "ÜRETİYORUZ",
      paragraph:
        "Güçlü motorlar, yüksek verimlilik ve sürdürülebilir enerji çözümleriyle her gün daha ileriye taşıyoruz. Optimus Prime olarak, her aşamada mükemmeli hedefliyor ve geleceğin enerjisini üretiyoruz.",
      badges: ["YÜKSEK VERİMLİLİK", "GÜVENLİ TEDARİK", "GARANTİ & SERVİS AĞI"],
      trustHeading: "OPTIMUS PRIME MOTORLARINA GÜVENEBİLİRSİNİZ!",
      feat1Title: "KALİTE VE PERFORMANS",
      feat1Text:
        "Yüksek kalite standartlarıyla üretilen motorlarımız; güç ve verimliliği birleştirerek üstün performans sunar.",
      feat2Title: "YAKIT EKONOMİSİ",
      feat2Text:
        "Optimize edilmiş tasarım; düşük tüketimle uzun vadede tasarruf ve çevre dostu kullanım sağlar.",
      feat3Title: "YETKİLİ SERVİS AĞI",
      feat3Text:
        "Yaygın servis ağımız ve uzman ekibimizle hızlı, güvenilir hizmet sunarak memnuniyeti en üst seviyeye taşırız.",
      footNote: "Seçenekler ve stok durumu için bizimle iletişime geçin.",
    },
    en: {
      chipMain: "MANUFACTURING · SUPPLY · SERVICE",
      heading: "WE MANUFACTURE",
      paragraph:
        "We move forward every day with powerful engines, high efficiency and sustainable energy solutions. At Optimus Prime, we aim for excellence at every stage and build the energy of the future.",
      badges: ["HIGH EFFICIENCY", "RELIABLE SUPPLY", "WARRANTY & SERVICE NETWORK"],
      trustHeading: "YOU CAN RELY ON OPTIMUS PRIME ENGINES!",
      feat1Title: "QUALITY & PERFORMANCE",
      feat1Text:
        "Built to high quality standards, our engines combine power and efficiency to deliver superior performance.",
      feat2Title: "FUEL ECONOMY",
      feat2Text:
        "Optimized design ensures lower consumption for long-term savings and environmentally friendly operation.",
      feat3Title: "AUTHORIZED SERVICE NETWORK",
      feat3Text:
        "With our widespread service network and expert team, we provide fast and reliable service for top satisfaction.",
      footNote: "Contact us for options and availability.",
    },
  }[L];

  return (
    <section className="w-full bg-white">
      {/* ====== ÜST BLOK: ÜRETİYORUZ ====== */}
      <div className="relative">
        {/* Low-poly arka plan */}
        <svg
          className="absolute inset-0 h-[420px] w-full"
          viewBox="0 0 100 42"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="mesh" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EAF3FF" />
              <stop offset="100%" stopColor="#F2FFF6" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="42" fill="url(#mesh)" />
          <polygon points="0,0 28,0 14,10" fill="#dbeafe" opacity="0.6" />
          <polygon points="100,0 70,0 86,9" fill="#dcfce7" opacity="0.5" />
          <polygon points="100,42 64,42 90,30" fill="#e0f2fe" opacity="0.55" />
          <polygon points="0,42 32,42 8,30" fill="#e5f3ff" opacity="0.6" />
        </svg>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Sol: Başlık + metin + chipler */}
            <div>
              <div
                className={`${rajdhani.className} inline-flex items-center gap-2 text-[#0B1F3A] tracking-[0.08em] text-[12px] font-semibold`}
                style={{ clipPath: chipClip, background: "#E8F3FF" }}
              >
                <span className="px-3 py-1">{dict.chipMain}</span>
              </div>

              <h3
                className={`${rajdhani.className} mt-4 text-[#0B1F3A] font-bold tracking-[0.06em] text-3xl md:text-4xl lg:text-[40px] leading-snug`}
              >
                {dict.heading}
              </h3>

              <p className="mt-3 text-[#1f2a44]/90 text-[14px] md:text-[15px] leading-relaxed max-w-xl">
                {dict.paragraph}
              </p>

              {/* Küçük rozetler */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span
                  className={`${rajdhani.className} inline-flex items-center text-[12px] tracking-[0.08em] font-semibold text-[#0B1F3A]`}
                  style={{ clipPath: chipClip, background: "#EAFBF0" }}
                >
                  <span className="px-3 py-1">{dict.badges[0]}</span>
                </span>
                <span
                  className={`${rajdhani.className} inline-flex items-center text-[12px] tracking-[0.08em] font-semibold text-[#0B1F3A]`}
                  style={{ clipPath: chipClip, background: "#F6F9FF" }}
                >
                  <span className="px-3 py-1">{dict.badges[1]}</span>
                </span>
                <span
                  className={`${rajdhani.className} inline-flex items-center text-[12px] tracking-[0.08em] font-semibold text-[#0B1F3A]`}
                  style={{ clipPath: chipClip, background: "#FFF8EA" }}
                >
                  <span className="px-3 py-1">{dict.badges[2]}</span>
                </span>
              </div>
            </div>

            {/* Sağ: Görsel */}
            <div className="relative w-full">
              <div
                className="group relative w-full max-w-[550px] overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,.2)] ring-1 ring-[#0B1F3A]/10 bg-white"
                style={{ borderRadius: 16, clipPath: "polygon(4% 0, 100% 0, 100% 92%, 96% 100%, 0 100%, 0 8%)" }}
              >
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]">
                  <Image
                    src="/images/home/fabrika.webp"
                    alt={L === "tr" ? "Üretim görseli" : "Manufacturing visual"}
                    fill
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00138B]/20 via-transparent to-[#2BA84A]/20 mix-blend-multiply" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bölümler arası polygon ayırıcı */}
        <div
          className="h-8 md:h-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(245,249,255,1) 0%, rgba(247,250,255,1) 100%)",
            WebkitClipPath: bandClip,
            clipPath: bandClip,
          }}
        />
      </div>

      {/* ===== ORTA: STATS ===== */}
      <Numbers />

      {/* ===== ALT BLOK: 3 ÖZELLİK ===== */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_10%_0%,rgba(16,44,140,0.06),transparent_60%)]" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-10 lg:py-14 bg-[#F7FAFF]">
          <div className="text-center">
            <h4
              className={`${rajdhani.className} text-[#102C8C] font-bold tracking-[0.06em] text-2xl md:text-3xl`}
            >
              {dict.trustHeading}
            </h4>
            <div className="mx-auto mt-3 h-[3px] w-24 bg-gradient-to-r from-[#2BA84A] via-[#102C8C] to-[#2BA84A] rounded-full" />
          </div>

          {/* 3 özellik */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl grid place-items-center shadow-sm ring-1 ring-[#102C8C]/15 bg-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 19h16M7 17V9M12 17V5M17 17v-6" stroke="#102C8C" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h5 className={`${rajdhani.className} mt-4 text-[18px] md:text-[20px] font-semibold text-[#0B1F3A] tracking-[0.04em]`}>
                {dict.feat1Title}
              </h5>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-700 max-w-sm">
                {dict.feat1Text}
              </p>
            </div>

            {/* 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl grid place-items-center shadow-sm ring-1 ring-[#102C8C]/15 bg-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C9 7 6 9.5 6 13a6 6 0 1 0 12 0c0-3.5-3-6-6-10Z" stroke="#2BA84A" strokeWidth="2"/>
                </svg>
              </div>
              <h5 className={`${rajdhani.className} mt-4 text-[18px] md:text-[20px] font-semibold text-[#0B1F3A] tracking-[0.04em]`}>
                {dict.feat2Title}
              </h5>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-700 max-w-sm">
                {dict.feat2Text}
              </p>
            </div>

            {/* 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl grid place-items-center shadow-sm ring-1 ring-[#102C8C]/15 bg-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="translate-x-[3px]">
                  <path
                    d="M9 12c1.6-1.6 3.2-3.2 5-3.2 2 0 3.5 1.3 3.5 3.2s-1.5 3.2-3.5 3.2c-1.8 0-3.4-1.6-5-3.2Zm0 0c-1.6-1.6-3.2-3.2-5-3.2C2 8.8.5 10.1.5 12s1.5 3.2 3.5 3.2c1.8 0 3.4-1.6 5-3.2Z"
                    stroke="#102C8C"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h5 className={`${rajdhani.className} mt-4 text-[18px] md:text-[20px] font-semibold text-[#0B1F3A] tracking-[0.04em]`}>
                {dict.feat3Title}
              </h5>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-700 max-w-sm">
                {dict.feat3Text}
              </p>
            </div>
          </div>

          <div className="mt-10 text-center text-xs text-gray-500">
            {dict.footNote}
          </div>
        </div>
      </div>
    </section>
  );
}