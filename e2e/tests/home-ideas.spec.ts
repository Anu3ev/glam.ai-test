import { expect, test } from '@playwright/test'

/** Card titles in the order the mock API returns them. */
const IDEA_TITLES = [
  'Product Profile',
  'Studio Shoot',
  'Smart Retouch',
  'Edit Background',
  'Model Swap',
  'Social Ad',
]

test.describe('Home ideas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders idea cards and reshuffles them on refresh', async ({ page }) => {
    const section = page.getByRole('region', { name: 'Ideas for You' })
    const cardTitles = section.getByRole('heading', { level: 3 })

    await test.step('cards render with titles', async () => {
      await expect(cardTitles).toHaveText(IDEA_TITLES)
    })

    await test.step('refresh changes the order', async () => {
      await section.getByRole('button', { name: 'Refresh ideas' }).click()
      await expect(cardTitles).toHaveCount(IDEA_TITLES.length)
      await expect(cardTitles.first()).not.toHaveText(IDEA_TITLES[0]!)
    })
  })

  test('"+" buttons have accessible names and titles', async ({ page }) => {
    const section = page.getByRole('region', { name: 'Ideas for You' })

    for (const title of IDEA_TITLES) {
      await test.step(`use button for ${title}`, async () => {
        const button = section.getByRole('button', { name: `Use ${title}` })
        await expect(button).toBeVisible()
        await expect(button).toHaveAttribute('title', `Use ${title}`)
      })
    }
  })

  test('matches the design screenshot', async ({ page }) => {
    const section = page.locator('section[aria-labelledby="ideas-title"]')
    await expect(section.getByRole('heading', { level: 3 })).toHaveCount(IDEA_TITLES.length)
    await expect(section).toHaveScreenshot('home-ideas.png', { mask: [section.locator('img')] })
  })
})
