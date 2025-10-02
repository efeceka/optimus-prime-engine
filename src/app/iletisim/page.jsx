import IletisimHero from "@/components/iletisim/IletisimHero";
import IletisimBilgiKartlari from "@/components/iletisim/IletisimBilgiKartlari";
import IletisimForm from "@/components/iletisim/IletisimForm";
import IletisimHarita from "@/components/iletisim/IletisimHarita";

export const metadata = {
  title: "İletişim",
  description:
    "Optimus Prime iletişim: satış, teknik destek, servis ve iş birliği için bize ulaşın.",
  alternates: { canonical: "https://www.site-adresiniz.com/iletisim" },
};

export default function IletisimPage() {
  return (
    <main className="bg-[#FBFBFB]">
      <IletisimHero />
      <IletisimBilgiKartlari />
      <IletisimForm />
      <IletisimHarita />
    </main>
  );
}