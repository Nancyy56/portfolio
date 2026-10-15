import { createContext, useContext, useEffect, useState } from 'react';
import { LuCheck, LuArrowUpRight, LuCornerDownRight, LuCircleAlert } from 'react-icons/lu';

// Lets any output line run a command when clicked (typed into the prompt first).
export const RunContext = createContext(() => {});

export function Cmd({ c, children }) {
  const run = useContext(RunContext);
  return (
    <span
      role="button"
      tabIndex={0}
      className="cmd-link"
      onClick={(e) => { e.stopPropagation(); run(c); }}
      onKeyDown={(e) => { if (e.key === 'Enter') run(c); }}
    >
      {children ?? c}
    </span>
  );
}

/** Icon + bold title + dim note — the heading of a command's output. */
export function Head({ icon: Icon, title, note }) {
  return (
    <div className="!mb-4 flex flex-wrap items-center gap-x-2.5">
      {Icon && <Icon className="size-4 text-accent" aria-hidden="true" />}
      <span className="font-bold text-ink">{title}</span>
      {note && <span className="text-ink-3">{note}</span>}
    </div>
  );
}

/** Aligned key → value line. */
export function Row({ k, children, w = 'w-[12ch]' }) {
  return (
    <div className="flex gap-3">
      <span className={`${w} shrink-0 text-ink-3`}>{k}</span>
      <span className="min-w-0 text-ink-2">{children}</span>
    </div>
  );
}

/** ├─ / └─ branch line. */
export function Branch({ last, children }) {
  return (
    <div className="flex gap-2">
      <span className="shrink-0 text-ink-3/45">{last ? '└─' : '├─'}</span>
      <span className="min-w-0 text-ink-2">{children}</span>
    </div>
  );
}

/**
 * Installer-style progress bar (like pip / rich):  ━━━━━━━━━━━━╸━━━━━  80%
 * Fills from 0 when it first appears.
 */
export function Bar({ value: raw, width = 24, label = true, className = '' }) {
  const value = Math.round(raw); // whole percents, so re-renders with tiny changes don't restart the animation
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(value); return; }
    let raf;
    const start = performance.now();
    const dur = 700 + value * 6;
    const tick = (t) => {
      const k = Math.min(1, (t - start) / dur);
      setShown(value * (1 - (1 - k) ** 3));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const exact = (shown / 100) * width;
  const full = Math.floor(exact);
  const half = full < width && exact - full >= 0.5;
  const rest = width - full - (half ? 1 : 0);
  const done = shown >= 99.5;

  return (
    <span className={`inline-flex items-center gap-3 whitespace-pre ${className}`} role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
      <span className="text-[15px] leading-none tracking-normal">
        <span className={done ? 'text-ok' : 'text-accent'}>{'━'.repeat(full)}{half ? '╸' : ''}</span>
        <span className="text-[#272b38]">{'━'.repeat(rest)}</span>
      </span>
      {label && <span className="w-[4ch] text-right tabular-nums text-ink-3">{Math.round(shown)}%</span>}
    </span>
  );
}

/** python · fastapi · qdrant */
export const Stack = ({ items }) => <span className="text-ink-3">{items.join(' · ')}</span>;

export const Ext = ({ href, children }) => (
  <a className="inline-flex items-center gap-1 text-accent-2 hover:underline" href={href} target="_blank" rel="noopener">
    {children}<LuArrowUpRight className="size-3.5" aria-hidden="true" />
  </a>
);

export const Ok = ({ children }) => (
  <div className="flex items-center gap-2"><LuCheck className="size-4 shrink-0 text-ok" aria-hidden="true" /><span>{children}</span></div>
);
export const Err = ({ children }) => (
  <div className="flex items-center gap-2 text-err"><LuCircleAlert className="size-4 shrink-0" aria-hidden="true" /><span>{children}</span></div>
);
export const Next = ({ children }) => (
  <div className="!mt-5 flex flex-wrap items-center gap-x-2 text-ink-3">
    <LuCornerDownRight className="size-3.5" aria-hidden="true" />{children}
  </div>
);
export const Sep = () => <span className="text-ink-3">·</span>;
export const Gap = () => <div className="h-3" aria-hidden="true" />;
