import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { VideoPostList } from "@/components/VideoPostList";
import { getSeriesPosts } from "@/data/posts";
import { siteUrl } from "@/data/site";

const title = "Cat Knight — Films & Prompts | Sonny Proto";
const description = "The Cat Knight series: selected AI video prompts and reference packs, with the newest stories first.";
const canonical = `${siteUrl}/video-blog/catknight`;
const image = { url: "/media/catknight1/infernal-throne.png", width: 2048, height: 1152, alt: "The infernal throne from Cat Knight I" };

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website", images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image.url] }
};

export default function CatKnightSeries() {
  const posts = getSeriesPosts("catknight");

  return (
    <>
      <Header activeSection="video" />
      <main className="blog-index" id="top">
        <Link className="back-link" href="/video-blog">← Video Blog</Link>
        <header className="blog-index-heading">
          <p className="section-label">The Cat Knight series</p>
          <h1>Cat Knight</h1>
          <p>Little knights. Dark worlds. Find your story, then get the prompt and references.</p>
          <p className="series-intro">The newest Cat Knight stories appear first. Earlier chapters stay below, so you can always find the knight that brought you here.</p>
        </header>
        <VideoPostList posts={posts} series="catknight" />
      </main>
      <footer className="project-footer">
        <p>Sonny Proto / @sonnyproto</p>
        <Link href="/video-blog">All video posts ↑</Link>
      </footer>
    </>
  );
}
