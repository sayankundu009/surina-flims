import type { MetadataRoute } from "next";
import { getAllTitles } from "@/data/derive";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/movies",
    "/short-films",
    "/trailers",
    "/search",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
  }));

  const titleRoutes = getAllTitles().map((title) => ({
    url: `${siteUrl}/titles/${title.slug}`,
  }));

  return [...staticRoutes, ...titleRoutes];
}
