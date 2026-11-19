/**
 * Row style shared by the Help and Profile menus, from Figma: 40 px rows, the menu text
 * style, and a #828282 icon that turns white on the highlighted row. Figma gives rows no
 * fill, so the shadcn highlight background is removed; keyboard focus gets a ring instead,
 * because a color change of the icon alone is not a visible enough focus indicator.
 */
export const MENU_ITEM_CLASS =
  'h-10 gap-3 rounded-[10px] px-3 py-2.5 text-menu focus:bg-transparent focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-5 data-[highlighted]:[&_svg]:text-white!'
