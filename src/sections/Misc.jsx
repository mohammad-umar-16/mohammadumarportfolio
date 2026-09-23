import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import {
  CERTIFICATIONS,
  EXPERIENCE,
  EDUCATION,
  ACHIEVEMENTS,
  SKILLS,
  PROFILE,
} from '../data/content';
import { useState } from 'react';
import {
  Award,
  Mail,
  Phone,
  Github,
  Linkedin,
  GraduationCap,
  Trophy,
  FileText,
  Check,
} from 'lucide-react';
import CertificateModal from '../components/CertificateModal';
import ContactForm from '../components/ContactForm';

export function Certifications() {
  const [active, setActive] = useState(null);

  return (
    <section id="certifications" className="section-pad !pt-0 w-full max-w-full min-w-0">
      <Reveal>
        <p className="text-dim text-sm mb-6">Certifications & credentials, most recent first.</p>
      </Reveal>

      {/* compact list, deliberately different from the bordered-box cards above/below it */}
      <div className="flex flex-col divide-y divide-line border-y border-line w-full max-w-full min-w-0">
        {CERTIFICATIONS.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.04} className="w-full max-w-full min-w-0">
            <button
              onClick={() => setActive(c)}
              className="w-full text-left py-4 flex items-center gap-4 hover:bg-panel/30 transition-colors max-w-full min-w-0"
            >
              <Award size={16} className="text-signal shrink-0" />
              <div className="min-w-0 max-w-full flex-1">
                <h4 className="text-ink text-sm font-medium leading-snug break-words">{c.name}</h4>
                <p className="text-dim text-xs mt-0.5 break-words">
                  {c.issuer}
                  {c.date && <span className="font-mono text-dim/70"> — {c.date}</span>}
                </p>
              </div>
              <FileText size={14} className="text-dim shrink-0" />
            </button>
          </Reveal>
        ))}
      </div>
      <CertificateModal cert={active} onClose={() => setActive(null)} />
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="section-pad !pb-0 w-full max-w-full min-w-0">
      <SectionHeader label="EDUCATION" title="Background" variant="label" className="mb-8" />
      <div className="flex flex-col gap-6 w-full max-w-full min-w-0">
        {EDUCATION.map((ed, i) => (
          <Reveal key={i} delay={i * 0.06} className="w-full max-w-full min-w-0">
            <div className="border-l-2 border-signal/40 pl-6 min-w-0">
              <div className="flex items-center gap-2 mb-1 min-w-0">
                <GraduationCap size={16} className="text-signal shrink-0" />
                <h3 className="font-display text-xl font-semibold text-ink break-words min-w-0">{ed.degree}</h3>
              </div>
              <p className="text-dim text-sm break-words">{ed.institution}</p>
              <p className="text-dim text-xs mt-1 break-words">{ed.affiliation}</p>
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
    <section className="section-pad !pt-10 w-full max-w-full min-w-0">
      <Reveal className="w-full max-w-full min-w-0">
        <div className="border border-line rounded-sm p-6 bg-panel/30 w-full max-w-full min-w-0">
          <p className="font-mono text-dim text-xs tracking-widest mb-4">ACHIEVEMENTS</p>
          <ul className="space-y-2">
            {ACHIEVEMENTS.map((a, i) => (
              <li key={i} className="text-dim text-sm leading-relaxed flex gap-2 min-w-0">
                <span className="text-signal mt-1.5 shrink-0">▸</span>
                <span className="break-words min-w-0">{a}</span>
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
    <section id="experience" className="section-pad w-full max-w-full min-w-0">
      <SectionHeader index={7} label="EXPERIENCE" title="Where I've Worked" />
      <div className="flex flex-col gap-10 w-full max-w-full min-w-0">
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={exp.org} delay={i * 0.08} x={-16} className="w-full max-w-full min-w-0">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-4 md:gap-10 border-t border-line pt-6">
              <div className="min-w-0">
                <h3 className="font-display text-xl font-semibold text-ink break-words">{exp.role}</h3>
                <p className="text-dim text-sm mt-1 break-words">{exp.org}</p>
                <p className="font-mono text-signal text-xs mt-2">{exp.period}</p>
              </div>
              <ul className="space-y-1.5 min-w-0">
                {exp.points.map((pt, j) => (
                  <li key={j} className="text-dim text-sm leading-relaxed flex gap-2 min-w-0">
                    <span className="text-signal mt-1.5 shrink-0">▸</span>
                    <span className="break-words min-w-0">{pt}</span>
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
    <section id="skills" className="section-pad w-full max-w-full min-w-0">
      <SectionHeader index={8} label="SKILLS" title="Toolkit" variant="minimal" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 w-full max-w-full min-w-0">
        {Object.entries(SKILLS).map(([category, items], i) => (
          <Reveal key={category} delay={i * 0.06} className="w-full max-w-full min-w-0">
            <h4 className="font-mono text-dim text-xs tracking-widest mb-3">{category.toUpperCase()}</h4>
            <div className="flex flex-wrap gap-2 max-w-full">
              {items.map((s) => (
                <span key={s} className="text-sm text-ink border border-line rounded px-3 py-1.5 hover:border-signal/40 transition-colors break-words">
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
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — mailto link still works as a fallback
    }
  };

  return (
    <section id="contact" className="section-pad !pb-16 text-center w-full max-w-full min-w-0">
      <Reveal className="w-full max-w-full min-w-0">
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3">
          <span className="text-dim/50">09</span> {'>'} GET IN TOUCH
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6 max-w-2xl mx-auto">
          Open to new opportunities
        </h2>
        <p className="text-dim max-w-md mx-auto mb-10 text-sm md:text-base">
          Looking for SWE, ML/Data Science, or Frontend roles. Reach out — I'd like to hear from you.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 max-w-md mx-auto">
          <div className="relative w-full sm:w-auto">
            
            <a  href={`mailto:${PROFILE.email}`}
              onClick={copyEmail}
              aria-label={`Email ${PROFILE.email} (also copies to clipboard)`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-signal text-void font-medium px-4 sm:px-6 py-3 rounded-md hover:bg-signal/90 transition-colors min-w-0"
            >
              <Mail size={16} className="shrink-0" />
              <span className="whitespace-nowrap text-xs sm:text-base min-w-0">{PROFILE.email}</span>
            </a>
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[11px] text-signal bg-void border border-line rounded px-2 py-1 flex items-center gap-1 whitespace-nowrap">
                <Check size={11} /> copied to clipboard
              </span>
            )}
          </div>

          
          <a  href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}
            aria-label={`Call ${PROFILE.phone}`}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-signal text-void font-medium px-4 sm:px-6 py-3 rounded-md hover:bg-signal/90 transition-colors whitespace-nowrap"
          >
            <Phone size={16} className="shrink-0" />
            <span className="text-xs sm:text-base">{PROFILE.phone}</span>
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-10 text-dim">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile" className="hover:text-signal transition-colors flex items-center gap-1.5 text-sm">
            <Github size={16} /> GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile" className="hover:text-signal transition-colors flex items-center gap-1.5 text-sm">
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>

        <div className="max-w-md mx-auto mt-14 text-left">
          <p className="font-mono text-dim text-xs tracking-widest mb-4 text-center">OR SEND A MESSAGE DIRECTLY</p>
          <ContactForm />
        </div>
      </Reveal>

      <p className="font-mono text-dim text-[11px] mt-20">The End.</p>
    </section>
  );
}