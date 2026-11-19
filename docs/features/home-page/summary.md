# Home page

## What is done

- `src/pages/home-page.vue` composes three section components in Figma order and holds no logic:
  - `app-home-hero`: page heading, the Chat/Tools mode switch (stored in `?mode=tools`), the prompt composer in Chat mode and the tools panel in Tools mode. Send only clears the field and picking a tool opens Chat mode; there is no backend yet.
  - `app-ideas-section`: "Ideas for You" heading with a refresh button that reshuffles the cards, and a horizontal scroll-snap row of idea cards with a right-edge fade. Data comes from the mock `fetchIdeas` (`src/api/ideas.ts`) through `useIdeasStore`; skeleton cards show while it loads. A card's "+" button stores the chosen idea as `selectedIdeaId`.
  - `app-wishes-section`: "Wishes" heading and outlines for the category filter and the wish grid.
- Each section is a `section` labelled by its heading; the page has one `h1`.
- Outlines use the temporary `app-section-placeholder` component, which names the block and its planned contents.
- Open: the Wishes block's real UI, data and store. See the [plan](plan.md).

## Why it works this way

- The first iteration shows only the page structure, so the section boundaries can be reviewed before any UI is built.
- Section components already exist, so each block can be built and reviewed separately without touching the page.
- `app-section-placeholder` is meant to disappear: each usage is deleted when its block is built.

## Where to read more

- [Plan and design inventory](plan.md)
- [Decision log](../../decisions/README.md)
