export const PROFILE = {
  name: "Mohammad Umar",
  role: "Software Engineer",
  tagline: "Full-stack developer building production web apps, real-time systems, and ML-driven tools.",
  location: "Delhi, India",
  email: "mohammadumar16.mu@gmail.com",
  github: "https://github.com/mohammad-umar-16",
  linkedin: "https://linkedin.com/in/mohammad-umar01",
};


export const ABOUT = {
  paragraphs: [
    "I'm a full-stack developer based in Greater Noida, India. I graduated in 2025 with a B.Tech in Computer Science (Data Science) from IPEC, and most recently worked as a Software Engineer at PEER Networks, where I built and shipped software solutions end to end.",
    "I care about building things that actually ship, not just prototypes — that means paying as much attention to auth security, database reliability, and graceful fallbacks as to the feature itself. I'm currently looking for my next role in Software Engineering, ML/Data Science, or Frontend development.",
  ],
  focusAreas: ["Full-Stack Web Development", "Applied Machine Learning", "Real-Time Systems", "Health Tech"],
};

export const EXPERIENCE = [
  {
    role: "Software Engineer",
    org: "PEER Networks Private Limited",
    period: "1 Jul 2025 — 31 Jul 2026",
    points: [
      "Designed, developed, tested, and deployed software applications and solutions end to end.",
      "Translated functional and business requirements into effective technical implementations.",
      "Worked across development, application testing, debugging, and performance improvement.",
    ],
  },
];
export const EDUCATION = [
  {
    institution: "Indraprastha Engineering College (IPEC)",
    affiliation: "Dr. A. P. J. Abdul Kalam Technical University",
    degree: "B.Tech, Computer Science and Engineering (Data Science)",
    period: "2021 — 2025",
  },
  {
    institution: "Cambridge School, Srinivas Puri",
    affiliation: "CBSE",
    degree: "Class XII",
    period: "2020 — 2021",
  },

];

export const ACHIEVEMENTS = [
  "Successfully qualified GATE 2026 in Computer Science Information Technology (CSIT)",
  "Solved 100+ LeetCode problems, strengthening data structures and algorithms fundamentals.",
  "Member of the CSE Club at IPEC.",

];

export const PROJECTS = [
  {
    name: "DMcare360",
    tagline: "Full-stack home healthcare platform",
    description:
      "A production platform for a Gurgaon-based home healthcare business — public-facing service pages, a searchable medical equipment catalog, a block-based blog CMS, and a full admin panel with JWT auth, role-based access, and round-robin lead assignment.",
    stack: ["Next.js", "Tailwind CSS v4", "Supabase", "Prisma", "PostgreSQL"],
    live: "https://dmcare360frontend.vercel.app",
    repo: "#",
  },
  {
    name: "FaceVitals",
    tagline: "Browser-based vital signs estimation",
    description:
      "Estimates heart rate, HRV, blood pressure, and SpO2 from a 30-second face video using remote photoplethysmography (rPPG). Includes CHROM signal-extraction fixes, multi-ROI SNR-weighted fusion, and a from-scratch BP regression refit validated against real cuff measurements.",
    stack: ["React", "FastAPI", "Python", "Signal Processing", "PyTorch"],
    live: "https://facevitals-tau.vercel.app/",
    repo: "https://github.com/mohammad-umar-16/facevitals",
  },
  {
    name: "Expense Tracker",
    tagline: "AI-assisted personal finance app",
    description:
      "A full-stack expense tracker with natural-language expense entry, receipt photo scanning via multimodal AI, budget tracking, and AI-generated monthly spending insights — with deterministic fallbacks so core functionality never depends on a third-party API.",
    stack: ["React", "FastAPI", "PostgreSQL", "Gemini API"],
    live: "https://expense-tracker-ochre-ten-98.vercel.app",
    repo: "https://github.com/mohammad-umar-16/ExpenseTracker",
  },
];

export const PUBLICATIONS = [
  {
    title: "Speech Translation Technology In Chatting And Video Conference Platform",
    venue: "International Journal of Scientific Research in Engineering and Management (IJSREM)",
    detail: "Vol. 09, Issue 01 — January 2025 · ISSN 2582-3930",
    authors: "Prateek Maurya, Mohammad Umar, Pratik Raj",
    status: "Published",
    link: "https://ijsrem.com/download/speech-translation-technology-in-chatting-and-video-conference-platform",
  },
{
    title: "Real Time text and video Communication System with Integrated Speech Translation",
    venue: "2025 7th  International Conference on Computing, Communication and Automation (ICCCA",
    authors: "Prateek Maurya, Mohammad Umar, Pratik Raj",
    status: "Accepted",
  },
];

export const CERTIFICATIONS = [
  {
    name: "Oracle Certified Foundations Associate",
    issuer: "Oracle University — Oracle Data Platform 2025",
    date: "October 2025",
  },
  {
    name: "Generative AI Foundations Certificate Program",
    issuer: "upGrad × Microsoft",
    date: "October 2025",
  },
  {
    name: "Amazon Junior Software Developer",
    issuer: "Coursera",
    date: "2025",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "2023",
  },
  {
    name: "Cybersecurity Essentials",
    issuer: "Cisco",
    date: "2023",
  },
];

export const SKILLS = {
  "Languages": ["Python", "JavaScript / TypeScript", "SQL"],
  "Frontend": ["React", "Next.js", "Tailwind CSS", "Vite"],
  "Backend": ["FastAPI", "Node.js", "REST APIs", "JWT Auth"],
  "Data & ML": ["PyTorch", "Signal Processing", "pandas", "Prisma / SQLAlchemy"],
  "Infra": ["PostgreSQL", "Supabase", "Neon", "Vercel", "Render", "Git"],
};
