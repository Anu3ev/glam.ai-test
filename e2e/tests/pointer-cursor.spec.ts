import { expect, test } from '@playwright/test'

test.describe('Pointer cursor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('enabled clickable controls show the pointer', async ({ page }) => {
    const controls = [
      page.getByRole('button', { name: 'Help' }),
      page.getByRole('button', { name: 'Profile menu' }),
      page.getByRole('link', { name: 'Upgrade' }),
      page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Chat' }),
      page.getByRole('button', { name: 'Refresh ideas' }),
      page.getByRole('button', { name: 'Smart Search' }),
    ]

    for (const control of controls) {
      await expect(control).toHaveCSS('cursor', 'pointer')
    }
  })

  test('menu items in a portal show the pointer', async ({ page }) => {
    await page.getByRole('button', { name: 'Profile menu' }).click()

    await expect(page.getByRole('menuitem', { name: 'Sign Out' })).toHaveCSS('cursor', 'pointer')
  })

  test('a disabled button keeps the default cursor', async ({ page }) => {
    const sendButton = page.getByRole('button', { name: /send/i })
    await expect(sendButton).toBeDisabled()

    await expect(sendButton).not.toHaveCSS('cursor', 'pointer')
  })
})
