import { useEffect, useRef } from 'react';

export default function MatrixRain({ active }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!active) return;
    const cv = ref.current, ctx = cv.getContext('2d');
    cv.width = innerWidth; cv.height = innerHeight;
    const fs = 18, cols = Math.ceil(cv.width / fs);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);
    const chars = 'アイウエオカキクケコサシスセソ01NANCYRAGLLM<>{}#$%';
    const fg = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim();
    let raf;
    const tick = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = fg; ctx.font = `${fs}px "JetBrains Mono", monospace`;
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y * fs);
        drops[i] = y * fs > cv.height && Math.random() > 0.975 ? 0 : y + 1;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); setTimeout(() => ctx.clearRect(0, 0, cv.width, cv.height), 600); };
  }, [active]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-40 transition-opacity duration-500 ${active ? 'opacity-85' : 'opacity-0'}`}
    />
  );
}
