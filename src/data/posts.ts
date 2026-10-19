import type { ComponentType } from "react";
import type { ArticleImageProps } from "@/components/ArticleMedia";
import { siteUrl } from "@/data/site";
import { AgentHarnessArticle } from "@/components/AgentHarnessArticle";
import { KittyPromptArticle } from "@/components/KittyPromptArticle";

export type BlogSection = "coding" | "video";

type BlogPost = {
  section: BlogSection;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: readonly string[];
  publishedAt: string;
  readingMinutes: number;
  draft: boolean;
  cover?: ArticleImageProps;
  contents?: readonly { id: string; label: string }[];
  related: { href: string; label: string };
  Content: ComponentType;
};

export const blogSections = {
  coding: { label: "Coding Blog", path: "/blog" },
  video: { label: "Video Blog", path: "/video-blog" }
} as const;

export const posts: readonly BlogPost[] = [
  {
    section: "coding",
    slug: "multi-tenant-ai-agents",
    title: "Building Multi-Tenant AI Agents with VMA",
    description:
      "How VMA handles multi-tenant AI agents, with a simple architecture diagram of async workers, saved events, and resumable SSE streaming.",
    category: "Agent Infrastructure",
    tags: ["AI Agents", "System Design", "Multi-Tenant SaaS"],
    publishedAt: "2026-10-07",
    readingMinutes: 2,
    draft: false,
    related: { href: "/projects/vma", label: "Related project: VMA" },
    Content: AgentHarnessArticle
  },
  {
    section: "video",
    slug: "catknight1",
    title: "Cat Knight I — Full Prompts & References",
    description: "Complete English prompts, five reference images, and shot-by-shot directions for the broken bridge and infernal throne scenes.",
    category: "AI Video",
    tags: ["AI Video", "Prompts"],
    publishedAt: "2026-10-19",
    readingMinutes: 40,
    draft: false,
    cover: {
      src: "/media/catknight1/infernal-throne.png",
      alt: "An enormous black infernal throne surrounded by fire",
      width: 2048,
      height: 1152
    },
    contents: [
      { id: "reference-pack", label: "Reference pack" },
      { id: "bridge-prompt", label: "Broken bridge prompt" },
      { id: "throne-prompt", label: "Infernal throne prompt" },
      { id: "production-notes", label: "Production notes" },
      { id: "prompt-history", label: "Earlier versions" }
    ],
    related: { href: "https://www.youtube.com/@sonnyproto", label: "More on YouTube" },
    Content: KittyPromptArticle
  }
];

// Drafts render in `next dev` only, so they never ship by accident.
export const visiblePosts = posts.filter(
  (post) => !post.draft || process.env.NODE_ENV === "development"
);

export function getSectionPosts(section: BlogSection) {
  return visiblePosts.filter((post) => post.section === section);
}

export function getPost(slug: string, section: BlogSection = "coding") {
  return visiblePosts.find((post) => post.slug === slug && post.section === section);
}

export function getPostUrl(slug: string, section: BlogSection = "coding") {
  return `${siteUrl}${blogSections[section].path}/${slug}`;
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T00:00:00Z`));
}
