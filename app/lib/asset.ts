// app/lib/asset.ts
// next/image does not add `basePath` to `src` automatically, so files from
// public/ need it prefixed when the site is served under /shipyard on GitHub Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
