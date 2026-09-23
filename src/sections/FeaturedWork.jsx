import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Images } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import ScreenshotLightbox from '../components/ScreenshotLightbox';
import { PROJECTS } from '../data/content';

// Drop project screenshots in /public/screenshots/<slug>.png and set `screenshots: [...]`
// on the matching PROJECTS entry in content.js to have them appear here, framed in a
// simple browser-chrome bar to match the terminal aesthetic instead of a bare <img>.
function ProjectScreenshot({ src, name }) {
  if (!src) {
    return (
      <div className="aspect-video w-full rounded-t-lg border-b border-line bg-void/60 flex items-center justify-center font-mono text-dim/40 text-xs">
        {'// screenshot pending'}
      </div>
    );
  }
  return (
    <div className="rounded-t-lg overflow-hidden border-b border-line">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-void/80">
        <span className="w-2 h-2 rounded-full bg-amber/60" />
        <span className="w-2 h-2 rounded-full bg-signal/60" />
        <span className="w-2 h-2 rounded-full bg-dim/40" />
      </div>
      <img src={src} alt={`${name} screenshot`} className="w-full h-auto" loading="lazy" />
    </div>
  );
}

// Custom architecture diagram for Realm, shown in place of the screenshot placeholder
// until a real screenshot is added — a diagram of the actual system beats a generic
// icon stack or an empty "pending" box.
function RealmDiagram() {
  const box = "fill-panel stroke-line";
  const label = "fill-ink font-mono";
  const sub = "fill-dim font-mono";
  return (
    <div className="aspect-video w-full border-b border-line bg-void/60 flex items-center justify-center p-4">
      <svg viewBox="0 0 380 220" className="w-full h-full max-w-md" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="16" width="90" height="34" rx="4" className={box} strokeWidth="1" />
        <text x="55" y="37" textAnchor="middle" fontSize="9" className={label}>Client (WebRTC)</text>

        <rect x="145" y="16" width="90" height="34" rx="4" className={box} strokeWidth="1" />
        <text x="190" y="37" textAnchor="middle" fontSize="9" className={label}>Socket.io signaling</text>

        <rect x="280" y="16" width="90" height="34" rx="4" className={box} strokeWidth="1" />
        <text x="325" y="37" textAnchor="middle" fontSize="9" className={label}>Client (WebRTC)</text>

        <line x1="100" y1="33" x2="145" y2="33" stroke="#22D3EE" strokeWidth="1" opacity="0.6" />
        <line x1="235" y1="33" x2="280" y2="33" stroke="#22D3EE" strokeWidth="1" opacity="0.6" />

        <line x1="190" y1="50" x2="190" y2="85" stroke="#22D3EE" strokeWidth="1" opacity="0.6" />
        <rect x="100" y="85" width="180" height="34" rx="4" className={box} strokeWidth="1" />
        <text x="190" y="106" textAnchor="middle" fontSize="9" className={label}>translation pipeline</text>

        <line x1="190" y1="119" x2="190" y2="150" stroke="#FFA733" strokeWidth="1" opacity="0.7" />
        <rect x="40" y="150" width="80" height="30" rx="4" className={box} strokeWidth="1" />
        <text x="80" y="169" textAnchor="middle" fontSize="8" className={sub}>DeepL</text>
        <rect x="150" y="150" width="80" height="30" rx="4" className={box} strokeWidth="1" />
        <text x="190" y="169" textAnchor="middle" fontSize="8" className={sub}>Sarvam (hi)</text>
        <rect x="260" y="150" width="80" height="30" rx="4" className={box} strokeWidth="1" />
        <text x="300" y="169" textAnchor="middle" fontSize="8" className={sub}>Gemini fallback</text>

        <line x1="190" y1="119" x2="190" y2="205" stroke="#FFA733" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
        <text x="190" y="216" textAnchor="middle" fontSize="8" className={sub}>Postgres cache</text>
      </svg>
    </div>
  );
}

// Multi-shot gallery for every project — thumbnail with a "+N more" pill,
// opens the full set in a lightbox on click. Realm falls back to the
// architecture diagram (via the caller) until `screenshots` has an entry.
function ScreenshotGallery({ images, name }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative w-full text-left block"
        aria-label={`View ${images.length} screenshots of ${name}`}
      >
        <ProjectScreenshot src={images[0]} name={name} />
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 bg-void/85 border border-line rounded px-2 py-1 font-mono text-[10px] text-ink">
            <Images size={11} /> +{images.length - 1} more
          </span>
        )}
      </button>
      {open && <ScreenshotLightbox images={images} name={name} onClose={() => setOpen(false)} />}
    </>
  );
}

function FeaturedCard({ project }) {
  return (
    <Reveal className="lg:col-span-2">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="group flex flex-col md:flex-row overflow-hidden border border-signal/30 rounded-lg bg-elevated hover:border-signal/60 transition-colors"
      >
        <div className="md:w-1/2">
          {project.screenshots && project.screenshots.length > 0 ? (
            <ScreenshotGallery images={project.screenshots} name={project.name} />
          ) : project.name === 'Realm' ? (
            <RealmDiagram />
          ) : (
            <ProjectScreenshot src={null} name={project.name} />
          )}
        </div>
        <div className="flex-1 flex flex-col p-7 md:p-8">
          <span className="font-mono text-amber text-[10px] tracking-widest mb-2">FEATURED</span>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink">{project.name}</h3>
              <p className="font-mono text-signal text-xs mt-1 tracking-wide">{project.tagline}</p>
            </div>
            <div className="flex gap-3 shrink-0 pt-1">
              <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live site`} className="text-dim hover:text-signal transition-colors">
                <ArrowUpRight size={18} />
              </a>
              <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} source on GitHub`} className="text-dim hover:text-signal transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>
          <p className="text-dim text-sm leading-relaxed mb-5 flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.stack.map(s => (
              <span key={s} className="font-mono text-[11px] text-dim border border-line rounded px-2 py-1">{s}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="group h-full flex flex-col overflow-hidden border border-line rounded-lg bg-panel/40 hover:border-signal/40 hover:bg-panel/70 transition-colors"
      >
        {project.screenshots && project.screenshots.length > 0 ? (
          <ScreenshotGallery images={project.screenshots} name={project.name} />
        ) : (
          <ProjectScreenshot src={null} name={project.name} />
        )}
        <div className="flex flex-col flex-1 p-7 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-display text-2xl font-semibold text-ink">{project.name}</h3>
              <p className="font-mono text-signal text-xs mt-1 tracking-wide">{project.tagline}</p>
            </div>
            <div className="flex gap-3 shrink-0 pt-1">
              <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live site`} className="text-dim hover:text-signal transition-colors">
                <ArrowUpRight size={18} />
              </a>
              <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} source on GitHub`} className="text-dim hover:text-signal transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>
          <p className="text-dim text-sm leading-relaxed mb-5 flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.stack.map(s => (
              <span key={s} className="font-mono text-[11px] text-dim border border-line rounded px-2 py-1">{s}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function FeaturedWork() {
  const featured = PROJECTS.filter(p => p.featured);
  const rest = PROJECTS.filter(p => !p.featured);

  return (
    <section id="work" className="section-pad">
      <SectionHeader index={2} label="FEATURED WORK" title="Selected Projects" />
      <div className="grid md:grid-cols-2 gap-5 items-stretch">
        {featured.map(p => <FeaturedCard key={p.name} project={p} />)}
        {rest.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
      </div>
    </section>
  );
}