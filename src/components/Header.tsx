import Link from "next/link";

export function Header({ activeSection }: { activeSection?: "blog" }) {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Sonny Proto, home">
        SP / 01
      </Link>

      <p className="header-index" aria-hidden="true">
        AI Engineer - Infra / Product<br />
        AI Video Creator
      </p>

      <nav className="header-nav" aria-label="Main navigation">
        <Link className="header-link" href="/blog" aria-current={activeSection === "blog" ? "page" : undefined}>Coding Blog</Link>
        <Link className="header-link" href="/#links">Links</Link>
      </nav>
    </header>
  );
}
