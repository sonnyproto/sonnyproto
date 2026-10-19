import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Subscribe } from "@/components/Subscribe";
import { formatPostDate, getPost, getPostUrl, getSectionPosts } from "@/data/posts";
import { profileImage, siteUrl } from "@/data/site";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getSectionPosts("video").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug, "video");
  if (!post) notFound();
  const image = post.cover ? {
    url: post.cover.src,
    alt: post.cover.alt,
    width: post.cover.width,
    height: post.cover.height
  } : profileImage;

  return {
    title: `${post.title} | Sonny Proto`,
    description: post.description,
    authors: [{ name: "Sonny Proto", url: siteUrl }],
    alternates: { canonical: getPostUrl(post.slug, "video") },
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: post.title,
      description: post.description,
      url: getPostUrl(post.slug, "video"),
      type: "article",
      publishedTime: post.publishedAt,
      authors: [siteUrl],
      images: [image]
    },
    twitter: {
      card: post.cover ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
      creator: "@sonnyproto",
      images: [image.url]
    }
  };
}

export default async function VideoPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug, "video");
  if (!post) notFound();
  const Content = post.Content;
  const contents = post.contents ?? [];
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: getPostUrl(post.slug, "video"),
    mainEntityOfPage: getPostUrl(post.slug, "video"),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "en",
    image: [new URL(post.cover?.src ?? profileImage.url, siteUrl).href],
    author: { "@type": "Person", "@id": `${siteUrl}/#person`, name: "Sonny Proto", url: siteUrl }
  };

  return (
    <>
      <Header activeSection="video" />
      <main className="blog-article-page video-article-page" id="top">
        <Link className="back-link" href="/creator-blog">← Creator Blog</Link>
        <article>
          <header className="blog-article-heading">
            <p className="section-label">{post.category}</p>
            <h1>{post.title}</h1>
            <div className="blog-article-meta">
              <Link href="/">Sonny Proto</Link>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              <span>{post.readingMinutes} min read</span>
              {post.draft ? <span className="draft-badge">Draft preview</span> : null}
            </div>
            <ul className="blog-tags" aria-label="Article topics">
              {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </header>
          {post.draft ? <p className="draft-notice">Work in progress. This draft is only available in local development.</p> : null}
          <div className={`video-article-layout${contents.length ? "" : " video-article-layout-full"}`}>
            {contents.length ? (
              <nav className="article-contents" aria-label="On this page">
                <p className="section-label">On this page</p>
                <ol>
                  {contents.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}
                </ol>
              </nav>
            ) : null}
            <div className="article-body">
              <Content />
              <Subscribe />
              <footer className="blog-article-end">
                <Link href="/creator-blog">← Creator Blog</Link>
                <Link href={post.related.href}>{post.related.label} <span aria-hidden="true">↗</span></Link>
              </footer>
            </div>
          </div>
        </article>
      </main>
      {!post.draft ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replace(/</g, "\\u003c") }} />
      ) : null}
      <footer className="project-footer">
        <p>Sonny Proto / @sonnyproto</p>
        <Link href="/">Home ↑</Link>
      </footer>
    </>
  );
}
