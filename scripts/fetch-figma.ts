/**
 * Saves Figma node data for the home page frames to `.figma-cache/nodes.json`.
 * Reads `FIGMA_TOKEN` from the environment or `.env.local`. One run costs one Tier 1 REST request.
 *
 * Usage: node scripts/fetch-figma.ts
 */
import { existsSync } from 'node:fs'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'

/** Original mockup file; the token owner needs view access to it. */
const FILE_KEY = 'kU4QjBSdDHbwSVZLSm9VTL'

/** Home/Chat, Home/Tools and the Pop-up section. */
const NODE_IDS = ['3:103', '76:3404', '96:5168']

// A token exported in the shell works too; `.env.local` only fills it in when present.
if (existsSync('.env.local')) {
  // A token exported in the shell works too; `.env.local` only fills it in when present.
  if (existsSync('.env.local')) {
    process.loadEnvFile('.env.local')
  }
}

const token = process.env.FIGMA_TOKEN
if (!token) {
  throw new Error('FIGMA_TOKEN is missing in .env.local')
}

const url = `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${NODE_IDS.join(',')}`
const response = await fetch(url, { headers: { 'X-Figma-Token': token } })
if (!response.ok) {
  throw new Error(`Figma request failed: ${response.status} ${await response.text()}`)
}

await mkdir('.figma-cache', { recursive: true })
await writeFile('.figma-cache/nodes.json', await response.text())
console.log('Saved .figma-cache/nodes.json')
