# nancy.os

An interactive terminal-style portfolio for **Nancy**, an AI/ML engineer who builds RAG pipelines, semantic search and LLM-integrated backends.

Visitors land in a zsh-like session where they can type commands (or click them) to read about experience, projects, skills and more.

## Features

- **Working terminal**: command history (↑/↓), tab completion, `Ctrl+L` to clear, aliases, and "did you mean" suggestions for typos
- **Clickable commands**: clicking a command types it into the prompt, the way it would appear in a real session
- **Boot screen**, a profile sidebar, a HUD and a quick-command bar for visitors who'd rather not type
- **Four colour themes** (`violet`, `ocean`, `sunset`, `rose`), saved in `localStorage`
- **Easter eggs**: a playable `snake` game with a saved high score, plus a few hidden commands (start with `ls`)
- **Responsive layout** that works on desktop and mobile

## Commands

| Command | Description |
| --- | --- |
| `help` | List available commands |
| `whoami` | About me |
| `experience` | Work history |
| `projects` | Selected work |
| `project <n>` | Details for project *n* |
| `skills` | Self-assessed proficiency |
| `stack` | Tools & technologies |
| `education` | Degree |
| `awards` | Recognition & leadership |
| `contact` | Email, LinkedIn, GitHub |
| `resume` | Open `resume.pdf` |
| `theme [name]` | Switch colour theme (cycles if no name is given) |
| `clear` | Clear the screen |

## Tech stack

- [React 19](https://react.dev)
- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/vite`)
- [react-icons](https://react-icons.github.io/react-icons/)

## Getting started

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## URL parameters

| Parameter | Effect | Example |
| --- | --- | --- |
| `skip` | Skip the boot screen | `/?skip` |
| `run` | Run commands on load (comma-separated) | `/?skip&run=whoami,projects` |

These make it easy to link straight to a specific section, for example in a job application.

## Customising

All portfolio content lives in **[`src/data.js`](src/data.js)**: name, bio, contact links, experience, projects, skills, tech stack, awards and education. Edit that file to update the site. You don't need to touch any components.

Other things you might want to change:

- **Resume**: replace [`public/resume.pdf`](public/resume.pdf)
- **Commands**: add or edit them in [`src/terminal/commands.jsx`](src/terminal/commands.jsx). Each command is a function `(args, ctx) => JSX`. Register aliases in `ALIASES`, and add a command to `HIDDEN` to keep it out of tab completion.
- **Themes**: colour tokens are defined per `[data-theme]` in [`src/index.css`](src/index.css). Add the new name to `THEMES` in `commands.jsx`.
- **Quick-command bar**: edit `ITEMS` in [`src/components/QuickBar.jsx`](src/components/QuickBar.jsx)

## Project structure

```
src/
├── App.jsx              # layout, theme state, URL params
├── data.js              # all portfolio content
├── index.css            # Tailwind setup, theme tokens, effects
├── components/
│   ├── Boot.jsx         # boot / intro screen
│   ├── Hud.jsx          # top status bar
│   ├── Profile.jsx      # sidebar profile card
│   ├── Avatar.jsx
│   ├── Terminal.jsx     # input, history, completion, scrollback
│   ├── QuickBar.jsx     # clickable command shortcuts
│   ├── Snake.jsx        # snake mini-game
│   └── MatrixRain.jsx   # matrix easter-egg effect
└── terminal/
    ├── commands.jsx     # command definitions, aliases, themes
    └── ui.jsx           # shared output primitives (rows, bars, links…)
public/
├── resume.pdf
├── favicon.svg
└── apple-touch-icon.png
```

## Deployment

`npm run build` outputs a static site to `dist/`, which you can host anywhere that serves static files, such as Vercel, Netlify, Cloudflare Pages or GitHub Pages.

## Contact

- Email: [nnydv498@gmail.com](mailto:nnydv498@gmail.com)
- LinkedIn: [linkedin.com/in/nancyy56](https://linkedin.com/in/nancyy56)
- GitHub: [github.com/Nancyy56](https://github.com/Nancyy56)
