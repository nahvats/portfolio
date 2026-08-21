// Chrome.jsx — Nav + Footer + SectionHead
// Hooks are referenced as React.* — these files share one global scope.

/* Sun when dark (click for light), moon when light (click for dark). */
function ModeToggle({ mode, onToggle }) {
  const dark = mode === 'dark';
  return (
    <button
      className="mode-toggle"
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
             strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.4v2.3M12 19.3v2.3M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.4 12h2.3M19.3 12h2.3M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
             strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a6.9 6.9 0 0 0 11.1 11.1Z" />
        </svg>
      )}
    </button>
  );
}

function Nav({ active, onNav, onHome, mode, onToggleMode }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'education',  label: 'education' },
    { id: 'experience', label: 'experience' },
    { id: 'projects',   label: 'projects' },
    { id: 'contact',    label: 'contact' },
  ];

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="container nav-inner">
        <a className="brand" onClick={onHome} aria-label={PROFILE.name}>
          <img src="./logo.jpg" alt="" className="brand-logo" />
          <span className="brand-text">{PROFILE.initial}<span className="dot">.</span></span>
        </a>
        <div className="nav-right">
          <div className="nav-links">
            {items.map(it => (
              <a key={it.id}
                 className={active === it.id ? 'active' : ''}
                 onClick={() => onNav(it.id)}>
                {it.label}
              </a>
            ))}
          </div>
          <ModeToggle mode={mode} onToggle={onToggleMode} />
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© 2026 {PROFILE.short} · press <kbd>?</kbd> for a shell</span>
        <div className="footer-right">
          <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer">github ↗</a>
          <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer">linkedin ↗</a>
          <a href={"mailto:" + PROFILE.email}>email</a>
        </div>
      </div>
    </footer>
  );
}

/* One header pattern for every section: a command line + hairline rule. */
function SectionHead({ cmd, num }) {
  return (
    <div className="section-head">
      <span className="sh-prompt" aria-hidden>$</span>
      <h2 className="sh-text">{cmd}</h2>
      <span className="sh-num" aria-hidden>{num}</span>
    </div>
  );
}



/* Square brand tile. Falls back to a monogram when the image is absent. */
function LogoTile({ src, mark, className }) {
  const [ok, setOk] = React.useState(Boolean(src));
  return (
    <span className={"logo-tile" + (className ? " " + className : "")}>
      {ok
        ? <img src={src} alt="" onError={() => setOk(false)} />
        : <span className="logo-mark">{mark}</span>}
    </span>
  );
}
Object.assign(window, { Nav, Footer, SectionHead, LogoTile, ModeToggle });
