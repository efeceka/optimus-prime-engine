"use client";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { Rajdhani } from "next/font/google";
import { urlFor } from "@/sanity/lib/image";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const CARD_CLIP  = "polygon(4% 0, 100% 0, 100% 92%, 96% 100%, 0 100%, 0 8%)";
const CHIP_CLIP  = "polygon(16% 0, 100% 0, 84% 100%, 0 100%)";

// dil yardımı
const getByLang = (lang, v) => {
  if (!v) return "";
  if (typeof v === "string") return v;
  return v[lang] ?? v.tr ?? v.en ?? "";
};

export default function UrunlerGridClient({ products }) {
  const ctx = (typeof useI18n === "function" ? useI18n() : null) || { lang: "tr" };
  const lang = (ctx.lang || "tr").toLowerCase();

  const t = {
    tr: { empty: "Şu an listelenecek ürün bulunmuyor.", badge: "Optimus Prime", category: "Endüstriyel Motor", view: "İncele →" },
    en: { empty: "No products to list right now.",      badge: "Optimus Prime", category: "Industrial Engine",  view: "View →" },
  }[lang];

  const sortedProducts = useMemo(() => {
    const items = Array.isArray(products) ? products : [];
    return [...items].sort((a, b) => {
      const soA = a?.sortOrder ?? Infinity;
      const soB = b?.sortOrder ?? Infinity;
      if (soA !== soB) return soA - soB;

      const tA = getByLang(lang, a?.title);
      const tB = getByLang(lang, b?.title);
      return tA.localeCompare(tB, lang === "tr" ? "tr" : "en", { sensitivity: "base", numeric: true });
    });
  }, [products, lang]);

  if (!sortedProducts.length) {
    return (
      <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 bg-[#0A0F1A]">
        <div className="rounded-xl border border-white/10 bg-white/90 p-10 text-center">
          <p className={`${rajdhani.className} text-[#0B1F3A] text-lg tracking-wide`}>{t.empty}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-[#0A0F1A]">
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="0,0 22,0 0,22" fill="#2BA84A" />
        <polygon points="100,0 78,0 100,22" fill="#102C8C" />
        <polygon points="0,100 22,100 0,78" fill="#102C8C" />
        <polygon points="100,100 78,100 100,78" fill="#2BA84A" />
        <polygon points="0,65 100,35 100,45 0,75" fill="#FFFFFF" opacity="0.04" />
      </svg>

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {sortedProducts.map((p) => {
            const title = getByLang(lang, p?.title);
            const slug  = typeof p?.slug === "string" ? p.slug : p?.slug?.current;

            const primary = p?.image?.asset ? p.image : (p?.images || []).find((im) => im?.asset);
            const img = primary && urlFor(primary)?.width(800)?.height(640)?.fit("max")?.auto("format")?.url();

            return (
              <Link key={p?._id || slug} href={slug ? `/urunler/${slug}` : "#"} className="group block focus:outline-none">
                <article
                  className="relative overflow-hidden bg-white/95 backdrop-blur-sm ring-1 ring-[#0B1F3A]/10 shadow-[0_6px_20px_rgba(0,0,0,.15)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,.25)]"
                  style={{ borderRadius: 16, clipPath: CARD_CLIP }}
                >
                  <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg,#2BA84A 0%,rgba(0,0,0,.1) 50%,#102C8C 100%)" }} />

                  <div className="relative w-full bg-white">
                    <div className="relative w-full aspect-[5/4]">
                      {img ? (
                        <Image src={img} alt={title || (lang === "tr" ? "Ürün" : "Product")} fill className="object-contain p-4 md:p-5 transition-transform duration-500 group-hover:scale-[1.02]" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center text-gray-400">
                          {lang === "tr" ? "Görsel Yok" : "No Image"}
                        </div>
                      )}
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className={`${rajdhani.className} inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0B1F3A]`} style={{ background: "#EAFBF0", clipPath: CHIP_CLIP }}>
                        <span className="px-2 py-[6px]">{t.badge}</span>
                      </span>
                    </div>
                  </div>

                  <div className="px-4 md:px-5 pt-3 pb-4">
                    <h3 className={`${rajdhani.className} text-[#0B1F3A] text-lg md:text-[20px] font-semibold tracking-[0.01em] line-clamp-2`}>
                      {title}
                    </h3>
                    <div className="mt-1 text-[11px] text-gray-500 flex items-center justify-between">
                      <span>{t.category}</span>
                      <span className="opacity-0 transition-opacity group-hover:opacity-100 text-[#102C8C]">{t.view}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-[10px]" style={{ background: "linear-gradient(90deg,rgba(43,168,74,.9),rgba(43,168,74,.25),rgba(16,44,140,.9))" }} />
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}