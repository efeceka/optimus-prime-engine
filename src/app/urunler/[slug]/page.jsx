// src/app/urunler/[slug]/page.jsx
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import ProductDetailClient from "@/components/urunler/ProductDetailClient";

export const revalidate = 600;

export async function generateStaticParams() {
  const slugs = await client.fetch(groq`
    *[_type=="product" && defined(slug.current)][].slug.current
  `);
  return (slugs || []).map((slug) => ({ slug }));
}

const productBySlugQuery = groq`
*[_type=="product" && slug.current==$slug][0]{
  _id,
  "slug": slug.current,
  title,
  description,
  image,
  images[],
  specs[]{
    groupKey,
    valueText,
    unitOverride,
    spec->{
      key, label, shortLabel, unit, group, order, showInCard
    }
  },
  datasheets[]{
    title,
    "url": file.asset->url
  }
}
`;

export default async function ProductDetailPage({ params }) {
  // ✅ Next.js 13.5+ dynamic APIs: params Promise olabilir → önce await!
  const { slug } = await params;
  if (!slug) return notFound();

  const product = await client.fetch(productBySlugQuery, { slug });
  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}

// (Opsiyonel) Dinamik başlık istersen:
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await client.fetch(productBySlugQuery, { slug });
  const title =
    (typeof p?.title === "string" ? p.title : p?.title?.tr || p?.title?.en) || "Ürün";
  return { title: `${title} · Optimus Prime` };
}