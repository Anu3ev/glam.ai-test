import { expect, test } from '@playwright/test'

test.describe('Home wishes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('list', { name: 'Wishes' }).getByRole('listitem')).toHaveCount(30)
  })

  test('category chip filters tiles', async ({ page }) => {
    const tiles = page.getByRole('list', { name: 'Wishes' }).getByRole('listitem')
    const categories = page.getByRole('group', { name: 'Wish categories' })

    await test.step('select Food', async () => {
      await categories.getByTitle('Show Food wishes').click()
      await expect(tiles).not.toHaveCount(30)
      await expect(tiles.first().getByRole('img')).toHaveAttribute('alt', /^Food Style/)
    })

    await test.step('return to For you', async () => {
      await categories.getByTitle('Show For you wishes').click()
      await expect(tiles).toHaveCount(30)
    })
  })

  test('bookmark toggles aria-pressed', async ({ page }) => {
    const save = page.getByRole('button', { name: 'Save Food Style 1', exact: true })
    await expect(save).toHaveAttribute('aria-pressed', 'false')

    await save.click()
    const remove = page.getByRole('button', { name: 'Remove Food Style 1 from saved', exact: true })
    await expect(remove).toHaveAttribute('aria-pressed', 'true')

    await remove.click()
    await expect(save).toHaveAttribute('aria-pressed', 'false')
  })

  test('Smart Search filters by content type and returns focus', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Smart Search' })
    const dialog = page.getByRole('dialog', { name: 'Smart Search' })
    const tiles = page.getByRole('list', { name: 'Wishes' }).getByRole('listitem')

    await test.step('open the dialog with the keyboard', async () => {
      await trigger.focus()
      await page.keyboard.press('Enter')
      await expect(dialog).toBeVisible()
      await expect(
        dialog.getByText('Use a product profile to see only relevant styles'),
      ).toBeVisible()
    })

    await test.step('select Photo and find templates', async () => {
      const photo = dialog.getByRole('button', { name: 'Photo', exact: true })
      await photo.click()
      await expect(photo).toHaveAttribute('aria-pressed', 'true')
      await dialog.getByRole('button', { name: 'Find Templates' }).click()
    })

    await test.step('dialog closes, grid is filtered, focus is back on the trigger', async () => {
      await expect(dialog).toBeHidden()
      await expect(tiles).toHaveCount(3)
      await expect(trigger).toBeFocused()
    })
  })

  test('category row matches the design', async ({ page }) => {
    await expect(page.getByTestId('wishes-categories')).toHaveScreenshot(
      'home-wishes-categories.png',
    )
  })
})
