import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { vmaProject } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }, { url: `${siteUrl}${vmaProject.path}` }];
}
