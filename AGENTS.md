# wanderlust

Early-stage Next.js app (App Router, everything under `src/`). No tests, no CI, no custom task runner — verify changes with `npm run lint` then `npm run build` (`next build` doubles as the typecheck).

`README.md` is untouched create-next-app boilerplate and factually stale (mentions Geist fonts and a root `app/`); trust config/code over it.

## Commands

- `npm run dev` — dev server (Turbopack, port 3000)
- `npm run build` — production build; also the only typecheck (there is no `typecheck` script; standalone check: `npx tsc --noEmit`)
- `npm run lint` — ESLint only, no formatter is configured

## Framework quirks (things that differ from muscle memory)

- **Next.js 16 + Turbopack + React Compiler** (`reactCompiler: true` in `next.config.ts`). The compiler auto-memoizes — do not add manual `useMemo`/`memo`/`useCallback` for performance. Turbopack handles both `dev` and `build`; no Webpack config.
- **shadcn/ui is the `base-nova` style, backed by Base UI, not Radix** (`components.json`). Components import primitives from `@base-ui/react/*` (e.g. `@base-ui/react/button`), not `@radix-ui/*`. Add new components with `npx shadcn add`, never hand-write Radix wrappers.
- **Tailwind CSS v4, CSS-first**: no `tailwind.config`; theme tokens are CSS variables wired through `@theme inline` in `src/app/globals.css`. Define theme values there, not in a config file.
- `cn` is the standalone `cn` npm package, re-exported from `@/lib/utils`. Use `@/lib/utils` or `cn` — both work.
- Path alias: `@/*` → `./src/*`.
- Fonts: Josefin Sans via `next/font/google` in `src/app/layout.tsx`.

## Next.js guides

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
