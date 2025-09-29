// src/app/urunler/[slug]/page.jsx
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";

export const revalidate = 600;

export async function generateStaticParams() {
  const slugs = await client.fetch(groq`
    *[_type=="product" && defined(slug.current)][].slug.current
  `);
  return slugs.map((slug) => ({ slug }));
}

const productBySlugQuery = groq`
*[_type=="product" && slug.current==$slug][0]{
  _id,
  "slug": slug.current,
  title,
  description,
  // kapak + çoklu görseller (asset ref'leriyle)
  image,
  images[],

  // ✅ TÜM ÖZELLİKLER (grup + referans çözülmüş)
  specs[]{
    groupKey,
    valueText,
    unitOverride,
    spec->{
      key, label, shortLabel, unit, group, order, showInCard
    }
  },

  // Dokümanlar (url'e çözümlenmiş)
  datasheets[]{
    title,
    "url": file.asset->url
  }
}
`;

export default async function ProductDetailPage({ params }) {
  const product = await client.fetch(productBySlugQuery, { slug: params.slug });
  if (!product) return notFound();
  return <ProductDetailClient product={product} />;
}

// Bu import en altta olmalı ki dev/edge derleyicisi döngü görmesin
import ProductDetailClient from "@/components/urunler/ProductDetailClient";