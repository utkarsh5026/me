# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Layout

A VS Code–styled portfolio SPA (React 18 + TypeScript + Vite 5 + Tailwind 3 + Zustand). All application code lives in `app/`; the repo root holds `scripts/` (Node build/data generators), `docs/`, and the `Makefile`. Use **bun** only (not npm/yarn). The `@/` import alias maps to `app/src/`.

## Commands

Run from `app/`:

```bash
bun install
bun run dev            # Vite dev server on :5173 (vite-plugin-checker also reports TS errors)
bun run build          # tsc -b && vite build — does NOT regenerate git/activity JSON
bun run lint           # ESLint, --max-warnings 0
bun run typecheck      # tsc --noEmit
bun run format:write   # Prettier
bunx eslint . --ext ts,tsx --fix   # fixes import-sort errors among others
```

From the repo root, `make <target>` forwards to `python makefile.py <target>` (`make help` lists all). Useful ones: `make check` (lint + type-check), `make build` (runs `scripts/build.js`: regenerates all data JSON, then builds), `make gen-git-all`, `make gen-activity`, `make watch-prod` (rebuild-on-change + serve prod build on :3000).

There is no test framework or test suite. Verification = `make check` + `bun run build`. CI (`.github/workflows/ci.yml`) runs lint, `tsc --noEmit`, and build.

The Husky pre-commit hook runs `eslint --fix --max-warnings 0` and Prettier on staged files inside `app/` and re-stages them, so any lint warning blocks the commit.

## Generated data (gitignored)

The `scripts/generate-*.js` files mine git history / the GitHub API and write JSON the app fetches at runtime:

| Script                      | Output                               | Consumer                                                        |
| --------------------------- | ------------------------------------ | --------------------------------------------------------------- |
| `generate-git-stats.js`     | `app/public/git-stats.json`          | `store/git-store/git-store.ts` (status bar)                     |
| `generate-git-commits.js`   | `app/public/git-commits.json`        | `store/git-store/git-commits-store.ts`                          |
| `generate-git-meta.js`      | `app/public/data/git-meta.json`      | `store/git-store/git-meta-store.ts` (git blame)                 |
| `generate-activity-feed.js` | `app/public/data/activity-feed.json` | `store/activity/activity-store.ts` (uses `GITHUB_TOKEN` if set) |

If a git panel is empty in dev, run `make gen-git-all` / `make gen-activity`. The generators need full git history, which is why CI checkouts use `fetch-depth: 0`.

## Architecture

**Routing → editor.** `App.tsx` maps every section path (`/`, `/about`, …) and `/projects/:slug` to `MainPortfolio`, which renders `components/home/editor/code-editor.tsx`. The story-driven intro in `components/load/portfolio-story.tsx` exists but is not currently wired into any route.

**Editor state.** `components/home/editor/context/editor-store.ts` is the core Zustand store: open tabs (a `SectionTab` or a `ProjectTab`), active tab, explorer/terminal visibility. It is persisted to localStorage (`portfolio-editor-v1`) with a `merge` that validates stored tabs. Tab actions take a `navigate` function so they can update the URL; `use-editor-sync.ts` handles the reverse direction (URL → tabs), resolves `/projects/:slug` once projects load, and binds the global shortcuts (`\` / Ctrl+E explorer, Ctrl+` terminal).

**Content rendering.** `code-editor.tsx` holds a `SectionType → lazy(component)` map; `code-content.tsx` renders the active section, or `portfolio/projects/project-markdown.tsx` when a project tab is active.

**Adding or renaming a section** means touching every place the section list is duplicated:

- `sections` and `editorFiles` in `editor-store.ts`
- `sectionComponents` in `code-editor.tsx`
- routes in `App.tsx`
- `SECTIONS` in `scripts/generate-git-meta.js` and `SECTION_DIRS` in `scripts/generate-git-stats.js`

**Section building blocks** (see `portfolio/contact/contact-me.tsx` for the pattern):

- `Section` (`editor/section/portfolio-section.tsx`): the section wrapper. Its `id` must match the `SectionType` so git stats and blame line up.
- `OutlineNode` (`editor/outline`): registers itself into `store/outline` and drives the outline panel. Nested nodes become children.
- `useGitComponent(Component)`: stamps `data-git-component` on the root element so `GitBlameManager` can show blame on hover. `generate-git-meta.js` uses ts-morph to find component line ranges by name in the section directories, so the name passed here has to match the component's declared name. The `keep_fnames` / `keep_classnames` terser options in `vite.config.ts` keep those names intact in production builds, so don't remove them.

**Content data.**

- Projects: `app/public/data/projects.json` (the first entry is the featured project) plus a long-form page per project at `app/public/data/projects/<slug>.md`. The slug comes from `utils/project-slug.ts`. Write project markdown following `docs/PROJECT_RESTRUCTURE_GUIDE.md` (pure Markdown with no HTML tags) and `docs/PROJECT_TEMPLATE.json`.
- Everything else is in TypeScript data files inside the section directories: `articles/articles-dump.ts`, `work/experienceDump.ts`, `skills/data.tsx`, `learning/data.tsx`. The README's mention of `articles.json` / `work.json` is out of date.
- The in-app terminal commands (`editor/terminal/use-command.ts`) read from these same data files.

## Conventions

- **Colors:** only use Catppuccin `ctp-*` Tailwind tokens. They are CSS variables in `src/index.css`, switched per flavor by `ThemeProvider` (a class on `<html>`, set from `store/settings-store.ts`). Hardcoded hex values break the flavor picker.
- **Accent color props:** type them as `AppColor` from `lib/ctp-colors.ts`. `ctpColorClass()` builds class names at runtime, and `tailwind.config.js` has no safelist, so a combination only renders if that literal class also appears somewhere in the source.
- **Text:** use `<Heading>` / `<Text>` from `components/ui/text.tsx` instead of raw `h1`–`h6` / `p`.
- **Class names:** use `cn()` from `lib/utils.ts`.
- **Shared UI:** reuse the primitives in `components/ui/` (shadcn "new-york", plus custom ones like `section-loader`, `icon-card`, `ghost-button`) and in `editor/panels/shared/` before writing new ones.
- **Animations:** use CSS modules, `tailwindcss-animate`, or animejs. Don't add Framer Motion (it was deliberately removed).
- **React Compiler:** it is enabled through Babel, and `react-compiler/react-compiler` is an ESLint **error**, so code must follow the Rules of React (no mutating props/state, no reading refs during render).
- **Imports:** `simple-import-sort` is enforced as an error for both imports and exports.
- **Deploys:** pushing to `main` deploys to GitHub Pages (`deploy.yml`) and Vercel (`deploy-vercel.yml`). PRs get a sticky comment comparing bundle size and Lighthouse scores against `main` (`pr-compare.yml`).
