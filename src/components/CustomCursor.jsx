import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // skip touch/coarse-pointer devices, and respect reduced-motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;
    setEnabled(true);
    document.body.classList.add('custom-cursor-active');

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
      }
    };

    let raf;
    const tick = () => {
      // lagged ring for a trailing-cursor feel
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 14}px, ${ringY - 14}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>   
    <div ref={dotRef} className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-signal z-[150] pointer-events-none" />
    <div ref={ringRef} className="fixed top-0 left-0 w-7 h-7 rounded-full border border-signal/50 z-[150] pointer-events-none" />
    </>
  );
}