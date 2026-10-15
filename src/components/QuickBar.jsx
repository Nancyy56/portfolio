import {
  LuCircleHelp, LuUser, LuBriefcase, LuFolderGit2, LuChartNoAxesColumn,
  LuTrophy, LuMail, LuFileText,
} from 'react-icons/lu';

const ITEMS = [
  ['help', LuCircleHelp],
  ['whoami', LuUser],
  ['experience', LuBriefcase],
  ['projects', LuFolderGit2],
  ['skills', LuChartNoAxesColumn],
  ['awards', LuTrophy],
  ['contact', LuMail],
];

export default function QuickBar({ run }) {
  const base = 'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[12px] transition hover:-translate-y-px max-[900px]:px-2.5 max-[900px]:text-[11px]';
  return (
    <nav aria-label="Quick commands" className="flex flex-wrap justify-center gap-1.5">
      {ITEMS.map(([c, Icon]) => (
        <button
          key={c}
          type="button"
          onClick={() => run(c)}
          className={`${base} glass !border-line-2 text-ink-2 hover:!border-accent hover:bg-accent/10 hover:text-ink`}
        >
          <Icon className="size-3.5 text-accent" aria-hidden="true" />{c}
        </button>
      ))}
      <button
        type="button"
        onClick={() => run('resume')}
        className={`${base} bg-grad font-semibold text-page shadow-[0_6px_24px_-8px_color-mix(in_srgb,var(--fg)_60%,transparent)]`}
      >
        <LuFileText className="size-3.5" aria-hidden="true" />resume
      </button>
    </nav>
  );
}
