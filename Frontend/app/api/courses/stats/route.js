import { connectToDatabase } from "@/lib/db/connect";
import University from "@/models/University";

export async function GET(req) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const courseName = searchParams.get("courseName");

        if (!courseName) {
            return Response.json(
                { success: false, error: "courseName query parameter is required" },
                { status: 400 }
            );
        }

        // Find universities that offer this course category (case-insensitive regex match)
        const regex = new RegExp(`^${courseName.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, "i");
        const universities = await University.find({
            coursesOffered: { $regex: regex }
        });

        const universityCount = universities.length;
        
        // Get unique countries
        const countries = [...new Set(universities.map(uni => uni.country).filter(Boolean))];
        const countryCount = countries.length;

        return Response.json(
            {
                success: true,
                data: {
                    universityCount,
                    countryCount,
                    countries
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching course stats:", error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
