"use client";

import Link from "next/link";
import posthog from "posthog-js";
import type { ReactNode } from "react";
import type { VideoSeries } from "@/data/posts";

export function VideoPostLink({ slug, title, series, children }: {
  slug: string;
  title: string;
  series?: VideoSeries;
  children: ReactNode;
}) {
  return (
    <Link className="blog-post-card video-post-card" href={`/video-blog/${slug}`} aria-label={title}
      onClick={() => {
        if (series) posthog.capture("series_post_clicked", { series, post_slug: slug });
      }}>
      {children}
    </Link>
  );
}
