import { connectToDatabase } from "@/lib/db/connect";
import Banner from "@/models/Banner";
import University from "@/models/University"; // Required to register the schema for population

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
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching banners:", error);
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
            { status: 201 }
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
