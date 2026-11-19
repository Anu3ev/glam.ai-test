# App shell

## What is done

- Every route renders inside `app-layout`: a fixed sidebar on the left and a content column with the header on top.
- Only `main` scrolls; the sidebar and header stay in place.
- The sidebar has links to Home, Chat, Saved, Results and Settings, with Lucide icons, visible labels and `aria-current="page"` on the active link. Settings sits below a divider, as in Figma.
- Chat, Saved, Results and Settings open a shared placeholder page, because they are outside the current scope.
- The header shows the wordmark and a placeholder for the account actions (help, credits, upgrade, profile).
- A skip link appears on the first Tab and moves focus to `main`.
- The document title follows the route: `Home — Artven`.
- Open: Figma colors and sizes, the sidebar Search entry, the Results unread dot, the real logo and all header actions.

## Why it works this way

- One layout component wraps `RouterView` in `app.vue`, since every page shares the same shell. A per-route layout can be added if a page ever needs a different one.
- Placeholder pages keep sidebar navigation testable now without building out-of-scope screens.
- Header actions are a labelled outline rather than inert buttons: controls appear only together with their behavior.
- The wordmark icon is a Lucide placeholder until the logo is exported from Figma.

## Where to read more

- Decisions: [decision log](../../decisions/README.md)
- Code: `src/components/app-layout`, `app-sidebar`, `app-header`, `src/router/index.ts`
