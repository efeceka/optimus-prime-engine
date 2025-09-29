import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import UrunlerHero from "@/components/urunler/UrunlerHero";
import UrunlerIntroFilters from "@/components/urunler/UrunlerIntroFilters";

export const revalidate = 600;

// kW/Hz filtre için specs da çekiyoruz
const productsQuery = groq`*[_type=="product"]{
  _id,
  "slug": slug.current,
  title,
  description,
  image,
  images[],
  sortOrder,
  "specs": specs[]{
    valueText,
    "spec": spec->{
      key,
      showInCard,
      order
    }
  }
}`;

export default async function ProductsPage() {
  const products = await client.fetch(productsQuery);

  return (
    <main className="bg-[#FBFBFB]">
      {/* Hero */}
      <UrunlerHero />

      {/* Filtreler + Grid */}
      <UrunlerIntroFilters products={products} />
    </main>
  );
}