"use client";
import Link from "next/link";
import Image from "next/image";
import { Rajdhani } from "next/font/google";
import { useI18n } from "@/i18n/I18nProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Footer() {
  const year = new Date().getFullYear();
  const ctx = (typeof useI18n === "function" ? useI18n() : null) || { lang: "tr" };
  const LANG = (ctx.lang || "tr").toLowerCase();

  const t = {
    tr: {
      slogan:
        "Ağır hizmet dizel motorlar ve yedek parçalarında güvenilir tedarik. Hızlı lojistik, yüksek uyumluluk, şeffaf fiyat.",
      chip: "Premium Enerji Çözümleri",
      menus: "Menüler",
      home: "Anasayfa",
      about: "Hakkımızda",
      products: "Ürünler",
      gallery: "Galeri",
      contact: "İletişim",
      addressLabel: "Adres",
      address: "İstanbul, Türkiye",
      phoneLabel: "Telefon",
      phone: "+90 212 222 11 22",
      mailLabel: "E-posta",
      mail: "info@optimusprime.com",
      work: "Çalışma: Hafta içi 09:00 – 18:00",
      location: "Konum",
      openMap: "Haritada Aç",
      rights: "Tüm hakları saklıdır.",
      tagline: "Endüstriyel güç çözümleri · Güvenilir tedarik",
      mapsQuery: "Istanbul,Turkey",
      mapsTitle: "Optimus Prime Konum",
    },
    en: {
      slogan:
        "Reliable supply for heavy-duty diesel engines and spare parts. Fast logistics, high compatibility, transparent pricing.",
      chip: "Premium Energy Solutions",
      menus: "Menus",
      home: "Home",
      about: "About",
      products: "Products",
      gallery: "Gallery",
      contact: "Contact",
      addressLabel: "Address",
      address: "Istanbul, Türkiye",
      phoneLabel: "Phone",
      phone: "+90 212 222 11 22",
      mailLabel: "E-mail",
      mail: "info@optimusprime.com",
      work: "Hours: Weekdays 09:00 – 18:00",
      location: "Location",
      openMap: "Open in Maps",
      rights: "All rights reserved.",
      tagline: "Industrial power solutions · Reliable supply",
      mapsQuery: "Istanbul,Turkey",
      mapsTitle: "Optimus Prime Location",
    },
  }[LANG];

  const bandClip = "polygon(6% 0, 100% 0, 94% 100%, 0 100%)";
  const chipClip = "polygon(10% 0, 100% 0, 90% 100%, 0 100%)";

  const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    t.mapsQuery
  )}&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    t.mapsQuery
  )}`;

  return (
    <footer className="relative w-full bg-[#0A0F1A] text-white">
      {/* Üst ayırıcı */}
      <div
        className="h-8 md:h-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(247,250,255,.0) 0%, rgba(11,31,58,.20) 100%)",
          WebkitClipPath: bandClip,
          clipPath: bandClip,
        }}
      />

      {/* Low-poly arka plan */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="f-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00138B" />
            <stop offset="100%" stopColor="#2BA84A" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#f-g)" opacity="0.10" />
        <polygon points="0,0 28,0 12,16" fill="#2BA84A" opacity="0.16" />
        <polygon points="100,0 64,0 86,18" fill="#2BA84A" opacity="0.10" />
        <polygon points="100,100 60,100 88,74" fill="#00138B" opacity="0.18" />
        <polygon points="0,100 34,100 10,82" fill="#00138B" opacity="0.12" />
      </svg>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Marka / Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo3.png"
                alt="Optimus Prime"
                width={170}
                height={48}
                className="h-8 w-auto"
                priority
              />
            </Link>

            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              {t.slogan}
            </p>

            <div
              className={`${rajdhani.className} inline-flex items-center text-[12px] font-semibold text-[#0CE17C]`}
              style={{
                clipPath: chipClip,
                background: "rgba(12,225,124,0.10)",
                border: "1px solid rgba(12,225,124,0.25)",
              }}
            >
              <span className="px-3 py-1">{t.chip}</span>
            </div>

            {/* İletişim */}
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-white/85">
                {t.addressLabel}: {t.address}
              </li>
              <li className="text-white/85">
                {t.phoneLabel}:{" "}
                <a href="tel:+902122221122" className="hover:underline">
                  {t.phone}
                </a>
              </li>
              <li className="text-white/85">
                {t.mailLabel}:{" "}
                <a href="mailto:info@optimusprime.com" className="hover:underline">
                  {t.mail}
                </a>
              </li>
              <li className="text-white/70">{t.work}</li>
            </ul>
          </div>

          {/* Hızlı Menü */}
          <div>
            <h6
              className={`${rajdhani.className} text-white/95 font-bold tracking-[0.08em] text-sm`}
              style={{ textTransform: "uppercase" }}
            >
              {t.menus}
            </h6>
            <div className="mt-4 grid gap-2 text-sm">
              <FooterLink href="/">{t.home}</FooterLink>
              <FooterLink href="/hakkimizda">{t.about}</FooterLink>
              <FooterLink href="/urunler">{t.products}</FooterLink>
              <FooterLink href="/galeri">{t.gallery}</FooterLink>
              <FooterLink href="/iletisim">{t.contact}</FooterLink>
            </div>
          </div>

          {/* Geniş Google Map */}
          <div className="lg:col-span-1 lg:col-start-4">
            <h6
              className={`${rajdhani.className} text-white/95 font-bold tracking-[0.08em] text-sm`}
              style={{ textTransform: "uppercase" }}
            >
              {t.location}
            </h6>
            <div className="mt-4 rounded-xl overflow-hidden ring-1 ring-white/15 bg-white/5 backdrop-blur-sm">
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <iframe
                  title={t.mapsTitle}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  src={mapsSrc}
                />
              </div>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${rajdhani.className} block text-center text-xs tracking-[0.06em] text-white/90 hover:text-white py-2 border-t border-white/10`}
                style={{ textTransform: "uppercase" }}
              >
                {t.openMap}
              </a>
            </div>
          </div>
        </div>

        {/* Alt bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/70">
            © {year} Optimus Prime — {t.rights}
          </p>
          <p className="text-xs text-white/50">{t.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-white/80 hover:text-white transition inline-flex items-center gap-2"
    >
      <span className="h-[2px] w-2 bg-white/40 inline-block" />
      {children}
    </Link>
  );
}