import { connectToDatabase } from "@/lib/db/connect";
import Banner from "@/models/Banner";
// eslint-disable-next-line no-unused-vars
import University from "@/models/University"; // Required to register the schema for population

export const dynamic = 'force-dynamic'

const DEFAULT_BANNERS = [
    {
        _id: "default-banner-1",
        offerText: "Get up to 50% Scholarship on Tuition Fees",
        offerPercentage: "50% Scholarship Available",
        deadlineText: "July 31, 2026",
        buttonText: "Explore University",
        active: true,
        university: {
            universityName: "University of Melbourne",
            bannerImage: "https://picsum.photos/seed/melbourne/1200/600",
            slug: "university-of-melbourne"
        }
    },
    {
        _id: "default-banner-2",
        offerText: "Free Admissions Consultation & Visa Assistance",
        offerPercentage: "100% Free Consultation",
        deadlineText: "Ongoing",
        buttonText: "Book Session",
        active: true,
        university: {
            universityName: "Career Lounge Premium Counselling",
            bannerImage: "https://picsum.photos/seed/counselling/1200/600",
            slug: ""
        }
    }
];

export async function GET(req) {
    try {
        await connectToDatabase();

        // Check if admin is requesting all banners (including inactive)
        const { searchParams } = new URL(req.url);
        const allBanners = searchParams.get("all") === "true";

        // Get banners and populate university data
        const query = allBanners ? {} : { active: true };
        const banners = await Banner.find(query)
            .populate("university")
            .sort({ order: 1, createdAt: -1 });

        return Response.json(
            {
                success: true,
                data: banners,
            },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate",
                    "Pragma": "no-cache",
                }
            }
        );
    } catch (error) {
        console.warn("⚠️ Error fetching banners from database, using fallback:", error.message);
        const { searchParams } = new URL(req.url);
        const allBanners = searchParams.get("all") === "true";
        const fallbackBanners = allBanners ? DEFAULT_BANNERS : DEFAULT_BANNERS.filter(b => b.active);

        return Response.json(
            {
                success: true,
                data: fallbackBanners,
                isFallback: true,
            },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate",
                    "Pragma": "no-cache",
                }
            }
        );
    }
}

export async function POST(req) {
    try {
        await connectToDatabase();

        const body = await req.json();

        // Validate university exists
        const { university } = body;
        if (!university) {
            return Response.json(
                {
                    success: false,
                    error: "University ID is required",
                },
                { status: 400 }
            );
        }

        // Get the highest order number
        const lastBanner = await Banner.findOne().sort({ order: -1 });
        const newOrder = (lastBanner?.order || 0) + 1;

        const banner = new Banner({
            ...body,
            order: newOrder,
        });

        await banner.save();
        await banner.populate("university");

        return Response.json(
            {
                success: true,
                data: banner,
            },
            {
                status: 201,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate",
                    "Pragma": "no-cache",
                }
            }
        );
    } catch (error) {
        console.error("Error creating banner:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
