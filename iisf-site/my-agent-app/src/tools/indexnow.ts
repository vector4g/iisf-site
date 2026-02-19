import { createTool } from "@voltagent/core";
import { z } from "zod";

const SITE_HOST = "www.intersectionalsafety.org";
const KEY_LOCATION = `https://${SITE_HOST}/61d089df94964555b8d4a53ea75d6c7e.txt`;

/**
 * Submit one or more URLs to search engines via the IndexNow protocol.
 * Supported by Bing, Yandex, Seznam, Naver, and others.
 * Docs: https://www.indexnow.org/documentation
 */
export const indexNowSubmitTool = createTool({
  name: "indexnow_submit",
  description:
    "Submit one or more IISF website URLs to Bing and other search engines for immediate indexing via the IndexNow protocol. Use this after publishing new content, updating existing pages, or removing pages. URLs must be on intersectionalsafety.org.",
  parameters: z.object({
    urls: z
      .array(z.string().url())
      .min(1)
      .max(10000)
      .describe(
        "Array of full URLs to submit, e.g. ['https://www.intersectionalsafety.org/blog/new-post']"
      ),
  }),
  execute: async (args) => {
    const apiKey = process.env.INDEXNOW_API_KEY;
    if (!apiKey) {
      return { error: "INDEXNOW_API_KEY not configured. Add it to .env.local." };
    }

    // Validate all URLs belong to the site
    const invalidUrls = args.urls.filter(
      (u) => !u.includes("intersectionalsafety.org")
    );
    if (invalidUrls.length > 0) {
      return {
        error: `All URLs must be on intersectionalsafety.org. Invalid: ${invalidUrls.join(", ")}`,
      };
    }

    const payload = {
      host: SITE_HOST,
      key: apiKey,
      keyLocation: KEY_LOCATION,
      urlList: args.urls,
    };

    try {
      const res = await fetch("https://api.indexnow.org/IndexNow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        return {
          success: true,
          submitted: args.urls.length,
          urls: args.urls,
          message: `${args.urls.length} URL(s) submitted to IndexNow (Bing, Yandex, and others). Indexing is not instant — search engines will prioritize crawling these URLs.`,
        };
      }

      const statusMessages: Record<number, string> = {
        400: "Bad request — check URL format",
        403: "Forbidden — API key not valid or key file not found at site root",
        422: "URLs don't belong to the host or key mismatch",
        429: "Too many requests — slow down submissions",
      };

      return {
        error: `IndexNow API error ${res.status}: ${statusMessages[res.status] || res.statusText}`,
      };
    } catch (err) {
      return {
        error: `IndexNow submission failed: ${err instanceof Error ? err.message : String(err)}`,
      };
    }
  },
});

