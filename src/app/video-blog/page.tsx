import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { getSectionPosts } from "@/data/posts";
import { VideoPostList } from "@/components/VideoPostList";
import { profileImage, siteUrl } from "@/data/site";

const title = "Video Blog — Sonny Proto";
const description = "Behind the films: AI video experiments, reference images, prompts, and production notes by Sonny Proto.";
const canonical = `${siteUrl}/video-blog`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website", images: [profileImage] },
  twitter: { card: "summary", title, description, images: [profileImage.url] }
};

export default function VideoBlog() {
  const posts = getSectionPosts("video");

  return (
    <>
      <Header activeSection="video" />
      <main className="blog-index" id="top">
        <Link className="back-link" href="/">← Home</Link>
        <header className="blog-index-heading">
          <p className="section-label">Film / References, prompts &amp; process</p>
          <h1>Video Blog</h1>
          <p>The films I make, and how I make them.</p>
        </header>

        {posts.length ? (
          <VideoPostList posts={posts} />
        ) : (
          <section className="video-blog-empty" aria-labelledby="first-film-title">
            <p className="section-label">Behind the frames</p>
            <h2 id="first-film-title">The next story starts here.</h2>
            <p>Film breakdowns are on the way. Reference images, the prompts I used, and notes from the process — all in one place.</p>
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
