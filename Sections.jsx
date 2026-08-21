// Sections.jsx — Hero, Education, Experience, Projects, Contact
// Hooks are referenced as React.* — these files share one global scope.

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
    BOOT_LINES.forEach((line) => {
      timeouts.push(setTimeout(() => setTyped(prev => [...prev, line]), delay));
      delay += 180 + Math.min(line.text.length * 6, 200);
    });
    timeouts.push(setTimeout(() => setDone(true), delay));
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
            {!done && <div className="boot-line is-cmd"><span className="caret">▍</span></div>}
          </div>

          <h1 className={"hero-name" + (done ? " in" : "")}>
            Hi, I'm <span className="em">Nahush</span>.
            <span className="cursor" aria-hidden></span>
          </h1>

          <p className={"hero-sub" + (done ? " in" : "")}>
            Research engineer in <span className="acc">New York</span>, building real-time
            pipelines for neural imaging and large-scale simulations of city dynamics.
          </p>

          <div className={"hero-ctas" + (done ? " in" : "")}>
            <button className="btn btn-primary" onClick={onPrimaryCta}>see projects →</button>
            <button className="btn btn-ghost" onClick={onSecondaryCta}>say hello</button>
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
        <LogoTile src={e.logo} mark={e.mark} className="edu-logo" />
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
        Open to research collaborations, infra and systems work, and the occasional
        weird side project. Email is the fastest way to reach me.
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
