import Reveal from '../components/Reveal';
import { ExternalLink } from 'lucide-react';
import { PUBLICATIONS } from '../data/content';

export default function Publications() {
  return (
    <section id="publications" className="section-pad">
      <Reveal>
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3">{'>'} PUBLICATIONS</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12">Research</h2>
      </Reveal>
      <div className="flex flex-col divide-y divide-line border-y border-line">
        {PUBLICATIONS.map((pub, i) => (
          <Reveal key={pub.title} delay={i * 0.06}>
            <div className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className={`font-mono text-[10px] tracking-wide px-2 py-0.5 rounded border ${
                    pub.status === 'Published'
                      ? 'text-signal border-signal/40'
                      : 'text-amber border-amber/40'
                  }`}>
                    {pub.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-display text-lg text-ink leading-snug">{pub.title}</h3>
                <p className="text-dim text-sm mt-1">{pub.venue}</p>
                <p className="font-mono text-dim text-xs mt-1">{pub.detail}</p>
                {pub.authors && <p className="text-dim text-xs mt-2 italic">{pub.authors}</p>}
              </div>
              {pub.link && pub.link !== '#' && (
                <a href={pub.link} className="text-dim hover:text-signal transition-colors shrink-0">
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
