// /sanity/lib/live.js
import { defineLive } from "next-sanity";
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: '2024-07-01', // geçerli tarih
  })
});