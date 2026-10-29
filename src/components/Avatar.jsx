import { useEffect, useRef } from 'react';

// 24×24 pixel avatar, drawn as left halves mirrored for symmetry.
// H/h hair · S/s skin · E eye · M mouth · T shirt · J/j blazer (theme colours) · C hair clip
const LEFT = [
  '............',
  '.......HHHHH',
  '.....HHHHHHH',
  '....HHHHhhhH',
  '...HHHHhHHHH',
  '...HHHHHHHHH',
  '..HHHHHHHHHH',
  '..HHHHSHHHHS',
  '..HHHSSSHHSS',
  '..HHSSSSSSSS',
  '..HHSSSSSSSS',
  '..HHSSSESSSS',
  '..HHSSSESSSS',
  '..HHSSSSSSSS',
  '..HHHSSSSSSM',
  '..HHHSSSSSSS',
  '..HHHH.sSSSS',
  '..HHHH....sS',
  '..HHHjJJJTTT',
  '..HHjJJJJJTT',
  '..HJJJJJJJJT',
  '.jJJJJJJJJJT',
  '.jJJJJJJJJJT',
  '.jJJJJJJJJJT',
];
const SPRITE = LEFT.map((l) => l + [...l].reverse().join(''));
[[5, 17], [5, 18], [6, 16], [6, 17], [6, 18], [6, 19], [7, 18]].forEach(([y, x]) => {
  SPRITE[y] = SPRITE[y].slice(0, x) + 'C' + SPRITE[y].slice(x + 1);
});

function draw(cv, blink) {
  const ctx = cv.getContext('2d');
  const css = getComputedStyle(document.documentElement);
  const v = (n) => css.getPropertyValue(n).trim();
  const pal = {
    H: '#3b2433', h: '#6b4258',
    S: '#ffe0cc', s: '#f3bfa6',
    E: '#2a1a2e', M: '#c98b84', T: '#f5f3ff',
    J: v('--fg'), j: v('--fg-dim'), C: v('--fg-2'),
  };
  ctx.clearRect(0, 0, cv.width, cv.height);
  SPRITE.forEach((row, y) => [...row].forEach((c, x) => {
    if (c === '.') return;
    if (blink && c === 'E') c = y === 12 ? 'E' : 'S';
    ctx.fillStyle = pal[c];
    ctx.fillRect(x, y, 1, 1);
  }));
}

export default function Avatar({ className = '' }) {
  const ref = useRef(null);

  // redraw when the theme changes, since the blazer uses theme colours
  useEffect(() => {
    draw(ref.current, false);
    const obs = new MutationObserver(() => draw(ref.current, false));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let t1, t2;
    const loop = () => {
      t1 = setTimeout(() => {
        draw(ref.current, true);
        t2 = setTimeout(() => { draw(ref.current, false); loop(); }, 140);
      }, 2500 + Math.random() * 3000);
    };
    loop();
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <canvas
      ref={ref}
      width={24}
      height={24}
      role="img"
      aria-label="Pixel-art avatar of Nancy"
      className={`pixelated ${className}`}
    />
  );
}
