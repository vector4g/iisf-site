import { createTool } from "@voltagent/core";
import { z } from "zod";

/**
 * Analyse content for SEO factors and produce actionable recommendations.
 * Does not call external APIs — runs heuristic checks locally.
 */
export const seoAnalyzerTool = createTool({
  name: "seo_analyze",
  description:
    "Analyze a piece of content for SEO quality. Checks title length, meta description, keyword usage, heading structure, word count, and readability. Returns an actionable scorecard.",
  parameters: z.object({
    title: z.string().describe("Page or post title"),
    metaDescription: z.string().optional().describe("Meta description / excerpt"),
    body: z.string().describe("Full text content of the page or post"),
    targetKeywords: z
      .array(z.string())
      .optional()
      .describe("Primary keywords to check density for"),
    url: z.string().optional().describe("Page URL (for slug analysis)"),
  }),
  execute: async (args) => {
    const issues: string[] = [];
    const passed: string[] = [];
    let score = 100;

    // --- Title ---
    const titleLen = args.title.length;
    if (titleLen < 30) { issues.push(`Title too short (${titleLen} chars). Aim for 50-60.`); score -= 10; }
    else if (titleLen > 65) { issues.push(`Title too long (${titleLen} chars). Trim to 50-60.`); score -= 5; }
    else passed.push(`Title length OK (${titleLen} chars)`);

    // --- Meta description ---
    if (!args.metaDescription) { issues.push("Missing meta description. Add a 150-160 char excerpt."); score -= 15; }
    else {
      const metaLen = args.metaDescription.length;
      if (metaLen < 120) { issues.push(`Meta description short (${metaLen} chars). Aim for 150-160.`); score -= 5; }
      else if (metaLen > 165) { issues.push(`Meta description long (${metaLen} chars). Trim to 150-160.`); score -= 3; }
      else passed.push(`Meta description length OK (${metaLen} chars)`);
    }

    // --- Word count ---
    const words = args.body.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    if (wordCount < 300) { issues.push(`Content too thin (${wordCount} words). Aim for 800+ for authority.`); score -= 20; }
    else if (wordCount < 800) { issues.push(`Content adequate but short (${wordCount} words). 1,200+ recommended for thought leadership.`); score -= 5; }
    else passed.push(`Word count strong (${wordCount} words)`);

    // --- Headings ---
    const h2Count = (args.body.match(/^## /gm) || []).length;
    const h3Count = (args.body.match(/^### /gm) || []).length;
    if (h2Count === 0 && wordCount > 300) { issues.push("No H2 headings detected. Add subheadings every 250-300 words."); score -= 10; }
    else passed.push(`Heading structure: ${h2Count} H2, ${h3Count} H3`);

    // --- Keyword density ---
    const keywordReport: Record<string, { count: number; density: string }> = {};
    if (args.targetKeywords?.length) {
      const bodyLower = args.body.toLowerCase();
      for (const kw of args.targetKeywords) {
        const regex = new RegExp(kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
        const matches = bodyLower.match(regex) || [];
        const density = ((matches.length / wordCount) * 100).toFixed(2);
        keywordReport[kw] = { count: matches.length, density: `${density}%` };
        if (matches.length === 0) { issues.push(`Keyword "${kw}" not found in content.`); score -= 5; }
        else if (parseFloat(density) > 3) { issues.push(`Keyword "${kw}" may be over-optimized (${density}%).`); score -= 3; }
        else passed.push(`Keyword "${kw}": ${matches.length} occurrences (${density}%)`);
      }
    }

    // --- URL / slug ---
    if (args.url) {
      const slug = args.url.split("/").pop() || "";
      if (slug.length > 75) { issues.push(`URL slug too long (${slug.length} chars). Keep under 60.`); score -= 3; }
      if (/[A-Z]/.test(slug)) { issues.push("URL contains uppercase letters. Use lowercase only."); score -= 2; }
      if (/[_]/.test(slug)) { issues.push("URL uses underscores. Use hyphens instead."); score -= 2; }
      if (!/[_A-Z]/.test(slug) && slug.length <= 75) passed.push("URL slug format OK");
    }

    score = Math.max(0, score);
    const grade = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : score >= 40 ? "D" : "F";

    return {
      score,
      grade,
      wordCount,
      issues,
      passed,
      keywords: Object.keys(keywordReport).length > 0 ? keywordReport : undefined,
    };
  },
});

