"use client";
import Image from "next/image";
import { Rajdhani } from "next/font/google";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function UrunlerHero() {
  return (
    <section className="relative w-full h-[70vh] min-h-[520px] overflow-hidden">
      {/* Arka plan görseli */}
      <Image
        src="/images/home/urunlerhero.webp"
        alt="Optimus Prime Ürünler"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 
                      pt-35 sm:pt-36 md:pt-32   text-center text-white">
        <h1
          className={`${rajdhani.className} 
            text-4xl sm:text-5xl lg:text-6xl 
            font-bold uppercase tracking-[0.08em] drop-shadow-lg`}
        >
          Ürünler
        </h1>
        <p className="mt-4 max-w-2xl mx-auto 
                      text-base sm:text-lg md:text-base 
                      leading-relaxed drop-shadow">
          Optimus Prime motor çözümleri: yüksek performanslı dizel motorlar,
          jeneratörler ve güç sistemleri. Dayanıklı, verimli ve global
          standartlarda üretim.
        </p>

        <div className="mx-auto mt-6 h-[3px] w-28 
                        bg-gradient-to-r from-[#2BA84A] via-[#2BA84A]/80 to-[#102C8C] rounded-full" />
      </div>
    </section>
  );
}