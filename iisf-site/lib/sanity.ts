import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "vhmqtcio",
  dataset: "production",
  apiVersion: "2025-02-17", // today’s date; adjust over time
  useCdn: true, // `true` for public, cached reads
});
