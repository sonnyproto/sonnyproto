import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { vmaProject } from "@/data/projects";
import { getPostUrl, visiblePosts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}${vmaProject.path}` },
    { url: `${siteUrl}/blog` },
    { url: `${siteUrl}/video-blog` },
    { url: `${siteUrl}/video-blog/knight` },
    ...visiblePosts.filter((post) => !post.draft).map((post) => ({
      url: getPostUrl(post.slug, post.section),
      lastModified: post.publishedAt
    }))
  ];
}
