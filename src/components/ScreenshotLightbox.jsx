import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ScreenshotLightbox({ images, name, onClose }) {
  const [index, setIndex] = useState(0);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!images) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [images, onClose]);

  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${name} screenshots`}
        className="relative max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close screenshot preview"
          className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center rounded-full bg-void border border-line text-ink hover:text-signal transition-colors z-10"
        >
          <X size={16} />
        </button>

        <div className="border border-line rounded-lg overflow-hidden bg-panel">
          <img src={images[index]} alt={`${name} screenshot ${index + 1} of ${images.length}`} className="w-full h-auto" />
        </div>

        {images.length > 1 && (
          <div className="flex items-center justify-between mt-3 font-mono text-xs text-dim">
            <button
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              aria-label="Previous screenshot"
              className="flex items-center gap-1 border border-line rounded px-3 py-1.5 hover:border-signal/40 hover:text-ink transition-colors"
            >
              <ChevronLeft size={13} /> Prev
            </button>
            <span>{index + 1} / {images.length}</span>
            <button
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              aria-label="Next screenshot"
              className="flex items-center gap-1 border border-line rounded px-3 py-1.5 hover:border-signal/40 hover:text-ink transition-colors"
            >
              Next <ChevronRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}