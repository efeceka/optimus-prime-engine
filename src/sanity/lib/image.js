// sanity/lib/image.js
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

// Güvenli URL builder: asset ref yoksa null döner
export const urlFor = (src) => {
  const hasAssetRef =
    !!src &&
    (typeof src === "string" ||
      src?._ref ||
      src?.asset?._ref ||
      src?.asset?._id);

  if (!hasAssetRef) return null;

  return builder.image(src).ignoreImageParams();
};