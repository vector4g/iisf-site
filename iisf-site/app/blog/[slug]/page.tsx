import Header from "@/components/iisf/Header";
import Footer from "@/components/iisf/Footer";
import { sanityClient } from "@/lib/sanity";
import { allPostsQuery, singlePostQuery } from "@/lib/queries";
import { notFound } from "next/navigation";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface Category {
  _id: string;
  title: string;
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  body: PortableTextBlock[];
  categories?: Category[];
}

export const dynamic = "force-static";

async function getPost(slug: string): Promise<Post | null> {
  const data = await sanityClient.fetch(singlePostQuery, { slug });

  if (!data) return null;

  return {
    _id: data._id,
    title: data.title,
    slug: data.slug,
    publishedAt: data.publishedAt,
    excerpt: data.excerpt,
    body: data.body,
    categories: data.categories ?? [],
  };
}

interface PostSlug {
  slug: string;
}

export async function generateStaticParams(): Promise<PostSlug[]> {
  const posts: PostSlug[] = await sanityClient.fetch(allPostsQuery);
  return posts.map((p) => ({ slug: p.slug }));
}

const portableComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-8 text-3xl font-serif text-slate-50">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 text-2xl font-serif text-slate-50">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 text-xl font-serif text-slate-50">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 text-sm leading-relaxed text-slate-200">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-4 border-l-2 border-slate-700 pl-4 text-sm italic text-slate-200">
        {children}
      </blockquote>
    ),
  },
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const { slug } = await props.params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#05060a] text-slate-100">
      <Header />
      <article className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          Intersectional Safety Journal
        </p>
        <h1 className="mt-3 text-3xl font-serif text-slate-50">
          {post.title}
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          {new Date(post.publishedAt).toLocaleDateString()}
          {post.categories && post.categories.length > 0
            ? ` · ${post.categories.map((c) => c.title).join(", ")}`
            : ""}
        </p>
        {post.excerpt && (
          <p className="mt-3 text-sm text-slate-300">{post.excerpt}</p>
        )}

        <div className="mt-6">
          <PortableText value={post.body} components={portableComponents} />
        </div>
      </article>
      <Footer />
    </main>
  );
}
