import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sonny Proto — Links",
  description: "Social links for @sonnyproto.",
  openGraph: {
    url: siteUrl,
    title: "Sonny Proto — Links",
    description: "Social links for @sonnyproto.",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Sonny Proto — Links",
    description: "Social links for @sonnyproto."
  }
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
