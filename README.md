# Utkarsh Priyadarshi — Developer Portfolio

**_A VS Code–inspired developer portfolio. Built to impress. Crafted to perform._**

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit-6c91c3?style=for-the-badge&logo=github-pages&logoColor=white)](https://utkarsh5026.github.io/me/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](https://github.com/utkarsh5026/me/pulls)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

---

## 📋 Table of Contents

- [Utkarsh Priyadarshi — Developer Portfolio](#utkarsh-priyadarshi--developer-portfolio)
  - [📋 Table of Contents](#-table-of-contents)
  - [🧠 About The Project](#-about-the-project)
  - [✨ Key Features](#-key-features)
  - [🛠️ Tech Stack](#️-tech-stack)
    - [🏗️ Core](#️-core)
    - [🧩 UI \& Components](#-ui--components)
    - [🎬 Animations](#-animations)
    - [⚙️ Build \& DX](#️-build--dx)
  - [📁 Project Structure](#-project-structure)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Available Commands](#available-commands)
    - [Adding a New Project](#adding-a-new-project)
    - [Deployment](#deployment)
  - [💡 Usage \& Examples](#-usage--examples)
    - [Terminal Commands](#terminal-commands)
    - [Navigating Sections](#navigating-sections)
    - [Customizing Content](#customizing-content)
  - [🗺️ Roadmap](#️-roadmap)
  - [🤝 Contributing](#-contributing)
    - [How to Contribute](#how-to-contribute)
    - [Conventions](#conventions)
  - [📄 License](#-license)
  - [📬 Contact](#-contact)

---

## 🧠 About The Project

This is not your average developer portfolio. It's a fully interactive, VS Code–inspired single-page application that reimagines the traditional portfolio format as a living code editor — complete with a file explorer, closeable tabs, an embedded terminal, breadcrumb navigation, and a Git commits panel.

**Why this exists:**

Most portfolios are static pages. This one behaves like an IDE. Every section of the portfolio maps to a "file" inside the editor. Visitors navigate the way developers do — through files and tabs — making the experience memorable, immersive, and uniquely on-brand for a software developer.

**Problems it solves:**

- 🎯 Stands out in a sea of template-based portfolios
- 🎨 Communicates personality through the UI itself, not just text
- ⚡ Delivers exceptional performance via code splitting, PWA caching, image optimization, compression, and lazy loading
- 📱 Works beautifully on both desktop and mobile, with swipe navigation on touch devices

---

## ✨ Key Features

- 💻 **VS Code Editor UI** — Authentic file explorer, closeable tabs (close left/right/all), breadcrumbs, status bar, and outline panel. Open tabs are remembered between visits.
- 🔍 **Git Blame Annotations** — Hover any component to see its last commit (hash, date, author, message), sourced from pre-generated `git-meta.json`, mirroring the VS Code GitLens experience. Can be toggled off in Settings; disabled on mobile.
- 📜 **Git Commits Panel** — Browsable commit history for this repo, with a GitHub-style contribution heatmap
- 📡 **Activity Feed** — A cross-repo panel showing recent commits from my most recently pushed GitHub repositories
- 📄 **Resume Section** — Interactive resume as a VS Code editor tab (experience, education, projects, skills) with VS Code outline integration and a downloadable PDF
- ⌨️ **Interactive Terminal** — A real-feeling terminal with commands like `help`, `ls`, `cd`, `cat`, `find`, `projects`, `skills`, and `contact`
- 💫 **CSS Module Animations** — Performant, zero-runtime-cost animations via CSS modules + AnimeJS for complex sequences
- 🚀 **Project Showcase** — A featured project plus a project grid. Each project opens as its own editor tab with a long-form markdown write-up (images, tables, YouTube embeds) and a shareable `/projects/:slug` link.
- 📝 **Articles Section** — Highlights technical writing, blog posts, and dev content
- 📱 **Swipe Navigation** — Mobile-first swipe gestures (via `react-swipeable`) for navigating sections and projects
- 🎨 **Multi-Theme Support** — Catppuccin flavor picker in Settings (Mocha, Macchiato, Frappé, Latte) with persisted preference
- ⚡ **PWA Ready** — Installable, offline-capable, and lightning-fast with Vite's service worker plugin
- 🔬 **React Compiler** — Powered by the React 19 compiler beta for automatic memoization and optimized re-renders

---

## 🛠️ Tech Stack

### 🏗️ Core

| Layer            | Technology                                           |
| :--------------- | :--------------------------------------------------- |
| **UI Framework** | React 18.3 + TypeScript 5                            |
| **Build Tool**   | Vite 5                                               |
| **Styling**      | Tailwind CSS 3 (Catppuccin, 4 flavors) + CSS Modules |
| **Routing**      | React Router DOM 7                                   |
| **State Mgt**    | Zustand 5                                            |
| **Pkg Manager**  | Bun                                                  |
| **Compiler**     | React Compiler (beta)                                |

### 🧩 UI & Components

| Purpose                 | Library                                                     |
| :---------------------- | :---------------------------------------------------------- |
| **Headless Primitives** | Radix UI _(Dialog, Tabs, Tooltip, Dropdown, Avatar, …)_     |
| **Component System**    | shadcn/ui (style: `new-york`)                               |
| **Icons**               | Lucide React + React Icons                                  |
| **Drawer**              | Vaul                                                        |
| **Resizable Layouts**   | react-resizable-panels                                      |
| **Swipe Gestures**      | react-swipeable                                             |
| **Scroll Observers**    | react-intersection-observer                                 |
| **Code Highlighting**   | PrismJS + react-syntax-highlighter                          |
| **Markdown Rendering**  | react-markdown + rehype-highlight + rehype-raw + remark-gfm |

### 🎬 Animations

| Purpose                   | Library                           |
| :------------------------ | :-------------------------------- |
| **Complex Sequences**     | AnimeJS 3                         |
| **Transition Animations** | CSS Modules + tailwindcss-animate |

### ⚙️ Build & DX

| Purpose                | Tool                                                            |
| :--------------------- | :-------------------------------------------------------------- |
| **Bundler**            | Vite 5 + Rollup                                                 |
| **Type Checking**      | TypeScript 5 + vite-plugin-checker                              |
| **Linting**            | ESLint 8 + typescript-eslint + react-hooks + simple-import-sort |
| **Formatting**         | Prettier 3                                                      |
| **Git Hooks**          | Husky 9                                                         |
| **Bundle Analysis**    | rollup-plugin-visualizer                                        |
| **Image Optimization** | vite-imagetools + sharp                                         |
| **Compression**        | vite-plugin-compression (gzip/brotli)                           |
| **PWA**                | vite-plugin-pwa                                                 |

---

## 📁 Project Structure

```text
portfolio/
├── app/                        # All source code lives here
│   ├── src/
│   │   ├── App.tsx             # Routes: every section path + /projects/:slug → the editor
│   │   ├── types.ts            # Global TypeScript types
│   │   ├── components/
│   │   │   ├── animations/     # Floating elements, Matrix rain, Reveal effects
│   │   │   ├── base/           # ThemeProvider, TechBadge, technology icon mapping
│   │   │   ├── home/
│   │   │   │   ├── editor/     # VS Code chrome: tabs, explorer, breadcrumbs, outline, terminal, status bar
│   │   │   │   │   ├── context/     # Editor store (open tabs) + URL ↔ tab sync
│   │   │   │   │   ├── git-blame/   # Git blame annotations (manager + portal tooltip)
│   │   │   │   │   ├── panels/      # Git commits (with heatmap) and activity feed panels
│   │   │   │   │   └── section/     # Shared wrapper used by every portfolio section
│   │   │   │   └── portfolio/  # Content sections: intro, about, skills, projects, work, resume, …
│   │   │   ├── load/           # 404 page + story-driven intro screens (not currently routed)
│   │   │   └── ui/             # shadcn/ui components + shared primitives (Heading/Text, loaders, cards)
│   │   ├── hooks/              # use-mobile, use-project, use-git-component, use-swipe, use-keydown, …
│   │   ├── store/              # Zustand: projects, git data, activity feed, outline, settings
│   │   ├── lib/                # cn() helper (tailwind-merge + clsx), Catppuccin color types
│   │   └── utils/              # Project slugs, outline ids, unique ids
│   ├── public/
│   │   └── data/
│   │       ├── projects.json   # Project cards (source of truth)
│   │       └── projects/       # One markdown write-up per project (<slug>.md)
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── docs/
│   ├── PROJECT_RESTRUCTURE_GUIDE.md  # Writing guide for project markdown pages
│   ├── PROJECT_TEMPLATE.json         # Template for a projects.json entry
│   └── resume.pdf
├── scripts/                    # Build pipeline + git/activity data generators
├── Makefile                    # Dev workflow shortcuts (delegates to makefile.py)
└── README.md
```

The git panels read JSON generated from the repo's history at build time. These files are gitignored: `app/public/git-stats.json`, `app/public/git-commits.json`, `app/public/data/git-meta.json`, and `app/public/data/activity-feed.json`.

---

## 🚀 Getting Started

### Prerequisites

- **[Bun](https://bun.sh/)** `>= 1.0` — used as the package manager and runtime
- **[Git](https://git-scm.com/)**
- **Python 3** — only needed for the `make` shortcuts

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/utkarsh5026/me.git
cd me

# 2. Navigate to the app directory
cd app

# 3. Install dependencies
bun install

# 4. Start the development server
bun run dev
```

The dev server will be available at **<http://localhost:5173>**.

The git commits, activity, blame, and status-bar data come from generated JSON files. Run `make gen-git-all` (and `make gen-activity` for the activity feed) once so those panels have data in development.

### Available Commands

Run from the `app/` directory:

```bash
bun run dev              # Start development server
bun run build            # Type-check + production build (does not regenerate git data)
bun run force-build      # Clean rebuild (clears Vite/TS cache)
bun run lint             # ESLint (zero-warnings policy)
bun run typecheck        # TypeScript check only
bun run preview          # Preview the production build locally
bun run watch:prod       # Rebuild on change and serve the production build on :3000
bun run analyze          # Visualize bundle composition
bun run format:check     # Check formatting with Prettier
bun run format:write     # Auto-fix formatting with Prettier
bun run gen:git-stats    # Regenerate per-section git stats (status bar)
bun run gen:git-commits  # Regenerate commits panel + heatmap data
bun run gen:git-meta     # Regenerate per-component git blame data
bun run gen:activity     # Regenerate the cross-repo activity feed (set GITHUB_TOKEN to avoid rate limits)
```

Or use the **Makefile** from the project root (`make help` lists everything):

```bash
make dev              # Start dev server
make build            # Regenerate all git/activity data, then production build
make gen-git-all      # Regenerate all git data in parallel
make lint             # Run linter
make lint-fix         # Auto-fix lint issues
make type-check       # TypeScript check only
make check            # lint + type-check together
make clean            # Remove dist/ and the Vite cache
make fresh-start      # Clean install → start dev
make prod-ready       # Clean, then lint + type-check + build
```

There is no automated test suite; `make check` plus a successful build is the bar for a change. A Husky pre-commit hook runs ESLint (`--fix`, zero warnings) and Prettier on staged files.

### Adding a New Project

Projects are data-driven. No component changes are needed.

1. Add an entry to `app/public/data/projects.json`, following [`docs/PROJECT_TEMPLATE.json`](docs/PROJECT_TEMPLATE.json). The first entry is shown as the featured project.
2. Add the project's write-up at `app/public/data/projects/<slug>.md`, where `<slug>` is the project name lowercased with spaces turned into hyphens (e.g. `My Project` → `my-project.md`). Follow [`docs/PROJECT_RESTRUCTURE_GUIDE.md`](docs/PROJECT_RESTRUCTURE_GUIDE.md): pure Markdown, no HTML tags.

Without the markdown file, the project's card still appears but its tab shows an error.

### Deployment

Pushing to `main` builds the site with GitHub Actions and deploys it to both GitHub Pages and Vercel. Pull requests get a Vercel preview plus a bot comment comparing bundle size and Lighthouse scores against `main`. A daily scheduled job redeploys Vercel so the activity feed stays fresh.

---

## 💡 Usage & Examples

### Terminal Commands

Once the portfolio loads, open the terminal with **Ctrl + `` ` ``** and try:

```text
> help       — Lists all available commands (help <command> for details)
> ls / cd    — List sections or content, and jump to a section
> pwd        — Prints the current section
> cat        — Displays details of a specific item
> find       — Searches across all content
> open       — Opens a link in a new tab
> about      — Shows a quick bio (also: whoami)
> projects   — Lists all projects
> skills     — Lists technical skills
> articles   — Lists articles
> contact    — Shows contact info and social links
> clear      — Clears the terminal output
```

### Navigating Sections

- **Desktop:** Use the file explorer on the left sidebar or click tabs at the top to switch sections. Toggle the explorer with **`\`** or **Ctrl + E**.
- **Mobile:** Swipe left/right to navigate between sections; a swipe hint appears on first load
- **Direct links:** Every section has its own URL (`/about`, `/projects`, `/resume`, …), and each project has one at `/projects/<slug>`.

### Customizing Content

Content is split between public data files and TypeScript data modules:

| Content          | Where it lives                                                         |
| :--------------- | :--------------------------------------------------------------------- |
| Projects         | `app/public/data/projects.json` + `app/public/data/projects/<slug>.md` |
| Articles         | `app/src/components/home/portfolio/articles/articles-dump.ts`          |
| Work experience  | `app/src/components/home/portfolio/work/experienceDump.ts`             |
| Skills           | `app/src/components/home/portfolio/skills/data.tsx`                    |
| Learning journey | `app/src/components/home/portfolio/learning/data.tsx`                  |

Editing these updates both the sections and the terminal commands. No component changes are needed.

---

## 🗺️ Roadmap

- [x] VS Code editor UI with tabs, explorer, and status bar
- [x] Interactive terminal with custom commands
- [x] Git contribution heatmap panel
- [x] Git blame annotations per section (VS Code GitLens–style)
- [x] Git commits history panel
- [x] Interactive resume section with VS Code outline integration + PDF download
- [x] Multi-theme Catppuccin flavor picker (Mocha, Macchiato, Frappé, Latte)
- [x] PWA support (offline, installable)
- [x] Mobile swipe navigation
- [x] Cross-repo activity feed panel
- [x] Project deep-dive pages with shareable `/projects/:slug` links
- [x] Replace Framer Motion with CSS modules for zero-runtime animations
- [x] React Compiler beta integration for automatic memoization
- [ ] Keyboard shortcut palette (Ctrl+P command palette simulation)
- [ ] Guestbook / visitor message feature
- [ ] Blog/article detail pages with full markdown rendering
- [ ] Full WCAG 2.1 AA accessibility audit

> Have an idea? [Open an issue](https://github.com/utkarsh5026/me/issues) or [start a discussion](https://github.com/utkarsh5026/me/discussions)!

---

## 🤝 Contributing

Contributions are greatly appreciated. Any improvements, bug fixes, or ideas are welcome.

### How to Contribute

1. **Fork** the repository

2. **Create your feature branch**

   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make your changes** and ensure they follow the project conventions below

4. **Lint and type-check before committing**

   ```bash
   make check
   ```

5. **Commit your changes**

   ```bash
   git commit -m "feat: add your feature description"
   ```

6. **Push to your branch**

   ```bash
   git push origin feat/your-feature-name
   ```

7. **Open a Pull Request** targeting the `main` branch

### Conventions

- Use `bun` — not npm or yarn
- ESLint zero-warnings policy must pass: `bun run lint`
- Use the Catppuccin `ctp-*` color tokens from `tailwind.config.js` for any new UI (`ctp-blue`, `ctp-mauve`, `ctp-pink`, etc.). Hardcoded colors won't follow the theme flavor picker.
- Use `<Heading>` and `<Text>` from `src/components/ui/text.tsx` — no raw `<h1>`–`<h6>` or `<p>` tags
- Use `cn()` from `src/lib/utils.ts` for conditional Tailwind classes
- Prefer CSS modules or `tailwindcss-animate` for animations — do not add Framer Motion
- Keep components focused; prefer editing existing files over creating new ones

---

## 📄 License

Distributed under the **MIT License**. Free to use, fork, and learn from.

See [`LICENSE`](LICENSE) for full details.

---

## 📬 Contact

**Utkarsh Priyadarshi** — Software Developer & Open Source Enthusiast

| Platform           | Link                                                                              |
| :----------------- | :-------------------------------------------------------------------------------- |
| 🌐 **Portfolio**   | [utkarsh5026.github.io/me](https://utkarsh5026.github.io/me/)                           |
| 🐙 **GitHub**      | [@utkarsh5026](https://github.com/utkarsh5026)                                    |
| 💼 **LinkedIn**    | [Utkarsh Priyadarshi](https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/) |
| 🐦 **Twitter / X** | [@UtkarshPriyad10](https://x.com/UtkarshPriyad10)                                 |
| 📧 **Email**       | [utkarshpriyadarshi5026@gmail.com](mailto:utkarshpriyadarshi5026@gmail.com)       |

> Found a bug or have a suggestion? [Open an issue](https://github.com/utkarsh5026/me/issues) — I'd love to hear from you.

---

Made with ❤️ and a lot of ☕ by [Utkarsh Priyadarshi](https://github.com/utkarsh5026)

⭐ **Star this repo if you found it useful or inspiring!**
