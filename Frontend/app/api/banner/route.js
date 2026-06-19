import fs from "fs"
import path from "path"

const bannerFile = path.join(process.cwd(), "public", "banner.json")

export async function GET() {
  try {
    if (!fs.existsSync(bannerFile)) {
      // Default slides
      const defaultData = {
        slides: [
          {
            id: 1,
            image: "https://picsum.photos/seed/career-transform/1200/400",
            title: "Transform Your Career",
            description: "Expert career counselling and guidance for your future",
            ctaText: "Get Started",
            ctaLink: "/services/career-counselling",
          },
          {
            id: 2,
            image: "https://picsum.photos/seed/study-abroad/1200/400",
            title: "Study Abroad",
            description: "Get admission to top universities worldwide",
            ctaText: "Explore Programs",
            ctaLink: "/services/educational-consultancy",
          },
          {
            id: 3,
            image: "https://picsum.photos/seed/immigration-journey/1200/400",
            title: "Immigrate with Confidence",
            description: "Navigate your immigration journey with expert support",
            ctaText: "Learn More",
            ctaLink: "/services/immigration",
          },
        ],
      }
      return Response.json(defaultData, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        }
      })
    }

    const data = fs.readFileSync(bannerFile, "utf-8")
    let bannerData
    try {
      bannerData = JSON.parse(data)
    } catch (e) {
      // Return default if file is malformed
      return Response.json({
        slides: [
          {
            id: 1,
            image: "https://picsum.photos/seed/career-transform/1200/400",
            title: "Transform Your Career",
            description: "Expert career counselling and guidance for your future",
            ctaText: "Get Started",
            ctaLink: "/services/career-counselling",
          },
        ],
      }, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        }
      })
    }

    // Ensure proper structure
    if (!bannerData.slides || !Array.isArray(bannerData.slides)) {
      bannerData = { slides: bannerData.slides || [] }
    }

    return Response.json(bannerData, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      }
    })
  } catch (err) {
    console.error("Error fetching banner:", err)
    return Response.json({ error: "Failed to fetch banner" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const bannerData = await req.json()

    // Validate data
    if (!bannerData.slides || !Array.isArray(bannerData.slides)) {
      return Response.json({ error: "Invalid banner data format. Must include 'slides' array." }, { status: 400 })
    }

    // Validate each slide
    const validSlides = bannerData.slides.every((slide) => {
      return (
        slide.id &&
        slide.image &&
        slide.title &&
        slide.description &&
        slide.ctaText &&
        slide.ctaLink
      )
    })

    if (!validSlides) {
      return Response.json({ error: "Each slide must have: id, image, title, description, ctaText, ctaLink" }, { status: 400 })
    }

    // Write to file
    fs.writeFileSync(bannerFile, JSON.stringify(bannerData, null, 2))

    return Response.json({
      success: true,
      message: "Banner updated successfully",
      data: bannerData,
    })
  } catch (err) {
    console.error("Error updating banner:", err)
    return Response.json({ error: "Failed to save banner" }, { status: 500 })
  }
}

