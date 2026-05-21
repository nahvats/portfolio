// Chrome.jsx — Nav + Footer + small primitives
const { useEffect, useState } = React;

function Nav({ active, onNav, onHome }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'about',      label: 'about' },
    { id: 'now',        label: 'now' },
    { id: 'work',       label: 'work' },
    { id: 'experience', label: 'xp' },
    { id: 'contact',    label: 'contact' },
  ];

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="container nav-inner">
        <a className="brand" onClick={onHome} aria-label={PROFILE.name}>
          <img src="./logo.jpg" alt="" className="brand-logo" />
          <span className="brand-text">{PROFILE.initial}<span className="dot">.</span></span>
        </a>
        <div className="nav-links">
          {items.map(it => (
            <a key={it.id}
               className={active === it.id ? 'active' : ''}
               onClick={() => onNav(it.id)}>
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© 2026 {PROFILE.short} · built with care · press <kbd>?</kbd> for shortcuts</span>
        <div className="footer-right">
          <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer">github ↗</a>
          <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer">linkedin ↗</a>
          <a href={"mailto:" + PROFILE.email}>email</a>
        </div>
      </div>
    </footer>
  );
}

function SectionHead({ eyebrow, num, title }) {
  return (
    <div className="section-head">
      <span className="section-eyebrow">
        <span className="sh-bracket">[</span>{eyebrow}<span className="num"> · {num}</span><span className="sh-bracket">]</span>
      </span>
      <span className="section-divider" aria-hidden></span>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

function Tag({ children }) {
  return <span className="tag">{children}</span>;
}

Object.assign(window, { Nav, Footer, SectionHead, Tag });
