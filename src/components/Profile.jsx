import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { LuMail, LuBuilding2, LuBriefcase, LuMapPin, LuGraduationCap, LuFileText } from 'react-icons/lu';
import Avatar from './Avatar';
import { DATA } from '../data';
import { Bar } from '../terminal/ui';

const DETAILS = [
  [LuBuilding2, 'IFOA India'],
  [LuBriefcase, 'AI Integration Dev Intern'],
  [LuMapPin, 'Delhi, India'],
  [LuGraduationCap, 'B.Tech CSE · 2027'],
];

const LINKS = [
  ['GitHub', DATA.github, FaGithub],
  ['LinkedIn', DATA.linkedin, FaLinkedin],
  ['Email', `mailto:${DATA.email}`, LuMail],
];

function Label({ children }) {
  return <div className="mb-3 text-[10.5px] font-medium tracking-[.16em] text-ink-3 uppercase">{children}</div>;
}

export default function Profile({ theme }) {
  return (
    <aside
      aria-label="Profile"
      className="glass relative hidden min-h-0 flex-col overflow-y-auto rounded-2xl p-6 min-[900px]:flex before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-28 before:rounded-t-2xl before:bg-[radial-gradient(ellipse_at_30%_0%,color-mix(in_srgb,var(--fg)_14%,transparent),transparent_70%)]"
    >
      {/* identity */}
      <div className="relative flex items-center gap-4">
        <Avatar theme={theme} className="size-[88px] shrink-0 rounded-2xl p-1.5" />
        <div className="min-w-0">
          <div className="font-sans text-[22px] leading-tight font-extrabold tracking-tight text-ink">Nancy</div>
          <div className="text-grad text-[12.5px] font-medium">{DATA.role}</div>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-ok/25 bg-ok/10 px-2 py-0.5 text-[10.5px] text-ok">
            <span className="size-1.5 animate-pulse rounded-full bg-ok" />Open to work
          </div>
        </div>
      </div>

      {/* details */}
      <ul className="mt-7 space-y-2.5 text-[12.5px] text-ink-2">
        {DETAILS.map(([Icon, text]) => (
          <li key={text} className="flex items-center gap-3">
            <Icon className="size-4 shrink-0 text-ink-3" aria-hidden="true" />{text}
          </li>
        ))}
      </ul>

      <div className="my-7 h-px bg-line" />

      {/* skills */}
      <Label>Core skills</Label>
      <div className="space-y-3.5">
        {DATA.core.map(([n, v]) => (
          <div key={n}>
            <div className="mb-1 flex justify-between text-[12px]">
              <span className="text-ink-2">{n}</span>
              <span className="tabular-nums text-ink-3">{v}%</span>
            </div>
            <Bar value={v} width={26} label={false} className="!gap-0" />
          </div>
        ))}
      </div>

      {/* links */}
      <div className="mt-auto pt-8">
        <div className="flex gap-2">
          {LINKS.map(([l, href, Icon]) => (
            <a
              key={l}
              href={href}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
              aria-label={l}
              title={l}
              className="grid size-10 place-items-center rounded-xl border border-line-2 bg-white/[.03] text-ink-2 transition hover:-translate-y-0.5 hover:border-accent hover:text-ink"
            >
              <Icon className="size-[17px]" aria-hidden="true" />
            </a>
          ))}
          <a
            href={DATA.resume}
            target="_blank"
            rel="noopener"
            className="ml-auto inline-flex h-10 items-center gap-2 rounded-xl border border-line-2 bg-white/[.03] px-3.5 text-[12px] text-ink-2 transition hover:border-accent hover:text-ink"
          >
            <LuFileText className="size-4 text-accent" aria-hidden="true" />Resume
          </a>
        </div>
      </div>
    </aside>
  );
}
