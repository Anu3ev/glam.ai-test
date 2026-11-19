# Tooling

Which libraries and tools the project uses, which were rejected, and how new dependencies are checked. Decisions and their dates are in the [decision log](decisions/README.md).

Packages marked "planned" are not installed yet. Install each one in the task that first needs it, not ahead of time.

## Adopted

| Need | Tool | Status |
| --- | --- | --- |
| Framework, routing, state | Vue 3, Vue Router, Pinia | Installed |
| Styling | Tailwind CSS v4, `tw-animate-css` | Installed |
| UI primitives | shadcn-vue on Reka UI, `cn`, `class-variance-authority` | Installed |
| Icons | `@lucide/vue`; Iconify (`@iconify/vue`) only for icons Lucide lacks | Lucide installed, Iconify planned |
| Menus, dialog, tabs, chips | shadcn-vue `DropdownMenu`, `Dialog`, `Tabs`, `ToggleGroup` | Planned |
| Ideas row | shadcn-vue `Carousel` (Embla) | Planned |
| Inputs and small parts | shadcn-vue `Textarea`, `Avatar`, `Badge`, `Tooltip`, `ScrollArea`, `Skeleton` | Planned |
| Toasts | shadcn-vue `Sonner` (`vue-sonner`) | Planned |
| Wishes masonry grid | CSS `columns`, no library | Planned |
| Browser and URL helpers | `@vueuse/core`, `@vueuse/router` (`useRouteQuery` for Chat/Tools mode) | Planned |
| Async state over the mock API | `@pinia/colada` | Planned |
| Mock data | Plain async functions in `src/api/` with `@faker-js/faker` | Planned |
| Animation | `motion-v` | Planned |
| Font | `@fontsource-variable/inter`, replacing the Google Fonts import | Installed |
| Tests | Playwright (installed); Vitest, `@testing-library/vue`, `@axe-core/playwright` | Partly installed |
| Code health | Fallow | Planned |

## Rejected

| Tool | Why |
| --- | --- |
| `lucide-vue-next` | Deprecated in favor of `@lucide/vue` |
| `@unpic/vue` | About 2.4k weekly downloads and no release since January 2025; plain `<img loading="lazy">` is enough |
| `json-server`, `vite-plugin-mock-dev-server` | Plain async mocks are enough; the first is still beta, the second has a small user base and one maintainer |
| MSW | Not needed until there is a real `fetch` layer to intercept |
| `@yeger/vue-masonry-wall` | CSS `columns` covers the layout without a dependency |
| Storybook, Histoire | Too heavy for one page; Histoire is still beta |
| `unplugin-auto-import`, `unplugin-vue-components` | Hidden imports make it harder to see where values come from |
| Builder.io Visual Copilot, Anima | Upload the design to a third party and produce code that needs a rewrite |
| Inspira UI | Allowed only per component after reviewing the copied code; it is copy-paste source, not a package |

## Dependency safety

Checked on 2026-11-19 for the installed tree (338 packages):

- `npm audit`: 0 known vulnerabilities.
- `npm audit signatures`: all 337 registry packages have verified signatures, 170 also have provenance attestations.
- No package runs an install-time script. Twenty packages define `prepare`, which npm does not run for registry installs.
- Every direct dependency is published from its official repository.

Rules for new dependencies:

- Before adding a package, check its repository, maintainers, release date, weekly downloads and install scripts.
- Add packages one at a time and keep `package-lock.json` committed. Use `npm ci` in automation.
- Do not upgrade to a release published the same day; account takeover of single-maintainer packages is the main supply-chain risk.
- Review copy-paste code (shadcn-vue registries, Inspira UI) like our own code.
