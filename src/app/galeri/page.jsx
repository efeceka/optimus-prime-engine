"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Rajdhani } from "next/font/google";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["600", "700"] });

export default function GalleryPage() {
  const { lang: raw } =
    (typeof useI18n === "function" ? useI18n() : { lang: "tr" }) || { lang: "tr" };
  const lang = (raw || "tr").toLowerCase();

  const T =
    {
      tr: { title: "GALERİ", empty: "Şimdilik yüklü görsel bulunmuyor.", prev: "Önceki", next: "Sonraki", close: "Kapat" },
      en: { title: "GALLERY", empty: "No images yet.", prev: "Previous", next: "Next", close: "Close" },
    }[lang] || { title: "GALERİ", empty: "Şimdilik yüklü görsel bulunmuyor.", prev: "Önceki", next: "Sonraki", close: "Kapat" };

  const IMAGES = useMemo(
    () => [
      { src: "/images/home/about.webp", w: 1600, h: 1066, title: { tr: "Motor", en: "Engine" } },
      { src: "/images/home/about.webp", w: 1600, h: 1066, title: { tr: "Motor", en: "Engine" } },
      { src: "/images/home/about.webp", w: 1600, h: 1066, title: { tr: "Motor", en: "Engine" } },
      { src: "/images/home/about.webp", w: 1600, h: 1066, title: { tr: "Motor", en: "Engine" } },
      { src: "/images/home/about.webp", w: 1600, h: 1066, title: { tr: "Motor", en: "Engine" } },
      { src: "/images/home/about.webp", w: 1600, h: 1066, title: { tr: "Motor", en: "Engine" } },
    ],
    []
  );

  const pick = (obj) => (typeof obj === "string" ? obj : obj?.[lang] ?? obj?.tr ?? obj?.en ?? "");

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const has = IMAGES.length > 0;

  const openAt = useCallback((i) => { setIdx(i); setOpen(true); }, []);
  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + IMAGES.length) % IMAGES.length), [IMAGES.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % IMAGES.length), [IMAGES.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  return (
    <main className="min-h-screen bg-[#0A0F1A]">
      <section className="relative w-full h-[56vh] min-h-[420px] overflow-hidden">
        <Image
          src="/images/home/showcase.webp"
          alt="Gallery Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.35))]" />
        <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-10 h-full flex items-end pb-10">
          <div>
            <h1 className={`${rajdhani.className} text-white text-4xl md:text-5xl font-bold uppercase tracking-[0.06em] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]`}>
              {T.title}
            </h1>
            <div className="mt-4 h-[3px] w-28 bg-gradient-to-r from-[#2BA84A] via-[#2BA84A]/80 to-[#00138B] rounded-full" />
          </div>
        </div>
      </section>

      <section className="relative">
        <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.10]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,0 22,0 0,22" fill="#2BA84A" />
          <polygon points="100,0 78,0 100,22" fill="#102C8C" />
          <polygon points="0,100 22,100 0,78" fill="#102C8C" />
          <polygon points="100,100 78,100 100,78" fill="#2BA84A" />
        </svg>

        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10 py-12">
          {!has ? (
            <div className="rounded-xl bg-white/10 border border-white/15 text-white/90 p-10 text-center">
              {T.empty}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {IMAGES.map((img, i) => (
                <button
                  key={`${img.src}-${i}`}  // 🔧 benzersiz key
                  onClick={() => openAt(i)}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-[0_10px_28px_rgba(0,0,0,.35)] focus:outline-none"
                  style={{ clipPath: "polygon(4% 0, 100% 0, 100% 92%, 96% 100%, 0 100%, 0 8%)" }}
                  aria-label={pick(img.title) || `Image ${i + 1}`}
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#2BA84A] via-white/60 to-[#102C8C] opacity-90 z-10" />
                  <div className="relative w-full" style={{ aspectRatio: "5/4" }}>
                    <Image
                      src={img.src}
                      alt={pick(img.title) || "Gallery image"}
                      fill
                      sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      priority={i < 3}
                    />
                  </div>
                  <div className="absolute left-3 right-3 bottom-3">
                    <div
                      className="text-white text-xs font-semibold px-3 py-2 tracking-[0.02em] line-clamp-1"
                      style={{
                        background: "linear-gradient(90deg, rgba(16,44,140,.95), rgba(255,255,255,.35))",
                        clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                      }}
                    >
                      {pick(img.title)}
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-6 bottom-3 h-10 rounded-full blur-2xl bg-gradient-to-r from-[#2BA84A33] via-white/20 to-[#00138B33] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {open && has && (
        <div className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={close} role="dialog" aria-modal="true">
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <Image
                key={`${IMAGES[idx].src}-${idx}`}
                src={IMAGES[idx].src}
                alt={pick(IMAGES[idx].title) || "Gallery image"}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
              {pick(IMAGES[idx].title) ? (
                <div className="absolute left-3 right-3 bottom-3 text-white/95 text-sm md:text-base">
                  <div
                    className="inline-block px-3 py-1"
                    style={{
                      background: "linear-gradient(90deg, rgba(16,44,140,.95), rgba(255,255,255,.35))",
                      clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                    }}
                  >
                    {pick(IMAGES[idx].title)}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex items-center justify-between text-white">
              <button onClick={prev} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md border border-white/20" aria-label={T.prev}>
                ‹ {T.prev}
              </button>
              <div className="text-white/70 text-sm">{idx + 1} / {IMAGES.length}</div>
              <button onClick={next} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md border border-white/20" aria-label={T.next}>
                {T.next} ›
              </button>
            </div>

            <button onClick={close} className="absolute -top-2 -right-2 w-10 h-10 grid place-items-center rounded-full bg-white text-black hover:opacity-90" aria-label={T.close} title={T.close}>
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}