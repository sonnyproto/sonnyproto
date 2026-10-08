import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { formatPostDate, getPost, getPostUrl, posts } from "@/data/posts";
import { profileImage, siteUrl } from "@/data/site";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return {
    title: `${post.title} | Sonny Proto`,
    description: post.description,
    authors: [{ name: "Sonny Proto", url: siteUrl }],
    alternates: { canonical: getPostUrl(post.slug) },
    openGraph: {
      title: post.title,
      description: post.description,
      url: getPostUrl(post.slug),
      type: "article",
      publishedTime: post.publishedAt,
      authors: [siteUrl],
      images: [profileImage]
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
      creator: "@sonnyproto",
      images: [profileImage.url]
    }
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const Content = post.Content;

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    mainEntityOfPage: getPostUrl(post.slug),
    url: getPostUrl(post.slug),
    inLanguage: "en",
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: [`${siteUrl}${profileImage.url}`],
    author: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Sonny Proto",
      url: siteUrl
    }
  };

  return (
    <>
      <Header activeSection="blog" />
      <main className="blog-article-page" id="top">
        <Link className="back-link" href="/blog">← Coding Blog</Link>
        <article>
          <header className="blog-article-heading">
            <p className="section-label">{post.category}</p>
            <h1>{post.title}</h1>
            <div className="blog-article-meta">
              <Link href="/">Sonny Proto</Link>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              <span>{post.readingMinutes} min read</span>
            </div>
            <ul className="blog-tags" aria-label="Article topics">
              {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </header>

          <Content />

          <footer className="blog-article-end">
            <Link href="/blog">← Coding Blog</Link>
            <Link href="/projects/vma">Related project: VMA <span aria-hidden="true">↗</span></Link>
          </footer>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replace(/</g, "\\u003c") }}
      />
      <footer className="project-footer">
        <p>Sonny Proto / @sonnyproto</p>
        <Link href="/">Home ↑</Link>
      </footer>
    </>
  );
}
