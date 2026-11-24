// Sections.jsx — Hero, Education, Experience, Projects, Contact
// Hooks are referenced as React.* — these files share one global scope.

/* -------------------------------------------------------------------------
   Social marks — official brand glyphs, drawn as filled 24x24 paths so they
   inherit `currentColor` and pick up the hover glow with the rest of the tile.
   ------------------------------------------------------------------------- */
const SOCIAL_PATHS = {
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  scholar: "M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 100 14 7 7 0 000-14z",
  // Not a brand mark — a generic document glyph (Material "description").
  resume: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
};

function SocialLinks() {
  return (
    <div className="hero-socials">
      {SOCIALS.map(s => (
        <a
          key={s.icon}
          className="social-link"
          data-icon={s.icon}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
            <path d={SOCIAL_PATHS[s.icon]} />
          </svg>
        </a>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------
   Hero — boot lines type out, the name lands, photo sits in a window frame.
   ------------------------------------------------------------------------- */
function Hero({ onPrimaryCta, onSecondaryCta }) {
  const [typed, setTyped] = React.useState([]);
  const [done, setDone] = React.useState(false);
  const [imgOk, setImgOk] = React.useState(true);

  React.useEffect(() => {
    const timeouts = [];
    let delay = 160;
    BOOT_LINES.forEach((line, i) => {
      timeouts.push(setTimeout(() => setTyped(prev => [...prev, line]), delay));
      // Pace each line by how long it would take to "type"; the last one
      // needs no trailing gap since nothing follows it.
      if (i < BOOT_LINES.length - 1) delay += 180 + Math.min(line.text.length * 6, 200);
    });
    timeouts.push(setTimeout(() => setDone(true), delay + 260));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <section id="hero" className="container hero">
      <div className="hero-glow" aria-hidden></div>

      <div className="hero-grid">
        <div className="hero-left">
          <div className="hero-boot" aria-hidden>
            {typed.map((l, i) => (
              <div key={i} className={"boot-line" + (l.cmd ? " is-cmd" : "")}>{l.text}</div>
            ))}
            {/* Caret only while lines are still coming — once the last one
                lands, keeping it would leave a dangling `$` prompt. */}
            {typed.length < BOOT_LINES.length && (
              <div className="boot-line is-cmd"><span className="caret">▍</span></div>
            )}
          </div>

          <h1 className={"hero-name" + (done ? " in" : "")}>
            Hi, I'm <span className="em">Nahush</span>.
            <span className="cursor" aria-hidden></span>
          </h1>

          <p className={"hero-sub" + (done ? " in" : "")}>
            I take apart ML algorithms and build the infrastructure that runs them. 
            Currently in <b><span className="acc">New York</span></b>, I am developing
            large-scale agent-based models, grounded in real mobility data, along with
            analyzing power usage across NYU's enterprise network switches.
          </p>

          <div className={"hero-ctas" + (done ? " in" : "")}>
            <button className="btn btn-primary" onClick={onPrimaryCta}>see projects →</button>
            <button className="btn btn-ghost" onClick={onSecondaryCta}>say hello</button>
            <span className="cta-divider" aria-hidden></span>
            <SocialLinks />
          </div>

          <div className={"hero-hint-row" + (done ? " in" : "")}>
            <span className="hero-hint">press <kbd>?</kbd> for a shell</span>
          </div>
        </div>

        <div className={"hero-right" + (done ? " in" : "")}>
          <figure className="photo-frame">
            <figcaption className="photo-head">
              <span className="photo-dots" aria-hidden>
                <span style={{background:'#ff5f56'}}></span>
                <span style={{background:'#ffbd2e'}}></span>
                <span style={{background:'#27c93f'}}></span>
              </span>
              <span className="photo-title">~/nahush/me.jpg</span>
            </figcaption>
            <div className="photo-body">
              {imgOk ? (
                <img src={PROFILE.photo} alt={PROFILE.name} onError={() => setImgOk(false)} />
              ) : (
                <div className="photo-fallback">
                  <div className="pf-err">me.jpg: no such file</div>
                  <div>drop a portrait at</div>
                  <div className="pf-key">./me.jpg</div>
                </div>
              )}
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Education — campus banner, brand tile, coursework.
   Banner and logo are optional; both degrade to designed placeholders.
   ------------------------------------------------------------------------- */
function EduCard({ e }) {
  const [bannerOk, setBannerOk] = React.useState(Boolean(e.banner));
  return (
    <article className="edu-card">
      <div className="edu-banner">
        {bannerOk && (
          <img src={e.banner} alt="" onError={() => setBannerOk(false)} />
        )}
        <LogoTile src={e.logo} mark={e.mark} bleed={e.logoBleed} className="edu-logo" />
      </div>
      <div className="edu-body">
        <h3 className="edu-degree">{e.degree}</h3>
        <div className="edu-school">{e.school}</div>
        <div className="edu-meta">
          <span>{e.years}</span>
          <span className="edu-dot" aria-hidden>·</span>
          <span>{e.loc}</span>
        </div>
        {e.did && <p className="edu-did">{e.did}</p>}
      </div>
    </article>
  );
}

function Education() {
  return (
    <section id="education" className="container section">
      <SectionHead cmd="cat education.md" num="01" />
      <div className="edu-grid">
        {EDUCATION.map((e, i) => <EduCard key={i} e={e} />)}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Experience — timeline rail with a brand tile per role. Current roles get
   a quiet status chip. Older roles collapse behind a toggle.
   ------------------------------------------------------------------------- */
const EXP_VISIBLE = 3;

function Experience() {
  const [expanded, setExpanded] = React.useState(false);
  const hidden = EXPERIENCE.length - EXP_VISIBLE;
  const shown = expanded ? EXPERIENCE : EXPERIENCE.slice(0, EXP_VISIBLE);

  return (
    <section id="experience" className="container section">
      <SectionHead cmd="cat experience.log" num="02" />

      <ol className="xp">
        {shown.map((e, i) => (
          <li key={i} className={"xp-row" + (e.current ? " is-current" : "")}>
            <div className="xp-when">
              <span className="xp-year">{e.year}</span>
              {e.current && <span className="xp-chip">Current</span>}
            </div>
            <div className="xp-body">
              <h3 className="xp-role">{e.role}</h3>
              <div className="xp-meta">
                <span className="xp-co">{e.company}</span>
                <span className="xp-sep" aria-hidden>—</span>
                <span className="xp-loc">{e.loc}</span>
              </div>
              <p className="xp-desc">{e.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      {hidden > 0 && (
        <div className="xp-more">
          <button onClick={() => setExpanded(v => !v)}>
            {expanded ? "Show less" : `Show ${hidden} earlier role${hidden > 1 ? "s" : ""}`}
          </button>
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------
   Projects — clicking a card opens the GitHub repo in a new tab.
   ------------------------------------------------------------------------- */
function Projects() {
  return (
    <section id="projects" className="container section">
      <SectionHead cmd="ls ./projects" num="03" />
      <div className="proj-grid">
        {PROJECTS.map((p) => {
          const inner = (
            <React.Fragment>
              <div className="proj-top">
                <div className="proj-name">
                  <h3 className="proj-title">{p.title}</h3>
                  {p.private
                    ? <span className="proj-badge">private</span>
                    : <span className="proj-ext" aria-hidden>↗</span>}
                </div>
                <span className="proj-year">{p.year}</span>
              </div>
              <p className="proj-desc">{p.summary}</p>
              <div className="proj-tags">
                {p.tags.map((t, idx) => (
                  <React.Fragment key={t}>
                    {idx > 0 && <span className="pt-sep" aria-hidden>·</span>}
                    <span>{t}</span>
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          );
          return p.private
            ? <div key={p.id} className="proj-card is-private">{inner}</div>
            : <a key={p.id} className="proj-card" href={p.href} target="_blank" rel="noopener noreferrer">{inner}</a>;
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Contact — big serif line + link list.
   ------------------------------------------------------------------------- */
function Contact() {
  return (
    <section id="contact" className="container section contact">
      <SectionHead cmd="./contact.sh" num="04" />
      <h2 className="contact-line">
        Want to <em>build something</em> together?
      </h2>
      <p className="contact-sub">
        Open to new opportunities and collaborations, especially ones with interesting
        problems attached. Say hi over email!
      </p>
      <div className="contact-links">
        <a href={"mailto:" + PROFILE.email}>→ {PROFILE.email}</a>
        <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer">→ {PROFILE.github}</a>
        <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer">→ {PROFILE.linkedin}</a>
      </div>
      <div className="contact-cta">
        <a className="btn btn-ghost" href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer">
          view resume ↗
        </a>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Education, Experience, Projects, Contact });
