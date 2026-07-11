export type SocialLink = {
  index: string;
  name: string;
  domain: string;
  note: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  {
    index: "01",
    name: "GitHub",
    domain: "github.com",
    note: "Build",
    href: "https://github.com/sonnyproto"
  },
  {
    index: "02",
    name: "YouTube",
    domain: "youtube.com",
    note: "Watch",
    href: "https://www.youtube.com/@sonnyproto"
  },
  {
    index: "03",
    name: "X",
    domain: "x.com",
    note: "Read",
    href: "https://x.com/sonnyproto"
  },
  {
    index: "04",
    name: "Instagram",
    domain: "instagram.com",
    note: "See",
    href: "https://www.instagram.com/sonnyproto"
  },
  {
    index: "05",
    name: "TikTok",
    domain: "tiktok.com",
    note: "Play",
    href: "https://www.tiktok.com/@sonnyproto"
  }
];
