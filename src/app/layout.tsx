import type { Metadata, Viewport } from "next";
import { siteDescription, siteTitle, siteUrl } from "@/data/site";
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
    images: [
      {
        url: "/me.png",
        width: 1024,
        height: 1024,
        alt: "Pixel portrait of Sonny Proto"
      }
    ]
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
