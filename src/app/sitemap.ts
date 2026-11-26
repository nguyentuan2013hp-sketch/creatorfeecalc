import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site";
import { STANDALONE_PLATFORMS } from "@/data/platforms";
import { COMPARISONS } from "@/data/comparisons";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(SITE_CONFIG.lastVerifiedDate);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_CONFIG.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_CONFIG.url}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_CONFIG.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_CONFIG.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_CONFIG.url}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_CONFIG.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const platformRoutes: MetadataRoute.Sitemap = STANDALONE_PLATFORMS.map((p) => ({
    url: `${SITE_CONFIG.url}/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: `${SITE_CONFIG.url}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...platformRoutes, ...comparisonRoutes];
}
