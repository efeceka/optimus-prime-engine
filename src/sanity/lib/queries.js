import { groq } from "next-sanity";

export const productsListQuery = groq`*[_type=="product"]|order(_createdAt desc){
  _id,
  "slug": slug.current,
  title,
  description,
  image
}`;

