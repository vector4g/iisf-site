import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity";

const SITE = "https://intersectionalsafety.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* ── Static pages ── */
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/charter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/governance`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/legal`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/legal/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/legal/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/legal/imprint`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  /* ── Blog posts from Sanity ── */
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts: { slug: string; publishedAt: string }[] =
      await sanityClient.fetch(
        `*[_type == "post"] | order(publishedAt desc) { "slug": slug.current, publishedAt }`
      );

    blogPages = posts.map((post) => ({
      url: `${SITE}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Sanity unavailable — degrade gracefully
  }

  return [...staticPages, ...blogPages];
}

