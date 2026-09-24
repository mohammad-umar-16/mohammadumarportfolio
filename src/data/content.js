export const PROFILE = {
  name: "Mohammad Umar",
  role: "Software Engineer",
  tagline: "Full-stack developer building production web apps, real-time systems, and ML-driven tools.",
  location: "Delhi, India",
  email: "mohammadumar16.mu@gmail.com",
  phone: "+91 8376006470",
  github: "https://github.com/mohammad-umar-16",
  linkedin: "https://linkedin.com/in/mohammad-umar01",
  resumeUrl: "/resume.pdf",
  // set to "/photo.jpg" (dropped in /public) to show a headshot in the About card
  photoUrl: "/photo.jpg",
};

export const ABOUT = {
  paragraphs: [
    "I'm a Software Engineer based in Delhi, India, who has designed, built, and shipped production full-stack systems — React/Next.js frontends, Node.js/FastAPI backends, and AWS-deployed infrastructure. I graduated in 2025 with a B.Tech in Computer Science (Data Science) from IPEC, and most recently worked as a Software Engineer at PEER Networks, where I delivered a live client platform end to end.",
    "I also build ML-driven applications integrating computer vision and Generative AI — from real-time vital-sign estimation to multilingual video calling. I care about building things that actually ship, not just prototypes, and I'm currently looking for my next role in Software Engineering, ML/Data Science, or Frontend development.",
  ],
  focusAreas: ["Full-Stack Web Development", "Applied Machine Learning", "Real-Time Systems", "Health Tech"],
};

export const EXPERIENCE = [
  {
    role: "Software Engineer",
    org: "PEER Networks Private Limited",
    period: "1 Jul 2025 — 31 Jul 2026",
    points: [
      "Developed and maintained 3+ client-facing and internal web applications using React.js, Next.js, Node.js, and Express.js, delivering features based on evolving business requirements.",
      "Built 20+ REST API endpoints and reusable React components, integrating frontend applications with backend services and implementing authentication, validation, and error handling.",
      "Worked across two database systems, PostgreSQL and MongoDB, supporting schema design, CRUD workflows, testing, and debugging.",
      "Handled deployment on AWS (EC2, S3) and ongoing application performance improvements.",
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
    name: "Realm",
    tagline: "Real-time video calling with live translation",
    description:
      "A solo-built video calling and messaging platform extending my published speech-translation research (IJSREM 2025) into production. Live speech-to-text captioning and voice translation across 7 languages, a WebRTC signaling layer with STUN/TURN failover and automatic reconnection, and a multi-provider translation pipeline (DeepL, Sarvam AI, Gemini) with automatic fallback and a persistent Postgres cache to control API cost. JWT/httpOnly-cookie auth with email verification, and real-time messaging via per-user Socket.io rooms.",
    stack: ["React", "TypeScript", "Node.js", "Express", "Socket.io", "WebRTC", "PostgreSQL (Neon)"],
    live: "https://realm-vchat.vercel.app",
    repo: "https://github.com/mohammad-umar-16/realm",
    featured: true,
    screenshots: ["/screenshots/realm1.webp", "/screenshots/realm2.webp", "/screenshots/realm3.webp", "/screenshots/realm4.webp", "/screenshots/realm5.webp", "/screenshots/realm6.webp", "/screenshots/realm7.webp"],
  },
  {
    name: "DMcare360",
    tagline: "Live client project — full-stack home healthcare platform",
    description:
      "A production platform for a Gurgaon-based home healthcare business (DeckMount Electronics) — a full service catalog with Fuse.js-powered search, a block-based blog CMS with Supabase Storage image uploads, and an AI-powered chat assistant (Gemini API) that helps leads get instant answers about specific services. Includes a secure CRM admin with JWT + bcrypt auth, role-based access control, automated round-robin lead assignment via a Supabase cron job, and SEO-friendly dynamic meta tags across all service pages.",
    stack: ["Next.js", "Tailwind CSS v4", "Supabase", "Prisma", "PostgreSQL"],
    live: "https://dmcare360.com",
    screenshots: ["/screenshots/dmcare1.webp", "/screenshots/dmcare2.webp", "/screenshots/dmcare3.webp", "/screenshots/dmcare4.webp", "/screenshots/dmcare5.webp", "/screenshots/dmcare6.webp"],
  },
  {
    name: "FaceVitals",
    tagline: "Browser-based vital signs estimation",
    description:
      "Estimates heart rate, HRV, blood pressure, and SpO2 from live video, combining computer vision (478-point MediaPipe landmarking) with signal processing (CHROM, Welch PSD) and deep learning (FacePhys.rlap, a two-phase ResNet1D) on a FastAPI backend. Diagnosed and fixed a core signal-extraction bug, then validated blood pressure estimates against 8,299 real-world cuff measurements, improving reliability with ITA-based skin-tone correction and multi-ROI signal fusion.",
    stack: ["React", "FastAPI", "Python", "PyTorch", "MediaPipe", "Signal Processing"],
    live: "https://facevitals-tau.vercel.app/",
    repo: "https://github.com/mohammad-umar-16/facevitals",
    screenshots: ["/screenshots/facevital1.webp", "/screenshots/facevital2.webp", "/screenshots/facevital3.webp", "/screenshots/facevital4.webp", "/screenshots/facevital5.webp", "/screenshots/facevital6.webp"],
  },
  {
    name: "Expense Tracker",
    tagline: "AI-assisted personal finance app",
    description:
      "A full-stack expense tracker with natural-language expense entry, receipt photo scanning via multimodal AI, budget tracking, and AI-generated monthly spending insights — with deterministic fallbacks so core functionality never depends on a third-party API.",
    stack: ["React", "FastAPI", "PostgreSQL", "Gemini API"],
    live: "https://expense-tracker-ochre-ten-98.vercel.app",
    repo: "https://github.com/mohammad-umar-16/ExpenseTracker",
    screenshots: ["/screenshots/expensetracker1.webp", "/screenshots/expensetracker2.webp", "/screenshots/expensetracker3.webp", "/screenshots/expensetracker4.webp", "/screenshots/expensetracker5.webp", "/screenshots/expensetracker6.webp", "/screenshots/expensetracker7.webp", "/screenshots/expensetracker8.webp", "/screenshots/expensetracker9.webp", "/screenshots/expensetracker10.webp", "/screenshots/expensetracker11.webp"],
  },
  {
    name: "IndieVents",
    tagline: "Multi-city India events discovery platform",
    description: "A scraper-driven events platform aggregating listings across Delhi, Mumbai, Bangalore, Hyderabad, and Pune from sources like AllEvents.in, District, Townscript and Eventbrite India. Scheduled scraping runs every 6 hours via GitHub Actions, using Playwright for JS-rendered sources and Axios/Cheerio for static ones.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Playwright"],
    live: "https://indievents-in.vercel.app/",
    repo: "https://github.com/mohammad-umar-16/india-events-platform",
    screenshots: ["/screenshots/indievent1.webp", "/screenshots/indievent2.webp"],
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
    fileSrc: "/certificates/oracle-data-platform.jpg",
  },
  {
    name: "Oracle Agentic AI Foundations Associate",
    issuer: "Oracle (1Z0-1157-26)",
    date: "August 2026",
    fileSrc: "/certificates/oracle-agentic-ai.jpg",
  },
  {
    name: "Generative AI Foundations Certificate Program",
    issuer: "upGrad × Microsoft",
    date: "October 2025",
    fileSrc: "/certificates/genai-foundations.jpg",
  },
  {
    name: "Amazon Junior Software Developer",
    issuer: "Coursera",
    date: "2025",
    fileSrc: "/certificates/amazon-junior-swe.jpg",
  },
  {
    name: "Human Research — Data or Specimens Only Research (Basic Course)",
    issuer: "CITI Program, MIT Affiliates",
    date: "July 2026 · valid until July 2029",
    fileSrc: "/certificates/citi-human-research.jpg",
  },
  {
    name: "Technical SEO and AI Search Essentials",
    issuer: "Semrush Academy",
    date: "valid until August 2027",
    fileSrc: "/certificates/semrush-seo.jpg",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "June 2023",
    fileSrc: "/certificates/cisco-cybersecurity-intro.jpg",
  },
  {
    name: "Cybersecurity Essentials",
    issuer: "Cisco",
    date: "2023",
    fileSrc: "/certificates/cisco-cybersecurity-essentials.jpg",
  },
];

export const SKILLS = {
  "Languages": ["Python", "JavaScript", "TypeScript", "SQL"],
  "Frontend": ["React", "Figma", "Next.js", "Tailwind CSS", "Vite", "PyQt5", "HTML", "CSS"],
  "Backend & Testing": ["FastAPI", "Node.js", "Express.js", "REST APIs", "JWT Authentication", "Prisma", "SQLAlchemy", "Playwright", "Socket.io", "WebRTC"],
  "Databases & Cloud": ["PostgreSQL", "MongoDB", "Supabase", "Neon", "AWS (EC2, S3)", "Vercel", "Render", "Git", "Docker"],
  "AI & ML": ["PyTorch", "Signal Processing", "MediaPipe", "Pandas", "Gemini API", "LLM Integration"],
};