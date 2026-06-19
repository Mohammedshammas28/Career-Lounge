import { promises as fs } from "fs"
import path from "path"

const SLIDER_FILE = path.join(process.cwd(), "public/slider.json")

const DEFAULT_SLIDER = {
  slides: [
    {
      _id: "1",
      title: "Transform Your Dreams",
      subtitle: "Into Global Opportunities",
      description: "Study abroad with Career Lounge's premium international consultancy services",
      image: "https://picsum.photos/seed/global-education/1200/700",
      category: "Education",
      backgroundColor: "from-slate-950 to-slate-900",
      glowColor: "purple",
      primaryButtonText: "Explore Programs",
      primaryButtonLink: "/services",
      secondaryButtonText: "Book Consultation",
      secondaryButtonLink: "/contact?service=Overseas Education",
      stats: [
        { label: "Universities", value: "500+" },
        { label: "Success Rate", value: "95%" },
        { label: "Countries", value: "50+" },
      ],
      floatingCards: [
        {
          _id: "fc1",
          title: "UK Scholarship",
          emoji: "🇬🇧",
          highlight: "70% Off",
          badge: "HOT",
          badgeColor: "red",
          description: "Premium educational grants",
          position: "top-12 left-12",
          animation: { y: [0, -20, 0], x: [-15, 0, -15], duration: 4 },
          rotateZ: 8,
        },
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ],
}

export async function GET() {
  try {
    let data
    try {
      const content = await fs.readFile(SLIDER_FILE, "utf-8")
      data = JSON.parse(content)
    } catch {
      data = DEFAULT_SLIDER
      await fs.writeFile(SLIDER_FILE, JSON.stringify(data, null, 2))
    }

    const activeSlides = data.slides.filter((slide) => slide.isActive !== false)
    return Response.json({ slides: activeSlides })
  } catch (error) {
    console.error("Error reading slider data:", error)
    return Response.json({ slides: DEFAULT_SLIDER.slides }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { slides } = await request.json()

    if (!Array.isArray(slides)) {
      return Response.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Validate slides structure
    const validatedSlides = slides.map((slide) => ({
      _id: slide._id || Date.now().toString(),
      title: slide.title || "",
      subtitle: slide.subtitle || "",
      description: slide.description || "",
      image: slide.image || "",
      category: slide.category || "Education",
      backgroundColor: slide.backgroundColor || "from-slate-950 to-slate-900",
      glowColor: slide.glowColor || "purple",
      primaryButtonText: slide.primaryButtonText || "Explore",
      primaryButtonLink: slide.primaryButtonLink || "#",
      secondaryButtonText: slide.secondaryButtonText || "",
      secondaryButtonLink: slide.secondaryButtonLink || "#",
      stats: Array.isArray(slide.stats) ? slide.stats : [],
      floatingCards: Array.isArray(slide.floatingCards) ? slide.floatingCards : [],
      isActive: slide.isActive !== false,
      createdAt: slide.createdAt || new Date().toISOString(),
    }))

    const data = { slides: validatedSlides }
    await fs.writeFile(SLIDER_FILE, JSON.stringify(data, null, 2))

    return Response.json({
      success: true,
      message: "Slider updated successfully",
      slides: validatedSlides,
    })
  } catch (error) {
    console.error("Error saving slider data:", error)
    return Response.json({ error: "Failed to save slider" }, { status: 500 })
  }
}
