# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This project follows [FEOD](https://feod.dev/base/) architecture with numbered layers:

- `01_app/` — App shell: entry point, router, i18n, layouts, global styles, assets
- `02_pages/` — Route-level page components (`XxxView.vue`)
- `03_modules/` — Feature modules, each with `index.ts` barrel export
- `04_common/` — Shared utilities, design-system components, API client, styles

### Module structure

Each module in `03_modules/` follows this internal layout:

```
ModuleName/
  api/         # API composables (useQuery, useMutation via @pinia/colada)
  components/  # Vue components local to this module
  composables/ # Business logic composables
  stores/      # Pinia stores (only if local state is needed)
  types/       # TypeScript types and interfaces
  index.ts     # Barrel — only export what other modules need
```

Sub-features live in `ModuleName/modules/SubFeature/` with the same layout.

## Path Aliases

| Alias        | Resolves to                       |
| ------------ | --------------------------------- |
| `@`          | `src/`                            |
| `@app`       | `src/01_app/`                     |
| `@styles`    | `src/01_app/styles/`              |
| `@assets`    | `src/01_app/assets/`              |
| `@pages`     | `src/02_pages/`                   |
| `@modules`   | `src/03_modules/`                 |
| `@common`    | `src/04_common/`                  |
| `~icons/xxx` | `src/01_app/assets/icons/xxx.svg` |

## Commands

| Purpose         | Command                                               |
| --------------- | ----------------------------------------------------- |
| Dev server      | `npm run dev` (port 3000, `0.0.0.0`)                  |
| Type-check only | `npm run type-check`                                  |
| Build           | `npm run build` (runs type-check + build in parallel) |
| Lint + format   | `npm run lintfix`                                     |
| Unit tests      | `npm run test:unit`                                   |

`npm run lint` runs ESLint with `--fix --cache`. `npm run format` formats `src/` only. `npm run lintfix` runs both sequentially.

## Naming Conventions

- **Components**: PascalCase files. Design-system components in `04_common/components/` use `V` prefix (`VButton`, `VModal`, `VInput`). Module-level components do not use the `V` prefix.
- **Route pages**: `XxxView.vue` in `02_pages/`.
- **Composables**: `useXxx` pattern.
- **Pinia stores**: `useXxxStore`, setup-store syntax (arrow function returning reactive state and actions).
- **SCSS**: BEM methodology (`&__element`, `&--modifier`).

## Key Libraries

- **HTTP**: `ky` instance at `@common/api/ky.ts` — `prefixUrl` set to `VITE_API_URL`. Auth is not yet implemented; no token injection exists.
- **Async data**: `@pinia/colada` (`useQuery`, `useInfiniteQuery`) — prefer over manual `ref` + fetch for all API calls.
- **Forms**: `vee-validate 4` + `zod` schemas via `@vee-validate/zod`.
- **Icons**: `~icons/xxx` alias resolves SVGs from `01_app/assets/icons/`. Rendered as `<IXxx />` components via `unplugin-icons`.
- **i18n**: `vue-i18n 11` — Russian default, English fallback. Translation keys live in `@common/locales/ru.json` and `en.json`.
- **Rich text**: Tiptap 3 + `@tiptap/vue-3`.
- **Tables**: `@tanstack/vue-table 8` (headless).

## SCSS

`@common/styles/helpers` is auto-injected into every SCSS file via Vite config. The `rem()` function and media query mixins are available globally — no import needed.

## Environment Variables

Required in `.env`:

- `VITE_API_URL` — backend base URL (e.g. `http://localhost:4000`)
- `VITE_CURRENT_LANGUAGE` — default locale (`'ru'`)

## Git

Branch naming: `feature/xxx`, `fix/xxx`. `lefthook` runs `lint-staged` on `pre-commit` — never skip hooks.
