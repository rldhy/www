import { cp, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(rootDir, 'node_modules', 'pdfjs-dist')
const dest = path.join(rootDir, 'public', 'pdfjs-dist')

async function setupPdfjsAssets() {
  await rm(dest, { force: true, recursive: true })
  await mkdir(dest, { recursive: true })
  await cp(src, dest, { recursive: true })
}

export default setupPdfjsAssets
