import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
};

export function getAllPosts(): BlogMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts: BlogMeta[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const mod = require(path.join(BLOG_DIR, file));
    const meta = mod.metadata ?? {};
    return {
      slug,
      title: meta.title ?? slug,
      date: meta.date ?? "",
      description: meta.description,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
