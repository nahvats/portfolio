// app.jsx — root component, scroll-spy, terminal easter egg, theme cycle, snake, konami CRT
const { useState, useEffect, useRef, useCallback } = React;

const NAV_IDS = ['education', 'experience', 'projects', 'contact'];
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

/* ============================================================ */
/*  Accent theme — CSS vars on :root, persisted                 */
/* ============================================================ */
/* --accent-glow and --accent-soft are derived from --accent with color-mix
   in the stylesheet, so only --accent needs setting here. --accent-bright
   stays on the dark value: the terminal is dark in both modes. */
function applyTheme(id, mode) {
  const t = THEMES.find(x => x.id === id) || THEMES[0];
  const root = document.documentElement;
  root.style.setProperty('--accent', mode === 'light' ? t.accentLight : t.accent);
  root.style.setProperty('--accent-bright', t.accent);
  try { localStorage.setItem('nahush.theme', t.id); } catch {}
  return t;
}
function loadStoredTheme() {
  try {
    const id = localStorage.getItem('nahush.theme');
    if (id && THEMES.find(t => t.id === id)) return id;
  } catch {}
  return THEMES[0].id;
}

/* ============================================================ */
/*  Light / dark mode                                           */
/* ============================================================ */
/* The inline script in index.html already set data-mode before paint;
   read it back rather than recomputing, so the two never disagree. */
function loadStoredMode() {
  const attr = document.documentElement.getAttribute('data-mode');
  if (attr === 'light' || attr === 'dark') return attr;
  try {
    const m = localStorage.getItem('nahush.mode');
    if (m === 'light' || m === 'dark') return m;
  } catch {}
  return 'light';  // default; matches the pre-paint script in index.html
}
function applyMode(mode) {
  document.documentElement.setAttribute('data-mode', mode);
  try { localStorage.setItem('nahush.mode', mode); } catch {}
  return mode;
}

/* ============================================================ */
/*  Snake — playable inside the terminal body                   */
/* ============================================================ */
function SnakeGame({ onExit }) {
  const COLS = 28, ROWS = 14;
  const [snake, setSnake] = useState([{x: 14, y: 7}, {x: 13, y: 7}, {x: 12, y: 7}]);
  const [dir, setDir] = useState({x: 1, y: 0});
  const [food, setFood] = useState({x: 20, y: 7});
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const dirRef = useRef(dir);
  dirRef.current = dir;

  const randCell = useCallback((avoid) => {
    while (true) {
      const c = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
      if (!avoid.some(s => s.x === c.x && s.y === c.y)) return c;
    }
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key;
      if (k === 'Escape') { e.preventDefault(); onExit(); return; }
      if (over) {
        if (k === 'r' || k === 'R') {
          e.preventDefault();
          setSnake([{x: 14, y: 7}, {x: 13, y: 7}, {x: 12, y: 7}]);
          setDir({x: 1, y: 0});
          setFood(randCell([{x:14,y:7},{x:13,y:7},{x:12,y:7}]));
          setScore(0);
          setOver(false);
        }
        return;
      }
      const d = dirRef.current;
      if ((k === 'ArrowUp' || k === 'w')    && d.y !== 1)  { e.preventDefault(); setDir({x: 0, y: -1}); }
      if ((k === 'ArrowDown' || k === 's')  && d.y !== -1) { e.preventDefault(); setDir({x: 0, y: 1}); }
      if ((k === 'ArrowLeft' || k === 'a')  && d.x !== 1)  { e.preventDefault(); setDir({x: -1, y: 0}); }
      if ((k === 'ArrowRight' || k === 'd') && d.x !== -1) { e.preventDefault(); setDir({x: 1, y: 0}); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [over, onExit, randCell]);

  // Tick
  useEffect(() => {
    if (over) return;
    const id = setInterval(() => {
      setSnake(prev => {
        const head = { x: prev[0].x + dirRef.current.x, y: prev[0].y + dirRef.current.y };
        // walls
        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
          setOver(true);
          return prev;
        }
        // self
        if (prev.some(s => s.x === head.x && s.y === head.y)) {
          setOver(true);
          return prev;
        }
        const ate = head.x === food.x && head.y === food.y;
        const next = [head, ...prev];
        if (!ate) next.pop();
        else {
          setScore(s => s + 1);
          setFood(randCell(next));
        }
        return next;
      });
    }, 110);
    return () => clearInterval(id);
  }, [over, food, randCell]);

  // Render grid as chars
  const grid = [];
  for (let y = 0; y < ROWS; y++) {
    let row = '';
    for (let x = 0; x < COLS; x++) {
      if (snake[0].x === x && snake[0].y === y) row += '◉';
      else if (snake.slice(1).some(s => s.x === x && s.y === y)) row += '●';
      else if (food.x === x && food.y === y) row += '✦';
      else row += '·';
    }
    grid.push(row);
  }

  return (
    <div className="snake-wrap">
      <div className="snake-bar">
        <span className="snake-score">score · <b>{score}</b></span>
        <span className="snake-hint">arrows or wasd · esc to quit{over && ' · r to restart'}</span>
      </div>
      <pre className="snake-grid">{grid.join('\n')}</pre>
      {over && (
        <div className="snake-over">
          <div>━━━ GAME OVER ━━━</div>
          <div>final score: {score}</div>
          <div className="snake-over-hint">press <kbd>r</kbd> to retry · <kbd>esc</kbd> to exit</div>
        </div>
      )}
    </div>
  );
}

/* ============================================================ */
/*  Terminal — easter egg shell                                  */
/* ============================================================ */
const TERMINAL_HELP = [
  "help              — this message",
  "whoami            — about me, short",
  "ls                — list site sections",
  "cd <section>      — jump to a section",
  "cat resume.txt    — quick stats",
  "open github       — opens github profile",
  "open linkedin     — opens linkedin",
  "open resume       — opens resume pdf",
  "contact           — show contact info",
  "theme [name]      — cycle accent, or set: blue/lime/coral/amber/teal",
  "mode [light|dark] — switch appearance (or just: light / dark)",
  "snake             — play snake (arrows or wasd, esc to quit)",
  "konami            — hint for a secret",
  "clear             — clear the screen",
  "exit              — close terminal (or press esc)",
];

function Terminal({ open, onClose, onNav, onTheme, currentTheme, onMode, currentMode }) {
  const [history, setHistory] = useState([
    { type: 'sys', text: "nahush.sh — interactive shell" },
    { type: 'sys', text: "type `help` to see commands · esc to close" },
  ]);
  const [input, setInput] = useState("");
  const [game, setGame] = useState(null); // 'snake' or null
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  /* --- Dragging ------------------------------------------------------
     Offset from the overlay's centred resting position. Lives on a
     wrapper rather than .term itself, so it can't fight the pop-in
     animation (a CSS animation on transform beats an inline style). */
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const shellRef = useRef(null);
  const dragRef = useRef(null);
  const movedRef = useRef(false);   // suppresses the overlay's close-on-click

  const EDGE = 48;  // px of window that must stay on screen

  const onDragStart = (e) => {
    if (e.button !== 0) return;               // primary button / touch only
    const el = shellRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    dragRef.current = {
      sx: e.clientX, sy: e.clientY,
      ox: pos.x, oy: pos.y,
      // rect minus the current offset = where it sits with no transform
      baseLeft: r.left - pos.x, baseTop: r.top - pos.y,
      w: r.width, h: r.height,
    };
    movedRef.current = false;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();                        // don't select the title text
  };

  const onDragMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!movedRef.current && Math.abs(dx) + Math.abs(dy) > 3) movedRef.current = true;
    const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
    setPos({
      // keep at least EDGE px of the window within the viewport
      x: clamp(d.ox + dx, EDGE - d.baseLeft - d.w, window.innerWidth - EDGE - d.baseLeft),
      // never let the title bar go above the top, or it can't be grabbed back
      y: clamp(d.oy + dy, -d.baseTop, window.innerHeight - EDGE - d.baseTop),
    });
  };

  const onDragEnd = (e) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    // Stay armed just long enough to swallow this gesture's click, then
    // re-arm — otherwise the next genuine backdrop click gets eaten too.
    setTimeout(() => { movedRef.current = false; }, 0);
  };

  const recenter = () => setPos({ x: 0, y: 0 });

  // A drag that ends over the backdrop shouldn't count as a click-to-close.
  const onOverlayClick = () => {
    if (movedRef.current) return;
    onClose();
  };

  /* Window controls. stopPropagation on pointerdown keeps a button press
     from also starting a drag on the title bar underneath. */
  const swallowDrag = (e) => e.stopPropagation();
  const toggleMin = () => { setMinimized(v => !v); setMaximized(false); };
  const toggleMax = () => {
    setMaximized(v => {
      if (!v) setPos({ x: 0, y: 0 });   // re-centre as it grows
      return !v;
    });
    setMinimized(false);
  };

  useEffect(() => {
    if (open && !game) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open, game]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const print = (lines) => {
    const arr = Array.isArray(lines) ? lines : [lines];
    setHistory(h => [...h, ...arr.map(l => typeof l === 'string' ? { type: 'out', text: l } : l)]);
  };

  const run = (raw) => {
    const cmd = raw.trim();
    setHistory(h => [...h, { type: 'cmd', text: cmd }]);
    if (!cmd) return;
    const [head, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(' ').toLowerCase();

    switch (head.toLowerCase()) {
      case 'help':
        print(TERMINAL_HELP);
        break;
      case 'whoami':
        print([
          "nahush shrivatsa",
          "  role     researcher and engineer @ nyu hsrn",
          "  loc      new york city",
          "  focus    algorithms · systems · ai",
        ]);
        break;
      case 'ls':
        print(["education/  experience/  projects/  contact/"]);
        break;
      case 'cd':
        if (NAV_IDS.includes(arg)) {
          print(`→ jumping to /${arg}`);
          setTimeout(() => { onNav(arg); onClose(); }, 250);
        } else {
          print(`cd: no such section: ${arg || '(none)'}`);
        }
        break;
      case 'cat':
        if (arg === 'resume.txt' || arg === 'resume') {
          print([
            "─── nahush_shrivatsa.resume ───────────────",
            "now      researcher + engineer · nyu hsrn",
            "prev     golub lab · washington tunneling",
            "         nokia · jacobs · techcarrot",
            "stack    python · C++ · java · pytorch · ts",
            "         docker · SQL · linux",
            "─────────────────────────────────────────",
          ]);
        } else {
          print(`cat: ${arg}: no such file`);
        }
        break;
      case 'open':
        if (arg === 'github') { window.open(PROFILE.githubUrl, '_blank'); print('→ opening github…'); }
        else if (arg === 'linkedin') { window.open(PROFILE.linkedinUrl, '_blank'); print('→ opening linkedin…'); }
        else if (arg === 'resume') { window.open(PROFILE.resumeUrl, '_blank'); print('→ opening resume…'); }
        else print(`open: don't know how to open '${arg}'`);
        break;
      case 'contact':
        print([
          `email     ${PROFILE.email}`,
          `github    ${PROFILE.github}`,
          `linkedin  ${PROFILE.linkedin}`,
        ]);
        break;
      case 'theme': {
        if (!arg || arg === 'next' || arg === 'cycle') {
          const i = THEMES.findIndex(t => t.id === currentTheme);
          const next = THEMES[(i + 1) % THEMES.length];
          onTheme(next.id);
          print(`✓ theme → ${next.name} (${next.accent})`);
        } else if (arg === 'list' || arg === 'ls') {
          print(['available themes:', ...THEMES.map(t => `  ${t.id.padEnd(8)} ${t.accent}  ${t.name}${t.id === currentTheme ? '  ← active' : ''}`)]);
        } else {
          const match = THEMES.find(t => t.id === arg);
          if (match) {
            onTheme(match.id);
            print(`✓ theme → ${match.name} (${match.accent})`);
          } else {
            print(`theme: unknown '${arg}'. try: theme list`);
          }
        }
        break;
      }
      case 'snake':
        print('→ launching snake. arrows or wasd. esc to quit.');
        setTimeout(() => setGame('snake'), 250);
        break;
      case 'konami':
        print([
          'try the konami code anywhere on the page:',
          '  ↑ ↑ ↓ ↓ ← → ← → b a',
          "(don't say i didn't warn you)",
        ]);
        break;
      case 'theme?':
        print(`current theme: ${THEMES.find(t => t.id === currentTheme)?.name || 'unknown'}`);
        break;
      case 'mode':
      case 'light':
      case 'dark': {
        const verb = head.toLowerCase();
        let next;
        if (verb === 'light' || verb === 'dark') next = verb;
        else if (arg === 'light' || arg === 'dark') next = arg;
        else if (arg === '' || arg === 'toggle') next = currentMode === 'dark' ? 'light' : 'dark';
        else { print(`mode: unknown '${arg}'. try: mode light | mode dark | mode`); break; }
        onMode(next);
        print(`✓ ${next} mode`);
        break;
      }
      case 'sudo':
        print(`sudo: ${arg}: command not found`);
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'exit':
      case 'quit':
        onClose();
        break;
      case 'echo':
        print(rest.join(' '));
        break;
      case 'rm':
        if (arg.includes('rf')) print("nice try.");
        else print(`rm: ${arg}: permission denied`);
        break;
      default:
        print(`zsh: command not found: ${head}`);
    }
  };

  if (!open) return null;

  return (
    <div className="term-overlay" onClick={onOverlayClick}>
      <div
        ref={shellRef}
        className={"term-shell" + (dragging ? " is-dragging" : "")}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        <div className="term" onClick={e => e.stopPropagation()}>
          <div
            className="term-head"
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerCancel={onDragEnd}
            onDoubleClick={recenter}
            title="Drag to move · double-click to re-center"
          >
            <div className="term-dots">
              <button
                className="term-dot term-dot-close"
                onPointerDown={swallowDrag} onClick={onClose}
                aria-label="Close terminal" title="Close"
              ><span aria-hidden>×</span></button>
              <button
                className="term-dot term-dot-min"
                onPointerDown={swallowDrag} onClick={toggleMin}
                aria-label={minimized ? 'Restore terminal' : 'Minimize terminal'}
                title={minimized ? 'Restore' : 'Minimize'}
              ><span aria-hidden>{minimized ? '+' : '−'}</span></button>
              <button
                className="term-dot term-dot-max"
                onPointerDown={swallowDrag} onClick={toggleMax}
                aria-label={maximized ? 'Restore terminal size' : 'Maximize terminal'}
                title={maximized ? 'Restore' : 'Maximize'}
              ><span aria-hidden>{maximized ? '⤡' : '⤢'}</span></button>
            </div>
            <div className="term-title">~/nahush — zsh{game === 'snake' ? ' · snake' : ''}</div>
            <div style={{width: 60}}></div>
          </div>

          {game === 'snake' ? (
            <div className="term-body">
              <SnakeGame onExit={() => { setGame(null); print('snake exited.'); }} />
            </div>
          ) : (
            <div className="term-body" ref={scrollRef}>
              {history.map((h, i) => {
                if (h.type === 'cmd')
                  return <div key={i} className="term-line term-cmd"><span className="term-prompt">~/nahush $</span> {h.text}</div>;
                if (h.type === 'sys')
                  return <div key={i} className="term-line term-sys">{h.text}</div>;
                return <div key={i} className="term-line">{h.text}</div>;
              })}
              <div className="term-line term-input-line">
                <span className="term-prompt">~/nahush $</span>
                <input
                  ref={inputRef}
                  className="term-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') { run(input); setInput(""); }
                    if (e.key === 'Escape') onClose();
                  }}
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="term-caret">▍</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  CRT mode — Konami code triggers retro green-on-black overlay */
/* ============================================================ */
function CrtBanner({ onExit, secondsLeft }) {
  return (
    <div className="crt-banner">
      <span className="crt-banner-dot"></span>
      CRT MODE · {secondsLeft}s · <a onClick={onExit}>esc to exit</a>
    </div>
  );
}

/* ============================================================ */
/*  App root                                                     */
/* ============================================================ */
function App() {
  const [active, setActive] = useState('education');
  const [termOpen, setTermOpen] = useState(false);
  const [theme, setTheme] = useState(THEMES[0].id);
  const [mode, setMode] = useState(loadStoredMode);
  const [crt, setCrt] = useState(false);
  const [crtLeft, setCrtLeft] = useState(30);
  const konamiRef = useRef([]);

  // Restore accent + mode on mount
  useEffect(() => {
    const id = loadStoredTheme();
    const m = loadStoredMode();
    setTheme(id);
    setMode(m);
    applyMode(m);
    applyTheme(id, m);
  }, []);

  const changeTheme = (id) => { setTheme(id); applyTheme(id, mode); };

  // Accent brightness depends on mode, so re-apply when the mode flips.
  const changeMode = (next) => {
    setMode(next);
    applyMode(next);
    applyTheme(theme, next);
  };
  const toggleMode = () => changeMode(mode === 'dark' ? 'light' : 'dark');


  // Scroll-spy
  useEffect(() => {
    const onScroll = () => {
      let current = NAV_IDS[0];
      let bestDist = Infinity;
      for (const id of NAV_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top - 80);
        if (r.top < window.innerHeight * 0.5 && dist < bestDist) {
          bestDist = dist;
          current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Global keys: `?`/`/` open terminal, esc closes, Konami code triggers CRT
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      const inField = tag === 'INPUT' || tag === 'TEXTAREA';

      // ? / opens terminal
      if (!inField && (e.key === '?' || e.key === '/')) {
        e.preventDefault();
        setTermOpen(true);
        return;
      }
      if (e.key === 'Escape') {
        // If snake is running, let SnakeGame's own handler exit the game.
        // Don't also close the terminal — that's a second Esc press.
        if (document.querySelector('.snake-grid')) return;
        setTermOpen(false);
        if (crt) setCrt(false);
      }

      // Konami sequence — track last N keys
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      konamiRef.current = [...konamiRef.current, key].slice(-KONAMI.length);
      if (konamiRef.current.length === KONAMI.length &&
          konamiRef.current.every((k, i) => k === KONAMI[i])) {
        konamiRef.current = [];
        triggerCrt();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [crt]);

  const triggerCrt = () => {
    setCrt(true);
    setCrtLeft(30);
  };

  // CRT countdown + body class
  useEffect(() => {
    if (!crt) {
      document.body.classList.remove('crt-mode');
      return;
    }
    document.body.classList.add('crt-mode');
    const tick = setInterval(() => {
      setCrtLeft(s => {
        if (s <= 1) { setCrt(false); return 30; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [crt]);

  const goHome = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const goSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <React.Fragment>
      <Nav active={active} onNav={goSection} onHome={goHome}
           mode={mode} onToggleMode={toggleMode} />
      <main>
        <Hero
          onPrimaryCta={() => goSection('projects')}
          onSecondaryCta={() => goSection('contact')}
        />
        <Education />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
      <Terminal
        open={termOpen}
        onClose={() => setTermOpen(false)}
        onNav={goSection}
        onTheme={changeTheme}
        currentTheme={theme}
        onMode={changeMode}
        currentMode={mode}
      />
      <button className="term-fab" onClick={() => setTermOpen(true)} aria-label="open terminal">
        <span className="term-fab-prompt">$_</span>
      </button>
      {crt && <CrtBanner onExit={() => setCrt(false)} secondsLeft={crtLeft} />}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
