import Reveal from './Reveal';

// variant "full": index + label + heading (used sparingly, on signature sections)
// variant "label": label + heading, no index
// variant "minimal": heading only
export default function SectionHeader({ index, label, title, variant = 'full', className = 'mb-12' }) {
  return (
    <Reveal>
      {variant !== 'minimal' && (
        <div className="flex items-baseline gap-3 mb-3">
          {variant === 'full' && index && (
            <span className="font-mono text-dim/50 text-xs tracking-widest">
              {String(index).padStart(2, '0')}
            </span>
          )}
          <p className="font-mono text-signal text-xs tracking-[0.2em]">{'>'} {label}</p>
        </div>
      )}
      <h2 className={`font-display text-3xl md:text-4xl font-semibold ${className}`}>{title}</h2>
    </Reveal>
  );
}