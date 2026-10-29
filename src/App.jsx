import { useCallback, useEffect, useRef, useState } from 'react';
import Boot from './components/Boot';
import Terminal from './components/Terminal';
import StatusBar from './components/StatusBar';
import MatrixRain from './components/MatrixRain';
import { THEMES } from './terminal/commands';
import { DATA, store } from './data';

const params = new URLSearchParams(location.search);

function TitleLink({ href, children }) {
  return (
    <a
      href={href}
      {...(href.startsWith('http') || href.endsWith('.pdf') ? { target: '_blank', rel: 'noopener' } : {})}
      className="text-ink-2 hover:text-ink hover:underline"
    >
      {children}
    </a>
  );
}

export default function App() {
  const [started, setStarted] = useState(params.has('skip'));
  const [theme, setThemeState] = useState(() => {
    const t = store.get('theme');
    return THEMES.includes(t) ? t : THEMES[0];
  });
  const [matrix, setMatrix] = useState(false);
  const runRef = useRef(() => {});

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  const setTheme = useCallback((t) => { setThemeState(t); store.set('theme', t); }, []);
  const onMatrix = useCallback(() => { setMatrix(true); setTimeout(() => setMatrix(false), 4500); }, []);
  const start = useCallback(() => setStarted(true), []);
  const run = useCallback((c) => runRef.current(c), []);

  return (
    <>
      {!started && <Boot onStart={start} />}

      <div className="flex h-dvh justify-center p-4 max-[700px]:p-0">
        <div className="flex min-h-0 w-full max-w-[1180px] flex-col overflow-hidden rounded-md border border-line-2 bg-term max-[700px]:rounded-none max-[700px]:border-0">
          {/* title bar */}
          <header className="flex items-center gap-4 border-b border-line bg-panel px-4 py-2 text-[12.5px]">
            <span className="text-ink-2 max-[520px]:hidden">{DATA.name.toLowerCase()}@portfolio: ~</span>
            <nav aria-label="Links" className="ml-auto flex items-center gap-4 max-[520px]:gap-3">
              <TitleLink href={DATA.resume}>resume</TitleLink>
              <TitleLink href={`mailto:${DATA.email}`}>email</TitleLink>
              <TitleLink href={DATA.github}>github</TitleLink>
              <TitleLink href={DATA.linkedin}>linkedin</TitleLink>
            </nav>
          </header>

          {started && (
            <Terminal theme={theme} setTheme={setTheme} runRef={runRef} onMatrix={onMatrix} deepRun={params.get('run')} />
          )}
          {!started && <div className="flex-1" />}

          <StatusBar run={run} theme={theme} />
        </div>
      </div>

      <MatrixRain active={matrix} />
    </>
  );
}
