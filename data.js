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
  // ?v= busts browser + CDN caches whenever the file is replaced. Bump on change.
  photo: "./me.jpg?v=2",
};

// Boot lines that "type out" in the hero before the name lands.
// The `$ ` prompt is added by CSS — don't include it here.
const BOOT_LINES = [
  { cmd: true,  text: "whoami" },
  { cmd: false, text: "nahush shrivatsa — researcher and engineer @ nyu" },
];

// Education — TODO(nahush): confirm degrees and dates.
// `logo` and `banner` are optional; missing files fall back to a monogram
// tile and a gradient banner. See assets/README.md.
const EDUCATION = [
  {
    school: "New York University",
    mark: "NYU",
    logo: "./assets/logos/nyu.png",
    logoBleed: true,   // filled purple square; fills the tile edge to edge
    banner: "./assets/campus/nyu.jpg",
    degree: "M.S. Computer Science",
    years: "2025 — 2027",
    loc: "New York, NY",
    did: "Building agent-based models of urban mobility at the RUN Lab, plus real-time neural imaging pipelines and network switch benchmarking at NYU IT's High Speed Research Network.",
  },
  {
    school: "University of Washington",
    mark: "UW",
    logo: "./assets/logos/uw.png",
    logoBleed: true,   // already a full-bleed square icon; no inset needed
    banner: "./assets/campus/uw.jpg",
    degree: "B.S. Computer Science",
    years: "2021 — 2025",
    loc: "Seattle, WA",
    did: "Studied neural representations and dynamics in RNNs at the Golub Lab, led software engineering on Washington Tunneling's category winning tunnel boring machine, and taught as a 4x TA at the Allen School.",
  },
];

// Experience — `current: true` renders a quiet "Current" status chip.
const EXPERIENCE = [
  {
    year: "2026 — now",
    role: "Research Engineer",
    company: "NYU IT · HSRN",
    desc: "Team lead for the real-time applications team. Built a CaImAn + FIOLA pipeline that processes neuronal fluorescence imaging on the fly, enabling closed-loop experiments. Currently benchmarking power consumption across NYU's enterprise network switches.",
    loc: "New York, NY",
    current: true,
  },
  {
    year: "2025 — now",
    role: "Graduate Researcher",
    company: "RUN Lab · NYU CUSP",
    desc: "Design recommender systems and large-scale agent-based models that simulate how algorithmic curation reshapes urban mobility. First-author paper submitted at ACM GeoSim'26.",
    loc: "New York, NY",
    current: true,
  },
  {
    year: "2024 — 2025",
    role: "Undergraduate Researcher",
    company: "Golub Lab · UW",
    desc: "Modeled population-level activity in motor cortex recordings with recurrent neural networks. Built a modular PyTorch + Hydra platform for large-scale parameter sweeps on SLURM HPCs.",
    loc: "Seattle, WA",
  },
  {
    year: "2024 — 2025",
    role: "Lead Software Engineer",
    company: "Washington Tunneling",
    desc: "Wrote the complete C++ firmware driving sensors and actuators on a tunnel boring machine. Architected a fault-tolerant serial protocol linking the ESP32 to a Python control server.",
    loc: "Seattle, WA",
  },
  {
    year: "2024",
    role: "Software Engineer Intern II",
    company: "Nokia",
    desc: "Built a KPI analytics pipeline on MongoDB, Flask, and Grafana, administered OpenShift infrastructure running Docker and Kubernetes workloads, and shipped a Llama 3 RAG application for document analysis.",
    loc: "Dubai, UAE",
  },
  {
    year: "2023",
    role: "Software Engineer Intern I",
    company: "Nokia",
    desc: "Built a distributed file store with GPG encryption using Apache NiFi and Bash, lifting transfer throughput 1.6× over the previous workflow.",
    loc: "Dubai, UAE",
  },
  {
    year: "2023",
    role: "Software Engineer Intern",
    company: "techcarrot",
    desc: "Drove early cross-platform development for a residential community app serving 10k users. Translated Figma designs into reusable React Native components.",
    loc: "Dubai, UAE",
  },
  {
    year: "2023",
    role: "Engineering Intern",
    company: "Jacobs Solutions",
    desc: "Built a Python tool that models Van der Meer wave forces for engineering calculations. Automated file synchronization between private cloud storage and SharePoint.",
    loc: "Dubai, UAE",
  },
];

// Projects — clicking opens the GitHub repo in a new tab.
const PROJECTS = [
  {
    id: "home-server",
    title: "Home Server",
    year: "2025",
    summary: "Self-hosted multi-service stack running 15+ Docker containers across isolated domains with zero-trust remote access. Currently hosting this site!",
    tags: ["Docker", "WireGuard", "Tailscale"],
    href: "https://github.com/nahushvatsa",
  },
  {
    id: "distributed-kv",
    title: "Distributed KV Store",
    year: "2023",
    summary: "Sharded, linearizable, fault-tolerant key-value store in Java. Multi-Paxos with leader election, primary-backup replication and live shard migration.",
    tags: ["Java", "Multi-Paxos", "Sharding"],
    private: true,
  },
  {
    id: "dubhacks-22",
    title: "DubHacks '22",
    year: "2022",
    summary: "Employment app for underrepresented minorities. Led front-end. Won Best Use of Google Cloud at a 500+ participant hackathon.",
    tags: ["React Native", "TypeScript", "GCP"],
    href: "https://github.com/nahushvatsa/Together",
  },
  {
    id: "chemlab",
    title: "ChemLab",
    year: "2020",
    summary: "Full-stack lab equipment management platform with inventory tracking, account balances and customer profiles.",
    tags: ["Python", "Flask", "SQL"],
    href: "https://github.com/nahushvatsa/chemLab",
  },
];


// Accent themes — cyclable via the terminal `theme` command.
// `accent` is the dark-mode value; `accentLight` is darkened so it stays
// legible on white. Glow and soft fills derive from these via color-mix.
const THEMES = [
  { id: 'blue',   name: 'indigo blue',     accent: '#7c8cff', accentLight: '#4a55d4' },
  { id: 'lime',   name: 'chartreuse lime', accent: '#c5f74f', accentLight: '#5b7411' },
  { id: 'coral',  name: 'coral',           accent: '#ff7a59', accentLight: '#c9421f' },
  { id: 'amber',  name: 'amber',           accent: '#f5b942', accentLight: '#8a6100' },
  { id: 'teal',   name: 'mint teal',       accent: '#7dd3c0', accentLight: '#0f766e' },
];

Object.assign(window, {
  PROFILE, BOOT_LINES, EDUCATION, EXPERIENCE, PROJECTS, THEMES,
});
