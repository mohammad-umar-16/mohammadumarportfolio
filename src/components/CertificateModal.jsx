import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function CertificateModal({ cert, onClose }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!cert) return;

    // lock background scroll while the modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // basic focus trap: keep Tab cycling within the dialog
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
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={cert.name}
        className="relative max-w-2xl w-full bg-panel border border-line rounded-lg p-4"
        onClick={e => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close certificate preview"
          className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center rounded-full bg-void border border-line text-ink hover:text-signal transition-colors"
        >
          <X size={16} />
        </button>
        <img
          src={cert.fileSrc}
          alt={cert.name}
          className="w-full h-auto rounded"
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
        />
        <p className="hidden text-dim text-sm text-center py-8">Certificate image not found — check the file path.</p>
        <div className="mt-3 text-center">
          <h4 className="text-ink font-medium text-sm">{cert.name}</h4>
          <p className="text-dim text-xs mt-1">{cert.issuer}</p>
        </div>
      </div>
    </div>
  );
}