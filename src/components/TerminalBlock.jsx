import { useState, useEffect } from 'react';

const LINES = [
  { prompt: "whoami", output: "mohammad-umar — software developer" },
  { prompt: "cat focus.txt", output: "full-stack web · applied ML · real-time systems" },
  { prompt: "status", output: "open to SWE / ML / Frontend roles" },
];

export default function TerminalBlock() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showOutput, setShowOutput] = useState([false, false, false]);

  useEffect(() => {
    if (lineIndex >= LINES.length) return;
    const current = LINES[lineIndex].prompt;

    if (charIndex < current.length) {
      const t = setTimeout(() => setCharIndex(c => c + 1), 35);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setShowOutput(prev => {
          const next = [...prev];
          next[lineIndex] = true;
          return next;
        });
        setTimeout(() => {
          setLineIndex(i => i + 1);
          setCharIndex(0);
        }, 380);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [charIndex, lineIndex]);

  return (
    <div className="font-mono text-xs md:text-sm border border-line rounded-lg bg-panel/60 backdrop-blur-sm p-5 max-w-md w-full">
      <div className="flex gap-1.5 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E8A33D]/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#4ECDA4]/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-dim/40" />
      </div>
      <div className="space-y-2.5">
        {LINES.map((line, i) => {
          if (i > lineIndex) return null;
          const typed = i === lineIndex ? line.prompt.slice(0, charIndex) : line.prompt;
          return (
            <div key={i}>
              <div className="text-ink">
                <span className="text-signal">{'>'} </span>{typed}
                {i === lineIndex && charIndex < line.prompt.length && (
                  <span className="inline-block w-[7px] h-[13px] bg-signal ml-0.5 animate-pulse align-middle" />
                )}
              </div>
              {showOutput[i] && (
                <div className="text-dim pl-3.5 mt-1">{line.output}</div>
              )}
            </div>
          );
        })}
        {lineIndex >= LINES.length && (
          <span className="inline-block w-[7px] h-[13px] bg-signal animate-pulse align-middle" />
        )}
      </div>
    </div>
  );
}
