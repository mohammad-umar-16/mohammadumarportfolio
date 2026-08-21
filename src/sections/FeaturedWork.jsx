import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import Reveal from '../components/Reveal';
import { PROJECTS } from '../data/content';

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="group h-full flex flex-col border border-line rounded-lg p-7 md:p-8 bg-panel/40 hover:border-signal/40 hover:bg-panel/70 transition-colors"
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="font-display text-2xl font-semibold text-ink">{project.name}</h3>
            <p className="font-mono text-signal text-xs mt-1 tracking-wide">{project.tagline}</p>
          </div>
          <div className="flex gap-3 shrink-0 pt-1">
            <a href={project.live} className="text-dim hover:text-signal transition-colors" title="Live site"><ArrowUpRight size={18} /></a>
            <a href={project.repo} className="text-dim hover:text-signal transition-colors" title="Source"><Github size={18} /></a>
          </div>
        </div>
        <p className="text-dim text-sm leading-relaxed mb-5 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.stack.map(s => (
            <span key={s} className="font-mono text-[11px] text-dim border border-line rounded px-2 py-1">
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function FeaturedWork() {
  return (
    <section id="work" className="section-pad">
      <Reveal>
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3">{'>'} FEATURED WORK</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12">Selected Projects</h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-5 items-stretch">
        {PROJECTS.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
      </div>
    </section>
  );
}