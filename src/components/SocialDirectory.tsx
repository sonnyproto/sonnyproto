import { socialLinks } from "@/data/links";

export function SocialDirectory() {
  return (
    <div className="social-directory">
      {socialLinks.map((link) => (
        <a
          className="social-row"
          href={link.href}
          key={link.name}
          rel="noreferrer"
          target="_blank"
          aria-label={`${link.name}, @sonnyproto (opens in a new tab)`}
        >
          <span className="social-index">{link.index}</span>
          <span className="social-name">{link.name}</span>
          <span className="social-meta">
            <span>{link.domain}</span>
            <span className="social-note">{link.note}</span>
          </span>
          <span className="social-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}
