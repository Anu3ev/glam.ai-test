# Home page: plan

Status: structure done · Next: design tokens and app shell visuals

Mockup: Figma "Artven Web Studio (Test)", page "Home Page" (view-only link, available to the project owner): <https://www.figma.com/design/kU4QjBSdDHbwSVZLSm9VTL/Artven-Web-Studio--Test-?node-id=1-3>

## Goal

Build the Artven home screen from the Figma design. All data and backend behavior are mocked.

## Design inventory

The Figma file has five pages: UI Kit, Home Page, Chat, Results, System. Only Home Page and the parts of UI Kit it uses are in scope.

| Block | Contents in Figma |
| --- | --- |
| Sidebar | Search, Home, Chat, Saved, Results (unread dot), divider, Settings |
| Header | Logo, help button → Help menu, credits counter + Upgrade, avatar → Profile menu |
| Hero | "What will you create next?" and a Chat / Tools switch |
| Chat mode | "Unlock more features with Pro" banner, prompt field, attach `+`, model select "Auto", send |
| Tools mode | Popular / Image / Video tabs; tools: Create Image, Create Video, Edit Image, Extend Video, Motion Swap, Lipsync |
| Ideas for You | Horizontal row of cards (image, title, subtitle, `+`), refresh button, right-edge fade |
| Wishes | Category chips (For you, Food, Jewelry, Bags, Clothing, …), Smart Search button, masonry grid of tiles (image, bookmark, style name, "Use" on hover) |
| Help menu | Contact Support, Terms & Policies |
| Profile menu | Username, email, View Profile, Subscriptions, Manage Account, Credits History, Sign Out; only for a signed-in user |
| Smart Search | Product profiles, content type chips (Photo, Video, Photoshoot, Post, …), "Find Templates"; sorts the Wishes grid |

UI Kit: dark-only palette ("Solid Universal Grey" with 8 shades, purple and red accents, gradients for the chat bar, logo, token chip, Ideas background, scroll fade and tile caption), Inter type scale (titles 28/40, 18/26, 15/18; seven body styles from 14 down to 9 px), components Idea card, Tile, Segment chip.

Design frames are desktop only (1280 px wide).

## What we build, in order

| Step | Task | Depends on | Why this order |
| --- | --- | --- | --- |
| 1 | Project structure and page sections (done) | — | Agree on boundaries before UI |
| 2 | Design tokens from UI Kit in `style.css` | 1 | Every block uses them |
| 3 | App shell visuals: sidebar, header, Help and Profile menus | 2 | Visible on every page |
| 4 | Types, mock API and Pinia stores | 1 | Sections need data |
| 5 | Hero: mode switch, prompt composer, tools panel | 2, 4 | Main entry point |
| 6 | Ideas for You | 2, 4 | Independent section |
| 7 | Wishes: categories, grid, Smart Search | 2, 4 | Largest section, uses the dialog |

## Proposed data contract (to confirm in step 4)

- `src/types/`: `User`, `Tool`, `ToolCategory`, `Idea`, `Wish`, `WishCategory`, `ContentType`, `ProductProfile`.
- `src/api/`: async functions with a short artificial delay, one module per domain. Stores call only these, so a real HTTP client can replace them without touching components.
- `src/stores/`: `user` (profile, credits, plan), `tools`, `ideas`, `wishes` (active category, Smart Search filters, saved ids), `composer` (prompt draft, selected model).
- Chat / Tools mode lives in the URL query (`/?mode=tools`) so reload and Back keep it.

## Open questions

| Question | Where it is decided | Current proposal |
| --- | --- | --- |
| Edit or Dev Mode access to Figma, exported images and icons | Owner | Request access; until then use Lucide icons and placeholder images |
| Mobile and tablet layouts | Owner | Desktop first; keep layouts fluid down to 320 px |
| Initial auth state of the mock user | Owner | Signed in, so the Profile menu is reachable |
| Inter from Google Fonts or self-hosted | Step 2 | Self-host with `@fontsource/inter` to avoid the external request |

## Done when

- The home page matches the Figma frames at 1280 px for both Chat and Tools modes.
- Every control works with mock data, by mouse and keyboard, with accessible names and `title` hints.
- `npm run build` and `npx eslint src` pass.
