import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShipYard",
  description: "Gear for people who build, run, and explore.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
