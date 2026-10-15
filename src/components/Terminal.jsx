import { useCallback, useEffect, useRef, useState } from 'react';
import { LuTerminal, LuFolder, LuGitBranch, LuChevronRight } from 'react-icons/lu';
import { commands, ALIASES, VISIBLE } from '../terminal/commands';
import { RunContext, Cmd } from '../terminal/ui';
import { store } from '../data';

let nextId = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** starship-style prompt:  ~/nancy  main ❯ */
function Prompt({ ok = true }) {
  return (
    <span className="mr-2 inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
      <LuFolder className="size-3.5 text-accent-2" aria-hidden="true" />
      <span className="font-semibold text-accent-2">~/nancy</span>
      <LuGitBranch className="ml-1 size-3.5 text-accent" aria-hidden="true" />
      <span className="text-accent">main</span>
      <LuChevronRight className={`size-4 stroke-[3] ${ok ? 'text-ok' : 'text-err'}`} aria-hidden="true" />
    </span>
  );
}

export default function Terminal({ theme, setTheme, runRef, onMatrix, deepRun }) {
  const [entries, setEntries] = useState(() => [{ id: nextId++, cmd: null, node: commands.welcome() }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);       // game running
  const [typing, setTyping] = useState(null);    // auto-typed command text
  const [focused, setFocused] = useState(false);
  const history = useRef([]);
  const hIdx = useRef(0);
  const lock = useRef(false);
  const themeRef = useRef(theme);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  themeRef.current = theme;

  const focus = () => {
    if (window.matchMedia('(hover: hover)').matches) inputRef.current?.focus({ preventScroll: true });
  };

  const push = (entry) => setEntries((e) => [...e, { id: nextId++, ...entry }]);

  const endGame = useCallback((score) => {
    const best = Math.max(score, Number(store.get('snake-hi') || 0));
    store.set('snake-hi', String(best));
    lock.current = false;
    setBusy(false);
    push({
      cmd: null,
      node: <div><span className="font-bold text-warn">game over</span> <span className="text-ink-3">· score</span> {score} <span className="text-ink-3">· best</span> {best} <span className="text-ink-3">·</span> <Cmd c="snake">play again</Cmd></div>,
    });
    setTimeout(focus, 0);
  }, []);

  const exec = useCallback((raw) => {
    const line = raw.trim();
    if (!line) { push({ cmd: '', node: null }); return; }
    history.current.push(line);
    hIdx.current = history.current.length;

    const [first, ...args] = line.split(/\s+/);
    const name = ALIASES[first.toLowerCase()] || first.toLowerCase();
    const fn = commands[name];
    let cleared = false;
    const ctx = { theme: themeRef.current, setTheme, clear: () => { cleared = true; }, endGame, matrix: onMatrix };

    let node, ok = true;
    if (fn) {
      node = fn(args, ctx);
      if (name === 'snake') { lock.current = true; setBusy(true); inputRef.current?.blur(); }
    } else {
      ok = false;
      const guess = VISIBLE.find((c) => c.startsWith(name.slice(0, 2)));
      node = (
        <div>
          <span className="text-err">zsh: command not found: {first}</span>
          {guess && <span className="text-ink-3"> — did you mean <Cmd c={guess} />?</span>}
        </div>
      );
    }
    if (cleared) setEntries([]);
    else push({ cmd: line, node, ok });
  }, [setTheme, endGame, onMatrix]);

  /** Clicked commands get typed into the prompt first, like a real session. */
  const runTyped = useCallback(async (cmd) => {
    if (lock.current) return;
    lock.current = true;
    setInput('');
    for (let i = 1; i <= cmd.length; i++) {
      setTyping(cmd.slice(0, i));
      await sleep(18 + Math.random() * 22);
    }
    await sleep(120);
    setTyping(null);
    lock.current = false;
    exec(cmd);
    setTimeout(focus, 0);
  }, [exec]);

  runRef.current = runTyped;

  useEffect(() => {
    if (deepRun) deepRun.split(',').forEach((c) => exec(c));
    focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // stay at the top on first paint; follow new output afterwards
  const firstPaint = useRef(true);
  useEffect(() => {
    if (firstPaint.current && !deepRun) { firstPaint.current = false; return; }
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries, typing, deepRun]);

  function onKeyDown(e) {
    if (lock.current) { e.preventDefault(); return; }
    if (e.key === 'Enter') {
      e.preventDefault();
      const v = input; setInput(''); exec(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (hIdx.current > 0) setInput(history.current[--hIdx.current]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      hIdx.current = Math.min(history.current.length, hIdx.current + 1);
      setInput(history.current[hIdx.current] || '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const v = input.toLowerCase();
      if (!v) return;
      const m = VISIBLE.filter((c) => c.startsWith(v));
      if (m.length === 1) setInput(m[0] + ' ');
      else if (m.length > 1) push({ cmd: null, node: <div className="text-ink-3">{m.join('   ')}</div> });
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault(); setEntries([]);
    } else if (e.key === 'ArrowLeft' || e.key === 'Home') {
      e.preventDefault(); // block cursor stays at the end
    }
  }

  const shown = typing ?? input;

  return (
    <RunContext.Provider value={runTyped}>
      <section
        aria-label="Terminal"
        className="glass flex min-h-0 flex-col overflow-hidden rounded-2xl !border-line-2 !bg-term/90 shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)]"
      >
        {/* title bar */}
        <div className="flex items-center gap-2.5 border-b border-line bg-white/[.02] px-5 py-2.5 text-[12px]">
          <LuTerminal className="size-4 text-accent" aria-hidden="true" />
          <span className="text-ink-2">nancy — zsh</span>
          <span className="text-ink-3">· 120×40</span>
          <span className="ml-auto flex items-center gap-1.5 text-ink-3">
            <span className="size-1.5 rounded-full bg-ok" />connected
          </span>
        </div>

        {/* scrollback */}
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 cursor-text overflow-y-auto px-5 py-6 text-[14px] leading-[1.8] text-ink-2 sm:px-12 sm:py-10"
          onMouseUp={(e) => {
            if (window.getSelection().toString() || e.target.closest('a, button, [role=button], canvas')) return;
            focus();
          }}
        >
          <div className="max-w-[980px]" role="log" aria-live="polite">
            {entries.map((en) => (
              <div key={en.id} className="border-b border-line/70 py-8 first:pt-0">
                {en.cmd !== null && (
                  <div className="flex flex-wrap items-center text-ink"><Prompt ok={en.ok !== false} /><span>{en.cmd}</span></div>
                )}
                {en.node && <div className={`out ${en.cmd !== null ? 'mt-5' : ''}`}>{en.node}</div>}
              </div>
            ))}

            {!busy && (
              <label className="relative flex items-center pt-8 text-ink">
                <Prompt />
                <span className="whitespace-pre-wrap break-all">{shown}</span>
                <span className={`cursor-block ${focused || typing !== null ? 'animate-blink' : 'opacity-40'}`} aria-hidden="true" />
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onSelect={(e) => { const n = e.target.value.length; e.target.setSelectionRange(n, n); }}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="Terminal command input"
                  className="absolute inset-0 w-full cursor-text bg-transparent text-base text-transparent caret-transparent opacity-0 outline-none"
                />
              </label>
            )}
          </div>
        </div>
      </section>
    </RunContext.Provider>
  );
}
