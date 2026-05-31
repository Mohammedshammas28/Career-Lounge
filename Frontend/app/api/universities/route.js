import { connectToDatabase } from "@/lib/db/connect";
import University from "@/models/University";

const normalizeRanking = (value) => (value || "").toString().replace(/\D/g, "").slice(0, 4);

export async function GET(req) {
    try {
        await connectToDatabase();

        const universities = await University.find().sort({ createdAt: -1 });

        return Response.json(
            {
                success: true,
                data: universities,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching universities:", error);
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
        const normalizedBody = {
            ...body,
            ranking: normalizeRanking(body.ranking),
        };

        // Generate slug from university name
        const slug =
            normalizedBody.slug ||
            normalizedBody.universityName
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");

        // Check if university already exists
        const existingUniversity = await University.findOne({
            $or: [{ slug }, { universityName: normalizedBody.universityName }],
        });

        if (existingUniversity) {
            return Response.json(
                {
                    success: false,
                    error: "University already exists",
                },
                { status: 400 }
            );
        }

        const university = new University({
            ...normalizedBody,
            slug,
        });

        await university.save();

        return Response.json(
            {
                success: true,
                data: university,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating university:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
