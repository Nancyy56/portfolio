import { useEffect, useRef, useState } from 'react';
import { LuChevronUp, LuChevronDown, LuChevronLeft, LuChevronRight, LuX } from 'react-icons/lu';
import { store } from '../data';

const N = 18;
const S = 20;
const KEYS = {
  arrowup: [0, -1], w: [0, -1], arrowdown: [0, 1], s: [0, 1],
  arrowleft: [-1, 0], a: [-1, 0], arrowright: [1, 0], d: [1, 0],
};

export default function Snake({ onEnd }) {
  const canvasRef = useRef(null);
  const setDirRef = useRef(() => {});
  const endRef = useRef(() => {});
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const [best] = useState(() => Number(store.get('snake-hi') || 0));

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext('2d');
    const css = getComputedStyle(document.documentElement);
    const FG = css.getPropertyValue('--fg').trim();
    const FG2 = css.getPropertyValue('--fg-2').trim();
    const BG = css.getPropertyValue('--term').trim();
    const TEXT = css.getPropertyValue('--text').trim();
    const DOT = css.getPropertyValue('--line-2').trim();

    let sn = [{ x: 6, y: 9 }, { x: 5, y: 9 }, { x: 4, y: 9 }];
    let dir = { x: 1, y: 0 };
    let next = dir;
    let pts = 0, paused = false, waiting = true, frame = 0, timer, done = false;
    const spawn = () => {
      let p;
      do { p = { x: Math.floor(Math.random() * N), y: Math.floor(Math.random() * N) }; }
      while (sn.some((s) => s.x === p.x && s.y === p.y));
      return p;
    };
    let food = spawn();

    setDirRef.current = (x, y) => {
      waiting = false;
      if (x === -dir.x && y === -dir.y) return;
      next = { x, y };
    };

    function draw() {
      ctx.fillStyle = BG; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = DOT;
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) ctx.fillRect(i * S + S / 2 - 1, j * S + S / 2 - 1, 2, 2);
      ctx.fillStyle = FG2;
      ctx.beginPath(); ctx.arc(food.x * S + S / 2, food.y * S + S / 2, S / 2 - 4 + (frame % 6 < 3 ? 1 : 0), 0, Math.PI * 2); ctx.fill();
      sn.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? TEXT : FG;
        ctx.beginPath(); ctx.roundRect(s.x * S + 1, s.y * S + 1, S - 2, S - 2, 4); ctx.fill();
      });
      if (paused || waiting) {
        ctx.fillStyle = TEXT; ctx.font = '600 14px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText(waiting ? 'Press an arrow key to start' : 'Paused', cv.width / 2, cv.height / 2 - 40);
      }
    }

    function end() {
      if (done) return;
      done = true;
      clearTimeout(timer);
      setOver(true);
      onEnd(pts);
    }
    endRef.current = end;

    function step() {
      frame++;
      if (!paused && !waiting) {
        dir = next;
        const h = { x: sn[0].x + dir.x, y: sn[0].y + dir.y };
        if (h.x < 0 || h.y < 0 || h.x >= N || h.y >= N || sn.some((s) => s.x === h.x && s.y === h.y)) return end();
        sn.unshift(h);
        if (h.x === food.x && h.y === food.y) { pts++; setScore(pts); food = spawn(); }
        else sn.pop();
      }
      draw();
      timer = setTimeout(step, Math.max(55, 120 - pts * 4));
    }

    function onKey(e) {
      if (done) return;
      const k = e.key.toLowerCase();
      if (KEYS[k]) { e.preventDefault(); setDirRef.current(...KEYS[k]); }
      else if (k === 'p' || k === ' ') { e.preventDefault(); paused = !paused; draw(); }
      else if (k === 'q' || k === 'escape') { e.preventDefault(); end(); }
    }

    let t0;
    const onTs = (e) => { t0 = e.touches[0]; };
    const onTe = (e) => {
      if (!t0) return;
      const t = e.changedTouches[0], dx = t.clientX - t0.clientX, dy = t.clientY - t0.clientY;
      t0 = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
      if (Math.abs(dx) > Math.abs(dy)) setDirRef.current(Math.sign(dx), 0);
      else setDirRef.current(0, Math.sign(dy));
    };

    document.addEventListener('keydown', onKey, true);
    cv.addEventListener('touchstart', onTs, { passive: true });
    cv.addEventListener('touchend', onTe, { passive: true });
    draw();
    timer = setTimeout(step, 120);
    return () => {
      done = true;
      clearTimeout(timer);
      document.removeEventListener('keydown', onKey, true);
      cv.removeEventListener('touchstart', onTs);
      cv.removeEventListener('touchend', onTe);
    };
  }, [onEnd]);

  const pad = (label, d) => (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => { e.preventDefault(); d === 'q' ? endRef.current() : setDirRef.current(...d); }}
      className="grid h-10 place-items-center rounded-lg border border-line-2 text-ink-2 active:bg-accent active:text-page"
    >
      {(() => { const I = { up: LuChevronUp, down: LuChevronDown, left: LuChevronLeft, right: LuChevronRight, quit: LuX }[label]; return <I className="size-5" />; })()}
    </button>
  );

  return (
    <div className={`inline-flex max-w-full flex-col items-center gap-3 py-2 transition-opacity ${over ? 'opacity-50' : ''}`}>
      <div className="text-xs text-ink-2">
        score <b className="text-accent">{score}</b> · best <b className="text-accent">{best}</b>
        <span className="text-ink-3"> · arrows/WASD · P pause · Q quit</span>
      </div>
      <canvas ref={canvasRef} width={N * S} height={N * S} className="pixelated aspect-square w-[min(340px,72vw)] rounded-lg border border-line-2" />
      <div className="grid grid-cols-[repeat(3,44px)] gap-1 [@media(hover:hover)]:hidden">
        <span />{pad('up', [0, -1])}<span />
        {pad('left', [-1, 0])}{pad('quit', 'q')}{pad('right', [1, 0])}
        <span />{pad('down', [0, 1])}<span />
      </div>
    </div>
  );
}
