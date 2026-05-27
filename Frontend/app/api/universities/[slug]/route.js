import { connectToDatabase } from "@/lib/db/connect";
import University from "@/models/University";

export async function GET(req, { params }) {
    try {
        await connectToDatabase();

        const { slug } = await params;

        const university = await University.findOne({ slug });

        if (!university) {
            return Response.json(
                {
                    success: false,
                    error: "University not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                data: university,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching university:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function PATCH(req, { params }) {
    try {
        await connectToDatabase();

        const { slug } = await params;
        const body = await req.json();

        const university = await University.findOneAndUpdate({ slug }, body, {
            new: true,
            runValidators: true,
        });

        if (!university) {
            return Response.json(
                {
                    success: false,
                    error: "University not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                data: university,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating university:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectToDatabase();

        const { slug } = await params;

        const university = await University.findOneAndDelete({ slug });

        if (!university) {
            return Response.json(
                {
                    success: false,
                    error: "University not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "University deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting university:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
