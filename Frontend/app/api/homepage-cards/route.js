import { connectToDatabase } from "@/lib/db/connect";
import HomePageCard from "@/models/HomePageCard";

const DEFAULT_CARDS = [
    // Career Counselling & Profile Building Cards
    {
        type: "career-counselling",
        title: "Career Counselling",
        subtitle: "Premium",
        description: "Personalized guidance to align your goals, profile, and study destination.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
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
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80",
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
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
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
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=60",
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
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=60",
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
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=60",
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
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=60",
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
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=60",
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
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=60",
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
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=60",
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
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=60",
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
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=60",
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
        image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=60",
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
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=60",
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
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=60",
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
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=60",
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
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=60",
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
        image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800",
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
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=60",
        buttonText: "Explore Course",
        buttonLink: "/courses/science",
        displayOrder: 6,
        isActive: true,
    },
];

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

        // If collection is empty, seed it
        if (cards.length === 0 && !type) {
            console.log("🌱 Seeding default home page cards...");
            const seeded = await HomePageCard.insertMany(DEFAULT_CARDS);
            cards = seeded.filter(card => includeInactive || card.isActive);
            // Sort seeded cards
            cards.sort((a, b) => a.displayOrder - b.displayOrder);
        }

        return Response.json(
            {
                success: true,
                data: cards,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching home page cards:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
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
