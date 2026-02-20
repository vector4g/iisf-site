import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
};

function parseMetadataFromMdx(source: string): Partial<BlogMeta> {
  const title = source.match(/title:\s*["'`]([^"'`]+)["'`]/)?.[1];
  const date = source.match(/date:\s*["'`]([^"'`]+)["'`]/)?.[1];
  const description = source
    .match(/description:\s*["'`]([\s\S]*?)["'`]\s*,/m)?.[1]
    ?.replace(/\s+/g, " ")
    .trim();

  return { title, date, description };
}

export function getAllPosts(): BlogMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts: BlogMeta[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const source = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const meta = parseMetadataFromMdx(source);
    return {
      slug,
      title: meta.title ?? slug,
      date: meta.date ?? "",
      description: meta.description,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
