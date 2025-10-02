"use client";

export default function IletisimHarita() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(43,168,74,.06),rgba(0,19,139,.06))]" />
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10 py-12">
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-[0_12px_28px_rgba(0,0,0,.08)]">
          {/* Google Maps embed (adresini değiştir) */}
          <iframe
            title="Harita"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.1729!2d28.979530!3d41.015137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSXTEn2Fuc2F5YQ!5e0!3m2!1str!2str!4v1710000000000"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}