import { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { PROFILE } from '../data/content';

const SECTIONS = [
  { label: 'About', href: '#about' },
  { label: 'Featured Work', href: '#work' },
  { label: 'GitHub Projects', href: '#github' },
  { label: 'Publications', href: '#publications' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);

    const onExternalOpen = () => setOpen(true);
    window.addEventListener('open-command-palette', onExternalOpen);

    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-palette', onExternalOpen);
    };
  }, []);

  const go = useCallback((href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const openLink = useCallback((url) => {
    setOpen(false);
    window.open(url, '_blank', 'noreferrer');
  }, []);

  const copyEmail = useCallback(() => {
    setOpen(false);
    navigator.clipboard?.writeText(PROFILE.email);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh] px-4"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg bg-panel border border-line rounded-lg shadow-2xl font-mono text-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-line text-signal">
          <span>{'>'}</span>
          <Command.Input
            autoFocus
            placeholder="jump to a section, or run a command..."
            className="flex-1 bg-transparent outline-none text-ink placeholder:text-dim"
          />
        </div>
        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="text-dim text-xs px-3 py-4">No results.</Command.Empty>

          <Command.Group heading="Navigate" className="text-dim text-[10px] tracking-widest px-3 py-1.5">
            {SECTIONS.map((s) => (
              <Command.Item
                key={s.href}
                onSelect={() => go(s.href)}
                className="px-3 py-2 rounded text-ink cursor-pointer aria-selected:bg-line/60 aria-selected:text-signal"
              >
                {s.label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Actions" className="text-dim text-[10px] tracking-widest px-3 py-1.5 mt-2">
            <Command.Item
              onSelect={() => openLink(PROFILE.github)}
              className="px-3 py-2 rounded text-ink cursor-pointer aria-selected:bg-line/60 aria-selected:text-signal"
            >
              Open GitHub
            </Command.Item>
            <Command.Item
              onSelect={() => openLink(PROFILE.linkedin)}
              className="px-3 py-2 rounded text-ink cursor-pointer aria-selected:bg-line/60 aria-selected:text-signal"
            >
              Open LinkedIn
            </Command.Item>
            <Command.Item
              onSelect={copyEmail}
              className="px-3 py-2 rounded text-ink cursor-pointer aria-selected:bg-line/60 aria-selected:text-signal"
            >
              Copy email address
            </Command.Item>
            <Command.Item
              onSelect={() => { setOpen(false); window.dispatchEvent(new Event('open-resume-preview')); }}
              className="px-3 py-2 rounded text-ink cursor-pointer aria-selected:bg-line/60 aria-selected:text-signal"
            >
              View resume
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}