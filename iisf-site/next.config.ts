import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default withMDX(nextConfig);
