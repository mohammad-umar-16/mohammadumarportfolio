import { useEffect, useRef, useState } from 'react';
import { X, Download } from 'lucide-react';
import { PROFILE } from '../data/content';

export default function ResumePreview() {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const onOpen = () => {
      // mobile browsers render PDFs inside an iframe unreliably (often blank) —
      // open directly in a new tab there instead, where the native viewer works
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      if (isMobile) {
        window.open(PROFILE.resumeUrl, '_blank', 'noreferrer');
        return;
      }
      setOpen(true);
    };
    window.addEventListener('open-resume-preview', onOpen);
    return () => window.removeEventListener('open-resume-preview', onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll('button, a[href]');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setOpen(false)}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Resume preview"
        className="relative w-full max-w-3xl h-[85vh] bg-panel border border-line rounded-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-line shrink-0">
          <span className="font-mono text-dim text-xs tracking-widest">RESUME</span>
          <div className="flex items-center gap-2">
            
            <a  href={PROFILE.resumeUrl}
              download="mohammadumar(sde).pdf"
              aria-label="Download resume"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-line text-ink hover:text-signal hover:border-signal/40 transition-colors font-mono text-xs"
            >
              <Download size={13} /> Download
            </a>
            <button
              ref={closeBtnRef}
              onClick={() => setOpen(false)}
              aria-label="Close resume preview"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-line text-ink hover:text-signal transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <iframe
          src={PROFILE.resumeUrl}
          title="Resume preview"
          className="flex-1 w-full bg-void"
        />
      </div>
    </div>
  );
}