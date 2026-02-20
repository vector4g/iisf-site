import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { sanityClient } from "@/lib/sanity";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://intersectionalsafety.org").replace(/\/$/, "");

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

type StaticRoute = {
  path: string;
  changeFrequency: ChangeFreq;
  priority: number;
};

type SanityPost = {
  slug: string;
  publishedAt?: string;
  _updatedAt?: string;
};

const STATIC_ROUTES: StaticRoute[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/charter", changeFrequency: "monthly", priority: 0.9 },
  { path: "/governance", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  // Keep /legal out of sitemap because it is marked noindex.
  { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/imprint", changeFrequency: "yearly", priority: 0.3 },
];

export const revalidate = 3600; // Refresh sitemap at most once per hour.

function toAbsoluteUrl(path: string) {
  return `${SITE}${path}`;
}

function toDate(value?: string) {
  if (!value) return new Date();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: toAbsoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Primary source: Sanity CMS
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await sanityClient.fetch<SanityPost[]>(
      `*[_type == "post" && defined(slug.current)] | order(coalesce(_updatedAt, publishedAt) desc) {
        "slug": slug.current,
        publishedAt,
        _updatedAt
      }`,
    );

    blogPages = posts
      .filter((post) => Boolean(post.slug))
      .map((post) => ({
        url: toAbsoluteUrl(`/blog/${post.slug}`),
        lastModified: toDate(post._updatedAt || post.publishedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  } catch {
    // Sanity unavailable: fallback to local MDX content/blog files.
    const localPosts = getAllPosts();
    blogPages = localPosts
      .filter((post) => Boolean(post.slug))
      .map((post) => ({
        url: toAbsoluteUrl(`/blog/${post.slug}`),
        lastModified: toDate(post.date),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  }

  // Defensive dedupe in case of overlapping sources.
  const deduped = [...staticPages, ...blogPages].filter((entry, idx, all) => {
    return all.findIndex((candidate) => candidate.url === entry.url) === idx;
  });

  return deduped;
}
