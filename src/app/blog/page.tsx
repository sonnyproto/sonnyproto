import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { formatPostDate, posts } from "@/data/posts";
import { profileImage, siteUrl } from "@/data/site";

const title = "Coding Blog — Sonny Proto";
const description = "Notes on AI agents, infrastructure, and software systems by Sonny Proto.";
const canonical = `${siteUrl}/blog`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "website",
    images: [profileImage]
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [profileImage.url]
  }
};

export default function BlogIndex() {
  return (
    <>
      <Header activeSection="blog" />
      <main className="blog-index" id="top">
        <header className="blog-index-heading">
          <p className="section-label">Writing / Notes &amp; experiments</p>
          <h1>Coding Blog</h1>
          <p>AI agents, systems design, and things worth figuring out.</p>
        </header>

        <div className="blog-post-list">
          {posts.map((post) => (
            <Link className="blog-post-card" href={`/blog/${post.slug}`} aria-label={post.title} key={post.slug}>
              <article>
                <div className="blog-post-meta">
                  <span>{post.category}</span>
                  <span><time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time> · {post.readingMinutes} min read</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <span className="blog-read-link">Read article <span aria-hidden="true">↗</span></span>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <footer className="project-footer">
        <p>Sonny Proto / @sonnyproto</p>
        <Link href="/">Home ↑</Link>
      </footer>
    </>
  );
}
