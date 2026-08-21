import Reveal from '../components/Reveal';
import { Award, Mail, Github, Linkedin, GraduationCap, Trophy } from 'lucide-react';
import { CERTIFICATIONS, EXPERIENCE, EDUCATION, ACHIEVEMENTS, SKILLS, PROFILE } from '../data/content';

export function Certifications() {
  return (
    <section className="section-pad !pt-0">
      <div className="grid md:grid-cols-2 gap-4">
        {CERTIFICATIONS.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.06}>
            <div className="border border-line rounded-lg p-5 flex items-start gap-4 bg-panel/30">
              <Award size={18} className="text-signal shrink-0 mt-0.5" />
              <div>
                <h4 className="text-ink text-sm font-medium leading-snug">{c.name}</h4>
                <p className="text-dim text-xs mt-1">{c.issuer}</p>
                {c.date && <p className="font-mono text-dim text-[11px] mt-1">{c.date}</p>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="section-pad !pb-0">
      <Reveal>
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3">{'>'} EDUCATION</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">Background</h2>
      </Reveal>
      <div className="flex flex-col gap-6">
        {EDUCATION.map((ed, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="border-l-2 border-signal/40 pl-6">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap size={16} className="text-signal" />
                <h3 className="font-display text-xl font-semibold text-ink">{ed.degree}</h3>
              </div>
              <p className="text-dim text-sm">{ed.institution}</p>
              <p className="text-dim text-xs mt-1">{ed.affiliation}</p>
              <p className="font-mono text-signal text-xs mt-2">{ed.period}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section className="section-pad !pt-10">
      <Reveal>
        <div className="border border-line rounded-lg p-6 bg-panel/30">
          <p className="font-mono text-dim text-xs tracking-widest mb-4 flex items-center gap-2">
            <Trophy size={14} className="text-amber" /> ACHIEVEMENTS
          </p>
          <ul className="space-y-2">
            {ACHIEVEMENTS.map((a, i) => (
              <li key={i} className="text-dim text-sm leading-relaxed flex gap-2">
                <span className="text-signal mt-1.5 shrink-0">▸</span>{a}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section-pad">
      <Reveal>
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3">{'>'} EXPERIENCE</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12">Where I've Worked</h2>
      </Reveal>
      <div className="flex flex-col gap-8">
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={exp.org} delay={i * 0.08}>
            <div className="border-l-2 border-signal/40 pl-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <h3 className="font-display text-xl font-semibold text-ink">{exp.role}</h3>
                <span className="text-dim text-sm">— {exp.org}</span>
              </div>
              <p className="font-mono text-signal text-xs mb-3">{exp.period}</p>
              <ul className="space-y-1.5">
                {exp.points.map((pt, j) => (
                  <li key={j} className="text-dim text-sm leading-relaxed flex gap-2">
                    <span className="text-signal mt-1.5 shrink-0">▸</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-pad">
      <Reveal>
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3">{'>'} SKILLS</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12">Toolkit</h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {Object.entries(SKILLS).map(([category, items], i) => (
          <Reveal key={category} delay={i * 0.06}>
            <h4 className="font-mono text-dim text-xs tracking-widest mb-3">{category.toUpperCase()}</h4>
            <div className="flex flex-wrap gap-2">
              {items.map(s => (
                <span key={s} className="text-sm text-ink border border-line rounded px-3 py-1.5 hover:border-signal/40 transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section-pad !pb-16 text-center">
      <Reveal>
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3">{'>'} GET IN TOUCH</p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6 max-w-2xl mx-auto">
          Open to new opportunities
        </h2>
        <p className="text-dim max-w-md mx-auto mb-10 text-sm md:text-base">
          Looking for SWE, ML/Data Science, or Frontend roles. Reach out — I'd like to hear from you.
        </p>
        
        <a   href={`mailto:${PROFILE.email}`}
          className="inline-flex items-center gap-2 bg-signal text-void font-medium px-6 py-3 rounded-md hover:bg-signal/90 transition-colors"
        >
          <Mail size={16} /> {PROFILE.email}
        </a>
        <div className="flex justify-center gap-6 mt-10 text-dim">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-signal transition-colors flex items-center gap-1.5 text-sm"><Github size={16} /> GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-signal transition-colors flex items-center gap-1.5 text-sm"><Linkedin size={16} /> LinkedIn</a>
        </div>
      </Reveal>
      <p className="font-mono text-dim text-[11px] mt-20">
        end
      </p>
    </section>
  );
}