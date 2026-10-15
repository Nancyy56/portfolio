import { useCallback, useEffect, useRef, useState } from 'react';
import Boot from './components/Boot';
import Hud from './components/Hud';
import Profile from './components/Profile';
import Terminal from './components/Terminal';
import QuickBar from './components/QuickBar';
import MatrixRain from './components/MatrixRain';
import { THEMES } from './terminal/commands';
import { store } from './data';

const params = new URLSearchParams(location.search);

export default function App() {
  const [started, setStarted] = useState(params.has('skip'));
  const [theme, setThemeState] = useState(() => {
    const t = store.get('theme');
    return THEMES.includes(t) ? t : 'violet';
  });
  const [matrix, setMatrix] = useState(false);
  const runRef = useRef(() => {});

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  const setTheme = useCallback((t) => { setThemeState(t); store.set('theme', t); }, []);
  const onMatrix = useCallback(() => { setMatrix(true); setTimeout(() => setMatrix(false), 4500); }, []);
  const start = useCallback(() => setStarted(true), []);

  return (
    <>
      <span className="bg-blob -top-[30vmax] -left-[15vmax] bg-accent" />
      <span className="bg-blob -right-[20vmax] -bottom-[35vmax] bg-accent-2 [animation-delay:-13s]" />
      <div className="bg-grid" />

      {!started && <Boot onStart={start} />}

      <div className="flex h-dvh flex-col gap-3.5 p-3.5 max-[900px]:gap-2 max-[900px]:p-2">
        <Hud theme={theme} setTheme={setTheme} />
        <main className="grid min-h-0 flex-1 gap-3.5 min-[900px]:grid-cols-[290px_1fr]">
          <Profile theme={theme} />
          {started && (
            <Terminal theme={theme} setTheme={setTheme} runRef={runRef} onMatrix={onMatrix} deepRun={params.get('run')} />
          )}
        </main>
        <QuickBar run={(c) => runRef.current(c)} />
      </div>

      <MatrixRain active={matrix} />
    </>
  );
}
