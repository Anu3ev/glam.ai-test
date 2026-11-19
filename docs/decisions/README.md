# Decision log

Newest first. A changed decision gets a new entry that links to the old one.

## 2026-11-19 · Placeholder outlines instead of inert controls

- **Decision:** Iteration 1 shows each planned block as a dashed outline (`app-section-placeholder`) with its name and contents. No buttons are rendered until their behavior exists.
- **Why:** The owner asked to see only the structure first. Buttons without behavior would mislead users and assistive technology.
- **Cost:** The header and sections look empty until each block is built; the placeholder component must be removed afterwards.

## 2026-11-19 · Sidebar destinations open a placeholder page

- **Decision:** Chat, Saved, Results and Settings are real routes that render a shared `placeholder-page.vue`. The sidebar Search entry is left out until it has behavior.
- **Why:** Navigation, active-link state and document titles can be checked now without building out-of-scope screens.
- **Cost:** Four routes exist only as stubs; Search is missing from the sidebar for now.

## 2026-11-19 · One app layout around every route

- **Decision:** `app.vue` wraps `RouterView` in `app-layout`: sidebar on the left, header on top of the content column, and only `main` scrolls. A skip link moves focus to `main`.
- **Why:** Every page in Figma shares this shell. Scrolling only `main` keeps navigation in view, as in the design.
- **Cost:** A page that needs a different layout will require per-route layouts.

## 2026-11-19 · Dark-only theme

- **Decision:** `<html class="dark">` is set in `index.html`. shadcn-vue's neutral tokens are a stand-in until the Figma tokens replace them (plan step 2).
- **Why:** The Figma UI Kit defines only a dark palette.
- **Cost:** No light theme; the light token block from shadcn-vue is unused until removed.

## 2026-11-19 · Component folders with `index.vue`

- **Decision:** Application components live in `src/components/app-<name>/index.vue`; pages are kebab-case files in `src/pages/`; `src/App.vue` is renamed to `src/app.vue`. ESLint `vue/multi-word-component-names` ignores `index`.
- **Why:** Same convention as the owner's other Vue projects. Each component's children, composables and types can stay inside its folder.
- **Cost:** Imports name the folder and `index.vue` explicitly; the lint rule needs an exception.

## 2026-11-19 · Lucide icons from `@lucide/vue`

- **Decision:** Use `@lucide/vue` and pass `aria-hidden="true"` on decorative icons.
- **Why:** The owner asked for Lucide. `lucide-vue-next` is deprecated on npm in favor of `@lucide/vue`.
- **Cost:** shadcn-vue components added later may import `lucide-vue-next`; check and switch their imports when adding them.

## 2026-11-19 · Tailwind CSS v4 and shadcn-vue

- **Decision:** Tailwind v4 through `@tailwindcss/vite`; shadcn-vue initialized with Reka UI, the `new-york` style, neutral base color, CSS variables and Inter. `cn` comes from shadcn's `cn` package. The root `tsconfig.json` repeats the `@/*` path so the shadcn-vue CLI finds the alias.
- **Why:** The owner chose Tailwind and shadcn. CSS variables let the Figma tokens replace the defaults in one file.
- **Cost:** shadcn-vue imports Inter from Google Fonts (an external request; see the open question in the home page plan). The alias is defined in two tsconfig files.

## 2026-11-19 · Vue 3 scaffold from `create-vue`

- **Decision:** Scaffold with `create-vue` (TypeScript, Router, Pinia, ESLint, oxlint, Prettier). Keep its TypeScript `~6.0` instead of the newer TypeScript 7.
- **Why:** `create-vue` pins versions that work together; TypeScript 7 compatibility with `vue-tsc` has not been verified.
- **Cost:** Upgrading TypeScript later needs its own check. Local Node 25 prints engine warnings for some tools; an LTS Node is recommended.

## 2026-11-19 · Scope: home screen with mocked backend

- **Decision:** Build only the home screen from the Figma file. All data and backend behavior are mocked.
- **Why:** Owner's requirement for this project.
- **Cost:** Other Figma pages (Chat, Results, System) stay out of scope; mocks must be replaced for production use.
