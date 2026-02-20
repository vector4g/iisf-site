// app/rss.xml/route.ts
import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";
import { allPostsQuery } from "@/lib/queries";

export const dynamic = "force-dynamic";

type RssPost = {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string | null;
};

export async function GET() {
  const posts = await sanityClient.fetch<RssPost[]>(allPostsQuery);

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://intersectionalsafety.org/blog/${post.slug}</link>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt ?? ""}]]></description>
    </item>`
    )
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Intersectional Safety Journal</title>
    <link>https://intersectionalsafety.org/blog</link>
    <description>Articles from the International Intersectional Safety Foundation and Vector for Good.</description>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
