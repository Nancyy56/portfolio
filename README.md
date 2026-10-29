# nancy.os

My personal portfolio, built to look and work like a terminal. You can type commands or click them. Everything a recruiter would look for (experience, projects, skills, resume, contact) is one command away.

I'm Nancy, an AI/ML engineer and a Computer Science undergraduate at DCRUST (class of 2027). I work on RAG pipelines, semantic search and LLM backends. Right now I'm an AI Integration Developer Intern at IFOA, building AI features for flight-operations software.

**Resume:** [resume.pdf](public/resume.pdf) · **Email:** [nnydv498@gmail.com](mailto:nnydv498@gmail.com) · **LinkedIn:** [nancyy56](https://linkedin.com/in/nancyy56)

## Quick look

| | |
| --- | --- |
| **Experience** | AI Integration Developer Intern, IFOA India (Aug 2026 – present) |
| **Projects** | GovLens (RAG with citations), BizIntel AI (forecasting + RAG), DevScope (code search) |
| **Core skills** | Python, RAG / LLMs, NLP, vector databases, FastAPI |
| **Education** | B.Tech CSE, DCRUST, 2023 – 2027, CGPA 8.32 / 10 |
| **Awards** | Innovation Award, Unisys Hackathon 2024 · ML Lead, GDG DCRUST 2024–25 |

## Features

- A working shell with command history (↑/↓), Tab completion and `Ctrl+L` to clear
- Every command name in the output is clickable, so you don't have to type anything
- Four colour themes: gruvbox, nord, solarized and light
- A boot screen, a status bar and a few hidden commands (try `snake`)
- URL parameters so you can link straight to a section
- Builds to a fully static site that can be hosted anywhere

## Commands

| Command | What it shows |
| --- | --- |
| `help` | list of commands |
| `whoami` | about me |
| `experience` | work history |
| `projects`, `project <n>` | project list and details |
| `skills`, `stack` | skill levels and tools |
| `education`, `awards` | degree and achievements |
| `contact` | email, LinkedIn, GitHub |
| `resume` | opens the PDF resume |
| `theme [name]` | switch colour theme |
| `clear` | clear the screen |

### URL parameters

| Parameter | Effect |
| --- | --- |
| `?skip` | skip the boot screen |
| `?run=whoami,projects` | run these commands on load |

For example, `/?skip&run=projects` opens straight to the project list.

## Tech stack

- **React 19** for the UI
- **Vite** for the dev server and build
- **Tailwind CSS v4** for styling, with themes defined as CSS variables
- **react-icons** for icons

No backend. All content lives in one data file.

## Running locally

Requires Node.js 20 or newer.

```bash
git clone https://github.com/Nancyy56/portfolio.git
cd portfolio
npm install
npm run dev
```

| Script | |
| --- | --- |
| `npm run dev` | start the dev server |
| `npm run build` | build the static site into `dist/` |
| `npm run preview` | serve the built site locally |

## Project structure

```
src/
├── data.js               all portfolio content (edit this to update the site)
├── App.jsx               app shell
├── index.css             Tailwind setup and colour themes
├── components/
│   ├── Boot.jsx          boot screen
│   ├── Terminal.jsx      input, history, completion
│   ├── StatusBar.jsx     bottom status bar
│   ├── Avatar.jsx
│   ├── MatrixRain.jsx    `matrix` command
│   └── Snake.jsx         `snake` command
└── terminal/
    ├── commands.jsx      every command and its aliases
    └── ui.jsx            shared output components
public/
└── resume.pdf
```

## Updating the content

| To change | Edit |
| --- | --- |
| Bio, experience, projects, skills, education | `src/data.js` |
| Commands and aliases | `src/terminal/commands.jsx` |
| Theme colours | `src/index.css` |
| Resume | replace `public/resume.pdf` |

## Deploying

`npm run build` writes a static site to `dist/`. You can host that folder on GitHub Pages, Netlify, Vercel or Cloudflare Pages. On Vercel or Netlify, import the repo and use the defaults: build command `npm run build`, output directory `dist`.

## Contact

[nnydv498@gmail.com](mailto:nnydv498@gmail.com) · [LinkedIn](https://linkedin.com/in/nancyy56) · [GitHub](https://github.com/Nancyy56)
