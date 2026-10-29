# nancy.os

My portfolio, built as a terminal. Type `help` or click any command.

Built with React 19, Vite and Tailwind CSS v4.

## Running locally

```bash
npm install
npm run dev
```

`npm run build` writes a static site to `dist/`.

## Commands

| Command | |
| --- | --- |
| `whoami` | about me |
| `experience` | work history |
| `projects`, `project <n>` | projects |
| `skills`, `stack` | skills and tools |
| `education`, `awards` | degree and awards |
| `contact` | email, LinkedIn, GitHub |
| `resume` | opens resume.pdf |
| `theme [name]` | gruvbox, nord, solarized, light |
| `clear` | clear the screen |

↑/↓ for history, Tab to complete, Ctrl+L to clear. There are a few hidden commands too.

## URL parameters

- `?skip` skips the boot screen
- `?run=whoami,projects` runs commands on load

## Editing

- Content: `src/data.js`
- Commands: `src/terminal/commands.jsx`
- Theme colours: `src/index.css`
- Resume: `public/resume.pdf`

## Contact

[nnydv498@gmail.com](mailto:nnydv498@gmail.com) · [LinkedIn](https://linkedin.com/in/nancyy56) · [GitHub](https://github.com/Nancyy56)
