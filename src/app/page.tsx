import Image from "next/image";
import { Header } from "@/components/Header";
import { SocialDirectory } from "@/components/SocialDirectory";

export default function Home() {
  return (
    <>
      <Header />

      <main className="split-layout" id="top">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-kicker reveal reveal-1">
            <p>Personal index / 2026</p>
            <p>
              One person<br />
              Five places
            </p>
          </div>

          <h1 id="page-title" className="hero-title" aria-label="Sonny Proto">
            <span className="title-line">
              <span className="reveal-text reveal-2">Sonny</span>
            </span>
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

          <p className="hero-note reveal reveal-5">A small corner of the internet.</p>

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
      </main>

      <footer className="site-footer">
        <div className="footer-topline">
          <p>Index complete</p>
          <p>Five destinations</p>
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
