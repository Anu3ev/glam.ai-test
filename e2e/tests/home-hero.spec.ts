import { expect, test } from '@playwright/test'

test.describe('Home hero', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('mode switch updates the URL and shows the tools panel', async ({ page }) => {
    const modeSwitch = page.getByRole('group', { name: 'Create mode' })

    await test.step('switch to Tools', async () => {
      await modeSwitch.getByRole('button', { name: 'Tools' }).click()
      await expect(page).toHaveURL('/?mode=tools')
      await expect(page.getByRole('tablist', { name: 'Tool categories' })).toBeVisible()
      await expect(page.getByRole('form', { name: 'Prompt composer' })).toBeHidden()
    })

    await test.step('switch back to Chat', async () => {
      await modeSwitch.getByRole('button', { name: 'Chat' }).click()
      await expect(page).toHaveURL('/')
      await expect(page.getByRole('form', { name: 'Prompt composer' })).toBeVisible()
    })
  })

  test('tabs filter the tools', async ({ page }) => {
    await page.goto('/?mode=tools')
    const tools = page.getByRole('tabpanel').getByRole('button')

    await test.step('Popular lists every tool', async () => {
      await expect(tools).toHaveCount(6)
    })

    await test.step('Image lists image tools', async () => {
      await page.getByRole('tab', { name: 'Image' }).click()
      await expect(tools).toHaveText([/Create Image/, /Edit Image/])
    })

    await test.step('Video lists video tools', async () => {
      await page.getByRole('tab', { name: 'Video' }).click()
      await expect(tools).toHaveText([/Extend Video/, /Create Video/, /Motion Swap/, /Lipsync/])
    })
  })

  test('send button is enabled only with a prompt', async ({ page }) => {
    const send = page.getByRole('button', { name: 'Send prompt' })
    const prompt = page.getByRole('textbox', { name: 'Prompt' })

    await test.step('disabled when empty', async () => {
      await expect(send).toBeDisabled()
    })

    await test.step('enabled after typing', async () => {
      await prompt.fill('A skincare ad')
      await expect(send).toBeEnabled()
    })

    await test.step('sending clears the field', async () => {
      await send.click()
      await expect(prompt).toHaveValue('')
      await expect(send).toBeDisabled()
    })
  })

  test('model dropdown selects Video', async ({ page }) => {
    await page.getByRole('button', { name: 'Model: Auto' }).click()
    await page.getByRole('menuitemradio', { name: 'Video' }).click()
    await expect(page.getByRole('button', { name: 'Model: Video' })).toBeVisible()
  })

  test('chat mode matches the screenshot', async ({ page }) => {
    await expect(page.locator('section[aria-labelledby="home-hero-title"]')).toHaveScreenshot(
      'home-hero-chat.png',
    )
  })
})
