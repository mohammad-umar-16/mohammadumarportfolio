import Reveal from '../components/Reveal';
import { MapPin, Briefcase, GraduationCap, Compass } from 'lucide-react';
import { ABOUT, EDUCATION, PROFILE, EXPERIENCE } from '../data/content';

export default function About() {
  const latestEducation = EDUCATION[0];
  const currentRole = EXPERIENCE[0];

  return (
    <section id="about" className="section-pad">
      <Reveal>
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3">{'>'} ABOUT</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12">Who I Am</h2>
      </Reveal>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
        <Reveal delay={0.06}>
          <div className="flex flex-col gap-5">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className="text-dim text-sm md:text-base leading-relaxed">{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="border border-line rounded-lg p-6 bg-panel/40 font-mono text-xs">
            <div className="flex gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8A33D]/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#4ECDA4]/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-dim/40" />
            </div>
            <div className="space-y-3.5 text-dim">
              <div className="flex items-start gap-2.5">
                <MapPin size={13} className="text-signal shrink-0 mt-0.5" />
                <span>{PROFILE.location}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Briefcase size={13} className="text-signal shrink-0 mt-0.5" />
               <span>{currentRole.role} @ {currentRole.org} <span className="text-dim/60">(prev.)</span></span>
              </div>
              <div className="flex items-start gap-2.5">
                <GraduationCap size={13} className="text-signal shrink-0 mt-0.5" />
                <span>{latestEducation.degree}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Compass size={13} className="text-signal shrink-0 mt-0.5" />
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