import type { MetadataRoute } from "next";
import { brand, property } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: property.name,
    short_name: "JB Suites",
    description: property.description,
    start_url: "/",
    display: "standalone",
    background_color: brand.mist,
    theme_color: brand.green,
    orientation: "portrait",
    icons: [
      {
        src: "/images/brand/jb-monogram.png",
        sizes: "361x361",
        type: "image/png",
      },
      {
        src: "/images/brand/jb-monogram.webp",
        sizes: "361x361",
        type: "image/webp",
      },
    ],
  };
}
