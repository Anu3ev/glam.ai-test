import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { TEXT_STYLES } from '../../src/lib/utils'

/**
 * `cn` only treats registered names as text styles; an unregistered `--text-*` token is merged
 * as a color and dropped. This check needs no browser.
 */
test('every --text-* token in style.css is registered in cn', () => {
  const css = readFileSync(new URL('../../src/assets/style.css', import.meta.url), 'utf8')
  const tokens = [...css.matchAll(/^\s*--text-([a-z]+):/gm)].map((match) => match[1])

  expect([...tokens].sort()).toEqual([...TEXT_STYLES].sort())
})
