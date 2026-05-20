// Sections.jsx — Hero, Work, Now, About, Experience, GitHub, Writing, Contact
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

/* -------------------------------------------------------------------------
   Hero — terminal boot lines type out, then the display name lands.
   ------------------------------------------------------------------------- */
function Hero({ onPrimaryCta, onSecondaryCta }) {
  const [typed, setTyped] = useStateS([]);
  const [done, setDone] = useStateS(false);

  useEffectS(() => {
    let timeouts = [];
    let delay = 220;
    BOOT_LINES.forEach((line) => {
      timeouts.push(setTimeout(() => {
        setTyped(prev => [...prev, line]);
      }, delay));
      delay += 280 + Math.min(line.text.length * 12, 350);
    });
    timeouts.push(setTimeout(() => setDone(true), delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <section id="hero" className="container narrow hero">
      <div className="hero-glow" aria-hidden></div>

      <div className="hero-boot" aria-hidden>
        {typed.map((l, i) => (
          <div key={i} className={"boot-line" + (l.cmd ? " is-cmd" : "")}>{l.text}</div>
        ))}
        {!done && <div className="boot-line is-cmd"><span className="caret">▍</span></div>}
      </div>

      <div className={"hero-eyebrow" + (done ? " in" : "")}>
        <span className="live-dot"></span>
        <span>AVAILABLE · Q3 2026 · NYC</span>
      </div>

      <h1 className={"hero-name" + (done ? " in" : "")}>
        Hi, I'm <span className="em">Nahush</span>.
        <span className="cursor" aria-hidden></span>
      </h1>

      <p className={"hero-sub" + (done ? " in" : "")}>
        Research engineer in <span className="acc">New York</span>, working on urban resilience simulations and real-time
        pipelines for neural imaging at NYU. I like building things that scale and last: from 
        <span className="hot"> ml infra</span> to <span className="hot">embedded firmware</span>
        , and the occasional home-lab rabbit hole.
      </p>

      <div className={"hero-ctas" + (done ? " in" : "")}>
        <button className="btn btn-primary" onClick={onPrimaryCta}>see projects →</button>
        <button className="btn btn-ghost" onClick={onSecondaryCta}>say hello</button>
        <span className="hero-hint">press <kbd>?</kbd> for shortcuts</span>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Work — clicking a card opens the GitHub repo in a new tab.
   ------------------------------------------------------------------------- */
function Work() {
  return (
    <section id="work" className="container section">
      <SectionHead eyebrow="WORK" num="03" title="Past projects" count={PROJECTS.length} />
      <div className="projects-grid">
        {PROJECTS.map((p, i) => {
          const inner = (
            <React.Fragment>
              <div className="pc-num-row">
                <span className="pc-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pc-id">{p.id}</span>
                {p.private && <span className="pc-private">private</span>}
              </div>
              <div className="pc-head">
                <span className="pc-title">{p.title}</span>
                <span className="pc-year">{p.year}</span>
              </div>
              <p className="pc-desc">{p.summary}</p>
              <div className="pc-foot">
                <div className="pc-tags">
                  {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
                {!p.private && <span className="pc-arr">→</span>}
              </div>
            </React.Fragment>
          );
          return p.private
            ? <div key={p.id} className="project-card pc-no-link">{inner}</div>
            : <a key={p.id} className="project-card" href={p.href} target="_blank" rel="noopener noreferrer">{inner}</a>;
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Now — what I'm currently doing
   ------------------------------------------------------------------------- */
function NowSection() {
  return (
    <section id="now" className="container section">
      <SectionHead eyebrow="NOW" num="02" title="Currently working on" />
      <div className="now-grid">
        {NOW.items.map((it, i) => (
          <div key={i} className={"now-card" + (it.hot ? " now-card-hot" : "")}>
            <div className="now-label">{it.label}</div>
            <p className="now-text">{it.text}</p>
          </div>
        ))}
      </div>
      <div className="now-foot">
        <span className="meta">// last updated {NOW.updated}</span>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   About — bio + skills sidebar
   ------------------------------------------------------------------------- */
function About() {
  return (
    <section id="about" className="container section">
      <SectionHead eyebrow="ABOUT" num="01" title="A bit about me" />
      <div className="about-grid">
        <div className="about-prose">
          <p>
            I'm Nahush — a research engineer based in {PROFILE.location}. I work mostly at the
            overlap of <span className="hot">algorithms, systems, and AI</span>, focusing on
            building reliable and optimized Machine Learning infrastructure that can bring transformational change to society.
          </p>
          <p>
            Right now, I'm part of the <a href="https://www.takayabe.net/" target="_blank" rel="noopener noreferrer">RUN Lab</a> at NYU CUSP, where I'm building Agent Based Models (ABMs)
            to simulate and study how recommender systems affect city dynamics. I'm also on the real-time
            applications team at NYU's High Speed Research Network, developing closed loop computational pipelines
            for neuroscience experiments. Before that I was
            studying motor-cortex neural activity with RNNs at UW's <a href="https://homes.cs.washington.edu/~mgolub/" target="_blank" rel="noopener noreferrer">Golub Lab</a>, writing firmware and building systems on
            a tunnel boring machine, and interning across Nokia, Jacobs, and techcarrot in Dubai.
          </p>
          <p>
            Outside of work, I run a self-hosted home server (best hobby ever!). I am also a marathon 
            runner (x2) and have a deep love for traveling and exploring new cultures. Apart from Math, I'm very interested in History and Philosophy and finding the unity between all of us.
          </p>
        </div>
        <aside className="about-sidecard">
          <h4>// skills</h4>
          <ul className="about-side-list">
            {SKILLS.map(([k, v]) => (
              <li key={k}><span>{k}</span><span>{v}</span></li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Experience — chronological list with tags
   ------------------------------------------------------------------------- */
function Experience() {
  return (
    <section id="experience" className="container section">
      <SectionHead eyebrow="EXPERIENCE" num="04" title="What I've worked on" count={EXPERIENCE.length} />
      <div className="exp-list">
        {EXPERIENCE.map((e, i) => (
          <div key={i} className="exp-item">
            <span className="exp-year">{e.year}</span>
            <div>
              <h4 className="exp-role">
                {e.role} <span className="exp-sep">/</span> <span className="co">{e.company}</span>
              </h4>
              <p className="exp-desc">{e.desc}</p>
            </div>
            <span className="exp-loc">{e.loc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   GitHub activity — fake-but-shaped contribution graph + recent commits
   ------------------------------------------------------------------------- */
function GitHubActivity() {
  const cellColor = (v) => {
    if (v === 0) return 'var(--surface-2)';
    if (v === 1) return 'rgba(124,140,255,0.22)';
    if (v === 2) return 'rgba(124,140,255,0.45)';
    if (v === 3) return 'rgba(124,140,255,0.72)';
    return 'var(--accent)';
  };

  return (
    <section id="github" className="container section">
      <SectionHead eyebrow="GITHUB" num="05" title="What I've been pushing" />

      <div className="gh-stats">
        <div className="gh-stat">
          <div className="gh-stat-val">{GITHUB.contributionsThisYear}</div>
          <div className="gh-stat-lbl">contributions · last year</div>
        </div>
        <div className="gh-stat">
          <div className="gh-stat-val">{GITHUB.longestStreak}d</div>
          <div className="gh-stat-lbl">longest streak</div>
        </div>
        <div className="gh-stat">
          <div className="gh-stat-val">{GITHUB.currentStreak}d</div>
          <div className="gh-stat-lbl">current streak</div>
        </div>
        <div className="gh-stat">
          <div className="gh-stat-val">{GITHUB.starsTotal}</div>
          <div className="gh-stat-lbl">stars received</div>
        </div>
      </div>

      <div className="gh-graph-wrap">
        <div className="gh-graph">
          {GITHUB.contributions.map((wk, wi) => (
            <div key={wi} className="gh-col">
              {wk.map((v, di) => (
                <div key={di} className="gh-cell" style={{background: cellColor(v)}} title={`level ${v}`}></div>
              ))}
            </div>
          ))}
        </div>
        <div className="gh-legend">
          <span>less</span>
          {[0,1,2,3,4].map(v => (
            <div key={v} className="gh-cell" style={{background: cellColor(v)}}></div>
          ))}
          <span>more</span>
        </div>
      </div>

      <div className="gh-recent">
        <h4 className="gh-recent-title">// recent commits</h4>
        <ul className="gh-commits">
          {GITHUB.recent.map((c, i) => (
            <li key={i} className="gh-commit">
              <span className="gh-commit-repo">{c.repo}</span>
              <span className="gh-commit-msg">{c.msg}</span>
              <span className="gh-commit-when">{c.when}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{marginTop: 24}}>
        <a className="btn btn-ghost" href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer">
          full graph on github ↗
        </a>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Writing — empty state, deliberately. Section is in nav for when it fills up.
   ------------------------------------------------------------------------- */
function Writing() {
  return (
    <section id="writing" className="container section">
      <SectionHead eyebrow="WRITING" num="06" title="Notes & essays" />
      <div className="writing-empty">
        <pre className="writing-empty-pre">{`$ ls ./writing
total 0
$ # nothing here yet — coming soon
$ _`}</pre>
        <p className="writing-empty-note">
          I'm planning to write up the home-server build, some distributed-systems notes,
          and a few neural-imaging deep dives once the current sprint settles.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Contact — big line + link list
   ------------------------------------------------------------------------- */
function Contact() {
  return (
    <section id="contact" className="container narrow contact">
      <span className="section-eyebrow" style={{display: 'block', marginBottom: 24}}>
        CONTACT <span className="num">— 07</span>
      </span>
      <h2 className="contact-line">
        Want to <em>build something</em> with me?
      </h2>
      <p className="contact-sub">
        Open to research collaborations, infra/systems contract work, and the occasional
        weird side project. Probably the fastest way to reach me is email.
      </p>
      <div className="contact-links">
        <a href={"mailto:" + PROFILE.email}>→ {PROFILE.email}</a>
        <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer">→ {PROFILE.github}</a>
        <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer">→ {PROFILE.linkedin}</a>
      </div>
      <div style={{marginTop: 32}}>
        <a className="btn btn-ghost" href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer">
          view resume ↗
        </a>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Work, NowSection, About, Experience, GitHubActivity, Writing, Contact });
