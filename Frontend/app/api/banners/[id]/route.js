import { connectToDatabase } from "@/lib/db/connect";
import Banner from "@/models/Banner";
// eslint-disable-next-line no-unused-vars
import University from "@/models/University"; // Required to register the schema for population

export async function GET(req, { params }) {
    try {
        await connectToDatabase();

        const { id } = params;

        const banner = await Banner.findById(id).populate("university");

        if (!banner) {
            return Response.json(
                {
                    success: false,
                    error: "Banner not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                data: banner,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching banner:", error);
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

        const { id } = params;
        const body = await req.json();

        const banner = await Banner.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        }).populate("university");

        if (!banner) {
            return Response.json(
                {
                    success: false,
                    error: "Banner not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                data: banner,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating banner:", error);
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

        const { id } = params;

        const banner = await Banner.findByIdAndDelete(id);

        if (!banner) {
            return Response.json(
                {
                    success: false,
                    error: "Banner not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Banner deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting banner:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
