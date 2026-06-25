import { connectToDatabase } from "@/lib/db/connect";
import HomePageCard from "@/models/HomePageCard";

const DEFAULT_CARDS = [
    // Career Counselling & Profile Building Cards
    {
        type: "career-counselling",
        title: "Career Counselling",
        subtitle: "Premium",
        description: "Personalized guidance to align your goals, profile, and study destination.",
        image: "https://picsum.photos/seed/career-counselling/800/480",
        iconName: "UserRoundSearch",
        buttonText: "Book Session",
        buttonLink: "/services/career-counselling",
        displayOrder: 1,
        isActive: true,
    },
    {
        type: "career-counselling",
        title: "Profile Evaluation",
        subtitle: "Premium",
        description: "Get a clear assessment of your academics, experience, and improvement areas.",
        image: "https://picsum.photos/seed/profile-evaluation/800/480",
        iconName: "FileText",
        buttonText: "Evaluate Profile",
        buttonLink: "/services/career-counselling",
        displayOrder: 2,
        isActive: true,
    },
    {
        type: "career-counselling",
        title: "Resume Building",
        subtitle: "Premium",
        description: "Build a polished resume that presents your strengths with clarity and impact.",
        image: "https://picsum.photos/seed/resume-building/800/480",
        iconName: "ClipboardList",
        buttonText: "Polish Resume",
        buttonLink: "/services/career-counselling",
        displayOrder: 3,
        isActive: true,
    },

    // Test Preparation Cards
    {
        type: "test-prep",
        title: "ACT",
        subtitle: "Target: 28+",
        description: "College readiness assessment.",
        image: "https://picsum.photos/seed/act-exam/800/480",
        buttonText: "Explore Preparation",
        buttonLink: "/services/career-counselling/test-preparation",
        displayOrder: 1,
        isActive: true,
    },
    {
        type: "test-prep",
        title: "CELPIP",
        subtitle: "Target: 9+",
        description: "Canadian immigration and study pathways.",
        image: "https://picsum.photos/seed/celpip-test/800/480",
        buttonText: "Explore Preparation",
        buttonLink: "/services/career-counselling/test-preparation",
        displayOrder: 2,
        isActive: true,
    },
    {
        type: "test-prep",
        title: "Duolingo English Test",
        subtitle: "Target: 120+",
        description: "Affordable online English test.",
        image: "https://picsum.photos/seed/duolingo-english/800/480",
        buttonText: "Explore Preparation",
        buttonLink: "/services/career-counselling/test-preparation",
        displayOrder: 3,
        isActive: true,
    },
    {
        type: "test-prep",
        title: "GMAT",
        subtitle: "Target: 650+",
        description: "Business school admission test.",
        image: "https://picsum.photos/seed/gmat-business/800/480",
        buttonText: "Explore Preparation",
        buttonLink: "/services/career-counselling/test-preparation",
        displayOrder: 4,
        isActive: true,
    },
    {
        type: "test-prep",
        title: "GRE",
        subtitle: "Target: 320+",
        description: "Graduate school admission test.",
        image: "https://picsum.photos/seed/gre-graduate/800/480",
        buttonText: "Explore Preparation",
        buttonLink: "/services/career-counselling/test-preparation",
        displayOrder: 5,
        isActive: true,
    },
    {
        type: "test-prep",
        title: "IELTS",
        subtitle: "Target: 7.0+",
        description: "English proficiency test accepted worldwide.",
        image: "https://picsum.photos/seed/ielts-english/800/480",
        buttonText: "Explore Preparation",
        buttonLink: "/services/career-counselling/test-preparation",
        displayOrder: 6,
        isActive: true,
    },
    {
        type: "test-prep",
        title: "OET",
        subtitle: "Target: B+",
        description: "English test for healthcare professionals.",
        image: "https://picsum.photos/seed/oet-healthcare/800/480",
        buttonText: "Explore Preparation",
        buttonLink: "/services/career-counselling/test-preparation",
        displayOrder: 7,
        isActive: true,
    },
    {
        type: "test-prep",
        title: "PTE Academic",
        subtitle: "Target: 65+",
        description: "Fast computer-based English test.",
        image: "https://picsum.photos/seed/pte-academic/800/480",
        buttonText: "Explore Preparation",
        buttonLink: "/services/career-counselling/test-preparation",
        displayOrder: 8,
        isActive: true,
    },
    {
        type: "test-prep",
        title: "SAT",
        subtitle: "Target: 1400+",
        description: "Undergraduate admission test.",
        image: "https://picsum.photos/seed/sat-undergrad/800/480",
        buttonText: "Explore Preparation",
        buttonLink: "/services/career-counselling/test-preparation",
        displayOrder: 9,
        isActive: true,
    },
    {
        type: "test-prep",
        title: "TOEFL iBT",
        subtitle: "Target: 95+",
        description: "University-focused English proficiency exam.",
        image: "https://picsum.photos/seed/toefl-university/800/480",
        buttonText: "Explore Preparation",
        buttonLink: "/services/career-counselling/test-preparation",
        displayOrder: 10,
        isActive: true,
    },

    // Study Destination Cards
    {
        type: "study-destination",
        title: "Australia",
        subtitle: "",
        description: "Top academic programs with pathways to permanent residency and work permits.",
        image: "https://flagcdn.com/w320/au.png",
        buttonText: "Explore Programs",
        buttonLink: "/universities?country=Australia",
        displayOrder: 1,
        totalUniversities: 43,
        isActive: true,
    },
    {
        type: "study-destination",
        title: "Canada",
        subtitle: "",
        description: "World-class education with affordable tuition fees and post-study work options.",
        image: "https://flagcdn.com/w320/ca.png",
        buttonText: "Explore Programs",
        buttonLink: "/universities?country=Canada",
        displayOrder: 2,
        totalUniversities: 96,
        isActive: true,
    },
    {
        type: "study-destination",
        title: "United Kingdom",
        subtitle: "",
        description: "Prestigious universities with high-quality education and graduate visa options.",
        image: "https://flagcdn.com/w320/gb.png",
        buttonText: "Explore Programs",
        buttonLink: "/universities?country=UK",
        displayOrder: 3,
        totalUniversities: 160,
        isActive: true,
    },
    {
        type: "study-destination",
        title: "United States",
        subtitle: "",
        description: "Unmatched research opportunities and diverse academic programs.",
        image: "https://flagcdn.com/w320/us.png",
        buttonText: "Explore Programs",
        buttonLink: "/universities?country=USA",
        displayOrder: 4,
        totalUniversities: 4000,
        isActive: true,
    },
    {
        type: "study-destination",
        title: "Germany",
        subtitle: "",
        description: "World-leading engineering courses with little to no tuition fees.",
        image: "https://flagcdn.com/w320/de.png",
        buttonText: "Explore Programs",
        buttonLink: "/universities?country=Germany",
        displayOrder: 5,
        totalUniversities: 380,
        isActive: true,
    },

    // Popular Courses Cards
    {
        type: "popular-course",
        title: "Allied Health",
        subtitle: "",
        description: "Patient care, clinical practice, and health sciences.",
        image: "https://picsum.photos/seed/allied-health/800/480",
        buttonText: "Explore Course",
        buttonLink: "/courses/allied-health",
        displayOrder: 1,
        isActive: true,
    },
    {
        type: "popular-course",
        title: "Commerce",
        subtitle: "",
        description: "Business, trade, accounting, and finance fundamentals.",
        image: "https://picsum.photos/seed/commerce-finance/800/480",
        buttonText: "Explore Course",
        buttonLink: "/courses/commerce",
        displayOrder: 2,
        isActive: true,
    },
    {
        type: "popular-course",
        title: "Engineering",
        subtitle: "",
        description: "Design, innovation, and real-world problem solving.",
        image: "https://picsum.photos/seed/engineering-tech/800/480",
        buttonText: "Explore Course",
        buttonLink: "/courses/engineering",
        displayOrder: 3,
        isActive: true,
    },
    {
        type: "popular-course",
        title: "Management",
        subtitle: "",
        description: "Strategy, operations, and data-driven decision making.",
        image: "https://picsum.photos/seed/management-biz/800/480",
        buttonText: "Explore Course",
        buttonLink: "/courses/management",
        displayOrder: 4,
        isActive: true,
    },
    {
        type: "popular-course",
        title: "Medicine",
        subtitle: "",
        description: "Clinical science, diagnosis, and patient care.",
        image: "https://picsum.photos/seed/medicine-health/800/480",
        buttonText: "Explore Course",
        buttonLink: "/courses/medicine",
        displayOrder: 5,
        isActive: true,
    },
    {
        type: "popular-course",
        title: "Science",
        subtitle: "",
        description: "Core scientific principles, research, and discovery.",
        image: "https://picsum.photos/seed/science-lab/800/480",
        buttonText: "Explore Course",
        buttonLink: "/courses/science",
        displayOrder: 6,
        isActive: true,
    },
];

// Map of old broken image URLs → new reliable picsum URLs
const IMAGE_MIGRATION_MAP = {
    "images.unsplash.com": (title) => `https://picsum.photos/seed/${encodeURIComponent(title)}/800/480`,
    "images.pexels.com": (title) => `https://picsum.photos/seed/${encodeURIComponent(title)}/800/480`,
};

const needsMigration = (url) =>
    url && (url.includes("images.unsplash.com") || url.includes("images.pexels.com"));

export async function GET(req) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        const includeInactive = searchParams.get("all") === "true";

        let query = {};
        if (type) {
            query.type = type;
        }
        if (!includeInactive) {
            query.isActive = true;
        }

        let cards = await HomePageCard.find(query).sort({ displayOrder: 1, createdAt: -1 });

        // If collection is empty (no type filter), seed with default cards
        if (cards.length === 0 && !type) {
            console.log("🌱 Seeding default home page cards...");
            const seeded = await HomePageCard.insertMany(DEFAULT_CARDS);
            cards = seeded.filter(card => includeInactive || card.isActive);
            cards.sort((a, b) => a.displayOrder - b.displayOrder);
        }

        // If type-filtered query returns nothing, seed only that type
        if (cards.length === 0 && type) {
            const typeCards = DEFAULT_CARDS.filter(c => c.type === type);
            if (typeCards.length > 0) {
                console.log(`🌱 Seeding default cards for type: ${type}...`);
                const seeded = await HomePageCard.insertMany(typeCards);
                cards = seeded.filter(card => includeInactive || card.isActive);
                cards.sort((a, b) => a.displayOrder - b.displayOrder);
            }
        }

        // Auto-migrate: fix any cards still using hotlink-blocked Unsplash/Pexels URLs
        const migrationPromises = [];
        for (const card of cards) {
            if (needsMigration(card.image)) {
                const newUrl = `https://picsum.photos/seed/${encodeURIComponent(card.title)}/800/480`;
                migrationPromises.push(
                    HomePageCard.findByIdAndUpdate(card._id, { image: newUrl })
                );
                card.image = newUrl; // Update in-memory so response is correct immediately
            }
        }
        if (migrationPromises.length > 0) {
            console.log(`🔄 Migrating ${migrationPromises.length} cards with broken image URLs...`);
            await Promise.all(migrationPromises);
        }

        return Response.json(
            {
                success: true,
                data: cards,
            },
            { status: 200 }
        );
    } catch (error) {
        console.warn("⚠️ Error fetching home page cards from database, using fallback:", error.message);
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        const includeInactive = searchParams.get("all") === "true";

        let fallbackCards = DEFAULT_CARDS;
        if (type) {
            fallbackCards = fallbackCards.filter(card => card.type === type);
        }
        if (!includeInactive) {
            fallbackCards = fallbackCards.filter(card => card.isActive);
        }

        fallbackCards = fallbackCards.map((card, idx) => ({
            _id: `fallback-card-${idx}`,
            ...card
        }));

        return Response.json(
            {
                success: true,
                data: fallbackCards,
                isFallback: true,
            },
            { status: 200 }
        );
    }
}

export async function POST(req) {
    try {
        await connectToDatabase();

        const body = await req.json();

        if (!body.type || !body.title) {
            return Response.json(
                {
                    success: false,
                    error: "Card type and title/name are required",
                },
                { status: 400 }
            );
        }

        const newCard = new HomePageCard(body);
        await newCard.save();

        return Response.json(
            {
                success: true,
                data: newCard,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating home page card:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
