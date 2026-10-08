import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { vmaProject } from "@/data/projects";
import { getPostUrl, posts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}${vmaProject.path}` },
    { url: `${siteUrl}/blog` },
    ...posts.map((post) => ({ url: getPostUrl(post.slug), lastModified: post.publishedAt }))
  ];
}
