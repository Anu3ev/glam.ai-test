import { expect, test } from '@playwright/test'

test.describe('App shell', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders sidebar, header and main landmarks', async ({ page }) => {
    await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible()
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page).toHaveTitle('Home — Artven')
  })

  test('navigates between sidebar sections', async ({ page }) => {
    const navigation = page.getByRole('navigation', { name: 'Main' })

    await test.step('open Chat', async () => {
      await navigation.getByRole('link', { name: 'Chat' }).click()
      await expect(page).toHaveURL('/chat')
      await expect(page.getByRole('heading', { level: 1, name: 'Chat' })).toBeVisible()
      await expect(navigation.getByRole('link', { name: 'Chat' })).toHaveAttribute(
        'aria-current',
        'page',
      )
      await expect(page).toHaveTitle('Chat — Artven')
    })

    await test.step('return Home', async () => {
      await navigation.getByRole('link', { name: 'Home' }).click()
      await expect(page).toHaveURL('/')
      await expect(navigation.getByRole('link', { name: 'Home' })).toHaveAttribute(
        'aria-current',
        'page',
      )
    })
  })

  test('skip link moves focus to main content', async ({ page }) => {
    await page.keyboard.press('Tab')
    const skipLink = page.getByRole('link', { name: 'Skip to content' })
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toBeVisible()

    await page.keyboard.press('Enter')
    await expect(page.getByRole('main')).toBeFocused()
  })
})
