import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Github, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Reveal from '../components/Reveal';

const GITHUB_USERNAME = "mohammad-umar-16";
const PER_PAGE = 4;

function extractDescription(markdown) {
  if (!markdown) return null;
  let text = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#+\s.*$/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_~`]/g, '')
    .replace(/^-{3,}$/gm, '')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  const para = text.find(l => l.length > 40 && !l.startsWith('['));
  if (!para) return null;
  return para.length > 300 ? para.slice(0, 297).trim() + '…' : para;
}

const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  HTML: "#e34c26", CSS: "#563d7c", Jupyter: "#DA5B0B", Java: "#b07219",
  "C++": "#f34b7d", C: "#555555", Shell: "#89e051", Dockerfile: "#384d54",
};
function colorForLang(lang) {
  if (LANG_COLORS[lang]) return LANG_COLORS[lang];
  let hash = 0;
  for (let i = 0; i < lang.length; i++) hash = lang.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${Math.abs(hash) % 360}, 55%, 55%)`;
}

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function LanguageBar({ languages }) {
  const entries = Object.entries(languages || {});
  const total = entries.reduce((s, [, v]) => s + v, 0);
  if (!total) return null;
  const withPct = entries
    .map(([name, bytes]) => ({ name, pct: (bytes / total) * 100 }))
    .sort((a, b) => b.pct - a.pct);
  const shown = withPct.slice(0, 4);

  return (
    <div className="mb-4">
      <div className="flex h-1.5 rounded-full overflow-hidden bg-line mb-2">
        {withPct.map(l => (
          <div key={l.name} style={{ width: `${l.pct}%`, background: colorForLang(l.name) }} title={`${l.name} ${l.pct.toFixed(1)}%`} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {shown.map(l => (
          <span key={l.name} className="flex items-center gap-1.5 font-mono text-[10px] text-dim">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: colorForLang(l.name) }} />
            {l.name} <span className="text-dim/60">{l.pct.toFixed(0)}%</span>
          </span>
        ))}
        {withPct.length > 4 && <span className="font-mono text-[10px] text-dim/60">+{withPct.length - 4} more</span>}
      </div>
    </div>
  );
}

export default function GitHubProjects() {
  const [allRepos, setAllRepos] = useState(null);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [detailsCache, setDetailsCache] = useState({});

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
      .then(res => {
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
      })
      .then(data => {
        const filtered = data
          .filter(r => !r.fork && !r.archived)
          .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)));
        setAllRepos(filtered);
      })
      .catch(() => setError(true));
  }, []);

  const totalPages = allRepos ? Math.ceil(allRepos.length / PER_PAGE) : 0;
  const pageRepos = useMemo(() => {
    if (!allRepos) return [];
    return allRepos.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  }, [allRepos, page]);

  useEffect(() => {
    const toFetch = pageRepos.filter(r => !(r.name in detailsCache));
    if (toFetch.length === 0) return;

    Promise.all(
      toFetch.map(async (repo) => {
        const [readmeRes, langRes] = await Promise.allSettled([
          fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`, {
            headers: { Accept: 'application/vnd.github.v3.raw' },
          }),
          fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`),
        ]);

        let desc = repo.description;
        if (readmeRes.status === 'fulfilled' && readmeRes.value.ok) {
          const raw = await readmeRes.value.text();
          desc = extractDescription(raw) || repo.description;
        }

        let languages = {};
        if (langRes.status === 'fulfilled' && langRes.value.ok) {
          languages = await langRes.value.json();
        } else if (repo.language) {
          languages = { [repo.language]: 1 };
        }

        return [repo.name, { desc, languages }];
      })
    ).then(results => {
      setDetailsCache(prev => {
        const next = { ...prev };
        results.forEach(([name, data]) => { next[name] = data; });
        return next;
      });
    });
  }, [pageRepos]);

  const goPrev = () => setPage(p => Math.max(0, p - 1));
  const goNext = () => setPage(p => Math.min(totalPages - 1, p + 1));

  return (
    <section id="github" className="section-pad !pt-0">
      <Reveal>
        <div className="flex items-center justify-between mb-8">
          <p className="font-mono text-dim text-xs tracking-widest flex items-center gap-2"><Github size={14} /> LIVE FROM GITHUB</p>
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="font-mono text-xs text-signal hover:underline flex items-center gap-1">View all <ExternalLink size={12} /></a>
        </div>
      </Reveal>

      {error && (
        <p className="text-dim text-sm font-mono">Couldn't load repositories right now — check back later.</p>
      )}

      {!error && !allRepos && (
        <div className="grid md:grid-cols-2 gap-5">
          {[1, 2].map(i => (
            <div key={i} className="border border-line rounded-lg p-7 h-48 animate-pulse bg-panel/30" />
          ))}
        </div>
      )}

      {allRepos && allRepos.length === 0 && (
        <p className="text-dim text-sm font-mono">No public repositories found.</p>
      )}

      {allRepos && allRepos.length > 0 && (
        <>
        <div className="grid md:grid-cols-2 gap-5 min-h-[300px] min-w-0"></div>  
            {pageRepos.map((repo, i) => {
                const details = detailsCache[repo.name];
                const isLoading = !details;
                return (
                <Reveal key={repo.id} delay={i * 0.06}>
                  {isLoading ? (
                    <div className="border border-line rounded-lg p-7 md:p-8 h-full bg-panel/30 animate-pulse min-h-[240px]" />
                  ) : (
                    <motion.a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="group flex flex-col h-full min-w-0 border border-line rounded-lg p-7 md:p-8 bg-panel/40 hover:border-signal/40 hover:bg-panel/70 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className="font-display text-2xl font-semibold text-ink break-words min-w-0">{repo.name}</h3>
                        <ExternalLink size={17} className="text-dim shrink-0 pt-1" />
                      </div>
                      <p className="flex items-center gap-1.5 font-mono text-dim text-[11px] mb-4">
                        <Clock size={11} /> Updated {timeAgo(repo.pushed_at)}
                      </p>

                    
                      <p className="text-dim text-sm leading-relaxed mb-4 flex-1 break-words">
                        {details.desc || "No description available yet — check the repo directly."}
                      </p>

                      <LanguageBar languages={details.languages} />

                      <div className="flex items-center gap-4 font-mono text-[11px] text-dim mt-auto">
                        {repo.stargazers_count > 0 && <span className="flex items-center gap-1"><Star size={11} /> {repo.stargazers_count}</span>}
                        {repo.forks_count > 0 && <span className="flex items-center gap-1"><GitFork size={11} /> {repo.forks_count}</span>}
                      </div>
                    </motion.a>
                  )}
                </Reveal>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 font-mono text-xs text-dim">
              <button
                onClick={goPrev}
                disabled={page === 0}
                className="flex items-center gap-1 border border-line rounded px-3 py-1.5 hover:border-signal/40 hover:text-ink transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft size={13} /> Prev
              </button>
              <span>Page {page + 1} of {totalPages}</span>
              <button
                onClick={goNext}
                disabled={page === totalPages - 1}
                className="flex items-center gap-1 border border-line rounded px-3 py-1.5 hover:border-signal/40 hover:text-ink transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                Next <ChevronRight size={13} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}