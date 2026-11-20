import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// next/font downloads Inter at build time and self-hosts it with the app:
// no request to Google at runtime, and display: "swap" keeps text visible
// in a size-matched fallback while the font loads.
const inter = Inter({ subsets: ["latin"], display: "swap" });

// Site-wide defaults. Pages override title/description with their own
// `metadata` export or `generateMetadata`.
export const metadata: Metadata = {
  title: "ShipYard",
  description: "Gear for people who build, run, and explore.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
