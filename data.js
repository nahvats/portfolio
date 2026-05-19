// data.js — Nahush Shrivatsa's portfolio content

const PROFILE = {
  name: "Nahush Shrivatsa",
  initial: "nahush",
  short: "ns",
  role: "algorithms, systems & ai",
  location: "New York City",
  email: "ns6928@nyu.edu",
  github: "github.com/nahushvatsa",
  githubUrl: "https://github.com/nahushvatsa",
  linkedin: "linkedin.com/in/nahush-shrivatsa",
  linkedinUrl: "https://www.linkedin.com/in/nahush-shrivatsa/",
  resumeUrl: "./nahush_resume.pdf",
};

// Boot lines that "type out" in the hero before the name lands.
// The `$ ` prompt is added by CSS — don't include it here.
const BOOT_LINES = [
  { cmd: true,  text: "whoami" },
  { cmd: false, text: "nahush shrivatsa — algorithms · systems · ai" },
  { cmd: true,  text: "pwd" },
  { cmd: false, text: "/nyc/research_engineer" },
  { cmd: true,  text: "cat ./now" },
];

// Projects — clicking opens the GitHub repo in a new tab (no case-study pages).
const PROJECTS = [
  {
    id: "home-server",
    title: "Home Server",
    year: "2025",
    summary: "Self-hosted multi-service stack with 15+ Docker containers across isolated networks, zero-trust remote access. A playground for my projects.",
    tags: ["Docker", "WireGuard", "Bash", "Tailscale", "Virtualization"],
    status: "live",
    href: "https://github.com/nahushvatsa",
  },
  {
    id: "distributed-kv",
    title: "Distributed KV Store",
    year: "2023",
    summary: "Sharded, linearizable, fault-tolerant key-value store in Java. Multi-Paxos with leader election, primary-backup replication, live shard migration.",
    tags: ["Java", "Multi-Paxos", "Sharding", "RPC"],
    status: "shipped",
    private: true,
  },
  {
    id: "dubhacks-22",
    title: "DubHacks '22",
    year: "2022",
    summary: "Employment app for underrepresented minorities. Led front-end, React Native + TypeScript. Won Best Use of Google Cloud at a 500+ participant hackathon.",
    tags: ["React Native", "TypeScript", "GCP"],
    status: "winner",
    href: "https://github.com/nahushvatsa/Together",
  },
  {
    id: "chemlab",
    title: "ChemLab",
    year: "2020",
    summary: "Full-stack lab equipment management website with inventory tracking, account balances, customer profiles. Flask + SQLAlchemy + multiple SQL databases.",
    tags: ["Python", "Flask", "SQL"],
    status: "archived",
    href: "https://github.com/nahushvatsa/chemLab",
  },
];

// Current focus — the "Now" section.
const NOW = {
  updated: "2026.05",
  items: [
    {
      label: "@ NYU IT HSRN",
      hot: true,
      text: "Building a CalmAn + Fiola pipeline for the Fenton Lab that processes neuronal fluorescence imaging in real-time, for closed-loop dynamic experimentation.",
    },
    {
      label: "@ NYU RUN Lab",
      hot: true,
      text: "Designing and iterating recommendor systems and large-scale ABM simulations to model city dynamics.",
    },
    {
      label: "side / home server",
      text: "Building a web server. Might experiment with SMTP next",
    },
    {
      label: "reading",
      text: "Discovery of India: Nehru. \nSong Sung True: Malka Pukhraj",
    },
  ],
};

// Experience — top entries condensed.
const EXPERIENCE = [
  {
    year: "2026 — now",
    role: "Research Engineer",
    company: "NYU IT · HSRN",
    desc: "Real-time applications team. Designing and deploying high-throughput computational pipelines on HSRN infrastructure, collaborating with research labs across NYU.",
    loc: "New York, NY"
  },
  {
    year: "2024 — 2025",
    role: "Undergraduate Researcher",
    company: "Golub Lab · UW",
    desc: "Modeled population-level neural activity from motor cortex recordings using RNNs. Built a modular, SLURM-compatible PyTorch + Hydra platform for large-scale parameter sweeps.",
    loc: "Seattle, WA"
  },
  {
    year: "2024 — 2025",
    role: "Lead Software Engineer",
    company: "Washington Tunneling",
    desc: "C++ firmware on ESP32 (Arduino framework), interfacing sensors and actuators on a tunnel boring machine. Architectured a robust serial protocol between the microcontroller and a Python control server.",
    loc: "Seattle, WA"
  },
  {
    year: "2024",
    role: "Software Engineer Intern II",
    company: "Nokia",
    desc: "Built a Gen AI doc-analysis app (LLaMA 3 + RAG + vector DB) cutting analysis time by 70%. Data analysis and visualization pipeline with MongoDB + Flask + Grafana. OpenShift platform sysadmin.",
    loc: "Dubai, UAE"
  },
  {
    year: "2023",
    role: "Software Engineer Intern",
    company: "techcarrot",
    desc: "Early development of cross-platform features for a 10k-user residential community app. Delivered scalable React Native components from Figma to working app.",
    loc: "Dubai, UAE"
  },
  {
    year: "2023",
    role: "Engineering Intern",
    company: "Jacobs Solutions",

    desc: "Built a Python tool to model Van der Waals wave forces for engineering calculations. Autonomous file sync between private cloud and SharePoint.",
    loc: "Dubai, UAE"
  },
];

// GitHub activity — synthetic, but laid out like the real graph.
// 53 weeks × 7 days, values 0-4 (intensity).
function generateContributions() {
  const weeks = 53;
  const out = [];
  for (let w = 0; w < weeks; w++) {
    const wk = [];
    for (let d = 0; d < 7; d++) {
      // weighted random so most are low; a few hot streaks
      const r = Math.random();
      let v = 0;
      if (r > 0.45) v = 1;
      if (r > 0.65) v = 2;
      if (r > 0.82) v = 3;
      if (r > 0.93) v = 4;
      // weekends quieter
      if (d === 0 || d === 6) v = Math.max(0, v - 1);
      wk.push(v);
    }
    out.push(wk);
  }
  return out;
}

const GITHUB = {
  contributionsThisYear: 847,
  longestStreak: 23,
  currentStreak: 6,
  starsTotal: 142,
  contributions: generateContributions(),
  recent: [
    { repo: "home-server",      msg: "feat: gluetun selective routing for *arr stack", when: "2d ago" },
    { repo: "home-server",      msg: "fix: caddy reload after seafile cert renew",     when: "5d ago" },
    { repo: "fenton-pipeline",  msg: "wip: fiola batch boundary handling",              when: "1w ago" },
    { repo: "dotfiles",         msg: "chore: nvim plugin pruning",                      when: "2w ago" },
    { repo: "home-server",      msg: "docs: README + topology diagram",                 when: "3w ago" },
  ],
};

// Skills sidebar
const SKILLS = [
  ["languages",   "Python · C++ · Java · TS"],
  ["systems",     "Linux · SQL · MongoDB"],
  ["ml",          "PyTorch · Hydra · CUDA"],
  ["frontend",    "React · React Native"],
  ["infra",       "Docker · Kubernetes · Git"],
];

// Empty writing list — section shows an empty state.
const WRITING = [];

// Accent themes — cyclable via the terminal `theme` command.
const THEMES = [
  { id: 'blue',   name: 'indigo blue',     accent: '#7c8cff', glow: 'rgba(124, 140, 255, 0.45)' },
  { id: 'lime',   name: 'chartreuse lime', accent: '#c5f74f', glow: 'rgba(197, 247, 79, 0.45)' },
  { id: 'coral',  name: 'coral',           accent: '#ff7a59', glow: 'rgba(255, 122, 89, 0.45)' },
  { id: 'amber',  name: 'amber',           accent: '#f5b942', glow: 'rgba(245, 185, 66, 0.45)' },
  { id: 'teal',   name: 'mint teal',       accent: '#7dd3c0', glow: 'rgba(125, 211, 192, 0.45)' },
];

Object.assign(window, {
  PROFILE, BOOT_LINES, PROJECTS, NOW, EXPERIENCE, GITHUB, SKILLS, WRITING, THEMES,
});
