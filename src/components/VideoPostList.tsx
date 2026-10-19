import Image from "next/image";
import Link from "next/link";
import { formatPostDate, type BlogPost } from "@/data/posts";

export function VideoPostList({ posts }: { posts: readonly BlogPost[] }) {
  return (
    <div className="blog-post-list">
      {posts.map((post, index) => (
        <Link className="blog-post-card video-post-card" href={`/creator-blog/${post.slug}`} aria-label={post.title} key={post.slug}>
          {post.cover ? (
            <div className="video-post-cover video-post-cover-image">
              <Image src={post.cover.src} alt={post.cover.alt} width={post.cover.width} height={post.cover.height}
                sizes="(max-width: 720px) calc(100vw - 36px), 400px" loading={index === 0 ? "eager" : "lazy"}
                unoptimized={!post.cover.src.startsWith("/")} />
            </div>
          ) : (
            <div className="video-post-cover" aria-hidden="true">
              <span>Film notes / {String(index + 1).padStart(2, "0")}</span>
              <span className="video-post-cover-title">{post.title.split(" — ")[0]}</span>
              <span>References · Prompts</span>
            </div>
          )}
          <article>
            <div className="blog-post-meta">
              <span>{post.category}{post.draft ? " / Draft preview" : ""}</span>
              <span><time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time> · {post.readingMinutes} min read</span>
            </div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <span className="blog-read-link">Get the prompt <span aria-hidden="true">↗</span></span>
          </article>
        </Link>
      ))}
    </div>
  );
}
