import { createCn } from 'cn/config'

/** Text style names defined as `--text-*` in `src/assets/style.css`. */
const TEXT_STYLES = [
  'hero',
  'section',
  'idea',
  'account',
  'control',
  'menu',
  'composer',
  'promo',
  'meta',
  'mode',
  'caption',
  'nav',
]

/**
 * Class merger that knows the project's text styles. Without them, `text-control` looks like a
 * color to the merger and is dropped next to `text-white`. A text style sets size, weight, line
 * height and tracking at once, so it replaces those classes from a primitive's base (for example
 * Button's `text-sm font-medium`).
 */
export const cn = createCn({
  extend: {
    classGroups: { 'text-style': [{ text: TEXT_STYLES }] },
    conflictingClassGroups: { 'text-style': ['font-size', 'font-weight', 'leading', 'tracking'] },
  },
})
