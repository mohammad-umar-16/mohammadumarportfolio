import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { ABOUT, EDUCATION, PROFILE, EXPERIENCE } from '../data/content';

export default function About() {
  const latestEducation = EDUCATION[0];
  const currentRole = EXPERIENCE[0];

  return (
    <section id="about" className="section-pad">
      <SectionHeader index={1} label="ABOUT" title="Who I Am" variant="minimal" />

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
        <Reveal delay={0.06} y={0}>
          <div className="flex flex-col gap-5">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className="text-dim text-sm md:text-base leading-relaxed">{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="border border-line rounded-lg p-6 bg-panel/40 font-mono text-xs">
            <div className="flex gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-amber/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-signal/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-dim/40" />
            </div>
            {/* Drop a headshot at /public/photo.jpg and set PROFILE.photoUrl in content.js to show it here.
                Duotone-cyan filter keeps it on-brand instead of a plain color photo. */}
            {PROFILE.photoUrl && (
              <div className="mb-4 w-16 h-16 rounded-md border border-line overflow-hidden">
                <img
                  src={PROFILE.photoUrl}
                  alt={PROFILE.name}
                  className="w-full h-full object-cover grayscale contrast-125"
                  style={{ filter: 'grayscale(1) contrast(1.15) sepia(1) hue-rotate(140deg) saturate(2.2)' }}
                />
              </div>
            )}
            <div className="space-y-3 text-dim">
              <div className="flex items-baseline gap-2">
                <span className="text-dim/50 w-16 shrink-0">Location</span>
                <span>{PROFILE.location}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-dim/50 w-16 shrink-0">Role</span>
                <span>{currentRole.role} @ {currentRole.org} <span className="text-dim/60">(prev.)</span></span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-dim/50 w-16 shrink-0">Studied</span>
                <span>{latestEducation.degree}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-dim/50 w-16 shrink-0">Focus</span>
                <div className="flex flex-wrap gap-1.5">
                  {ABOUT.focusAreas.map(f => (
                    <span key={f} className="text-ink border border-line rounded px-2 py-0.5 text-[10px]">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}