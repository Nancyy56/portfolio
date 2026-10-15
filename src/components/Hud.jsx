import { useEffect, useState } from 'react';
import { LuTerminal, LuBriefcase, LuBuilding2, LuGraduationCap, LuFolderGit2, LuClock } from 'react-icons/lu';
import { DATA, degreeProgress } from '../data';
import { THEMES } from '../terminal/commands';
import { Bar } from '../terminal/ui';

const SWATCH = { violet: '#a78bfa', ocean: '#38bdf8', sunset: '#fb923c', rose: '#f472b6' };

function Item({ icon: Icon, children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Icon className="size-3.5 text-ink-3" aria-hidden="true" />
      <span className="text-ink-2">{children}</span>
    </span>
  );
}

const Divider = ({ className = '' }) => <span className={`h-4 w-px bg-line-2 ${className}`} aria-hidden="true" />;

export default function Hud({ theme, setTheme }) {
  const [time, setTime] = useState(() => new Date());
  const [progress] = useState(() => degreeProgress() * 100); // computed once, not on every clock tick
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="glass flex items-center gap-5 rounded-xl px-4 py-2.5 text-[12px]">
      {/* brand */}
      <div className="flex items-center gap-2.5">
        <span className="bg-grad grid size-6 place-items-center rounded-md text-page">
          <LuTerminal className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <span className="font-sans text-[14px] font-bold tracking-tight text-ink">
          nancy<span className="text-ink-3">.os</span>
        </span>
      </div>

      <Divider className="max-[900px]:hidden" />

      {/* status line */}
      <div className="flex min-w-0 items-center gap-5 max-[900px]:hidden">
        <Item icon={LuBriefcase}>{DATA.role}</Item>
        <Item icon={LuBuilding2} className="max-[1200px]:hidden">IFOA India</Item>
        <span className="inline-flex items-center gap-2">
          <LuGraduationCap className="size-3.5 text-ink-3" aria-hidden="true" />
          <span className="text-ink-2">B.Tech</span>
          <Bar value={progress} width={10} className="!gap-2" />
        </span>
        <Item icon={LuFolderGit2} className="max-[1200px]:hidden">{DATA.projects.length} projects</Item>
      </div>

      {/* right side */}
      <div className="ml-auto flex items-center gap-4">
        <span className="inline-flex items-center gap-2 text-ok max-[600px]:hidden">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-ok" />
          </span>
          open to work
        </span>
        <Divider className="max-[600px]:hidden" />
        <div className="flex items-center gap-1.5" role="group" aria-label="Theme">
          {THEMES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              title={`${t} theme`}
              aria-label={`${t} theme`}
              aria-pressed={theme === t}
              className={`size-3.5 rounded-full transition hover:scale-110 ${theme === t ? 'ring-2 ring-white/70 ring-offset-2 ring-offset-page' : 'opacity-60 hover:opacity-100'}`}
              style={{ background: SWATCH[t] }}
            />
          ))}
        </div>
        <Divider />
        <span className="inline-flex items-center gap-1.5 tabular-nums text-ink-2">
          <LuClock className="size-3.5 text-ink-3" aria-hidden="true" />
          {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </header>
  );
}
