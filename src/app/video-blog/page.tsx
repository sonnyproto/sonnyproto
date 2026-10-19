import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { formatPostDate, getSectionPosts } from "@/data/posts";
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
        <header className="blog-index-heading">
          <p className="section-label">Film / References, prompts &amp; process</p>
          <h1>Video Blog</h1>
          <p>The films I make, and how I make them.</p>
        </header>

        {posts.length ? (
          <div className="blog-post-list">
            {posts.map((post, index) => (
              <Link className="blog-post-card video-post-card" href={`/video-blog/${post.slug}`} aria-label={post.title} key={post.slug}>
                {post.cover ? (
                  <div className="video-post-cover video-post-cover-image">
                    <Image src={post.cover.src} alt={post.cover.alt} width={post.cover.width} height={post.cover.height}
                      sizes="(max-width: 720px) calc(100vw - 36px), 400px" unoptimized={!post.cover.src.startsWith("/")} />
                  </div>
                ) : (
                  <div className="video-post-cover" aria-hidden="true">
                    <span>Film notes / {String(index + 1).padStart(2, "0")}</span>
                    <span className="video-post-cover-title">{post.title.split(" — ")[0]}</span>
                    <span>References · Prompts · Process</span>
                  </div>
                )}
                <article>
                  <div className="blog-post-meta">
                    <span>{post.category}{post.draft ? " / Draft preview" : ""}</span>
                    <span><time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time> · {post.readingMinutes} min read</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <span className="blog-read-link">See the breakdown <span aria-hidden="true">↗</span></span>
                </article>
              </Link>
            ))}
          </div>
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
