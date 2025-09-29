"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useEffect, useState } from "react";
import { Rajdhani } from "next/font/google";
import { urlFor } from "@/sanity/lib/image";
import { groupLabels } from "@/sanity/lib/constants";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// — Yeni, sade tasarım için küçük yardımcılar —
const pick = (obj) => (typeof obj === "string" ? obj : obj?.tr ?? obj?.en ?? "");

// Yumuşak köşeli, minimal aksanlı başlık şeridi (clip yerine rounded + border-accent)
function GroupBar({ children }) {
  return (
    <div
      className={`
        ${rajdhani.className}
        relative h-11 px-5 inline-flex items-center
        text-white font-semibold text-sm uppercase tracking-[0.05em]
        rounded-lg
        bg-gradient-to-r from-[#00138B] to-[#2BA84A]
        shadow-sm
      `}
    >
      {/* İnce alt vurgu çizgisi */}
      <span className="pointer-events-none absolute bottom-0 left-2 right-2 h-[3px] rounded-full bg-white/15" />
      {children}
    </div>
  );
}

// Özellik kutusu: yumuşak köşe + köşede mini aksan
function SpecCard({ label, value }) {
  return (
    <div className="relative rounded-xl bg-white border border-slate-200 shadow-[0_6px_18px_rgba(0,0,0,.06)] overflow-hidden">
      {/* Köşe aksanı (sağ üst) */}
      <div className="pointer-events-none absolute -right-[24px] -top-[24px] w-16 h-16 rotate-45 bg-gradient-to-br from-[#EAF3FF] to-[#F2FFF6]" />
      {/* Alt mini gradient çizgi */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[6px] bg-gradient-to-r from-[#2BA84A]/80 via-[#2BA84A]/30 to-[#00138B]/80" />

      <div className="relative p-4">
        <div className="text-[12px] font-semibold text-slate-700 uppercase tracking-[0.04em]">
          {label}
        </div>
        <div className="mt-1 text-sm md:text-base text-slate-900 break-words">
          {value}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailClient({ product }) {
  const title = pick(product.title);
  const desc = pick(product.description);

  // Galeri
  const gallery = useMemo(() => {
    const raw = [
      product?.image?.asset ? product.image : null,
      ...(product?.images || []).filter((im) => im?.asset),
    ].filter(Boolean);

    const urls = raw
      .map((img) => urlFor(img)?.width(1200)?.height(900)?.fit("max")?.auto("format")?.url())
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

  // Gruplama + sıra
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

  const fmtValue = (s) => {
    if (!s) return "";
    const base = s.valueText || "";
    return s.unitOverride ? `${base} ${s.unitOverride}` : base;
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* HERO — düz ve simetrik */}
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
          {/* Sade gradient örtü */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,19,139,.8),rgba(11,31,58,.45))]" />
          {/* Ortalanmış başlık */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <h1
              className={`${rajdhani.className} text-white text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-[0.06em] drop-shadow`}
            >
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10">
        {/* breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/urunler" className="hover:text-[#00138B]">Ürünler</Link>
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
                    alt={title || "product image"}
                    fill
                    sizes="(min-width:1024px) 600px, 90vw"
                    className="object-contain p-3 md:p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-gray-400">
                    Görsel Yok
                  </div>
                )}
              </div>

              {/* Alt ince çizgi */}
              <div className="absolute inset-x-3 bottom-2 h-[3px] rounded-full bg-gradient-to-r from-[#2BA84A]/80 via-[#2BA84A]/30 to-[#00138B]/80" />

              {/* Navigasyon — tek görselde gizli */}
              {hasMany && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <button
                    onClick={prevImg}
                    className="w-8 h-8 rounded bg-[#00138B] text-white hover:bg-[#2BA84A] transition"
                    aria-label="Önceki görsel"
                  >
                    ‹
                  </button>
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      aria-label={`Görsel ${i + 1}`}
                      className={`h-2 rounded transition-all ${
                        i === current ? "w-6 bg-[#2BA84A]" : "w-2 bg-gray-400"
                      }`}
                    />
                  ))}
                  <button
                    onClick={nextImg}
                    className="w-8 h-8 rounded bg-[#00138B] text-white hover:bg-[#2BA84A] transition"
                    aria-label="Sonraki görsel"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sağ kolon */}
          <div className="lg:col-span-6">
            {/* Yumuşatılmış chip */}
            <div className="inline-block rounded-md bg-[#EAFBF0] text-[#0B1F3A] text-xs font-semibold uppercase tracking-[0.06em] px-3 py-1">
              Teknik Bilgiler
            </div>

            <h2 className={`${rajdhani.className} mt-3 text-2xl md:text-3xl font-extrabold text-[#00138B] uppercase tracking-[0.04em]`}>
              {title}
            </h2>

            {desc && <p className="mt-4 text-gray-700 leading-relaxed">{desc}</p>}

            {/* Dokümanlar */}
            {product?.datasheets?.some((d) => d?.url) && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-[#00138B] mb-3">Dokümanlar</h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {product.datasheets.map((d, i) =>
                    d?.url ? (
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
                            {(typeof d.title === "string" ? d.title : d.title?.tr || d.title?.en) || "PDF"}
                          </span>
                          <span className="text-[#2BA84A] text-xs">İndir</span>
                        </a>
                      </li>
                    ) : null
                  )}
                </ul>
            </div>
            )}

            <div className="mt-10">
              <Link href="/urunler" className="inline-block bg-[#00138B] text-white px-5 py-2.5 rounded hover:bg-[#2BA84A] transition">
                Ürünlere Dön
              </Link>
            </div>
          </div>
        </div>

        {/* ===== Gruplandırılmış Teknik Özellikler — sade şerit + yumuşak kart ===== */}
        <div className="mt-14 space-y-10">
          {Object.entries(grouped).map(([groupKey, specs]) => {
            const gLabel = groupLabels?.[groupKey]?.tr || groupKey;
            return (
              <section key={groupKey} className="max-w-[1000px]">
                <GroupBar>{gLabel}</GroupBar>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {specs.map((s, i) => {
                    const left =
                      (typeof s?.spec?.label === "object")
                        ? (s?.spec?.label?.tr || s?.spec?.label?.en || s?.spec?.key || "")
                        : (s?.spec?.label || s?.spec?.key || "");
                    const value = s?.unitOverride
                      ? `${s?.valueText || ""} ${s.unitOverride}`
                      : (s?.valueText || "");

                    return <SpecCard key={i} label={left} value={value} />;
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}