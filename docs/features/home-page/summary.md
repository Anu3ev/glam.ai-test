# Home page

## What is done

- `src/pages/home-page.vue` composes three section components in Figma order and holds no logic. Sizes, gaps, radii and colors come from the Figma node data.
  - `app-home-hero`: heading, the Chat/Tools mode switch (stored in `?mode=tools`), the prompt composer in Chat mode and the tools panel in Tools mode. Send only clears the field and picking a tool opens Chat mode; there is no backend.
  - `app-ideas-section`: "Ideas for You" with a refresh button that reshuffles the cards, and a horizontal scroll-snap row with a right-edge fade. Data comes from the mock `fetchIdeas` through `useIdeasStore`; skeleton cards show while it loads. "+" stores the chosen idea as `selectedIdeaId`.
  - `app-wishes-section`: category chips, a Smart Search dialog that filters by content type, and a CSS columns masonry grid with save and Use actions. Data comes from the mock `fetchWishes` through `useWishesStore`.
- Each section is a `section` labelled by its heading; the page has one `h1`.
- Every section has Playwright tests for its behavior and a screenshot check.
- Open: the Smart Search "Add Profile" tile is a non-interactive placeholder and product profiles do not filter the grid. Images are placeholders from picsum.photos. Gradient stops are approximated because the Figma data names the gradients without their stops.

## Why it works this way

- Each section owns its folder, so it could be built, reviewed and merged on its own branch.
- Stores call only `src/api/`, so a real backend can replace the mocks without touching the components.
- Stores keep only the latest request's result, so a slow response cannot overwrite a newer filter.

## Where to read more

- [Plan and design inventory](plan.md)
- [Decision log](../../decisions/README.md)
