# Mohammad Umar — Portfolio

A personal developer portfolio built with React, Three.js, and Tailwind CSS. Showcases full-stack and applied ML projects through an interactive 3D hero, live-fetched GitHub repositories, published research, certifications, and work experience — all in a single-page, section-based layout with smooth-scroll navigation.

**Live site:** [mohammadumarportfolio.netlify.app](https://mohammadumarportfolio.netlify.app)

---

## Features

- **Interactive 3D hero** — a `</>` glyph rendered in real 3D, orbited by icons representing the web, data, version control, and CLI, each connected to the core by an animated line with a traveling pulse. Reacts to cursor movement with smoothed motion, and pauses rendering when scrolled off-screen.
- **Sticky navigation** — fixed top bar with smooth-scroll links to every section and a mobile hamburger menu.
- **About** — bio with a quick-facts card (location, role, education, focus areas).
- **Featured Work** — detailed case studies for flagship projects in an equal-sized grid.
- **Live GitHub integration** — pulls public repos directly from the GitHub API, paginated 4 at a time. Each card shows a description extracted from the repo's actual README and a real language breakdown bar from the GitHub Languages API.
- **Publications, Certifications, Education, Achievements, Experience, Skills** — all sourced from `src/data/content.js`.
- **Contact** — email and phone as matching call-to-action buttons.
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
| Hosting | Netlify |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx               # fixed nav with smooth-scroll links, mobile menu
│   ├── Hero3D.jsx                # 3D scene: glyph, orbiting icons, connection lines
│   ├── Hero3DErrorBoundary.jsx   # isolates 3D failures from the rest of the page
│   ├── TerminalBlock.jsx         # animated typed-terminal identity block
│   ├── CommandDivider.jsx        # section divider
│   └── Reveal.jsx                # scroll-triggered fade/slide wrapper
├── sections/
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── FeaturedWork.jsx
│   ├── GitHubProjects.jsx        # live GitHub API integration
│   ├── Publications.jsx
│   └── Misc.jsx                  # Certifications, Education, Achievements, Experience, Skills, Contact
├── data/
│   └── content.js                # all editable content
└── index.css
```

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
   ```
   VITE_GITHUB_TOKEN=ghp_your_token_here
   ```
3. Restart the dev server.

---

## Deployment

Deployed on Netlify:
- Build command: `npm run build`
- Publish directory: `dist`
- If using the GitHub token above, add `VITE_GITHUB_TOKEN` as an environment variable in Netlify's Site settings as well.

---

## License

Personal project — built for portfolio and job-search purposes.
