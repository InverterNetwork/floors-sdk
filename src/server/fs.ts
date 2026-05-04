import fs from 'fs'
import path from 'path'

/** Create a directory (recursive) under `process.cwd()` if it doesn't exist. Returns the absolute path. */
export function createDirIfNotExists(dir: string): string {
  const fullPath = path.join(process.cwd(), dir)
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true })
  }
  return fullPath
}
