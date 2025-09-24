"use client";
import Image from "next/image";
import Link from "next/link";
import { Orbitron } from "next/font/google";

// Google Fonts → bileşen içinde çağır
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export default function About() {
  return (
    <section id="hakkimizda" className="relative w-full bg-white">
      {/* arka plan dokusu */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_10%_0%,rgba(11,31,58,0.06),transparent_60%)]" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Görsel */}
        <div className="relative w-full max-w-[600px] order-1 lg:order-2">
          <div className="relative w-full aspect-[5/4] rounded-2xl overflow-hidden ring-1 ring-black/5">
            <Image
              src="/images/home/about.jpg"
              alt="Optimus Prime üretim alanı"
              fill
              className="object-cover"
              sizes="(min-width:1024px) 50vw, 100vw"
              priority
            />
            {/* köşe rozeti */}
            <div className="absolute top-4 left-4">
              <span
                className={`${orbitron.className} inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1.5 text-[12px] font-semibold text-[#0B1F3A] uppercase tracking-[0.08em]`}
              >
                <span className="h-2 w-2 rounded-full bg-[#2BA84A]" />
                Premium Engine Parts
              </span>
            </div>
          </div>
        </div>

        {/* Metin */}
        <div className="order-2 lg:order-1">
          {/* başlık bloğu */}
          <div className="flex items-start gap-4">
            <span className="mt-1 inline-block h-9 w-1.5 rounded-full bg-[#2BA84A]" />
            <div>
              <h2
                className={`${orbitron.className} text-3xl lg:text-4xl font-semibold text-[#0B1F3A] uppercase tracking-[0.06em]`}
              >
                Hakkımızda
              </h2>
              <p
                className={`${orbitron.className} mt-1 text-sm font-semibold text-[#2BA84A] uppercase tracking-[0.16em]`}
              >
                GÜVENİLİR TEDARİK · HIZLI ÇÖZÜM
              </p>
            </div>
          </div>

          {/* açıklamalar */}
          <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>Optimus Prime</strong>, endüstriyel motor parça ve
              çözümlerinde uzman, güvenilir bir markadır. Yüksek performanslı ve
              uzun ömürlü ürünleri; kalite standartlarına uygun şekilde tedarik
              ederek işletmelerin duruş sürelerini azaltır.
            </p>
            <p>
              Güçlü tedarik ağı, izlenebilir kalite süreçleri ve müşteri
              odaklı yaklaşımımızla; enerji, inşaat, madencilik, tarım ve sanayi
              gibi farklı sektörlerin ihtiyaçlarına cevap veriyoruz.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-6">
            <div className="inline-flex w-full sm:w-auto items-center gap-3 rounded-2xl backdrop-blur py-3">
              <Link
                href="/hakkimizda"
                className={`${orbitron.className} inline-flex items-center gap-2 rounded-lg bg-[#0B1F3A] px-4 py-2 text-white font-semibold hover:opacity-90 transition uppercase tracking-[0.06em]`}
              >
                Daha Fazlası
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/iletisim"
                className={`${orbitron.className} inline-flex items-center gap-2 rounded-lg border border-[#0B1F3A]/30 bg-white px-4 py-2 text-[#0B1F3A] font-semibold hover:bg-[#0B1F3A]/5 transition uppercase tracking-[0.06em]`}
              >
                Teklif Al
              </Link>
            </div>
          </div>

          {/* Logo satırı */}
          <div className="pt-8">
            <Image
              src="/images/logo2.png"
              alt="Optimus Prime Logo"
              width={220}
              height={64}
              className="h-17 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}