import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaClapperboard, FaCode } from "react-icons/fa6";
import { Header } from "@/components/Header";
import { SocialDirectory } from "@/components/SocialDirectory";
import { homeBlogLinks, socialLinks } from "@/data/links";
import { siteDescription, siteTitle, siteUrl } from "@/data/site";

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl
  }
};

const blogIcons = { "Creator Blog": FaClapperboard, "Coding Blog": FaCode };

const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/#profile`,
  url: siteUrl,
  name: siteTitle,
  description: siteDescription,
  mainEntity: {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Sonny Proto",
    alternateName: "sonnyproto",
    jobTitle: ["AI Engineer", "AI Video Creator"],
    knowsAbout: [
      "AI agents",
      "Agent infrastructure",
      "Multi-tenant systems",
      "Sandboxed agent runtimes",
      "AI video production"
    ],
    url: siteUrl,
    image: `${siteUrl}/me.png`,
    sameAs: socialLinks.map((link) => link.href)
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePage).replace(/</g, "\\u003c")
        }}
      />
      <Header activeSection="home" />

      <main id="top">
        <div className="split-layout">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-kicker reveal reveal-1">
            <p>AI Engineer - Infra / Product<br />AI Video Creator</p>
          </div>

          <h1 id="page-title" className="hero-title" aria-label="Sonny Proto">
            <span className="title-line">
              <span className="reveal-text reveal-2">Sonny</span>
            </span>
            {" "}
            <span className="title-line title-line-bottom">
              <span className="reveal-text reveal-3">Proto</span>
            </span>
          </h1>

          <figure className="portrait-wrap reveal reveal-4">
            <div className="portrait-frame">
              <Image
                className="portrait"
                src="/me.png"
                alt="Pixel portrait of Sonny Proto"
                fill
                priority
                sizes="(max-width: 720px) calc(100vw - 36px), 640px"
              />
              <span className="portrait-corner portrait-corner-top" aria-hidden="true" />
              <span className="portrait-corner portrait-corner-bottom" aria-hidden="true" />
            </div>
            <figcaption>
              <span>Self portrait</span>
              <span>PNG / 1024²</span>
            </figcaption>
          </figure>

        </section>

        <section className="links-section" id="links" aria-labelledby="links-title">
          <div className="section-heading">
            <p className="section-label">Directory / {String(socialLinks.length).padStart(2, "0")}</p>
            <h2 id="links-title">
              Find me
              <br />
              online.
            </h2>
            <p className="section-caption">
              Same handle,<br />
              different corners.
            </p>
          </div>

          <SocialDirectory />
        </section>
        </div>

      </main>

      <footer className="site-footer">
        <div className="footer-topline">
          <p>Index complete</p>
          <a href="#top">Back to top ↑</a>
        </div>
        <div className="footer-content">
          <p className="footer-handle">
            <span>I prototype.</span>{" "}
            <span className="footer-line-offset">I iterate.</span>
          </p>
          <nav className="footer-blogs" aria-label="Blogs">
            {homeBlogLinks.map((link, index) => {
              const BlogIcon = blogIcons[link.name];

              return (
                <Link className="footer-blog-link" href={link.href} key={link.name} aria-label={link.name}>
                  <span className="footer-blog-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="footer-blog-title">
                    <BlogIcon className="social-logo" aria-hidden="true" />
                    <span>{link.name}</span>
                  </span>
                  <span className="footer-blog-meta">
                    <span>{link.description}</span>
                    <span className="footer-blog-note">{link.note}</span>
                  </span>
                  <span className="footer-blog-arrow" aria-hidden="true">↗</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="footer-bottomline">
          <p>© 2026</p>
          <p>Made for the internet</p>
        </div>
      </footer>
    </>
  );
}
