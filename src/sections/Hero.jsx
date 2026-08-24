import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Hero3D from '../components/Hero3D';
import TerminalBlock from '../components/TerminalBlock';
import { PROFILE } from '../data/content';
import Hero3DErrorBoundary from '../components/Hero3DErrorBoundary';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      <Hero3DErrorBoundary><Hero3D /></Hero3DErrorBoundary>
      <div className="absolute inset-0 bg-gradient-to-b from-void/20 via-void/50 to-void pointer-events-none" />

      <nav className="relative z-10 flex justify-between items-center section-pad !py-6">
        <span className="font-mono text-xs text-dim tracking-widest">MU // PORTFOLIO</span>
        <div className="flex gap-4">
  <a href={PROFILE.github} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full border border-line bg-panel/50 text-ink hover:text-signal hover:border-signal/40 transition-colors"><Github size={22} /></a>
  <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full border border-line bg-panel/50 text-ink hover:text-signal hover:border-signal/40 transition-colors"><Linkedin size={22} /></a>
  <a href={`mailto:${PROFILE.email}`} className="w-9 h-9 flex items-center justify-center rounded-full border border-line bg-panel/50 text-ink hover:text-signal hover:border-signal/40 transition-colors"><Mail size={22} /></a>
</div>
      </nav>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 section-pad !pt-0 !pb-16 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-end"
      >
        <div>
          <motion.p variants={item} className="font-mono text-signal text-xs md:text-sm tracking-[0.2em] mb-4">
            {'>'} SOFTWARE DEVELOPER
          </motion.p>
          <motion.h1 variants={item} className="font-display font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] glow-text">
            {PROFILE.name}
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-dim text-base md:text-lg leading-relaxed">
            {PROFILE.tagline}
          </motion.p>
          <motion.div variants={item} className="mt-10 flex items-center gap-2 text-dim font-mono text-xs">
            <ArrowDown size={14} className="animate-bounce" />
            scroll
          </motion.div>
        </div>
        <motion.div variants={item} className="hidden lg:block">
          <TerminalBlock />
        </motion.div>
      </motion.div>
    </section>
  );
}
