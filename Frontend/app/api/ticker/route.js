import { connectToDatabase } from "@/lib/db/connect"
import Ticker from "@/models/Ticker"
import { getJsonData, saveJsonData } from "@/lib/json-store"

export const dynamic = 'force-dynamic'
export const revalidate = 0

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
    let items = null

    // 1. Try to fetch from MongoDB Atlas
    try {
      await connectToDatabase()
      let tickerDoc = await Ticker.findOne({ key: "global_ticker" }).lean()

      if (!tickerDoc) {
        // Seed MongoDB from JSON fallback if empty
        const initialData = getJsonData(FILENAME, defaultTickerData)
        const initialItems = initialData.items || defaultTickerData.items
        tickerDoc = await Ticker.create({
          key: "global_ticker",
          items: initialItems,
        })
      }

      if (tickerDoc && Array.isArray(tickerDoc.items)) {
        items = tickerDoc.items.map((item, idx) => ({
          id: item.id ? String(item.id) : (item._id ? String(item._id) : `${Date.now()}_${idx}`),
          text: item.text || "",
          active: item.active ?? true,
          isNew: Boolean(item.isNew),
        }))
      }
    } catch (dbErr) {
      console.warn("⚠️ MongoDB fetch failed for ticker, using file fallback:", dbErr.message)
    }

    // 2. Fallback to json-store if DB unavailable or items array empty
    if (!items) {
      let tickerData = getJsonData(FILENAME, defaultTickerData)

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
        items = tickerData.items.map((item, idx) => ({
          id: item.id ? String(item.id) : `${Date.now()}_${idx}`,
          text: item.text || "",
          active: item.active ?? true,
          isNew: Boolean(item.isNew),
        }))
      } else {
        items = defaultTickerData.items
      }
    }

    return Response.json(
      { items: items || [] },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        }
      }
    )
  } catch (err) {
    console.error("Error fetching ticker:", err)
    return Response.json({ items: defaultTickerData.items }, { status: 200 })
  }
}

export async function POST(req) {
  try {
    let rawBody = ""
    try {
      rawBody = await req.json()
    } catch (e) {
      return Response.json({ error: "Invalid JSON body provided." }, { status: 400 })
    }

    const tickerData = rawBody || {}
    const rawItems = Array.isArray(tickerData.items) ? tickerData.items : (Array.isArray(tickerData) ? tickerData : [])

    const normalizedItems = rawItems
      .filter((item) => item && typeof item === "object")
      .map((item, idx) => ({
        id: item.id && String(item.id).trim() !== "" ? String(item.id) : `${Date.now()}_${idx}`,
        text: typeof item.text === "string" ? item.text : String(item.text || ""),
        active: item.active !== false,
        isNew: Boolean(item.isNew),
      }))

    // 1. Save to MongoDB Atlas
    let dbSuccess = false
    try {
      await connectToDatabase()
      await Ticker.findOneAndUpdate(
        { key: "global_ticker" },
        { items: normalizedItems },
        { upsert: true, new: true, runValidators: false }
      )
      dbSuccess = true
    } catch (dbErr) {
      console.warn("⚠️ Failed saving ticker to MongoDB:", dbErr.message)
    }

    // 2. Try saving to json-store for local dev fallback (ignore error if read-only filesystem)
    let fileSuccess = false
    try {
      saveJsonData(FILENAME, { items: normalizedItems })
      fileSuccess = true
    } catch (fileErr) {
      // Ignored in read-only serverless environments
    }

    return Response.json({
      success: true,
      message: "Ticker updated successfully",
      data: { items: normalizedItems },
      dbSaved: dbSuccess,
      fileSaved: fileSuccess,
    })
  } catch (err) {
    console.error("Error updating ticker:", err)
    return Response.json({ error: err.message || "Failed to update ticker" }, { status: 500 })
  }
}
