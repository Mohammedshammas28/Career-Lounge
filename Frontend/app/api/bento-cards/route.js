import { promises as fs } from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "public", "bento-cards.json")

async function readBentoCards() {
    try {
        const data = await fs.readFile(filePath, "utf-8")
        return JSON.parse(data)
    } catch (error) {
        return {
            cards: [
                {
                    _id: "1",
                    title: "Transform Your Dreams Into Global Opportunities",
                    subtitle: "Your Gateway to World-Class Education",
                    description: "Unlock pathways to top-ranked universities across 50+ countries with Career Lounge's expert guidance and premium services.",
                    category: "Featured",
                    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&h=700&fit=crop",
                    themeColor: "purple",
                    cardType: "main",
                    layoutSize: "large",
                    buttonText: "Explore Programs",
                    buttonLink: "/services",
                    isActive: true,
                    createdAt: new Date().toISOString(),
                },
                {
                    _id: "2",
                    title: "🇬🇧 UK Scholarships",
                    subtitle: "70% Off Available",
                    description: "Premium educational grants for international students",
                    category: "Scholarship",
                    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=600&fit=crop",
                    themeColor: "blue",
                    cardType: "scholarship",
                    layoutSize: "medium",
                    buttonText: "Apply Now",
                    buttonLink: "/services/educational-consultancy",
                    isActive: true,
                    createdAt: new Date().toISOString(),
                },
                {
                    _id: "3",
                    title: "🇨🇦 Canada PR",
                    subtitle: "Fast Track Process",
                    description: "Permanent residency pathways made simple",
                    category: "Immigration",
                    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=600&h=600&fit=crop",
                    themeColor: "cyan",
                    cardType: "immigration",
                    layoutSize: "small",
                    buttonText: "Learn More",
                    buttonLink: "/services/immigration",
                    isActive: true,
                    createdAt: new Date().toISOString(),
                },
                {
                    _id: "4",
                    title: "🏖️ Dubai Luxury Experience",
                    subtitle: "40% OFF",
                    description: "Premium study breaks and professional networking opportunities",
                    category: "Special Offers",
                    image: "https://images.unsplash.com/photo-1512453575684-cf95ce11bdc0?w=600&h=400&fit=crop",
                    themeColor: "pink",
                    cardType: "experience",
                    layoutSize: "small",
                    buttonText: "Book Now",
                    buttonLink: "#",
                    isActive: true,
                    createdAt: new Date().toISOString(),
                },
                {
                    _id: "5",
                    title: "🎓 100+ Partner Universities",
                    subtitle: "Global Network",
                    description: "Access to world's leading educational institutions",
                    category: "Universities",
                    image: "https://images.unsplash.com/photo-1495573032875-f9ea1bb33de5?w=600&h=600&fit=crop",
                    themeColor: "emerald",
                    cardType: "universities",
                    layoutSize: "small",
                    buttonText: "Explore",
                    buttonLink: "/services",
                    isActive: true,
                    createdAt: new Date().toISOString(),
                },
                {
                    _id: "6",
                    title: "98% Visa Success Rate",
                    subtitle: "Industry Leading Performance",
                    description: "Trust Career Lounge's proven track record in visa processing",
                    category: "Success Metrics",
                    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
                    themeColor: "blue",
                    cardType: "success",
                    layoutSize: "small",
                    buttonText: "View Testimonials",
                    buttonLink: "#",
                    isActive: true,
                    createdAt: new Date().toISOString(),
                },
            ],
        }
    }
}

async function writeBentoCards(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
}

export async function GET() {
    try {
        const data = await readBentoCards()
        return Response.json(data)
    } catch (error) {
        console.error("Error reading bento cards:", error)
        return Response.json({ error: "Failed to fetch bento cards" }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        const { cards } = body

        if (!Array.isArray(cards)) {
            return Response.json({ error: "Cards must be an array" }, { status: 400 })
        }

        // Validate each card
        const validatedCards = cards.map(card => ({
            ...card,
            _id: card._id || Date.now().toString(),
            createdAt: card.createdAt || new Date().toISOString(),
            isActive: card.isActive !== false,
        }))

        await writeBentoCards({ cards: validatedCards })
        return Response.json({ cards: validatedCards, message: "Bento cards updated successfully" })
    } catch (error) {
        console.error("Error updating bento cards:", error)
        return Response.json({ error: "Failed to update bento cards" }, { status: 500 })
    }
}
