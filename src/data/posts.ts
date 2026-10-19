import { siteUrl } from "@/data/site";
import { AgentHarnessArticle } from "@/components/AgentHarnessArticle";
import { KittyPromptArticle } from "@/components/KittyPromptArticle";

export const posts = [
  {
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
    // TODO(sonny): fill in the article, then set draft to false and update publishedAt.
    slug: "kitty-ai-video-prompts",
    title: "TODO: KITTY AI Video Prompts",
    description: "TODO: the prompts and models behind the KITTY video.",
    category: "AI Video",
    tags: ["AI Video", "Prompts"],
    publishedAt: "2026-10-18",
    readingMinutes: 3,
    draft: true,
    related: { href: "https://www.youtube.com/@sonnyproto", label: "More on YouTube" },
    Content: KittyPromptArticle
  }
] as const;

// Drafts render in `next dev` only, so they never ship by accident.
export const visiblePosts = posts.filter(
  (post) => !post.draft || process.env.NODE_ENV === "development"
);

export function getPost(slug: string) {
  return visiblePosts.find((post) => post.slug === slug);
}

export function getPostUrl(slug: string) {
  return `${siteUrl}/blog/${slug}`;
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T00:00:00Z`));
}
