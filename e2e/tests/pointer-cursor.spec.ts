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

  test('tabs, toggles and chips show the pointer', async ({ page }) => {
    await test.step('mode switch and category chips', async () => {
      await expect(
        page.getByRole('group', { name: 'Create mode' }).getByRole('button', { name: 'Tools' }),
      ).toHaveCSS('cursor', 'pointer')
      await expect(
        page.getByRole('group', { name: 'Wish categories' }).getByRole('button', { name: 'Food' }),
      ).toHaveCSS('cursor', 'pointer')
    })

    await test.step('tools tabs and tool rows', async () => {
      await page.goto('/?mode=tools')
      const tabs = page.getByRole('tab')
      await expect(tabs).not.toHaveCount(0)
      for (const tab of await tabs.all()) {
        await expect(tab).toHaveCSS('cursor', 'pointer')
      }
      await expect(page.getByRole('button', { name: /Create Image/ })).toHaveCSS(
        'cursor',
        'pointer',
      )
    })

    await test.step('Smart Search chips', async () => {
      await page.getByRole('button', { name: 'Smart Search' }).click()
      await expect(
        page.getByRole('dialog').getByRole('button', { name: 'Photo', exact: true }),
      ).toHaveCSS('cursor', 'pointer')
    })
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
