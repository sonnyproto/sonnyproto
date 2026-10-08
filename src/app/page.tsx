import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SocialDirectory } from "@/components/SocialDirectory";
import { socialLinks } from "@/data/links";
import { vmaProject } from "@/data/projects";
import { siteDescription, siteTitle, siteUrl } from "@/data/site";

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl
  }
};

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
    jobTitle: "AI Engineer",
    knowsAbout: [
      "AI agents",
      "Agent infrastructure",
      "Multi-tenant systems",
      "Sandboxed agent runtimes"
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
      <Header />

      <main id="top">
        <div className="split-layout">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-kicker reveal reveal-1">
            <p>AI Engineer / Agent Infrastructure</p>
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

          <p className="hero-note reveal reveal-5">
            I&apos;m Sonny Proto. I build AI agent infrastructure and multi-tenant systems.
          </p>

        </section>

        <section className="links-section" id="links" aria-labelledby="links-title">
          <div className="section-heading">
            <p className="section-label">Directory / 05</p>
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

        <section className="selected-work" id="projects" aria-labelledby="projects-title">
          <div>
            <p className="section-label">Selected work / 01</p>
            <h2 id="projects-title">{vmaProject.name}</h2>
          </div>
          <div className="project-summary">
            <p className="project-focus">Agent infrastructure / Multi-tenant AI</p>
            <p>{vmaProject.description}</p>
            <p className="project-stack">Python · FastAPI · LangGraph</p>
            <div className="project-actions">
              <Link href={vmaProject.path}>Explore VMA <span aria-hidden="true">↗</span></Link>
              <a href={vmaProject.docsUrl} target="_blank" rel="noreferrer">
                API documentation <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-topline">
          <p>Index complete</p>
          <a href="#top">Back to top ↑</a>
        </div>
        <p className="footer-handle">I prototype. I iterate.</p>
        <div className="footer-bottomline">
          <p>© 2026</p>
          <p>Made for the internet</p>
        </div>
      </footer>
    </>
  );
}
