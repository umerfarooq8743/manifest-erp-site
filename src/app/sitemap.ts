import type { MetadataRoute } from "next";
import { sitemapRoutes } from "@/data/navigation";
import { absoluteUrl, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${site.legalUpdated}T00:00:00Z`);
  return sitemapRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.path === "/" ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
