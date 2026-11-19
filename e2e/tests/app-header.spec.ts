import { expect, test } from '@playwright/test'

test.describe('App header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('help menu opens from the keyboard and lists support options', async ({ page }) => {
    const helpButton = page.getByRole('button', { name: 'Help' })
    await helpButton.focus()
    await page.keyboard.press('Enter')

    const menu = page.getByRole('menu')
    await expect(menu.getByRole('menuitem', { name: 'Contact Support' })).toBeVisible()
    await expect(menu.getByRole('menuitem', { name: 'Terms & Policies' })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(helpButton).toBeFocused()
  })

  test('profile menu signs the user out and back in', async ({ page }) => {
    await expect(page.getByText('15 credits left')).toBeVisible()

    await test.step('sign out from the profile menu', async () => {
      await page.getByRole('button', { name: 'Profile menu' }).click()
      await expect(page.getByText('username.example@gmail.com')).toBeVisible()
      await page.getByRole('menuitem', { name: 'Sign Out' }).click()
      await expect(page.getByRole('button', { name: 'Profile menu' })).toBeHidden()
    })

    await test.step('sign in again', async () => {
      await page.getByRole('button', { name: 'Sign in' }).click()
      await expect(page.getByRole('button', { name: 'Profile menu' })).toBeVisible()
    })
  })

  test('upgrade opens settings', async ({ page }) => {
    await page.getByRole('link', { name: 'Upgrade' }).click()
    await expect(page).toHaveURL('/settings')
  })

  test('shell matches the design', async ({ page }) => {
    await expect(page.getByRole('banner')).toHaveScreenshot('app-header.png')
    await expect(page.getByRole('complementary')).toHaveScreenshot('app-sidebar.png')
  })
})
