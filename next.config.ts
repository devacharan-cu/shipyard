import type { NextConfig } from "next";

// GitHub Pages serves this repo under https://<user>.github.io/shipyard/,
// so production builds live under the /shipyard base path.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/shipyard" : "";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes plain HTML/CSS/JS to out/.
  output: "export",
  basePath,
  trailingSlash: true,
  // GitHub Pages is a static host with no image server, so skip server-side
  // resizing. next/image still lazy-loads and reserves space (no CLS).
  images: { unoptimized: true },
  // Exposed to the app so public/ asset paths can be prefixed (see app/lib/asset.ts).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
