"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Rajdhani } from "next/font/google";
import { useI18n } from "@/i18n/I18nProvider"; // ✅

const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400","500","600","700"] });

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useI18n();     // ✅ context’ten al
  const panelRef = useRef(null);
  const toggleBtnRef = useRef(null);

  if (pathname?.startsWith("/studio")) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onClickOutside = (e) => {
      const panel = panelRef.current;
      const toggleBtn = toggleBtnRef.current;
      if (!panel) return;
      const clickedInside = panel.contains(e.target);
      const clickedToggle = toggleBtn && toggleBtn.contains(e.target);
      if (!clickedInside && !clickedToggle) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClickOutside, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClickOutside, true);
    };
  }, [open]);

  const isTR = (lang ?? "tr").toLowerCase() === "tr";
  const menu = [
    { key: "home", href: "/",         label: isTR ? "Anasayfa"  : "Home" },
    { key: "about", href: "/hakkimizda", label: isTR ? "Hakkımızda" : "About" },
    { key: "products", href: "/urunler",  label: isTR ? "Ürünler"   : "Products" },
    { key: "gallery", href: "/galeri",    label: isTR ? "Galeri"    : "Gallery" },
    { key: "contact", href: "/iletisim",  label: isTR ? "İletişim"  : "Contact" },
  ];

  const linkBase = `${rajdhani.className} relative text-sm lg:text-[20px] uppercase tracking-[0.08em] font-semibold transition-colors`;
  const linkIdle = "text-white/80 hover:text-white";
  const linkActive = "text-white after:absolute after:-bottom-2 after:left-1/2 after:h-[2px] after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-white/90";

  return (
    <header className={["fixed inset-x-0 top-0 z-50 pt-3","backdrop-blur",scrolled ? "bg-black/50 shadow-[0_5px_20px_-10px_rgba(0,0,0,.6)]" : "bg-black/30"].join(" ")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="max-w-[1440px] mx-auto h-16 md:h-20 px-4 md:px-6 lg:px-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          <Image src="/images/logo3.png" alt="Optimus Prime" width={170} height={48} priority className="h-10 w-auto md:h-10 lg:h-16" />
        </Link>

        <nav className="hidden md:flex flex-1 justify-center gap-8 lg:gap-12">
          {menu.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.key} href={item.href} className={`${linkBase} ${active ? linkActive : linkIdle}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {/* ✅ Dil toggle: context’i değiştiriyor */}
          <button
            onClick={() => setLang(isTR ? "en" : "tr")}
            className={`${rajdhani.className} px-3 py-1.5 md:px-4 md:py-2 border border-white/80 text-white rounded-full text-sm md:text-base font-medium hover:bg-white hover:text-black transition tracking-[0.08em]`}
          >
            {(lang ?? "tr").toUpperCase()} {/* TR / EN dinamik */}
          </button>

          <button
            ref={toggleBtnRef}
            type="button"
            className="md:hidden grid place-items-center w-10 h-10 rounded-md border border-white/50 text-white/90 hover:text-white hover:border-white transition relative z-[51]"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            )}
          </button>
        </div>
      </div>

      <div
        ref={panelRef}
        className={[
          "md:hidden overflow-hidden bg-black/70 backdrop-blur-sm",
          "transition-[max-height,opacity,transform] duration-300",
          open ? "max-h-[60vh] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2",
        ].join(" ")}
      >
        <nav className="px-4 pb-4">
          <ul className="flex flex-col divide-y divide-white/10">
            {menu.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 ${rajdhani.className} uppercase tracking-[0.08em] font-medium ${pathname === item.href ? "text-white" : "text-white/95 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}