import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Menu, X, FileText, Download, Command } from 'lucide-react';
import { PROFILE } from '../data/content';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'GitHub', href: '#github' },
  { label: 'Publications', href: '#publications' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-void/95 border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-6">
        <a href="#" className="font-mono text-sm text-dim tracking-widest hover:text-signal transition-colors">
          MU // PORTFOLIO
        </a>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map(l => (
            
            <a  key={l.href}
              href={l.href}
              className="font-mono text-sm text-dim hover:text-signal transition-colors tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
            aria-label="Open command palette"
            className="flex items-center gap-1.5 px-2.5 h-8 rounded-full border border-line bg-panel/50 text-dim hover:text-signal hover:border-signal/40 transition-colors font-mono text-[11px]"
            title="Command palette (Cmd+K)"
          >
            <Command size={12} /> K
          </button>

          <button
            onClick={() => window.dispatchEvent(new Event('open-resume-preview'))}
            aria-label="View resume"
            className="flex items-center gap-1.5 px-3 h-8 rounded-full border border-line bg-panel/50 text-ink hover:text-signal hover:border-signal/40 transition-colors font-mono text-xs"
          >
            <FileText size={13} /> View Resume
          </button>

          
          <a  href={PROFILE.resumeUrl}
            download
            aria-label="Download resume"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-line bg-panel/50 text-ink hover:text-signal hover:border-signal/40 transition-colors"
            title="Download Resume"
          >
            <Download size={14} />
          </a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile" className="w-8 h-8 flex items-center justify-center rounded-full border border-line bg-panel/50 text-ink hover:text-signal hover:border-signal/40 transition-colors"><Github size={14} /></a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile" className="w-8 h-8 flex items-center justify-center rounded-full border border-line bg-panel/50 text-ink hover:text-signal hover:border-signal/40 transition-colors"><Linkedin size={14} /></a>
          <a href={`mailto:${PROFILE.email}`} aria-label="Send email" className="w-8 h-8 flex items-center justify-center rounded-full border border-line bg-panel/50 text-ink hover:text-signal hover:border-signal/40 transition-colors"><Mail size={14} /></a>
        </div>

        <button className="md:hidden text-ink" onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-void/95 backdrop-blur-md border-b border-line px-6 py-5 flex flex-col gap-4">
          {LINKS.map(l => (
            
            <a  key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-base text-dim hover:text-signal transition-colors"
            >
              {l.label}
            </a>
          ))}

          <div className="flex flex-col gap-2 pt-2 border-t border-line">
            <button
              onClick={() => { window.dispatchEvent(new Event('open-resume-preview')); setMobileOpen(false); }}
              className="flex items-center gap-2 font-mono text-sm text-dim hover:text-signal transition-colors text-left"
            >
              <FileText size={15} /> View Resume
            </button>

            
            <a  href={PROFILE.resumeUrl}
              download
              className="flex items-center gap-2 font-mono text-sm text-dim hover:text-signal transition-colors"
            >
              <Download size={15} /> Download Resume
            </a>
            <div className="flex gap-3 pt-2">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile" className="w-9 h-9 flex items-center justify-center rounded-full border border-line text-ink"><Github size={15} /></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile" className="w-9 h-9 flex items-center justify-center rounded-full border border-line text-ink"><Linkedin size={15} /></a>
              <a href={`mailto:${PROFILE.email}`} aria-label="Send email" className="w-9 h-9 flex items-center justify-center rounded-full border border-line text-ink"><Mail size={15} /></a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}