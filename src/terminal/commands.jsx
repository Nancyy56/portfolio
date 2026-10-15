import {
  LuUser, LuBriefcase, LuFolderGit2, LuChartNoAxesColumn, LuLayers, LuTrophy,
  LuGraduationCap, LuMail, LuPalette, LuCircleHelp, LuCoffee, LuSparkles,
} from 'react-icons/lu';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { DATA, degreeProgress } from '../data';
import { Cmd, Head, Row, Branch, Bar, Stack, Ext, Ok, Err, Next, Sep, Gap } from './ui';
import Snake from '../components/Snake';

export const THEMES = ['violet', 'ocean', 'sunset', 'rose'];

const LOGO = String.raw`███╗   ██╗
████╗  ██║
██╔██╗ ██║
██║╚██╗██║
██║ ╚████║
╚═╝  ╚═══╝`;

const toolCount = () => Object.values(DATA.stack).flat().length;

/* ------------------------------------------------------------------ */

function Neofetch() {
  const p = Math.round(degreeProgress() * 100);
  const info = [
    ['os', 'NANCY.OS · AI/ML Engineer'],
    ['host', 'IFOA India · AI Integration Dev Intern'],
    ['focus', 'NLP · RAG · Vector Search'],
    ['location', 'Sonipat, Haryana, IN'],
    ['uptime', `B.Tech CSE '27 · ${p}% complete`],
    ['packages', `${DATA.projects.length} projects · ${toolCount()} tools`],
    ['shell', 'zsh — type help'],
  ];
  return (
    <div className="flex gap-10">
      <pre className="text-grad hidden shrink-0 pt-2 text-[24px] leading-[1.12] font-bold sm:block" aria-hidden="true">{LOGO}</pre>
      <div className="min-w-0">
        <div><span className="font-bold text-accent">guest</span><span className="text-ink-3">@</span><span className="font-bold text-accent-2">nancy.os</span></div>
        <div className="text-ink-3">{'─'.repeat(23)}</div>
        {info.map(([k, v]) => (
          <div key={k} className="flex gap-3">
            <span className="w-[9ch] shrink-0 font-semibold text-accent">{k}</span>
            <span className="text-ink-2">{v}</span>
          </div>
        ))}
        <div className="mt-2 flex gap-1" aria-hidden="true">
          {['bg-accent', 'bg-accent-2', 'bg-accent-dim', 'bg-ok', 'bg-warn', 'bg-err', 'bg-ink-2', 'bg-ink-3'].map((c) => (
            <span key={c} className={`h-3 w-6 rounded-sm ${c}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export const commands = {
  welcome: () => (
    <>
      <div className="text-ink-3">Last login: {new Date().toDateString()} on ttys001</div>
      <Gap />
      <Neofetch />
      <Gap />
      <div className="text-ink">Hi, I'm <span className="text-grad font-bold">{DATA.name}</span>. {DATA.bio}</div>
      <div className="text-ink-3">
        Type <Cmd c="help" /> to see commands, or try <Cmd c="whoami" /> · <Cmd c="projects" /> · <Cmd c="experience" />
      </div>
    </>
  ),

  help: () => {
    const rows = [
      ['whoami', 'about me'], ['experience', 'work history'], ['projects', 'selected work'], ['project <n>', 'project details'],
      ['skills', 'proficiency'], ['stack', 'tools & technologies'], ['education', 'degree'], ['awards', 'recognition'],
      ['contact', 'get in touch'], ['resume', 'open resume.pdf'], ['theme', 'switch colours'], ['clear', 'clear screen'],
    ];
    return (
      <>
        <Head icon={LuCircleHelp} title="help" note="click or type a command" />
        <div className="grid max-w-3xl gap-x-12 gap-y-1.5 sm:grid-cols-2">
          {rows.map(([c, d]) => (
            <div key={c} className="flex gap-3">
              <span className="w-[13ch] shrink-0">{c.includes('<') ? <span className="text-accent">{c}</span> : <Cmd c={c} />}</span>
              <span className="text-ink-3">{d}</span>
            </div>
          ))}
        </div>
      </>
    );
  },

  whoami: () => (
    <>
      <Head icon={LuUser} title="nancy" note={DATA.role} />
      <div className="max-w-3xl text-ink-2">{DATA.bio}</div>
      <Gap />
      <div className="text-ink-3">what I do</div>
      <Branch>RAG pipelines with citation-grounded, verifiable answers</Branch>
      <Branch>Semantic search & vector databases <span className="text-ink-3">· Qdrant, ChromaDB, SentenceTransformers</span></Branch>
      <Branch last>LLM-integrated backend services <span className="text-ink-3">· FastAPI, Node.js, GPT-4o / Gemini</span></Branch>
      <Gap />
      <Row k="now">AI Integration Developer Intern <span className="text-ink-3">@ IFOA India</span></Row>
      <Row k="education">B.Tech CSE &apos;27 <span className="text-ink-3">· DCRUST · CGPA {DATA.education.cgpa.split(' ')[0]}</span></Row>
      <Row k="progress"><Bar value={degreeProgress() * 100} width={24} /></Row>
      <Row k="highlights">~48% lower forecast error <span className="text-ink-3">·</span> &lt;300ms code search</Row>
      <Row k="based">{DATA.location}</Row>
      <Row k="looking for"><span className="text-ok">AI/ML engineering roles & internships</span></Row>
      <Next><Cmd c="experience" /><Sep /><Cmd c="projects" /><Sep /><Cmd c="skills" /><Sep /><Cmd c="contact" /></Next>
    </>
  ),

  experience: () => {
    const x = DATA.experience[0];
    return (
      <>
        <Head icon={LuBriefcase} title={x.role} note={x.period} />
        <div className="text-accent">IFOA India <span className="text-ink-3">· {x.place}</span> <span className="ml-1 inline-flex items-center gap-1.5 text-xs text-ok"><span className="size-1.5 rounded-full bg-ok" />{x.status.toLowerCase()}</span></div>
        {x.points.map((pt, i) => <Branch key={i} last={i === x.points.length - 1}>{pt}</Branch>)}
        <Row k="stack"><Stack items={x.stack} /></Row>
        <Next><Cmd c="projects" /></Next>
      </>
    );
  },

  projects: () => (
    <>
      <Head icon={LuFolderGit2} title="projects" note={`${DATA.projects.length} completed`} />
      {DATA.projects.map((p, i) => (
        <div key={p.name} className="flex flex-wrap gap-x-4 py-0.5">
          <span className="text-ink-3">0{i + 1}</span>
          <span className="w-[12ch] shrink-0"><Cmd c={`project ${i + 1}`}>{p.name}</Cmd></span>
          <span className="min-w-0 text-ink-2 sm:w-[62ch]">{p.summary}</span>
          <span className="text-ink-3">{p.highlight}</span>
        </div>
      ))}
      <Next>details: <Cmd c="project 1">project 1</Cmd></Next>
    </>
  ),

  project: (args) => {
    const n = parseInt(args[0], 10);
    const p = DATA.projects[n - 1];
    if (!p) return <Err>project: pick a number 1–{DATA.projects.length}</Err>;
    return (
      <>
        <Head icon={LuFolderGit2} title={p.name} note={p.title} />
        {p.points.map((pt, i) => <Branch key={i} last={i === p.points.length - 1}>{pt}</Branch>)}
        <Row k="stack"><Stack items={p.stack} /></Row>
        <Row k="impact"><span className="text-accent-2">{p.highlight}</span></Row>
        <Row k="repo"><Ext href={p.link}>github</Ext></Row>
        <Next>
          {n < DATA.projects.length
            ? <><Cmd c={`project ${n + 1}`}>{DATA.projects[n].name}</Cmd><Sep /><Cmd c="projects">all projects</Cmd></>
            : <><Cmd c="projects">all projects</Cmd><Sep /><Cmd c="skills" /></>}
        </Next>
      </>
    );
  },

  skills: () => (
    <>
      <Head icon={LuChartNoAxesColumn} title="skills" note="self-assessed proficiency" />
      <div className="grid max-w-4xl gap-x-14 gap-y-1.5 lg:grid-cols-2">
        {DATA.skills.map(([n, v]) => (
          <div key={n} className="flex items-center gap-3">
            <span className="w-[16ch] shrink-0 text-ink-2">{n}</span>
            <Bar value={v} width={22} />
          </div>
        ))}
      </div>
      <Next><Cmd c="stack">full tech stack</Cmd></Next>
    </>
  ),

  stack: () => (
    <>
      <Head icon={LuLayers} title="tech stack" note={`${toolCount()} tools`} />
      {Object.entries(DATA.stack).map(([cat, items]) => (
        <Row key={cat} k={cat} w="w-[16ch]"><Stack items={items} /></Row>
      ))}
    </>
  ),

  awards: () => (
    <>
      <Head icon={LuTrophy} title="awards & leadership" />
      {DATA.achievements.map(([t, d], i) => (
        <Branch key={t} last={i === DATA.achievements.length - 1}>
          <span className="text-ink">{t}</span> <span className="text-ink-3">· {d}</span>
        </Branch>
      ))}
    </>
  ),

  education: () => {
    const e = DATA.education;
    return (
      <>
        <Head icon={LuGraduationCap} title="B.Tech CSE" note={e.period} />
        <div className="text-accent">DCRUST <span className="text-ink-3">· {e.place}</span></div>
        <Row k="cgpa">{e.cgpa}</Row>
        <Row k="progress"><Bar value={degreeProgress() * 100} width={24} /></Row>
        <Row k="courses"><Stack items={e.coursework} /></Row>
      </>
    );
  },

  contact: () => (
    <>
      <Head icon={LuMail} title="contact" note="open to AI/ML roles & internships" />
      <div className="flex items-center gap-3"><LuMail className="size-4 text-ink-3" /><a className="text-accent-2 hover:underline" href={`mailto:${DATA.email}`}>{DATA.email}</a></div>
      <div className="flex items-center gap-3"><FaLinkedin className="size-4 text-ink-3" /><Ext href={DATA.linkedin}>{DATA.linkedin.replace('https://', '')}</Ext></div>
      <div className="flex items-center gap-3"><FaGithub className="size-4 text-ink-3" /><Ext href={DATA.github}>{DATA.github.replace('https://', '')}</Ext></div>
      <Next>recruiters, try <Cmd c="sudo hire nancy" /></Next>
    </>
  ),

  resume: () => {
    window.open(DATA.resume, '_blank');
    return <Ok>opened resume.pdf · <a className="text-accent-2 hover:underline" href={DATA.resume} download="Nancy_Resume.pdf">download instead</a></Ok>;
  },

  theme: (args, ctx) => {
    const t = (args[0] || '').toLowerCase() || THEMES[(THEMES.indexOf(ctx.theme) + 1) % THEMES.length];
    const others = (skip) => THEMES.filter((x) => x !== skip).map((x, i) => (
      <span key={x}>{i > 0 && <Sep />} <Cmd c={`theme ${x}`}>{x}</Cmd> </span>
    ));
    if (!THEMES.includes(t)) return <Err>theme: unknown "{t}" — try {others()}</Err>;
    ctx.setTheme(t);
    return (
      <div className="flex flex-wrap items-center gap-x-2">
        <LuPalette className="size-4 text-accent" /> theme <span className="text-ink">{t}</span>
        <span className="text-ink-3">· others:</span>{others(t)}
      </div>
    );
  },

  clear: (_, ctx) => { ctx.clear(); return null; },

  snake: (_, ctx) => <Snake onEnd={ctx.endGame} />,

  /* ---- secrets ---- */
  sudo: (args) => {
    if (/hire/i.test(args.join(' '))) {
      setTimeout(() => { window.location.href = `mailto:${DATA.email}?subject=${encodeURIComponent("Let's work together")}`; }, 600);
      return (
        <>
          <div className="text-ink-3">[sudo] password for guest: ********</div>
          <Ok>access granted — excellent decision. opening mail…</Ok>
        </>
      );
    }
    return <Err>guest is not in the sudoers file. This incident will be reported.</Err>;
  },
  matrix: (_, ctx) => { ctx.matrix(); return <div className="text-accent">wake up, neo…</div>; },
  ls: () => (
    <div className="flex flex-wrap gap-x-6">
      <Cmd c="whoami">about.md</Cmd><Cmd c="experience">experience/</Cmd><Cmd c="projects">projects/</Cmd>
      <Cmd c="skills">skills.json</Cmd><Cmd c="resume">resume.pdf</Cmd><span className="text-ink-3">.secrets/</span>
    </div>
  ),
  cat: (args) => (String(args[0]).includes('secret')
    ? <div className="text-ink-3">try: matrix · sudo · coffee · rm -rf /</div>
    : <Err>cat: {args[0] || '(nothing)'}: No such file</Err>),
  rm: () => (
    <>
      <div className="flex flex-wrap items-center gap-3 text-warn">deleting everything… <Bar value={50} width={16} /></div>
      <div className="flex items-center gap-2"><LuSparkles className="size-4 text-accent" /> just kidding. nice try though.</div>
    </>
  ),
  coffee: () => <div className="flex items-center gap-2"><LuCoffee className="size-4 text-warn" /> <span className="text-ink-3">coffee brewed — ready for the next RAG pipeline</span></div>,
  hello: () => <div>hi there, I'm Nancy. type <Cmd c="whoami" /> to learn more.</div>,
  date: () => <div>{new Date().toString()}</div>,
  echo: (args) => <div>{args.join(' ')}</div>,
  exit: () => <div className="text-ink-3">this session stays open. try <Cmd c="help" /> instead.</div>,
};

export const ALIASES = {
  about: 'whoami', me: 'whoami', exp: 'experience', work: 'experience', mission: 'experience',
  quests: 'projects', quest: 'project', stats: 'skills', tech: 'stack', inventory: 'stack',
  achievements: 'awards', trophies: 'awards', edu: 'education', email: 'contact',
  cv: 'resume', game: 'snake', play: 'snake', cls: 'clear', home: 'welcome', neofetch: 'welcome', '?': 'help', hi: 'hello',
};

export const HIDDEN = ['welcome', 'snake', 'sudo', 'matrix', 'ls', 'cat', 'rm', 'coffee', 'hello', 'date', 'echo', 'exit'];
export const VISIBLE = Object.keys(commands).filter((c) => !HIDDEN.includes(c));
