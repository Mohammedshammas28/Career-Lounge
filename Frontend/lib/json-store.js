import fs from "fs"
import path from "path"
import os from "os"

export function getJsonData(filename, defaultData) {
  const tmpFile = path.join(os.tmpdir(), filename)
  const publicFile = path.join(process.cwd(), "public", filename)

  try {
    if (fs.existsSync(tmpFile)) {
      const data = fs.readFileSync(tmpFile, "utf-8")
      return JSON.parse(data)
    }
  } catch (err) {
    console.warn(`Failed reading ${filename} from tmp:`, err)
  }

  try {
    if (fs.existsSync(publicFile)) {
      const data = fs.readFileSync(publicFile, "utf-8")
      return JSON.parse(data)
    }
  } catch (err) {
    console.warn(`Failed reading ${filename} from public:`, err)
  }

  return defaultData
}

export function saveJsonData(filename, data) {
  const publicFile = path.join(process.cwd(), "public", filename)
  const tmpFile = path.join(os.tmpdir(), filename)
  const jsonStr = JSON.stringify(data, null, 2)

  // Try writing to public/ first (works in local dev)
  try {
    fs.writeFileSync(publicFile, jsonStr)
    // Also sync to tmp
    try {
      fs.writeFileSync(tmpFile, jsonStr)
    } catch (e) {}
    return true
  } catch (err) {
    // If read-only filesystem (production serverless like Vercel), write to /tmp
    console.warn(`Could not write to ${publicFile} (${err.message}), falling back to ${tmpFile}`)
    try {
      fs.writeFileSync(tmpFile, jsonStr)
      return true
    } catch (tmpErr) {
      console.error(`Failed to write ${filename} to tmp:`, tmpErr)
      throw tmpErr
    }
  }
}
