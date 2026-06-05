import type { MetadataRoute } from "next";
import { roomTypes } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const paths = ["", "/rooms", "/availability", "/book", "/about", "/facilities", "/gallery", "/location", "/policies", "/contact", "/manage-booking"];
  return [
    ...paths.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
    ...roomTypes.map((roomType) => ({ url: `${base}/rooms/${roomType.slug}`, lastModified: new Date() })),
  ];
}
