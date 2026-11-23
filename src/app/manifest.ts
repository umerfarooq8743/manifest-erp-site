import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fa",
    theme_color: "#047857",
    icons: [
      { src: site.logo.icon192, sizes: "192x192", type: "image/png" },
      { src: site.logo.icon512, sizes: "512x512", type: "image/png" },
    ],
  };
}
