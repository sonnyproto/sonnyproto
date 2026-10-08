import { siteUrl } from "@/data/site";
import { AgentHarnessArticle } from "@/components/AgentHarnessArticle";

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
    Content: AgentHarnessArticle
  }
] as const;

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
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
