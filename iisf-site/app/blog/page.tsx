import type { Metadata } from "next";
import Header from "@/components/iisf/Header";
import Footer from "@/components/iisf/Footer";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity";
import { allPostsQuery } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Journal & Research Notes",
  description:
    "Essays from IISF and Vector for Good on intersectional safety, sensory science, autonomous logistics, and algorithmic governance.",
  openGraph: {
    title: "Intersectional Safety Journal",
    description:
      "Research notes on sensory safety, kinetic equity, and algorithmic accountability.",
    url: "https://intersectionalsafety.org/blog",
  },
  alternates: { canonical: "https://intersectionalsafety.org/blog" },
};

type Category = {
  _id: string;
  title: string;
};

type Post = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  categories?: Category[];
};

export const dynamic = "force-dynamic";

async function getPosts(): Promise<Post[]> {
  const data = await sanityClient.fetch(allPostsQuery);
  return data.map((p: any) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    publishedAt: p.publishedAt,
    excerpt: p.excerpt,
    categories: p.categories ?? [],
  }));
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-[#05060a] text-slate-100">
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-3xl font-serif text-slate-50">
          Journal &amp; Research Notes
        </h1>
        <p className="mt-3 text-sm text-slate-300">
          Essays from IISF and Vector for Good on intersectional safety,
          sensory science, logistics, and algorithmic governance.
        </p>

        <div className="mt-8 space-y-5">
          {posts.map((post) => (
            <article
              key={post._id}
              className="border-b border-slate-800 pb-4 last:border-none"
            >
              <h2 className="text-lg font-semibold text-slate-50">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-slate-200"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {new Date(post.publishedAt).toLocaleDateString()}
                {post.categories && post.categories.length > 0
                  ? ` · ${post.categories.map((c) => c.title).join(", ")}`
                  : ""}
              </p>
              {post.excerpt && (
                <p className="mt-2 text-sm text-slate-300">
                  {post.excerpt}
                </p>
              )}
            </article>
          ))}

          {posts.length === 0 && (
            <p className="text-sm text-slate-400">
              No articles yet. First: publish the Charter, then we&apos;ll add
              research notes and field reports here.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
