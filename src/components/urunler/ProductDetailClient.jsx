"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useEffect, useState } from "react";
import { Rajdhani } from "next/font/google";
import { urlFor } from "@/sanity/lib/image";
import { groupLabels } from "@/sanity/lib/constants";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["500", "600", "700"] });

/* ======================== i18n helpers ======================== */
const byLang = (lang, v) => {
  if (!v) return "";
  if (typeof v === "string") return v;
  return v[lang] ?? v.tr ?? v.en ?? "";
};

const specLabel = (lang, spec) => {
  if (!spec) return "";
  return (
    byLang(lang, spec.title) ||
    byLang(lang, spec.label) ||
    spec.key ||
    ""
  );
};

const specValue = (lang, s) => {
  if (!s) return "";
  const base =
    byLang(lang, s.valueText) ||
    byLang(lang, s.value) ||
    s.valueText ||
    s.value ||
    "";
  const unit =
    byLang(lang, s.unitOverrideLabel) ||
    s.unitOverride ||
    "";
  return (base && unit) ? `${base} ${unit}` : `${base}`;
};

/* ======================== UI helpers (same visuals) ======================== */
function GroupBar({ children }) {
  return (
    <div
      className={`${rajdhani.className} relative h-11 px-5 inline-flex items-center
      text-white font-semibold text-sm uppercase tracking-[0.05em]
      rounded-lg bg-gradient-to-r from-[#00138B] to-[#2BA84A] shadow-sm`}
    >
      <span className="pointer-events-none absolute bottom-0 left-2 right-2 h-[3px] rounded-full bg-white/15" />
      {children}
    </div>
  );
}

function GroupBarDark({ children }) {
  return (
    <div
      className={`${rajdhani.className} relative h-11 px-5 inline-flex items-center
      text-white font-semibold text-sm uppercase tracking-[0.05em]
      rounded-lg bg-[linear-gradient(90deg,#0F1A2B,#102C8C_55%,#2BA84A)]
      ring-1 ring-white/10 shadow-[0_8px_22px_rgba(0,0,0,.35)]`}
    >
      <span className="pointer-events-none absolute bottom-0 left-2 right-2 h-[3px] rounded-full bg-white/15" />
      {children}
    </div>
  );
}

function SpecCard({ label, value }) {
  return (
    <div className="relative rounded-xl bg-white border border-slate-200 shadow-[0_6px_18px_rgba(0,0,0,.06)] overflow-hidden">
      <div className="pointer-events-none absolute -right-[24px] -top-[24px] w-16 h-16 rotate-45 bg-gradient-to-br from-[#EAF3FF] to-[#F2FFF6]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[6px] bg-gradient-to-r from-[#2BA84A]/80 via-[#2BA84A]/30 to-[#00138B]/80" />
      <div className="relative p-4">
        <div className="text-[12px] font-semibold text-slate-700 uppercase tracking-[0.04em]">{label}</div>
        <div className="mt-1 text-sm md:text-base text-slate-900 break-words">{value}</div>
      </div>
    </div>
  );
}

function SpecCardDark({ label, value }) {
  return (
    <div className="relative rounded-xl bg-[#111827] border border-white/10 shadow-[0_10px_28px_rgba(0,0,0,.45)] overflow-hidden">
      <div className="pointer-events-none absolute -left-[28px] -top-[28px] w-20 h-20 rotate-45 bg-[linear-gradient(135deg,rgba(43,168,74,.25),rgba(16,44,140,.15))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[6px] bg-[linear-gradient(90deg,rgba(43,168,74,.9),rgba(43,168,74,.25),rgba(16,44,140,.9))]" />
      <div className="relative p-4">
        <div className="text-[12px] font-semibold text-white/90 uppercase tracking-[0.04em]">{label}</div>
        <div className="mt-1 text-sm md:text-base text-white break-words">{value}</div>
      </div>
    </div>
  );
}

/* ======================== MAIN ======================== */
export default function ProductDetailClient({ product }) {
  const { lang: raw } =
    (typeof useI18n === "function" ? useI18n() : { lang: "tr" });
  const lang = (raw || "tr").toLowerCase();

  const title = byLang(lang, product?.title);
  const desc  = byLang(lang, product?.description);

  // Galeri (kapak + çoklu, mükerrer temiz)
  const gallery = useMemo(() => {
    const rawImgs = [
      product?.image?.asset ? product.image : null,
      ...(product?.images || []).filter((im) => im?.asset),
    ].filter(Boolean);

    const urls = rawImgs
      .map((img) =>
        urlFor(img)?.width(1200)?.height(900)?.fit("max")?.auto("format")?.url()
      )
      .filter(Boolean);

    return Array.from(new Set(urls));
  }, [product]);

  const [current, setCurrent] = useState(0);
  const hasMany = gallery.length > 1;
  const prevImg = () => setCurrent((i) => (i - 1 + gallery.length) % gallery.length);
  const nextImg = () => setCurrent((i) => (i + 1) % gallery.length);

  useEffect(() => {
    if (!hasMany) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasMany]);

  // Specs’i grupla + sırala
  const grouped = useMemo(() => {
    const out = {};
    for (const s of product?.specs || []) {
      const g = s?.groupKey || s?.spec?.group || "other";
      (out[g] ||= []).push(s);
    }
    Object.keys(out).forEach((g) => {
      out[g].sort((a, b) => (a?.spec?.order ?? 0) - (b?.spec?.order ?? 0));
    });
    return out;
  }, [product]);

  const datasheets = (product?.datasheets || []).filter((d) => d?.url);

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative h-[40vh] md:h-[48vh] lg:h-[52vh]">
          <Image
            src="/images/urunler/teknik-bilgiler-slide.png"
            alt={title || "hero"}
            fill
            className="object-cover"
            priority={false}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,19,139,.8),rgba(11,31,58,.45))]" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <h1 className={`${rajdhani.className} text-white text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-[0.06em] drop-shadow`}>
              {lang === "en" ? "Technical Specifications" : "Teknik Bilgiler"}
            </h1>
          </div>
        </div>
      </section>

      {/* CONTENT – açık tema */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/urunler" className="hover:text-[#00138B]">
            {lang === "en" ? "Products" : "Ürünler"}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Görsel kartı */}
          <div className="lg:col-span-6">
            <div className="group relative w-full overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-[0_10px_28px_rgba(0,0,0,.10)]">
              <div className="relative w-full" style={{ aspectRatio: "5/4" }}>
                {gallery.length ? (
                  <Image
                    key={gallery[current]}
                    src={gallery[current]}
                    alt={title || (lang === "en" ? "product image" : "ürün görseli")}
                    fill
                    sizes="(min-width:1024px) 600px, 90vw"
                    className="object-contain p-3 md:p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-gray-400">
                    {lang === "en" ? "No Image" : "Görsel Yok"}
                  </div>
                )}
              </div>

              {/* Alt ince çizgi */}
              <div className="absolute inset-x-3 bottom-2 h-[3px] rounded-full bg-gradient-to-r from-[#2BA84A]/80 via-[#2BA84A]/30 to-[#00138B]/80" />

              {/* Galeri navigasyonu */}
              {hasMany && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <button
                    onClick={prevImg}
                    className="w-8 h-8 rounded bg-[#00138B] text-white hover:bg-[#2BA84A] transition"
                    aria-label={lang === "en" ? "Previous image" : "Önceki görsel"}
                  >
                    ‹
                  </button>
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      aria-label={`${lang === "en" ? "Image" : "Görsel"} ${i + 1}`}
                      className={`h-2 rounded transition-all ${
                        i === current ? "w-6 bg-[#2BA84A]" : "w-2 bg-gray-400"
                      }`}
                    />
                  ))}
                  <button
                    onClick={nextImg}
                    className="w-8 h-8 rounded bg-[#00138B] text-white hover:bg-[#2BA84A] transition"
                    aria-label={lang === "en" ? "Next image" : "Sonraki görsel"}
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sağ kolon */}
          <div className="lg:col-span-6">
            <div className="inline-block rounded-md bg-[#EAFBF0] text-[#0B1F3A] text-xs font-semibold uppercase tracking-[0.06em] px-3 py-1">
              {lang === "en" ? "Technical Info" : "Teknik Bilgiler"}
            </div>

            <h2 className={`${rajdhani.className} mt-3 text-2xl md:text-3xl font-extrabold text-[#00138B] uppercase tracking-[0.04em]`}>
              {title}
            </h2>

            {desc && <p className="mt-4 text-gray-700 leading-relaxed">{desc}</p>}

            {/* Dokümanlar */}
            {datasheets.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-[#00138B] mb-3">
                  {lang === "en" ? "Documents" : "Dokümanlar"}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {datasheets.map((d, i) => (
                    <li key={i}>
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-md border border-[#00138B]/15 bg-white px-3 py-2 text-sm hover:bg-[#F3F6FF] transition"
                      >
                        <span className="inline-flex items-center gap-2 text-[#00138B]">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                            <path d="M7 10h10M7 14h6M6 3h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {byLang(lang, d.title) || "PDF"}
                        </span>
                        <span className="text-[#2BA84A] text-xs">{lang === "en" ? "Download" : "İndir"}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10">
              <Link href="/urunler" className="inline-block bg-[#00138B] text-white px-5 py-2.5 rounded hover:bg-[#2BA84A] transition">
                {lang === "en" ? "Back to Products" : "Ürünlere Dön"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPECS: koyu arkaplan, TR/EN alanlardan okur ===== */}
      <section className="relative bg-[#0A0F1A] py-12">
        {/* low-poly doku */}
        <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.10]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,0 20,0 0,20" fill="#2BA84A" />
          <polygon points="100,0 80,0 100,20" fill="#102C8C" />
          <polygon points="0,100 20,100 0,80" fill="#102C8C" />
          <polygon points="100,100 80,100 100,80" fill="#2BA84A" />
        </svg>

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="space-y-10">
            {Object.entries(grouped).map(([groupKey, specs]) => {
              const gLabel =
                byLang(lang, groupLabels?.[groupKey]) ||
                groupLabels?.[groupKey]?.[lang] ||
                groupLabels?.[groupKey]?.tr ||
                groupKey;

              return (
                <section key={groupKey}>
                  <GroupBarDark>{gLabel}</GroupBarDark>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {specs.map((s, i) => (
                      <SpecCardDark
                        key={i}
                        label={specLabel(lang, s?.spec)}
                        value={specValue(lang, s)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}