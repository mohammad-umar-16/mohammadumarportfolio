import { useEffect, useState } from 'react';

const LINES = ['booting mu://portfolio', 'loading modules...', 'ready.'];

export default function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [line, setLine] = useState(0);

  useEffect(() => {
    // only once per browser session, and never for reduced-motion users
    const seen = sessionStorage.getItem('mu_booted');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduced) return;

    setVisible(true);
    sessionStorage.setItem('mu_booted', '1');

    const timers = LINES.map((_, i) => setTimeout(() => setLine(i + 1), 180 + i * 160));
    const done = setTimeout(() => setVisible(false), 700);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-void flex items-center justify-center font-mono text-xs md:text-sm text-signal cursor-pointer"
      onClick={() => setVisible(false)}
    >
      <div className="space-y-1.5">
        {LINES.slice(0, line).map((l, i) => (
          <div key={i}>{'>'} {l}</div>
        ))}
      </div>
    </div>
  );
}