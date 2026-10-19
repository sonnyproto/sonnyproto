import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { VideoPostList } from "@/components/VideoPostList";
import { getSeriesPosts } from "@/data/posts";
import { siteUrl } from "@/data/site";

const title = "KNIGHT — Films & Prompts | Sonny Proto";
const description = "Films, selected AI video prompts, and reference packs from KNIGHT, with the newest stories first.";
const canonical = `${siteUrl}/video-blog/knight`;
const image = { url: "/media/catknight1/infernal-throne.png", width: 2048, height: 1152, alt: "The infernal throne from Cat Knight I" };

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website", images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image.url] }
};

export default function KnightOverview() {
  const posts = getSeriesPosts("knight");

  return (
    <>
      <Header activeSection="video" />
      <main className="blog-index" id="top">
        <Link className="back-link" href="/video-blog">← Video Blog</Link>
        <header className="blog-index-heading">
          <h1>KNIGHT</h1>
          <p className="knight-subtitle">Films &amp; prompts</p>
          <p className="series-intro">Explore the stories, then get the prompts and references.</p>
        </header>
        <VideoPostList posts={posts} series="knight" />
      </main>
      <footer className="project-footer">
        <p>Sonny Proto / @sonnyproto</p>
        <Link href="/video-blog">All video posts ↑</Link>
      </footer>
    </>
  );
}
