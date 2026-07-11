export function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Sonny Proto, back to top">
        SP / 01
      </a>

      <p className="header-index" aria-hidden="true">
        Personal index<br />
        001—005
      </p>

      <a className="header-link" href="#links">
        All links <span aria-hidden="true">↓</span>
      </a>
    </header>
  );
}
