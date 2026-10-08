import type { Metadata, Viewport } from "next";
import { profileImage, siteDescription, siteTitle, siteUrl } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    url: siteUrl,
    siteName: "Sonny Proto",
    title: siteTitle,
    description: siteDescription,
    type: "website",
    images: [profileImage]
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    creator: "@sonnyproto",
    images: ["/me.png"]
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
