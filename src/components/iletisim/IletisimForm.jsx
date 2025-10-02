"use client";
import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export default function IletisimForm() {
  const { lang } = useI18n();
  const isTR = lang === "tr";

  const t =
    {
      tr: {
        heading: "Bize Yazın",
        sub: "En kısa sürede dönüş yapalım.",
        name: "Ad Soyad *",
        email: "E-posta *",
        subject: "Konu",
        subjectPH: "Teklif, teknik destek, iş birliği…",
        message: "Mesaj *",
        ok: "E-posta istemcisi açılıyor…",
        send: "Gönder",
        boxTitle1: "Satış & Servis",
        boxText1:
          "Doğru motor seçimi, teknik dokümantasyon, yedek parça ve devreye alma için ekibimizle iletişime geçin.",
        phone: "Telefon",
        emailLabel: "E-posta",
        boxTitle2: "Teknik Destek",
        boxText2: "Ürün kurulumu, garanti, arıza tespiti ve bakım planlaması.",
        support: "Destek Talebi Oluştur",
      },
      en: {
        heading: "Contact Us",
        sub: "We will get back to you as soon as possible.",
        name: "Full Name *",
        email: "Email *",
        subject: "Subject",
        subjectPH: "Quotation, technical support, partnership…",
        message: "Message *",
        error: "Please fill in the required fields and accept the privacy policy.",
        ok: "Opening email client…",
        send: "Send",
        boxTitle1: "Sales & Service",
        boxText1:
          "Contact our team for the right engine selection, technical documentation, spare parts and commissioning.",
        phone: "Phone",
        emailLabel: "Email",
        boxTitle2: "Technical Support",
        boxText2: "Product installation, warranty, troubleshooting and maintenance planning.",
        support: "Create Support Request",
      },
    }[lang] || {
      heading: "Bize Yazın",
      sub: "En kısa sürede dönüş yapalım.",
      name: "Ad Soyad *",
      email: "E-posta *",
      subject: "Konu",
      subjectPH: "Teklif, teknik destek, iş birliği…",
      message: "Mesaj *",
      ok: "E-posta istemcisi açılıyor…",
      send: "Gönder",
      boxTitle1: "Satış & Servis",
      boxText1:
        "Doğru motor seçimi, teknik dokümantasyon, yedek parça ve devreye alma için ekibimizle iletişime geçin.",
      phone: "Telefon",
      emailLabel: "E-posta",
      boxTitle2: "Teknik Destek",
      boxText2: "Ürün kurulumu, garanti, arıza tespiti ve bakım planlaması.",
      support: "Destek Talebi Oluştur",
    };

  const [state, setState] = useState({
    ad: "",
    eposta: "",
    konu: "",
    mesaj: "",
  });
  const [status, setStatus] = useState({ type: "", msg: "" });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    if (!state.ad || !state.eposta || !state.mesaj) {
      setStatus({ type: "error", msg: t.error });
      return;
    }
    try {
      const subject = encodeURIComponent(state.konu || (isTR ? "Web İletişim" : "Web Contact"));
      const body = encodeURIComponent(
        `Ad: ${state.ad}\nE-posta: ${state.eposta}\nKonu: ${state.konu}\n\nMesaj:\n${state.mesaj}`
      );
      window.location.href = `mailto:info@optimusprime.com?subject=${subject}&body=${body}`;
      setStatus({ type: "ok", msg: t.ok });
    } catch {
      setStatus({ type: "error", msg: "Error. Please try again." });
    }
  };

  return (
    <section className="max-w-[1240px] mx-auto px-6 lg:px-10 py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Form */}
        <div className="md:col-span-7">
          <div className="rounded-xl bg-white border border-gray-200 shadow p-6">
            <h2 className="text-2xl font-extrabold text-[#00138B]">{t.heading}</h2>
            <p className="mt-1 text-gray-600">{t.sub}</p>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">{t.name}</label>
                  <input
                    name="ad"
                    value={state.ad}
                    onChange={onChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#00138B]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">{t.email}</label>
                  <input
                    type="email"
                    name="eposta"
                    value={state.eposta}
                    onChange={onChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#00138B]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">{t.subject}</label>
                <input
                  name="konu"
                  value={state.konu}
                  onChange={onChange}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#00138B]"
                  placeholder={t.subjectPH}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600">{t.message}</label>
                <textarea
                  name="mesaj"
                  value={state.mesaj}
                  onChange={onChange}
                  rows={6}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#00138B]"
                  required
                />
              </div>

              {status.msg && (
                <div
                  className={`text-sm ${
                    status.type === "ok" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status.msg}
                </div>
              )}

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-[#00138B] text-white px-5 py-2.5 font-semibold hover:bg-[#2BA84A] transition"
              >
                {t.send}
              </button>
            </form>
          </div>
        </div>

        {/* Info box — STICKY */}
        <div className="md:col-span-5">
          {/* Sticky sarmalayıcı: büyük ekranlarda sabit; mobilde normal akış */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-xl bg-[#0A0F1A] text-white border border-white/10 shadow p-6">
              <h3 className="text-xl font-bold">{t.boxTitle1}</h3>
              <p className="mt-2 text-white/85">{t.boxText1}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div>
                  <span className="text-white/60">{t.phone}:</span>{" "}
                  <a href="tel:+902120000000" className="underline">
                    +90 (212) 000 00 00
                  </a>
                </div>
                <div>
                  <span className="text-white/60">{t.emailLabel}:</span>{" "}
                  <a href="mailto:info@optimusprime.com" className="underline">
                    info@optimusprime.com
                  </a>
                </div>
              </div>

              <div className="mt-6 h-[1px] bg-white/10" />

              <h4 className="mt-6 font-bold">{t.boxTitle2}</h4>
              <p className="text-white/85 text-sm mt-1">{t.boxText2}</p>
              <a
                href="mailto:support@optimusprime.com"
                className="inline-flex mt-4 items-center justify-center rounded-md bg-white text-[#00138B] px-4 py-2 font-semibold hover:bg-[#A7F3D0] transition"
              >
                {t.support}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}