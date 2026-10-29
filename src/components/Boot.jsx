import { useEffect, useState } from 'react';

const LINES = [
  '[  OK  ] Mounted /home/nancy',
  '[  OK  ] Started python3, pytorch, transformers',
  '[  OK  ] Started qdrant, chromadb, fastapi',
  '[  OK  ] Loaded /experience (1 active role)',
  '[  OK  ] Loaded /projects (3 projects)',
  '[  OK  ] Reached target portfolio',
  '',
  'portfolio login: guest',
];

export default function Boot({ onStart }) {
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let fast = false;
    try { fast = !!sessionStorage.getItem('booted'); } catch { /* ignore */ }
    if (shown < LINES.length) {
      const t = setTimeout(() => setShown((s) => s + 1), fast ? 20 : 70 + Math.random() * 60);
      return () => clearTimeout(t);
    }
    const t = setTimeout(go, fast ? 100 : 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  function go() {
    try { sessionStorage.setItem('booted', '1'); } catch { /* ignore */ }
    setLeaving(true);
    setTimeout(onStart, 250);
  }

  // any key or click skips ahead
  useEffect(() => {
    const skip = (e) => { if (!e?.metaKey && !e?.ctrlKey && !e?.altKey) go(); };
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => { window.removeEventListener('keydown', skip); window.removeEventListener('pointerdown', skip); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`fixed inset-0 z-50 bg-page p-[6vmin] transition-opacity duration-300 ${leaving ? 'opacity-0' : ''}`}>
      <pre className="font-mono text-[13.5px] whitespace-pre-wrap text-ink-2">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={i} className="min-h-[1.5em]">
            {l.startsWith('[  OK  ]')
              ? <>[  <span className="text-ok">OK</span>  ]{l.slice(8)}</>
              : l}
          </div>
        ))}
      </pre>
    </div>
  );
}
