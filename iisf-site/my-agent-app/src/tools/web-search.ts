import { createTool } from "@voltagent/core";
import { z } from "zod";

/**
 * Tavily AI-powered web search.
 * Used by Funding Scout, Board Recruiter, SEO Strategist, and Research Director.
 */
export const webSearchTool = createTool({
  name: "web_search",
  description:
    "Search the web for current information. Use this to find grants, funding sources, potential board members, SEO data, academic papers, policy reports, or any other publicly available information.",
  parameters: z.object({
    query: z.string().describe("The search query"),
    searchDepth: z
      .enum(["basic", "advanced"])
      .optional()
      .describe("'basic' for quick results, 'advanced' for deeper research (slower). Default: basic"),
    maxResults: z
      .number()
      .min(1)
      .max(10)
      .optional()
      .describe("Number of results to return (1-10). Default: 5"),
    topic: z
      .enum(["general", "news"])
      .optional()
      .describe("Search topic category. Use 'news' for recent events. Default: general"),
  }),
  execute: async (args) => {
    const apiKey = process.env.TAVILY_API_KEY;
    if (!apiKey) {
      return { error: "TAVILY_API_KEY not configured. Add it to .env.local." };
    }

    try {
      const res = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          query: args.query,
          search_depth: args.searchDepth || "basic",
          max_results: args.maxResults || 5,
          topic: args.topic || "general",
          include_answer: true,
          include_raw_content: false,
        }),
      });

      if (!res.ok) {
        return { error: `Tavily API error: ${res.status} ${res.statusText}` };
      }

      const data = await res.json();
      return {
        answer: data.answer || null,
        results: (data.results || []).map((r: Record<string, unknown>) => ({
          title: r.title,
          url: r.url,
          snippet: r.content,
          score: r.score,
        })),
      };
    } catch (err) {
      return { error: `Web search failed: ${err instanceof Error ? err.message : String(err)}` };
    }
  },
});

