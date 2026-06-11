import fs from "fs"
import path from "path"

const offersFile = path.join(process.cwd(), "public", "offers.json")

// Ensure offers.json exists with default data
function ensureOffersFile() {
  if (!fs.existsSync(offersFile)) {
    const defaultOffers = {
      offers: [
        {
          _id: "1",
          title: "Your Future Starts Here",
          highlight: "Study in Top Universities",
          description: "Get admission to world-class universities with full scholarships and expert guidance. Transform your dreams into reality.",
          category: "Education",
          image: "https://images.unsplash.com/photo-1427504494785-405a6e7ee8fa?w=1200&h=600&fit=crop",
          primaryButtonText: "Explore Programs",
          primaryButtonLink: "/services/educational-consultancy",
          secondaryButtonText: "Book Consultation",
          secondaryButtonLink: "/contact?service=Overseas Education",
          stats: [
            { label: "Students Guided", value: "5000+" },
            { label: "Success Rate", value: "98%" },
            { label: "Countries", value: "40+" },
          ],
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          title: "Career Excellence Program",
          highlight: "Achieve Your Dream Job",
          description: "Professional career counselling, resume building, interview prep, and placement assistance from industry experts.",
          category: "Career",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
          primaryButtonText: "Get Started",
          primaryButtonLink: "/services/career-counselling",
          secondaryButtonText: "Learn More",
          secondaryButtonLink: "/services",
          stats: [
            { label: "Placements", value: "500+" },
            { label: "Avg Salary", value: "150K+" },
            { label: "Success Rate", value: "95%" },
          ],
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        {
          _id: "3",
          title: "Immigration Made Simple",
          highlight: "Visa & PR Assistance",
          description: "Navigate immigration with confidence. Visa processing, PR applications, and settlement support for top destinations.",
          category: "Immigration",
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=600&fit=crop",
          primaryButtonText: "Explore Immigration",
          primaryButtonLink: "/services/immigration",
          secondaryButtonText: "Free Assessment",
          secondaryButtonLink: "/contact?service=Immigration Services",
          stats: [
            { label: "Visa Approvals", value: "1000+" },
            { label: "Success Rate", value: "99%" },
            { label: "Destinations", value: "15+" },
          ],
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      ],
    }
    fs.writeFileSync(offersFile, JSON.stringify(defaultOffers, null, 2))
  }
}

export async function GET() {
  try {
    ensureOffersFile()

    if (!fs.existsSync(offersFile)) {
      return Response.json({ offers: [] })
    }

    const data = fs.readFileSync(offersFile, "utf-8")
    let offersData = JSON.parse(data)

    // Filter only active offers
    if (offersData.offers) {
      offersData.offers = offersData.offers.filter((offer) => offer.isActive !== false)
    }

    return Response.json(offersData, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    })
  } catch (err) {
    console.error("Error fetching offers:", err)
    return Response.json({ error: "Failed to fetch offers", offers: [] }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    ensureOffersFile()

    const { offers } = await req.json()

    if (!Array.isArray(offers)) {
      return Response.json({ error: "Offers must be an array" }, { status: 400 })
    }

    // Validate offer structure
    const validOffers = offers.every((offer) => {
      return offer.title && offer.description && offer.image && offer.category
    })

    if (!validOffers) {
      return Response.json(
        { error: "Each offer must have: title, description, image, category" },
        { status: 400 }
      )
    }

    // Ensure each offer has required metadata
    const processedOffers = offers.map((offer, idx) => ({
      _id: offer._id || String(idx + 1),
      ...offer,
      createdAt: offer.createdAt || new Date().toISOString(),
    }))

    fs.writeFileSync(offersFile, JSON.stringify({ offers: processedOffers }, null, 2))

    return Response.json({
      success: true,
      message: "Offers updated successfully",
      offers: processedOffers,
    })
  } catch (err) {
    console.error("Error updating offers:", err)
    return Response.json({ error: "Failed to save offers" }, { status: 500 })
  }
}
