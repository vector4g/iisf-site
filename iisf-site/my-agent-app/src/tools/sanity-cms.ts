import { createTool } from "@voltagent/core";
import { z } from "zod";

const SANITY_PROJECT_ID = "vhmqtcio";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2026-02-18";

function sanityUrl(path: string) {
  return `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/${path}/${SANITY_DATASET}`;
}

/**
 * Query existing Sanity content (read-only, no token needed).
 */
export const sanityQueryTool = createTool({
  name: "sanity_query",
  description:
    "Query the IISF Sanity CMS. Use GROQ syntax. Available types: post (title, slug, publishedAt, excerpt, categories, body), category (title, slug, description), author (name, slug, bio).",
  parameters: z.object({
    query: z
      .string()
      .describe('A GROQ query, e.g. \'*[_type == "post"] | order(publishedAt desc)[0..4]{ title, "slug": slug.current, publishedAt, excerpt }\''),
  }),
  execute: async (args) => {
    try {
      const url = `${sanityUrl("query")}?query=${encodeURIComponent(args.query)}`;
      const res = await fetch(url);
      if (!res.ok) return { error: `Sanity query error: ${res.status}` };
      const data = await res.json();
      return { result: data.result };
    } catch (err) {
      return { error: `Sanity query failed: ${err instanceof Error ? err.message : String(err)}` };
    }
  },
});

/**
 * Create a draft blog post in Sanity (requires SANITY_API_TOKEN with Editor role).
 */
export const sanityCreateDraftTool = createTool({
  name: "sanity_create_draft",
  description:
    "Create a draft blog post in the IISF Sanity CMS. The post is created as a draft (not published) so a human can review and publish it in the Sanity Studio.",
  parameters: z.object({
    title: z.string().describe("Post title"),
    slug: z.string().describe("URL slug (lowercase, hyphens, no spaces)"),
    excerpt: z.string().describe("Short excerpt / meta description (1-2 sentences)"),
    bodyMarkdown: z
      .string()
      .describe("The post body as plain text (paragraphs separated by blank lines). Will be stored as Sanity block content."),
    categoryTitle: z
      .string()
      .optional()
      .describe("Category name (e.g. 'Research Note', 'Field Report', 'Governance')"),
  }),
  execute: async (args) => {
    const token = process.env.SANITY_API_TOKEN;
    if (!token) {
      return {
        error: "SANITY_API_TOKEN not configured. Generate an Editor token at https://www.sanity.io/manage/project/vhmqtcio/api#tokens",
      };
    }

    // Convert plain-text paragraphs into Sanity block content
    const blocks = args.bodyMarkdown
      .split(/\n\n+/)
      .filter(Boolean)
      .map((paragraph) => ({
        _type: "block",
        _key: Math.random().toString(36).slice(2, 10),
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: Math.random().toString(36).slice(2, 10),
            text: paragraph.trim(),
            marks: [],
          },
        ],
      }));

    const draftId = `drafts.${Date.now().toString(36)}`;
    const mutations = [
      {
        create: {
          _id: draftId,
          _type: "post",
          title: args.title,
          slug: { _type: "slug", current: args.slug },
          publishedAt: new Date().toISOString(),
          excerpt: args.excerpt,
          body: blocks,
        },
      },
    ];

    try {
      const res = await fetch(sanityUrl("mutate"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mutations }),
      });
      if (!res.ok) {
        const body = await res.text();
        return { error: `Sanity mutation error ${res.status}: ${body}` };
      }
      const data = await res.json();
      return {
        success: true,
        draftId,
        studioUrl: `https://intersectionalsafety.org/studio/structure/post;${draftId}`,
        transactionId: data.transactionId,
        message: `Draft created: "${args.title}". Review and publish in Sanity Studio.`,
      };
    } catch (err) {
      return { error: `Sanity create failed: ${err instanceof Error ? err.message : String(err)}` };
    }
  },
});

