"use client";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

// — Tutarlı ikon seti —
function IconLocation(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}>
      <path d="M12 21s-7-4.6-7-10a7 7 0 1 1 14 0c0 5.4-7 10-7 10Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="2.6"
        stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}>
      <path d="M22 17v2.9a2.1 2.1 0 0 1-2.3 2A19.8 19.8 0 0 1 3.1 9.9 19.7 19.7 0 0 1 2.1 2.3 2.1 2.1 0 0 1 4 .2H7a2.1 2.1 0 0 1 2 1.8c.1.9.3 1.8.6 2.6.2.6.1 1.3-.3 1.8L8 7.5a16 16 0 0 0 6.5 6.5l1.1-1.2c.5-.5 1.2-.6 1.8-.3.8.3 1.7.5 2.6.6 1 .1 1.8.9 2 .9Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.5"
        stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 6.5 12 12l8-5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconClock(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}>
      <circle cx="12" cy="12" r="8.5"
        stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function IletisimBilgiKartlari() {
  const ctx = (typeof useI18n === "function" ? useI18n() : null) || { lang: "tr" };
  const lang = (ctx.lang || "tr").toLowerCase();

  const t = {
    tr: {
      cards: [
        { title: "Genel Merkez", lines: ["İstanbul / Türkiye"], icon: <IconLocation /> },
        { title: "Telefon", lines: ["+90 (212) 000 00 00"], href: "tel:+902120000000", icon: <IconPhone /> },
        { title: "E-posta", lines: ["info@optimusprime.com"], href: "mailto:info@optimusprime.com", icon: <IconMail /> },
        { title: "Çalışma Saatleri", lines: ["Hafta içi 09:00 – 18:00", "Cumartesi 10:00 – 14:00"], icon: <IconClock /> },
      ],
      go: "Git →",
    },
    en: {
      cards: [
        { title: "Headquarters", lines: ["Istanbul / Türkiye"], icon: <IconLocation /> },
        { title: "Phone", lines: ["+90 (212) 000 00 00"], href: "tel:+902120000000", icon: <IconPhone /> },
        { title: "Email", lines: ["info@optimusprime.com"], href: "mailto:info@optimusprime.com", icon: <IconMail /> },
        { title: "Business Hours", lines: ["Weekdays 09:00 – 18:00", "Saturday 10:00 – 14:00"], icon: <IconClock /> },
      ],
      go: "Go →",
    },
  }[lang];

  return (
    <section className="relative">
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.cards.map((c, i) => {
            const Wrapper = c.href ? Link : "div";
            const props = c.href ? { href: c.href } : {};

            return (
              <Wrapper
                key={i}
                {...props}
                className="
                  group relative overflow-hidden
                  rounded-2xl bg-white
                  border border-gray-200
                  shadow-[0_10px_24px_rgba(0,0,0,.08)]
                  hover:shadow-[0_16px_36px_rgba(0,0,0,.12)]
                  transition
                  p-5
                "
              >
                {/* Low-poly köşe aksanları */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon points="0,0 18,0 0,18" fill="#2BA84A" />
                  <polygon points="100,100 82,100 100,82" fill="#00138B" />
                </svg>

                {/* İçerik */}
                <div className="flex items-start gap-3 text-[#00138B] relative">
                  <div className="shrink-0 mt-[2px] text-[#102C8C]">{c.icon}</div>
                  <div>
                    <div className="font-extrabold text-[#00138B]">{c.title}</div>
                    {c.lines.filter(Boolean).map((l, idx) => (
                      <div key={idx} className="text-gray-700">{l}</div>
                    ))}
                  </div>
                </div>

                {/* Alt “Git/Go →” */}
                {c.href && (
                  <div className="mt-3 text-sm text-[#2BA84A] opacity-0 group-hover:opacity-100 transition">
                    {t.go}
                  </div>
                )}

                {/* Alt gradient şerit (kesiksiz) */}
                <div
                  className="absolute left-0 right-0 bottom-0 h-[8px]"
                  style={{
                    background:
                      "linear-gradient(90deg,rgba(43,168,74,.95),rgba(43,168,74,.30),rgba(0,19,139,.95))",
                  }}
                />
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}