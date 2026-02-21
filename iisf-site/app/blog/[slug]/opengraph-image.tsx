import { ImageResponse } from "next/og";
import { sanityClient } from "@/lib/sanity";
import { singlePostQuery } from "@/lib/queries";

export const alt = "Intersectional Safety Journal Article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OgPost = {
  title?: string;
  excerpt?: string | null;
};

function trimText(value: string, maxChars: number) {
  if (value.length <= maxChars) return value;
  return `${value.slice(0, Math.max(0, maxChars - 1)).trim()}…`;
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let title = "Intersectional Safety Journal";
  let excerpt =
    "Research on sensory safety, kinetic equity, and algorithmic accountability.";

  try {
    const post = await sanityClient.fetch<OgPost | null>(singlePostQuery, {
      slug,
    });

    if (post?.title?.trim()) {
      title = trimText(post.title.trim(), 90);
    }

    if (post?.excerpt?.trim()) {
      excerpt = trimText(post.excerpt.trim(), 180);
    }
  } catch {
    // Fallback copy is used when CMS is unavailable.
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background:
            "linear-gradient(135deg, #05060a 0%, #0c1220 50%, #0a1628 100%)",
          color: "#f1f5f9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 96,
            height: 4,
            borderRadius: 4,
            marginBottom: 28,
            background: "linear-gradient(90deg, #22d3ee, #3b82f6)",
          }}
        />
        <div
          style={{
            fontSize: 16,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#22d3ee",
            marginBottom: 16,
          }}
        >
          Intersectional Safety Journal
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.12,
            maxWidth: 1040,
            marginBottom: 24,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#94a3b8",
            lineHeight: 1.45,
            maxWidth: 1000,
          }}
        >
          {excerpt}
        </div>
      </div>
    ),
    { ...size }
  );
}
