import fs from "fs"
import path from "path"

export const dynamic = 'force-dynamic'

const tickerFile = path.join(process.cwd(), "public", "ticker.json")

export async function GET() {
  try {
    if (!fs.existsSync(tickerFile)) {
      const defaultData = {
        items: [
          {
            id: "1",
            text: "Study In Abroad Programs - Explore Global Opportunities",
            active: true,
            isNew: false
          }
        ]
      }
      return Response.json(defaultData, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "Pragma": "no-cache",
        }
      })
    }

    const data = fs.readFileSync(tickerFile, "utf-8")
    let tickerData = JSON.parse(data)

    // Migration: If it's the old format (object with text), convert to array
    if (tickerData.text && !tickerData.items) {
      tickerData = {
        items: [
          {
            id: "1",
            text: tickerData.text,
            active: tickerData.active ?? true,
            isNew: false
          }
        ]
      }
    }

    if (Array.isArray(tickerData.items)) {
      tickerData.items = tickerData.items.map((item) => ({
        ...item,
        isNew: Boolean(item.isNew),
      }))
    }

    return Response.json(tickerData, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
      }
    })
  } catch (err) {
    console.error("Error fetching ticker:", err)
    return Response.json({ error: "Failed to fetch ticker" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const tickerData = await req.json()

    if (!tickerData.items || !Array.isArray(tickerData.items)) {
      return Response.json({ error: "Invalid ticker data format. Must include 'items' array." }, { status: 400 })
    }

    const normalizedData = {
      items: tickerData.items.map((item) => ({
        id: item.id,
        text: item.text,
        active: item.active ?? true,
        isNew: Boolean(item.isNew),
      })),
    }

    fs.writeFileSync(tickerFile, JSON.stringify(normalizedData, null, 2))

    return Response.json({ message: "Ticker updated successfully", data: normalizedData })
  } catch (err) {
    console.error("Error updating ticker:", err)
    return Response.json({ error: "Failed to update ticker" }, { status: 500 })
  }
}
