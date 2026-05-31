import fs from "fs/promises"
import path from "path"

export const runtime = "nodejs"

const MAX_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"])

function sanitizeSegment(value, fallback = "misc") {
  return (value || fallback).toString().toLowerCase().replace(/[^a-z0-9-_]/g, "") || fallback
}

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get("file")
    const folderRaw = formData.get("folder")

    if (!file || typeof file === "string") {
      return Response.json({ error: "No file uploaded" }, { status: 400 })
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return Response.json({ error: "Only JPG, PNG, WEBP, and GIF are supported" }, { status: 400 })
    }

    if (file.size > MAX_SIZE_BYTES) {
      return Response.json({ error: "Image must be 5MB or smaller" }, { status: 400 })
    }

    const folder = sanitizeSegment(folderRaw, "general")
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder)
    await fs.mkdir(uploadDir, { recursive: true })

    const extFromType = file.type.split("/")[1] || "jpg"
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extFromType}`
    const filePath = path.join(uploadDir, filename)

    const bytes = await file.arrayBuffer()
    await fs.writeFile(filePath, Buffer.from(bytes))

    return Response.json({
      success: true,
      url: `/uploads/${folder}/${filename}`,
    })
  } catch (error) {
    console.error("Image upload failed:", error)
    return Response.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
