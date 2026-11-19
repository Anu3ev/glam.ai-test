import { expect, test } from '@playwright/test'

/** Values from the Figma file (Home/Chat, Pop-up section and UI Kit Segment states). */
test.describe('Design fidelity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('mode switch pills are fully rounded and hover adds no fill', async ({ page }) => {
    const tools = page
      .getByRole('group', { name: 'Create mode' })
      .getByRole('button', { name: 'Tools' })
    const chat = page
      .getByRole('group', { name: 'Create mode' })
      .getByRole('button', { name: 'Chat' })

    for (const pill of [chat, tools]) {
      await expect(pill).toHaveCSS('border-radius', '16px')
      await expect(pill).toHaveCSS('height', '32px')
    }

    await tools.hover()
    await expect(tools).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await expect(chat).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  })

  test('category chips are pills without an invented hover fill', async ({ page }) => {
    const food = page
      .getByRole('group', { name: 'Wish categories' })
      .getByRole('button', { name: 'Food' })

    await expect(food).toHaveCSS('border-radius', '24px')
    await food.hover()
    await expect(food).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  })

  test('prompt text is 13 px on desktop', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'Prompt' })).toHaveCSS('font-size', '13px')
  })

  test('Smart Search dialog matches the pop-up frame', async ({ page }) => {
    await page.getByRole('button', { name: 'Smart Search' }).click()
    const dialog = page.getByRole('dialog', { name: 'Smart Search' })

    await expect(dialog).toHaveCSS('border-radius', '20px')
    await expect(dialog).toHaveCSS('padding-top', '20px')
    await expect(dialog).toHaveCSS('background-color', 'rgb(23, 23, 23)')
    await expect(dialog.getByRole('button', { name: 'Close Smart Search' })).toHaveCSS(
      'width',
      '32px',
    )
  })

  test('menu rows use 13 px text and no highlight fill', async ({ page }) => {
    await page.getByRole('button', { name: 'Profile menu' }).click()
    const row = page.getByRole('menuitem', { name: 'View Profile' })

    await row.hover()
    await expect(row).toHaveCSS('font-size', '13px')
    await expect(row).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  })

  test('text styles carry the Figma tracking, weight and color', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toHaveCSS('font-size', '28px')
    await expect(heading).toHaveCSS('letter-spacing', '-1px')
    await expect(heading).toHaveCSS('font-weight', '500')

    const sectionTitle = page.getByRole('heading', { name: 'Ideas for You' })
    await expect(sectionTitle).toHaveCSS('letter-spacing', '-0.3px')
    await expect(sectionTitle).toHaveCSS('color', 'rgb(242, 242, 242)')

    const chat = page
      .getByRole('group', { name: 'Create mode' })
      .getByRole('button', { name: 'Chat' })
    await expect(chat).toHaveCSS('font-size', '13px')
    await expect(chat).toHaveCSS('font-weight', '600')

    await expect(page.getByRole('button', { name: 'Model: Auto' })).toHaveCSS('font-size', '12px')
  })

  test('icons use the Figma stroke width and color', async ({ page }) => {
    const helpIcon = page.getByRole('button', { name: 'Help' }).locator('svg')

    await expect(helpIcon).toHaveCSS('stroke-width', '1.4px')
    await expect(helpIcon).toHaveCSS('color', 'rgb(255, 255, 255)')
  })

  test('sidebar labels keep their size and color', async ({ page }) => {
    const chat = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Chat' })

    await expect(chat).toHaveCSS('font-size', '9px')
    await expect(chat).toHaveCSS('color', 'rgb(130, 130, 130)')
  })

  test('the page reflows without horizontal scrolling at 320 px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 })
    await expect(page.getByRole('button', { name: 'Profile menu' })).toBeInViewport()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
    expect(overflow).toBe(0)
  })

  test('the Smart Search dialog keeps a side gutter at 320 px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 })
    await page.getByRole('button', { name: 'Smart Search' }).click()

    const box = await page.getByRole('dialog', { name: 'Smart Search' }).boundingBox()
    expect(box?.x).toBeGreaterThanOrEqual(16)
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(320 - 16)
  })
})
