import HakkimizdaHero from "@/components/hakkimizda/HakkimizdaHero";
import HakkimizdaIntro from "@/components/hakkimizda/HakkimizdaIntro";
import HakkimizdaMisyonVizyon from "@/components/hakkimizda/HakkimizdaMisyonVizyon";
import HakkimizdaIstatistikler from "@/components/hakkimizda/HakkimizdaIstatistikler";
import HakkimizdaTimeline from "@/components/hakkimizda/HakkimizdaTimeline";
import HakkimizdaCTA from "@/components/hakkimizda/HakkimizdaCTA";

export const metadata = {
  title: "Hakkımızda",
  description:
    "Optimus Prime — endüstriyel motorlar, jeneratör uygulamaları ve güç çözümlerinde verimlilik ve dayanıklılık.",
  alternates: { canonical: "https://www.site-adresiniz.com/hakkimizda" },
};

export default function HakkimizdaPage() {
  return (
    <main className="bg-[#FBFBFB]">
      <HakkimizdaHero />
      <HakkimizdaIntro />
      <HakkimizdaMisyonVizyon />
      <HakkimizdaIstatistikler />
      <HakkimizdaTimeline />
      <HakkimizdaCTA />
    </main>
  );
}