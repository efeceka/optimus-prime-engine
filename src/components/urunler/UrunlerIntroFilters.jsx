"use client";

import { useMemo, useState } from "react";
import { Rajdhani } from "next/font/google";
import UrunlerGridClient from "./UrunlerGridClient";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const detectCodeType = (title) => {
  if (!title) return "other";
  const t = String(title).toLowerCase();
  if (/\bdde\b/.test(t)) return "dde";
  if (/\bde\b/.test(t)) return "de";
  return "other";
};

const BAND_CLIP = "polygon(6% 0, 100% 0, 94% 100%, 0 100%)";

export default function UrunlerIntroFilters({ products }) {
  const { lang: rawLang } = (typeof useI18n === "function" ? useI18n() : { lang: "tr" }) || {
    lang: "tr",
  };
  const lang = (rawLang || "tr").toLowerCase();

  // Metinler (timeline’daki yapı ile aynı)
  const t =
    {
      tr: {
        heading: "Ürün Listesi",
        desc:
          "İhtiyacınıza uygun motoru görüntüleyin. Aşağıdaki filtre ile DE / DDE ürünlerini hızlıca ayırabilirsiniz.",
        options: [
          { key: "all", label: "Tümü" },
          { key: "de", label: "DE" },
          { key: "dde", label: "DDE" },
        ],
      },
      en: {
        heading: "Product List",
        desc:
          "Find the right engine for your needs. Use the filter below to quickly separate DE / DDE products.",
        options: [
          { key: "all", label: "All" },
          { key: "de", label: "DE" },
          { key: "dde", label: "DDE" },
        ],
      },
    }[lang] || {};

  const [codeType, setCodeType] = useState("all");

  // DE/DDE algısı için başlığı düz stringe çekiyoruz (dil fark etmez; kod sabit)
  const enriched = useMemo(() => {
    return (products || []).map((p) => {
      const title =
        typeof p?.title === "string" ? p.title : p?.title?.tr || p?.title?.en || "";
      return {
        ...p,
        __title: title,
        __codeType: detectCodeType(title),
      };
    });
  }, [products]);

  const filtered = useMemo(() => {
    if (codeType === "all") return enriched;
    return enriched.filter((p) => p.__codeType === codeType);
  }, [enriched, codeType]);

  return (
    <>
      {/* AÇIK TEMA BLOĞU */}
      <section className="relative w-full bg-[#F8FBFF]">
        {/* Üst geçiş şeridi */}
        <div
          className="h-8 md:h-10"
          style={{
            background:
              "linear-gradient(90deg,rgba(16,44,140,.10),rgba(43,168,74,.12),rgba(16,44,140,.10))",
          }}
        />
        {/* Hafif, simetrik low-poly arka plan */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.18]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="0,0 20,0 0,20" fill="#E6F7EE" />
          <polygon points="100,0 80,0 100,20" fill="#E6EEFF" />
          <polygon points="0,100 20,100 0,80" fill="#E6EEFF" />
          <polygon points="100,100 80,100 100,80" fill="#E6F7EE" />
          <polygon points="0,66 100,36 100,46 0,76" fill="#102C8C" opacity="0.06" />
        </svg>

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 py-14">
          <div className="text-center">
            <h2
              className={`${rajdhani.className} text-[#0B1F3A] text-3xl md:text-4xl font-bold uppercase tracking-[0.06em]`}
            >
              {t.heading}
            </h2>
            <p className="mt-3 text-[#1F2A44]/80 text-sm md:text-base max-w-2xl mx-auto">
              {t.desc}
            </p>
          </div>

          {/* Filtre butonları */}
          <div className="mt-8 flex justify-center">
            <fieldset
              aria-label={lang === "tr" ? "Ürün Tipi Filtresi" : "Product Type Filter"}
              className="inline-flex gap-3 p-3 rounded-2xl bg-white ring-1 ring-[#0B1F3A]/10 shadow-sm"
            >
              {t.options.map((opt) => {
                const active = codeType === opt.key;
                return (
                  <label key={opt.key} className="relative cursor-pointer select-none">
                    <input
                      type="radio"
                      name="codeType"
                      value={opt.key}
                      checked={active}
                      onChange={(e) => setCodeType(e.target.value)}
                      className="peer sr-only"
                    />
                    <span
                      className={`${rajdhani.className} inline-flex items-center justify-center h-12 px-6 text-base uppercase tracking-[0.06em] font-semibold transition`}
                      style={{
                        clipPath: "polygon(14% 0, 100% 0, 86% 100%, 0 100%)",
                        color: active ? "#FFFFFF" : "#0B1F3A",
                        background: active
                          ? "linear-gradient(90deg,#102C8C,#2BA84A)"
                          : "linear-gradient(180deg,#FFFFFF,#F6FAFF)",
                        border: active ? "1px solid transparent" : "1px solid rgba(11,31,58,.14)",
                        boxShadow: active ? "0 6px 16px rgba(16,44,140,.25)" : "none",
                      }}
                    >
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </fieldset>
          </div>
        </div>

        {/* Alt geçiş şeridi */}
        <div
          className="h-8 md:h-10"
          style={{
            background:
              "linear-gradient(90deg,rgba(16,44,140,.10),rgba(43,168,74,.12),rgba(16,44,140,.10))",
          }}
        />
      </section>

      {/* Filtrelenmiş grid */}
      <UrunlerGridClient products={filtered} />
    </>
  );
}