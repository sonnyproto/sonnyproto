import type { ComponentType } from "react";
import type { ArticleImageProps } from "@/components/ArticleMedia";
import { siteUrl } from "@/data/site";
import { AgentHarnessArticle } from "@/components/AgentHarnessArticle";
import { CatKnightPromptArticle } from "@/components/CatKnightPromptArticle";

export type BlogSection = "coding" | "video";

export type BlogPost = {
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
  coding: { label: "Coding Blog", path: "/coding-blog" },
  video: { label: "Creator Blog", path: "/creator-blog" }
} as const;

export const posts: readonly BlogPost[] = [
  {
    section: "coding",
    slug: "multi-tenant-agent-harness",
    title: "Building a Multi-Tenant Agent Harness with VMA",
    description:
      "How VMA runs async agent tasks, streams saved events, integrates OpenRouter, and attributes model spending across Accounts.",
    category: "Agent Infrastructure",
    tags: ["Agent Harnesses", "System Design", "OpenRouter", "Multi-Tenant SaaS"],
    publishedAt: "2026-10-07",
    readingMinutes: 2,
    draft: false,
    related: { href: "/projects/vma", label: "Related project: VMA" },
    Content: AgentHarnessArticle
  },
  {
    section: "video",
    slug: "catknight1",
    title: "Cat Knight I — The Infernal Throne",
    description: "A complete English throne-scene prompt, five numbered throne references, and an additional outdoor reference pack.",
    category: "AI Video",
    tags: ["AI Video", "Prompts"],
    publishedAt: "2026-10-19",
    readingMinutes: 15,
    draft: false,
    cover: {
      src: "/media/catknight1/infernal-throne.png",
      alt: "An enormous black infernal throne surrounded by fire",
      width: 2048,
      height: 1152
    },
    contents: [
      { id: "outdoor-references", label: "Outdoor references" },
      { id: "reference-pack", label: "Throne references" },
      { id: "throne-prompt", label: "Infernal throne prompt" },
      { id: "questions", label: "Q&A" }
    ],
    related: { href: "https://www.youtube.com/@sonnyproto", label: "More on YouTube" },
    Content: CatKnightPromptArticle
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
