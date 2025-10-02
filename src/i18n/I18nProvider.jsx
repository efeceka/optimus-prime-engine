"use client";
import { createContext, useContext, useEffect, useState } from "react";

const I18nContext = createContext({ lang: "tr", setLang: () => {} });

const STORAGE_KEY = "site:lang";

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("tr"); // "tr" | "en"

  // İlk açılışta localStorage’tan yükle
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "tr" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  // Değişince kaydet + <html lang="">
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}