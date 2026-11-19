# Decision log

Newest first. A changed decision gets a new entry that links to the old one.

## 2026-11-19 · Modern Web Guidance was not used during the build

- **Decision:** Correction of [Modern Web Guidance without installing](#2026-11-19--modern-web-guidance-without-installing): the CLI was checked but never consulted while building the page. From now on, the user's `code-writer` skill makes it mandatory before UI, CSS or client-side browser code: pinned version, `DISABLE_TELEMETRY=1`, no installation, and the user's rules and project decisions take priority over its guides.
- **Why:** The earlier entry described an intention as if it were practice.
- **Cost:** The existing components have not been checked against the guidance yet.


## 2026-11-19 · Releases deploy the demo

- **Decision:** `.github/workflows/release.yml` replaces the deploy-on-every-push Pages workflow. After CI passes for a push to `main` of this repository (not pull request or fork runs), a commit whose `package.json` version has no release yet is built by a read-only job, deployed to GitHub Pages, and then published as the GitHub Release `v<version>` with notes generated from the merged pull requests. The version must be `X.Y.Z` and greater than the latest release. A manual run redeploys the latest release. The version starts at 1.1.0 (the design fidelity work after `v1.0.0`). Replaces the deploy part of [Tests, CI and preview](#2026-11-19--tests-ci-and-preview).
- **Why:** The demo should match a named version, and each version should have notes. Before this, `v1.0.0` was made by hand and `package.json` said `0.0.0`.
- **Cost:** A change reaches the demo only when its pull request bumps the version. GitHub keeps one queued run, so when several bumps merge during a release, the middle one gets no tag; its pull requests appear in the next release's notes.

## 2026-11-19 · Design fidelity pass against Figma

- **Decision:** A read-only audit compared every control with the Figma data, with a skeptic verifying each finding; 25 confirmed mismatches were fixed. Among them: mode switch and chips lost their pill radius to shadcn's `data-[spacing=0]` corner rules (fixed with `:spacing="1"`), invented hover fills were removed (Figma defines no hover state), the Smart Search dialog, menus, tile caption and gradients now use the Figma values, and the page content is 1216 px wide. `e2e/tests/design-fidelity.spec.ts` checks the computed values.
- **Why:** The first build compared screenshots only with baselines it had recorded itself, so it could not catch differences from the mockup.
- **Cost:** Deliberate deviations: the fade over the last tools row is left out (it would dim the only row on the Image and Video tabs), the logo stays a Lucide placeholder, and Lucide icons stand in for the Figma icon set.

## 2026-11-19 · Text styles as tokens

- **Decision:** Each Figma text style is a `--text-<role>` token in `src/assets/style.css` with size, line height, letter spacing and weight; components use only `text-<role>` plus the `title` and `subtle` color tokens; the one exception is the text wordmark that stands in for the Figma logo graphic. `e2e/tests/text-styles.spec.ts` checks that the CSS tokens and the `cn` list match. `src/lib/utils.ts` registers the names in `cn`, and ESLint forbids importing `cn` from the package directly. Figma's "Balance" and "Sidebar" styles are named `account` and `nav`, because `text-balance` is a Tailwind utility and `text-sidebar` collides with the `sidebar` color token.
- **Why:** Headings looked heavier than the design because each component retyped sizes and dropped letter spacing. The default `cn` dropped unknown `text-*` classes next to a color and kept primitives' base `font-medium`.
- **Cost:** A new text style needs an entry in both files; the shadcn CLI keeps generating `from 'cn'`, which lint now rejects until the import is changed.

## 2026-11-19 · Theme radius steps and icon strokes

- **Decision:** `--radius-xl` to `--radius-4xl` keep Tailwind's standard 12/16/24/32 px instead of shadcn's 14/18/22/26 px. All Lucide icons draw 1.4 px strokes at every size through a base CSS rule.
- **Why:** Only app components use those radius steps, and Figma's pills are 16 and 24 px; Figma icons use 1.4 px strokes.
- **Cost:** shadcn components added later that use `rounded-xl` and above get the standard values.

## 2026-11-19 · Sidebar Search opens a placeholder page

- **Decision:** The Figma sidebar Search entry is an icon-only link to a `/search` placeholder page, like the other out-of-scope destinations. Replaces "Search is left out" in [Sidebar destinations open a placeholder page](#2026-11-19--sidebar-destinations-open-a-placeholder-page).
- **Why:** The sidebar layout needs the entry to match Figma, and a placeholder route gives it real behavior.
- **Cost:** One more stub route.

## 2026-11-19 · Narrow screens and committed visual baselines

- **Decision:** Below 640 px the header shows the logo mark without the wordmark, hides the divider and the credit count, and keeps every action; the page has no horizontal scroll at 320 px. Screenshot baselines are rendered in CI and committed as `*-ci.png` in `e2e/tests/__screenshots__`; CI compares against them. Local runs write git-ignored `*-local.png` files.
- **Why:** Figma has no mobile frame, but the page must reflow at 320 px. Baselines from the CI environment avoid font-rendering differences between machines.
- **Cost:** A UI change needs new baselines from CI (the CI artifact `screenshot-baselines`).

## 2026-11-19 · README screenshots from the production build

- **Decision:** `scripts/capture-screenshots.ts` captures the README screenshots and the GitHub social preview from `vite preview` at 1280 px and waits for opening animations to end. The images are committed in `docs/screenshots/`.
- **Why:** The dev server adds the Vue DevTools button, and a capture during a fade-in shows half-transparent dialogs. A script makes the images reproducible after design changes.
- **Cost:** About 5 MB of PNG files in the repository; they must be recaptured when the UI changes.

## 2026-11-19 · Pointer cursor on clickable controls

- **Decision:** A base rule in `src/assets/style.css` gives every enabled button, menu item, tab, option, `summary` and `select` the pointer cursor; disabled controls keep the default one. The generated shadcn-vue menu items use `cursor-pointer`, and `components.json` has `"pointer": true` so new components are generated the same way.
- **Why:** Owner's rule. Tailwind v4 resets buttons to the default cursor and shadcn-vue menu items set `cursor-default`, so working controls looked inert.
- **Cost:** Generated menu files differ from the CLI output of the `"pointer": false` style; re-adding them with the CLI keeps the pointer only because of the `components.json` setting.

## 2026-11-19 · Smart Search filters locally in the mock API

- **Decision:** `fetchWishes({ category, contentTypes })` in `src/api/wishes.ts` filters 30 generated wishes by category and Smart Search content types after a 300 ms delay. The store keeps the applied filters and reloads through the same call.
- **Why:** The component code already calls the API with real parameters, so a backend can replace the mock without touching the UI.
- **Cost:** Product profiles are selectable but do not filter yet; there is no profile data to filter by.

## 2026-11-19 · CSS columns masonry

- **Decision:** The wish grid is a `ul` with CSS `columns` (5 at 1280 px, 8 px gap) and `break-inside: avoid` tiles.
- **Why:** Tiles of different heights pack without JavaScript measuring or a layout library.
- **Cost:** Items flow top to bottom per column, so reading order goes down each column, not across rows.

## 2026-11-19 · Mock API and Pinia store pattern

- **Decision:** Section data comes from typed mock functions in `src/api` (types in `src/types`) that resolve after a short delay, and a Pinia setup store in `src/stores` holds the data, `isLoading` and the actions. Components load on mount and render from the store. "Ideas for You" is the first case (`fetchIdeas`, `useIdeasStore`).
- **Why:** Components never know where data comes from, so a real backend replaces only the `src/api` function; the delay keeps loading states visible and testable.
- **Cost:** Each data source adds three small files; the mock data lives in the bundle until a backend exists.

## 2026-11-19 · Native scroll-snap row instead of a carousel

- **Decision:** The idea cards row is a `ul` with `overflow-x-auto` and CSS scroll-snap, plus a decorative right-edge fade. No carousel library.
- **Why:** Native scrolling works with touch, trackpad and keyboard focus out of the box and adds no dependency.
- **Cost:** No prev/next arrows or pagination dots; adding them later means writing a small scroll helper.

## 2026-11-19 · Chat/Tools mode in the URL query

- **Decision:** The home hero keeps its Chat/Tools mode in `?mode=tools` (no query means Chat), read and written through vue-router in `app-home-hero/use-hero-mode.ts`. Switching uses `router.replace`.
- **Why:** A link or reload opens the same mode, and no store is needed for one value that only the hero uses.
- **Cost:** Other query parameters must be preserved when the mode changes; switching does not add browser history entries.

## 2026-11-19 · Header actions with a mock user

- **Decision:** A Pinia `user` store holds a mock account (name, email, 15 credits). The Profile menu's Sign Out clears it and the header shows "Sign in", which restores it. Upgrade and the account links open Settings; Contact Support is a `mailto:` link. Menus use shadcn-vue `DropdownMenu`. The sidebar Search entry stays out until it has behavior.
- **Why:** Every control in the Figma header works without a backend, and no button is inert. Reka UI menus give keyboard support and focus return.
- **Cost:** Account pages are stand-ins until they are designed.

## 2026-11-19 · Tests, CI and preview

- **Decision:** Playwright (Chromium, 1280 px viewport) covers behavior and visual screenshots in `e2e/tests`. CI runs lint, type-check, build and Playwright on every PR. Every push to `main` deploys a preview to GitHub Pages (<https://anu3ev.github.io/glam.ai-test/>), with `404.html` as the SPA fallback. Node 24 LTS is pinned in `.nvmrc`.
- **Why:** Each PR is merged only after automated checks; reviewers get a live link without running the app.
- **Cost:** Screenshot baselines are git-ignored for now, so CI records them (`--update-snapshots=missing`) and visual diffs are only compared locally. Committing CI-generated baselines is open.

## 2026-11-19 · Design values from the Figma REST API

- **Decision:** `scripts/fetch-figma.ts` saves the home page frames to `.figma-cache/nodes.json` with one Tier 1 request, using a read-only token from `.env.local`. The cache is git-ignored. Images stay placeholders.
- **Why:** Exact gaps and sizes need the node data; a View seat allows 20 such requests a month, so one cached call is enough. The repository is public, so design data is not committed.
- **Cost:** Each developer needs their own token to refresh the cache.

## 2026-11-19 · Modern Web Guidance without installing

- **Decision:** Use `npx modern-web-guidance@1.0.1 search | retrieve | legacy-scan` for web platform guidance instead of its `install` wizard.
- **Why:** The package is official (Google Chrome team), but `install` changes the agent configuration; the read-only commands give the same guidance.
- **Cost:** Guidance is looked up per task rather than loaded automatically.

## 2026-11-19 · Dependency safety rules

- **Decision:** Every new package is checked before it is added (repository, maintainers, release date, downloads, install scripts). Packages are added one at a time, the lockfile is committed, and same-day releases are not installed. Details: [tooling](../tooling.md#dependency-safety).
- **Why:** The installed tree is clean today. Account takeover of single-maintainer packages is the realistic risk.
- **Cost:** Adding a dependency takes a few minutes of checking.

## 2026-11-19 · Library choices for the home page

- **Decision:** Use shadcn-vue components for menus, dialog, tabs, chips, carousel and toasts; VueUse; Pinia Colada over plain async mocks with Faker; `motion-v`; self-hosted Inter; CSS `columns` for the masonry grid; Vitest, Testing Library, Playwright and axe for tests. Rejected tools and reasons: [tooling](../tooling.md).
- **Why:** Each one removes real work for a specific part of the mockup and is widely used and maintained. Rejected tools were beta, barely used, unnecessary for one page, or hid imports.
- **Cost:** More dependencies to keep updated; each is installed only in the task that first needs it.

## 2026-11-19 · Self-host Inter

- **Decision:** Replace the Google Fonts import that shadcn-vue added with `@fontsource-variable/inter`.
- **Why:** The Google request sends every visitor's IP address to a third party; a self-hosted font also loads without an extra origin.
- **Cost:** Font files are part of the build output.

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
