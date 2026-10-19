import Link from "next/link";
import { homeBlogLinks, socialLinks } from "@/data/links";
import {
  FaClapperboard,
  FaCode,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube
} from "react-icons/fa6";
import type { IconType } from "react-icons";

const platformIcons: Record<string, IconType> = {
  "Video Blog": FaClapperboard,
  "Coding Blog": FaCode,
  GitHub: FaGithub,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
  TikTok: FaTiktok,
  X: FaXTwitter,
  YouTube: FaYoutube
};

export function SocialDirectory() {
  return (
    <div className="social-directory">
      {homeBlogLinks.map((link, index) => {
        const BlogIcon = platformIcons[link.name];

        return (
          <Link className="social-row home-blog-row" href={link.href} key={link.name} aria-label={link.name}>
            <span className="social-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="social-name">
              <BlogIcon className="social-logo" aria-hidden="true" />
              <span>{link.name}</span>
            </span>
            <span className="social-meta">
              <span>{link.description}</span>
              <span className="social-note">{link.note}</span>
            </span>
            <span className="social-arrow" aria-hidden="true">↗</span>
          </Link>
        );
      })}
      {socialLinks.map((link, index) => {
        const PlatformIcon = platformIcons[link.name];

        return (
          <a
            className="social-row"
            href={link.href}
            key={link.name}
            rel="me noreferrer"
            target="_blank"
            aria-label={`${link.name}, @sonnyproto (opens in a new tab)`}
          >
            <span className="social-index">{String(index + homeBlogLinks.length + 1).padStart(2, "0")}</span>
            <span className="social-name">
              <PlatformIcon className="social-logo" aria-hidden="true" />
              <span>{link.name}</span>
            </span>
            <span className="social-meta">
              <span>{link.domain}</span>
              <span className="social-note">{link.note}</span>
            </span>
            <span className="social-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        );
      })}
    </div>
  );
}
