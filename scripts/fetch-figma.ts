/**
 * Saves Figma node data to `.figma-cache/<name>.json`; by default the home page frames to `nodes.json`.
 * Reads `FIGMA_TOKEN` from the environment or `.env.local`. One run costs one Tier 1 REST request.
 *
 * Usage: node scripts/fetch-figma.ts [name nodeId...]
 * Example: node scripts/fetch-figma.ts ui-kit 71:178
 */
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'

/** Original mockup file; the token owner needs view access to it. */
const FILE_KEY = 'kU4QjBSdDHbwSVZLSm9VTL'

/** Home/Chat, Home/Tools and the Pop-up section. */
const DEFAULT_NODE_IDS = ['3:103', '76:3404', '96:5168']

const [outputName = 'nodes', ...requestedNodeIds] = process.argv.slice(2)

// A name without node ids, or a node id in the name position, would silently save the wrong frames.
if (outputName.includes(':') || (outputName !== 'nodes' && requestedNodeIds.length === 0)) {
  throw new Error('Usage: node scripts/fetch-figma.ts [name nodeId...], for example: ui-kit 71:178')
}

const nodeIds = requestedNodeIds.length > 0 ? requestedNodeIds : DEFAULT_NODE_IDS
const outputPath = `.figma-cache/${outputName}.json`

// A token exported in the shell works too; `.env.local` only fills it in when present.
if (existsSync('.env.local')) {
  process.loadEnvFile('.env.local')
}

const token = process.env.FIGMA_TOKEN
if (!token) {
  throw new Error('FIGMA_TOKEN is missing: export it or add it to .env.local')
}

const url = `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${nodeIds.join(',')}`
const response = await fetch(url, { headers: { 'X-Figma-Token': token } })
if (!response.ok) {
  throw new Error(`Figma request failed: ${response.status} ${await response.text()}`)
}

await mkdir('.figma-cache', { recursive: true })
await writeFile(outputPath, await response.text())
console.log(`Saved ${outputPath}`)
