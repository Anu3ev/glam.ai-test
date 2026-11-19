# Home page

## What is done

- `src/pages/home-page.vue` composes three section components in Figma order and holds no logic:
  - `app-home-hero`: page heading, then outlines for the Chat/Tools mode switch and the prompt composer / tools panel.
  - `app-ideas-section`: "Ideas for You" heading and an outline for the idea cards.
  - `app-wishes-section`: "Wishes" heading and outlines for the category filter and the wish grid.
- Each section is a `section` labelled by its heading; the page has one `h1`.
- Outlines use the temporary `app-section-placeholder` component, which names the block and its planned contents.
- Open: every block's real UI, the data model, the mock API and the stores. See the [plan](plan.md).

## Why it works this way

- The first iteration shows only the page structure, so the section boundaries can be reviewed before any UI is built.
- Section components already exist, so each block can be built and reviewed separately without touching the page.
- `app-section-placeholder` is meant to disappear: each usage is deleted when its block is built.

## Where to read more

- [Plan and design inventory](plan.md)
- [Decision log](../../decisions/README.md)
