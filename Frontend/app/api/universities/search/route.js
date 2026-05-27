import { connectToDatabase } from "@/lib/db/connect";
import University from "@/models/University";

export async function GET(req) {
    try {
        await connectToDatabase();

        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get("q");

        if (!query) {
            return Response.json(
                {
                    success: false,
                    error: "Search query is required",
                },
                { status: 400 }
            );
        }

        const universities = await University.find({
            $text: {
                $search: query,
            },
        });

        return Response.json(
            {
                success: true,
                data: universities,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error searching universities:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
