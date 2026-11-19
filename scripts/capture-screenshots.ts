/// <reference lib="dom" />
// `page.evaluate` callbacks run in the browser, so this script also needs DOM types.
/**
 * Saves README screenshots of the home page to `docs/screenshots/`.
 * Uses the production build, so dev-only overlays such as Vue DevTools stay out:
 *
 *   npm run build-only && npx vite preview --port 5192
 *
 * Then run:
 *
 *   node scripts/capture-screenshots.ts [baseUrl]
 */
import { mkdir } from 'node:fs/promises'
import { chromium, type Page } from '@playwright/test'

const baseUrl = process.argv[2] ?? 'http://localhost:5192'
const outputDir = 'docs/screenshots'

/** Desktop size of the Figma frames. */
const VIEWPORT = { width: 1280, height: 900 }

/** Waits until the mock data and lazy images of the page have loaded. */
async function waitForContent(page: Page): Promise<void> {
  await page.getByRole('heading', { level: 1 }).waitFor()
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)
}

/** Waits until every image on the page has loaded, including lazy images inside a just-opened dialog. */
async function waitForImages(page: Page): Promise<void> {
  await page.waitForFunction(() =>
    [...document.images].every((image) => image.complete && image.naturalWidth > 0),
  )
}

/** Waits until opening animations end, so dialogs and menus are captured fully opaque. */
async function waitForAnimations(page: Page): Promise<void> {
  await page.evaluate(() =>
    Promise.all(document.getAnimations().map((animation) => animation.finished)),
  )
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 })
await mkdir(outputDir, { recursive: true })

await page.goto(baseUrl)
await waitForContent(page)
await page.screenshot({ path: `${outputDir}/home-chat.png` })

// GitHub shows the social preview at 1280×640; it is taken from the top of the page.
await page.screenshot({
  path: `${outputDir}/social-preview.png`,
  clip: { x: 0, y: 0, width: 1280, height: 640 },
  scale: 'css',
})

await page.goto(`${baseUrl}/?mode=tools`)
await waitForContent(page)
await page.screenshot({ path: `${outputDir}/home-tools.png` })

await page.getByRole('button', { name: 'Smart Search' }).click()
await page.getByRole('dialog').waitFor()
await waitForImages(page)
await waitForAnimations(page)
await page.screenshot({ path: `${outputDir}/smart-search.png` })
await page.keyboard.press('Escape')
await page.getByRole('dialog').waitFor({ state: 'detached' })

await page.getByRole('button', { name: 'Profile menu' }).click()
await page.getByRole('menu').waitFor()
await waitForAnimations(page)
await page.screenshot({ path: `${outputDir}/profile-menu.png` })

await browser.close()
console.log(`Saved screenshots to ${outputDir}`)
