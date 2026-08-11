import { getJsonData, saveJsonData } from "@/lib/json-store"

export const dynamic = 'force-dynamic'

const FILENAME = "ticker.json"

const defaultTickerData = {
  items: [
    {
      id: "1",
      text: "Study In Abroad Programs - Explore Global Opportunities",
      active: true,
      isNew: false
    }
  ]
}

export async function GET() {
  try {
    let tickerData = getJsonData(FILENAME, defaultTickerData)

    // Migration: If it's old format (object with text), convert to array
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
    } else {
      tickerData = defaultTickerData
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

    saveJsonData(FILENAME, normalizedData)

    return Response.json({ message: "Ticker updated successfully", data: normalizedData })
  } catch (err) {
    console.error("Error updating ticker:", err)
    return Response.json({ error: "Failed to update ticker" }, { status: 500 })
  }
}
