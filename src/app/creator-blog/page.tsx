import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { getSectionPosts } from "@/data/posts";
import { VideoPostList } from "@/components/VideoPostList";
import { profileImage, siteUrl } from "@/data/site";

const title = "Creator Blog — Sonny Proto";
const description = "Creative experiments, AI video prompts, reference images, and process notes by Sonny Proto.";
const canonical = `${siteUrl}/creator-blog`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website", images: [profileImage] },
  twitter: { card: "summary", title, description, images: [profileImage.url] }
};

export default function CreatorBlog() {
  const posts = getSectionPosts("video");

  return (
    <>
      <Header activeSection="video" />
      <main className="blog-index" id="top">
        <Link className="back-link" href="/">← Home</Link>
        <header className="blog-index-heading">
          <p className="section-label">Creative work / References, prompts &amp; process</p>
          <h1>Creator Blog</h1>
          <p>Creative work, prompts, and the process behind them.</p>
        </header>

        {posts.length ? (
          <VideoPostList posts={posts} />
        ) : (
          <section className="video-blog-empty" aria-labelledby="first-film-title">
            <p className="section-label">Behind the frames</p>
            <h2 id="first-film-title">The next story starts here.</h2>
            <p>New projects are on the way. Reference images, prompts, and notes from the process — all in one place.</p>
            <a className="blog-read-link" href="https://www.youtube.com/@sonnyproto">Watch my films on YouTube <span aria-hidden="true">↗</span></a>
          </section>
        )}
      </main>
      <footer className="project-footer">
        <p>Sonny Proto / @sonnyproto</p>
        <Link href="/">Home ↑</Link>
      </footer>
    </>
  );
}
