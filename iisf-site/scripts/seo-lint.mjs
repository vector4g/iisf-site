import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const notes = [];

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function readFile(relativePath) {
  const absolutePath = filePath(relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`Missing required file: ${relativePath}`);
    return "";
  }
  return fs.readFileSync(absolutePath, "utf8");
}

function requireIncludes(relativePath, needles) {
  const content = readFile(relativePath);
  if (!content) return;

  for (const needle of needles) {
    if (!content.includes(needle)) {
      failures.push(`${relativePath} is missing required SEO token: ${needle}`);
    }
  }

  if (content.includes("http://localhost") || content.includes("127.0.0.1")) {
    failures.push(`${relativePath} contains localhost URLs that should not be indexed.`);
  }
}

requireIncludes("app/robots.ts", [
  "sitemap: \"https://intersectionalsafety.org/sitemap.xml\"",
  "allow: \"/\"",
]);

requireIncludes("app/sitemap.ts", [
  "export default async function sitemap",
  "export const revalidate",
  "/blog",
]);

requireIncludes("app/page.tsx", [
  "alternates: { canonical: \"https://intersectionalsafety.org\" }",
]);

requireIncludes("app/charter/page.tsx", [
  "export const metadata",
  "alternates: { canonical: \"https://intersectionalsafety.org/charter\" }",
]);

requireIncludes("app/governance/page.tsx", [
  "export const metadata",
  "alternates: { canonical: \"https://intersectionalsafety.org/governance\" }",
]);

requireIncludes("app/blog/page.tsx", [
  "export const metadata",
  "alternates: { canonical: \"https://intersectionalsafety.org/blog\" }",
]);

requireIncludes("app/blog/[slug]/page.tsx", [
  "generateMetadata",
  "alternates: { canonical: url }",
  "\"@type\": \"Article\"",
]);

requireIncludes("app/layout.tsx", [
  "metadataBase: new URL(SITE_URL)",
  "alternates:",
  "canonical: SITE_URL",
  "robots:",
]);

const publicDir = filePath("public");
if (fs.existsSync(publicDir)) {
  const indexNowKeyFiles = fs
    .readdirSync(publicDir)
    .filter((name) => /^[a-f0-9]{32}\.txt$/i.test(name));

  if (indexNowKeyFiles.length === 0) {
    failures.push("No IndexNow key file found in /public (expected <key>.txt).");
  } else {
    for (const keyFile of indexNowKeyFiles) {
      const key = keyFile.replace(/\.txt$/i, "");
      const body = fs.readFileSync(path.join(publicDir, keyFile), "utf8").trim();
      if (body !== key) {
        failures.push(`IndexNow key file mismatch: public/${keyFile} content does not match filename key.`);
      }
    }
    notes.push(`IndexNow key file(s): ${indexNowKeyFiles.join(", ")}`);
  }
} else {
  failures.push("Missing /public directory.");
}

if (failures.length > 0) {
  console.error("SEO lint failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("SEO lint passed.");
for (const note of notes) {
  console.log(`- ${note}`);
}

