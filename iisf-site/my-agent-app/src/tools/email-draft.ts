import { createTool } from "@voltagent/core";
import { z } from "zod";

/**
 * Draft and send emails via the Resend API.
 * Used by Funding Scout (grant inquiries), Board Recruiter (outreach), etc.
 *
 * Emails are sent from a verified IISF domain.
 * All emails CC the board address for transparency.
 */
export const emailDraftTool = createTool({
  name: "email_draft",
  description:
    "Draft and send a professional email on behalf of IISF. All emails are CC'd to board@intersectionalsafety.org for oversight. Use for grant inquiries, board recruitment outreach, partnership requests, and research collaboration invitations.",
  parameters: z.object({
    to: z.string().describe("Recipient email address"),
    subject: z.string().describe("Email subject line"),
    body: z
      .string()
      .describe("Email body in plain text. Will be formatted as HTML paragraphs automatically."),
    urgency: z
      .enum(["low", "normal", "high"])
      .optional()
      .describe("Email priority. Default: normal"),
  }),
  execute: async (args) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { error: "RESEND_API_KEY not configured. Add it to .env.local." };
    }

    // Convert plain text to simple HTML
    const htmlBody = args.body
      .split(/\n\n+/)
      .filter(Boolean)
      .map((p) => `<p>${p.trim().replace(/\n/g, "<br/>")}</p>`)
      .join("\n");

    const html = `
<div style="font-family: Georgia, serif; max-width: 600px; line-height: 1.6; color: #1a1a2e;">
  ${htmlBody}
  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;" />
  <p style="font-size: 12px; color: #666;">
    International Intersectional Safety Foundation<br/>
    1111B S Governors Ave #82502, Dover, DE 19904<br/>
    <a href="https://intersectionalsafety.org">intersectionalsafety.org</a>
  </p>
</div>`.trim();

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "IISF <noreply@intersectionalsafety.org>",
          to: [args.to],
          cc: ["board@intersectionalsafety.org"],
          subject: args.subject,
          html,
          headers: args.urgency === "high" ? { "X-Priority": "1" } : undefined,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        return { error: `Resend API error ${res.status}: ${body}` };
      }

      const data = await res.json();
      return {
        success: true,
        emailId: data.id,
        to: args.to,
        subject: args.subject,
        message: `Email sent to ${args.to}. CC'd to board@intersectionalsafety.org.`,
      };
    } catch (err) {
      return { error: `Email send failed: ${err instanceof Error ? err.message : String(err)}` };
    }
  },
});

