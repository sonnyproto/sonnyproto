import { socialLinks } from "@/data/links";
import {
  FaGithub,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube
} from "react-icons/fa6";
import type { IconType } from "react-icons";

const platformIcons: Record<string, IconType> = {
  GitHub: FaGithub,
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  X: FaXTwitter,
  YouTube: FaYoutube
};

export function SocialDirectory() {
  return (
    <div className="social-directory">
      {socialLinks.map((link) => {
        const PlatformIcon = platformIcons[link.name];

        return (
          <a
            className="social-row"
            href={link.href}
            key={link.name}
            rel="noreferrer"
            target="_blank"
            aria-label={`${link.name}, @sonnyproto (opens in a new tab)`}
          >
            <span className="social-index">{link.index}</span>
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
