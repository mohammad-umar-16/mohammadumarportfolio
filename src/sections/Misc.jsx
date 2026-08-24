import Reveal from '../components/Reveal';

import {
  Award,
  Mail,
  Phone,
  Github,
  Linkedin,
  GraduationCap,
  Trophy,
} from 'lucide-react';

import {
  CERTIFICATIONS,
  EXPERIENCE,
  EDUCATION,
  ACHIEVEMENTS,
  SKILLS,
  PROFILE,
} from '../data/content';

export function Certifications() {
  return (
    <section className="section-pad !pt-0 w-full max-w-full min-w-0">
      <div className="grid md:grid-cols-2 gap-4 w-full max-w-full min-w-0">
        {CERTIFICATIONS.map((c, i) => (
          <Reveal
            key={c.name}
            delay={i * 0.06}
            className="w-full max-w-full min-w-0"
          >
            <div className="border border-line rounded-lg p-5 flex items-start gap-4 bg-panel/30 w-full max-w-full min-w-0">
              <Award
                size={18}
                className="text-signal shrink-0 mt-0.5"
              />

              <div className="min-w-0 max-w-full">
                <h4 className="text-ink text-sm font-medium leading-snug break-words">
                  {c.name}
                </h4>

                <p className="text-dim text-xs mt-1 break-words">
                  {c.issuer}
                </p>

                {c.date && (
                  <p className="font-mono text-dim text-[11px] mt-1">
                    {c.date}
                  </p>
                )}
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
    <section
      id="education"
      className="section-pad !pb-0 w-full max-w-full min-w-0"
    >
      <Reveal>
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3">
          {'>'} EDUCATION
        </p>

        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">
          Background
        </h2>
      </Reveal>

      <div className="flex flex-col gap-6 w-full max-w-full min-w-0">
        {EDUCATION.map((ed, i) => (
          <Reveal
            key={i}
            delay={i * 0.06}
            className="w-full max-w-full min-w-0"
          >
            <div className="border-l-2 border-signal/40 pl-6 min-w-0">
              <div className="flex items-center gap-2 mb-1 min-w-0">
                <GraduationCap
                  size={16}
                  className="text-signal shrink-0"
                />

                <h3 className="font-display text-xl font-semibold text-ink break-words min-w-0">
                  {ed.degree}
                </h3>
              </div>

              <p className="text-dim text-sm break-words">
                {ed.institution}
              </p>

              <p className="text-dim text-xs mt-1 break-words">
                {ed.affiliation}
              </p>

              <p className="font-mono text-signal text-xs mt-2">
                {ed.period}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section className="section-pad !pt-10 w-full max-w-full min-w-0">
      <Reveal className="w-full max-w-full min-w-0">
        <div className="border border-line rounded-lg p-6 bg-panel/30 w-full max-w-full min-w-0">
          <p className="font-mono text-dim text-xs tracking-widest mb-4 flex items-center gap-2">
            <Trophy
              size={14}
              className="text-amber shrink-0"
            />
            ACHIEVEMENTS
          </p>

          <ul className="space-y-2">
            {ACHIEVEMENTS.map((a, i) => (
              <li
                key={i}
                className="text-dim text-sm leading-relaxed flex gap-2 min-w-0"
              >
                <span className="text-signal mt-1.5 shrink-0">
                  ▸
                </span>

                <span className="break-words min-w-0">
                  {a}
                </span>
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
    <section
      id="experience"
      className="section-pad w-full max-w-full min-w-0"
    >
      <Reveal>
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3">
          {'>'} EXPERIENCE
        </p>

        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12">
          Where I've Worked
        </h2>
      </Reveal>

      <div className="flex flex-col gap-8 w-full max-w-full min-w-0">
        {EXPERIENCE.map((exp, i) => (
          <Reveal
            key={exp.org}
            delay={i * 0.08}
            className="w-full max-w-full min-w-0"
          >
            <div className="border-l-2 border-signal/40 pl-6 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2 min-w-0">
                <h3 className="font-display text-xl font-semibold text-ink break-words">
                  {exp.role}
                </h3>

                <span className="text-dim text-sm break-words">
                  — {exp.org}
                </span>
              </div>

              <p className="font-mono text-signal text-xs mb-3">
                {exp.period}
              </p>

              <ul className="space-y-1.5">
                {exp.points.map((pt, j) => (
                  <li
                    key={j}
                    className="text-dim text-sm leading-relaxed flex gap-2 min-w-0"
                  >
                    <span className="text-signal mt-1.5 shrink-0">
                      ▸
                    </span>

                    <span className="break-words min-w-0">
                      {pt}
                    </span>
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
    <section
      id="skills"
      className="section-pad w-full max-w-full min-w-0"
    >
      <Reveal>
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3">
          {'>'} SKILLS
        </p>

        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12">
          Toolkit
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 w-full max-w-full min-w-0">
        {Object.entries(SKILLS).map(([category, items], i) => (
          <Reveal
            key={category}
            delay={i * 0.06}
            className="w-full max-w-full min-w-0"
          >
            <h4 className="font-mono text-dim text-xs tracking-widest mb-3">
              {category.toUpperCase()}
            </h4>

            <div className="flex flex-wrap gap-2 max-w-full">
              {items.map((s) => (
                <span
                  key={s}
                  className="text-sm text-ink border border-line rounded px-3 py-1.5 hover:border-signal/40 transition-colors break-words"
                >
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
    <section
      id="contact"
      className="section-pad !pb-16 text-center w-full max-w-full min-w-0"
    >
      <Reveal className="w-full max-w-full min-w-0">
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3">
          {'>'} GET IN TOUCH
        </p>

        <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6 max-w-2xl mx-auto">
          Open to new opportunities
        </h2>

        <p className="text-dim max-w-md mx-auto mb-10 text-sm md:text-base">
          Looking for SWE, ML/Data Science, or Frontend roles. Reach out —
          I'd like to hear from you.
        </p>

        {/* Contact methods */}
        <div className="flex flex-col items-center justify-center gap-3 max-w-md mx-auto">
  
   <a href={`mailto:${PROFILE.email}`}
    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-signal text-void font-medium px-6 py-3 rounded-md hover:bg-signal/90 transition-colors min-w-0"
  >
    <Mail size={16} className="shrink-0" />
    <span className="sm:whitespace-nowrap break-all sm:break-normal min-w-0">{PROFILE.email}</span>
  </a>

  
   <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}
    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-signal text-void font-medium px-6 py-3 rounded-md hover:bg-signal/90 transition-colors whitespace-nowrap"
  >
    <Phone size={16} className="shrink-0" />
    <span>{PROFILE.phone}</span>
  </a>
</div>

        {/* Social links */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-dim">
          
           <a href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-signal transition-colors flex items-center gap-1.5 text-sm"
          >
            <Github size={16} />
            GitHub
          </a>

          
           <a href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-signal transition-colors flex items-center gap-1.5 text-sm"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>
      </Reveal>

      <p className="font-mono text-dim text-[11px] mt-20">
        Built with React, Three.js &amp; Framer Motion — no template.
      </p>
    </section>
  );
}