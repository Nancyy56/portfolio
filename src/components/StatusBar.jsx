import { useEffect, useState } from 'react';

// tmux-style status line: clickable commands on the left, theme + clock on the right.
const ITEMS = ['help', 'whoami', 'experience', 'projects', 'skills', 'awards', 'contact', 'resume'];

export default function StatusBar({ run, theme }) {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav aria-label="Quick commands" className="flex items-stretch bg-panel text-[12.5px] leading-7">
      <span className="bg-accent px-3 font-semibold text-term max-[700px]:hidden">[nancy]</span>
      <div className="flex min-w-0 flex-1 overflow-x-auto">
        {ITEMS.map((c, i) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="shrink-0 px-2.5 text-ink-2 hover:bg-line-2 hover:text-ink"
          >
            <span className="text-ink-3">{i}:</span>{c}
          </button>
        ))}
      </div>
      <button type="button" onClick={() => run('theme')} className="shrink-0 px-3 text-ink-3 hover:text-ink max-[700px]:hidden" title="switch theme">
        {theme}
      </button>
      <span className="shrink-0 bg-line-2 px-3 tabular-nums text-ink-2 max-[520px]:hidden">
        {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
      </span>
    </nav>
  );
}
