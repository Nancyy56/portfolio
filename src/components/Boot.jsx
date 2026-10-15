import { useEffect, useState } from 'react';

const LINES = [
  'NANCY.OS v26.10 — booting',
  'cpu      neural core x8 @ 4.2GHz ......... ok',
  'memory   65536K .......................... ok',
  '',
  'loading modules',
  '  python3 · pytorch · transformers ...... ok',
  '  qdrant · chromadb · fastapi ........... ok',
  '  rag-engine · citation-engine .......... ok',
  'mount    /experience ..................... 1 active role',
  'mount    /projects ....................... 3 projects found',
  'embed    bge-small-en-v1.5 ............... ready',
  '',
  'all systems ready.',
];

export default function Boot({ onStart }) {
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let fast = false;
    try { fast = !!sessionStorage.getItem('booted'); } catch { /* ignore */ }
    if (shown < LINES.length) {
      const t = setTimeout(() => setShown((s) => s + 1), fast ? 25 : 90 + Math.random() * 80);
      return () => clearTimeout(t);
    }
  }, [shown]);

  useEffect(() => {
    const go = (e) => {
      if (e?.metaKey || e?.ctrlKey || e?.altKey) return;
      try { sessionStorage.setItem('booted', '1'); } catch { /* ignore */ }
      setLeaving(true);
      setTimeout(onStart, 450);
    };
    window.addEventListener('keydown', go);
    window.addEventListener('pointerdown', go);
    return () => { window.removeEventListener('keydown', go); window.removeEventListener('pointerdown', go); };
  }, [onStart]);

  const done = shown >= LINES.length;

  return (
    <div className={`fixed inset-0 z-50 flex cursor-pointer flex-col bg-page p-[6vmin] transition-opacity duration-500 ${leaving ? 'opacity-0' : ''}`}>
      <pre className="flex-1 overflow-hidden font-mono text-[13.5px] whitespace-pre-wrap text-ink-3">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={i} className="min-h-[1.5em]">
            {l.replace(/(ok|ready|1 active role|3 projects found)$/, '')}
            <span className="text-accent">{l.match(/(ok|ready|1 active role|3 projects found)$/)?.[0]}</span>
          </div>
        ))}
      </pre>
      <div className={`pb-[12vh] text-center transition-opacity duration-500 ${done ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-grad animate-breathe font-sans text-[clamp(16px,2.2vw,24px)] font-bold tracking-[.3em]">PRESS ANY KEY TO CONTINUE</div>
        <div className="mt-3 text-[13px] text-ink-3">(or tap the screen)</div>
      </div>
      <button type="button" className="absolute top-5 right-5 rounded-full border border-line-2 px-3 py-1 text-xs text-ink-3 hover:border-accent hover:text-ink">skip</button>
    </div>
  );
}
