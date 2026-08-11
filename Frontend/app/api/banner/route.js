import { getJsonData, saveJsonData } from "@/lib/json-store"

export const dynamic = 'force-dynamic'

const FILENAME = "banner.json"

const defaultBannerData = {
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

export async function GET() {
  try {
    let bannerData = getJsonData(FILENAME, defaultBannerData)

    if (!bannerData || !bannerData.slides || !Array.isArray(bannerData.slides)) {
      bannerData = defaultBannerData
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

    saveJsonData(FILENAME, bannerData)

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
