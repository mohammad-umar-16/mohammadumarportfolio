# Mohammad Umar — Portfolio

A personal developer portfolio built with React, Three.js, and Tailwind CSS. Showcases full-stack and applied ML projects through an interactive 3D hero, live-fetched GitHub repositories, published research, certifications, and work experience — all in a single-page, section-based layout with smooth-scroll navigation.

**Live site:** [mohammadumar.dev](https://mohammadumar.dev)

---

## Features

- **Interactive 3D hero** — a `</>` glyph rendered in real 3D, orbited by icons representing the web, data, version control, and CLI, each connected to the core by an animated line with a traveling pulse. Reacts to cursor movement with smoothed motion, and pauses rendering when scrolled off-screen.
- **Sticky navigation** — fixed top bar with smooth-scroll links to every section and a mobile hamburger menu.
- **About** — bio with a quick-facts card (location, role, education, focus areas).
- **Featured Work** — detailed case studies for flagship projects in an equal-sized grid.
- **Live GitHub integration** — pulls public repos directly from the GitHub API, paginated 4 at a time. Each card shows a description extracted from the repo's actual README and a real language breakdown bar from the GitHub Languages API.
- **Publications, Certifications, Education, Achievements, Experience, Skills** — all sourced from `src/data/content.js`.
- **Contact** — email and phone as matching call-to-action buttons, plus a direct message form.
- **Error-isolated 3D scene** — a React error boundary wraps the 3D hero specifically, so a WebGL failure only removes the hero visual, not the rest of the page.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React (Vite) |
| 3D | Three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing |
| Animation | Framer Motion |
| Styling | Tailwind CSS |
| Icons | lucide-react |
| Data source | GitHub REST API (public, client-side fetch) |
| Hosting | Cloudflare (mohammadumar.dev) |

---

## Project Structure

src/
├── components/
│ ├── Navbar.jsx # fixed nav with smooth-scroll links, mobile menu, Cmd+K hint
│ ├── Hero3D.jsx # 3D scene: glyph, orbiting icons, connection lines
│ ├── Hero3DErrorBoundary.jsx # isolates 3D failures from the rest of the page
│ ├── TerminalBlock.jsx # animated typed-terminal identity block, interactive prompt
│ ├── CommandPalette.jsx # Cmd+K quick navigation / actions
│ ├── ScrollProgress.jsx # top-of-page scroll progress bar
│ ├── CustomCursor.jsx # desktop trailing-ring cursor
│ ├── ParallaxGrid.jsx # background dot-grid parallax
│ ├── BootSequence.jsx # once-per-session boot flicker
│ ├── SectionHeader.jsx # shared numbered section header (full/label/minimal variants)
│ ├── CertificateModal.jsx # certificate image lightbox
│ ├── ScreenshotLightbox.jsx # project screenshot gallery lightbox
│ ├── ContactForm.jsx # direct-message form (see functions/api/contact.js)
│ ├── CommandDivider.jsx # section divider
│ └── Reveal.jsx # scroll-triggered fade/slide wrapper
├── sections/
│ ├── Hero.jsx
│ ├── About.jsx
│ ├── FeaturedWork.jsx
│ ├── GitHubProjects.jsx # live GitHub API integration
│ ├── Publications.jsx
│ └── Misc.jsx # Certifications, Education, Achievements, Experience, Skills, Contact
├── data/
│ └── content.js # all editable content
└── index.css

functions/
└── api/contact.js # Cloudflare Function template for the contact form (needs RESEND_API_KEY)


---

## Local Setup

```bash
npm install
npm run dev
```

### Optional: GitHub API token

Unauthenticated GitHub API requests are limited to 60/hour. To raise this to 5,000/hour:

1. Create a GitHub Personal Access Token (classic) at Settings → Developer settings → Personal access tokens, with no scopes selected.
2. Add to `.env`:

VITE_GITHUB_TOKEN=ghp_your_token_here

3. Restart the dev server.

---

## Deployment

Live at **[mohammadumar.dev](https://mohammadumar.dev)**, deployed on Cloudflare (see `wrangler.toml`):
- Build command: `npm run build`
- Static assets directory: `dist`
- Deploy: `wrangler deploy`
- Custom domain `mohammadumar.dev` (registrar: Hostinger) is connected to the Cloudflare deployment.
- If using the GitHub token above, add `VITE_GITHUB_TOKEN` as a Cloudflare environment variable / secret too.
- The optional contact-form endpoint (`functions/api/contact.js`) needs `RESEND_API_KEY` set as a secret, and either a switch to `wrangler pages deploy` or a Worker `main` script that routes `/api/contact` to it — see comments in that file.

---

## License

Personal project — built for portfolio and job-search purposes.