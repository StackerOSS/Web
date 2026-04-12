<div align="center">

<br />

```
 ███████╗████████╗ █████╗  ██████╗██╗  ██╗███████╗██████╗
 ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
 ███████╗   ██║   ███████║██║     █████╔╝ █████╗  ██████╔╝
 ╚════██║   ██║   ██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
 ███████║   ██║   ██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
 ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
```

**Build your stack. Instantly.**

A visual full-stack builder — configure your entire project (framework, UI, auth, ORM, API, theme)
and scaffold it locally with a single CLI command.

[![TanStack Start](https://img.shields.io/badge/built%20with-TanStack%20Start-f97316.svg)](#)
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg)](#)
[![shadcn/ui](https://img.shields.io/badge/UI-shadcn%2Fui-white.svg)](#)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](#)
[![Bun](https://img.shields.io/badge/runtime-bun-orange.svg)](#)

</div>

---

## Overview

Stacker is a developer tool for visually configuring and scaffolding full-stack projects.
Instead of manually looking up every CLI command for every library, you pick your stack
in the browser, see a live code preview of the generated project, and get a short
**template ID** you can pass to the CLI.

```bash
bunx stacker-cli xCjNK1
```

---

## Features

- **Visual stack builder** — configure framework, runtime, UI system, theme, auth, ORM, API layer, TanStack add-ons,
  animations, typings, integrations, deployment targets, and extra packages in one place
- **Live code preview** — see every generated file with full syntax highlighting before running a single command;
  browse the file tree, search files, and download the whole project as a `.zip`
- **Static template IDs** — your configuration is encoded server-side; share a link, save it, re-scaffold anytime
- **CLI execution** — one command runs the full scaffold plan in sequence (no manual copy-pasting)
- **tweakcn theme support** — pick from the full tweakcn registry and preview it live on shadcn components
- **shadcn/ui deep integration** — choose style, base color, border radius, icon library, font, and individual components

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | TanStack Start (SSR, file-based API routes) |
| UI | shadcn/ui + tweakcn themes |
| State | TanStack Store (context-based, no Redux) |
| Routing | TanStack Router (type-safe, file-based) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Code highlighting | Shiki (`github-dark` theme) |
| Validation | ArkType (manifest schema) |
| Package manager | Bun |
| Linting | Biome |
| Testing | Vitest + Testing Library |

---

## Getting started

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.1

### Install & run

```bash
git clone https://github.com/StackerOSS/Web
cd Web

bun install
bun run dev
```

The app runs at `http://localhost:3000`.

### Build for production

```bash
bun run build
```

---

## Project structure

```
Web/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── create/
│   │   │       ├── index.tsx          # CreatePage — root layout with theme vars
│   │   │       ├── preview/
│   │   │       │   ├── index.tsx      # PreviewArea — Code / Preview tab switcher
│   │   │       │   ├── code/
│   │   │       │   │   └── index.tsx  # CodeView — file explorer + Shiki viewer
│   │   │       │   └── stack/
│   │   │       │       └── index.tsx  # StackPreview — live theme component preview
│   │   │       └── sidebar/
│   │   │           ├── index.tsx      # Sidebar — tab navigation
│   │   │           ├── general.tsx    # Project name, package manager, git, install
│   │   │           ├── frontend.tsx   # Framework, UI system, shadcn, TanStack add-ons
│   │   │           ├── backend.tsx    # Database, ORM, auth, API layer
│   │   │           └── addons.tsx     # Integrations, deployment, animations, typings
│   ├── hooks/
│   │   ├── use-stacker-manifest.ts    # Derives StackerManifest from store state
│   │   └── use-preview-tree.ts        # Debounced /api/preview fetcher + abort
│   ├── lib/
│   │   ├── stacker.ts                 # All types, constants, buildManifest, buildCommandPlan
│   │   ├── file-icons.ts              # Extension → react-icons map
│   │   ├── tweakcn-preview.ts         # tweakcn palette → CSS var map
│   │   ├── tweakcn-registry-themes.ts # Full tweakcn theme registry
│   │   └── preview-fonts.ts           # Google Fonts href builder
│   ├── server/
│   │   ├── preview-tree.ts            # In-memory file tree generator (Better-T approach)
│   │   └── template-db.ts             # KV-style template ID store
│   ├── store/
│   │   └── create-stack.ts            # TanStack Store — all builder state + actions
│   ├── types/
│   │   ├── preview-tree.ts            # VirtualFile / VirtualDirectory types
│   │   └── stack.ts                   # ArkType StackSchema
│   └── routes/
│       ├── __root.tsx                 # App shell
│       ├── create/
│       │   └── index.tsx              # /create route
│       └── api/
│           ├── preview.ts             # POST /api/preview → file tree JSON
│           ├── templates.index.ts     # POST /api/templates → save manifest, return ID
│           └── templates.$id.ts       # GET /api/templates/:id → fetch manifest
```

---

## How the code preview works

Stacker generates a realistic in-memory file tree from your selected stack — the same approach
used by [Better-T-Stack](https://better-t-stack.amanv.dev):

1. `POST /api/preview` receives your `StackerManifest`
2. `server/preview-tree.ts` generates every file (framework config, auth, ORM schema, API
   router, env vars, deployment config, etc.) as strings — no disk writes
3. The tree is returned as JSON: `{ root: VirtualDirectory, fileCount, directoryCount }`
4. `CodeView` renders it with a searchable file explorer and Shiki syntax highlighting
5. A **Download** button zips the entire tree client-side via JSZip

This is a **static preview** — it shows you exactly what the CLI will generate,
but it is not a running application (no WebContainers).

---

## Environment variables

Create a `.env.local`:

```bash
# Optional: used by the template ID API to determine the public URL
VITE_APP_URL=http://localhost:3000
```

All env vars are validated at startup with T3Env.

---

## Scripts

```bash
bun run dev        # start dev server (http://localhost:3000)
bun run build      # production build
bun run preview    # preview production build locally
bun run test       # run Vitest tests
bun run lint       # Biome lint
bun run format     # Biome format
bun run check      # Biome lint + format check
```

---

## Related

| Package | Description |
|---|---|
| [`stacker-cli`](https://github.com/StackerOSS/CLI) | The CLI that reads template IDs and scaffolds projects |

---

<div align="center">

Made with <3 and a lot of bad decisions! · [stacker.ranveersoni.me](https://stacker.ranveersoni.me)

</div>
