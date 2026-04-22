@AGENTS.md

# Project Overview

Tour 2026 - Next.js application.

## Tech Stack

| Technology          | Version | Purpose                                    |
|---------------------|---------|--------------------------------------------|
| Next.js             | 16.2.4  | React meta-framework (App Router)          |
| React               | 19.2.4  | UI library (with Server Components)        |
| TypeScript          | ^5      | Type-safe JavaScript (strict mode)         |
| Tailwind CSS        | ^4      | Utility-first CSS framework (CSS-based v4) |
| shadcn/ui           | ^4.4.0  | Component library (built on @base-ui/react)|
| @base-ui/react      | ^1.4.1  | Headless UI primitives                     |
| ESLint              | ^9      | Code linting (flat config)                 |
| Node.js             | 22      | Runtime (pinned via .nvmrc)                |

## How to Run

```bash
# 1. Switch to Node 22
nvm use 22

# 2. Start dev server (hot-reload enabled)
npm run dev
# → http://localhost:3000

# 3. Production build
npm run build && npm start

# 4. Lint
npm run lint
```

## Available Scripts (package.json)

| Script          | Command        | Description                          |
|-----------------|----------------|--------------------------------------|
| `npm run dev`   | `next dev`     | Dev server with hot reload           |
| `npm run build` | `next build`   | Production build                     |
| `npm start`     | `next start`   | Serve production build               |
| `npm run lint`  | `eslint`       | Run ESLint on project files          |

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (Geist fonts, metadata, body)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Tailwind + shadcn theme + dark mode vars
│   └── favicon.ico
├── components/ui/              # shadcn/ui components (8 installed)
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── separator.tsx
│   ├── table.tsx
│   └── tabs.tsx
└── lib/
    └── utils.ts                # cn() helper for Tailwind class merging
```

## Production Dependencies

| Package                  | Version | Purpose                              |
|--------------------------|---------|--------------------------------------|
| next                     | 16.2.4  | Full-stack React framework           |
| react / react-dom        | 19.2.4  | UI rendering                         |
| recharts                 | ^3.8.1  | Charting library (Bar, Line, Pie...) |
| papaparse                | ^5.5.3  | CSV parser                           |
| @base-ui/react           | ^1.4.1  | Headless UI primitives               |
| class-variance-authority | ^0.7.1  | CSS class variant utility            |
| clsx                     | ^2.1.1  | Conditional classnames               |
| tailwind-merge           | ^3.5.0  | Resolve Tailwind class conflicts     |
| lucide-react             | ^1.8.0  | Icon library                         |
| tw-animate-css           | ^1.4.0  | Tailwind animation utilities         |
| shadcn                   | ^4.4.0  | CLI for adding components            |

## Dev Dependencies

| Package              | Version | Purpose                          |
|----------------------|---------|----------------------------------|
| @tailwindcss/postcss | ^4      | PostCSS plugin for Tailwind v4   |
| @types/node          | ^20     | Node.js type definitions         |
| @types/react         | ^19     | React type definitions           |
| @types/react-dom     | ^19     | React DOM type definitions       |
| @types/papaparse     | ^5.5.2  | PapaParse type definitions       |
| eslint               | ^9      | Linter                           |
| eslint-config-next   | 16.2.4  | Next.js ESLint rules             |
| tailwindcss          | ^4      | Tailwind CSS                     |
| typescript           | ^5      | TypeScript compiler              |

## Configuration Files

| File                  | Purpose                                                  |
|-----------------------|----------------------------------------------------------|
| `package.json`        | Project manifest, scripts, dependencies                  |
| `tsconfig.json`       | TypeScript config (strict, ES2017 target, `@/*` alias)   |
| `next.config.ts`      | Next.js config (ready for customization)                 |
| `components.json`     | shadcn/ui config (base-nova style, RSC enabled, lucide)  |
| `postcss.config.mjs`  | PostCSS with @tailwindcss/postcss plugin                 |
| `eslint.config.mjs`   | ESLint 9 flat config (core-web-vitals + typescript)      |
| `.nvmrc`              | Pins Node.js version to 22                               |
| `.gitignore`          | Ignores node_modules, .next, build, .env, coverage       |

## Key Patterns

- **Import alias**: `@/*` maps to `./src/*` (e.g. `import { cn } from "@/lib/utils"`)
- **Dark mode**: CSS class-based via `.dark` class and `dark:` Tailwind prefix
- **Fonts**: Geist Sans + Geist Mono loaded via `next/font/google`
- **Colors**: oklch color space with CSS variables defined in globals.css
- **Tailwind v4**: CSS-based config (no tailwind.config.ts), uses `@theme` directive
- **Component style**: shadcn/ui uses @base-ui/react (headless) + Tailwind for styling
- **Add new shadcn components**: `npx shadcn@latest add <component-name>`
- **Add new routes**: create `src/app/<route>/page.tsx`
- **Static files**: `public/` directory served at root URL
- **Server Components**: default in App Router, can use Node.js `fs`
- **Client Components**: add `"use client"` directive for interactivity
- **Server Actions**: `"use server"` for mutations with `revalidatePath()`
- **Next.js 16**: `params` and `searchParams` are Promises — must `await` them
- **Next.js 16**: `priority` prop on `next/image` is deprecated — use `preload` instead

## Quick Import Reference

```tsx
// CSV parsing
import Papa from "papaparse";

// Charts
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Icons
import { ArrowLeft, Plus, Check, Loader2, Search } from "lucide-react";

// Utility
import { cn } from "@/lib/utils";
```
